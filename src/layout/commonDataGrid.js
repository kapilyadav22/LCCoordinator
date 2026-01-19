import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import VisualizerDialogBox from "../components/VisualizerDialogBox";
import { UPLOADCSV } from "../constants/urlConstants";
import { useMyContext } from "../Context/ContextProvider";
import { ThemeContext } from "../Context/ThemeContext.js";
import useCustomAlert from "../customHooks/customAlertHook";
import columns from "../dataFields/column";
import { topics } from "../dataFields/filterTopics";
import { getData } from "../utils/httpRequestUtils";
import CustomAlert1 from "./CustomAlert1";
import { CustomTitle } from "./CustomTitle";
import TopicFilterChips from "./TopicFilterChips";

const CommonDataGrid = ({
  title,
  dataFetchUrl,
  dataGridColumns,
  uniqueTopics,
  pageName,
  visualObject,
}) => {
  const [data, setData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [file, setFile] = useState(null);
  const { adminStatus } = useMyContext();
  const { alert, showAlert } = useCustomAlert();
  const { mode } = useContext(ThemeContext);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const res = await getData(dataFetchUrl);
    if (res.status === "success") {
      setData(res.data);
    } else {
      showAlert("error", res);
    }
  };

  const filteredData = useMemo(() => {
    if (selectedTopics.length === 0) return data;
    return data.filter((row) => {
      const rowTopics = row.topic.split(",").map((t) => t.trim());
      return selectedTopics.some((t) => rowTopics.includes(t));
    });
  }, [data, selectedTopics]);

  const table = useReactTable({
    data: filteredData,
    columns: dataGridColumns || columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 25,
      },
    },
  });

  const handleChipClick = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleReset = () => {
    setSelectedTopics([]);
    setGlobalFilter("");
  };

  const handleRefresh = () => {
    setSelectedTopics([]);
    fetchData();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      showAlert("error", "Please upload a valid CSV file.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      showAlert("error", "Please Upload a Valid CSV File");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(dataFetchUrl + UPLOADCSV, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        showAlert("error", "Error Uploading File");
        return;
      }

      showAlert("success", "Upload successful");
      await fetchData();
      setFile(null);
    } catch (error) {
      showAlert("error", "Error Uploading File");
    }
  };

  return (
    <div className="p-4 w-full max-w-[1200px] mx-auto">
      <CustomAlert1 alert={alert} />

      <div className="flex flex-col items-center mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-[80%] gap-4">
          <div className="flex-1 flex justify-center">
            <CustomTitle title={title} />
          </div>

          {adminStatus === "Admin_Kapil" && (
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                className="bg-title-main text-white px-4 py-2 rounded hover:bg-title-themecolor cursor-pointer text-sm font-medium transition-colors"
              >
                Choose CSV
              </label>
              <button
                onClick={handleUpload}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <Upload size={16} /> Upload
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end w-full mb-2 items-center gap-2">
        <label className="flex items-center cursor-pointer">
          <span className="mr-2 text-text-primary text-sm font-medium">
            Filters
          </span>
          <div className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={showFilter}
              onChange={() => setShowFilter(!showFilter)}
            />
            <div
              className={`block w-10 h-6 rounded-full transition-colors ${
                showFilter ? "bg-title-main" : "bg-gray-400"
              }`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                showFilter ? "transform translate-x-4" : ""
              }`}
            ></div>
          </div>
        </label>
      </div>

      {showFilter && (
        <TopicFilterChips
          uniqueTopics={uniqueTopics || topics}
          selectedTopics={selectedTopics}
          onChipClick={handleChipClick}
          onReset={handleReset}
          handleRefresh={handleRefresh}
        />
      )}

      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-x-auto bg-background-paper shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 font-bold tracking-wider"
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center gap-1"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: (
                            <ArrowUpDown size={14} className="text-gray-400" />
                          ),
                          desc: (
                            <ArrowUpDown size={14} className="text-gray-400" />
                          ),
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 text-text-primary whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-text-secondary"
                >
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-text-primary">
        <div className="flex items-center gap-2">
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </button>
          <button
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {visualObject && Object.keys(visualObject).length > 0 && (
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {Object.entries(visualObject).map(([key, value], index) => (
            <div key={index} className="w-full sm:w-auto min-w-[210px]">
              <VisualizerDialogBox title={key} url={value} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommonDataGrid;
