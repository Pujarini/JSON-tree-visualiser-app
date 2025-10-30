import React, { useEffect, useState } from "react";

import GenerateTreeButton from "../components/GenerateTreeButton";
import JSONEditor from "../components/JSONEditor";

export default function LeftView({ onGenerate, resetSignal }) {
    const [jsonText, setJsonText] = useState(`{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {
      "city": "New York",
      "country": "USA"
    },
    "items": [
      { "name": "item1" },
      { "name": "item2" }
    ]
  }
}`);
    const [isValid, setIsValid] = useState(true);


    useEffect(() => {
        if (resetSignal) {
            setJsonText("");
            setIsValid(true);
        }
    }, [resetSignal]);

    const handleChange = (value) => {
        setJsonText(value);
        try {
            JSON.parse(value);
            setIsValid(true);
        } catch {
            setIsValid(false);
        }
    };

    const handleGenerate = () => {
        if (isValid && jsonText.trim()) {
            onGenerate(jsonText);
        }
    };


    return (
        <div className="flex flex-col gap-2">
            <JSONEditor
                value={jsonText}
                onChange={handleChange}
                isValidJSON={isValid}
            />
            <GenerateTreeButton
                disabledBtn={isValid}
                onClick={handleGenerate}
            />
        </div>
    );
}
