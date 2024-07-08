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

interface IPlaceAskItem {
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

type IItem = IPlaceAskItem | IPreOrderItem;

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
        thead: 'bg-white',
        th: 'text-black font-bold',
        tbody: 'bg-white',
      }}
    >
      <TableHeader>
        <TableColumn>PRODUCT NAME</TableColumn>
        <TableColumn>PRODUCT DETAIL</TableColumn>
        <TableColumn>PRICE</TableColumn>
        <TableColumn>QUANTITY</TableColumn>
        <TableColumn>STATUS</TableColumn>
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
              {item.productDetail.size}| {item.productDetail.condition}
            </TableCell>
            <TableCell>{item.productDetail.price}</TableCell>
            <TableCell>
              {item.type === 'pre_order' ? item.productDetail.quantity : 1}
            </TableCell>
            <TableCell>{item.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ItemTable;
