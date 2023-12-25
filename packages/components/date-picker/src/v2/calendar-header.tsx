import { ArrowLeftLine, ArrowRightLine } from '@consolelabs/icons'
import { IconButton, IconButtonProps } from '@consolelabs/icon-button'
import { calendar } from '@consolelabs/theme'
import { CalendarAria } from '@react-aria/calendar'
import { useButton, AriaButtonProps } from '@react-aria/button'
import { useRef } from 'react'

export type CalendarHeaderProps = Pick<
  CalendarAria,
  'calendarProps' | 'prevButtonProps' | 'nextButtonProps' | 'title'
>

export function CalendarHeader({
  title,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}: CalendarHeaderProps) {
  return (
    <div className={calendar.header()}>
      <div className={calendar.ariaText()}>
        <h2>{calendarProps['aria-label']}</h2>
      </div>
      <Button {...prevButtonProps} color="neutral" variant="link">
        <ArrowLeftLine className={calendar.headerIcon()} />
      </Button>

      <h2 className={calendar.title()}>{title}</h2>

      <Button {...nextButtonProps} color="neutral" variant="link">
        <ArrowRightLine className={calendar.headerIcon()} />
      </Button>
    </div>
  )
}

type ButtonProps = Pick<IconButtonProps, 'color' | 'variant'> & AriaButtonProps

function Button({ color, variant, ...rest }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(rest, ref)

  return <IconButton {...buttonProps} color={color} variant={variant} >{rest.children}</IconButton>
}
