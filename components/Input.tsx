/* eslint-disable react/display-name */
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <div className='relative mb-4'>
    <input
      ref={ref}
      {...props}
      className={`block min-h-14 w-full rounded-md border-2 ${props['aria-errormessage'] ? 'border-error' : 'border-gray-light'} pb-2 pl-3 pt-4 text-black placeholder:text-black`}
      placeholder='฿ 0'
    />
    <label
      htmlFor='input-field'
      className='absolute top-0 left-0 pt-1 pl-3 text-xs transition-all transform pointer-events-none text-gray'
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

export default Input;
