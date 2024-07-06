import React, { ChangeEvent } from 'react';

interface IProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  label: string;
}

const Select = ({ options, value, onChange, name, label }: IProps) => {
  return (
    <div className='relative mb-4'>
      <select
        value={value}
        onChange={onChange}
        name={name}
        className='block w-full py-2 pl-3 pr-10 border-gray-300 rounded-md shadow-sm min-h-14 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        htmlFor='select-field'
        className='absolute top-0 left-0 pt-1 pl-3 text-xs text-gray-500 transition-all transform pointer-events-none'
      >
        {label}
      </label>
    </div>
  );
};

export default Select;
