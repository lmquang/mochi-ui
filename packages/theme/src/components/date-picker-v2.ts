import { cva } from 'class-variance-authority'
import { clsx } from 'clsx'

const calendarCellWrapper = cva(['py-1 relative z-10'])

const calendarCellItem = cva(['w-8 h-8 outline-none group text-text-primary'], {
  variants: {
    isSelected: {
      true: 'bg-neutral-150',
    },
    isRoundedRight: {
      true: 'rounded-r-full',
    },
    isRoundedLeft: {
      true: 'rounded-l-full',
    },
    isInvalid: {
      true: '',
    },
    isDisabled: {
      true: 'disabled',
    },
  },
})

const calendarCellItemInner = cva(
  'w-full h-full rounded-full flex items-center justify-center cursor-default text-xs',
  {
    variants: {
      isInvalid: {
        true: 'text-neutral-400',
      },
      isDisabled: {
        true: 'text-neutral-400',
      },
      isSelected: {
        true: '',
      },
      isSelectionStart: {
        true: 'bg-primary-700',
      },
      isSelectionEnd: {
        true: 'bg-primary-700',
      },
    },
    compoundVariants: [
      {
        isSelected: true,
        isSelectionStart: true,
        className: 'text-white',
      },
      {
        isSelected: true,
        isSelectionEnd: true,
        className: 'text-white',
      },
      {
        isSelected: false,
        isDisabled: false,
        // FIXME (Vy) need a semantic color
        className: 'hover:bg-neutral-150',
      },
    ],
  },
)

const calendarCellDot = cva(
  'w-1 h-1 rounded-full bg-primary-700 absolute left-1/2 -translate-x-1/2 bottom-[6px]',
  {
    variants: {
      isSelected: {
        true: 'bg-white',
        false: 'bg-primary-700',
      },
    },
  },
)

export const calendarCell = {
  wrapper: calendarCellWrapper,
  cell: calendarCellItem,
  inner: calendarCellItemInner,
  dot: calendarCellDot,
}

const calendarGridWrapper = cva('flex-1')

const calendarGridHead = cva('text-text-primary text-center text-xs')

const calendarGridHeadItem = cva('font-normal')

export const calendarGrid = {
  wrapper: calendarGridWrapper,
  head: calendarGridHead,
  headItem: calendarGridHeadItem,
}

const calendarWrapper = cva('inline-block')

const calendarAriaText = cva('sr-only')

const calendarHeader = cva('flex items-center pb-3 gap-2')

const calendarTitle = cva(
  'flex-1 text-text-primary text-center font-medium text-sm leadning-normal',
)

const calendarHeaderIcon = cva('w-6 h-6')

export const calendar = {
  wrapper: calendarWrapper,
  ariaText: calendarAriaText,
  header: calendarHeader,
  title: calendarTitle,
  headerIcon: calendarHeaderIcon,
}

const dateFieldWrapper = cva('flex')

const dateFieldSegmentWrapper = cva(
  'px-0.5 box-content tabular-nums text-right outline-none rounded-sm focus:bg-violet-600 focus:text-white group',
)

export const dateField = {
  wrapper: dateFieldWrapper,
  segmentWrapper: dateFieldSegmentWrapper,
}

const datePickerWrapper = cva('relative inline-flex flex-col gap-2 text-left')

const datePickerFieldWrapper = cva([
  'flex h-10 relative items-center cursor-text overflow-hidden focus-within:shadow-input-focused rounded gap-2 px-3.5',
  'group transition-colors border border-neutral-outline-border peer-focus:border-primary-outline-fg',
])

const datePickerFieldContainer = cva(
  'flex items-center',
  // 'bg-white rounded-l-md pr-10 group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 p-1 relative flex items-center',
)

const datePickerFieldIcon = cva(
  'w-5 h-5 text-text-secondary group-focus-within:text-text-secondary',
)

export const datePicker = {
  wrapper: datePickerWrapper,
  fieldWrapper: datePickerFieldWrapper,
  fieldContainer: datePickerFieldContainer,
  fieldIcon: datePickerFieldIcon,
}
