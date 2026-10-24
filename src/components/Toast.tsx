import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-3 duration-200">
      <div
        className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-semibold ${
          isSuccess
            ? 'bg-stone-900 text-white border-stone-800'
            : isError
            ? 'bg-red-600 text-white border-red-700'
            : 'bg-white text-stone-900 border-stone-200 shadow-md'
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
        ) : isError ? (
          <AlertCircle className="w-4 h-4 text-white shrink-0" />
        ) : (
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
        )}
        <span>{toast.text}</span>
      </div>
    </div>
  );
};
