import React from "react";
import TreeCanvas from "./Tree-Generator/TreeCanvas";
import { ReactFlowProvider } from "@xyflow/react"


export default function JSONViewer({ tree, focusNodeId }) {
    return (
        <div className="mt-6">
            {tree ? (
                <ReactFlowProvider>
                    <TreeCanvas tree={tree} focusNodeId={focusNodeId} />
                </ReactFlowProvider>
            ) : (
                <div className="mt-6 flex min-h-[430px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-inner">
                    <div className="text-center text-slate-400">
                        <div className="text-sm">Tree will render here</div>
                    </div>
                </div>
            )}
        </div>
    )
}

