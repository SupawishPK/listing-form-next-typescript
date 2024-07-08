import Head from 'next/head';
import Tabs from '../components/Tabs';
import { useEffect, useState } from 'react';
import Chip from '../components/Chip';
import { DevTool } from '@hookform/devtools';
import InformationCircle from '../assets/icons/information-circle.svg';
import UploadIcon from '../assets/icons/upload.svg';
import PencilIcon from '../assets/icons/pencil.svg';
import RightFilledIcon from '../assets/icons/rightFilled.svg';
import Conditions from '../mocks/condition.json';
import Quantity from '../mocks/Quantity.json';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import Category from '../mocks/category.json';
import getSizeOptionsByCategory from '../utils/getSizeOptionsByCategory';

import getEquipmentOptionsByCategory from '../utils/getEquipmentOptionsByCategory';
import ItemTable, { IItems } from '../components/ItemTable';

const productDetailSchema = z.object({
  size: z.string().min(1, 'Size is required'),
  condition: z.string().min(1, 'Condition is required'),
  equipment: z.string().min(1, 'Equipment is required'),
  price: z.string().refine((val) => parseInt(val, 10) > 0, {
    message: 'Value must be greater than 0',
  }),
  quantity: z.string().min(1, 'Quantity is required'),
});

const shippingDetailSchema = z.object({
  endDate: z.string().min(1, 'End date is required'),
  shipDuration: z.string().min(1, 'Shipping duration is required'),
  startDate: z.string().min(1, 'Start date is required'),
});

const placeAskFormSchema = z.object({
  type: z.literal('place_ask'),
  productDetail: productDetailSchema.pick({
    condition: true,
    equipment: true,
    price: true,
    size: true,
  }),
});

const preOrderFormSchema = z.object({
  type: z.literal('pre_order'),
  shippingDetail: shippingDetailSchema,
  productDetail: productDetailSchema.pick({
    condition: true,
    price: true,
    quantity: true,
    size: true,
  }),
});

const listingFormSchema = z
  .object({
    category: z.string().min(1, 'Category is required'),
  })
  .and(z.union([placeAskFormSchema, preOrderFormSchema]));

type IPlaceAskForm = z.infer<typeof placeAskFormSchema>;
type IPreOrderForm = z.infer<typeof preOrderFormSchema>;

type IListingFormType = z.infer<typeof listingFormSchema>;

const hasConditionError = (
  errors: FieldErrors<IListingFormType>
): errors is FieldErrors<IPlaceAskForm> => {
  return 'productDetail' in errors && 'condition' in errors.productDetail!;
};

const hasEquipmentError = (
  errors: FieldErrors<IListingFormType>
): errors is FieldErrors<IPlaceAskForm> => {
  return 'productDetail' in errors && 'equipment' in errors.productDetail!;
};

const hasQuantityError = (
  errors: FieldErrors<IListingFormType>
): errors is FieldErrors<IPreOrderForm> => {
  return 'productDetail' in errors && 'quantity' in errors.productDetail!;
};

const hasShippingDetailError = (
  errors: FieldErrors<IListingFormType>
): errors is FieldErrors<IPreOrderForm> => {
  return 'shippingDetail' in errors;
};

const PriceSummary = () => (
  <div className='flex flex-col gap-6 px-6 py-8 bg-white rounded-2xl'>
    <div className='grid grid-cols-2 gap-4'>
      <div className='text-sm text-gray'>Subtotal</div>
      <div className='text-right'>฿ X,XXX</div>

      <div className='text-sm text-gray'>Shipping fee</div>
      <div className='text-right'>฿ ---</div>

      <div className='text-sm text-gray'>Transaction fee</div>
      <div className='text-right'>฿ XXX</div>

      <div className='text-sm text-gray'>Payment processing fee</div>
      <div className='text-right'>฿ XXX</div>

      <div className='text-lg font-semibold text-green'>Total payout</div>
      <div className='font-semibold text-right text-green'>฿ X,XXX </div>
    </div>

    <div className='flex gap-2 px-4 py-2 rounded-lg bg-gray-light-2'>
      <Image src={InformationCircle} alt='information-circle' />
      <p className='text-xs text-gray'>
        Shipping fee will be based on the shipping method selected when
        confirming order.
      </p>
    </div>
  </div>
);

const ShippingAddress = () => (
  <div className='flex px-6 py-8 bg-white rounded-2xl'>
    <h2 className='flex-grow text-lg font-bold'>Shipping address</h2>
    <div className='max-w-56'>
      <p className='text-base font-medium'>SASOM User</p>
      <p className='mt-4 text-xs font-medium text-gray'>
        (+66123456789) 101 ถนน สุขุมวิท 101/1 Khwaeng Bang Chak, Phra
        Khanong,Bangkok 10260
      </p>
    </div>
    <div className='flex items-start justify-end w-10'>
      <Image src={PencilIcon} alt='pencil-icon' width={20} height={20} />
    </div>
  </div>
);

const ImageUpload = ({ type }: { type: 'place_ask' | 'pre_order' }) => (
  <div className='px-6 py-8 bg-white rounded-2xl'>
    <h2 className='text-lg font-bold'>Images</h2>
    {type === 'place_ask' ? (
      <p className='mt-1 text-gray'>A maximum of 10 images can be uploaded.</p>
    ) : (
      <p className='mt-1 text-gray'>Images will appear in website.</p>
    )}
    <div className='flex items-center justify-center h-40 gap-4 mt-4 border-2 rounded-2xl border-gray-light'>
      <div className='flex justify-center w-16 h-16 rounded-full bg-gray-light'>
        <Image src={UploadIcon} alt='upload-icon' width={20} height={20} />
      </div>
      <div className='flex flex-col'>
        <p className='text-lg font-bold'>Upload product images</p>
        <p className='text-sm text-gray'>
          (Drag and drop to upload or{' '}
          <span className='underline'>browse files</span>)
        </p>
      </div>
    </div>
  </div>
);

const DefectCheckbox = () => (
  <div className='flex items-center gap-2'>
    <input type='checkbox' className='w-4 h-4' />
    <div>Product has defect?</div>
    <div>
      <Image
        src={InformationCircle}
        width={20}
        height={20}
        alt='information-circle'
      />
    </div>
  </div>
);

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    clearErrors,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<IListingFormType>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      category: 'shoes',
      type: 'place_ask',
      productDetail: {
        size: '',
        condition: '',
        equipment: '',
        price: '',
      },
    },
  });

  const [selectedTab, setSelectedTab] = useState(
    watch('type') === 'place_ask' ? 0 : 1
  );

  const [items, setItems] = useState<IItems>([]);

  const isItemsEmpty = items.length === 0;

  const sizeOptions = getSizeOptionsByCategory(watch('category'));
  const equipmentOptions = getEquipmentOptionsByCategory(watch('category'));

  if (!isClient) return null;

  const onSubmit: SubmitHandler<IListingFormType> = (data) => {
    setItems((prevItems) => [
      ...prevItems,
      {
        ...data,
        name: 'Nike Dunk Low Retro White Black',
      },
    ]);
    reset();
  };

  const onChangeTap = (index: number) => {
    setSelectedTab(index);
    if (index === 0) {
      reset({
        category: getValues('category'),
        type: 'place_ask',
        productDetail: {
          size: '',
          condition: '',
          equipment: '',
          price: '',
        },
      });
      return;
    }

    reset({
      category: getValues('category'),
      type: 'pre_order',
      shippingDetail: {
        startDate: '',
        endDate: '',
        shipDuration: '',
      },
      productDetail: {
        size: '',
        condition: 'brand_new',
        quantity: '1',
        price: '',
      },
    });
  };

  return (
    <div>
      <Head>
        <title>Listing form</title>
        <meta name='description' content='Listing form' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='py-8 pt-6 bg-gray-light-2'>
        <div className='grid grid-cols-2'>
          <section className='pl-20 pr-3'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className='text-3xl font-bold'>Add listing</h1>
              <div className='flex flex-col gap-6 mt-12'>
                <div className='flex flex-col gap-8 px-6 py-8 bg-white rounded-2xl'>
                  <h2 className='text-lg font-bold'>Search a product to add</h2>

                  <Select
                    {...register('category')}
                    variant='bordered'
                    label='Category'
                    placeholder='Category'
                    isInvalid={errors.category?.message !== undefined}
                    errorMessage={errors.category?.message}
                    fullWidth
                    onChange={(e) => {
                      const category = e.target.value;
                      reset();
                      setValue('category', category);
                      clearErrors();
                    }}
                  >
                    {Category.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className='flex flex-col gap-6 px-6 py-8 bg-white rounded-2xl'>
                  <div className='flex items-center gap-4'>
                    <Chip text='1' />
                    <div className='w-64 text-sm'>
                      <Tabs
                        items={['Place ask', 'Pre-order']}
                        selectedTab={selectedTab}
                        onChange={onChangeTap}
                      />
                    </div>
                  </div>

                  {watch('type') === 'place_ask' ? (
                    <div className='flex flex-col gap-4'>
                      <div className='flex items-center gap-4'>
                        <Chip text='2' />
                        <div className='text-2xl font-bold'>Product detail</div>
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-1'>
                          <Select
                            {...register('productDetail.size')}
                            variant='bordered'
                            label='Select size'
                            placeholder='Size'
                            isInvalid={
                              errors.productDetail?.size?.message !== undefined
                            }
                            errorMessage={errors.productDetail?.size?.message}
                          >
                            {sizeOptions.map(({ label, value }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                        <div className='col-span-1'>
                          <Select
                            {...register('productDetail.condition')}
                            variant='bordered'
                            label='Condition'
                            placeholder='Condition'
                            isInvalid={
                              hasConditionError(errors) &&
                              errors.productDetail?.condition?.message !==
                                undefined
                            }
                            errorMessage={
                              hasConditionError(errors)
                                ? errors.productDetail?.condition?.message
                                : undefined
                            }
                          >
                            {Conditions.map(({ label, value }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>

                        <div className='col-span-2'>
                          <Select
                            {...register('productDetail.equipment')}
                            variant='bordered'
                            label='Equipment'
                            placeholder='Equipment'
                            isInvalid={
                              hasEquipmentError(errors) &&
                              errors.productDetail?.equipment?.message !==
                                undefined
                            }
                            errorMessage={
                              hasEquipmentError(errors)
                                ? errors.productDetail?.equipment?.message
                                : undefined
                            }
                          >
                            {equipmentOptions.map(({ label, value }) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      </div>

                      <div>Price</div>
                      <div className='grid content-between grid-cols-3 gap-4'>
                        <div className='flex flex-col items-center gap-2'>
                          <div className='text-xs text-gray'>Lowest ask</div>
                          <div className='text-sm text-black'>฿ X,XXX</div>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                          <div className='text-xs text-gray'>Highest bid</div>
                          <div className='text-sm text-black'>฿ X,XXX</div>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                          <div className='text-xs text-gray'>Last sale</div>
                          <div className='text-sm text-black'>฿ X,XXX</div>
                        </div>
                      </div>

                      <Input
                        type='number'
                        {...register('productDetail.price')}
                        placeholder='฿ 0'
                        label='Input price'
                        variant='bordered'
                        isInvalid={
                          errors.productDetail?.price?.message !== undefined
                        }
                        errorMessage={errors.productDetail?.price?.message}
                      />
                    </div>
                  ) : (
                    <div>
                      <p className='text-sm text-gray'>
                        The product is pre-order and may take longer time to
                        ship
                      </p>
                      <div className='flex flex-col gap-4 mt-4'>
                        <h2 className='text-lg font-bold'>
                          Pre-order duration
                        </h2>
                        <div className='flex items-center gap-4'>
                          <Input
                            type='date'
                            {...register('shippingDetail.startDate')}
                            placeholder='Start date'
                            variant='bordered'
                            label='Pre-order duration'
                            isInvalid={
                              hasShippingDetailError(errors) &&
                              errors.shippingDetail?.startDate?.message !==
                                undefined
                            }
                            errorMessage={
                              hasShippingDetailError(errors)
                                ? errors.shippingDetail?.startDate?.message
                                : undefined
                            }
                          />
                          -
                          <Input
                            type='date'
                            {...register('shippingDetail.endDate')}
                            label='Pre-order duration'
                            placeholder='End date'
                            variant='bordered'
                            isInvalid={
                              hasShippingDetailError(errors) &&
                              errors.shippingDetail?.endDate?.message !==
                                undefined
                            }
                            errorMessage={
                              hasShippingDetailError(errors)
                                ? errors.shippingDetail?.endDate?.message
                                : undefined
                            }
                          />
                        </div>
                      </div>

                      <h2 className='my-4 text-lg font-bold'>
                        Pre-order duration
                      </h2>

                      <Input
                        type='number'
                        {...register('shippingDetail.shipDuration')}
                        placeholder='Ship within (Day)'
                        label='Ship within (Day)'
                        variant='bordered'
                        isInvalid={
                          hasShippingDetailError(errors) &&
                          errors.shippingDetail?.shipDuration?.message !==
                            undefined
                        }
                        errorMessage={
                          hasShippingDetailError(errors)
                            ? errors.shippingDetail?.shipDuration?.message
                            : undefined
                        }
                      />
                    </div>
                  )}
                </div>

                {watch('type') === 'pre_order' && (
                  <div className='flex flex-col gap-6 px-6 py-8 bg-white rounded-2xl'>
                    <div className='flex flex-col gap-4'>
                      <div className='flex items-center gap-4'>
                        <Chip text='2' />
                        <div className='text-2xl font-bold'>Product detail</div>
                      </div>

                      <p className='text-sm text-gray'>
                        Pre-order items must be Brand new & completed with
                        equipment
                      </p>

                      <div className='grid grid-cols-2 gap-4'>
                        <Select
                          {...register('productDetail.size')}
                          variant='bordered'
                          label='Select size'
                          placeholder='Size'
                          isInvalid={
                            errors.productDetail?.size?.message !== undefined
                          }
                          errorMessage={errors.productDetail?.size?.message}
                        >
                          {sizeOptions.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </Select>

                        <Select
                          {...register('productDetail.quantity')}
                          variant='bordered'
                          label='Quantity'
                          placeholder='Quantity'
                          isInvalid={
                            hasQuantityError(errors) &&
                            errors.productDetail?.quantity?.message !==
                              undefined
                          }
                          errorMessage={
                            hasQuantityError(errors)
                              ? errors.productDetail?.quantity?.message
                              : undefined
                          }
                        >
                          {Quantity.map(({ label, value }) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      <div>Price</div>
                      <div className='grid content-between grid-cols-3 gap-4'>
                        <div className='flex flex-col items-center gap-2'>
                          <div className='text-xs text-gray'>Lowest ask</div>
                          <div className='text-sm text-black'>฿ X,XXX</div>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                          <div className='text-xs text-gray'>Highest bid</div>
                          <div className='text-sm text-black'>฿ X,XXX</div>
                        </div>
                        <div className='flex flex-col items-center gap-2'>
                          <div className='text-xs text-gray'>Last sale</div>
                          <div className='text-sm text-black'>฿ X,XXX</div>
                        </div>
                      </div>

                      <Input
                        type='number'
                        {...register('productDetail.price')}
                        label='Input price'
                        variant='bordered'
                        placeholder='฿ 0'
                        isInvalid={
                          errors.productDetail?.price?.message !== undefined
                        }
                        errorMessage={errors.productDetail?.price?.message}
                      />
                    </div>
                  </div>
                )}

                {watch('type') === 'place_ask' && <DefectCheckbox />}

                <ImageUpload type={watch('type')} />

                <ShippingAddress />

                <PriceSummary />

                <Button
                  className='text-base bg-gray-dark-2 w-52 text-gray'
                  type='submit'
                  color='primary'
                  endContent={
                    <Image src={RightFilledIcon} alt='right-filled' />
                  }
                >
                  Add listing
                </Button>
              </div>
            </form>
            <DevTool control={control} />
          </section>

          <section className='flex flex-col gap-6 pl-3 pr-6'>
            <div className='flex'>
              <div className='grow'>
                <p className='text-sm text-gray'>Total</p>
                <div className='text-2xl font-bold'>{items.length} Items</div>
              </div>
              <div className='flex gap-4'>
                <Button color='danger' variant='bordered'>
                  Cancel
                </Button>
                <Button
                  className={`${isItemsEmpty ? 'bg-gray-light text-black' : 'bg-black text-white'}`}
                  disabled={isItemsEmpty}
                  onClick={() => console.log('----ITEMS----:', items)}
                >
                  Submit
                </Button>
              </div>
            </div>

            <ItemTable items={items} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
