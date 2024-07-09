import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import DocumentIcon from '../assets/icons/document.svg';
import Nike from '../assets/nike.jpeg';
import Image from 'next/image';
import mapSizeToDisplay from '../utils/mapSizeToDisplay';
import mapConditionToDisplay from '../utils/mapConditionToDisplay';
import displayPriceFormat from '../utils/displayPriceFormat';
import { Chip } from '@nextui-org/chip';
import displayTypeFormat from '../utils/displayTypeFormat';

export type ICategory =
  | 'shoes'
  | 'apparel'
  | 'accessories'
  | 'collectibles'
  | 'bags';

interface IPlaceAskItem {
  category: ICategory;
  type: 'place_ask';
  name: string;
  productDetail: {
    size: string;
    condition: string;
    equipment: string;
    price: string;
  };
}

interface IPreOrderItem {
  category: ICategory;
  type: 'pre_order';
  name: string;
  productDetail: {
    size: string;
    condition: string;
    price: string;
    quantity: string;
  };
  shippingDetail: {
    startDate: string;
    endDate: string;
    shipDuration: string;
  };
}

export type IItem = IPlaceAskItem | IPreOrderItem;

export type IItems = IItem[];

interface IProps {
  items: IItems;
}

const ItemTable = ({ items }: IProps) => {
  return (
    <Table
      color='default'
      selectionMode='multiple'
      removeWrapper
      classNames={{
        tbody: 'bg-white',
        td: 'py-6 odd:bg-gray-100',
        th: 'text-black font-bold',
        tr: 'even:bg-gray-light',
      }}
    >
      <TableHeader>
        <TableColumn>PRODUCT NAME</TableColumn>
        <TableColumn>PRODUCT DETAIL</TableColumn>
        <TableColumn>PRICE</TableColumn>
        <TableColumn>
          <div className='flex justify-center'>QUANTITY</div>
        </TableColumn>
        <TableColumn>
          <div className='flex justify-center'>TYPE</div>
        </TableColumn>
      </TableHeader>
      <TableBody
        emptyContent={
          <div className='flex flex-col items-center justify-center gap-6 min-h-96'>
            <Image src={DocumentIcon} alt='Document Icon' />
            <p className='text-base text-gray'>
              You currently have no Listing & pre-order listing
            </p>
          </div>
        }
      >
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell className='flex gap-4'>
              <Image src={Nike} alt='Nike' width={40} height={40} />
              <div>
                <p className='w-40 overflow-hidden text-sm overflow-ellipsis whitespace-nowrap'>
                  {item.name}
                </p>
                <p className='text-sm text-gray'>
                  {item.type === 'place_ask'
                    ? 'ASK | {SKU}'
                    : 'Pre-order | {SKU}'}
                </p>
              </div>
            </TableCell>
            <TableCell>
              {mapSizeToDisplay(item.productDetail.size, item.category)} |{' '}
              {mapConditionToDisplay(item.productDetail.condition)}
            </TableCell>
            <TableCell>
              {displayPriceFormat(item.productDetail.price)}
            </TableCell>
            <TableCell>
              <div className='flex justify-center'>
                {item.type === 'pre_order' ? item.productDetail.quantity : 1}
              </div>
            </TableCell>
            <TableCell>
              <div className='flex justify-center'>
                <Chip
                  classNames={
                    item.type === 'place_ask'
                      ? {
                          base: 'bg-blue-light',
                          content: 'text-blue text-xs font-bold',
                        }
                      : {
                          base: 'bg-green-light',
                          content: 'text-green-dark text-xs font-bold',
                        }
                  }
                >
                  {displayTypeFormat(item.type)}
                </Chip>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ItemTable;
