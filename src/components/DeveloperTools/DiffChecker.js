import React, { useState } from "react";
import CustomButton from "../../layout/CustomButton";

const computeDiff = (original, modified) => {
  const origLines = original.split("\n");
  const modLines = modified.split("\n");
  const n = origLines.length;
  const m = modLines.length;

  const dp = Array(n + 1)
    .fill(null)
    .map(() => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (origLines[i - 1] === modLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = n, j = m;
  const result = [];
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      result.push({ type: "unchanged", text: origLines[i - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      result.push({ type: "added", text: modLines[j - 1] });
      j--;
    } else {
      result.push({ type: "removed", text: origLines[i - 1] });
      i--;
    }
  }
  return result.reverse();
};

const DiffChecker = () => {
  const [original, setOriginal] = useState("Hello World\nReact is awesome\nLet's run some tests");
  const [modified, setModified] = useState("Hello world!\nReact is really awesome\nLet's run tests");
  const [diffResult, setDiffResult] = useState([]);
  const [hasCompared, setHasCompared] = useState(false);

  const handleCompare = () => {
    const diff = computeDiff(original, modified);
    setDiffResult(diff);
    setHasCompared(true);
  };

  const handleClear = () => {
    setOriginal("");
    setModified("");
    setDiffResult([]);
    setHasCompared(false);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">Code & Text Diff Checker</h2>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Original Text</h3>
          <textarea
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            className="w-full h-48 px-4 py-3 bg-background-default border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
            placeholder="Paste original text here..."
          />
        </div>

        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Modified Text</h3>
          <textarea
            value={modified}
            onChange={(e) => setModified(e.target.value)}
            className="w-full h-48 px-4 py-3 bg-background-default border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
            placeholder="Paste modified text here..."
          />
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <CustomButton onClick={handleCompare} className="w-auto px-8 py-3 mt-0 mb-0">
          Compare Differences
        </CustomButton>
        <button
          onClick={handleClear}
          className="px-6 py-3 rounded-full border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold transition-all text-sm"
        >
          Clear
        </button>
      </div>

      {/* Comparison Output */}
      {hasCompared && (
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Diff Output</h3>
          <div className="w-full bg-black/25 rounded-2xl border border-white/5 overflow-x-auto p-4 flex flex-col font-mono text-sm leading-relaxed max-h-[400px] overflow-y-auto">
            {diffResult.length === 0 ? (
              <span className="text-text-secondary italic">// No differences detected. Text blocks are identical!</span>
            ) : (
              diffResult.map((line, idx) => {
                let lineClass = "text-text-primary pl-4 py-0.5 border-l-4 border-transparent";
                let prefix = "  ";
                if (line.type === "added") {
                  lineClass = "bg-emerald-500/15 text-emerald-400 border-l-4 border-emerald-500 pl-4 py-0.5 font-bold";
                  prefix = "+ ";
                } else if (line.type === "removed") {
                  lineClass = "bg-red-500/15 text-red-400 border-l-4 border-red-500 pl-4 py-0.5 font-bold";
                  prefix = "- ";
                }
                return (
                  <div key={idx} className={lineClass}>
                    <span>{prefix}</span>
                    <span>{line.text || " "}</span>
                  </div>
                );
              })
            )}
          </div>
          <div className="flex gap-4 text-xs font-bold text-text-secondary mt-1">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-red-500/20 border-l-2 border-red-500 inline-block"></span> Deleted
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-emerald-500/20 border-l-2 border-emerald-500 inline-block"></span> Added
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiffChecker;
