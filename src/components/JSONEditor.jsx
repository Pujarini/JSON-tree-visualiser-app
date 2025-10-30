import React, { useCallback } from "react";

export default function JSONEditor({
    value,
    onChange = () => { },
    isValidJSON,
    onValidJSONChange = () => { },
    id = "json",
    label = "Paste or type JSON data",
}) {
    const checkIsValidJson = (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch {
            return false;
        }
    };

    const handleChange = useCallback(
        (e) => {
            const next = e.target.value;
            onChange(next);
            const valid = checkIsValidJson(next);
            if (valid !== isValidJSON) onValidJSONChange(valid);
        },
        [onChange, onValidJSONChange, isValidJSON]
    );

    const showStatus = Boolean(value && value.length > 0);
    const statusId = `${id}-status`;

    return (
        <div>
            <label htmlFor={id} className="mb-2 block text-sm font-medium text-slate-600">
                {label}
            </label>

            <textarea
                id={id}
                value={value}
                onChange={handleChange}
                className={`min-h-[480px] w-full resize-y rounded-xl border bg-slate-50/50 p-4 font-mono text-sm text-slate-800 outline-none transition-all duration-200
          ${!showStatus
                        ? "border-slate-200 focus:border-slate-300 focus:ring-2 focus:ring-slate-200"
                        : isValidJSON
                            ? ""
                            : "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    }`}
            />

            {showStatus && (
                <p
                    id={statusId}
                    className={`mt-2 text-sm ${isValidJSON ? "text-green-500" : "text-red-500"}`}
                >
                    {isValidJSON ? "Valid JSON" : "Invalid JSON"}
                </p>
            )}
        </div>
    );
}
