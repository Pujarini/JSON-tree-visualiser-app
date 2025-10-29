
const isObject = (v) => Object.prototype.toString.call(v) === "[object Object]";
const isArray = (v) => Array.isArray(v);


export function buildTree(rootLabel, value, idPrefix = "n") {
    let idCounter = 0;
    const newId = () => `${idPrefix}_${idCounter++}`;


    function walk(label, v) {
        if (isObject(v)) {
            const node = { id: newId(), kind: "object", label, children: [] };
            for (const k of Object.keys(v)) {
                const keyNode = { id: newId(), kind: "key", label: k, children: [walk(k, v[k])] };
                node.children.push(keyNode);
            }
            return node;
        }


        if (isArray(v)) {
            const node = { id: newId(), kind: "array", label, children: [] };

            v.forEach((item, idx) => {
                const child = walk(String(idx), item);
                node.children.push(child);
            });

            return node;
        }


        return { id: newId(), kind: "value", label: String(v), children: [] };
    }


    return walk(rootLabel, value);
}

export function layoutTree(root, xGap = 180, yGap = 100) {
    const nodes = [];
    const edges = [];


    const subtreeWidth = (n) => {
        if (!n.children.length) return 1;
        return n.children.map(subtreeWidth).reduce((a, b) => a + b, 0);
    };


    const place = (n, depth, leftX) => {
        const width = subtreeWidth(n);
        const center = leftX + (width - 1) / 2;


        nodes.push({ id: n.id, data: { label: n.label, kind: n.kind }, position: { x: center * xGap, y: depth * yGap } });


        let cursor = leftX;
        for (const child of n.children) {
            const w = subtreeWidth(child);
            edges.push({ id: `${n.id}-${child.id}`, source: n.id, target: child.id });
            place(child, depth + 1, cursor);
            cursor += w;
        }
    };


    place(root, 0, 0);
    return { nodes, edges };
}

export function parsePath(input, rootLabel) {
    // strip $., $. , S., s.
    const s = input.trim().replace(/^(?:\$|S)\.?/i, '');
    if (!s) return [];

    const parts = [];
    let buf = '';
    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (c === '.') {
            if (buf) parts.push(buf), (buf = '');
        } else if (c === '[') {
            if (buf) parts.push(buf), (buf = '');
            let j = i + 1, num = '';
            while (j < s.length && s[j] !== ']') num += s[j++];
            parts.push(Number(num));
            i = j;
        } else {
            buf += c;
        }
    }
    if (buf) parts.push(buf);
    if (rootLabel && String(parts[0]) === String(rootLabel)) {
        parts.shift();
    }
    return parts;
}

export function findNodeIdByPath(tree, parts) {
    if (!tree) return null;
    let node = tree;
    for (const p of parts) {
        const keyNode = node.children?.find(
            (c) => c.kind === 'key' && c.label === String(p)
        );
        if (!keyNode) return null;
        node = keyNode.children[0];
    }
    return node?.id ?? null;
}