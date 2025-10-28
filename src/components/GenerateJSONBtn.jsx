import React from "react";


export default function GenerateJSONBtn({ disabledBtn }) {
    return (
        <div className="mt-4">
            <button
                onClick={() => console.log("clicked")}
                type="button"
                disabled={!disabledBtn}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-white shadow hover:bg-blue-700 focus:outline-none disabled:bg-gray-500 disabled:cursor-not-allowed">
                Generate Tree
            </button>
        </div>
    )
}