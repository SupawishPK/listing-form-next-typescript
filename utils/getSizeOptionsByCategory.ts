import ApparelSize from '../mocks/apparel-size.json';
import ShoesSize from '../mocks/shoes-size.json';
import BagsAccessoriesCollectiblesSize from '../mocks/bags-accessories-collectibles-size.json';

const getSizeOptionsByCategory = (category: string) => {
  switch (category) {
    case 'shoes':
      return ShoesSize.map(({ size, sizeText }) => ({
        label: sizeText,
        value: size,
      }));
    case 'apparel':
      return ApparelSize.map(({ size, sizeText }) => ({
        label: sizeText,
        value: size,
      }));
    case 'collectibles':
    case 'bags':
    case 'accessories':
      return BagsAccessoriesCollectiblesSize.map(({ size, sizeText }) => ({
        label: sizeText,
        value: size,
      }));
    default:
      return [];
  }
};

export default getSizeOptionsByCategory;
