import { useRef } from 'react'
import { useRangeCalendarState } from '@react-stately/calendar'
import {
  useRangeCalendar,
  AriaRangeCalendarProps,
  DateValue,
} from '@react-aria/calendar'
import { useLocale } from '@react-aria/i18n'
import { createCalendar } from '@internationalized/date'
import { calendar } from '@consolelabs/theme'
import { CalendarGrid } from './calendar-grid'
import { CalendarHeader } from './calendar-header'

export type RangleCalendarProps = AriaRangeCalendarProps<DateValue>

export function RangleCalendar(props: RangleCalendarProps) {
  const { locale } = useLocale()

  const state = useRangeCalendarState({
    ...props,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  })

  const ref = useRef<HTMLDivElement>(null)

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref)

  return (
    <div ref={ref} {...calendarProps} className={calendar.wrapper()}>
      <CalendarHeader
        title={title}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <CalendarGrid state={state} weekdayStyle="long" />
    </div>
  )
}
