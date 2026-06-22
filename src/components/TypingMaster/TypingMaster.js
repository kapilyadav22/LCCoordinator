import React, { useState, useEffect, useRef } from "react";
import { typingCurriculum } from "./typingTextCorpus";
import CustomButton from "../../layout/CustomButton";
import VirtualKeyboard from "./VirtualKeyboard";

const TypingMaster = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(0);
  
  const [text, setText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState("waiting"); // waiting, typing, finished
  const [timerDuration, setTimerDuration] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  
  // Live stats
  const [liveWpm, setLiveWpm] = useState(0);
  const [liveNetWpm, setLiveNetWpm] = useState(0);
  const [liveAccuracy, setLiveAccuracy] = useState(0);
  const [liveErrors, setLiveErrors] = useState(0);
  
  const inputRef = useRef(null);
  const activeCharRef = useRef(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    if (activeCharRef.current) {
      activeCharRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
  }, [userInput]);

  useEffect(() => {
    startNewTest();
    return () => clearInterval(intervalRef.current);
  }, [selectedDifficulty, selectedLessonIndex, timerDuration]);

  const startNewTest = () => {
    const lessonText = typingCurriculum[selectedDifficulty][selectedLessonIndex].text;
    setText(lessonText);
    setUserInput("");
    setStatus("waiting");
    setTimeLeft(timerDuration);
    setLiveWpm(0);
    setLiveNetWpm(0);
    setLiveAccuracy(0);
    setLiveErrors(0);
    startTimeRef.current = null;
    clearInterval(intervalRef.current);
    if (inputRef.current) inputRef.current.focus();
  };

  const calculateStats = (currentInput, timeElapsedMs) => {
    let correctChars = 0;
    let errorCount = 0;
    
    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] === text[i]) correctChars++;
      else errorCount++;
    }

    const timeElapsedMins = timeElapsedMs / 60000;
    if (timeElapsedMins <= 0) return { rawWpm: 0, netWpm: 0, accuracy: 0, errors: 0 };

    const wordsTyped = currentInput.length / 5;
    const rawWpm = Math.round(wordsTyped / timeElapsedMins);
    
    // Net WPM rigorously subtracts uncorrected errors
    let netWpm = Math.round(rawWpm - (errorCount / timeElapsedMins));
    if (netWpm < 0) netWpm = 0;

    const accuracy = currentInput.length > 0 ? Math.round((correctChars / currentInput.length) * 100) : 0;

    return { rawWpm, netWpm, accuracy, errors: errorCount };
  };

  const handleStartTyping = () => {
    if (status === "waiting") {
      setStatus("typing");
      startTimeRef.current = Date.now();
      
      intervalRef.current = setInterval(() => {
        const timeElapsed = Date.now() - startTimeRef.current;
        const timeRemaining = Math.ceil(timerDuration - (timeElapsed / 1000));
        
        if (timeRemaining <= 0) {
          clearInterval(intervalRef.current);
          finishTest(userInput, timerDuration * 1000);
          setTimeLeft(0);
        } else {
          setTimeLeft(timeRemaining);
          
          // Update live stats every tick
          const stats = calculateStats(userInput, timeElapsed);
          setLiveWpm(stats.rawWpm);
          setLiveNetWpm(stats.netWpm);
          setLiveAccuracy(stats.accuracy);
        }
      }, 100); // Fast tick for smooth UI updates
    }
  };

  const finishTest = (finalInput, exactTimeMs) => {
    setStatus("finished");
    clearInterval(intervalRef.current);
    
    const timeElapsed = exactTimeMs || (Date.now() - startTimeRef.current);
    const stats = calculateStats(finalInput, timeElapsed);
    
    setLiveWpm(stats.rawWpm);
    setLiveNetWpm(stats.netWpm);
    setLiveAccuracy(stats.accuracy);
    setLiveErrors(stats.errors);
  };

  const handleInputChange = (e) => {
    if (status === "finished") return;
    
    let val = e.target.value;
    setUserInput(val);
    
    if (status === "waiting") {
      handleStartTyping();
    }
    
    if (startTimeRef.current) {
      const timeElapsed = Date.now() - startTimeRef.current;
      const stats = calculateStats(val, timeElapsed);
      setLiveWpm(stats.rawWpm);
      setLiveNetWpm(stats.netWpm);
      setLiveAccuracy(stats.accuracy);
      setLiveErrors(stats.errors);
    }
    
    if (val.length >= text.length) {
      finishTest(val, Date.now() - startTimeRef.current);
    }
  };

  const renderText = () => {
    return text.split("").map((char, index) => {
      let colorClass = "text-text-secondary opacity-50"; // upcoming text
      
      if (index < userInput.length) {
        colorClass = char === userInput[index] ? "text-cyan-400" : "text-red-500 bg-red-500/20 rounded-sm";
      }
      
      const isCursor = index === userInput.length;
      
      return (
        <span 
          key={index}
          ref={isCursor ? activeCharRef : null}
          className={`text-xl sm:text-2xl font-mono tracking-wider ${colorClass} ${isCursor ? 'border-b-2 border-title-main animate-pulse shadow-[0_4px_0_0_rgba(251,191,36,1)]' : ''}`}
        >
          {char === "\n" ? "↵\n" : char}
        </span>
      );
    });
  };

  return (
    <div className="w-full flex flex-col items-center pt-24 px-4 min-h-screen pb-10">
      
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
        
        {/* Curriculum Sidebar */}
        <div className="w-full lg:w-1/4 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl sticky top-24 border border-white/5 shadow-lg">
            <h2 className="text-2xl font-bold text-title-main mb-6">Curriculum</h2>
            
            {Object.keys(typingCurriculum).map((difficulty) => (
              <div key={difficulty} className="mb-6">
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-3 pl-2">
                  {difficulty}
                </h3>
                <div className="flex flex-col gap-1">
                  {typingCurriculum[difficulty].map((lesson, idx) => {
                    const isSelected = selectedDifficulty === difficulty && selectedLessonIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedDifficulty(difficulty);
                          setSelectedLessonIndex(idx);
                        }}
                        className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                          isSelected 
                            ? "bg-title-main/10 text-title-main border border-title-main/20 shadow-inner" 
                            : "text-text-primary hover:bg-white/5"
                        }`}
                      >
                        {lesson.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typing Area Main Content */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6">
          
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-background-paper p-6 rounded-3xl glass-panel gap-4 border border-white/5 shadow-lg">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-title-main">{typingCurriculum[selectedDifficulty][selectedLessonIndex].title}</h1>
              <div className="flex gap-4 mt-2">
                <span className="text-text-secondary font-mono bg-white/5 px-2 py-1 rounded-md text-sm">Net WPM: <span className="text-title-main font-bold">{liveNetWpm}</span></span>
                <span className="text-text-secondary font-mono bg-white/5 px-2 py-1 rounded-md text-sm">Accuracy: <span className={liveAccuracy > 90 ? "text-cyan-400" : "text-red-400"}>{liveAccuracy}%</span></span>
                <span className="text-text-secondary font-mono bg-white/5 px-2 py-1 rounded-md text-sm">Errors: <span className={liveErrors > 0 ? "text-red-400 font-bold" : "text-cyan-400"}>{liveErrors}</span></span>
              </div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex bg-white/5 rounded-full p-1 border border-white/10 shadow-inner">
                {[15, 30, 60].map((time) => (
                  <button
                    key={time}
                    onClick={() => setTimerDuration(time)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${timerDuration === time ? 'bg-cyan-500 text-white shadow-md' : 'text-text-secondary hover:text-text-primary'}`}
                  >
                    {time}s
                  </button>
                ))}
              </div>
              <div className="text-3xl font-bold text-cyan-400 font-mono w-16 text-center">
                {timeLeft}
              </div>
            </div>
          </div>

          {/* Typing Box with Auto-Scroll */}
          <div 
            className="relative w-full p-8 rounded-3xl glass-panel border border-white/5 h-[300px] overflow-hidden flex flex-col cursor-text shadow-inner bg-black/10 dark:bg-black/40"
            onClick={() => inputRef.current?.focus()}
          >
            {status === "finished" ? (
              <div className="flex flex-col items-center justify-center w-full h-full gap-6 animate-fade-in">
                <h2 className="text-3xl font-bold text-title-main mb-2">Lesson Complete!</h2>
                <div className="flex gap-8 sm:gap-16">
                  <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-5xl font-extrabold text-cyan-400">{liveNetWpm}</span>
                    <span className="text-text-secondary uppercase tracking-widest text-xs mt-2">Net WPM</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-5xl font-extrabold text-text-primary">{liveWpm}</span>
                    <span className="text-text-secondary uppercase tracking-widest text-xs mt-2">Raw WPM</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-5xl font-extrabold text-title-main">{liveAccuracy}%</span>
                    <span className="text-text-secondary uppercase tracking-widest text-xs mt-2">Accuracy</span>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <CustomButton onClick={startNewTest} className="w-auto px-12 py-3">Retry Lesson</CustomButton>
                </div>
              </div>
            ) : (
              <div className="relative w-full select-none whitespace-pre-wrap pb-32" style={{ lineHeight: '2.5' }}>
                {renderText()}
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-default resize-none"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  onBlur={() => {
                    if (status === "typing") inputRef.current?.focus();
                  }}
                />
              </div>
            )}
          </div>

          {/* Virtual Keyboard */}
          {status !== "finished" && (
            <VirtualKeyboard activeChar={text[userInput.length]} />
          )}

        </div>

      </div>
    </div>
  );
};

export default TypingMaster;
