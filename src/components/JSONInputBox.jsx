import React, { useState } from "react";


export default function JSONInputBox({ value, onChange, isValidJSON, onValidJSONChange }) {
    const checkIsValidJson = (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    const handleChange = (event) => {
        const inputValue = event.target.value;
        onChange(inputValue);
        onValidJSONChange(checkIsValidJson(inputValue));
    };


    return (
        <div>
            <label htmlFor="json" className="mb-2 text-sm font-medium text-slate-600">
                Paste or type JSON data
            </label>
            <textarea
                id="json"
                value={value}
                onChange={handleChange}
                className="min-h-[480px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 font-mono text-sm text-slate-800 outline-none ring-slate-100 focus:border-slate-300 focus:ring-2"
            />
            {value ? isValidJSON ? (
                <p className="text-green-500">Valid JSON</p>
            ) : (
                <p className="text-red-500">Invalid JSON</p>
            ) : null}
        </div>
    )
}