import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RECHARGE_PLANS } from '../data/mockData';
import { MobileOperator, RechargePlan } from '../types';
import { isValidIndianMobileNumber } from '../utils/pricing';
import {
  X,
  Wallet,
  Smartphone,
  History,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Zap,
} from 'lucide-react';

export const WalletModal: React.FC = () => {
  const {
    walletBalance,
    walletTransactions,
    isWalletModalOpen,
    walletModalTab,
    setIsWalletModalOpen,
    processMobileRecharge,
    setIsCartOpen,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'balance' | 'recharge' | 'history'>(walletModalTab);
  const [selectedOperator, setSelectedOperator] = useState<MobileOperator>('Jio');
  const [mobileNumber, setMobileNumber] = useState('9845012345');
  const [selectedPlan, setSelectedPlan] = useState<RechargePlan>(RECHARGE_PLANS[0]);
  const [rechargeSuccess, setRechargeSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync tab with props when modal opened
  React.useEffect(() => {
    setActiveTab(walletModalTab);
  }, [walletModalTab]);

  if (!isWalletModalOpen) return null;

  const operators: MobileOperator[] = ['Jio', 'Airtel', 'Vi', 'BSNL'];
  const operatorPlans = RECHARGE_PLANS.filter((p) => p.operator === selectedOperator);

  const handleRecharge = () => {
    setErrorMessage(null);
    if (!isValidIndianMobileNumber(mobileNumber)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (e.g. 9845012345)');
      return;
    }

    if (walletBalance < selectedPlan.price) {
      setErrorMessage(`Insufficient balance. You have ₹${walletBalance}, but this plan costs ₹${selectedPlan.price}. Order food to earn ₹20 voucher per order!`);
      return;
    }

    const result = processMobileRecharge(mobileNumber, selectedOperator, selectedPlan);
    if (result.success) {
      setRechargeSuccess(result.message);
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-900 flex items-center justify-center font-black shadow-xs">
              <Wallet className="w-5 h-5 text-stone-900" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900 tracking-tight">CraveLoop Wallet &amp; Recharge</h2>
              <p className="text-xs text-stone-500">
                Guaranteed ₹20 for every meal · Spend on Food or Phone Recharge
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsWalletModalOpen(false);
              setRechargeSuccess(null);
            }}
            aria-label="Close wallet modal"
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-white px-6 shrink-0">
          <button
            onClick={() => {
              setActiveTab('balance');
              setRechargeSuccess(null);
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'balance'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Balance &amp; Rules</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('recharge');
              setRechargeSuccess(null);
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'recharge'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Instant Mobile Recharge</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('history');
              setRechargeSuccess(null);
            }}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Passbook History</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: BALANCE & RULES */}
          {activeTab === 'balance' && (
            <div className="space-y-6">
              {/* Big Balance Card */}
              <div className="rounded-2xl bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                    Available Wallet Balance
                  </span>
                  <span className="text-[11px] font-semibold bg-white/10 px-2 py-0.5 rounded text-stone-200">
                    Non-Withdrawable
                  </span>
                </div>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black tabular-nums tracking-tight text-white">
                    ₹{walletBalance}
                  </span>
                  <span className="text-xs text-amber-300 font-medium">Ready to spend</span>
                </div>

                <p className="mt-2 text-xs text-stone-300 max-w-sm">
                  Earned via guaranteed ₹20 order vouchers. Spend on delicious food orders or instant telecom mobile recharge.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('recharge')}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Recharge Phone With ₹{walletBalance}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsWalletModalOpen(false);
                      setIsCartOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs tracking-wide transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Use On Next Meal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* How The ₹20 Loop Works */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-stone-900">How The ₹20 Loop Benefit Works</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600" />
                      <span>₹20 On Every Order</span>
                    </div>
                    <p className="mt-1 text-stone-600 leading-normal">
                      Whether you order a ₹149 Biryani or a ₹500 Feast, ₹20 is instantly guaranteed into your wallet.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      <span>Pay Phone Bills Directly</span>
                    </div>
                    <p className="mt-1 text-stone-600 leading-normal">
                      Order lunch today, use your ₹20 to buy a Jio/Airtel 1GB data booster pack immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* Explicit Non-Withdrawal Policy Card */}
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-amber-950 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                  <span>Non-Withdrawal Policy &amp; Terms</span>
                </div>
                <p className="text-amber-900/90 leading-relaxed">
                  Money in the CraveLoop Wallet is strictly designated as a closed-loop customer loyalty voucher. <strong>It cannot be withdrawn or transferred to bank accounts or third-party UPI wallets.</strong> It remains safely in your CraveLoop account for future meals and prepaid/postpaid mobile recharges with zero expiry.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: INSTANT MOBILE RECHARGE */}
          {activeTab === 'recharge' && (
            <div className="space-y-6">
              {rechargeSuccess ? (
                /* Success Receipt View */
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-stone-900">Mobile Recharge Successful!</h3>
                    <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">{rechargeSuccess}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 max-w-sm mx-auto text-xs space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Mobile Number:</span>
                      <span className="font-bold text-stone-900">+91 {mobileNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Operator:</span>
                      <span className="font-bold text-stone-900">{selectedOperator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Plan Amount:</span>
                      <span className="font-bold text-stone-900">₹{selectedPlan.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Benefit:</span>
                      <span className="font-bold text-emerald-600">{selectedPlan.data}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-200">
                      <span className="text-stone-500">Remaining Wallet:</span>
                      <span className="font-bold text-amber-700">₹{walletBalance}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setRechargeSuccess(null);
                      setActiveTab('history');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    View in Passbook History
                  </button>
                </div>
              ) : (
                /* Recharge Input Form */
                <div className="space-y-5">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Operator Selection */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-2">
                      1. Select Telecom Operator
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {operators.map((op) => (
                        <button
                          key={op}
                          onClick={() => {
                            setSelectedOperator(op);
                            const firstPlan = RECHARGE_PLANS.find((p) => p.operator === op);
                            if (firstPlan) setSelectedPlan(firstPlan);
                          }}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            selectedOperator === op
                              ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                              : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          {op}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Number Input */}
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1.5">
                      2. Enter 10-Digit Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="9845012345"
                        className="w-full pl-12 pr-4 py-2.5 text-sm font-semibold tracking-wider bg-white border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Plan Picker */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-stone-700">
                        3. Choose Recharge Pack ({selectedOperator})
                      </label>
                      <span className="text-[11px] text-stone-500">
                        Wallet: <strong className="text-amber-700 font-bold">₹{walletBalance}</strong>
                      </span>
                    </div>

                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {operatorPlans.map((plan) => {
                        const isSelected = selectedPlan.id === plan.id;
                        const canAfford = walletBalance >= plan.price;

                        return (
                          <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                              isSelected
                                ? 'bg-amber-50/70 border-amber-500 shadow-xs'
                                : 'bg-white border-stone-200 hover:border-stone-300'
                            }`}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-stone-900 tabular-nums">
                                  ₹{plan.price}
                                </span>
                                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                                  {plan.data}
                                </span>
                                <span className="text-[11px] text-stone-500">
                                  Validity: {plan.validity}
                                </span>
                              </div>
                              <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                                {plan.description}
                              </p>
                            </div>

                            <div className="shrink-0 text-right">
                              {canAfford ? (
                                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                  Affordable with Wallet
                                </span>
                              ) : (
                                <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                                  Need ₹{plan.price - walletBalance} more
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Recharge */}
                  <div className="pt-3 border-t border-stone-200">
                    <button
                      onClick={handleRecharge}
                      className="w-full py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-amber-200" />
                      <span>Recharge ₹{selectedPlan.price} Using Wallet Balance</span>
                    </button>
                    <p className="text-center text-[11px] text-stone-400 mt-2">
                      Immediate telecom activation. Deducted seamlessly from your CraveLoop Wallet.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TRANSACTION PASSBOOK HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span>Passbook Entries ({walletTransactions.length})</span>
                <span>Current Balance: ₹{walletBalance}</span>
              </div>

              {walletTransactions.length === 0 ? (
                <div className="text-center py-10 text-xs text-stone-400">
                  No transactions yet. Place an order to earn your first ₹20 voucher!
                </div>
              ) : (
                <div className="space-y-2.5">
                  {walletTransactions.map((txn) => {
                    const isCredit = txn.amount > 0;

                    return (
                      <div
                        key={txn.id}
                        className="p-3.5 rounded-xl border border-stone-200 bg-white flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0 mt-0.5 ${
                              isCredit
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-stone-100 text-stone-700'
                            }`}
                          >
                            {isCredit ? '+' : '-'}
                          </div>
                          <div>
                            <div className="font-bold text-stone-900">{txn.title}</div>
                            <div className="text-[11px] text-stone-500 mt-0.5">
                              {txn.description}
                            </div>
                            <div className="text-[10px] text-stone-400 mt-1">
                              {txn.timestamp} {txn.referenceId && `· Ref: ${txn.referenceId}`}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span
                            className={`text-sm font-black tabular-nums ${
                              isCredit ? 'text-emerald-600' : 'text-stone-800'
                            }`}
                          >
                            {isCredit ? `+₹${txn.amount}` : `-₹${Math.abs(txn.amount)}`}
                          </span>
                          <div className="text-[10px] font-semibold text-emerald-700 uppercase">
                            {txn.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
