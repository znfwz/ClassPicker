import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { InputPanel } from './components/InputPanel';
import { DisplayPanel } from './components/DisplayPanel';
import { ANIMATION_DURATION_MS, SHUFFLE_INTERVAL_MS, TRANSLATIONS } from './constants';
import { InputError, Language } from './types';
import { GraduationCap, Moon, Sun, Languages } from 'lucide-react';

export default function App() {
  // Set default language to 'zh-CN' as requested
  const [lang, setLang] = useState<Language>('zh-CN');
  const t = TRANSLATIONS[lang];

  const [rawInput, setRawInput] = useState<string>('');
  const [students, setStudents] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [error, setError] = useState<InputError>(null);
  
  // Initialize dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Animation Refs
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Toggle Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en-US' ? 'zh-CN' : 'en-US');
  };

  // Parse input whenever it changes
  useEffect(() => {
    const lines = rawInput
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Duplicate detection
    const uniqueLines = Array.from(new Set(lines));
    const hasDuplicates = uniqueLines.length !== lines.length;

    if (hasDuplicates) {
      // Find duplicates for friendly message
      const counts: Record<string, number> = {};
      const duplicates: string[] = [];
      lines.forEach(line => {
        counts[line] = (counts[line] || 0) + 1;
        if (counts[line] === 2) duplicates.push(line);
      });
      setError({ type: 'duplicate', message: t.duplicatesDetected, items: duplicates });
    } else {
      setError(null);
    }

    // We use uniqueLines for the logic to prevent weighting bias
    setStudents(uniqueLines);
    
    // If input clears, reset everything
    if (uniqueLines.length === 0) {
      setHistory([]);
      setCurrentSelection(null);
    }
  }, [rawInput, t]);

  // Determine who hasn't been picked yet
  const remainingStudents = useMemo(() => {
    return students.filter(s => !history.includes(s));
  }, [students, history]);

  const handlePick = useCallback(() => {
    if (students.length === 0) return;
    
    // If everyone has been called, reset history logic or prompt
    let pool = remainingStudents;
    if (pool.length === 0) {
        if (window.confirm(t.confirmAllCalled)) {
            setHistory([]);
            pool = students; // Reset pool immediately for this pick
        } else {
            return;
        }
    }

    setIsAnimating(true);
    
    // Animation Logic: Rapidly cycle through names
    // We cycle through the *entire* list for visual effect, but pick from *remaining*
    const animationPool = students.length > 1 ? students : [t.looking, t.selecting, students[0]];
    
    let cycles = 0;
    
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    
    intervalRef.current = window.setInterval(() => {
      const randomPreview = animationPool[Math.floor(Math.random() * animationPool.length)];
      setCurrentSelection(randomPreview);
      cycles++;
    }, SHUFFLE_INTERVAL_MS);

    // Stop animation and set winner
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    
    timeoutRef.current = window.setTimeout(() => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      
      const winnerIndex = Math.floor(Math.random() * pool.length);
      const winner = pool[winnerIndex];
      
      setCurrentSelection(winner);
      setHistory(prev => [...prev, winner]);
      setIsAnimating(false);
    }, ANIMATION_DURATION_MS);

  }, [students, remainingStudents, t]);

  const handleResetHistory = () => {
    if (window.confirm(t.confirmResetHistory)) {
      setHistory([]);
      setCurrentSelection(null);
    }
  };

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 pb-12 transition-colors duration-200">
      
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {t.appTitle}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              {t.subtitle}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 flex items-center gap-1.5 text-sm font-medium"
                aria-label="Toggle Language"
              >
                <Languages className="w-4 h-4" />
                <span className="hidden xs:inline">{lang === 'en-US' ? '中文' : 'EN'}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle Dark Mode"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[calc(100vh-140px)] min-h-[600px]">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-4 h-full">
            <InputPanel 
              rawInput={rawInput} 
              setRawInput={setRawInput}
              parsedCount={students.length}
              error={error}
              t={t}
            />
          </div>

          {/* Right Column: Display & History */}
          <div className="lg:col-span-8 h-full">
            <DisplayPanel 
              currentSelection={currentSelection}
              isAnimating={isAnimating}
              onPick={handlePick}
              onResetHistory={handleResetHistory}
              remainingCount={remainingStudents.length}
              totalCount={students.length}
              history={history}
              canPick={students.length > 0}
              t={t}
            />
          </div>

        </div>
      </main>
    </div>
  );
}
