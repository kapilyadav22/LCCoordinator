import React, { useState } from "react";
import CustomButton from "../../layout/CustomButton";

const parseUA = (uaString) => {
  if (!uaString) return { browser: "Unknown", os: "Unknown", engine: "Unknown", device: "Desktop" };
  const ua = uaString.toLowerCase();
  
  let browser = "Unknown";
  if (ua.includes("firefox")) browser = "Mozilla Firefox";
  else if (ua.includes("opr") || ua.includes("opera")) browser = "Opera";
  else if (ua.includes("edg")) browser = "Microsoft Edge";
  else if (ua.includes("chrome")) browser = "Google Chrome";
  else if (ua.includes("safari")) browser = "Apple Safari";

  let os = "Unknown";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("macintosh") || ua.includes("mac os x")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("iphone") || ua.includes("ipad")) os = "iOS";

  let engine = "Unknown";
  if (ua.includes("webkit")) engine = "WebKit (Blink)";
  else if (ua.includes("gecko")) engine = "Gecko (Firefox)";
  else if (ua.includes("trident")) engine = "Trident (IE)";

  let device = "Desktop";
  if (ua.includes("mobi") || ua.includes("phone")) device = "Mobile";
  else if (ua.includes("tablet") || ua.includes("ipad")) device = "Tablet";

  return { browser, os, engine, device };
};

const WebHelpers = () => {
  const [subTab, setSubTab] = useState("url"); // url, ua, base64

  // URL Coder
  const [urlInput, setUrlInput] = useState("https://example.com/search?query=react developer & category=jobs");
  const [urlResult, setUrlResult] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);

  // User Agent
  const [uaInput, setUaInput] = useState(typeof navigator !== "undefined" ? navigator.userAgent : "");
  const [parsedUa, setParsedUa] = useState(parseUA(typeof navigator !== "undefined" ? navigator.userAgent : ""));

  // Base64 Image
  const [base64Result, setBase64Result] = useState("");
  const [imageName, setImageName] = useState("");
  const [copiedBase64, setCopiedBase64] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  const handleUrlEncode = () => {
    try {
      setUrlResult(encodeURIComponent(urlInput));
    } catch (e) {
      setUrlResult("Error: Could not encode input.");
    }
  };

  const handleUrlDecode = () => {
    try {
      setUrlResult(decodeURIComponent(urlInput));
    } catch (e) {
      setUrlResult("Error: Invalid URI format.");
    }
  };

  const handleDetectUa = () => {
    const currentUa = navigator.userAgent;
    setUaInput(currentUa);
    setParsedUa(parseUA(currentUa));
  };

  const handleUaChange = (val) => {
    setUaInput(val);
    setParsedUa(parseUA(val));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Result(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const copyText = (text, setCopiedState) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header and Sub Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel gap-4 border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">Web Utilities Workbench</h2>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10 shadow-inner">
          <button
            onClick={() => setSubTab("url")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              subTab === "url" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            URL Codec
          </button>
          <button
            onClick={() => setSubTab("ua")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              subTab === "ua" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            UA Parser
          </button>
          <button
            onClick={() => setSubTab("base64")}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              subTab === "base64" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Base64 Image
          </button>
        </div>
      </div>

      {subTab === "url" && (
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">URL Encoder / Decoder</h3>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-title-main">Input Raw or Encoded URL</label>
            <textarea
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full h-24 px-4 py-3 bg-background-default border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
            />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-1">
            <CustomButton onClick={handleUrlEncode} className="sm:w-auto mt-0 mb-0 px-5 py-2">Encode URL</CustomButton>
            <CustomButton onClick={handleUrlDecode} className="sm:w-auto mt-0 mb-0 px-5 py-2">Decode URL</CustomButton>
          </div>

          {urlResult && (
            <div className="mt-4 p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2 relative">
              <div className="flex justify-between items-center">
                <h6 className="text-sm uppercase font-bold text-title-main">Result:</h6>
                <button
                  onClick={() => copyText(urlResult, setCopiedUrl)}
                  className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
                >
                  {copiedUrl ? "Copied!" : "Copy Result"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-all font-mono text-text-primary text-sm bg-black/20 p-4 rounded-xl border border-white/5 mt-1 select-all">
                {urlResult}
              </pre>
            </div>
          )}
        </div>
      )}

      {subTab === "ua" && (
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-title-main">User Agent Parser</h3>
            <button
              onClick={handleDetectUa}
              className="px-3 py-1.5 rounded-xl bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs font-bold border border-primary-main/20 transition-all"
            >
              Detect My User Agent
            </button>
          </div>

          <textarea
            value={uaInput}
            onChange={(e) => handleUaChange(e.target.value)}
            className="w-full h-20 px-4 py-3 bg-background-default border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
            placeholder="Mozilla/5.0..."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {[
              { label: "Browser", val: parsedUa.browser },
              { label: "Operating System", val: parsedUa.os },
              { label: "Rendering Engine", val: parsedUa.engine },
              { label: "Device Type", val: parsedUa.device }
            ].map((box, idx) => (
              <div key={idx} className="flex flex-col p-4 bg-black/20 rounded-2xl border border-white/5 select-all">
                <span className="text-xs text-text-secondary uppercase tracking-wider font-bold">{box.label}</span>
                <span className="text-md text-primary-main font-semibold mt-1">{box.val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "base64" && (
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Base64 Image Encoder</h3>

          <div className="border-2 border-dashed border-white/10 hover:border-title-main/40 transition-all rounded-3xl p-8 flex flex-col items-center justify-center gap-3 bg-white/5 relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <span className="text-sm text-text-primary font-semibold">
              {imageName ? `Selected File: ${imageName}` : "Click or Drag Image Here to Convert"}
            </span>
            <span className="text-xs text-text-secondary">PNG, JPEG, GIF, SVG or WebP formats</span>
          </div>

          {base64Result && (
            <div className="mt-4 flex flex-col gap-4">
              {/* Output String Box */}
              <div className="p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2 relative">
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest text-text-secondary font-bold">Base64 Data URI</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyText(base64Result, setCopiedBase64)}
                      className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
                    >
                      {copiedBase64 ? "Copied!" : "Copy URI"}
                    </button>
                    <button
                      onClick={() => copyText(`<img src="${base64Result}" alt="embedded image" />`, setCopiedHtml)}
                      className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
                    >
                      {copiedHtml ? "Copied!" : "Copy HTML <img> Tag"}
                    </button>
                  </div>
                </div>
                <textarea
                  readOnly
                  value={base64Result}
                  className="w-full h-32 px-4 py-3 bg-black/25 border border-white/10 rounded-2xl text-text-primary font-mono text-xs focus:outline-none select-all"
                />
              </div>

              {/* Live Preview Image */}
              <div className="flex flex-col items-center justify-center p-4 bg-black/10 rounded-2xl border border-white/5">
                <span className="text-xs text-text-secondary uppercase mb-2 font-bold">Image Preview</span>
                <img src={base64Result} alt="decoded preview" className="max-h-[160px] object-contain rounded-lg border border-white/5 shadow-md" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebHelpers;
