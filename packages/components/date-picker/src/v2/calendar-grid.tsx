import { useCalendarGrid, AriaCalendarGridProps } from '@react-aria/calendar'
import { CalendarState, RangeCalendarState } from '@react-stately/calendar'
import { useLocale } from '@react-aria/i18n'
import {
  getWeeksInMonth,
  endOfMonth,
  DateDuration,
} from '@internationalized/date'
import { calendarGrid } from '@consolelabs/theme'
import { CalendarCell } from './calendar-cell'

type CalendarGridProps = AriaCalendarGridProps & {
  state: CalendarState | RangeCalendarState
  offset?: DateDuration
}

export function CalendarGrid({
  state,
  offset = {},
}: CalendarGridProps) {
  const { locale } = useLocale()
  
  const startDate = state.visibleRange.start.add(offset)
  const endDate = endOfMonth(startDate)

  const { gridProps, headerProps, weekDays } = useCalendarGrid(
    {
      startDate,
      endDate,
    },
    state,
  )

  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <table {...gridProps} cellPadding="0" className={calendarGrid.wrapper()}>
      <thead {...headerProps} className={calendarGrid.head()}>
        <tr>
          {weekDays.map((day, index) => (
            <th className={calendarGrid.headItem()} key={index}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} currentMonth={startDate} />
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
