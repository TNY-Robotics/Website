import { unzipSync } from 'fflate';

export type GerberRenderOptions = {
    layer: 'top' | 'bottom';
};

type GithubFile = {
    name: string;
    download_url: string;
};

type SVGLayer = {
    name?: string;
    defs: string[];
    layer: string[];
    viewBox: number[];
    height: number;
    once: (event: string, callback: (...args: unknown[]) => void) => void;
};

type GerberFile = {
    files: Record<string, string>;
};

export type PcbViewController = {
    focus: (xMm: number, yMm: number, widthMm?: number) => void;
    reset: () => void;
    projectToViewbox: (point: { xMm: number; yMm: number }, root?: HTMLElement) => { x: number; y: number };
};

type GerberToSvg = (source: string, options: { format: string }) => SVGLayer;

const LIB_URL = 'https://unpkg.com/gerber-to-svg@^4.0.0/dist/gerber-to-svg.min.js';
const SCRIPT_ID = 'gerber-to-svg';

declare global {
    interface Window {
        gerberToSvg?: GerberToSvg;
    }
}

// Viewbox : X, Y, Scale[mm/px]
const viewBoxModel = ref<{
    x: number;
    y: number;
    width: number;
    height: number;
}>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
});

function getGerberToSvg(): Promise<GerberToSvg> {
    return new Promise((resolve, reject) => {
        if (window.gerberToSvg) {
            resolve(window.gerberToSvg);
            return;
        }

        const existingScript = document.getElementById(SCRIPT_ID);
        if (existingScript) {
            existingScript.addEventListener('load', () => {
                if (window.gerberToSvg) resolve(window.gerberToSvg);
                else reject(new Error('Gerber library loaded without exposing gerberToSvg.'));
            }, { once: true });
            existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${LIB_URL}.`)), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.src = LIB_URL;
        script.onload = () => {
            if (window.gerberToSvg) resolve(window.gerberToSvg);
            else reject(new Error('Gerber library loaded without exposing gerberToSvg.'));
        };
        script.onerror = () => reject(new Error(`Failed to load ${LIB_URL}.`));
        document.head.appendChild(script);
    });
}

function waitForGerberResult(result: SVGLayer): Promise<SVGLayer> {
    return new Promise((resolve, reject) => {
        const startedAt = Date.now();
        let timer: ReturnType<typeof setInterval> | undefined;
        const cleanup = () => {
            if (timer) clearInterval(timer);
        };
        const check = () => {
            if (result.height > 0 && result.viewBox.length === 4 && result.layer.length > 0) {
                cleanup();
                resolve(result);
            } else if (Date.now() - startedAt > 100) {
                cleanup();
                reject(new Error('Gerber conversion timed out.'));
            }
        };

        result.once('error', (error) => {
            cleanup();
            reject(error);
        });
        result.once('end', check);
        timer = setInterval(check, 25);
        check();
    });
}

export async function fetchGerberFile(root: string, repo: string = 'TNY-Robotics/TNY-360', branch: string = 'main'): Promise<GerberFile> {
    const directoryUrl = `https://api.github.com/repos/${repo}/contents/${root.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(branch)}`;
    const directoryResponse = await fetch(directoryUrl, { headers: { Accept: 'application/vnd.github+json' } });
    if (!directoryResponse.ok) throw new Error(`GitHub directory request failed (${directoryResponse.status}).`);
    const directory = await directoryResponse.json() as GithubFile[];
    const gerberFile = directory.find((file) => /gerber/i.test(file.name) && /\.zip$/i.test(file.name));
    if (!gerberFile) throw new Error('Gerber archive not found.');

    const archiveResponse = await fetch(gerberFile.download_url);
    if (!archiveResponse.ok) throw new Error(`Gerber archive request failed (${archiveResponse.status}).`);

    const entries = unzipSync(new Uint8Array(await archiveResponse.arrayBuffer()));
    const validFilesList = Object.keys(entries).filter((name) => /\.(gko|gts|gtl|gto|gtp|gbo|gbs|gbl)$/i.test(name.toLocaleLowerCase()));
    const files: Record<string, string> = {};
    for (const name of validFilesList) {
        files[name] = new TextDecoder('ascii').decode(entries[name]);
    }
    return { files };
}

export async function renderGerberSVGLayers(gerber: GerberFile, options: GerberRenderOptions): Promise<SVGLayer[]> {
    const extensionsToKeep = options.layer === 'bottom' ? ['gko', 'gbl', 'gbs', 'gbo'] : ['gko', 'gtl', 'gts', 'gto'];
    const entries = Object.fromEntries(Object.entries(gerber.files).filter(([name]) => extensionsToKeep.some((ext) => name.toLowerCase().endsWith(`.${ext}`))));
    if (Object.keys(entries).length === 0) throw new Error(`${options.layer} Gerber layer not found in archive.`);

    const svgLayers: SVGLayer[] = [];
    
    for (const [name, content] of Object.entries(entries)) {
        const gerberToSvg = await getGerberToSvg();
        try {
            const result = await waitForGerberResult(gerberToSvg(content, { format: 'svg' }));
            svgLayers.push({ ...result, name });
        }
        catch (error) {
            svgLayers.push({ name, defs: [], layer: [``], viewBox: [0, 0, 0, 0], height: 0, once: () => {} });
            console.error(`[PcbGerber] Failed to render Gerber file ${name}:`, error);
        }
    }

    return svgLayers;
}

export async function displaySVGLayers(div: HTMLDivElement, svgLayers: SVGLayer[], flipLeftRight: boolean = false, flipTopBBottom: boolean = true): Promise<PcbViewController> {
    if (!svgLayers.length) throw new Error('Cannot display an empty list of SVG layers.');

    const boxes = svgLayers.map(({ viewBox }) => ({
        minX: viewBox[0] as number,
        minY: viewBox[1] as number,
        maxX: viewBox[0] as number + (viewBox[2] as number),
        maxY: viewBox[1] as number + (viewBox[3] as number),
    }));

    const minX = Math.min(...boxes.map((box) => box.minX));
    const minY = Math.min(...boxes.map((box) => box.minY));
    const maxX = Math.max(...boxes.map((box) => box.maxX));
    const maxY = Math.max(...boxes.map((box) => box.maxY));
    const width = maxX - minX;
    const height = maxY - minY;

    div.replaceChildren();
    div.style.position = 'relative';
    div.style.aspectRatio = `${width} / ${height}`;

    const root = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    root.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    root.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
    root.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    root.setAttribute('aria-label', 'PCB layers');
    if (flipTopBBottom || flipLeftRight) {
        root.style.transform = `scale(${flipLeftRight ? -1 : 1}, ${flipTopBBottom ? -1 : 1})`;
    }

    const contourLayer = svgLayers.find((layer) => layer.name?.toLowerCase().endsWith('.gko'));
    if (contourLayer) {
        const contour = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        contour.setAttribute('x', String(contourLayer.viewBox[0]));
        contour.setAttribute('y', String(contourLayer.viewBox[1]));
        contour.setAttribute('width', String(contourLayer.viewBox[2]));
        contour.setAttribute('height', String(contourLayer.viewBox[3]));
        contour.setAttribute('viewBox', contourLayer.viewBox.join(' '));
        contour.setAttribute('preserveAspectRatio', 'none');
        contour.setAttribute('fill', '#022c22');
        contour.setAttribute('fill-rule', 'evenodd');
        contour.setAttribute('stroke', 'none');

        const contourMarkup = `${contourLayer.defs.length ? `<defs>${contourLayer.defs.join('')}</defs>` : ''}${contourLayer.layer.join('')}`
            .replace(/fill="none"/g, 'fill="#022c22"')
            .replace(/stroke="[^"]*"/g, 'stroke="none"')
            .replace(/fill-rule="[^"]*"/g, 'fill-rule="evenodd"');
        contour.innerHTML = contourMarkup;
        root.appendChild(contour);
    }

    const colorForLayer = (layer: SVGLayer, index: number) => {
        const name = layer.name?.toLowerCase() ?? '';
        if (name.endsWith('.gko')) return '#00000000'; // Contours
        if (name.endsWith('.gtl') || name.endsWith('.gbl')) return '#064e3b'; // Copper
        if (name.endsWith('.gts') || name.endsWith('.gbs')) return '#94a3b8'; // Solder mask
        if (name.endsWith('.gto') || name.endsWith('.gbo')) return '#f5f5f5'; // Silkscreen
        return '#000000';
    };

    svgLayers.forEach((layer, index) => {
        const box = boxes[index];
        if (!box) return;

        const nested = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        nested.setAttribute('x', String(box.minX));
        nested.setAttribute('y', String(box.minY));
        nested.setAttribute('width', String(box.maxX - box.minX));
        nested.setAttribute('height', String(box.maxY - box.minY));
        nested.setAttribute('viewBox', layer.viewBox.join(' '));
        nested.setAttribute('preserveAspectRatio', 'none');
        nested.setAttribute('fill', 'currentColor');
        nested.setAttribute('stroke', 'currentColor');
        nested.style.color = colorForLayer(layer, index);

        const layerIdPrefix = `pcb-layer-${index}-`;
        const markup = `${layer.defs.length ? `<defs>${layer.defs.join('')}</defs>` : ''}${layer.layer.join('')}`
            .replace(/ id="([^"]+)"/g, (_match, id: string) => ` id="${layerIdPrefix}${id}"`)
            .replace(/url\(#([^)]+)\)/g, (_match, id: string) => `url(#${layerIdPrefix}${id})`)
            .replace(/((?:xlink:)?href="#)([^"]+)"/g, (_match, prefix: string, id: string) => `${prefix}${layerIdPrefix}${id}"`)
            .replace(/([=:])#([A-Za-z0-9_-]+)/g, (_match, prefix: string, id: string) => `${prefix}#${layerIdPrefix}${id}`);
        nested.innerHTML = markup;
        root.appendChild(nested);
    });

    root.style.display = 'block';
    root.style.width = '100%';
    root.style.height = '100%';
    div.appendChild(root);
    const defaultViewBox = { minX, minY, width, height };
    const unitScale = 1000;
    let animationFrame: number | undefined;

    const getViewBox = () => {
        const values = root.getAttribute('viewBox')?.split(' ').map(Number);
        if (!values || values.length !== 4 || values.some((value) => !Number.isFinite(value))) {
            return [defaultViewBox.minX, defaultViewBox.minY, defaultViewBox.width, defaultViewBox.height] as [number, number, number, number];
        }
        return values as [number, number, number, number];
    };

    function updateViewBoxModel(viewBox: number[] = getViewBox()) {
        viewBoxModel.value = {
            x: viewBox[0] as number,
            y: viewBox[1] as number,
            width: viewBox[2] as number,
            height: viewBox[3] as number,
        };
    }

    const setViewBox = (viewBox: number[]) => {
        root.setAttribute('viewBox', viewBox.join(' '));
        updateViewBoxModel(viewBox);
    };

    const getTargetViewBox = (nextWidth: number, centerX: number, centerY: number) => {
        const containerRatio = div.clientWidth > 0 && div.clientHeight > 0
            ? div.clientWidth / div.clientHeight
            : width / height;
        const nextHeight = nextWidth / containerRatio;
        const boundedWidth = Math.min(nextWidth, defaultViewBox.width);
        const boundedHeight = Math.min(nextHeight, defaultViewBox.height);
        const boundedCenterX = Math.max(defaultViewBox.minX + boundedWidth / 2, Math.min(centerX, defaultViewBox.minX + defaultViewBox.width - boundedWidth / 2));
        const boundedCenterY = Math.max(defaultViewBox.minY + boundedHeight / 2, Math.min(centerY, defaultViewBox.minY + defaultViewBox.height - boundedHeight / 2));
        return [boundedCenterX - boundedWidth / 2, boundedCenterY - boundedHeight / 2, boundedWidth, boundedHeight];
    };

    const animateViewBox = (target: number[]) => {
        if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
        const start = getViewBox();
        const startedAt = performance.now();
        const duration = 600;
        const easeInOut = (progress: number) =>
            progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const animate = (now: number) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const eased = easeInOut(progress);
            setViewBox(start.map((value, index) => value + (target[index] as number - value) * eased));
            if (progress < 1) animationFrame = requestAnimationFrame(animate);
            else animationFrame = undefined;
        };
        animationFrame = requestAnimationFrame(animate);
    };

    const controller: PcbViewController = {
        focus: (xMm, yMm, widthMm = 8) => {
            animateViewBox(getTargetViewBox(widthMm * unitScale, xMm * unitScale, yMm * unitScale));
        },
        reset: () => {
            animateViewBox([defaultViewBox.minX, defaultViewBox.minY, defaultViewBox.width, defaultViewBox.height]);
        },
        projectToViewbox: ({ xMm, yMm }, root: HTMLElement = div) => {
            const { x: viewX, y: viewY, width: viewWidth, height: viewHeight } = viewBoxModel.value;
            const pointX = xMm * unitScale;
            const pointY = yMm * unitScale;
            const containerWidth = div.clientWidth || 1;
            const containerHeight = div.clientHeight || 1;
            const containerRect = div.getBoundingClientRect();
            const rootRect = root.getBoundingClientRect();
            const scale = Math.min(containerWidth / viewWidth, containerHeight / viewHeight);
            const renderedWidth = viewWidth * scale;
            const renderedHeight = viewHeight * scale;
            const offsetX = (containerWidth - renderedWidth) / 2;
            const offsetY = (containerHeight - renderedHeight) / 2;
            const normalizedX = (pointX - viewX) / viewWidth;
            const normalizedY = (pointY - viewY) / viewHeight;
            return {
                x: containerRect.left - rootRect.left + (
                    flipLeftRight
                        ? containerWidth - offsetX - normalizedX * renderedWidth
                        : offsetX + normalizedX * renderedWidth
                ),
                y: flipTopBBottom
                    ? containerRect.top - rootRect.top + containerHeight - offsetY - normalizedY * renderedHeight
                    : containerRect.top - rootRect.top + offsetY + normalizedY * renderedHeight,
            };
        },
    };
    updateViewBoxModel();
    return controller;
}

export function getViewBoxModel() {
    return viewBoxModel;
}