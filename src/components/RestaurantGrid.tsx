import React from 'react';
import { useApp } from '../context/AppContext';
import { RestaurantCard } from './RestaurantCard';
import { UtensilsCrossed, RefreshCw } from 'lucide-react';

export const RestaurantGrid: React.FC = () => {
  const {
    restaurants,
    selectedCuisine,
    searchQuery,
    vegOnly,
    setSelectedRestaurant,
    setSelectedCuisine,
    setSearchQuery,
    setVegOnly,
  } = useApp();

  // Filter restaurants
  const filteredRestaurants = restaurants.filter((r) => {
    // Veg filter
    if (vegOnly && !r.isPureVeg) return false;

    // Cuisine filter
    if (selectedCuisine !== 'All') {
      const matches = r.cuisines.some((c) =>
        c.toLowerCase().includes(selectedCuisine.toLowerCase())
      );
      if (!matches) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch = r.name.toLowerCase().includes(q);
      const cuisineMatch = r.cuisines.some((c) => c.toLowerCase().includes(q));
      const addressMatch = r.address.toLowerCase().includes(q);
      if (!nameMatch && !cuisineMatch && !addressMatch) return false;
    }

    return true;
  });

  return (
    <section id="restaurants" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
            Top Restaurants in Your Loop
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Every order credits ₹20 to your wallet. Zero markups, genuine restaurant prices.
          </p>
        </div>
        <div className="text-xs font-semibold text-stone-500 tabular-nums">
          Showing {filteredRestaurants.length} restaurants
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => setSelectedRestaurant(restaurant)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">No restaurants match your filters</h3>
          <p className="text-xs text-stone-500 mt-1">
            Try adjusting your cuisine or veg preference to explore more delicious options.
          </p>
          <button
            onClick={() => {
              setSelectedCuisine('All');
              setSearchQuery('');
              setVegOnly(false);
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};
