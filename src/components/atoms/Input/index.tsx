import React from 'react';
import cn from 'classnames';
import SvgInline from '@/components/atoms/SvgInline';

export type Props = {
  id?: string;
  onChange?(e: any): void;
  onBlur?(e: any): boolean;
  onFocus?(e: any): void | undefined;
  placeholder?: '';
  disabled?: boolean;
  label?: string;
  errorMessage?: string;
  className?: any;
  required?: boolean;
  type?: string;
  name?: string;
  inputClassName?: string;
  rows?: number;
};

const Input = ({
  id,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  disabled,
  label,
  errorMessage,
  className,
  required,
  type,
  name,
  inputClassName,
  rows,
}: Props) => (
  <div className={cn('relative w-full', label && 'sm:pt-[25px] pt-[20px]', className || '')}>
    {label ? <span className="block font-bold leading-[22px] left-0 mb-1 absolute top-0">{label}</span> : null}
    {rows ? (
      <textarea
        id={id}
        className={cn(
          inputClassName,
          disabled && 'bg-lightgray placeholder:text-grey',
          'text-black rounded-[4px] dark:text-white dark:border-b-white dark:bg-gray-800 appearance-none bg-white border border-demo_border md:text-[16px] text-[11px] leading-[22px] pt-[12px] pr-[38px] pb[12px] pl-[14px] w-full dark:focus:border-white focus:border-black focus:outline-none p-[12px]'
        )}
        placeholder={placeholder && !errorMessage ? placeholder : ''}
        onChange={onChange}
        rows={rows}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        name={name}
      />
    ) : (
      <input
        id={id}
        className={cn(
          inputClassName,
          disabled && 'bg-lightgray placeholder:text-grey',
          'text-black dark:text-white dark:bg-gray-800 dark:border-b-white dark:focus:border-white rounded-[4px] appearance-none bg-white border border-demo_border md:text-[16px] text-[11px] leading-[22px] pt-[12px] pr-[38px] pb[12px] pl-[14px] w-full focus:border-black focus:outline-none p-[12px]'
        )}
        placeholder={placeholder && !errorMessage ? placeholder : ''}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        type={type}
        name={name}
      />
    )}
    {errorMessage ? (
      <>
        <p className="text-brand_secondary mt-[6px] text-[14px] leading-[20px]">{errorMessage}</p>
        <div className="absolute right-[10px] top-[34px] sm:top-[38px] w-[20px] h-[20px]">
          <SvgInline src="/img/warning.svg" />
        </div>
      </>
    ) : null}
  </div>
);

Input.defaultProps = {
  id: '',
  onChange: () => null,
  onBlur: () => undefined,
  onFocus: () => undefined,
  placeholder: '',
  disabled: false,
  label: '',
  errorMessage: '',
  className: null,
  required: false,
  type: 'text',
  name: '',
  inputClassName: '',
  rows: undefined,
};

export default Input;
