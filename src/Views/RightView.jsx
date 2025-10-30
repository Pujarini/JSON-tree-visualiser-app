import React, { useState, useEffect } from "react";
import JSONViewer from "../components/JSONViewer";
import { buildTree, findNodeIdByPath, parsePath } from "../utils/jsonTree";
import TreeSearchBar from "../components/TreeSearchBar";


export default function RightView({ graphData, onReset, loading }) {

    const [query, setQuery] = useState("$.user.address.city");
    const [tree, setTree] = useState(null);
    const [focusId, setFocusId] = useState(null);
    const [noMatch, setNoMatch] = useState(false);
    const [rootLabel, setRootLabel] = useState("root");


    useEffect(() => {
        if (!graphData) {
            setTree(null);
            setFocusId(null);
            setNoMatch(false);
            setRootLabel("root");
            return;
        }
        const label = graphData.label || "root";
        const built = buildTree(label, graphData.data);
        setTree(built);
        setRootLabel(label);
        setFocusId(null);
        setNoMatch(false);
    }, [graphData]);

    const onSearch = () => {
        if (!tree) return;
        const parts = parsePath(query, rootLabel);
        const id = findNodeIdByPath(tree, parts);
        if (id) {
            setFocusId(id);
            setNoMatch(false);
        } else {
            setNoMatch(true);
        }
    };


    return (
        <div className="flex flex-col items-end gap-4">
            <TreeSearchBar query={query} onChange={setQuery} noMatch={noMatch} onSearch={onSearch} />
            <JSONViewer tree={tree} focusNodeId={focusId} loading={loading} />
            <button
                onClick={onReset}
                type="button"
                className="flex-start rounded-xl border border-red-500 text-black px-5 py-2.5 shadow hover:bg-red-700 hover:text-white focus:outline-none">
                Reset
            </button>
        </div>
    )
}