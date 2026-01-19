import { useState, useEffect } from "react";
import CustomTextField from "../layout/CustomTextField";
import CustomButton from "../layout/CustomButton";

const stringUtils = {
  splitString: (inputString, separator) => {
    if (!inputString || !separator) return [];
    const result = inputString.split(separator);
    console.log(`Split result count: ${result.length} elements`);
    return result;
  },

  insertAtIndices: (inputString, separator, indices, insertText) => {
    if (inputString === undefined || !indices) return inputString;

    if (inputString == "" && indices === 0) {
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

const StringUtilityTools = () => {
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
    if (!inputString && operation != "insert") return;

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
    } else if (operation === "insert") {
      return "Enter a single index (e.g., 0) or multiple comma-separated indices (e.g., 0,2,5)";
    } else if (operation === "delete") {
      return "Enter a single index (e.g., 0) or multiple comma-separated indices (e.g., 0,2,5)";
    }
    return `Number of words: ${wordCount}`;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-center text-text-primary mb-4">
          String Utility Tools
        </h1>

        <CustomTextField
          label="Input String"
          fullWidth
          value={inputString}
          onChange={handleInputChange}
          className="mb-4"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-title-main mb-1">
            Operation
          </label>
          <select
            value={operation}
            onChange={handleOperationChange}
            className="w-full px-3 py-2 bg-transparent border border-title-main rounded-md text-text-primary focus:outline-none focus:ring-1 focus:ring-title-main focus:border-title-main dark:bg-gray-800"
          >
            <option
              value="split"
              className="text-gray-900 dark:text-gray-100 dark:bg-gray-800"
            >
              Split String
            </option>
            <option
              value="insert"
              className="text-gray-900 dark:text-gray-100 dark:bg-gray-800"
            >
              Insert at Index
            </option>
            <option
              value="delete"
              className="text-gray-900 dark:text-gray-100 dark:bg-gray-800"
            >
              Delete at Index
            </option>
          </select>
        </div>

        {operation === "split" && (
          <CustomTextField
            label="Separator"
            fullWidth
            value={separator}
            onChange={handleSeparatorChange}
            className="mb-4"
            helperText={`Number of words: ${wordCount}`}
          />
        )}

        {(operation === "insert" || operation === "delete") && (
          <CustomTextField
            label="Index"
            fullWidth
            value={indices}
            onChange={handleIndicesChange}
            className="mb-4"
            helperText={getHelperText()}
          />
        )}

        {operation === "insert" && (
          <CustomTextField
            label="Text to Insert"
            fullWidth
            value={insertText}
            onChange={handleInsertTextChange}
            className="mb-4"
          />
        )}

        <div className="mt-6">
          <CustomButton
            onClick={handleProcess}
            disabled={
              (indices === 0 && !insertText) ||
              (!inputString && operation != "insert") ||
              (operation !== "split" && !indices) ||
              (operation === "insert" && !insertText)
            }
          >
            Process
          </CustomButton>
        </div>

        {result && (
          <div className="mt-8 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h6 className="text-lg font-medium mb-2 text-text-primary">
              Result:
            </h6>
            <pre className="whitespace-pre-wrap break-words font-mono text-text-primary text-sm sm:text-base">
              {result}
            </pre>
            <p className="text-sm text-gray-500 mt-2">
              Number of words in result: {result.split(separator).length}
            </p>
          </div>
        )}

        {splitResult.length > 0 && (
          <div className="mt-8 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <h6 className="text-lg font-medium mb-2 text-text-primary">
              Split Result:
            </h6>
            <div className="flex flex-wrap gap-2">
              {splitResult.map((word, index) => (
                <span
                  key={index}
                  className="p-2 border border-gray-200 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-text-primary text-sm"
                >
                  {word || "(empty)"}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Total words: {splitResult.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StringUtilityTools;
