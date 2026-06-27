import React, { useState, useEffect } from "react";
import CustomTextField from "../../layout/CustomTextField";

const cheatSheetItems = [
  { term: "\\d", desc: "Digit (0-9)" },
  { term: "\\D", desc: "Non-digit" },
  { term: "\\w", desc: "Word char (a-z, A-Z, 0-9, _)" },
  { term: "\\W", desc: "Non-word char" },
  { term: "\\s", desc: "Whitespace (space, tab, newline)" },
  { term: "\\S", desc: "Non-whitespace" },
  { term: ".", desc: "Any character (except newline)" },
  { term: "^", desc: "Start of string" },
  { term: "$", desc: "End of string" },
  { term: "*", desc: "0 or more times" },
  { term: "+", desc: "1 or more times" },
  { term: "?", desc: "0 or 1 time" },
  { term: "{n}", desc: "Exactly n times" },
  { term: "[abc]", desc: "Any character of: a, b, or c" },
  { term: "[^abc]", desc: "Any character NOT: a, b, or c" },
  { term: "(...)", desc: "Capture group" },
];

const RegexTester = () => {
  const [pattern, setPattern] = useState(
    "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
  );
  const [text, setText] = useState("Hello, I am Kapil Yadav");
  const [flags, setFlags] = useState("g");
  const [matchCount, setMatchCount] = useState(0);
  const [regexError, setRegexError] = useState("");

  const flagOptions = [
    { label: "g (global)", val: "g" },
    { label: "i (case-insensitive)", val: "i" },
    { label: "m (multiline)", val: "m" },
  ];

  const handleFlagToggle = (flag) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ""));
    } else {
      setFlags(flags + flag);
    }
  };

  useEffect(() => {
    if (!pattern) {
      setMatchCount(0);
      setRegexError("");
      return;
    }
    try {
      const regex = new RegExp(pattern, flags);
      const matches = flags.includes("g")
        ? [...text.matchAll(regex)]
        : text.match(regex);
      if (matches) {
        setMatchCount(flags.includes("g") ? matches.length : 1);
      } else {
        setMatchCount(0);
      }
      setRegexError("");
    } catch (err) {
      setRegexError(err.message);
      setMatchCount(0);
    }
  }, [pattern, text, flags]);

  const getHighlightedText = () => {
    if (!pattern || !text) return text;
    try {
      const regex = new RegExp(pattern, flags);

      if (flags.includes("g")) {
        const matches = [...text.matchAll(regex)];
        if (matches.length === 0) return text;

        const result = [];
        let lastIndex = 0;
        const maxMatches = Math.min(matches.length, 500);

        for (let i = 0; i < maxMatches; i++) {
          const match = matches[i];
          const index = match.index;
          const matchText = match[0];

          if (matchText.length === 0) {
            continue; // Prevent infinite loop on zero-length matches (e.g. ^ or \b)
          }

          if (index > lastIndex) {
            result.push(text.substring(lastIndex, index));
          }

          result.push(
            <span
              key={i}
              className="bg-primary-main/20 text-primary-main px-1 py-0.5 rounded border border-primary-main/30 font-bold font-mono text-sm"
            >
              {matchText}
            </span>,
          );

          lastIndex = index + matchText.length;
        }

        if (lastIndex < text.length) {
          result.push(text.substring(lastIndex));
        }

        return result;
      } else {
        const match = text.match(regex);
        if (!match) return text;

        const index = match.index;
        const matchText = match[0];

        if (matchText.length === 0) return text;

        const result = [];
        if (index > 0) result.push(text.substring(0, index));
        result.push(
          <span
            key="single"
            className="bg-primary-main/20 text-primary-main px-1 py-0.5 rounded border border-primary-main/30 font-bold font-mono text-sm"
          >
            {matchText}
          </span>,
        );
        if (index + matchText.length < text.length) {
          result.push(text.substring(index + matchText.length));
        }
        return result;
      }
    } catch (err) {
      return text;
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">
          Regex Tester & Visualizer
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Middle: Regex Inputs & Matches */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
            {/* Pattern Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-title-main">
                Regular Expression
              </label>
              <div className="flex gap-2 items-center bg-background-paper/50 border border-white/10 rounded-2xl px-4 py-2">
                <span className="text-text-secondary font-mono">/</span>
                <input
                  type="text"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="flex-1 bg-transparent border-none text-text-primary font-mono focus:outline-none focus:ring-0 w-full"
                  placeholder="[a-z]+"
                />
                <span className="text-text-secondary font-mono">/{flags}</span>
              </div>
            </div>

            {/* Flags Checkboxes */}
            <div className="flex flex-wrap gap-4 mt-1">
              {flagOptions.map((opt) => (
                <label
                  key={opt.val}
                  className="flex items-center gap-2 cursor-pointer text-sm text-text-primary select-none"
                >
                  <input
                    type="checkbox"
                    checked={flags.includes(opt.val)}
                    onChange={() => handleFlagToggle(opt.val)}
                    className="w-4 h-4 rounded border-white/10 bg-transparent text-primary-main focus:ring-primary-light"
                  />
                  {opt.label}
                </label>
              ))}
            </div>

            {regexError && (
              <div className="p-3 border border-red-500/20 bg-red-500/5 text-red-400 rounded-xl text-xs font-mono">
                {regexError}
              </div>
            )}

            {/* Test String Input */}
            <div className="flex flex-col gap-1.5 mt-2">
              <label className="text-sm font-bold text-title-main">
                Test String
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-text-primary text-sm focus:outline-none focus:ring-1 focus:ring-title-main"
                placeholder="Enter text to match against..."
              />
            </div>
          </div>

          {/* Matches Output */}
          <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-title-main">
                Match Visualization
              </h3>
              <span className="text-xs bg-primary-main/10 text-primary-main border border-primary-main/20 px-3 py-1 rounded-full font-bold">
                {matchCount} Match{matchCount !== 1 ? "es" : ""} Found
              </span>
            </div>

            <div className="whitespace-pre-wrap break-words font-sans text-text-primary text-md bg-black/20 p-6 rounded-2xl border border-white/5 min-h-[100px] leading-relaxed">
              {getHighlightedText()}
            </div>
          </div>
        </div>

        {/* Right Side: Quick Cheat Sheet */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4 h-fit">
          <h3 className="text-lg font-bold text-title-main">
            Regex Cheat Sheet
          </h3>
          <div className="flex flex-col gap-2 max-h-[440px] overflow-y-auto pr-1">
            {cheatSheetItems.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-2 border-b border-white/5 text-sm gap-2"
              >
                <span className="font-mono text-primary-main font-semibold bg-white/5 px-2 py-0.5 rounded border border-white/5 whitespace-nowrap">
                  {item.term}
                </span>
                <span className="text-text-secondary text-right">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;
