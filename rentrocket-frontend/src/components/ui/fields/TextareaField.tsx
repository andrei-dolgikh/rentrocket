import { forwardRef } from 'react';

interface TextareaFieldProps {
  id: string;
  label?: string;
  extra?: string;
  placeholder: string;
  variant?: string;
  state?: 'error' | 'success';
  disabled?: boolean;
  rows?: number;
  cols?: number;
  defaultValue?: string;
}

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  (
    { label, id, extra, placeholder, state, disabled, rows, cols, defaultValue, ...rest },
    ref
  ) => {
    return (
      <div className={`${extra}`}>
        {label && (
          <label
            htmlFor={id}
            className={`text-[16px] text-[#999999] my-4 font-medium `}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          id={id}
          rows={rows}
          cols={cols}
          defaultValue={defaultValue}
          className={`p-[5px] h-[100px] text-white flex w-full items-center justify-center rounded-lg bg-[#1E1E1E] text-base outline-none placeholder:text-white/30 placeholder:font-normal duration-500 transition-colors focus:border-primary ${
            disabled === true
              ? '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
              : state === 'error'
                ? 'border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400'
                : state === 'success'
                  ? 'border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400'
                  : ''
          }`}
          {...rest}
        />
      </div>
    );
  }
);

TextareaField.displayName = 'textarea';