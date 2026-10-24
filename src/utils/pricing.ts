import { Coupon, BillCalculationResult, RechargePlan } from '../types';

export const GUARANTEED_VOUCHER_PER_ORDER = 20;
export const FREE_DELIVERY_THRESHOLD = 349;
export const STANDARD_DELIVERY_FEE = 35;
export const COMPETITOR_PLATFORM_FEE = 8; // Swiggy/Zomato charge ₹6 - ₹10 platform fee
export const COMPETITOR_DELIVERY_FEE = 45;

/**
 * Calculates accurate bill breakdown including coupon discount, free delivery logic,
 * zero platform fee, and optional wallet redemption.
 */
export function calculateBill(
  subtotal: number,
  coupon: Coupon | null,
  walletBalance: number,
  applyWallet: boolean,
  deliveryFeeOverride?: number
): BillCalculationResult {
  // 1. Calculate Coupon Discount
  let couponDiscount = 0;
  if (coupon && subtotal >= coupon.minOrder) {
    if (coupon.discountType === 'percentage') {
      const calculated = Math.round((subtotal * coupon.discountValue) / 100);
      couponDiscount = coupon.maxDiscount ? Math.min(calculated, coupon.maxDiscount) : calculated;
    } else {
      couponDiscount = Math.min(coupon.discountValue, subtotal);
    }
  }

  // 2. Delivery fee
  let deliveryFee = 0;
  if (subtotal > 0) {
    if (subtotal >= FREE_DELIVERY_THRESHOLD) {
      deliveryFee = 0;
    } else {
      deliveryFee = deliveryFeeOverride !== undefined ? deliveryFeeOverride : STANDARD_DELIVERY_FEE;
    }
  }

  const platformFee = 0; // CraveLoop zero hidden platform fee promise!
  const intermediateTotal = Math.max(0, subtotal - couponDiscount + deliveryFee + platformFee);

  // 3. Wallet deduction: Can use up to full payable amount if user toggles it
  let walletAmountToDeduct = 0;
  if (applyWallet && intermediateTotal > 0 && walletBalance > 0) {
    walletAmountToDeduct = Math.min(walletBalance, intermediateTotal);
  }

  const finalPayable = Math.max(0, intermediateTotal - walletAmountToDeduct);

  // 4. Savings compared to typical competitor order
  // Competitors charge standard delivery fee (e.g. ₹45) + platform fee (₹8) + no ₹20 cashback voucher
  const competitorCost = subtotal > 0 ? subtotal + COMPETITOR_DELIVERY_FEE + COMPETITOR_PLATFORM_FEE : 0;
  const ourCostBeforeWallet = subtotal - couponDiscount + deliveryFee;
  const savingsVsSwiggyZomato = subtotal > 0 ? Math.max(0, competitorCost - ourCostBeforeWallet + GUARANTEED_VOUCHER_PER_ORDER) : 0;

  return {
    subtotal,
    couponDiscount,
    deliveryFee,
    platformFee,
    availableWalletBalance: walletBalance,
    walletAmountToDeduct,
    finalPayable,
    guaranteedVoucherEarned: subtotal > 0 ? GUARANTEED_VOUCHER_PER_ORDER : 0,
    savingsVsSwiggyZomato,
  };
}

/**
 * Validates mobile number format for Indian telecom networks.
 */
export function isValidIndianMobileNumber(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.trim().replace(/^(\+91|91|0)/, '').replace(/[\s-]/g, '');
  return /^[6-9]\d{9}$/.test(cleaned);
}

/**
 * Validates whether user has sufficient wallet balance for a mobile recharge plan.
 */
export function validateRechargePlan(
  walletBalance: number,
  plan: RechargePlan,
  mobileNumber: string
): { success: boolean; message: string } {
  if (!isValidIndianMobileNumber(mobileNumber)) {
    return {
      success: false,
      message: 'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.',
    };
  }

  if (walletBalance < plan.price) {
    const deficit = plan.price - walletBalance;
    return {
      success: false,
      message: `Insufficient wallet balance. You need ₹${deficit} more. Order food to earn ₹20 voucher per order!`,
    };
  }

  return {
    success: true,
    message: 'Eligible for instant wallet recharge.',
  };
}
