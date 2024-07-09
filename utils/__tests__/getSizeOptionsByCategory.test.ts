import { describe, it, expect } from 'vitest';
import getSizeOptionsByCategory from '../getSizeOptionsByCategory';

describe('getSizeOptionsByCategory', () => {
  it('should return correct size options for shoes category', () => {
    expect(getSizeOptionsByCategory('shoes')).toEqual([
      {
        label: '4.5 US',
        value: '4.5',
      },
      {
        label: '5 US',
        value: '5',
      },
      {
        label: '5.5 US',
        value: '5.5',
      },
      {
        label: '6 US',
        value: '6',
      },
      {
        label: '6.5 US',
        value: '6.5',
      },
      {
        label: '7 US',
        value: '7',
      },
    ]);
  });

  it('should return correct size options for apparel category', () => {
    expect(getSizeOptionsByCategory('apparel')).toEqual([
      {
        label: 'XXXS',
        value: 'xxxs',
      },
      {
        label: 'XXS',
        value: 'xxs',
      },
      {
        label: 'XS',
        value: 'xs',
      },
      {
        label: 'S',
        value: 's',
      },
      {
        label: 'M',
        value: 'm',
      },
      {
        label: 'L',
        value: 'l',
      },
    ]);
  });

  it('should return correct size options for collectibles category', () => {
    expect(getSizeOptionsByCategory('collectibles')).toEqual([
      {
        label: 'One size',
        value: 'ONE_SIZE',
      },
    ]);
  });

  it('should return correct size options for bags category', () => {
    expect(getSizeOptionsByCategory('bags')).toEqual([
      {
        label: 'One size',
        value: 'ONE_SIZE',
      },
    ]);
  });

  it('should return correct size options for accessories category', () => {
    expect(getSizeOptionsByCategory('accessories')).toEqual([
      {
        label: 'One size',
        value: 'ONE_SIZE',
      },
    ]);
  });

  it('should return an empty array for unknown category', () => {
    expect(getSizeOptionsByCategory('unknown_category')).toEqual([]);
  });
});
