import { useRef } from 'react'
import { useCalendarCell } from '@react-aria/calendar'
import { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import { useLocale } from '@react-aria/i18n'
import {
  isSameDay,
  getDayOfWeek,
  isSameMonth,
  CalendarDate,
  now,
  today,
  getLocalTimeZone,
} from '@internationalized/date'
import { calendarCell } from '@consolelabs/theme'

export type CalendarCellProps = {
  state: CalendarState | RangeCalendarState
  date: CalendarDate
  currentMonth: CalendarDate
}

export function CalendarCell({ state, date, currentMonth }: CalendarCellProps) {
  const ref = useRef<HTMLDivElement>(null)

  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell({ date }, state, ref)

  const { locale } = useLocale()

  const isToday = isSameDay(date, today(getLocalTimeZone()))

  const isOutsideMonth = !isSameMonth(currentMonth, date)

  const isSelectionStart = (state as RangeCalendarState).highlightedRange
    ? isSameDay(date, (state as RangeCalendarState).highlightedRange.start)
    : isSelected

  const isSelectionEnd = (state as RangeCalendarState).highlightedRange
    ? isSameDay(date, (state as RangeCalendarState).highlightedRange.end)
    : isSelected

  const dayOfWeek = getDayOfWeek(date, locale)
  const isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1)

  const isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date))

  return (
    <td {...cellProps} className={calendarCell.wrapper()}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideMonth}
        className={calendarCell.cell({
          isRoundedLeft,
          isRoundedRight,
          isInvalid,
          isDisabled,
          isSelected,
        })}
      >
        <div
          className={calendarCell.inner({
            isSelected,
            isDisabled,
            isInvalid,
            isSelectionStart,
            isSelectionEnd,
          })}
        >
          {formattedDate}
          {isToday && <span className={calendarCell.dot({ isSelected })} />}
        </div>
      </div>
    </td>
  )
}
