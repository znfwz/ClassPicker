export interface Student {
  id: string;
  name: string;
}

export interface PickerState {
  allStudents: string[];
  history: string[];
  currentSelection: string | null;
  isAnimating: boolean;
}

export type InputError = {
  type: 'duplicate' | 'empty';
  message: string;
  items?: string[];
} | null;

export type Language = 'en-US' | 'zh-CN';

export type Translation = {
  appTitle: string;
  subtitle: string;
  classList: string;
  sample: string;
  clearList: string;
  placeholder: string;
  duplicatesDetected: string;
  duplicatesMessage: string;
  confirmLoadSample: string;
  confirmClear: string;
  readyToStart: string;
  readyDescription: string;
  selecting: string;
  selectedStudent: string;
  rolling: string;
  allCalledReset: string;
  randomPick: string;
  calledHistory: string;
  reset: string;
  noHistory: string;
  confirmResetHistory: string;
  confirmAllCalled: string;
  looking: string;
  sampleData: string;
};
