import fs from 'fs/promises';
import path from 'path';

// Changement ici : outputFile devient outputDir
const [, , inputDir, outputDir] = process.argv;

if (!inputDir || !outputDir) {
    console.error("Usage: node generate_api_ref.mjs <search_directory_root> <destination_folder>");
    process.exit(1);
}

const BLOCK_REGEX = /\/\*\*\s*<API_REF>([\s\S]*?)\*\//g;
const TAG_REGEX = /^\s*\*\s*@(\w+)\s*(.*)$/;
const CONTINUATION_REGEX = /^\s*\*\s*(.*)$/;

async function parseDirectory(directory) {
    // On prépare nos deux catégories
    const apiData = { modules: {}, types: {} };
    const files = await fs.readdir(directory, { recursive: true, withFileTypes: true });

    for (const file of files) {
        if (file.isFile() && /\.(cpp|h|hpp|c)$/.test(file.name)) {
            const filePath = path.join(file.parentPath || file.path, file.name);
            const content = await fs.readFile(filePath, 'utf-8');
            
            let match;
            while ((match = BLOCK_REGEX.exec(content)) !== null) {
                const blockContent = match[1];
                const parsedData = parseBlock(blockContent);
                
                if (parsedData) {
                    if (parsedData.kind === 'action') {
                        // C'est une action, on la range dans le bon module
                        const modName = parsedData.data.module.name;
                        if (!apiData.modules[modName]) apiData.modules[modName] = [];
                        apiData.modules[modName].push(parsedData.data);
                    } else if (parsedData.kind === 'type') {
                        // C'est un type, on le range directement par son nom
                        const typeName = parsedData.data.name;
                        apiData.types[typeName] = parsedData.data;
                    }
                }
            }
        }
    }
    return apiData;
}

function parseBlock(blockContent) {
    const lines = blockContent.split(/\r?\n/);
    let kind = null; // Permet de savoir si on lit une 'action' ou un 'type'
    
    // On prépare un objet "fourre-tout"
    const data = { args: [], result: null, desc: "", impl: "done", fields: [] };
    let currentTag = null;

    for (const line of lines) {
        const tagMatch = line.match(TAG_REGEX);
        
        if (tagMatch) {
            currentTag = tagMatch[1];
            const tagValue = tagMatch[2].trim();
            const parts = tagValue.split(/\s+/);

            switch (currentTag) {
                // --- Tags spécifiques aux Actions ---
                case 'module': {
                    kind = 'action';
                    const parsedId = Number(parts[1]);
                    data.module = { name: parts[0], id: isNaN(parsedId) ? 0 : parsedId };
                    break;
                }
                case 'action': {
                    const parsedId = Number(parts[1]);
                    data.action = { name: parts[0], id: isNaN(parsedId) ? 0 : parsedId };
                    break;
                }
                case 'impl':
                    data.impl = tagValue;
                    break;
                case 'arg':
                    data.args.push({ name: parts[0], type: parts[1], desc: parts.slice(2).join(' '), required: true });
                    break;
                case 'result':
                    if (!data.result) data.result = [];
                    data.result.push({ name: parts[0], type: parts[1], desc: parts.slice(2).join(' ') });
                    break;

                // --- Tags spécifiques aux Types ---
                case 'type':
                    kind = 'type';
                    data.name = parts[0];
                    break;
                case 'field':
                    data.fields.push({ name: parts[0], type: parts[1], desc: parts.slice(2).join(' ') });
                    break;

                // --- Tags partagés ---
                case 'desc':
                    data.desc = tagValue;
                    break;
            }
        } else if (currentTag === 'desc') {
            const textMatch = line.match(CONTINUATION_REGEX);
            if (textMatch && textMatch[1].trim() !== '') {
                data.desc += '\n' + textMatch[1].trim(); 
            }
        }
    }

    // A la fin, on renvoie les bonnes données selon ce qu'on a détecté, en nettoyant le reste
    if (kind === 'action' && data.module && data.action) {
        delete data.name;
        delete data.fields;
        return { kind: 'action', data: data };
    } else if (kind === 'type' && data.name) {
        delete data.module;
        delete data.action;
        delete data.args;
        delete data.result;
        delete data.impl;
        return { kind: 'type', data: data };
    }

    return null; // Si le bloc est mal formaté (ni @module ni @type trouvés)
}

async function main() {
    try {
        console.log(`Scanning directory: ${inputDir}...`);
        const { modules, types } = await parseDirectory(inputDir);
        
        // On s'assure que le dossier de destination existe
        await fs.mkdir(outputDir, { recursive: true });

        // On génère les deux chemins de fichiers
        const modulesPath = path.join(outputDir, 'modules.json');
        const typesPath = path.join(outputDir, 'types.json');
        
        // On écrit les fichiers (le "null, 2" permet d'indenter joliment le JSON)
        await fs.writeFile(modulesPath, JSON.stringify(modules, null, 2), 'utf-8');
        await fs.writeFile(typesPath, JSON.stringify(types, null, 2), 'utf-8');
        
        // Petites stats pour la console
        const moduleCount = Object.keys(modules).length;
        const actionCount = Object.values(modules).flat().length;
        const typeCount = Object.keys(types).length;
        
        console.log(`Success! Extracted ${actionCount} actions across ${moduleCount} modules.`);
        console.log(`Success! Extracted ${typeCount} custom types.`);
        console.log(`Saved to: ${outputDir}`);
    } catch (error) {
        console.error("Error generating API reference:", error);
        process.exit(1);
    }
}

main();