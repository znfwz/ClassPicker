import React from 'react';
import { Users, AlertCircle, RotateCcw, Copy } from 'lucide-react';
import { Button } from './Button';
import { InputError, Translation } from '../types';

interface InputPanelProps {
  rawInput: string;
  setRawInput: (val: string) => void;
  parsedCount: number;
  error: InputError;
  t: Translation;
}

export const InputPanel: React.FC<InputPanelProps> = ({ 
  rawInput, 
  setRawInput, 
  parsedCount,
  error,
  t
}) => {
  
  const handleLoadSample = (e: React.MouseEvent) => {
    e.preventDefault();
    // Directly set sample data without confirmation dialog to prevent UI blocking
    setRawInput(t.sampleData);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    // Directly clear data without confirmation dialog to prevent UI blocking
    setRawInput('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-full overflow-hidden transition-colors duration-200">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold">
          <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2>{t.classList}</h2>
          <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-0.5 rounded-full">
            {parsedCount}
          </span>
        </div>
        <div className="flex gap-2">
           <button 
            type="button"
            onClick={handleLoadSample}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline flex items-center gap-1"
            title="Load sample data"
          >
            <Copy className="w-3 h-3" /> {t.sample}
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 relative flex flex-col bg-white dark:bg-gray-800">
        <textarea
          value={rawInput}
          onChange={(e) => setRawInput(e.target.value)}
          placeholder={t.placeholder}
          className="w-full flex-1 min-h-[200px] p-3 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none leading-relaxed placeholder-gray-400 dark:placeholder-gray-600 transition-colors"
          spellCheck={false}
        />
        
        {/* Validation Messages */}
        {error && error.type === 'duplicate' && (
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
            <div className="text-xs text-yellow-700 dark:text-yellow-400">
              <span className="font-semibold block mb-0.5">{t.duplicatesDetected}</span>
              <p>{error.items?.join(', ')}</p>
              <p className="mt-1 opacity-75">{t.duplicatesMessage}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleClear}
          disabled={!rawInput}
          className="text-xs h-8"
          icon={<RotateCcw className="w-3 h-3" />}
        >
          {t.clearList}
        </Button>
      </div>
    </div>
  );
};