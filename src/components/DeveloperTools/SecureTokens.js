import React, { useState, useEffect } from "react";
import CustomButton from "../../layout/CustomButton";

const base64UrlEncode = (str) => {
  try {
    const base64 = btoa(unescape(encodeURIComponent(str)));
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  } catch (e) {
    return "";
  }
};

const generateHMAC = async (message, key, algo) => {
  try {
    const enc = new TextEncoder();
    const keyData = enc.encode(key);
    const msgData = enc.encode(message);

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: { name: algo } },
      false,
      ["sign"]
    );

    const signature = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      msgData
    );

    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (e) {
    return "Error generating HMAC";
  }
};

const signJWT = async (headerStr, payloadStr, secret) => {
  try {
    const part1 = base64UrlEncode(headerStr);
    const part2 = base64UrlEncode(payloadStr);
    if (!part1 || !part2) return "Error: Invalid JSON encoding";
    
    const tokenInput = `${part1}.${part2}`;

    const enc = new TextEncoder();
    const keyData = enc.encode(secret);
    const msgData = enc.encode(tokenInput);

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"]
    );

    const signature = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      msgData
    );

    const signatureBytes = new Uint8Array(signature);
    let signatureBinStr = "";
    for (let i = 0; i < signatureBytes.length; i++) {
      signatureBinStr += String.fromCharCode(signatureBytes[i]);
    }
    const signatureBase64 = btoa(signatureBinStr);
    const signatureBase64Url = signatureBase64
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    return `${tokenInput}.${signatureBase64Url}`;
  } catch (e) {
    return "Error generating signature";
  }
};

const SecureTokens = () => {
  const [subTab, setSubTab] = useState("hmac"); // hmac, jwt

  // HMAC state
  const [hmacMessage, setHmacMessage] = useState("Hello world request payload");
  const [hmacKey, setHmacKey] = useState("super-secret-key-123");
  const [hmacAlgo, setHmacAlgo] = useState("SHA-256"); // SHA-256 or SHA-512
  const [hmacResult, setHmacResult] = useState("");
  const [copiedHmac, setCopiedHmac] = useState(false);

  // JWT Generator state
  const [jwtHeader, setJwtHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}');
  const [jwtPayload, setJwtPayload] = useState('{\n  "sub": "1234567890",\n  "name": "Kapil Yadav",\n  "admin": true,\n  "iat": 1516239022\n}');
  const [jwtSecret, setJwtSecret] = useState("your-256-bit-secret");
  const [jwtResult, setJwtResult] = useState("");
  const [jwtError, setJwtError] = useState("");
  const [copiedJwt, setCopiedJwt] = useState(false);

  // Re-run HMAC generation
  useEffect(() => {
    const runHmac = async () => {
      if (!hmacMessage || !hmacKey) {
        setHmacResult("");
        return;
      }
      const hash = await generateHMAC(hmacMessage, hmacKey, hmacAlgo);
      setHmacResult(hash);
    };
    runHmac();
  }, [hmacMessage, hmacKey, hmacAlgo]);

  // Re-run JWT signature
  useEffect(() => {
    const runJwt = async () => {
      setJwtError("");
      try {
        JSON.parse(jwtHeader);
      } catch (e) {
        setJwtError("Header is not valid JSON.");
        setJwtResult("");
        return;
      }
      try {
        JSON.parse(jwtPayload);
      } catch (e) {
        setJwtError("Payload is not valid JSON.");
        setJwtResult("");
        return;
      }
      if (!jwtSecret.trim()) {
        setJwtResult("");
        return;
      }
      const token = await signJWT(jwtHeader, jwtPayload, jwtSecret);
      setJwtResult(token);
    };
    runJwt();
  }, [jwtHeader, jwtPayload, jwtSecret]);

  const copyText = (text, setCopiedState) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header and Sub Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel gap-4 border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">Secure Tokens Generator</h2>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10 shadow-inner">
          <button
            onClick={() => setSubTab("hmac")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              subTab === "hmac" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            HMAC Signer
          </button>
          <button
            onClick={() => setSubTab("jwt")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              subTab === "jwt" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            JWT Mock Signer
          </button>
        </div>
      </div>

      {subTab === "hmac" && (
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">HMAC Signature Calculator</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-secondary uppercase">Signature Secret Key</label>
              <input
                type="text"
                value={hmacKey}
                onChange={(e) => setHmacKey(e.target.value)}
                className="px-4 py-2.5 bg-background-default border border-white/10 rounded-xl text-text-primary font-mono text-sm focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-text-secondary uppercase">HMAC Algorithm</label>
              <select
                value={hmacAlgo}
                onChange={(e) => setHmacAlgo(e.target.value)}
                className="px-4 py-2.5 bg-background-default border border-white/10 rounded-xl text-text-primary text-xs focus:outline-none"
              >
                <option value="SHA-256">HMAC-SHA256</option>
                <option value="SHA-512">HMAC-SHA512</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-sm font-bold text-title-main">Request Message Payload</label>
            <textarea
              value={hmacMessage}
              onChange={(e) => setHmacMessage(e.target.value)}
              className="w-full h-24 px-4 py-3 bg-background-default border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
            />
          </div>

          {hmacResult && (
            <div className="mt-4 p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">Generated Signature (Hex)</span>
                <button
                  onClick={() => copyText(hmacResult, setCopiedHmac)}
                  className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
                >
                  {copiedHmac ? "Copied!" : "Copy Signature"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-all font-mono text-primary-main text-sm sm:text-md bg-black/20 p-4 rounded-xl border border-white/5 mt-1 select-all font-bold">
                {hmacResult}
              </pre>
            </div>
          )}
        </div>
      )}

      {subTab === "jwt" && (
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">JWT Token Generator & Signer</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-secondary uppercase">JWT Header (JSON)</label>
                <textarea
                  value={jwtHeader}
                  onChange={(e) => setJwtHeader(e.target.value)}
                  className="w-full h-28 px-4 py-3 bg-background-default border border-white/10 rounded-xl text-text-primary font-mono text-xs focus:outline-none focus:ring-1"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-secondary uppercase">JWT Payload Claims (JSON)</label>
                <textarea
                  value={jwtPayload}
                  onChange={(e) => setJwtPayload(e.target.value)}
                  className="w-full h-40 px-4 py-3 bg-background-default border border-white/10 rounded-xl text-text-primary font-mono text-xs focus:outline-none focus:ring-1"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-between">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-secondary uppercase">HMAC HS256 Secret Key</label>
                <input
                  type="text"
                  value={jwtSecret}
                  onChange={(e) => setJwtSecret(e.target.value)}
                  className="px-4 py-2.5 bg-background-default border border-white/10 rounded-xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1"
                />
              </div>

              {jwtError && (
                <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 rounded-2xl text-xs font-mono">
                  ❌ Error: {jwtError}
                </div>
              )}

              {jwtResult && (
                <div className="p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2 relative h-fit justify-end">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">Signed JSON Web Token</span>
                    <button
                      onClick={() => copyText(jwtResult, setCopiedJwt)}
                      className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
                    >
                      {copiedJwt ? "Copied!" : "Copy Token"}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap break-all font-mono text-title-main text-xs bg-black/25 p-4 rounded-xl border border-white/5 mt-1 select-all select-none">
                    {jwtResult}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecureTokens;
