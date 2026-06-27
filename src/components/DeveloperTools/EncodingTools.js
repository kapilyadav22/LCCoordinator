import React, { useState } from "react";
import CustomTextField from "../../layout/CustomTextField";
import CustomButton from "../../layout/CustomButton";

const decodeBase64Url = (str) => {
  try {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch (err) {
    return null;
  }
};

const safeBase64Encode = (str) => {
  try {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  } catch (e) {
    return "Error: Could not encode string.";
  }
};

const safeBase64Decode = (str) => {
  try {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (e) {
    return "Error: Invalid Base64 string.";
  }
};

const EncodingTools = () => {
  const [subTab, setSubTab] = useState("coder"); // coder or jwt
  
  // Base64/URL coder state
  const [coderInput, setCoderInput] = useState("");
  const [coderResult, setCoderResult] = useState("");
  const [copiedCoder, setCopiedCoder] = useState(false);

  // JWT state
  const [jwtInput, setJwtInput] = useState("");
  const [jwtHeader, setJwtHeader] = useState(null);
  const [jwtPayload, setJwtPayload] = useState(null);
  const [jwtError, setJwtError] = useState("");

  const handleBase64Encode = () => {
    setCoderResult(safeBase64Encode(coderInput));
  };

  const handleBase64Decode = () => {
    setCoderResult(safeBase64Decode(coderInput));
  };

  const handleUrlEncode = () => {
    try {
      setCoderResult(encodeURIComponent(coderInput));
    } catch (e) {
      setCoderResult("Error: Invalid input.");
    }
  };

  const handleUrlDecode = () => {
    try {
      setCoderResult(decodeURIComponent(coderInput));
    } catch (e) {
      setCoderResult("Error: Invalid URI format.");
    }
  };

  const handleJwtInspect = (token) => {
    const val = token.trim();
    setJwtInput(val);
    if (!val) {
      setJwtHeader(null);
      setJwtPayload(null);
      setJwtError("");
      return;
    }

    const parts = val.split(".");
    if (parts.length !== 3) {
      setJwtError("Invalid JWT Format: Tokens must contain exactly 3 dot-separated segments (Header, Payload, Signature).");
      setJwtHeader(null);
      setJwtPayload(null);
      return;
    }

    const decodedHeaderStr = decodeBase64Url(parts[0]);
    const decodedPayloadStr = decodeBase64Url(parts[1]);

    if (!decodedHeaderStr || !decodedPayloadStr) {
      setJwtError("Failed to decode segments: Invalid Base64Url encoding.");
      setJwtHeader(null);
      setJwtPayload(null);
      return;
    }

    try {
      setJwtHeader(JSON.parse(decodedHeaderStr));
      setJwtPayload(JSON.parse(decodedPayloadStr));
      setJwtError("");
    } catch (err) {
      setJwtError("Failed to parse JSON content from the decoded claims.");
      setJwtHeader(null);
      setJwtPayload(null);
    }
  };

  const formatClaimsDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = new Date(timestamp * 1000);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const getExpirationStatus = (exp) => {
    if (!exp) return "No expiration set";
    const now = Math.floor(Date.now() / 1000);
    if (now > exp) {
      return <span className="text-red-400 font-bold">Expired</span>;
    }
    const diff = exp - now;
    const mins = Math.floor(diff / 60);
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) {
      return <span className="text-primary-main font-medium">Valid (expires in {hrs}h {mins % 60}m)</span>;
    }
    return <span className="text-primary-main font-medium">Valid (expires in {mins}m)</span>;
  };

  const copyToClipboard = (text, setCopiedState) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header and Sub Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel gap-4 border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">Encoding & JWT Inspector</h2>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10 shadow-inner">
          <button
            onClick={() => setSubTab("coder")}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              subTab === "coder" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Base64 / URL Coder
          </button>
          <button
            onClick={() => setSubTab("jwt")}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              subTab === "jwt" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            JWT Inspector
          </button>
        </div>
      </div>

      {subTab === "coder" ? (
        /* Base64 & URL Coder */
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-title-main">Input Raw or Encoded Text</label>
            <textarea
              value={coderInput}
              onChange={(e) => setCoderInput(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main focus:border-title-main"
              placeholder="Type or paste your text here..."
            />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-2">
            <CustomButton onClick={handleBase64Encode} className="sm:w-auto mt-0 mb-0">Base64 Encode</CustomButton>
            <CustomButton onClick={handleBase64Decode} className="sm:w-auto mt-0 mb-0">Base64 Decode</CustomButton>
            <CustomButton onClick={handleUrlEncode} className="sm:w-auto mt-0 mb-0">URL Encode</CustomButton>
            <CustomButton onClick={handleUrlDecode} className="sm:w-auto mt-0 mb-0">URL Decode</CustomButton>
          </div>

          {coderResult && (
            <div className="mt-6 p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2 relative">
              <div className="flex justify-between items-center">
                <h6 className="text-lg font-bold text-title-main">Result:</h6>
                <button
                  onClick={() => copyToClipboard(coderResult, setCopiedCoder)}
                  className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
                >
                  {copiedCoder ? "Copied!" : "Copy Result"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words font-mono text-text-primary text-sm sm:text-base bg-black/20 p-4 rounded-xl border border-white/5 mt-2">
                {coderResult}
              </pre>
            </div>
          )}
        </div>
      ) : (
        /* JWT Inspector */
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-title-main">Paste Encoded JWT Token</label>
            <textarea
              value={jwtInput}
              onChange={(e) => handleJwtInspect(e.target.value)}
              className="w-full h-24 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main focus:border-title-main break-all"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
            />
          </div>

          {jwtError && (
            <div className="mt-4 p-4 border border-red-500/20 rounded-2xl bg-red-500/5 text-red-400 text-sm">
              {jwtError}
            </div>
          )}

          {jwtPayload && (
            <div className="flex flex-col gap-6 mt-4">
              
              {/* Claims Metadata Panel */}
              <div className="p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-3">
                <h3 className="text-lg font-bold text-title-main mb-1">Decoded Token Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col p-3 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-xs text-text-secondary uppercase tracking-widest">Expiration Time (exp)</span>
                    <span className="text-sm text-text-primary font-mono mt-1">{formatClaimsDate(jwtPayload.exp)}</span>
                  </div>
                  <div className="flex flex-col p-3 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-xs text-text-secondary uppercase tracking-widest">Token Status</span>
                    <span className="text-sm mt-1">{getExpirationStatus(jwtPayload.exp)}</span>
                  </div>
                  <div className="flex flex-col p-3 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-xs text-text-secondary uppercase tracking-widest">Issued At (iat)</span>
                    <span className="text-sm text-text-primary font-mono mt-1">{formatClaimsDate(jwtPayload.iat)}</span>
                  </div>
                  <div className="flex flex-col p-3 bg-black/20 rounded-xl border border-white/5">
                    <span className="text-xs text-text-secondary uppercase tracking-widest">Subject (sub)</span>
                    <span className="text-sm text-primary-main font-mono mt-1">{jwtPayload.sub || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* Decoded Blocks Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Header */}
                <div className="p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2">
                  <h6 className="text-md font-bold text-primary-main font-mono">HEADER: ALGORITHM & TOKEN TYPE</h6>
                  <pre className="whitespace-pre-wrap break-words font-mono text-text-primary text-sm bg-black/20 p-4 rounded-xl border border-white/5 mt-2 h-64 overflow-y-auto">
                    {JSON.stringify(jwtHeader, null, 2)}
                  </pre>
                </div>
                {/* Payload */}
                <div className="p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2">
                  <h6 className="text-md font-bold text-title-main font-mono">PAYLOAD: DATA / CLAIMS</h6>
                  <pre className="whitespace-pre-wrap break-words font-mono text-text-primary text-sm bg-black/20 p-4 rounded-xl border border-white/5 mt-2 h-64 overflow-y-auto">
                    {JSON.stringify(jwtPayload, null, 2)}
                  </pre>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default EncodingTools;
