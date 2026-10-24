export type CuisineType = 
  | 'All'
  | 'Biryani'
  | 'Burgers'
  | 'North Indian'
  | 'South Indian'
  | 'Pan-Asian'
  | 'Pizza & Pasta'
  | 'Healthy Bowls'
  | 'Desserts';

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  isVeg: boolean;
  category: string;
  image?: string;
  isBestseller?: boolean;
  rating: number;
  ratingCount: number;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy';
  isCustomizable?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string; // e.g. "25-30 mins"
  deliveryFee: number;
  minOrder: number;
  cuisines: string[];
  isPureVeg: boolean;
  image: string;
  featured?: boolean;
  address: string;
  discountBadge?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customization?: string;
}

export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  tag: string;
}

export type TransactionType = 'order_cashback' | 'order_redemption' | 'mobile_recharge' | 'welcome_bonus';

export interface WalletTransaction {
  id: string;
  timestamp: string;
  type: TransactionType;
  amount: number;
  title: string;
  description: string;
  referenceId?: string;
  status: 'completed' | 'processing';
}

export type MobileOperator = 'Jio' | 'Airtel' | 'Vi' | 'BSNL';

export interface RechargePlan {
  id: string;
  operator: MobileOperator;
  price: number;
  data: string;
  validity: string;
  talktime?: string;
  description: string;
  planCategory: 'Booster / 4G Data' | 'Unlimited Calling' | 'Value Topup';
  popular?: boolean;
}

export interface Order {
  id: string;
  date: string;
  restaurantName: string;
  restaurantImage: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number; // Always 0 on CraveLoop!
  couponDiscount: number;
  walletRedeemed: number;
  totalPaid: number;
  cashbackEarned: number; // ₹20 voucher
  status: 'confirmed' | 'preparing' | 'picked_up' | 'out_for_delivery' | 'delivered';
  deliveryPerson: {
    name: string;
    phone: string;
    rating: number;
  };
  deliveryAddress: string;
  estimatedDeliveryTime: string;
}

export interface BillCalculationResult {
  subtotal: number;
  couponDiscount: number;
  deliveryFee: number;
  platformFee: number; // 0
  availableWalletBalance: number;
  walletAmountToDeduct: number;
  finalPayable: number;
  guaranteedVoucherEarned: number; // ₹20
  savingsVsSwiggyZomato: number;
}
