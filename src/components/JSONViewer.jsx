import React from "react";


export default function JSONViewer() {
    return (
        <div className="mt-6 flex min-h-[430px] items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-inner">
            <div className="text-center text-slate-400">
                <div className="text-sm">Tree will render here</div>
                <div className="mt-1 text-xs">(layout-only stage)</div>
            </div>
        </div>
    )
}