import { useRef } from 'react'
import {
  useDateFieldState,
  DateFieldState,
  DateSegment,
} from '@react-stately/datepicker'
import { useDateField, useDateSegment } from '@react-aria/datepicker'
import { useLocale } from '@react-aria/i18n'
import { createCalendar } from '@internationalized/date'
import { dateField } from '@consolelabs/theme'

export type DateFieldProps = any

export function DateField(props: DateFieldProps) {
  const { locale } = useLocale()
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  })

  const ref = useRef<HTMLDivElement>(null)
  const { fieldProps } = useDateField(props, state, ref)

  return (
    <div {...fieldProps} ref={ref} className={dateField.wrapper()}>
      {state.segments.map((segment, i) => (
        <DateSegmentItem key={i} segment={segment} state={state} />
      ))}
    </div>
  )
}

type DateSegmentProps = {
  segment: DateSegment
  state: DateFieldState
}

function DateSegmentItem({ segment, state }: DateSegmentProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { segmentProps } = useDateSegment(segment, state, ref)

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null && String(segment.maxValue).length + 'ch',
      }}
      //   className={`px-0.5 box-content tabular-nums text-right outline-none rounded-sm focus:bg-violet-600 focus:text-white group ${
      //     !segment.isEditable ? 'text-gray-500' : 'text-gray-800'
      //   }`}
      className={dateField.segmentWrapper()}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="block w-full text-center italic text-gray-500 group-focus:text-white"
        style={{
          visibility: segment.isPlaceholder ? '' : 'hidden',
          height: segment.isPlaceholder ? '' : 0,
          pointerEvents: 'none',
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? '' : segment.text}
    </div>
  )
}
