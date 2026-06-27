import React, { useState, useEffect } from "react";
import CustomTextField from "../../layout/CustomTextField";
import CustomButton from "../../layout/CustomButton";

const stringUtils = {
  splitString: (inputString, separator) => {
    if (!inputString || !separator) return [];
    const result = inputString.split(separator);
    console.log(`Split result count: ${result.length} elements`);
    return result;
  },

  insertAtIndices: (inputString, separator, indices, insertText) => {
    if (inputString === undefined || !indices) return inputString;

    if (inputString === "" && indices === 0) {
      return insertText;
    }

    const index = parseInt(indices.trim(), 10);
    if (isNaN(index) || index < 0) return inputString;

    const parts = inputString === "" ? [""] : inputString.split(separator);

    if (index >= parts.length) {
      parts.push(insertText);
    } else if (parts[index] === "") {
      parts[index] = insertText;
    } else {
      parts[index] = insertText + separator + parts[index];
    }
    return parts.join(separator);
  },

  deleteAtIndices: (inputString, separator, indices) => {
    if (!inputString || !indices) return inputString;

    if (!indices.includes(",")) {
      const index = parseInt(indices.trim(), 10);
      if (isNaN(index) || index < 0) return inputString;

      const parts = inputString.split(separator);
      if (index >= parts.length) return inputString;

      parts.splice(index, 1);
      console.log(`Result after deletion: ${parts.length} elements`);
      return parts.join(separator);
    }

    const parts = inputString.split(separator);
    const indicesArray = indices
      .split(",")
      .map((idx) => parseInt(idx.trim(), 10))
      .filter((idx) => !isNaN(idx) && idx >= 0 && idx < parts.length)
      .sort((a, b) => b - a);

    const newParts = [...parts];

    indicesArray.forEach((index) => {
      if (index >= 0 && index < newParts.length) {
        newParts.splice(index, 1);
      }
    });

    console.log(`Result after deletion: ${newParts.length} elements`);
    return newParts.join(separator);
  },
};

const StringUtilities = () => {
  const [inputString, setInputString] = useState("");
  const [separator, setSeparator] = useState("");
  const [operation, setOperation] = useState("split");
  const [indices, setIndices] = useState("");
  const [insertText, setInsertText] = useState("");
  const [result, setResult] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [splitResult, setSplitResult] = useState([]);

  useEffect(() => {
    if (inputString) {
      const words = stringUtils.splitString(inputString, separator);
      setWordCount(words.length);
    } else {
      setWordCount(0);
    }
  }, [inputString, separator]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputString(newValue);
    if (!result) {
      setResult(newValue);
    }
  };

  const handleSeparatorChange = (e) => {
    setSeparator(e.target.value);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
    setResult("");
    setSplitResult([]);
    setIndices("");
    setInsertText("");
  };

  const handleIndicesChange = (e) => {
    setIndices(e.target.value);
  };

  const handleInsertTextChange = (e) => {
    setInsertText(e.target.value);
  };

  const handleProcess = () => {
    if (!inputString && operation !== "insert") return;

    switch (operation) {
      case "split":
        const words = stringUtils.splitString(inputString, separator);
        setSplitResult(words);
        setResult("");
        break;
      case "insert":
        const insertedText = stringUtils.insertAtIndices(
          inputString,
          separator,
          indices,
          insertText
        );
        setResult(insertedText);
        setInputString(insertedText);
        setSplitResult([]);
        break;
      case "delete":
        const afterDeletionText = stringUtils.deleteAtIndices(
          inputString,
          separator,
          indices
        );
        setResult(afterDeletionText);
        setInputString(afterDeletionText);
        setSplitResult([]);
        break;
      default:
        setResult(inputString);
        setSplitResult([]);
    }
  };

  const getHelperText = () => {
    if (operation === "split") {
      return `Number of words: ${wordCount}`;
    } else if (operation === "insert" || operation === "delete") {
      return "Enter a single index (e.g., 0) or multiple comma-separated indices (e.g., 0,2,5)";
    }
    return `Number of words: ${wordCount}`;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">String Utilities</h2>
      </div>

      <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
        <CustomTextField
          label="Input String"
          fullWidth
          value={inputString}
          onChange={handleInputChange}
          className="mb-2"
        />

        <div className="mb-2">
          <label className="block text-sm font-medium text-title-main mb-1.5">
            Operation
          </label>
          <select
            value={operation}
            onChange={handleOperationChange}
            className="w-full px-4 py-2.5 bg-background-default border border-white/10 rounded-xl text-text-primary focus:outline-none focus:ring-1 focus:ring-title-main focus:border-title-main"
          >
            <option value="split">Split String</option>
            <option value="insert">Insert at Index</option>
            <option value="delete">Delete at Index</option>
          </select>
        </div>

        {operation === "split" && (
          <CustomTextField
            label="Separator"
            fullWidth
            value={separator}
            onChange={handleSeparatorChange}
            className="mb-2"
            helperText={`Number of words: ${wordCount}`}
          />
        )}

        {(operation === "insert" || operation === "delete") && (
          <CustomTextField
            label="Index"
            fullWidth
            value={indices}
            onChange={handleIndicesChange}
            className="mb-2"
            helperText={getHelperText()}
          />
        )}

        {operation === "insert" && (
          <CustomTextField
            label="Text to Insert"
            fullWidth
            value={insertText}
            onChange={handleInsertTextChange}
            className="mb-2"
          />
        )}

        <div className="mt-4">
          <CustomButton
            onClick={handleProcess}
            disabled={
              (indices === 0 && !insertText) ||
              (!inputString && operation !== "insert") ||
              (operation !== "split" && !indices) ||
              (operation === "insert" && !insertText)
            }
          >
            Process String
          </CustomButton>
        </div>

        {result && (
          <div className="mt-6 p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2">
            <h6 className="text-lg font-bold text-title-main">Result:</h6>
            <pre className="whitespace-pre-wrap break-words font-mono text-text-primary text-sm sm:text-base bg-black/20 p-4 rounded-xl border border-white/5">
              {result}
            </pre>
            <p className="text-xs text-text-secondary mt-1">
              Number of words in result: {result.split(separator).length}
            </p>
          </div>
        )}

        {splitResult.length > 0 && (
          <div className="mt-6 p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2">
            <h6 className="text-lg font-bold text-title-main">Split Result:</h6>
            <div className="flex flex-wrap gap-2 bg-black/20 p-4 rounded-xl border border-white/5">
              {splitResult.map((word, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 border border-white/10 rounded-lg bg-white/5 text-text-primary text-sm font-mono"
                >
                  {word || "(empty)"}
                </span>
              ))}
            </div>
            <p className="text-xs text-text-secondary mt-1">
              Total elements: {splitResult.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StringUtilities;
