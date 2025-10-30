import React from "react";
import JSONInputBox from "../components/JSONInputBox";
import GenerateJSONBtn from "../components/GenerateJSONBtn";

export default function LeftView({ input, onInputChange, isValidJSON, onValidJSONChange, onGenerate }) {

    return (
        <div className="flex flex-col gap-2">
            <JSONInputBox value={input} onChange={onInputChange} isValidJSON={isValidJSON} onValidJSONChange={onValidJSONChange} />
            <GenerateJSONBtn disabledBtn={isValidJSON} onClick={onGenerate} />
        </div>
    )
}