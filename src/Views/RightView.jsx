import React from "react";
import SearchJSONBox from "../components/SearchJSONBox";
import JSONViewer from "../components/JSONViewer";

export default function RightView({ query, onSearchQueryChange }) {

    return (
        <div className="flex flex-col">
            <SearchJSONBox query={query} onChange={onSearchQueryChange} />
            <JSONViewer />
        </div>
    )
}