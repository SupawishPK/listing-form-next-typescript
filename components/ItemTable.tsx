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
import { useCallback, useMemo, useState } from 'react';
import leftFilledIcon from '../assets/icons/leftFilled.svg';
import rightFilledIcon from '../assets/icons/rightFilled.svg';
import { Button } from '@nextui-org/button';

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
  const [page, setPage] = useState(1);
  const rowsPerPage = 3;
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
      <div className='flex items-center justify-end pb-5 -mt-4 bg-white gap-7 rounded-b-xl'>
        <p className='text-xs text-gray'>
          Rows per page: <b className='font-medium text-black'>{rowsPerPage}</b>
        </p>
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
