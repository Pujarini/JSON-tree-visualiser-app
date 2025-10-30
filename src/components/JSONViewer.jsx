import React, { useState, useCallback } from "react";
import TreeCanvas from "./Tree-Generator/TreeCanvas";
import { ReactFlowProvider } from "@xyflow/react"
import Loader from "./Loader";
import { stringifyPathParts } from "../utils/jsonTree";


export default function JSONViewer({ tree, focusNodeId, loading, nodePathMap = {} }) {
    const [copiedId, setCopiedId] = useState(null);

    const onNodeClick = useCallback(
        (_evt, node) => {
            const parts = nodePathMap?.[node.id];
            if (!parts) return;
            const pathStr = stringifyPathParts(parts);
            navigator?.clipboard?.writeText?.(pathStr);
            setCopiedId(node.id);
            setTimeout(() => setCopiedId(null), 900);
        },
        [nodePathMap]
    );


    return (
        <div className="w-full">
            {copiedId && (
                <div className="pointer-events-none absolute right-3 bottom-8 rounded-lg bg-green-600 px-5 py-4 text-xs font-medium text-white">
                    Path Copied!
                </div>
            )}
            {loading ?
                <div className=" flex min-h-[430px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-inner"><Loader />
                </div> : tree ? <ReactFlowProvider>
                    <TreeCanvas tree={tree} focusNodeId={focusNodeId} onNodeClick={onNodeClick} />
                </ReactFlowProvider> : <div className=" flex min-h-[430px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-inner">
                    <div className="text-center text-slate-400">
                        <div className="text-sm">Tree will render here</div>
                    </div>

                </div>}
        </div>
    )
}

