import { useRef } from 'react'
import { DiscordColored, PasswordLockColored, Slack } from '@consolelabs/icons'
import { useDatePicker } from '@react-aria/datepicker'
import { useDatePickerState } from '@react-stately/datepicker'
import {
  TextFieldRoot,
  TextFieldInput,
  TextFieldDecorator,
} from '@consolelabs/input'
import { Button } from '@consolelabs/button'
import { Popover, PopoverContent, PopoverTrigger } from '@consolelabs/popover'
import { Calendar } from './calendar'

// Reuse the DateField, Popover, Dialog, Calendar, and Button from your component library.
// import {Button, Calendar, DateField, Dialog, Popover} from 'your-component-library';

export function DatePickerV2(props: any) {
  let state = useDatePickerState(props)
  let ref = useRef(null)

  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref)

  var x = (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      {/* <div {...labelProps}>{props.label}</div>
      <div {...groupProps} ref={ref} style={{ display: 'flex' }}>
        <input {...fieldProps} />
        <button {...buttonProps}>🗓</button>
      </div> */}

      <TextFieldRoot size="lg">
        <TextFieldDecorator>
          <DiscordColored />
        </TextFieldDecorator>
        <TextFieldInput placeholder="Search the docs…" />
      </TextFieldRoot>

      {/* {state.isOpen &&
        (
          <Popover state={state} triggerRef={ref} placement="bottom start">
            <Dialog {...dialogProps}>
              <Calendar {...calendarProps} />
            </Dialog>
          </Popover>
        )} */}
    </div>
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TextFieldRoot size="lg">
          <TextFieldDecorator>
            <DiscordColored />
          </TextFieldDecorator>
          <TextFieldInput placeholder="Search the docs…" />
        </TextFieldRoot>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar {...calendarProps} />
      </PopoverContent>
    </Popover>
  )
}
