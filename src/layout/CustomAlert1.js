import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

const CustomAlert1 = ({ alert, closeAlert }) => {
  useEffect(() => {
    if (alert.open && closeAlert) {
      const timer = setTimeout(() => {
        closeAlert();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert.open, closeAlert]);

  if (!alert.open) return null;

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-white" />,
    error: <AlertCircle className="w-5 h-5 text-white" />,
    warning: <AlertTriangle className="w-5 h-5 text-white" />,
    info: <Info className="w-5 h-5 text-white" />,
  };

  return (
    <div
      role="alert"
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white ${
        bgColors[alert.severity] || "bg-gray-800"
      } transition-all duration-300 animate-fade-in-down`}
    >
      {icons[alert.severity]}
      <span className="font-medium text-sm">{alert.message}</span>
      {closeAlert && (
        <button
          onClick={closeAlert}
          aria-label="Close alert"
          className="ml-2 hover:bg-white/20 p-1 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default CustomAlert1;
