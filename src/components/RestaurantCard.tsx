import React from 'react';
import { Restaurant } from '../types';
import { Star, Clock, Gift } from 'lucide-react';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group text-left bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-amber-500"
    >
      {/* Visual Image Container with Fallback */}
      <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Styled graceful CSS fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        
        {/* Discount / Loop Voucher Banner */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-bold text-white bg-stone-900/85 backdrop-blur-xs px-2.5 py-1 rounded-lg">
          <span className="truncate">{restaurant.discountBadge || '50% OFF up to ₹100'}</span>
          <span className="text-amber-300 shrink-0 flex items-center gap-1 font-extrabold ml-1">
            <Gift className="w-3 h-3" />
            <span>+₹20 Voucher</span>
          </span>
        </div>

        {/* Pure Veg Indicator if applicable */}
        {restaurant.isPureVeg && (
          <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded text-[10px] font-bold text-emerald-700 flex items-center gap-1 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>PURE VEG</span>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-600 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-1.5 py-0.5 rounded shrink-0">
              <span className="tabular-nums">{restaurant.rating}</span>
              <Star className="w-3 h-3 fill-current" />
            </div>
          </div>

          {/* Clean Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span className="tabular-nums">{restaurant.deliveryTime}</span>
            <span aria-hidden="true">·</span>
            <span>Min ₹{restaurant.minOrder}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{restaurant.address}</span>
          </div>

          {/* Cuisines Unboxed */}
          <p className="mt-2 text-xs text-stone-600 line-clamp-1 font-normal">
            {restaurant.cuisines.join(', ')}
          </p>
        </div>

        {/* Footer Loop Perk Note */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium">
          <span className="text-stone-500">Platform Fee: <strong className="text-emerald-600 font-bold">₹0</strong></span>
          <span className="text-amber-700 font-semibold group-hover:translate-x-0.5 transition-transform">
            View Menu &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
