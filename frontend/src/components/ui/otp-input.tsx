'use client';

import * as React from 'react';
import { OTPInput, type SlotProps } from 'input-otp';
import { cn } from '@/lib/utils';

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'relative flex h-12 w-12 items-center justify-center rounded-lg border text-lg font-semibold transition-colors',
        'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900',
        props.isActive && 'border-bharat-saffron ring-2 ring-bharat-saffron/20'
      )}
    >
      {props.char ?? props.placeholderChar}
    </div>
  );
}

export interface OTPInputFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof OTPInput>, 'render'> {
  className?: string;
}

const OTPInputField = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  OTPInputFieldProps
>(({ className, maxLength = 6, value, onChange, onComplete }, ref) => (
  <OTPInput
    ref={ref}
    maxLength={maxLength}
    value={value}
    onChange={onChange}
    onComplete={onComplete}
    containerClassName={cn('flex gap-2 justify-center', className)}
    render={({ slots }) => (
      <>
        {slots.map((slot, idx) => (
          <Slot key={idx} {...slot} />
        ))}
      </>
    )}
  />
));
OTPInputField.displayName = 'OTPInputField';

export { OTPInput, OTPInputField };
