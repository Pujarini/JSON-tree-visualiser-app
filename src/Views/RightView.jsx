import React, { useCallback, useEffect, useMemo, useState } from "react";
import JSONViewer from "../components/JSONViewer";
import TreeSearchBar from "../components/TreeSearchBar";
import { buildNodePathMap, buildTree, findNodeIdByPath, parsePath } from "../utils/jsonTree";

export default function RightView({ graphData, onReset, loading }) {
    const [query, setQuery] = useState("$.user.address.city");
    const [focusId, setFocusId] = useState(null);
    const [noMatch, setNoMatch] = useState(false);

    const { rootLabel, tree } = useMemo(() => {
        if (!graphData) return { rootLabel: "root", tree: null };
        const label = graphData.label || "root";
        return { rootLabel: label, tree: buildTree(label, graphData.data) };
    }, [graphData]);


    useEffect(() => {
        setFocusId(null);
        setNoMatch(false);
    }, [tree]);

    const onSearch = useCallback(() => {
        if (!tree) return;
        const parts = parsePath(query, rootLabel);
        const id = findNodeIdByPath(tree, parts);
        if (id) {
            setFocusId(id);
            setNoMatch(false);
        } else {
            setNoMatch(true);
        }
    }, [tree, query, rootLabel]);

    const handleReset = useCallback(() => {
        if (!loading) onReset();
    }, [loading, onReset]);

    const nodePathMap = useMemo(() => buildNodePathMap(tree, rootLabel), [tree, rootLabel]);

    return (
        <div className="flex w-full max-w-full flex-col gap-4">
            <TreeSearchBar
                query={query}
                onChange={setQuery}
                noMatch={noMatch}
                onSearch={onSearch}
                disabled={loading || !tree}
            />

            <JSONViewer tree={tree} focusNodeId={focusId} loading={loading} nodePathMap={nodePathMap} />

            <div className="mt-1">
                <button
                    type="button"
                    onClick={handleReset}
                    disabled={loading && !tree ? true : false}
                    className={`rounded-xl border px-5 py-2.5 shadow transition-colors
            ${loading
                            ? "border-slate-300 text-slate-400 cursor-not-allowed"
                            : "border-red-500 text-black hover:bg-red-700 hover:text-white"
                        }`}
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
