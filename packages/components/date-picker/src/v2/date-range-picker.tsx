import { useRef } from 'react'
import {
  useDateRangePickerState,
  DateRangePickerStateOptions,
} from '@react-stately/datepicker'
import { useDateRangePicker, DateValue } from '@react-aria/datepicker'
import { Popover, PopoverContent, PopoverTrigger } from '@consolelabs/popover'
import { IconButton } from '@consolelabs/icon-button'
import { InfoCircleOutlined } from '@consolelabs/icons'
import { RangleCalendar } from './range-calendar'

export type DateRanglePickerProps = DateRangePickerStateOptions<DateValue>

export function DateRanglePicker(props: DateRanglePickerProps) {
  const state = useDateRangePickerState(props)
  const ref = useRef<HTMLDivElement>(null)

  const {
    labelProps,
    groupProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    // dialogProps,
    calendarProps,
  } = useDateRangePicker(props, state, ref)

  return (
    <Popover>
      <div className="relative inline-flex flex-col text-left">
        <span {...labelProps} className="text-sm text-gray-800">
          {props.label}
        </span>
        <div {...groupProps} ref={ref} className="flex group">
          <div className="bg-white border border-gray-300 group-hover:border-gray-400 transition-colors rounded-l-md pr-10 group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 p-1 relative flex items-center">
            {/* <DateField {...fieldProps} /> */}
            <input {...startFieldProps} />
            <input {...endFieldProps} />
            {state.isInvalid && (
              <InfoCircleOutlined className="w-6 h-6 text-red-500 absolute right-1" />
            )}
          </div>
          <PopoverTrigger asChild>
            <IconButton {...buttonProps}>
              <InfoCircleOutlined height={20} width={20} />
            </IconButton>
          </PopoverTrigger>
        </div>
      </div>

      <PopoverContent className="p-5">
        <RangleCalendar {...calendarProps} />
      </PopoverContent>
    </Popover>
  )
}
