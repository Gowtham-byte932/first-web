import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBill,
  isValidIndianMobileNumber,
  validateRechargePlan,
  GUARANTEED_VOUCHER_PER_ORDER,
  FREE_DELIVERY_THRESHOLD
} from './pricing';
import { Coupon, RechargePlan } from '../types';

test('calculateBill accurately calculates subtotal with zero platform fee', () => {
  const result = calculateBill(400, null, 50, false);
  assert.equal(result.subtotal, 400);
  assert.equal(result.platformFee, 0, 'Platform fee must be 0 on CraveLoop');
  assert.equal(result.deliveryFee, 0, 'Orders >= 349 have free delivery');
  assert.equal(result.finalPayable, 400);
  assert.equal(result.guaranteedVoucherEarned, GUARANTEED_VOUCHER_PER_ORDER);
});

test('calculateBill handles delivery fee below threshold and wallet deduction', () => {
  const result = calculateBill(200, null, 60, true);
  assert.equal(result.subtotal, 200);
  assert.equal(result.deliveryFee, 35);
  // Total before wallet: 235
  // Wallet deduction: 60
  assert.equal(result.walletAmountToDeduct, 60);
  assert.equal(result.finalPayable, 175);
  assert.equal(result.guaranteedVoucherEarned, 20);
});

test('calculateBill applies percentage coupon with max cap properly', () => {
  const coupon: Coupon = {
    code: 'FEAST50',
    title: '50% OFF',
    description: 'Up to ₹100 off on orders above ₹199',
    discountType: 'percentage',
    discountValue: 50,
    minOrder: 199,
    maxDiscount: 100,
    tag: 'MOST POPULAR',
  };

  const result = calculateBill(300, coupon, 0, false);
  // 50% of 300 is 150, but max cap is 100
  assert.equal(result.couponDiscount, 100);
  // subtotal 300 - 100 + 35 delivery = 235
  assert.equal(result.finalPayable, 235);
});

test('isValidIndianMobileNumber validates 10-digit Indian numbers starting with 6-9', () => {
  assert.equal(isValidIndianMobileNumber('9876543210'), true);
  assert.equal(isValidIndianMobileNumber('8123456789'), true);
  assert.equal(isValidIndianMobileNumber('7001234567'), true);
  assert.equal(isValidIndianMobileNumber('6200000000'), true);
  assert.equal(isValidIndianMobileNumber('1234567890'), false);
  assert.equal(isValidIndianMobileNumber('98765'), false);
  assert.equal(isValidIndianMobileNumber('abcdefghij'), false);
});

test('validateRechargePlan validates sufficient wallet funds', () => {
  const plan: RechargePlan = {
    id: 'jio-19',
    operator: 'Jio',
    price: 19,
    data: '1 GB',
    validity: '1 Day',
    description: '4G Data Booster',
    planCategory: 'Booster / 4G Data',
  };

  const validResult = validateRechargePlan(25, plan, '9876543210');
  assert.equal(validResult.success, true);

  const insufficientResult = validateRechargePlan(10, plan, '9876543210');
  assert.equal(insufficientResult.success, false);
  assert.match(insufficientResult.message, /Insufficient wallet balance/);
});

test('reordering items maintains subtotal and voucher eligibility', () => {
  const reorderedItems = [
    { price: 329, quantity: 1 },
    { price: 119, quantity: 1 },
  ];
  const reorderSubtotal = reorderedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  assert.equal(reorderSubtotal, 448);

  const bill = calculateBill(reorderSubtotal, null, 20, true);
  assert.equal(bill.subtotal, 448);
  assert.equal(bill.deliveryFee, 0, 'Orders over 349 get free delivery on reorder');
  assert.equal(bill.walletAmountToDeduct, 20);
  assert.equal(bill.finalPayable, 428);
  assert.equal(bill.guaranteedVoucherEarned, 20);
});
