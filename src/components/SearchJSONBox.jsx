import React from "react";

export default function SearchJSONBox({ query, onChange, noMatch, onSearch }) {
    return (
        <>
            <div className="flex items-stretch gap-2 mt-4 w-full">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="$.user.address.city or items[0].name"
                    className="h-11 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-slate-800 outline-none focus:border-slate-300 focus:ring-2"
                />
                <button
                    onClick={onSearch}
                    type="button"
                    className="h-11 rounded-xl bg-blue-600 px-4 text-white shadow hover:bg-blue-700"
                >
                    Search
                </button>
            </div>
            {noMatch && <p className="mt-2 text-sm text-red-600">No matches found</p>}
        </>
    )
}