import React, { useState } from "react";

const templates = {
  readme: `# Project Title

A lightweight client-side developer platform.

## Tech Stack
- **Frontend**: React 19, Tailwind CSS 3
- **Bundler**: Parcel
- **Icon Set**: Lucide Icons

## Getting Started
1. Clone the repository
2. Install dependencies: \`npm install\`
3. Start the dev server: \`npm start\`
4. Run testing suite: \`npm test\`
`,
  pr: `## Pull Request Description
Summarize the key architectural additions and style changes.

## Changes Made
- Added modular developer utility workbench tabs.
- Created offline-safe UUID/ULID tools and cURL converters.

## Verification
- [x] All 152 Jest test suites are passing.
- [ ] Verified responsiveness on mobile screens.
`,
  bug: `## Bug Report

### Steps to Reproduce
1. Navigate to the '/utilitytools' page.
2. Enter invalid string indices.
3. Click "Process String".

### Expected Behavior
A clear error display indicating that the indices input is out of bounds.

### Actual Behavior
The application throws a syntax error inside the parsing script.
`,
  api: `# API Reference: User Profile

Retrieve or update the developer user profile credentials.

## GET /api/v1/profile
Returns the authenticated user details.

### Query Parameters
- \`id\` (required): The unique user identification string.

### Sample Response
\`\`\`json
{
  "status": "success",
  "data": {
    "username": "KapilYadav",
    "theme": "dark"
  }
}
\`\`\`
`
};

const parseMarkdown = (mdText) => {
  const lines = mdText.split("\n");
  let inPre = false;
  let preContent = [];
  const htmlLines = [];

  lines.forEach(line => {
    if (line.trim().startsWith("```")) {
      if (inPre) {
        inPre = false;
        htmlLines.push(`<pre class="bg-black/30 border border-white/5 p-4 rounded-xl font-mono text-xs text-primary-light whitespace-pre-wrap overflow-x-auto my-3">${preContent.join("\n")}</pre>`);
        preContent = [];
      } else {
        inPre = true;
      }
      return;
    }

    if (inPre) {
      preContent.push(line);
      return;
    }

    let parsedLine = line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (parsedLine.startsWith("# ")) {
      parsedLine = `<h1 class="text-2xl font-bold text-primary-main mt-5 mb-2.5">${parsedLine.substring(2)}</h1>`;
    } else if (parsedLine.startsWith("## ")) {
      parsedLine = `<h2 class="text-xl font-bold text-title-main mt-4 mb-2 border-b border-white/10 pb-1">${parsedLine.substring(3)}</h2>`;
    } else if (parsedLine.startsWith("### ")) {
      parsedLine = `<h3 class="text-md font-bold text-text-primary mt-3 mb-1.5">${parsedLine.substring(4)}</h3>`;
    } else if (parsedLine.startsWith("> ")) {
      parsedLine = `<blockquote class="border-l-4 border-primary-main pl-4 py-1 my-2 bg-white/5 italic text-text-secondary rounded-r-lg">${parsedLine.substring(2)}</blockquote>`;
    } else if (parsedLine.trim().startsWith("- ") || parsedLine.trim().startsWith("* ")) {
      parsedLine = `<li class="list-disc ml-6 my-1 text-text-primary">${parsedLine.trim().substring(2)}</li>`;
    } else if (/^\d+\.\s+/.test(parsedLine.trim())) {
      const dotIdx = parsedLine.indexOf(".");
      parsedLine = `<li class="list-decimal ml-6 my-1 text-text-primary">${parsedLine.trim().substring(dotIdx + 1).trim()}</li>`;
    } else if (parsedLine.trim() !== "") {
      parsedLine = `<p class="my-2 leading-relaxed text-text-primary text-sm sm:text-base">${parsedLine}</p>`;
    }

    parsedLine = parsedLine
      .replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code class="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono text-xs text-title-main">$1</code>');

    htmlLines.push(parsedLine);
  });

  return htmlLines.join("");
};

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(templates.readme);

  const applyTemplate = (key) => {
    setMarkdown(templates[key] || "");
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header and Template Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel gap-4 border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">Markdown Editor & Previewer</h2>
        <div className="flex flex-wrap bg-white/5 rounded-full p-1 border border-white/10 shadow-inner">
          {[
            { id: "readme", label: "README" },
            { id: "pr", label: "PR Template" },
            { id: "bug", label: "Bug Report" },
            { id: "api", label: "API Specs" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => applyTemplate(item.id)}
              className="px-4 py-2 rounded-full text-xs font-bold text-text-secondary hover:text-text-primary transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split Pane Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Editor Pane */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Markdown Editor</h3>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[400px] px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-text-primary font-mono text-sm focus:outline-none focus:ring-1 focus:ring-title-main resize-none"
            placeholder="Write some Markdown here..."
          />
        </div>

        {/* Live Preview Pane */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Live HTML Preview</h3>
          <div 
            className="w-full h-[400px] px-6 py-4 bg-background-paper/50 border border-white/10 rounded-2xl overflow-y-auto text-text-primary prose prose-invert max-w-none scrollbar-none"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          />
        </div>

      </div>
    </div>
  );
};

export default MarkdownPreviewer;
