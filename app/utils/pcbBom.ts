export type PcbBomOptions = {
    root: string;
    repo?: string;
    branch?: string;
};

export type PcbPlacement = {
    designator: string;
    xMm: number;
    yMm: number;
    layer: 'T' | 'B';
};

export type PcbBomItem = {
    id: string;
    designators: string[];
    quantity: number;
    description: string;
    componentType: string;
    lcsc: string;
    value: string;
    footprint: string;
    placements: PcbPlacement[];
    done: boolean;
};

export type PcbBomData = {
    items: PcbBomItem[];
    files: { bom?: string; pickAndPlace?: string };
};

type GithubFile = { name: string; download_url: string };

function getComponentType(designator: string, description: string) {
    if (description.endsWith('nF') || description.endsWith('uF') || description.endsWith('pF')) return 'Capacitor';
    if (description.endsWith('uH') || description.endsWith('mH') || description.endsWith('H')) return 'Inductor';
    if (description.endsWith('Ω')) return 'Resistor';
    if (description.startsWith('WAFER') || description.startsWith('HX') || description.startsWith('HC') || description.startsWith('XT')) return 'Connector';

    const prefix = designator.match(/^[A-Za-z]+/)?.[0].toUpperCase();
    const types: Record<string, string> = {
        R: 'Resistor',
        C: 'Capacitor',
        L: 'Inductor',
        D: 'Diode',
        LED: 'LED',
        Q: 'Transistor',
        U: 'IC',
        ESP: 'IC',
        AMS: 'IC',
        PCA: 'IC',
        J: 'Connector',
        P: 'Connector',
        F: 'Fuse',
        SW: 'Switch',
        Y: 'Crystal',
        X: 'Crystal',
    };
    const type = prefix ? types[prefix] : undefined;
    if (type) return type;

    return 'Component';
}

function formatFootprint(footprint: string) {
    const match = /^(C|R|L)[0-9]+[0-9]*/.test(footprint);
    if (match) footprint = footprint.substring(1);
    footprint = footprint.split(/[_]/)[0] as string;
    return footprint;
}

function parseRow(row: string, separator: string) {
    const values: string[] = [];
    let value = '';
    let quoted = false;
    for (let index = 0; index < row.length; index += 1) {
        const character = row[index];
        if (character === '"') {
            if (quoted && row[index + 1] === '"') {
                value += '"';
                index += 1;
            } else quoted = !quoted;
        } else if (character === separator && !quoted) {
            values.push(value.trim());
            value = '';
        } else value += character;
    }
    values.push(value.trim());
    return values;
}

function parseTable(text: string) {
    const rows = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter((row) => row.trim());
    if (rows.length < 2) return [];
    const separator = (rows[0] as string).includes('\t') ? '\t' : ',';
    const headers = parseRow((rows[0] as string), separator);
    return rows.slice(1).map((row) => {
        const values = parseRow(row, separator);
        return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
    });
}

function column(row: Record<string, string>, ...names: string[]) {
    const key = Object.keys(row).find((candidate) => names.some((name) => candidate.toLowerCase() === name.toLowerCase()));
    return key ? (row[key] as string) : '';
}

async function responseText(response: Response) {
    const bytes = await response.arrayBuffer();
    const header = response.headers.get('content-type')?.toLowerCase() ?? '';
    const view = new Uint8Array(bytes);
    const utf16 = header.includes('utf-16') || (view[0] === 0xff && view[1] === 0xfe);
    return new TextDecoder(utf16 ? 'utf-16le' : 'utf-8').decode(bytes);
}

export async function loadPcbBom(options: PcbBomOptions): Promise<PcbBomData> {
    const repo = options.repo ?? 'TNY-Robotics/TNY-360';
    const branch = options.branch ?? 'dev';
    const path = options.root.split('/').map(encodeURIComponent).join('/');
    const directoryUrl = `https://api.github.com/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
    const directoryResponse = await fetch(directoryUrl, { headers: { Accept: 'application/vnd.github+json' } });
    if (!directoryResponse.ok) throw new Error(`GitHub directory request failed (${directoryResponse.status}).`);
    const files = await directoryResponse.json() as GithubFile[];
    const bomFile = files.find((file) => /bom/i.test(file.name) && /\.csv$/i.test(file.name));
    const pickAndPlaceFile = files.find((file) => /(pick.?and.?place|centroid|position)/i.test(file.name) && /\.csv$/i.test(file.name));
    if (!bomFile || !pickAndPlaceFile) throw new Error('BOM or PickAndPlace CSV not found.');

    const [bomResponse, pnpResponse] = await Promise.all([fetch(bomFile.download_url), fetch(pickAndPlaceFile.download_url)]);
    if (!bomResponse.ok || !pnpResponse.ok) throw new Error('Could not download BOM or PickAndPlace CSV.');
    const bomRows = parseTable(await responseText(bomResponse));
    const pnpRows = parseTable(await responseText(pnpResponse));
    const placements = new Map<string, PcbPlacement>();
    pnpRows.forEach((row) => {
        const designator = column(row, 'Designator', 'Reference', 'Ref');
        const xMm = Number.parseFloat(column(row, 'Mid X', 'X').replace(/[^\d.+-]/g, ''));
        const yMm = Number.parseFloat(column(row, 'Mid Y', 'Y').replace(/[^\d.+-]/g, ''));
        if (designator && Number.isFinite(xMm) && Number.isFinite(yMm)) {
            placements.set(designator, {
                designator,
                xMm,
                yMm,
                layer: column(row, 'Layer', 'Side').toUpperCase().startsWith('B') ? 'B' : 'T',
            });
        }
    });

    const items = bomRows.map((row, index) => {
        const designators = column(row, 'Designator', 'Reference', 'References').split(',').map((value) => value.trim()).filter(Boolean);
        const description = column(row, 'Comment', 'Description', 'Device', 'Value') || column(row, 'Footprint');
        const footprint = formatFootprint(column(row, 'Footprint'));
        return {
            id: `pcb-component-${index}`,
            designators,
            quantity: Number.parseInt(column(row, 'Quantity', 'Qty'), 10) || designators.length || 1,
            description,
            componentType: getComponentType(designators[0] ?? '', description),
            lcsc: column(row, 'LCSC', 'LCSC Part', 'LCSC Part #', 'LCSC Part Number')
                || (column(row, 'Supplier').toUpperCase() === 'LCSC' ? column(row, 'Supplier Part') : ''),
            value: column(row, 'Value', 'Comment'),
            footprint,
            placements: designators.map((designator) => placements.get(designator)).filter((placement): placement is PcbPlacement => Boolean(placement)),
            done: false,
        };
    }).filter((item) => item.designators.length > 0);

    return { items, files: { bom: bomFile.name, pickAndPlace: pickAndPlaceFile.name } };
}
