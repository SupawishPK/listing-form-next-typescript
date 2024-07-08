import Head from 'next/head';
import Tabs from '../components/Tabs';
import { useEffect, useState } from 'react';
import Chip from '../components/Chip';
import Select from '../components/Select';
import { DevTool } from '@hookform/devtools';
import InformationCircle from '../assets/icons/information-circle.svg';
import Upload from '../assets/icons/upload.svg';
import Pencil from '../assets/icons/pencil.svg';
import Conditions from '../mocks/condition.json';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import Category from '../mocks/category.json';
import getSizeOptionsByCategory from '../utils/getSizeOptionsByCategory';
import Input from '../components/Input';
import getEquipmentOptionsByCategory from '../utils/getEquipmentOptionsByCategory';

// Define the Zod schemas for the productDetail and shippingDetail structures
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
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  shipDuration: z.string().min(1, 'Shipping duration is required'),
});

// Define the Zod schemas for the IPlaceAskForm and IPreOrderForm
const placeAskFormSchema = z.object({
  type: z.literal('place_ask'),
  productDetail: productDetailSchema.pick({
    size: true,
    condition: true,
    equipment: true,
    price: true,
  }),
});

const preOrderFormSchema = z.object({
  type: z.literal('pre_order'),
  shippingDetail: shippingDetailSchema,
  productDetail: productDetailSchema.pick({
    size: true,
    condition: true,
    quantity: true,
    price: true,
  }),
});

// Define the IListingForm schema
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

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    getValues,
    reset,
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

  const sizeOptions = getSizeOptionsByCategory(watch('category'));
  const equipmentOptions = getEquipmentOptionsByCategory(watch('category'));

  if (!isClient) return null;

  const onSubmit: SubmitHandler<IListingFormType> = (data) => {
    alert(JSON.stringify(data));
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
      <main className='pt-6 bg-gray-light-2'>
        <div className='grid grid-cols-2'>
          <section className='pl-20 pr-3'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>Add listing</h1>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-8 px-6 py-8 bg-white rounded-2xl'>
                  <h2 className='text-lg font-bold'>Search a product to add</h2>

                  <Select
                    {...register('category')}
                    aria-label='Category'
                    options={Category}
                    placeholder='Category'
                  />
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
                        <Select
                          {...register('productDetail.size')}
                          aria-label='Select size'
                          options={sizeOptions}
                          placeholder='Size'
                          aria-errormessage={
                            errors.productDetail?.size?.message
                          }
                        />

                        <Select
                          {...register('productDetail.condition')}
                          aria-label='Condition'
                          options={Conditions}
                          placeholder='Condition'
                          aria-errormessage={
                            hasConditionError(errors)
                              ? errors.productDetail?.condition?.message
                              : undefined
                          }
                        />
                      </div>

                      <Select
                        {...register('productDetail.equipment')}
                        aria-label='Equipment'
                        options={equipmentOptions}
                        placeholder='Equipment'
                        aria-errormessage={
                          hasEquipmentError(errors)
                            ? errors.productDetail?.equipment?.message
                            : undefined
                        }
                      />

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
                        aria-label='Input price'
                        aria-errormessage={errors.productDetail?.price?.message}
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
                        <div>
                          <Input
                            type='date'
                            {...register('shippingDetail.startDate')}
                            aria-label='Pre-order duration'
                            placeholder='Start date'
                            aria-errormessage={
                              hasShippingDetailError(errors)
                                ? errors.shippingDetail?.startDate?.message
                                : undefined
                            }
                          />
                          -
                          <Input
                            type='date'
                            {...register('shippingDetail.endDate')}
                            aria-label='Pre-order duration'
                            placeholder='End date'
                            aria-errormessage={
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
                        placeholder='฿ 0'
                        aria-label='Ship within (Day)'
                        aria-errormessage={
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
                          aria-label='Select size'
                          options={sizeOptions}
                          placeholder='Size'
                          aria-errormessage={
                            errors.productDetail?.size?.message
                          }
                        />

                        <Select
                          {...register('productDetail.quantity')}
                          aria-label='Quantity'
                          options={[
                            { label: '1', value: '1' },
                            { label: '2', value: '2' },
                            { label: '3', value: '3' },
                            { label: '4', value: '4' },
                            { label: '5', value: '5' },
                            { label: '6', value: '6' },
                            { label: '7', value: '7' },
                            { label: '8', value: '8' },
                            { label: '9', value: '9' },
                            { label: '10', value: '10' },
                          ]}
                          placeholder='Quantity'
                          aria-errormessage={
                            hasQuantityError(errors)
                              ? errors.productDetail?.quantity?.message
                              : undefined
                          }
                        />
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
                        aria-label='Input price'
                        placeholder='฿ 0'
                        aria-errormessage={errors.productDetail?.price?.message}
                      />
                    </div>
                  </div>
                )}

                {selectedTab === 0 && (
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
                )}

                <div className='px-6 py-8 bg-white rounded-2xl'>
                  <h2 className='text-lg font-bold'>Images</h2>
                  <p className='mt-1 text-gray'>
                    Images will appear in website.
                  </p>
                  <div className='flex items-center justify-center h-40 gap-4 mt-4 border-2 rounded-2xl border-gray-light'>
                    <div className='flex justify-center w-16 h-16 rounded-full bg-gray-light'>
                      <Image
                        src={Upload}
                        alt='upload-icon'
                        width={20}
                        height={20}
                      />
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

                <div className='flex px-6 py-8 bg-white rounded-2xl'>
                  <h2 className='flex-grow text-lg font-bold'>
                    Shipping address
                  </h2>
                  <div className='max-w-56'>
                    <p className='text-base font-medium'>SASOM User</p>
                    <p className='text-xs font-medium text-gray'>
                      (+66123456789) 101 ถนน สุขุมวิท 101/1 Khwaeng Bang Chak,
                      Phra Khanong,Bangkok 10260
                    </p>
                  </div>
                  <div className='flex items-start justify-end w-10'>
                    <Image
                      src={Pencil}
                      alt='pencil-icon'
                      width={20}
                      height={20}
                    />
                  </div>
                </div>

                <div>
                  <div>Total payout</div>
                </div>

                <div>
                  <button
                    type='submit'
                    className='px-4 py-2 font-bold bg-blue-500 rounded text-grey hover:bg-blue-700'
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <DevTool control={control} />
          </section>

          <section className='flex flex-col gap-6 pl-3 pr-6'>
            <div className='flex'>
              <div className='grow'>
                <div>Total</div>
                <div>0 Item</div>
              </div>
              <div>
                <button className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
                  Cancel
                </button>
                <button className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'>
                  Submit
                </button>
              </div>
            </div>

            <div>table</div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
