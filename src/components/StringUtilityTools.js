import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import StringUtilities from "./DeveloperTools/StringUtilities";
import EncodingTools from "./DeveloperTools/EncodingTools";
import CronDescriptor from "./DeveloperTools/CronDescriptor";
import RegexTester from "./DeveloperTools/RegexTester";
import EpochConverter from "./DeveloperTools/EpochConverter";
import CurlHeaderTools from "./DeveloperTools/CurlHeaderTools";
import YamlJsonConverter from "./DeveloperTools/YamlJsonConverter";
import MarkdownPreviewer from "./DeveloperTools/MarkdownPreviewer";
import CryptoTools from "./DeveloperTools/CryptoTools";
import MockDataGenerator from "./DeveloperTools/MockDataGenerator";
import JsonFormatter from "./DeveloperTools/JsonFormatter";
import DiffChecker from "./DeveloperTools/DiffChecker";
import WebHelpers from "./DeveloperTools/WebHelpers";
import SecureTokens from "./DeveloperTools/SecureTokens";
import UiDesignHelpers from "./DeveloperTools/UiDesignHelpers";

const StringUtilityTools = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    if (location.state && location.state.activeTab) {
      return location.state.activeTab;
    }
    const params = new URLSearchParams(location.search);
    return params.get("tab") || "string";
  });

  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    } else {
      const params = new URLSearchParams(location.search);
      const tabParam = params.get("tab");
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, [location]);

  const tabs = [
    { id: "string", label: "String Utilities" },
    { id: "encoding", label: "Encoding & JWT" },
    { id: "cron", label: "Cron Descriptor" },
    { id: "regex", label: "Regex Tester" },
    { id: "epoch", label: "Epoch Converter" },
    { id: "curl", label: "cURL & Headers" },
    { id: "yaml", label: "YAML / JSON / CSV" },
    { id: "markdown", label: "Markdown Preview" },
    { id: "crypto", label: "Crypto & UUIDs" },
    { id: "mock", label: "Mock Data Gen" },
    { id: "json", label: "JSON Formatter" },
    { id: "diff", label: "Diff Checker" },
    { id: "web", label: "Web Helpers" },
    { id: "secure", label: "Secure Tokens" },
    { id: "uidesign", label: "UI Design Helpers" }
  ];

  const renderActiveTool = () => {
    switch (activeTab) {
      case "string":
        return <StringUtilities />;
      case "encoding":
        return <EncodingTools />;
      case "cron":
        return <CronDescriptor />;
      case "regex":
        return <RegexTester />;
      case "epoch":
        return <EpochConverter />;
      case "curl":
        return <CurlHeaderTools />;
      case "yaml":
        return <YamlJsonConverter />;
      case "markdown":
        return <MarkdownPreviewer />;
      case "crypto":
        return <CryptoTools />;
      case "mock":
        return <MockDataGenerator />;
      case "json":
        return <JsonFormatter />;
      case "diff":
        return <DiffChecker />;
      case "web":
        return <WebHelpers />;
      case "secure":
        return <SecureTokens />;
      case "uidesign":
        return <UiDesignHelpers />;
      default:
        return <StringUtilities />;
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-24 px-4 min-h-screen pb-10">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
        
        {/* Navigation Sidebar */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl lg:sticky lg:top-24 border border-white/5 shadow-lg bg-background-paper/50">
            <h2 className="text-2xl font-bold text-title-main mb-6">Developer Tools</h2>
            
            {/* Horizontal navigation on mobile/tablet, vertical sidebar on desktop */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none whitespace-nowrap">
              {tabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                      isSelected
                        ? "bg-primary-main/10 text-primary-main border border-primary-main/20 shadow-inner"
                        : "text-text-primary hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* Active Tool Content */}
        <div className="w-full lg:w-3/4 flex flex-col">
          {renderActiveTool()}
        </div>

      </div>
    </div>
  );
};

export default StringUtilityTools;
