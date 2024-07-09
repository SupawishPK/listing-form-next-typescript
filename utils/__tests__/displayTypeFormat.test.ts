import { describe, it, expect } from 'vitest';
import displayTypeFormat from '../displayTypeFormat';

describe('displayTypeFormat', () => {
  it('should return "ASK" for "place_ask"', () => {
    expect(displayTypeFormat('place_ask')).toBe('ASK');
  });

  it('should return "PRE-ORDER" for "pre_order"', () => {
    expect(displayTypeFormat('pre_order')).toBe('PRE-ORDER');
  });

  it('should return the original type for unknown types', () => {
    expect(displayTypeFormat('unknown_type')).toBe('unknown_type');
    expect(displayTypeFormat('')).toBe('');
    expect(displayTypeFormat('some_other_type')).toBe('some_other_type');
  });
});
