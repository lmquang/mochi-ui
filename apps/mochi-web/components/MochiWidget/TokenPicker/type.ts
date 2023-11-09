// TODO: replace it with Mochi Types
import { ModelMonikerConfig, ModelToken } from 'types/mochi-schema'
import { ModelBalance } from '~types/mochi-pay-schema'

export const TokenTypes = ['Token', 'Moniker']

export const MonikerIcons = new Map([
  ['coffee', '☕'],
  ['cookie', '🍪'],
  ['beer', '🍺'],
  ['pho', '🍜'],
  ['mochi', '🍡'],
  ['diamon', '💎'],
])

export type TokenAsset = {
  id: number
  token: ModelToken
  token_amount: string // token unit
  total_amount: string // $ unit
  icon: string
}

export type MonikerAsset = ModelBalance & {
  moniker: ModelMonikerConfig
  group: string
  token_amount: string // token unit
  token_unit: string
  total_amount: string // $ unit
}

export type SectionBase<Item> = {
  title: string
  data: Item[]
}
