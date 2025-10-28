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

    const [query, setQuery] = useState("S.user.address.city");

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-2">
            {/* Left: Textarea + Generate button */}
            <LeftView input={jsonText} onInputChange={setJsonText} isValidJSON={isValidJSON} onValidJSONChange={setIsValidJSON} />

            {/* Right: Search input + tree preview placeholder */}
            <RightView searchQuery={query} onSearchQueryChange={setQuery} />
        </div>
    )
}