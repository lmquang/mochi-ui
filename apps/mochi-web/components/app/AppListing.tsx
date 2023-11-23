import {
  Button,
  ColumnProps,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  Typography,
} from '@consolelabs/core'
import { IconThreeDot } from '@consolelabs/icons'
import Link from 'next/link'
import { ViewApplication } from '~types/mochi-pay-schema'

interface Props {
  apps?: ViewApplication[]
}

const Name: ColumnProps<ViewApplication>['cell'] = (props) => (
  <div className="flex items-center space-x-3.5">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img alt="" src={props.row.original.avatar} width={40} height={40} />
    <Link href={`app/${props.row.original.id}`}>
      <Typography level="body-sm" className="font-bold">
        {props.row.original.name}
      </Typography>
    </Link>
  </div>
)

const Actions: ColumnProps<ViewApplication>['cell'] = () => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center justify-center w-6 h-6 border rounded-full border-neutral-300">
      <IconThreeDot width={15} height={15} />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>Copy API key</DropdownMenuItem>
      <DropdownMenuItem>Invite</DropdownMenuItem>
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

export const AppListing = ({ apps = [] }: Props) => {
  return (
    <div className="mt-8">
      <Typography level="title-md" color="textPrimary">
        My Applications
      </Typography>
      {apps?.length ? (
        <div>
          <Table
            columns={[
              {
                header: 'Name',
                accessorKey: 'name',
                cell: Name,
              },
              {
                header: 'Platforms',
                accessorKey: 'platforms',
                accessorFn: (row) => row.platforms?.join(', ') || '',
              },
              {
                header: 'Last Modified',
                accessorKey: 'lastModified',
              },
              {
                header: '',
                accessorKey: 'action',
                cell: Actions,
              },
            ]}
            data={apps}
          />
        </div>
      ) : (
        <div>
          <Typography
            level="body-sm"
            color="textSecondary"
            className="flex gap-1"
          >
            <Typography level="title-sm" color="textSecondary">
              You don’t have any applications yet.
            </Typography>
            Please{' '}
            <button className="text-primary-plain-fg">Create an app</button> to
            get started.
          </Typography>
          <Button variant="outline" size="sm" className="mt-6">
            Read the docs
          </Button>
        </div>
      )}
    </div>
  )
}
