import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './FormInput';

import commerce from '../../../lib/commerce';
import {
  LocaleListCountriesResponse,
  LocaleListSubdivisionsResponse,
} from '@chec/commerce.js/features/services';
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token';
import { GetShippingOptionsResponse } from '@chec/commerce.js/features/checkout';

const AddressForm = ({
  checkoutToken,
  next,
  activeStep,
}: {
  checkoutToken: CheckoutToken | undefined;
  next: (data: any) => void;
  activeStep: number;
}) => {
  const [shippingCountries, setShippingCountries] = useState<{
    [name: string]: string;
  }>();
  const [shippingCountry, setShippingCountry] = useState<string>();
  const [shippingSubdivisions, setShippingSubdivisions] = useState<{
    [name: string]: string;
  }>();
  const [shippingSubdivision, setShippingSubdivision] = useState<string>();
  const [shippingOption, setShippingOption] = useState<string>();
  const [shippingOptions, setShippingOptions] = useState<
    GetShippingOptionsResponse[]
  >([]);
  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId: string) => {
    try {
      const { countries }: LocaleListCountriesResponse =
        await commerce.services.localeListShippingCountries(checkoutTokenId);

      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    } catch (error) {
      console.log(
        'There was an error fetching a list of shipping countries',
        error
      );
    }
  };

  const fetchSubdivisions = async (countryCode: string) => {
    try {
      const { subdivisions }: LocaleListSubdivisionsResponse =
        await commerce.services.localeListSubdivisions(countryCode);

      setShippingSubdivisions(subdivisions);
      setShippingSubdivision(Object.keys(subdivisions)[0]);
    } catch (error) {
      console.log(
        'There was an error fetching a list of shipping subdivisions',
        error
      );
    }
  };

  const fetchShippingOptions = async (
    checkoutTokenId: string,
    country: string,
    region = undefined
  ) => {
    try {
      const response: GetShippingOptionsResponse[] =
        await commerce.checkout.getShippingOptions(checkoutTokenId, {
          country,
          region,
        });

      setShippingOptions(response);
      setShippingOption(response[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (checkoutToken?.id) fetchShippingCountries(checkoutToken?.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (checkoutToken?.id && shippingCountry)
      fetchShippingOptions(checkoutToken?.id, shippingCountry);
  }, [checkoutToken?.id, shippingCountry]);

  return (
    <div className='mt-5 md:col-span-2'>
      <FormProvider {...methods}>
        <h2 className='text-lg font-bold tracking-tight text-gray-900 pb-8'>
          Shipping Info
        </h2>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            })
          )}
        >
          <div className='overflow-hidden sm:rounded-md'>
            <div className='py-5 bg-white'>
              <div className='grid grid-cols-6 gap-6'>
                <FormInput
                  type='length-50'
                  name='firstName'
                  label='First name'
                  register={methods.register}
                />
                <FormInput
                  type='length-50'
                  name='lastName'
                  label='Last name'
                  register={methods.register}
                />
                <FormInput
                  type='length-full'
                  name='email'
                  label='Email address'
                  register={methods.register}
                />
                <FormInput
                  type='select'
                  name='country'
                  label='Country'
                  shippingCountry={shippingCountry}
                  setShippingCountry={setShippingCountry}
                  shippingCountries={shippingCountries}
                  register={methods.register}
                />
                <FormInput
                  type='select'
                  name='subdivision'
                  label='Shipping Subdivision'
                  shippingSubdivision={shippingSubdivision}
                  setShippingSubdivision={setShippingSubdivision}
                  shippingSubdivisions={shippingSubdivisions}
                  register={methods.register}
                />
                <FormInput
                  type='length-full'
                  name='city'
                  label='City'
                  register={methods.register}
                />
                <FormInput
                  type='length-full'
                  name='address'
                  label='Street address'
                  register={methods.register}
                />
                <FormInput
                  type='length-full'
                  name='zip'
                  label='ZIP / Postal Code'
                  register={methods.register}
                />
              </div>
            </div>
            <div className='py-3 text-right'>
              <button
                type='submit'
                className='py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddressForm;
