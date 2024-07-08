/* eslint-disable react/display-name */
import { DetailedHTMLProps, forwardRef, SelectHTMLAttributes } from 'react';

type IProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: { label: string; value: string | number }[];
  placeholder: string;
};

const Select = forwardRef<HTMLSelectElement, IProps>((props, ref) => (
  <div className='relative mb-4'>
    <select
      ref={ref}
      {...props}
      className={`block min-h-14 w-full rounded-md border-2 ${props['aria-errormessage'] ? 'border-error' : 'border-gray-light'} pb-2 pl-2 pt-4 text-black`}
    >
      <option value='' disabled selected>
        {props.placeholder}
      </option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <label
      htmlFor={props.id}
      className='pointer-events-none absolute left-0 top-0 transform pl-3.5 pt-1 text-xs text-gray transition-all'
    >
      {props['aria-label']}
    </label>
    {props['aria-errormessage'] && (
      <p className='bottom-0 left-0 pl-3 text-xs text-error'>
        {props['aria-errormessage']}
      </p>
    )}
  </div>
));

export default Select;
