import { describe, it, expect } from 'vitest';
import getEquipmentOptionsByCategory from '../getEquipmentOptionsByCategory';

describe('getEquipmentOptionsByCategory', () => {
  it('should return correct options for shoes category', () => {
    expect(getEquipmentOptionsByCategory('shoes')).toEqual([
      {
        label: 'Box',
        value: 'ORIGINAL_BOX_NO_DEFECT',
      },
      {
        label: 'Box (defect)',
        value: 'ORIGINAL_BOX_WITH_DEFECT',
      },
    ]);
  });

  it('should return correct options for collectibles category', () => {
    expect(getEquipmentOptionsByCategory('collectibles')).toEqual([
      {
        label: 'Box',
        value: 'ORIGINAL_BOX_NO_DEFECT',
      },
      {
        label: 'Box (defect)',
        value: 'ORIGINAL_BOX_WITH_DEFECT',
      },
    ]);
  });

  it('should return correct options for apparel category', () => {
    expect(getEquipmentOptionsByCategory('apparel')).toEqual([
      {
        label: 'Tags',
        value: 'DETAILS_TAG',
      },
      {
        label: 'Dust bag',
        value: 'DETAILS_DUST_BAG',
      },
    ]);
  });

  it('should return correct options for bags category', () => {
    expect(getEquipmentOptionsByCategory('bags')).toEqual([
      {
        label: 'Dust bag',
        value: 'DETAILS_DUST_BAG',
      },
      {
        label: 'Card/Certificate',
        value: 'DETAILS_CARD_CERT',
      },
      {
        label: 'Box',
        value: 'DETAILS_BOX',
      },
      {
        label: 'Receipt',
        value: 'DETAILS_RECEIPT',
      },
      {
        label: 'Paper bag',
        value: 'DETAILS_PAPER_BAG',
      },
    ]);
  });

  it('should return correct options for accessories category', () => {
    expect(getEquipmentOptionsByCategory('accessories')).toEqual([
      {
        label: 'Dust bag',
        value: 'DETAILS_DUST_BAG',
      },
      {
        label: 'Card/Certificate',
        value: 'DETAILS_CARD_CERT',
      },
      {
        label: 'Box',
        value: 'DETAILS_BOX',
      },
      {
        label: 'Receipt',
        value: 'DETAILS_RECEIPT',
      },
      {
        label: 'Paper bag',
        value: 'DETAILS_PAPER_BAG',
      },
      {
        label: 'Tags',
        value: 'DETAILS_TAG',
      },
    ]);
  });

  it('should return an empty array for unknown category', () => {
    expect(getEquipmentOptionsByCategory('unknown_category')).toEqual([]);
  });
});
