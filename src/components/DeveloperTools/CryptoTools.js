import React, { useState, useEffect } from "react";
import CustomButton from "../../layout/CustomButton";

// Pure JS UUIDv4
const generateUUIDv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Pure JS ULID
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const generateULID = () => {
  const now = Date.now();
  let timeStr = "";
  let t = now;
  for (let i = 0; i < 10; i++) {
    timeStr = ENCODING[t % 32] + timeStr;
    t = Math.floor(t / 32);
  }
  let randStr = "";
  for (let i = 0; i < 16; i++) {
    const rand = Math.floor(Math.random() * 32);
    randStr += ENCODING[rand];
  }
  return timeStr + randStr;
};

// SHA Hashing helper
const calculateSHA = async (text, algo) => {
  if (!text) return "";
  try {
    const msgUint8 = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (e) {
    return "Error calculating hash";
  }
};

const CryptoTools = () => {
  const [subTab, setSubTab] = useState("uuids"); // uuids or hashing
  
  // UUID/ULID Generator States
  const [generatorType, setGeneratorType] = useState("uuidv4"); // uuidv4 or ulid
  const [generateCount, setGenerateCount] = useState(5);
  const [generatedList, setGeneratedList] = useState([]);
  const [copiedList, setCopiedList] = useState(false);

  // Hashing States
  const [hashInput, setHashInput] = useState("Hello World");
  const [sha1Result, setSha1Result] = useState("");
  const [sha256Result, setSha256Result] = useState("");
  const [sha512Result, setSha512Result] = useState("");

  const handleGenerate = () => {
    const list = [];
    const count = Math.min(Math.max(generateCount, 1), 100);
    for (let i = 0; i < count; i++) {
      list.push(generatorType === "uuidv4" ? generateUUIDv4() : generateULID());
    }
    setGeneratedList(list);
  };

  // Run Hashing on input change
  useEffect(() => {
    const computeHashes = async () => {
      if (!hashInput) {
        setSha1Result("");
        setSha256Result("");
        setSha512Result("");
        return;
      }
      setSha1Result(await calculateSHA(hashInput, "SHA-1"));
      setSha256Result(await calculateSHA(hashInput, "SHA-256"));
      setSha512Result(await calculateSHA(hashInput, "SHA-512"));
    };
    computeHashes();
  }, [hashInput]);

  const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header and Sub Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel gap-4 border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">Crypto & ID Generator</h2>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10 shadow-inner">
          <button
            onClick={() => setSubTab("uuids")}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              subTab === "uuids" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            UUID / ULID Generator
          </button>
          <button
            onClick={() => setSubTab("hashing")}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              subTab === "hashing" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Hash Calculator
          </button>
        </div>
      </div>

      {subTab === "uuids" ? (
        /* UUID/ULID generator */
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Generate Unique Identifiers</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xs text-text-secondary uppercase mb-1.5">Identifier Type</label>
              <select
                value={generatorType}
                onChange={(e) => setGeneratorType(e.target.value)}
                className="px-4 py-2.5 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none focus:ring-1 focus:ring-title-main"
              >
                <option value="uuidv4">UUID v4 (Standard Cryptographic ID)</option>
                <option value="ulid">ULID (Lexicographically Sortable ID)</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-text-secondary uppercase mb-1.5">Quantity (1 - 100)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={generateCount}
                onChange={(e) => setGenerateCount(parseInt(e.target.value, 10) || 1)}
                className="px-4 py-2 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none focus:ring-1 focus:ring-title-main font-mono"
              />
            </div>
          </div>

          <div className="mt-2">
            <CustomButton onClick={handleGenerate}>Generate Identifiers</CustomButton>
          </div>

          {generatedList.length > 0 && (
            <div className="mt-6 p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2 relative">
              <div className="flex justify-between items-center">
                <h6 className="text-xs uppercase tracking-widest text-text-secondary">Generated Results ({generatedList.length})</h6>
                <button
                  onClick={() => copyToClipboard(generatedList.join("\n"), setCopiedList)}
                  className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
                >
                  {copiedList ? "Copied All!" : "Copy All"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words font-mono text-primary-main text-sm bg-black/20 p-4 rounded-xl border border-white/5 mt-2 max-h-[300px] overflow-y-auto">
                {generatedList.join("\n")}
              </pre>
            </div>
          )}
        </div>
      ) : (
        /* Hashing & Checksums */
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Offline Hashing & Checksums</h3>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-title-main">Input String</label>
            <textarea
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              className="w-full h-24 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
              placeholder="Enter text to hash..."
            />
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <div className="p-4 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-1.5 relative">
              <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">SHA-256 Hash</span>
              <pre className="text-sm text-primary-main font-mono break-all bg-black/20 p-3 rounded-lg border border-white/5 select-all">{sha256Result}</pre>
            </div>

            <div className="p-4 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-1.5 relative">
              <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">SHA-512 Hash</span>
              <pre className="text-sm text-title-main font-mono break-all bg-black/20 p-3 rounded-lg border border-white/5 select-all">{sha512Result}</pre>
            </div>

            <div className="p-4 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-1.5 relative">
              <span className="text-xs text-text-secondary uppercase tracking-widest font-bold">SHA-1 Hash</span>
              <pre className="text-sm text-text-primary font-mono break-all bg-black/20 p-3 rounded-lg border border-white/5 select-all">{sha1Result}</pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CryptoTools;
