import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/mockData';
import { MenuItem } from '../types';
import { X, Star, Clock, Gift, Plus, Minus, ShoppingBag, Flame } from 'lucide-react';

export const RestaurantModal: React.FC = () => {
  const {
    selectedRestaurant,
    setSelectedRestaurant,
    cart,
    addToCart,
    updateQuantity,
    setIsCartOpen,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!selectedRestaurant) return null;

  // Filter menu items for this restaurant
  const items = MENU_ITEMS.filter((i) => i.restaurantId === selectedRestaurant.id);
  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = items.filter(
    (i) => activeCategory === 'All' || i.category === activeCategory
  );

  const getItemQuantityInCart = (itemId: string) => {
    const found = cart.find((c) => c.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header Hero Area */}
        <div className="relative bg-stone-900 text-white p-6 sm:p-8 shrink-0">
          <button
            onClick={() => setSelectedRestaurant(null)}
            aria-label="Close restaurant menu"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-800/80 hover:bg-stone-700 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-amber-300 bg-amber-950/80 border border-amber-800/80 px-2 py-0.5 rounded">
                +₹20 Loop Voucher
              </span>
              {selectedRestaurant.isPureVeg && (
                <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                  Pure Veg
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {selectedRestaurant.name}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-300">
              {selectedRestaurant.tagline}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-stone-300 font-medium">
              <div className="flex items-center gap-1 bg-emerald-700 text-white font-bold px-1.5 py-0.5 rounded">
                <span>{selectedRestaurant.rating}</span>
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span>({selectedRestaurant.reviewCount.toLocaleString()} reviews)</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                {selectedRestaurant.deliveryTime}
              </span>
              <span>·</span>
              <span>Platform Fee: ₹0</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 py-3 border-b border-stone-200 bg-stone-50 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {filteredItems.map((item: MenuItem) => {
            const qty = getItemQuantityInCart(item.id);

            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-stone-200 hover:border-stone-300 bg-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Item Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {/* Standard Indian Veg / Non-Veg Indicator */}
                    <span
                      aria-label={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                      className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 ${
                        item.isVeg
                          ? 'border-emerald-600'
                          : 'border-red-700'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.isVeg ? 'bg-emerald-600' : 'bg-red-700'
                        }`}
                      />
                    </span>

                    <h4 className="text-base font-bold text-stone-900">
                      {item.name}
                    </h4>

                    {item.isBestseller && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">
                        Bestseller
                      </span>
                    )}

                    {item.spiceLevel && (
                      <span className="text-[10px] font-semibold text-stone-500 flex items-center gap-0.5">
                        <Flame className="w-3 h-3 text-red-500" />
                        {item.spiceLevel}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-extrabold text-stone-900 tabular-nums">
                      ₹{item.price}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-stone-400 line-through tabular-nums">
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="mt-1.5 text-xs text-stone-500 line-clamp-2 max-w-xl">
                    {item.description}
                  </p>
                </div>

                {/* Add Action or Stepper */}
                <div className="shrink-0 flex items-center">
                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  ) : (
                    <div className="flex items-center border border-amber-400 bg-amber-50 rounded-xl overflow-hidden shadow-xs">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="px-3 py-1.5 text-amber-900 hover:bg-amber-100 font-bold text-sm cursor-pointer transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1.5 text-xs font-black text-amber-950 tabular-nums">
                        {qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase ${item.name} quantity`}
                        className="px-3 py-1.5 text-amber-900 hover:bg-amber-100 font-bold text-sm cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Bottom Cart Bar if items exist */}
        {totalCartCount > 0 && (
          <div className="p-4 border-t border-stone-200 bg-amber-50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-amber-900">
                ₹20 Voucher will be credited to your wallet with this order!
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedRestaurant(null);
                setIsCartOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Cart ({totalCartCount})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
