import React, { useState, useEffect } from "react";
import CustomTextField from "../../layout/CustomTextField";

const formatValue = (val, type) => {
  const num = parseInt(val, 10);
  if (isNaN(num)) return val;
  if (type === "minute") {
    return num < 10 ? `0${num}` : `${num}`;
  }
  if (type === "hour") {
    const period = num >= 12 ? "PM" : "AM";
    const displayHour = num % 12 === 0 ? 12 : num % 12;
    return `${displayHour}:00 ${period}`;
  }
  if (type === "dayOfWeek") {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[num] || val;
  }
  if (type === "month") {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[num - 1] || val;
  }
  return val;
};

const parseCronField = (field, type) => {
  if (field === "*") {
    return type === "minute" ? "every minute" : type === "hour" ? "every hour" : "every day";
  }

  if (field.startsWith("*/")) {
    const step = parseInt(field.split("/")[1], 10);
    if (isNaN(step)) return `every ${field}`;
    if (type === "minute") return `every ${step} minutes`;
    if (type === "hour") return `every ${step} hours`;
    return `every ${step} days`;
  }

  if (field.includes("-")) {
    const [start, end] = field.split("-").map(num => formatValue(num, type));
    return `between ${start} and ${end}`;
  }

  if (field.includes(",")) {
    const parts = field.split(",").map(num => formatValue(num, type));
    return `at ${parts.slice(0, -1).join(", ")}${parts.length > 1 ? " and " : ""}${parts.slice(-1)}`;
  }

  return `at ${formatValue(field, type)}`;
};

const describeCron = (cronExpr) => {
  const parts = cronExpr.trim().split(/\s+/);
  if (parts.length !== 5) {
    return "Error: A valid cron expression must contain exactly 5 fields (minute, hour, day-of-month, month, day-of-week).";
  }

  const [min, hr, dom, mon, dow] = parts;

  // Validate characters (basic check)
  const cronRegex = /^[0-9\*\/\,\-]+$/;
  if (!parts.every(p => cronRegex.test(p))) {
    return "Error: Cron expression contains invalid characters. Use digits, *, /, -, and commas.";
  }

  let desc = "";

  // 1. Minute & Hour
  if (min === "*" && hr === "*") {
    desc += "Every minute";
  } else if (min === "0" && hr === "*") {
    desc += "Every hour, at minute 00";
  } else {
    const minDesc = parseCronField(min, "minute");
    const hrDesc = parseCronField(hr, "hour");

    if (hr === "*") {
      desc += `${minDesc.charAt(0).toUpperCase() + minDesc.slice(1)} of every hour`;
    } else {
      desc += `${minDesc.charAt(0).toUpperCase() + minDesc.slice(1)} ${hrDesc}`;
    }
  }

  // 2. Month, Day of Month, Day of Week
  const dowDesc = parseCronField(dow, "dayOfWeek");
  const domDesc = parseCronField(dom, "dayOfMonth");
  const monDesc = parseCronField(mon, "month");

  if (dom !== "*") {
    desc += `, on day ${domDesc}`;
  }

  if (mon !== "*") {
    desc += `, in ${monDesc}`;
  }

  if (dow !== "*") {
    let cleanDow = dowDesc;
    if (dow.includes("-")) {
      const [start, end] = dow.split("-").map(d => formatValue(d, "dayOfWeek"));
      cleanDow = `${start} through ${end}`;
    } else if (cleanDow.startsWith("at ")) {
      cleanDow = cleanDow.substring(3);
    }
    desc += `, on ${cleanDow}`;
  }

  return desc + ".";
};

const CronDescriptor = () => {
  const [cronInput, setCronInput] = useState("*/15 10-12 * * 1-5");
  const [description, setDescription] = useState("");

  // Builder states
  const [builderMinute, setBuilderMinute] = useState("*/15");
  const [builderHour, setBuilderHour] = useState("10-12");
  const [builderDom, setBuilderDom] = useState("*");
  const [builderMonth, setBuilderMonth] = useState("*");
  const [builderDow, setBuilderDow] = useState("1-5");

  useEffect(() => {
    setDescription(describeCron(cronInput));
  }, [cronInput]);

  const handleBuildCron = () => {
    const expr = `${builderMinute} ${builderHour} ${builderDom} ${builderMonth} ${builderDow}`;
    setCronInput(expr);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel border border-white/5 shadow-lg">
        <h2 className="text-2xl font-bold text-title-main">Cron Expression Descriptor</h2>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side: Tester / Descriptor */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Parse Expression</h3>
          
          <CustomTextField
            label="Cron Expression (5 Fields)"
            fullWidth
            value={cronInput}
            onChange={(e) => setCronInput(e.target.value)}
            className="mb-2"
          />

          <div className="p-6 border border-white/5 rounded-2xl bg-white/5 flex flex-col gap-2 mt-2">
            <h6 className="text-xs uppercase tracking-widest text-text-secondary">English Description</h6>
            <p className={`text-lg font-medium font-sans ${description.startsWith("Error:") ? "text-red-400" : "text-text-primary"}`}>
              {description}
            </p>
          </div>

          <div className="mt-4 p-4 border border-white/5 bg-white/5 rounded-2xl">
            <h4 className="text-sm font-bold text-primary-main mb-2">Cron Syntax Quick Guide</h4>
            <div className="grid grid-cols-5 text-center text-xs font-mono gap-1 text-text-secondary">
              <div className="p-1 bg-black/20 rounded">min<br/>(0-59)</div>
              <div className="p-1 bg-black/20 rounded">hour<br/>(0-23)</div>
              <div className="p-1 bg-black/20 rounded">day<br/>(1-31)</div>
              <div className="p-1 bg-black/20 rounded">month<br/>(1-12)</div>
              <div className="p-1 bg-black/20 rounded">wday<br/>(0-6)</div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Builder */}
        <div className="w-full p-8 rounded-3xl glass-panel border border-white/5 bg-black/10 dark:bg-black/40 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-title-main">Interactive Builder</h3>
          
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="text-xs text-text-secondary uppercase mb-1">Minutes</label>
              <select
                value={builderMinute}
                onChange={(e) => setBuilderMinute(e.target.value)}
                className="w-full px-3 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary focus:outline-none"
              >
                <option value="*">Every minute (*)</option>
                <option value="*/5">Every 5 minutes (*/5)</option>
                <option value="*/10">Every 10 minutes (*/10)</option>
                <option value="*/15">Every 15 minutes (*/15)</option>
                <option value="*/20">Every 20 minutes (*/20)</option>
                <option value="*/30">Every 30 minutes (*/30)</option>
                <option value="0">At start of hour (0)</option>
                <option value="15">At 15 minutes past the hour (15)</option>
                <option value="30">At 30 minutes past the hour (30)</option>
                <option value="45">At 45 minutes past the hour (45)</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-text-secondary uppercase mb-1">Hours</label>
              <select
                value={builderHour}
                onChange={(e) => setBuilderHour(e.target.value)}
                className="w-full px-3 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary focus:outline-none"
              >
                <option value="*">Every hour (*)</option>
                <option value="*/2">Every 2 hours (*/2)</option>
                <option value="*/3">Every 3 hours (*/3)</option>
                <option value="*/4">Every 4 hours (*/4)</option>
                <option value="*/6">Every 6 hours (*/6)</option>
                <option value="*/8">Every 8 hours (*/8)</option>
                <option value="*/12">Every 12 hours (*/12)</option>
                <option value="0">Midnight (0)</option>
                <option value="9">9:00 AM (9)</option>
                <option value="12">12:00 PM (12)</option>
                <option value="10-12">Between 10 AM & 12 PM (10-12)</option>
                <option value="1-5">Between 1 AM & 5 AM (1-5)</option>
                <option value="18-22">Between 6 PM & 10 PM (18-22)</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-text-secondary uppercase mb-1">Day of Month</label>
              <select
                value={builderDom}
                onChange={(e) => setBuilderDom(e.target.value)}
                className="w-full px-3 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary focus:outline-none"
              >
                <option value="*">Every day (*)</option>
                <option value="*/2">Every other day (*/2)</option>
                <option value="*/5">Every 5 days (*/5)</option>
                <option value="1">1st of the month (1)</option>
                <option value="15">15th of the month (15)</option>
                <option value="1,15">1st and 15th of the month (1,15)</option>
                <option value="31">Last day of 31-day months (31)</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-text-secondary uppercase mb-1">Month</label>
              <select
                value={builderMonth}
                onChange={(e) => setBuilderMonth(e.target.value)}
                className="w-full px-3 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary focus:outline-none"
              >
                <option value="*">Every month (*)</option>
                <option value="*/3">Every quarter / 3 months (*/3)</option>
                <option value="1">January (1)</option>
                <option value="3">March (3)</option>
                <option value="6">June (6)</option>
                <option value="9">September (9)</option>
                <option value="12">December (12)</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-text-secondary uppercase mb-1">Day of Week</label>
              <select
                value={builderDow}
                onChange={(e) => setBuilderDow(e.target.value)}
                className="w-full px-3 py-2 bg-background-default border border-white/10 rounded-xl text-text-primary focus:outline-none"
              >
                <option value="*">Every day (*)</option>
                <option value="1-5">Weekdays (Mon-Fri) (1-5)</option>
                <option value="6,0">Weekends (Sat-Sun) (6,0)</option>
                <option value="1">Monday (1)</option>
                <option value="5">Friday (5)</option>
                <option value="*/2">Every other day of week (*/2)</option>
              </select>
            </div>

            <button
              onClick={handleBuildCron}
              className="mt-2 px-6 py-2.5 rounded-full text-sm font-bold text-white bg-primary-main hover:bg-primary-dark transition-all shadow-md active:scale-95 text-center"
            >
              Generate Expression & Descriptor
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CronDescriptor;
