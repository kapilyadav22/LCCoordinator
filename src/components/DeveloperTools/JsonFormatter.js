import React, { useState } from "react";
import CustomButton from "../../layout/CustomButton";

const JsonFormatter = () => {
  const [inputJson, setInputJson] = useState('{"name":"Kapil Yadav","role":"developer","active":true,"skills":["React","Node","CSS"],"tools":{"IDE":"VS Code","bundler":"Parcel"}}');
  const [indent, setIndent] = useState("2"); // 2, 4, or tab
  const [result, setResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    setErrorMsg("");
    if (!inputJson.trim()) {
      setResult("");
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      const space = indent === "tab" ? "\t" : parseInt(indent, 10);
      setResult(JSON.stringify(parsed, null, space));
    } catch (e) {
      setErrorMsg(e.message);
      setResult("");
    }
  };

  const handleMinify = () => {
    setErrorMsg("");
    if (!inputJson.trim()) {
      setResult("");
      return;
    }
    try {
      const parsed = JSON.parse(inputJson);
      setResult(JSON.stringify(parsed));
    } catch (e) {
      setErrorMsg(e.message);
      setResult("");
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputJson("");
    setResult("");
    setErrorMsg("");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">JSON Formatter & Validator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-title-main">Input JSON</h3>
            <button
              onClick={handleClear}
              className="text-xs text-red-400 hover:text-red-300 font-mono bg-red-500/10 hover:bg-red-500/20 px-3 py-1 rounded-full border border-red-500/20 transition-all"
            >
              Clear
            </button>
          </div>

          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            className="w-full h-[320px] px-4 py-3 bg-background-default border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
            placeholder='{"key": "value"}'
          />

          <div className="flex flex-wrap gap-4 items-center mt-2 justify-between">
            <div className="flex items-center gap-2">
              <label className="text-xs text-text-secondary uppercase">Indentation</label>
              <select
                value={indent}
                onChange={(e) => setIndent(e.target.value)}
                className="px-3 py-1.5 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none"
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="tab">Tabs</option>
              </select>
            </div>
            <div className="flex gap-2">
              <CustomButton onClick={handleFormat} className="w-auto mt-0 mb-0 px-4 py-2 text-xs">Prettify</CustomButton>
              <CustomButton onClick={handleMinify} className="w-auto mt-0 mb-0 px-4 py-2 text-xs">Minify</CustomButton>
            </div>
          </div>
        </div>

        {/* Output Column */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-title-main">Output</h3>
            {result && (
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
              >
                {copied ? "Copied!" : "Copy Output"}
              </button>
            )}
          </div>

          {errorMsg ? (
            <div className="w-full h-[320px] p-6 border border-red-500/20 bg-red-500/5 text-red-400 rounded-2xl text-sm font-mono overflow-y-auto flex flex-col gap-2">
              <span className="font-bold text-md text-red-500">❌ Invalid JSON:</span>
              <p className="leading-relaxed">{errorMsg}</p>
            </div>
          ) : (
            <pre className="w-full h-[320px] p-6 bg-black/20 rounded-2xl border border-white/5 overflow-auto text-text-primary font-mono text-sm leading-relaxed whitespace-pre select-all">
              {result || "// Formatted output will appear here..."}
            </pre>
          )}

          {!errorMsg && result && (
            <div className="text-xs text-primary-main font-mono bg-primary-main/10 border border-primary-main/20 px-3 py-1.5 rounded-xl w-fit">
              ✓ JSON is Valid and Well-formed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JsonFormatter;
