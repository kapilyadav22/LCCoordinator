import React, { useState, useEffect } from "react";
import CustomTextField from "../../layout/CustomTextField";

const getRelativeTime = (targetMs) => {
  const diffMs = targetMs - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);

  const absSec = Math.abs(diffSec);
  const absMin = Math.abs(diffMin);
  const absHr = Math.abs(diffHr);
  const absDay = Math.abs(diffDay);

  const suffix = diffMs < 0 ? "ago" : "from now";

  if (absSec < 60) return `${absSec} second${absSec !== 1 ? "s" : ""} ${suffix}`;
  if (absMin < 60) return `${absMin} minute${absMin !== 1 ? "s" : ""} ${suffix}`;
  if (absHr < 24) return `${absHr} hour${absHr !== 1 ? "s" : ""} ${suffix}`;
  return `${absDay} day${absDay !== 1 ? "s" : ""} ${suffix}`;
};

const EpochConverter = () => {
  // Live clock states
  const [nowSec, setNowSec] = useState(Math.floor(Date.now() / 1000));
  const [copiedSec, setCopiedSec] = useState(false);

  // Timestamp to Date conversion states
  const [timestampInput, setTimestampInput] = useState(Math.floor(Date.now() / 1000).toString());
  const [decodedDate, setDecodedDate] = useState({ local: "", utc: "", iso: "", relative: "", detectedUnit: "" });

  // Date to Timestamp conversion states
  const [yearInput, setYearInput] = useState(new Date().getFullYear().toString());
  const [monthInput, setMonthInput] = useState((new Date().getMonth() + 1).toString()); // 1-12
  const [dayInput, setDayInput] = useState(new Date().getDate().toString());
  const [hourInput, setHourInput] = useState("12");
  const [minuteInput, setMinuteInput] = useState("00");
  const [secondInput, setSecondInput] = useState("00");
  const [generatedEpoch, setGeneratedEpoch] = useState({ sec: 0, ms: 0 });

  // Live Clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setNowSec(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Timestamp decoding effect
  useEffect(() => {
    const val = timestampInput.trim();
    if (!val || isNaN(val)) {
      setDecodedDate({ local: "Invalid input", utc: "Invalid input", iso: "Invalid input", relative: "", detectedUnit: "" });
      return;
    }

    const num = parseInt(val, 10);
    // Detect if input is seconds or milliseconds
    const isMs = val.length >= 13;
    const dateMs = isMs ? num : num * 1000;
    
    try {
      const date = new Date(dateMs);
      if (isNaN(date.getTime())) throw new Error();
      setDecodedDate({
        local: date.toString(),
        utc: date.toUTCString(),
        iso: date.toISOString(),
        relative: getRelativeTime(dateMs),
        detectedUnit: isMs ? "milliseconds" : "seconds"
      });
    } catch (e) {
      setDecodedDate({ local: "Invalid Date", utc: "Invalid Date", iso: "Invalid Date", relative: "", detectedUnit: "" });
    }
  }, [timestampInput]);

  // Date to Timestamp encoding effect
  useEffect(() => {
    const year = parseInt(yearInput, 10);
    const month = parseInt(monthInput, 10) - 1; // 0-11
    const day = parseInt(dayInput, 10);
    const hour = parseInt(hourInput, 10);
    const minute = parseInt(minuteInput, 10);
    const second = parseInt(secondInput, 10);

    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(minute) || isNaN(second)) {
      return;
    }

    const date = new Date(year, month, day, hour, minute, second);
    const ms = date.getTime();
    setGeneratedEpoch({
      sec: Math.floor(ms / 1000),
      ms: ms
    });
  }, [yearInput, monthInput, dayInput, hourInput, minuteInput, secondInput]);

  const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">Epoch Timestamp Converter</h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Live Clock & Date to Timestamp */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Live Unix Clock */}
          <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-title-main">Live Unix Clock</h3>
            <div className="flex flex-col items-center justify-center p-6 bg-black/20 rounded-2xl border border-white/5 relative">
              <span className="text-3xl font-extrabold text-primary-main font-mono tracking-wider">{nowSec}</span>
              <span className="text-xs text-text-secondary uppercase tracking-widest mt-2">seconds since jan 1, 1970</span>
              <button
                onClick={() => copyToClipboard(nowSec.toString(), setCopiedSec)}
                className="mt-4 px-4 py-1.5 rounded bg-primary-main/10 hover:bg-primary-main/20 text-primary-main text-xs border border-primary-main/20 transition-all font-bold"
              >
                {copiedSec ? "Copied!" : "Copy Epoch"}
              </button>
            </div>
          </div>

          {/* Date to Epoch */}
          <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-title-main">Date to Timestamp</h3>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <label className="text-xs text-text-secondary uppercase mb-1">Yr</label>
                <input
                  type="text"
                  value={yearInput}
                  onChange={(e) => setYearInput(e.target.value)}
                  className="px-3 py-2 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none text-center font-mono"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-text-secondary uppercase mb-1">Mo (1-12)</label>
                <input
                  type="text"
                  value={monthInput}
                  onChange={(e) => setMonthInput(e.target.value)}
                  className="px-3 py-2 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none text-center font-mono"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-text-secondary uppercase mb-1">Day</label>
                <input
                  type="text"
                  value={dayInput}
                  onChange={(e) => setDayInput(e.target.value)}
                  className="px-3 py-2 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none text-center font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="flex flex-col">
                <label className="text-xs text-text-secondary uppercase mb-1">Hr (0-23)</label>
                <input
                  type="text"
                  value={hourInput}
                  onChange={(e) => setHourInput(e.target.value)}
                  className="px-3 py-2 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none text-center font-mono"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-text-secondary uppercase mb-1">Min</label>
                <input
                  type="text"
                  value={minuteInput}
                  onChange={(e) => setMinuteInput(e.target.value)}
                  className="px-3 py-2 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none text-center font-mono"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-text-secondary uppercase mb-1">Sec</label>
                <input
                  type="text"
                  value={secondInput}
                  onChange={(e) => setSecondInput(e.target.value)}
                  className="px-3 py-2 bg-background-paper/50 border border-white/10 rounded-xl text-text-primary focus:outline-none text-center font-mono"
                />
              </div>
            </div>

            <div className="mt-4 p-4 border border-white/5 bg-white/5 rounded-2xl flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary font-bold font-mono">Epoch (sec):</span>
                <span className="text-primary-main font-mono font-bold select-all">{generatedEpoch.sec}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-t border-white/5 pt-2">
                <span className="text-text-secondary font-bold font-mono">Epoch (ms):</span>
                <span className="text-primary-main font-mono font-bold select-all">{generatedEpoch.ms}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Timestamp to Date converter */}
        <div className="lg:col-span-2 w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4 h-full">
          <h3 className="text-lg font-bold text-title-main">Timestamp to Human Date</h3>
          
          <CustomTextField
            label="Enter Epoch Timestamp (seconds or milliseconds)"
            fullWidth
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            className="mb-2"
          />

          <div className="flex flex-col gap-4 mt-2">
            
            {decodedDate.detectedUnit && (
              <div className="text-xs text-primary-main font-mono bg-primary-main/10 border border-primary-main/20 px-3 py-1.5 rounded-xl w-fit">
                Auto-detected: <strong>{decodedDate.detectedUnit}</strong>
              </div>
            )}

            <div className="p-4 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-1">
              <span className="text-xs text-text-secondary uppercase tracking-widest">Local Date String</span>
              <span className="text-md text-text-primary font-medium font-sans leading-relaxed">{decodedDate.local}</span>
            </div>

            <div className="p-4 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-1">
              <span className="text-xs text-text-secondary uppercase tracking-widest">GMT / UTC Date String</span>
              <span className="text-md text-primary-main font-mono leading-relaxed">{decodedDate.utc}</span>
            </div>

            <div className="p-4 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-1">
              <span className="text-xs text-text-secondary uppercase tracking-widest">ISO 8601 Format</span>
              <span className="text-md text-title-main font-mono leading-relaxed">{decodedDate.iso}</span>
            </div>

            {decodedDate.relative && (
              <div className="p-4 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-1">
                <span className="text-xs text-text-secondary uppercase tracking-widest">Relative Duration</span>
                <span className="text-md text-text-primary font-medium font-sans leading-relaxed">{decodedDate.relative}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EpochConverter;
