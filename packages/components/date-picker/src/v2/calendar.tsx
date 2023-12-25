import { useRef } from 'react'
import { useCalendarState } from '@react-stately/calendar'
import { useCalendar, AriaCalendarProps, DateValue } from '@react-aria/calendar'
import { useLocale } from '@react-aria/i18n'
import { createCalendar } from '@internationalized/date'
import { calendar } from '@consolelabs/theme'
import { CalendarGrid } from './calendar-grid'
import { CalendarHeader } from './calendar-header'

export type CalendarProps = AriaCalendarProps<DateValue>

export function Calendar(props: CalendarProps) {
  const { locale } = useLocale()

  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  })

  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state)

  return (
    <div {...calendarProps} className={calendar.wrapper()}>
      <CalendarHeader
        title={title}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <CalendarGrid state={state} weekdayStyle="short" />
    </div>
  )
}
