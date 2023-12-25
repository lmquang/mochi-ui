import { useRef } from 'react'
import { useCalendarState } from '@react-stately/calendar'
import { useCalendar, useCalendarCell, useCalendarGrid } from '@react-aria/calendar'
import { useLocale, useDateFormatter } from '@react-aria/i18n'
import {
  createCalendar,
  endOfMonth,
  isSameDay,
  getDayOfWeek,
  isSameMonth,
  getWeeksInMonth
} from '@internationalized/date'
import { Button } from '@consolelabs/button'
import { DiscordColored, PasswordLockColored, Slack } from '@consolelabs/icons'
// import { CalendarGrid } from "./CalendarGrid";
// import { CalendarHeader } from "./CalendarHeader";

export function Calendar(props: any) {
  let { locale } = useLocale()
  let state = useCalendarState({
    ...props,
    visibleDuration: { months: 2 },
    locale,
    createCalendar,
  })

  let ref = useRef()
  let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state,
    ref,
  )

  return (
    <div {...calendarProps} ref={ref} className="inline-block text-gray-800">
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid state={state} />
        <CalendarGrid state={state} offset={{ months: 1 }} />
      </div>
    </div>
  )
}

export function CalendarHeader({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}: any) {
  let monthDateFormatter = useDateFormatter({
    month: 'long',
    year: 'numeric',
    timeZone: state.timeZone,
  })

  return (
    <div className="flex items-center py-4">
      {/* Add a screen reader only description of the entire visible range rather than
       * a separate heading above each month grid. This is placed first in the DOM order
       * so that it is the first thing a touch screen reader user encounters.
       * In addition, VoiceOver on iOS does not announce the aria-label of the grid
       * elements, so the aria-label of the Calendar is included here as well. */}
      <div className="sr-only">
        <h2>{calendarProps['aria-label']}</h2>
      </div>
      <Button {...prevButtonProps}>
        <DiscordColored className="h-6 w-6" />
      </Button>
      <h2
        // We have a visually hidden heading describing the entire visible range,
        // and the calendar itself describes the individual month
        // so we don't need to repeat that here for screen reader users.
        aria-hidden
        className="flex-1 align-center font-bold text-xl text-center"
      >
        {monthDateFormatter.format(
          state.visibleRange.start.toDate(state.timeZone),
        )}
      </h2>
      <h2
        aria-hidden
        className="flex-1 align-center font-bold text-xl text-center"
      >
        {monthDateFormatter.format(
          state.visibleRange.start.add({ months: 1 }).toDate(state.timeZone),
        )}
      </h2>
      <Button {...nextButtonProps}>
        <DiscordColored className="h-6 w-6" />
      </Button>
    </div>
  )
}

export function CalendarGrid({ state, offset = {} }) {
  let { locale } = useLocale()
  let startDate = state.visibleRange.start.add(offset)
  let endDate = endOfMonth(startDate)
  let { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
    },
    state,
  )

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(startDate, locale)

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps} className="text-gray-600">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex, startDate)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={i}
                    state={state}
                    date={date}
                    currentMonth={startDate}
                  />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function CalendarCell({ state, date, currentMonth }: any) {
  let ref = useRef()
  let { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
    useCalendarCell({ date }, state, ref)

  let isOutsideMonth = !isSameMonth(currentMonth, date)

  // The start and end date of the selected range will have
  // an emphasized appearance.
  let isSelectionStart = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.start)
    : isSelected
  let isSelectionEnd = state.highlightedRange
    ? isSameDay(date, state.highlightedRange.end)
    : isSelected

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  let { locale } = useLocale()
  let dayOfWeek = getDayOfWeek(date, locale)
  let isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1)
  let isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date))

//   let { focusProps, isFocusVisible } = useFocusRing()

  return (
    <td
      {...cellProps}
      className={`py-0.5 relative ${'isFocusVisible' ? 'z-10' : 'z-0'}`}
    >
      <div
        // {...mergeProps(buttonProps, focusProps)}
        {...buttonProps}
        ref={ref}
        hidden={isOutsideMonth}
        className={`w-10 h-10 outline-none group ${
          isRoundedLeft ? 'rounded-l-full' : ''
        } ${isRoundedRight ? 'rounded-r-full' : ''} ${
          isSelected ? 'bg-violet-300' : ''
        } ${isDisabled ? 'disabled' : ''}`}
      >
        <div
          className={`w-full h-full rounded-full flex items-center justify-center ${
            isDisabled ? 'text-gray-400' : ''
          } ${
            // Focus ring, visible while the cell has keyboard focus.
            true
              ? 'ring-2 group-focus:z-2 ring-violet-600 ring-offset-2'
              : ''
          } ${
            // Darker selection background for the start and end.
            isSelectionStart || isSelectionEnd
              ? 'bg-violet-600 text-white hover:bg-violet-700'
              : ''
          } ${
            // Hover state for cells in the middle of the range.
            isSelected && !(isSelectionStart || isSelectionEnd)
              ? 'hover:bg-violet-400'
              : ''
          } ${
            // Hover state for non-selected cells.
            !isSelected && !isDisabled ? 'hover:bg-violet-100' : ''
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  )
}
