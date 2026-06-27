import React, { useState, useEffect } from "react";
import CustomTextField from "../../layout/CustomTextField";

const parseCurl = (curlStr) => {
  const cleanStr = curlStr.trim().replace(/\\\n/g, ' '); // join multi-line backslashes
  const urlRegex = /(https?:\/\/[^\s'"]+)/i;
  const urlMatch = cleanStr.match(urlRegex);
  const url = urlMatch ? urlMatch[1] : "https://api.example.com/endpoint";

  let method = "GET";
  if (cleanStr.includes("-X ") || cleanStr.includes("--request ")) {
    const methodMatch = cleanStr.match(/(?:-X|--request)\s+([A-Z]+)/i);
    if (methodMatch) method = methodMatch[1].toUpperCase();
  } else if (cleanStr.includes("-d ") || cleanStr.includes("--data ") || cleanStr.includes("--data-raw ")) {
    method = "POST";
  }

  // Extract headers
  const headers = {};
  const headerRegex = /(?:-H|--header)\s+["']([^"']+)["']/g;
  let match;
  while ((match = headerRegex.exec(cleanStr)) !== null) {
    const parts = match[1].split(":");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join(":").trim();
      headers[key] = val;
    }
  }

  // Extract body
  let body = "";
  const bodyRegex = /(?:-d|--data|--data-raw)\s+["']([\s\S]*?)["']/i;
  const bodyMatch = cleanStr.match(bodyRegex);
  if (bodyMatch) {
    body = bodyMatch[1];
  } else {
    // Try unquoted body or double quoted
    const bodyRegexDbl = /(?:-d|--data|--data-raw)\s+"([\s\S]*?)"/i;
    const bodyMatchDbl = cleanStr.match(bodyRegexDbl);
    if (bodyMatchDbl) body = bodyMatchDbl[1];
  }

  return { url, method, headers, body };
};

const generateFetch = ({ url, method, headers, body }) => {
  let opts = { method };
  if (Object.keys(headers).length > 0) opts.headers = headers;
  if (body) opts.body = body;
  
  return `fetch("${url}", ${JSON.stringify(opts, null, 2)})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));`;
};

const generateAxios = ({ url, method, headers, body }) => {
  let config = { method, url };
  if (Object.keys(headers).length > 0) config.headers = headers;
  if (body) {
    try {
      config.data = JSON.parse(body);
    } catch (e) {
      config.data = body;
    }
  }
  return `import axios from 'axios';\n\naxios(${JSON.stringify(config, null, 2)})\n  .then(res => console.log(res.data))\n  .catch(err => console.error(err));`;
};

const generatePython = ({ url, method, headers, body }) => {
  let headerStr = "";
  if (Object.keys(headers).length > 0) {
    headerStr = `headers = ${JSON.stringify(headers, null, 4)}\n`;
  }
  let bodyStr = "";
  if (body) {
    try {
      JSON.parse(body);
      bodyStr = `json_data = ${JSON.stringify(JSON.parse(body), null, 4)}\n`;
    } catch(e) {
      bodyStr = `data = """${body}"""\n`;
    }
  }

  let reqLine = `response = requests.${method.toLowerCase()}("${url}"`;
  if (headerStr) reqLine += `, headers=headers`;
  if (bodyStr) {
    reqLine += bodyStr.includes("json_data") ? `, json=json_data` : `, data=data`;
  }
  reqLine += `)`;

  return `import requests\n\n${headerStr}${bodyStr}${reqLine}\nprint(response.json())`;
};

const generateGo = ({ url, method, headers, body }) => {
  let reqBody = `nil`;
  let bodyDecl = "";
  if (body) {
    bodyDecl = `var jsonStr = []byte(\`${body}\`)\n\t`;
    reqBody = `bytes.NewBuffer(jsonStr)`;
  }
  let headerSet = "";
  Object.entries(headers).forEach(([k, v]) => {
    headerSet += `\treq.Header.Set("${k}", "${v}")\n`;
  });

  return `package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
)

func main() {
	url := "${url}"
	${bodyDecl}req, err := http.NewRequest("${method}", url, ${reqBody})
	if err != nil {
		panic(err)
	}
${headerSet}
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	fmt.Println(string(body))
}`;
};

const CurlHeaderTools = () => {
  const [subTab, setSubTab] = useState("curl"); // curl or headers
  
  // cURL converter states
  const [curlInput, setCurlInput] = useState(`curl -X POST "https://api.github.com/repos/octocat/hello-world/issues" -H "Accept: application/vnd.github+json" -H "Authorization: Bearer <TOKEN>" -d '{"title":"Found a bug","body":"I\\'m having a problem with this."}'`);
  const [langTab, setLangTab] = useState("fetch"); // fetch, axios, python, go
  const [codeResult, setCodeResult] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);

  // Header/Query states
  const [rawHeadersInput, setRawHeadersInput] = useState("Host: api.example.com\nUser-Agent: Mozilla/5.0\nAuthorization: Bearer token123\nAccept-Language: en-US,en;q=0.9");
  const [parsedHeaders, setParsedHeaders] = useState([]);
  
  const [rawQueryInput, setRawQueryInput] = useState("?q=react&category=dev&limit=10&page=2");
  const [parsedQuery, setParsedQuery] = useState([]);

  // Generate target code from cURL
  useEffect(() => {
    if (!curlInput.trim()) {
      setCodeResult("");
      return;
    }
    const parsed = parseCurl(curlInput);
    switch (langTab) {
      case "fetch":
        setCodeResult(generateFetch(parsed));
        break;
      case "axios":
        setCodeResult(generateAxios(parsed));
        break;
      case "python":
        setCodeResult(generatePython(parsed));
        break;
      case "go":
        setCodeResult(generateGo(parsed));
        break;
      default:
        setCodeResult("");
    }
  }, [curlInput, langTab]);

  // Parse Headers
  useEffect(() => {
    if (!rawHeadersInput.trim()) {
      setParsedHeaders([]);
      return;
    }
    const lines = rawHeadersInput.split("\n");
    const list = [];
    lines.forEach(line => {
      const parts = line.split(":");
      if (parts.length >= 2) {
        list.push({
          key: parts[0].trim(),
          val: parts.slice(1).join(":").trim()
        });
      }
    });
    setParsedHeaders(list);
  }, [rawHeadersInput]);

  // Parse Query Params
  useEffect(() => {
    let cleanQuery = rawQueryInput.trim();
    if (!cleanQuery) {
      setParsedQuery([]);
      return;
    }
    if (cleanQuery.startsWith("?")) {
      cleanQuery = cleanQuery.substring(1);
    }
    const parts = cleanQuery.split("&");
    const list = [];
    parts.forEach(part => {
      const eqIdx = part.indexOf("=");
      if (eqIdx !== -1) {
        const key = part.substring(0, eqIdx);
        const val = part.substring(eqIdx + 1);
        try {
          list.push({ key, val: decodeURIComponent(val) });
        } catch (e) {
          list.push({ key, val });
        }
      }
    });
    setParsedQuery(list);
  }, [rawQueryInput]);

  const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header and Sub Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel gap-4 border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">cURL & Header Parser</h2>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10 shadow-inner">
          <button
            onClick={() => setSubTab("curl")}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              subTab === "curl" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            cURL to Code
          </button>
          <button
            onClick={() => setSubTab("headers")}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              subTab === "headers" ? "bg-primary-main text-background-default shadow-md" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Header & Query Parser
          </button>
        </div>
      </div>

      {subTab === "curl" ? (
        /* cURL to Code Converter */
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          
          {/* Input cURL */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-title-main">Paste cURL Command</label>
            <textarea
              value={curlInput}
              onChange={(e) => setCurlInput(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
              placeholder="curl -X GET https://api.example.com"
            />
          </div>

          {/* Language Selector and Code Result */}
          {codeResult && (
            <div className="mt-4 flex flex-col gap-4">
              
              {/* Language Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "fetch", label: "JS Fetch" },
                  { id: "axios", label: "JS Axios" },
                  { id: "python", label: "Python Requests" },
                  { id: "go", label: "Go HTTP" }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLangTab(lang.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      langTab === lang.id ? "bg-primary-main/20 text-primary-main border border-primary-main/30" : "bg-white/5 text-text-secondary hover:text-text-primary border border-transparent"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Code output */}
              <div className="p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2 relative">
                <div className="flex justify-between items-center">
                  <h6 className="text-xs uppercase tracking-widest text-text-secondary">Exported Code</h6>
                  <button
                    onClick={() => copyToClipboard(codeResult, setCopiedCode)}
                    className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all"
                  >
                    {copiedCode ? "Copied!" : "Copy Code"}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap break-words font-mono text-text-primary text-sm bg-black/20 p-4 rounded-xl border border-white/5 mt-2 max-h-[360px] overflow-y-auto">
                  {codeResult}
                </pre>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Headers and Query String Parser */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Headers parser */}
          <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-title-main">Request Headers</h3>
            <textarea
              value={rawHeadersInput}
              onChange={(e) => setRawHeadersInput(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1"
              placeholder="Header-Name: Value"
            />
            {parsedHeaders.length > 0 && (
              <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5 max-h-[280px] overflow-y-auto">
                {parsedHeaders.map((hdr, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-white/5 py-2 text-sm gap-2 select-all">
                    <span className="font-mono text-primary-main font-semibold break-all">{hdr.key}:</span>
                    <span className="text-text-primary text-right break-all">{hdr.val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Query string parser */}
          <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-title-main">Query Parameters</h3>
            <textarea
              value={rawQueryInput}
              onChange={(e) => setRawQueryInput(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1"
              placeholder="?key1=val1&key2=val2"
            />
            {parsedQuery.length > 0 && (
              <div className="flex flex-col gap-2 bg-black/20 p-4 rounded-xl border border-white/5 max-h-[280px] overflow-y-auto">
                {parsedQuery.map((q, idx) => (
                  <div key={idx} className="flex justify-between items-start border-b border-white/5 py-2 text-sm gap-2 select-all">
                    <span className="font-mono text-title-main font-semibold break-all">{q.key}:</span>
                    <span className="text-text-primary text-right break-all">{q.val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};

export default CurlHeaderTools;
