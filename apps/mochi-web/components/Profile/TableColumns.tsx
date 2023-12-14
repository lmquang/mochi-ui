import { truncate } from '@dwarvesf/react-utils'
import { Avatar, Button, ColumnProps, Typography } from '@mochi-ui/core'
import { ModelPayRequest } from '~types/mochi-pay-schema'
import { utils as mochiUtils } from '@consolelabs/mochi-ui'
import { utils } from 'ethers'

export const Amount: ColumnProps<ModelPayRequest>['cell'] = (props) => (
  <div className="flex items-center space-x-2">
    <Avatar src={props.row.original.token?.icon || ''} size="sm" />
    <Typography level="p5">
      {mochiUtils.formatTokenDigit(
        utils.formatUnits(
          props.row.original.amount || 0,
          props.row.original.token?.decimal,
        ),
      )}{' '}
      {props.row.original.token?.symbol}
    </Typography>
  </div>
)

export const PaymeUrl: ColumnProps<ModelPayRequest>['cell'] = (props) => {
  const link = `mochi.gg/receive/${props.row.original.code}`

  return (
    <Button
      variant="link"
      as="a"
      href={`https://${link}`}
      target="_blank"
      className="!font-normal pl-0 pr-0"
    >
      {truncate(link, 21)}
    </Button>
  )
}

export const PaylinkUrl: ColumnProps<ModelPayRequest>['cell'] = (props) => {
  const link = `mochi.gg/pay/${props.row.original.code}`

  return (
    <Button
      variant="link"
      as="a"
      href={`https://${link}`}
      target="_blank"
      className="!font-normal"
    >
      {truncate(link, 21)}
    </Button>
  )
}
