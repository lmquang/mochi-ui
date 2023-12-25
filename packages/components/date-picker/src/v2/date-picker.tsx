import { useRef } from 'react'
import {
  useDatePickerState,
  DatePickerStateOptions,
} from '@react-stately/datepicker'
import { useDatePicker, DateValue } from '@react-aria/datepicker'
import { Popover, PopoverContent, PopoverTrigger } from '@consolelabs/popover'
import { IconButton } from '@consolelabs/icon-button'
import { InfoCircleOutlined, CalendarDaysLine } from '@consolelabs/icons'
import { formControl, label, textfield, datePicker } from '@consolelabs/theme'
import { Calendar } from './calendar'
import { DateField } from './date-field'

export type DatePickerProps = DatePickerStateOptions<DateValue>

export function DatePicker(props: DatePickerProps) {
  const state = useDatePickerState(props)
  const ref = useRef<HTMLDivElement>(null)

  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    // dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref)

  return (
    <Popover>
      <PopoverTrigger>
        <div {...buttonProps} role="button" className={datePicker.wrapper()}>
          <span {...labelProps} className={label.labelClsx({ className: '' })}>
            {props.label}
          </span>
          <div {...groupProps} ref={ref} className={datePicker.fieldWrapper()}>
            <CalendarDaysLine className={datePicker.fieldIcon()} />
            <div className={datePicker.fieldContainer()}>
              <DateField {...fieldProps} />
              {state.validationState === 'invalid' && (
                <InfoCircleOutlined className="w-6 h-6 text-red-500 absolute right-1" />
              )}
            </div>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent className="p-5">
        <Calendar {...calendarProps} />
      </PopoverContent>
    </Popover>
  )
}
