import AccessoriesEquipment from '../mocks/accessories-equipment.json';
import ApparelEquipment from '../mocks/apparel-equipment.json';
import BagsEquipment from '../mocks/bags-equipment.json';
import ShoesCollectiblesEquipment from '../mocks/shoes-collectibles-equipment.json';

const getEquipmentOptionsByCategory = (category: string) => {
  switch (category) {
    case 'shoes':
    case 'collectibles':
      return ShoesCollectiblesEquipment.map(({ equipment, equipmentText }) => ({
        label: equipmentText,
        value: equipment,
      }));
    case 'apparel':
      return ApparelEquipment.map(({ equipment, equipmentText }) => ({
        label: equipmentText,
        value: equipment,
      }));
    case 'bags':
      return BagsEquipment.map(({ equipment, equipmentText }) => ({
        label: equipmentText,
        value: equipment,
      }));
    case 'accessories':
      return AccessoriesEquipment.map(({ equipment, equipmentText }) => ({
        label: equipmentText,
        value: equipment,
      }));
    default:
      return [];
  }
};

export default getEquipmentOptionsByCategory;
