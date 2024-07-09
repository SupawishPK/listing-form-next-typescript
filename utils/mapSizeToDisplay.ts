import ShoesSize from '../mocks/shoes-size.json';
import ApparelSize from '../mocks/apparel-size.json';
import BagAccessoriesCollectiblesSize from '../mocks/bags-accessories-collectibles-size.json';
import { ICategory } from '../components/ItemTable';

const mapSizeToDisplay = (brand: string, category: ICategory) => {
  let displayBrand = '';
  switch (category) {
    case 'shoes':
      displayBrand =
        ShoesSize.find((item) => item.size === brand)?.sizeText ?? brand;
      break;
    case 'apparel':
      displayBrand =
        ApparelSize.find((item) => item.size === brand)?.sizeText ?? brand;
      break;
    case 'accessories':
    case 'collectibles':
    case 'bags':
      displayBrand =
        BagAccessoriesCollectiblesSize.find((item) => item.size === brand)
          ?.sizeText ?? brand;
      break;
    default:
      displayBrand = brand;
  }
  return displayBrand;
};

export default mapSizeToDisplay;
