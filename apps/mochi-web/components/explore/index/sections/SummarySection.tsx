import { utils } from '@consolelabs/mochi-ui'
import { Skeleton, Typography } from '@mochi-ui/core'
import {
  DollarColored,
  HeartColored,
  LinkColored,
  UserShieldColored,
} from '@mochi-ui/icons'
import { useEffect } from 'react'
import { Pie, PieChart } from 'recharts'
import { formatNumber } from '~utils/number'
import { useTransactionSummaryStore } from '../stores'

export const SummarySection = () => {
  const {
    loading: isTransactionSummaryLoading,
    transactionSummary,
    fetchTransactionSummary,
  } = useTransactionSummaryStore()

  useEffect(() => {
    fetchTransactionSummary()
  }, []) // eslint-disable-line

  const loading = isTransactionSummaryLoading || !transactionSummary

  return (
    <div className="bg-background-level2 p-3 lg:py-14 lg:px-30">
      <div className="grid lg:grid-cols-12 gap-4">
        <div className="col-span-12 bg-background-body rounded-xl border border-divider p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-4 w-full lg:w-auto">
            <div className="flex flex-col-4">
              <div className="flex gap-3 items-center">
                <div className="rounded-full bg-success-solid py-1 px-2 flex items-center gap-1.5 ">
                  <div className="w-1.5 h-1.5 rounded-full bg-white-solid outline outline-2 outline-white-solid/50 animate-pulse" />
                  <Typography level="p6" className="text-white-solid">
                    Live
                  </Typography>
                </div>
                <Typography level="h6">Current Transactions</Typography>
              </div>
            </div>
            <Typography level="h2" className="text-text-primary">
              {loading ? (
                <Skeleton className="w-64 h-14" />
              ) : (
                formatNumber(transactionSummary.current_transactions)
              )}
            </Typography>
            <div className="flex gap-2 items-center">
              {loading ? (
                <Skeleton className="w-24 h-8" />
              ) : (
                <>
                  <Typography level="h5" className="!text-primary-solid">
                    {formatNumber(
                      transactionSummary.transactions_per_second || 0,
                    )}
                  </Typography>
                  <Typography className="text-text-secondary">
                    transactions per second
                  </Typography>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 w-full lg:w-auto">
            {loading ? (
              <Skeleton className="w-[150px] h-[150px] rounded-full" />
            ) : (
              <div className="flex gap-4 items-center">
                <div className="-m-4">
                  <PieChart
                    width={180}
                    height={180}
                    margin={{
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  >
                    <Pie
                      data={[
                        {
                          value: transactionSummary.success_transactions,
                          fill: '#088752',
                        },
                        {
                          value: transactionSummary.fail_transactions,
                          fill: '#E02D3C',
                        },
                      ]}
                      dataKey="value"
                      stroke="none"
                      startAngle={-270}
                      endAngle={90}
                    />
                  </PieChart>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-danger-solid" />
                    <Typography level="p5">Failed</Typography>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-success-solid" />
                    <Typography level="p5">Success</Typography>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {(
          [
            [
              HeartColored,
              'tips given',
              `${utils.formatDigit({
                value: transactionSummary?.tips_given || 0,
                shorten: true,
              })}+`,
            ],
            [
              DollarColored,
              'total volume',
              `${utils.formatUsdDigit(transactionSummary?.total_volume || 0)}+`,
            ],
            [
              UserShieldColored,
              'active users',
              `${utils.formatDigit({
                value: transactionSummary?.active_users || 0,
                shorten: true,
              })}+`,
            ],
            [
              LinkColored,
              'networks',
              `${utils.formatDigit({
                value: transactionSummary?.total_networks || 0,
                shorten: true,
              })}+`,
            ],
          ] as [any, string, string][]
        ).map(([Icon, title, value], index) => (
          <div
            key={index}
            className="col-span-12 md:col-span-6 xl:col-span-3 p-8 bg-background-body rounded-xl border border-divider"
          >
            <div className="flex gap-8 items-center">
              <div className="flex-shrink-0">
                <Icon width={40} height={40} />
              </div>
              <div className="flex flex-col gap-2">
                <Typography level="h8" className="!text-text-secondary">
                  {title}
                </Typography>
                <Typography level="h4">
                  {loading ? <Skeleton className="w-32 h-8" /> : value}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}