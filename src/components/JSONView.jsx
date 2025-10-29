import React, { useState } from "react";
import LeftView from "../Views/LeftView";
import RightView from "../Views/RightView";

export default function JSONView() {
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
  const [isValidJSON, setIsValidJSON] = useState(true);


  const [graphData, setGraphData] = useState(null);

  const onGenerate = () => {
    try {
      const parsed = JSON.parse(jsonText);
      let rootLabel = "root";
      if (
        parsed &&
        typeof parsed === "object" &&
        !Array.isArray(parsed) &&
        Object.keys(parsed).length === 1
      ) {
        rootLabel = Object.keys(parsed)[0];
        setGraphData({ data: parsed[rootLabel], label: rootLabel });
      } else {
        setGraphData({ data: parsed, label: "root" });
      }
    } catch {
      setGraphData(null);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-2">
      {/* Left: Textarea + Generate button */}
      <LeftView input={jsonText} onInputChange={setJsonText} isValidJSON={isValidJSON} onValidJSONChange={setIsValidJSON} onGenerate={onGenerate} />

      {/* Right: Search input + tree preview placeholder */}
      <RightView graphData={graphData} />
    </div>
  )
}