import React from 'react';
import { Play, RotateCcw, CheckCircle2, User, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { Translation } from '../types';

interface DisplayPanelProps {
  currentSelection: string | null;
  isAnimating: boolean;
  onPick: () => void;
  onResetHistory: () => void;
  remainingCount: number;
  totalCount: number;
  history: string[];
  canPick: boolean;
  t: Translation;
}

export const DisplayPanel: React.FC<DisplayPanelProps> = ({
  currentSelection,
  isAnimating,
  onPick,
  onResetHistory,
  remainingCount,
  totalCount,
  history,
  canPick,
  t
}) => {
  
  const progress = totalCount > 0 ? ((totalCount - remainingCount) / totalCount) * 100 : 0;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Main Result Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-indigo-100 dark:border-gray-700 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[300px] transition-colors duration-200">
        
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-50 dark:bg-purple-900/20 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {currentSelection ? (
            <>
              <div className={`mb-6 p-4 rounded-full ${isAnimating ? 'bg-indigo-100 dark:bg-indigo-900/30 animate-pulse' : 'bg-green-100 dark:bg-green-900/30'}`}>
                {isAnimating ? (
                  <Sparkles className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin-slow" />
                ) : (
                  <User className="w-10 h-10 text-green-600 dark:text-green-400" />
                )}
              </div>
              
              <h2 className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide uppercase mb-2">
                {isAnimating ? t.selecting : t.selectedStudent}
              </h2>
              
              <div className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-all duration-300 ${isAnimating ? 'opacity-50 blur-[1px] scale-95' : 'opacity-100 scale-100'}`}>
                {currentSelection}
              </div>
            </>
          ) : (
            <>
              <div className="mb-6 p-4 rounded-full bg-gray-100 dark:bg-gray-700">
                <User className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">{t.readyToStart}</h3>
              <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs">
                {t.readyDescription}
              </p>
            </>
          )}
        </div>

        {/* Action Button - Sticky at bottom of card visually */}
        <div className="mt-10 w-full max-w-xs">
          <Button 
            onClick={onPick} 
            disabled={!canPick || isAnimating}
            className="w-full h-12 text-lg shadow-indigo-200 dark:shadow-none"
            icon={!isAnimating && <Play className="w-5 h-5 fill-current" />}
          >
            {isAnimating ? t.rolling : remainingCount === 0 && totalCount > 0 ? t.allCalledReset : t.randomPick}
          </Button>
        </div>
      </div>

      {/* Progress & History Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 flex-1 flex flex-col transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            {t.calledHistory}
          </h3>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {totalCount - remainingCount} / {totalCount}
            </span>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={onResetHistory}
              disabled={history.length === 0}
              className="h-7 text-xs px-2"
              title="Reset history to allow students to be called again"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> {t.reset}
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="bg-indigo-500 dark:bg-indigo-400 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto min-h-[100px] border-t border-gray-100 dark:border-gray-700 pt-2">
          {history.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-sm italic">
              {t.noHistory}
            </div>
          ) : (
            <ul className="space-y-2">
              {[...history].reverse().map((student, idx) => (
                <li key={`${student}-${idx}`} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 group transition-colors">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{student}</span>
                  <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    #{history.length - idx}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
