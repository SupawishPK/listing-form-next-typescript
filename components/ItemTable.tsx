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
import ShoesSize from '../mocks/shoes-size.json';
import ApparelSize from '../mocks/apparel-size.json';
import BagAccessoriesCollectiblesSize from '../mocks/bags-accessories-collectibles-size.json';
import Condition from '../mocks/condition.json';
import displayPriceFormat from '../utils/displayPriceFormat';
import { Chip } from '@nextui-org/chip';
import displayTypeFormat from '../utils/displayTypeFormat';
import { useCallback, useMemo, useState } from 'react';
import leftFilledIcon from '../assets/icons/leftFilled.svg';
import rightFilledIcon from '../assets/icons/rightFilled.svg';
import { Button } from '@nextui-org/button';
import { Select, SelectItem } from '@nextui-org/select';

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

const mapConditionToDisplay = (condition: string) => {
  return Condition.find((item) => item.value === condition)?.label ?? condition;
};

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

const ItemTable = ({ items }: IProps) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const pages = Math.ceil(items.length / rowsPerPage);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const bottomContent = useMemo(() => {
    return (
      <div className='flex items-center justify-end py-5 -mt-4 bg-white gap-7 rounded-b-xl'>
        <div className='flex items-center min-w-56'>
          <p className='w-full text-xs text-gray'>Rows per page:</p>
          <Select
            items={[
              { value: 5, label: '5' },
              { value: 10, label: '10' },
              { value: 15, label: '15' },
              { value: 20, label: '20' },
            ]}
            size='sm'
            className='bg-white'
            defaultSelectedKeys={rowsPerPage.toString()}
            onChange={(selected) => {
              setRowsPerPage(Number(selected.target.value));
              setPage(1);
            }}
          >
            {(item) => <SelectItem key={item.value}>{item.label}</SelectItem>}
          </Select>
        </div>
        <p className='text-xs font-medium'>
          {`${(page - 1) * rowsPerPage + 1}-${
            page * rowsPerPage > items.length
              ? items.length
              : page * rowsPerPage
          } of ${items.length}`}
        </p>
        <div>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='light'
            onPress={onPreviousPage}
            className='w-10'
          >
            <Image src={leftFilledIcon} alt='Left Filled Icon' />
          </Button>
          <Button
            isDisabled={pages === 1}
            size='sm'
            variant='light'
            onPress={onNextPage}
            className='w-10'
          >
            <Image src={rightFilledIcon} alt='Left Filled Icon' />
          </Button>
        </div>
      </div>
    );
  }, [items.length, onNextPage, onPreviousPage, page, pages, rowsPerPage]);

  const itemsToDisplay = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return items.slice(start, end);
  }, [items, page, rowsPerPage]);

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
      bottomContent={bottomContent}
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
        {itemsToDisplay.map((item, index) => (
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
