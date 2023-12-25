import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { format } from 'date-fns'
import { today, getLocalTimeZone, parseDate } from '@internationalized/date'
import { DatePicker, DateRanglePicker } from '../src'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DayPicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: function render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date>()
    return (
      <div>
        <span className=" text-xs">{JSON.stringify(date)}</span>
        <DatePicker
          label="Appointment date"
          defaultValue={parseDate('2022-02-03')}
          minValue={today(getLocalTimeZone())}
          // isDisabled
          // value={today(getLocalTimeZone())}
          // minValue={today(getLocalTimeZone())}
          // mode="single"
          // selected={date}
          // onSelect={setDate}
          // alignCaptionCenter
        />
      </div>
    )
  },
}

export const DateRangePicker: Story = {
  render: function render() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date>()
    return (
      <div>
        <span className=" text-xs">{JSON.stringify(date)}</span>
        <DateRanglePicker
          label="Appointment date"

          // defaultValue={{
          //   start: today(getLocalTimeZone()),
          //   end: today(getLocalTimeZone()).add({ weeks: 2 }),
          // }}
          // isDisabled
          // value={today(getLocalTimeZone())}
          // minValue={today(getLocalTimeZone())}
          // mode="single"
          // selected={date}
          // onSelect={setDate}
          // alignCaptionCenter
        />
      </div>
    )
  },
}

// export const WithInputRange: Story = {
//   render: function render() {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [selectedRange, setSelectedRange] = useState<DateRange>()
//     return (
//       <div>
//         <div className="flex flex-col text-xs mb-3">
//           <button
//             onClick={() => {
//               setSelectedRange({
//                 from: new Date('1/1/2023'),
//                 to: new Date('2/1/2023'),
//               })
//             }}
//           >
//             Rest Range
//           </button>
//           <span>
//             from: {selectedRange?.from && format(selectedRange.from, 'PP')}
//           </span>
//           <span>to: {selectedRange?.to && format(selectedRange.to, 'PP')}</span>
//         </div>
//         <DayRangePickerWithInput
//           hasShadow
//           selected={selectedRange}
//           onSelect={setSelectedRange}
//           dayTextFormat="PP"
//           inputProps={{
//             placeholder: '1/1/2023',
//           }}
//           fromDate={new Date('1/10/2023')}
//           toDate={new Date('1/15/2023')}
//         />
//       </div>
//     )
//   },
// }

// export const AlignCenter: Story = {
//   render: function render() {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [date, setDate] = useState<Date>()
//     return (
//       <div>
//         <span className=" text-xs">{JSON.stringify(date)}</span>
//         <DayPicker selected={date} onSelect={setDate} alignCaptionCenter />
//       </div>
//     )
//   },
// }

// export const DropdownCaption: Story = {
//   render: function render() {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [date, setDate] = useState<Date>()
//     return (
//       <div>
//         <span className=" text-xs">{JSON.stringify(date)}</span>
//         <DayPicker
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           captionLayout="dropdown"
//           fromDate={new Date('1/1/2023')}
//           toDate={new Date('1/10/2023')}
//         />
//       </div>
//     )
//   },
// }

// export const RangeSelector: Story = {
//   render: function render() {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [date, setDate] = useState<DateRange>()
//     return (
//       <div>
//         <span className=" text-xs">{JSON.stringify(date)}</span>
//         <DayPicker
//           mode="range"
//           min={2}
//           max={30}
//           selected={date}
//           onSelect={setDate}
//         />
//       </div>
//     )
//   },
// }

// export const MultipleMode: Story = {
//   render: function render() {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const [date, setDate] = useState<Date[]>()
//     return (
//       <div>
//         <span className=" text-xs">{JSON.stringify(date)}</span>
//         <DayPicker
//           mode="multiple"
//           min={0}
//           max={5}
//           selected={date}
//           onSelect={setDate}
//           alignCaptionCenter
//         />
//       </div>
//     )
//   },
// }
