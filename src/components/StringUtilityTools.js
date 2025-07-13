import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
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
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="text.primary"
          align="center"
        >
          String Utility Tools
        </Typography>

        <CustomTextField
          label="Input String"
          fullWidth
          value={inputString}
          onChange={handleInputChange}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel
            id="operation-select-label"
            sx={{
              color: "title.main",
              "&.Mui-focused": {
                color: "title.main",
              },
            }}
          >
            Operation
          </InputLabel>
          <Select
            labelId="operation-select-label"
            id="operation-select"
            value={operation}
            label="Operation"
            onChange={handleOperationChange}
            sx={{
              color: "title.main",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "title.main",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "title.main",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "title.main",
              },
              "& .MuiSelect-icon": {
                color: "title.main",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: "title.main",
                  color: "white",
                },
              },
            }}
          >
            <MenuItem value="split">Split String</MenuItem>
            <MenuItem value="insert">Insert at Index</MenuItem>
            <MenuItem value="delete">Delete at Index</MenuItem>
          </Select>
        </FormControl>

        {operation === "split" && (
          <CustomTextField
            label="Separator"
            fullWidth
            value={separator}
            onChange={handleSeparatorChange}
            margin="normal"
            helperText={`Number of words: ${wordCount}`}
          />
        )}

        {(operation === "insert" || operation === "delete") && (
          <CustomTextField
            label="Index"
            fullWidth
            value={indices}
            onChange={handleIndicesChange}
            margin="normal"
            helperText={getHelperText()}
          />
        )}

        {operation === "insert" && (
          <CustomTextField
            label="Text to Insert"
            fullWidth
            value={insertText}
            onChange={handleInsertTextChange}
            margin="normal"
          />
        )}

        <Box sx={{ mt: 2 }}>
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
        </Box>

        {result && (
          <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Result:
            </Typography>
            <Typography
              component="pre"
              sx={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontFamily: "monospace",
              }}
              color="text.primary"
            >
              {result}
            </Typography>
            <Typography variant="body2" color="text.primary" sx={{ mt: 1 }}>
              Number of words in result: {result.split(separator).length}
            </Typography>
          </Box>
        )}

        {splitResult.length > 0 && (
          <Box sx={{ mt: 3, p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Split Result:
            </Typography>
            {splitResult.map((word, index) => (
              <Typography
                key={index}
                variant="body1"
                color="text.primary"
                sx={{
                  p: 1,
                  m: 0.5,
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  display: "inline-block",
                }}
              >
                {word || "(empty)"}
              </Typography>
            ))}
            <Typography variant="body2" color="text.primary" sx={{ mt: 2 }}>
              Total words: {splitResult.length}
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default StringUtilityTools;
