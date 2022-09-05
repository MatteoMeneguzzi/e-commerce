import { GetShippingOptionsResponse } from '@chec/commerce.js/features/checkout';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

const FormInput = ({
  type,
  name,
  label,
  shippingCountry,
  setShippingCountry,
  shippingCountries,
  shippingSubdivision,
  setShippingSubdivision,
  shippingSubdivisions,
  shippingOption,
  setShippingOption,
  shippingOptions,
  register,
}: {
  type: string;
  name: string;
  label: string;
  shippingCountry?: string;
  setShippingCountry?: (e: any) => void;
  shippingCountries?: {
    [name: string]: string;
  };
  shippingSubdivision?: string;
  setShippingSubdivision?: (e: any) => void;
  shippingSubdivisions?: {
    [name: string]: string;
  };
  shippingOption?: string;
  setShippingOption?: (e: any) => void;
  shippingOptions?: GetShippingOptionsResponse[];
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <>
      {type === 'length-50' && (
        <div className='col-span-6 sm:col-span-3'>
          <label
            htmlFor={name}
            className='block text-sm font-medium text-gray-700'
          >
            {label}
          </label>
          <input
            type={name}
            id={name}
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md'
            required
            {...register(
              name === 'firstName'
                ? 'firstName'
                : name === 'lastName'
                ? 'lastName'
                : ''
            )}
          />
        </div>
      )}
      {type === 'length-full' && (
        <div className='col-span-6 sm:col-span-4'>
          <label
            htmlFor={name}
            className='block text-sm font-medium text-gray-700'
          >
            {label}
          </label>
          <input
            type={name || 'text'}
            id={name}
            pattern={
              name === 'zip'
                ? '[0-9]{5}'
                : name === 'email'
                ? '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'
                : undefined
            }
            className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-md sm:text-sm border-gray-300 rounded-md'
            required
            {...register(
              name === 'email'
                ? 'email'
                : name === 'address'
                ? 'address'
                : name === 'tel'
                ? 'tel'
                : name === 'city'
                ? 'city'
                : name === 'zip'
                ? 'zip'
                : ''
            )}
          />
        </div>
      )}

      {setShippingCountry && type === 'select' && (
        <div className='col-span-6 sm:col-span-3'>
          <label
            htmlFor={name}
            className='block text-sm font-medium text-gray-700'
          >
            {label}
          </label>
          <select
            name={name}
            id={name}
            value={shippingCountry}
            autoComplete='country-name'
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            onChange={(e) => setShippingCountry(e.target.value)}
          >
            {shippingCountries &&
              Object.entries(shippingCountries)
                .map(([code, name]) => ({ id: code, label: name }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
          </select>
        </div>
      )}
      {setShippingSubdivision && type === 'select' && (
        <div className='col-span-6 sm:col-span-3'>
          <label
            htmlFor={name}
            className='block text-sm font-medium text-gray-700'
          >
            {label}
          </label>
          <select
            name={name}
            id={name}
            value={shippingSubdivision}
            autoComplete='country-name'
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            onChange={(e) => setShippingSubdivision(e.target.value)}
            required
          >
            {shippingSubdivisions &&
              Object.entries(shippingSubdivisions)
                .map(([code, name]) => ({ id: code, label: name }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
          </select>
        </div>
      )}
      {setShippingOption && type === 'select' && (
        <div className='col-span-6 sm:col-span-3'>
          <label
            htmlFor={name}
            className='block text-sm font-medium text-gray-700'
          >
            {label}
          </label>
          <select
            name={name}
            id={name}
            value={shippingOption}
            autoComplete='country-name'
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            onChange={(e) => setShippingOption(e.target.value)}
            required
          >
            {shippingOptions &&
              shippingOptions
                .map((sO) => ({
                  id: sO.id,
                  label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
                }))
                .map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
          </select>
        </div>
      )}
    </>
  );
};

export default FormInput;
