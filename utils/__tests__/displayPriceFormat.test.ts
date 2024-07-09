import { describe, it, expect } from 'vitest';
import displayPriceFormat from '../displayPriceFormat';

describe('displayPriceFormat', () => {
  it('should format price with commas and add currency symbol', () => {
    expect(displayPriceFormat('1000')).toBe('฿ 1,000');
    expect(displayPriceFormat('1000000')).toBe('฿ 1,000,000');
    expect(displayPriceFormat('1234567890')).toBe('฿ 1,234,567,890');
    expect(displayPriceFormat('0')).toBe('฿ 0');
  });

  it('should handle empty string', () => {
    expect(displayPriceFormat('')).toBe('฿ ');
  });

  it('should handle strings with non-numeric characters gracefully', () => {
    expect(displayPriceFormat('abc')).toBe('฿ abc');
    expect(displayPriceFormat('100abc')).toBe('฿ 100abc');
  });
});
