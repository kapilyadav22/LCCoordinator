import React, { useState } from "react";
import CustomButton from "../../layout/CustomButton";

const firstNames = ["John", "Jane", "Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Henry", "Ivy", "Jack", "Kate", "Liam", "Mia", "Noah", "Olivia", "Peter", "Quinn", "Ryan", "Sophia", "Thomas", "Uma", "Victor", "William", "Xavier", "Yara", "Zach"];
const lastNames = ["Smith", "Doe", "Johnson", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young"];
const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com", "company.org", "techcorp.io"];

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateRow = (schema) => {
  const row = {};
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  
  schema.forEach(field => {
    switch (field.type) {
      case "id":
        row[field.name] = generateUUID();
        break;
      case "firstName":
        row[field.name] = firstName;
        break;
      case "lastName":
        row[field.name] = lastName;
        break;
      case "email":
        row[field.name] = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 99)}@${getRandomItem(domains)}`;
        break;
      case "ip":
        row[field.name] = `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}`;
        break;
      case "number":
        row[field.name] = Math.floor(Math.random() * 9000) + 1000;
        break;
      case "constant":
        row[field.name] = field.value || "value";
        break;
      default:
        row[field.name] = "";
    }
  });
  return row;
};

const MockDataGenerator = () => {
  const [schema, setSchema] = useState([
    { name: "id", type: "id" },
    { name: "first_name", type: "firstName" },
    { name: "last_name", type: "lastName" },
    { name: "email", type: "email" },
    { name: "ip_address", type: "ip" }
  ]);

  const [rowCount, setRowCount] = useState(10);
  const [exportFormat, setExportFormat] = useState("json"); // json, csv, sql
  const [outputResult, setOutputResult] = useState("");
  const [copied, setCopied] = useState(false);

  const addField = () => {
    setSchema([...schema, { name: `field_${schema.length + 1}`, type: "number" }]);
  };

  const removeField = (index) => {
    setSchema(schema.filter((_, i) => i !== index));
  };

  const updateFieldName = (index, value) => {
    const newSchema = [...schema];
    newSchema[index].name = value.replace(/[^a-zA-Z0-9_]/g, ""); // slugify
    setSchema(newSchema);
  };

  const updateFieldType = (index, value) => {
    const newSchema = [...schema];
    newSchema[index].type = value;
    if (value === "constant" && !newSchema[index].value) {
      newSchema[index].value = "constant_value";
    }
    setSchema(newSchema);
  };

  const updateFieldVal = (index, value) => {
    const newSchema = [...schema];
    newSchema[index].value = value;
    setSchema(newSchema);
  };

  const handleGenerate = () => {
    if (schema.length === 0) {
      setOutputResult("Error: Schema must contain at least one field.");
      return;
    }

    const data = [];
    const count = Math.min(Math.max(rowCount, 1), 100);
    for (let i = 0; i < count; i++) {
      data.push(generateRow(schema));
    }

    if (exportFormat === "json") {
      setOutputResult(JSON.stringify(data, null, 2));
    } else if (exportFormat === "csv") {
      const headers = schema.map(f => f.name);
      const csvRows = [headers.join(",")];
      data.forEach(row => {
        csvRows.push(headers.map(h => {
          const val = String(row[h]);
          return val.includes(",") || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
        }).join(","));
      });
      setOutputResult(csvRows.join("\n"));
    } else if (exportFormat === "sql") {
      const tableName = "mock_table";
      const headers = schema.map(f => f.name).join(", ");
      const queries = data.map(row => {
        const values = schema.map(f => {
          const val = row[f.name];
          return typeof val === "number" ? val : `'${String(val).replace(/'/g, "''")}'`;
        }).join(", ");
        return `INSERT INTO ${tableName} (${headers}) VALUES (${values});`;
      });
      setOutputResult(queries.join("\n"));
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">Developer Mock Data Generator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side: Schema Builder */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-title-main">Build Schema</h3>
            <button
              onClick={addField}
              className="text-xs bg-primary-main/10 hover:bg-primary-main/20 text-primary-main border border-primary-main/20 px-3 py-1.5 rounded-full transition-all"
            >
              + Add Field
            </button>
          </div>

          <div className="flex flex-col gap-3 max-h-[320px] overflow-y-auto pr-1">
            {schema.map((field, idx) => (
              <div key={idx} className="flex gap-2 items-center bg-black/20 p-3 rounded-xl border border-white/5">
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => updateFieldName(idx, e.target.value)}
                  placeholder="Field Name"
                  className="w-1/3 px-3 py-1.5 bg-background-paper border border-white/10 rounded-lg text-text-primary focus:outline-none focus:ring-1 focus:ring-title-main font-mono text-sm"
                />
                
                <select
                  value={field.type}
                  onChange={(e) => updateFieldType(idx, e.target.value)}
                  className="w-1/3 px-3 py-1.5 bg-background-paper border border-white/10 rounded-lg text-text-primary focus:outline-none text-sm"
                >
                  <option value="id">ID (UUIDv4)</option>
                  <option value="firstName">First Name</option>
                  <option value="lastName">Last Name</option>
                  <option value="email">Email Address</option>
                  <option value="ip">IP Address</option>
                  <option value="number">Random Number</option>
                  <option value="constant">Custom Constant</option>
                </select>

                {field.type === "constant" ? (
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateFieldVal(idx, e.target.value)}
                    placeholder="Constant text"
                    className="w-1/4 px-3 py-1.5 bg-background-paper border border-white/10 rounded-lg text-text-primary focus:outline-none font-mono text-sm"
                  />
                ) : (
                  <div className="w-1/4" />
                )}

                <button
                  onClick={() => removeField(idx)}
                  className="text-red-400 hover:text-red-300 font-mono text-xs px-2.5 py-1.5 rounded bg-red-500/10 hover:bg-red-500/20 transition-all border border-red-500/20"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="flex flex-col">
              <label className="text-xs text-text-secondary uppercase mb-1">Rows (1-100)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={rowCount}
                onChange={(e) => setRowCount(parseInt(e.target.value, 10) || 10)}
                className="px-4 py-2 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none font-mono text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-text-secondary uppercase mb-1">Export Format</label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="px-4 py-2.5 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none text-sm"
              >
                <option value="json">JSON Array</option>
                <option value="csv">CSV (Comma-Separated)</option>
                <option value="sql">SQL Insert Statements</option>
              </select>
            </div>
          </div>

          <div className="mt-2">
            <CustomButton onClick={handleGenerate}>Generate Mock Data</CustomButton>
          </div>
        </div>

        {/* Right Side: Output Result */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-title-main">Generated Output</h3>
            {outputResult && (
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all font-bold"
              >
                {copied ? "Copied!" : "Copy Output"}
              </button>
            )}
          </div>

          <textarea
            readOnly
            value={outputResult}
            className="w-full h-80 px-4 py-3 bg-background-paper/50 border border-white/10 rounded-2xl text-primary-main font-mono text-sm focus:outline-none resize-none"
            placeholder="Mock data will be generated here..."
          />
        </div>

      </div>
    </div>
  );
};

export default MockDataGenerator;
