import React from "react";


export default function ThemeToggler() {

    return (
        <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-50">
            <span>Dark/Light</span>
            <span className="relative inline-flex h-5 w-10 items-center rounded-full bg-slate-300">
                <span className="absolute left-0.5 inline-block h-4 w-4 translate-x-0 rounded-full bg-white shadow transition-transform" />
            </span>
        </button>
    )
}