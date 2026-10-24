import React from 'react';
import { useApp } from '../context/AppContext';
import { CuisineType } from '../types';
import { Search, Sparkles } from 'lucide-react';

const CUISINES: CuisineType[] = [
  'All',
  'Biryani',
  'Burgers',
  'North Indian',
  'South Indian',
  'Pan-Asian',
  'Pizza & Pasta',
];

export const CategoryFilter: React.FC = () => {
  const {
    selectedCuisine,
    setSelectedCuisine,
    searchQuery,
    setSearchQuery,
    vegOnly,
    setVegOnly,
    setIsCouponModalOpen,
  } = useApp();

  return (
    <div className="py-6 border-b border-stone-200 bg-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top Filter Row: Search, Veg Toggle, Coupon Drawer Trigger */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, biryanis, burgers, or restaurants..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-stone-900 placeholder:text-stone-400"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Veg Only Toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              aria-label="Filter Pure Veg dishes"
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                vegOnly
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-400'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                  vegOnly ? 'border-white' : 'border-emerald-600'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    vegOnly ? 'bg-white' : 'bg-emerald-600'
                  }`}
                />
              </span>
              <span>Pure Veg Only</span>
            </button>

            {/* Coupons Trigger */}
            <button
              onClick={() => setIsCouponModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-all cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Coupons &amp; Offers</span>
            </button>
          </div>
        </div>

        {/* Cuisine Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CUISINES.map((cuisine) => {
            const isActive = selectedCuisine === cuisine;
            return (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
                }`}
              >
                {cuisine}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
