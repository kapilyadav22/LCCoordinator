import React from 'react';

const keyboardRows = [
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
  ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
  ["Caps Lock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift-R"],
  ["Space"]
];

const shiftMap = {
  '~': '`', '!': '1', '@': '2', '#': '3', '$': '4', '%': '5', '^': '6', '&': '7', '*': '8', '(': '9', ')': '0', '_': '-', '+': '=',
  '{': '[', '}': ']', '|': '\\', ':': ';', '"': "'", '<': ',', '>': '.', '?': '/'
};

const VirtualKeyboard = ({ activeChar }) => {
  let targetKey = activeChar;

  if (targetKey) {
    if (shiftMap[targetKey]) {
      targetKey = shiftMap[targetKey];
    } else if (targetKey.length === 1 && targetKey >= 'A' && targetKey <= 'Z') {
      targetKey = targetKey.toLowerCase();
    } else if (targetKey === ' ') {
      targetKey = 'Space';
    } else if (targetKey === '\n') {
      targetKey = 'Enter';
    }
  }

  // Determines the width of special keys
  const getKeyWidthClass = (key) => {
    switch (key) {
      case "Backspace": return "w-20";
      case "Tab": return "w-16";
      case "\\": return "w-16";
      case "Caps Lock": return "w-20";
      case "Enter": return "w-20";
      case "Shift": return "w-24";
      case "Shift-R": return "w-24";
      case "Space": return "w-[32rem]";
      default: return "w-10 sm:w-12 text-center flex justify-center";
    }
  };

  return (
    <div className="hidden lg:flex flex-col gap-2 mt-8 items-center bg-background-paper p-6 rounded-3xl glass-panel w-full max-w-4xl mx-auto border border-white/5 shadow-xl">
      {keyboardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-2 w-full justify-center">
          {row.map((key, keyIndex) => {
            // Check if this key should be highlighted
            const isTarget = targetKey === key || (key === "Shift" && activeChar && activeChar !== targetKey && (activeChar >= 'A' && activeChar <= 'Z' || shiftMap[activeChar]));
            
            return (
              <div
                key={keyIndex}
                className={`h-12 flex items-center px-3 rounded-lg font-mono text-sm shadow-sm transition-all duration-300 ${getKeyWidthClass(key)} ${
                  isTarget 
                    ? "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.6)] transform scale-105 border-cyan-300" 
                    : "bg-white/5 dark:bg-black/20 text-text-secondary border border-white/10"
                }`}
              >
                {key === "Shift-R" ? "Shift" : key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
