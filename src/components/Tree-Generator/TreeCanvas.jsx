import React, { useMemo, useEffect } from "react";
import { ReactFlow, Background, BackgroundVariant, Controls, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { layoutTree } from "../../utils/jsonTree";

function TreeCanvas({ tree, focusNodeId }) {
    const { setCenter } = useReactFlow();
    const { nodes, edges } = useMemo(() => layoutTree(tree), [tree]);

    useEffect(() => {
        if (!focusNodeId) return;
        const node = nodes.find((x) => x.id === focusNodeId);
        if (node) setCenter(node.position.x, node.position.y, { zoom: 1, duration: 400 });
    }, [focusNodeId, nodes, setCenter]);


    const styledNodes = nodes.map((node) => {
        let bg = "#e2e8f0";
        if (node.data.kind === "key") bg = "#86efac";
        if (node.data.kind === "value") bg = "#fcd34d";
        if (node.data.kind === "object") bg = "#93c5fd";
        if (node.data.kind === "array") bg = "#a5b4fc";

        const isFocused = node.id === focusNodeId;


        return {
            ...node,
            data: { label: node.data.label },
            style: {
                padding: 10,
                borderRadius: 8,
                border: isFocused
                    ? "2px solid rgb(59 130 246)"
                    : "1px solid rgba(0,0,0,0.06)",
                boxShadow: isFocused ? "0 0 0 4px rgba(59,130,246,0.25)" : "none",
                background: bg,
                fontSize: 16,
                width: "fit-content"
            },
        };
    });


    return (
        <div className="h-[430px] w-full rounded-2xl border border-slate-200 bg-white">
            <ReactFlow nodes={styledNodes} edges={edges} fitView minZoom={0.2}
                defaultEdgeOptions={{
                    markerEnd: { type: "arrowclosed" },
                }}
                maxZoom={1.5}>
                <Background color="blue" variant={BackgroundVariant.Dots} />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default TreeCanvas;