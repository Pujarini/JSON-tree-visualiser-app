
const isObject = (val) => Object.prototype.toString.call(val) === "[object Object]";
const isArray = (val) => Array.isArray(val);

export function buildTree(rootLabel, value, idPrefix = "n") {
    let idCounter = 0;
    const newId = () => `${idPrefix}_${idCounter++}`;

    function walk(label, val) {
        if (isObject(val)) {
            const node = { id: newId(), kind: "object", label, children: [] };

            for (const key of Object.keys(val)) {
                const child = val[key];
                const keyNode = { id: newId(), kind: "key", label: key, children: [] };

                if (isObject(child) || isArray(child)) {
                    const temp = walk(key, child);
                    keyNode.children = temp.children;
                } else {
                    keyNode.children.push({
                        id: newId(),
                        kind: "value",
                        label: String(child),
                        children: [],
                    });
                }
                node.children.push(keyNode);
            }
            return node;
        }
        if (isArray(val)) {
            const node = { id: newId(), kind: "array", label, children: [] };

            val.forEach((item, idx) => {
                const idxNode = { id: newId(), kind: "key", label: String(idx), children: [] };

                if (isObject(item) || isArray(item)) {
                    const temp = walk(String(idx), item);
                    idxNode.children = temp.children;
                } else {
                    idxNode.children.push({
                        id: newId(),
                        kind: "value",
                        label: String(item),
                        children: [],
                    });
                }

                node.children.push(idxNode);
            });
            return node;
        }
        return { id: newId(), kind: "value", label: String(val), children: [] };
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
    let cursor = tree;

    for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const keyNode = cursor.children?.find(
            (c) => c.kind === 'key' && c.label === String(p)
        );
        if (!keyNode) return null;

        const isLast = i === parts.length - 1;

        if (isLast) {
            if (keyNode.children?.length === 1 && keyNode.children[0].kind === 'value') {
                return keyNode.children[0].id;        // highlight the primitive value node
            }
            return keyNode.id;
        }
        cursor = { children: keyNode.children || [] };
    }

    return null;
}
