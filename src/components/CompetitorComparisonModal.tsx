import React from 'react';
import { useApp } from '../context/AppContext';
import { COMPETITOR_COMPARISON } from '../data/mockData';
import { X, ShieldCheck, Check, Sparkles, AlertCircle } from 'lucide-react';

export const CompetitorComparisonModal: React.FC = () => {
  const { isComparisonModalOpen, setIsComparisonModalOpen } = useApp();

  if (!isComparisonModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight">CraveLoop vs Swiggy &amp; Zomato</h2>
              <p className="text-xs text-stone-300">
                Transparent comparison of why Indian food lovers are switching
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsComparisonModalOpen(false)}
            aria-label="Close comparison modal"
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Table */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-100/80 border-b border-stone-200 text-stone-700">
                  <th className="p-3.5 font-bold">Benefit / Feature</th>
                  <th className="p-3.5 font-extrabold text-amber-700 bg-amber-50/50">CraveLoop</th>
                  <th className="p-3.5 font-medium text-stone-500">Swiggy</th>
                  <th className="p-3.5 font-medium text-stone-500">Zomato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {COMPETITOR_COMPARISON.map((row, idx) => (
                  <tr
                    key={idx}
                    className={row.highlight ? 'bg-amber-50/20' : 'bg-white hover:bg-stone-50/50'}
                  >
                    <td className="p-3.5 font-bold text-stone-900">
                      <div className="flex items-center gap-1.5">
                        {row.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        <span>{row.feature}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-black text-amber-800 bg-amber-50/40">
                      <div className="flex items-center gap-1">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{row.craveloop}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-stone-500">{row.swiggy}</td>
                    <td className="p-3.5 text-stone-500">{row.zomato}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Honest Explanation Box */}
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-600 space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Why the ₹20 Wallet Voucher Loop is Sustainable</span>
            </h4>
            <p className="leading-relaxed">
              Mainstream delivery apps charge restaurants up to 25-30% commissions AND charge you a ₹8-₹10 platform fee, pocketing the surplus. CraveLoop routes platform efficiency directly back to you as a <strong>guaranteed ₹20 wallet voucher</strong>. Because the voucher can only be used for mobile recharges and your next meals (non-withdrawable to banks), we avoid high payment gateway withdrawal overheads and pass 100% of the value to you!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setIsComparisonModalOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs cursor-pointer transition-colors"
          >
            Got It, Back to Ordering
          </button>
        </div>
      </div>
    </div>
  );
};
