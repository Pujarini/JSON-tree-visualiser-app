import React, { useCallback, useEffect, useRef, useState } from "react";
import LeftView from "../Views/LeftView";
import RightView from "../Views/RightView";

export default function TreeView() {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const timerRef = useRef(null);

  const handleGenerate = useCallback((rawText) => {
    try {
      const parsed = JSON.parse(rawText);
      setLoading(true);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (
          parsed &&
          typeof parsed === "object" &&
          !Array.isArray(parsed) &&
          Object.keys(parsed).length === 1
        ) {
          const rootLabel = Object.keys(parsed)[0];
          setGraphData({ data: parsed[rootLabel], label: rootLabel });
        } else {
          setGraphData({ data: parsed, label: "root" });
        }
        setLoading(false);
      }, 3000);
    } catch {
      setGraphData(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const resetGraphData = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setGraphData(null);
    setLoading(false);
    setResetSignal((n) => n + 1);
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 md:grid-cols-2">
      <LeftView onGenerate={handleGenerate} resetSignal={resetSignal} />

      <RightView graphData={graphData} onReset={resetGraphData} loading={loading} />
    </div>
  );
}
