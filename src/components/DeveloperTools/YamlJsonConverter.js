import React, { useState } from "react";
import CustomButton from "../../layout/CustomButton";

// Pure JS JSON to YAML
const jsonToYaml = (obj, indent = 0) => {
  if (obj === null) return "null";
  if (typeof obj === "string") return `"${obj.replace(/"/g, '\\"')}"`;
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
  
  const spaces = " ".repeat(indent);
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj.map(item => `${spaces}- ${jsonToYaml(item, indent + 2).trim()}`).join("\n");
  }
  
  if (typeof obj === "object") {
    return Object.entries(obj)
      .map(([key, val]) => {
        const valStr = jsonToYaml(val, indent + 2);
        if (typeof val === "object" && val !== null) {
          return `${spaces}${key}:\n${valStr}`;
        }
        return `${spaces}${key}: ${valStr}`;
      })
      .join("\n");
  }
  return String(obj);
};

// Pure JS YAML to JSON (Indentation-based)
const yamlToJson = (yamlStr) => {
  const lines = yamlStr.split("\n");
  const result = {};
  const path = []; // Stack to track object hierarchy
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    
    const indent = line.search(/\S/);
    const colonIdx = trimmed.indexOf(":");
    
    if (colonIdx !== -1) {
      const key = trimmed.substring(0, colonIdx).trim();
      const valStr = trimmed.substring(colonIdx + 1).trim();
      
      let val = valStr;
      if (val === "true") val = true;
      else if (val === "false") val = false;
      else if (val === "null") val = null;
      else if (!isNaN(val) && val !== "") val = Number(val);
      else if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }

      while (path.length > 0 && path[path.length - 1].indent >= indent) {
        path.pop();
      }
      
      const parent = path.length > 0 ? path[path.length - 1].obj : result;
      
      if (val === "" && !trimmed.endsWith(":")) {
        const newObj = {};
        parent[key] = newObj;
        path.push({ key, indent, obj: newObj });
      } else {
        parent[key] = val;
      }
    } else if (trimmed.startsWith("- ")) {
      const valStr = trimmed.substring(2).trim();
      let val = valStr;
      if (val === "true") val = true;
      else if (val === "false") val = false;
      else if (val === "null") val = null;
      else if (!isNaN(val) && val !== "") val = Number(val);

      while (path.length > 0 && path[path.length - 1].indent >= indent) {
        path.pop();
      }
      
      if (path.length > 0) {
        const parentRecord = path[path.length - 1];
        const parentKey = parentRecord.key;
        const grandParent = path.length > 1 ? path[path.length - 2].obj : result;
        if (!Array.isArray(grandParent[parentKey])) {
          grandParent[parentKey] = [];
        }
        grandParent[parentKey].push(val);
      }
    }
  });
  return result;
};

// Pure JS JSON to CSV
const jsonToCsv = (jsonStr) => {
  const parsed = JSON.parse(jsonStr);
  const arr = Array.isArray(parsed) ? parsed : [parsed];
  if (arr.length === 0) return "";
  
  const headers = Object.keys(arr[0]);
  const csvLines = [headers.join(",")];
  
  arr.forEach(item => {
    const values = headers.map(header => {
      const val = item[header];
      const valStr = typeof val === "object" && val !== null ? JSON.stringify(val) : String(val === null ? "" : val);
      const escaped = valStr.replace(/"/g, '""');
      return escaped.includes(",") || escaped.includes('"') || escaped.includes("\n") ? `"${escaped}"` : escaped;
    });
    csvLines.push(values.join(","));
  });
  
  return csvLines.join("\n");
};

// Pure JS CSV to JSON
const csvToJson = (csvStr) => {
  const lines = csvStr.trim().split("\n");
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(",").map(h => h.trim());
  const result = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = line.split(",").map(v => v.trim());
    const obj = {};
    headers.forEach((header, idx) => {
      let val = values[idx] || "";
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1).replace(/""/g, '"');
      }
      
      if (val === "true") val = true;
      else if (val === "false") val = false;
      else if (val === "null") val = null;
      else if (!isNaN(val) && val !== "") val = Number(val);
      
      obj[header] = val;
    });
    result.push(obj);
  }
  return result;
};

const YamlJsonConverter = () => {
  const [inputVal, setInputVal] = useState(`{\n  "appName": "LCCoordinator",\n  "version": 1.2,\n  "isActive": true,\n  "tags": [\n    "react",\n    "tailwind",\n    "parcel"\n  ]\n}`);
  const [outputVal, setOutputVal] = useState("");
  const [mode, setMode] = useState("json-yaml"); // json-yaml, yaml-json, json-csv, csv-json
  const [errorText, setErrorText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    const trimmed = inputVal.trim();
    if (!trimmed) {
      setOutputVal("");
      setErrorText("");
      return;
    }

    try {
      if (mode === "json-yaml") {
        const obj = JSON.parse(trimmed);
        setOutputVal(jsonToYaml(obj));
        setErrorText("");
      } else if (mode === "yaml-json") {
        const obj = yamlToJson(trimmed);
        setOutputVal(JSON.stringify(obj, null, 2));
        setErrorText("");
      } else if (mode === "json-csv") {
        setOutputVal(jsonToCsv(trimmed));
        setErrorText("");
      } else if (mode === "csv-json") {
        const obj = csvToJson(trimmed);
        setOutputVal(JSON.stringify(obj, null, 2));
        setErrorText("");
      }
    } catch (e) {
      setErrorText(`Conversion Error: ${e.message || "Invalid input formatting."}`);
      setOutputVal("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel gap-4 border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">YAML ⇆ JSON ⇆ CSV</h2>
        <div className="flex flex-wrap bg-white/5 rounded-full p-1 border border-white/10 shadow-inner">
          {[
            { id: "json-yaml", label: "JSON ⇆ YAML" },
            { id: "yaml-json", label: "YAML ⇆ JSON" },
            { id: "json-csv", label: "JSON ⇆ CSV" },
            { id: "csv-json", label: "CSV ⇆ JSON" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setMode(item.id);
                setOutputVal("");
                setErrorText("");
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                mode === item.id ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Pane */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Input Data</h3>
          <textarea
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full h-80 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
            placeholder={
              mode.startsWith("json")
                ? "{\n  \"key\": \"value\"\n}"
                : mode.startsWith("yaml")
                ? "key: value"
                : "header1,header2\nval1,val2"
            }
          />
          <CustomButton onClick={handleConvert}>Convert Format</CustomButton>
        </div>

        {/* Output Pane */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-title-main">Converted Output</h3>
            {outputVal && (
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
              >
                {copied ? "Copied!" : "Copy Result"}
              </button>
            )}
          </div>
          
          {errorText ? (
            <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 rounded-2xl text-sm h-80 font-mono overflow-y-auto">
              {errorText}
            </div>
          ) : (
            <textarea
              readOnly
              value={outputVal}
              className="w-full h-80 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-primary-main font-mono text-sm focus:outline-none resize-none"
              placeholder="Conversion results will appear here..."
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default YamlJsonConverter;
