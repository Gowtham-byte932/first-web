import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Restaurant,
  MenuItem,
  CartItem,
  Coupon,
  WalletTransaction,
  Order,
  CuisineType,
  MobileOperator,
  RechargePlan,
  BillCalculationResult,
} from '../types';
import {
  RESTAURANTS,
  COUPONS,
  INITIAL_WALLET_BALANCE,
  DEFAULT_PAST_ORDERS,
} from '../data/mockData';
import {
  calculateBill,
  validateRechargePlan,
  GUARANTEED_VOUCHER_PER_ORDER,
} from '../utils/pricing';

interface AppContextType {
  restaurants: Restaurant[];
  cart: CartItem[];
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  activeCoupon: Coupon | null;
  isWalletApplied: boolean;
  orders: Order[];
  activeOrder: Order | null;
  selectedCuisine: CuisineType;
  searchQuery: string;
  vegOnly: boolean;
  
  // Modals & UI controls
  isCartOpen: boolean;
  isWalletModalOpen: boolean;
  walletModalTab: 'balance' | 'recharge' | 'history';
  isCouponModalOpen: boolean;
  isComparisonModalOpen: boolean;
  isShareModalOpen: boolean;
  isOrderHistoryOpen: boolean;
  selectedRestaurant: Restaurant | null;
  toast: { text: string; type: 'success' | 'info' | 'error' } | null;

  // Actions
  setSelectedCuisine: (c: CuisineType) => void;
  setSearchQuery: (q: string) => void;
  setVegOnly: (v: boolean) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsWalletModalOpen: (open: boolean, tab?: 'balance' | 'recharge' | 'history') => void;
  setIsCouponModalOpen: (open: boolean) => void;
  setIsComparisonModalOpen: (open: boolean) => void;
  setIsShareModalOpen: (open: boolean) => void;
  setIsOrderHistoryOpen: (open: boolean) => void;
  setSelectedRestaurant: (r: Restaurant | null) => void;
  setActiveOrder: (order: Order | null) => void;
  
  addToCart: (item: MenuItem, customization?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  reorder: (order: Order) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  toggleWalletApplied: () => void;
  
  bill: BillCalculationResult;
  placeOrder: (deliveryAddress: string) => Order | null;
  processMobileRecharge: (
    mobileNumber: string,
    operator: MobileOperator,
    plan: RechargePlan
  ) => { success: boolean; message: string };
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Wallet state with localStorage resilience
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('craveloop_wallet_bal');
      return saved !== null ? Number(saved) : INITIAL_WALLET_BALANCE;
    } catch {
      return INITIAL_WALLET_BALANCE;
    }
  });

  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(() => {
    try {
      const saved = localStorage.getItem('craveloop_wallet_txns');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'txn-welcome-1',
        timestamp: new Date().toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        type: 'welcome_bonus',
        amount: INITIAL_WALLET_BALANCE,
        title: 'Welcome Joining Bonus',
        description: 'Starter wallet cash for your first order or mobile recharge.',
        status: 'completed',
      },
    ];
  });

  // 2. Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('craveloop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(COUPONS[0]); // Default handy coupon
  const [isWalletApplied, setIsWalletApplied] = useState<boolean>(true);

  // 3. Orders history
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('craveloop_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_PAST_ORDERS;
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // 4. Filters & search
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vegOnly, setVegOnly] = useState<boolean>(false);

  // 5. Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpenState] = useState(false);
  const [walletModalTab, setWalletModalTab] = useState<'balance' | 'recharge' | 'history'>('balance');
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [toast, setToast] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Persist storage safely
  useEffect(() => {
    try {
      localStorage.setItem('craveloop_wallet_bal', walletBalance.toString());
    } catch (e) {
      console.error(e);
    }
  }, [walletBalance]);

  useEffect(() => {
    try {
      localStorage.setItem('craveloop_wallet_txns', JSON.stringify(walletTransactions));
    } catch (e) {
      console.error(e);
    }
  }, [walletTransactions]);

  useEffect(() => {
    try {
      localStorage.setItem('craveloop_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('craveloop_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'info') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const setIsWalletModalOpen = (open: boolean, tab: 'balance' | 'recharge' | 'history' = 'balance') => {
    setIsWalletModalOpenState(open);
    if (open) {
      setWalletModalTab(tab);
    }
  };

  // Cart operations
  const addToCart = (item: MenuItem, customization?: string) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1, customization }];
    });
    showToast(`Added ${item.name} to cart`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const reorder = (order: Order) => {
    if (!order || !order.items || order.items.length === 0) return;
    setCart([...order.items]);
    setIsOrderHistoryOpen(false);
    setIsCartOpen(true);
    showToast(`Loaded ${order.items.length} item(s) from ${order.restaurantName} to cart!`, 'success');
  };

  const applyCoupon = (coupon: Coupon) => {
    setActiveCoupon(coupon);
    setIsCouponModalOpen(false);
    showToast(`Coupon ${coupon.code} applied!`, 'success');
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const toggleWalletApplied = () => {
    setIsWalletApplied((prev) => !prev);
  };

  // Cart Subtotal
  const cartSubtotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  // Live Bill Calculation
  const bill = calculateBill(cartSubtotal, activeCoupon, walletBalance, isWalletApplied);

  // Place Order Action
  const placeOrder = (deliveryAddress: string): Order | null => {
    if (cart.length === 0) return null;

    // Pick first restaurant info or fallback
    const restaurantId = cart[0]?.item.restaurantId;
    const rest = RESTAURANTS.find((r) => r.id === restaurantId) || RESTAURANTS[0];

    const now = new Date();
    const orderId = `CRV-${Math.floor(100000 + Math.random() * 900000)}`;
    const timeFormatted = now.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // 1. Process wallet deduction if applied
    const redeemedAmount = bill.walletAmountToDeduct;
    let newBalance = walletBalance - redeemedAmount;

    // 2. Add guaranteed ₹20 voucher per order!
    newBalance += GUARANTEED_VOUCHER_PER_ORDER;

    // Update wallet balance state
    setWalletBalance(newBalance);

    // 3. Record transactions
    const newTxns: WalletTransaction[] = [];

    if (redeemedAmount > 0) {
      newTxns.push({
        id: `txn-red-${Date.now()}`,
        timestamp: timeFormatted,
        type: 'order_redemption',
        amount: -redeemedAmount,
        title: `Redeemed on Order #${orderId}`,
        description: `Subtotal discount applied at ${rest.name}`,
        referenceId: orderId,
        status: 'completed',
      });
    }

    newTxns.push({
      id: `txn-cb-${Date.now() + 1}`,
      timestamp: timeFormatted,
      type: 'order_cashback',
      amount: GUARANTEED_VOUCHER_PER_ORDER,
      title: `₹20 Order Cashback Voucher`,
      description: `Guaranteed voucher earned for Order #${orderId}`,
      referenceId: orderId,
      status: 'completed',
    });

    setWalletTransactions((prev) => [...newTxns, ...prev]);

    // 4. Create Order
    const newOrder: Order = {
      id: orderId,
      date: timeFormatted,
      restaurantName: rest.name,
      restaurantImage: rest.image,
      items: [...cart],
      subtotal: bill.subtotal,
      deliveryFee: bill.deliveryFee,
      platformFee: 0,
      couponDiscount: bill.couponDiscount,
      walletRedeemed: bill.walletAmountToDeduct,
      totalPaid: bill.finalPayable,
      cashbackEarned: GUARANTEED_VOUCHER_PER_ORDER,
      status: 'confirmed',
      deliveryPerson: {
        name: 'Ramesh Kumar',
        phone: '+91 98450 12345',
        rating: 4.9,
      },
      deliveryAddress: deliveryAddress || 'Flat 402, Green Glen Layout, Bellandur, Bangalore',
      estimatedDeliveryTime: '25-30 mins',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);

    showToast(`Order Placed! ₹20 Voucher added to your wallet`, 'success');
    return newOrder;
  };

  // Perform Mobile Recharge using wallet balance
  const processMobileRecharge = (
    mobileNumber: string,
    operator: MobileOperator,
    plan: RechargePlan
  ): { success: boolean; message: string } => {
    const validation = validateRechargePlan(walletBalance, plan, mobileNumber);
    if (!validation.success) {
      return validation;
    }

    // Deduct recharge amount from wallet
    const newBalance = walletBalance - plan.price;
    setWalletBalance(newBalance);

    const now = new Date();
    const timeFormatted = now.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const txnId = `RCHG-${Math.floor(100000 + Math.random() * 900000)}`;

    const rechargeTxn: WalletTransaction = {
      id: txnId,
      timestamp: timeFormatted,
      type: 'mobile_recharge',
      amount: -plan.price,
      title: `${operator} Mobile Recharge`,
      description: `${plan.data} (${plan.validity}) for ${mobileNumber}`,
      referenceId: txnId,
      status: 'completed',
    };

    setWalletTransactions((prev) => [rechargeTxn, ...prev]);
    showToast(`Recharge of ₹${plan.price} successful for ${mobileNumber}!`, 'success');

    return {
      success: true,
      message: `Recharge of ₹${plan.price} successfully activated on ${operator} number ${mobileNumber}. Ref: ${txnId}`,
    };
  };

  return (
    <AppContext.Provider
      value={{
        restaurants: RESTAURANTS,
        cart,
        walletBalance,
        walletTransactions,
        activeCoupon,
        isWalletApplied,
        orders,
        activeOrder,
        selectedCuisine,
        searchQuery,
        vegOnly,
        isCartOpen,
        isWalletModalOpen,
        walletModalTab,
        isCouponModalOpen,
        isComparisonModalOpen,
        isShareModalOpen,
        isOrderHistoryOpen,
        selectedRestaurant,
        toast,
        setSelectedCuisine,
        setSearchQuery,
        setVegOnly,
        setIsCartOpen,
        setIsWalletModalOpen,
        setIsCouponModalOpen,
        setIsComparisonModalOpen,
        setIsShareModalOpen,
        setIsOrderHistoryOpen,
        setSelectedRestaurant,
        setActiveOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        reorder,
        applyCoupon,
        removeCoupon,
        toggleWalletApplied,
        bill,
        placeOrder,
        processMobileRecharge,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
