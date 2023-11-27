import { Sidebar } from '@consolelabs/sidebar'
import { PageContent } from '@consolelabs/page-content'
import { PageHeader } from '@consolelabs/page-header'
import { Badge } from '@consolelabs/badge'
import { Typography } from '@consolelabs/typography'
import {
  AddUserSolid,
  CodingSolid,
  Discord,
  GameSolid,
  LifeBuoySolid,
  SettingSolid,
  StarSolid,
  SuperGroupSolid,
  TwinkleSolid,
  UserSolid,
  X,
} from '@consolelabs/icons'
import { Layout } from '../src'

const meta = {
  title: 'components/Layout',
  component: Layout,
  tags: ['autodocs'],
}

export default meta

export function Default() {
  return (
    <Layout className="border">
      <Layout tagName="header" className="border-b p-4">
        <Typography level="h1" className="!text-3xl font-semibold">
          Header
        </Typography>
      </Layout>
      <Layout>
        <Sidebar
          footerItems={[
            { title: 'Support', Icon: LifeBuoySolid },
            { title: 'Follow Us', Icon: X },
            { title: 'Join Community', Icon: Discord },
          ]}
          headerItems={[
            {
              title: 'Profile',
              Icon: UserSolid,
              type: 'link',
              badge: <Badge label="New" />,
            },
            {
              title: 'Server Management',
              Icon: Discord,
              badge: (
                <Badge
                  appearance="secondary"
                  icon={<TwinkleSolid />}
                  label="Featured"
                />
              ),
            },
            {
              title: 'App Store',
              Icon: GameSolid,
            },
            { title: 'Settings', Icon: SettingSolid },
            { type: 'break' },
            { title: 'Developer', Icon: CodingSolid, disabled: true },
            {
              title: 'Gift your friend',
              Icon: SuperGroupSolid,
              badge: (
                <Badge
                  appearance="secondary"
                  icon={<TwinkleSolid />}
                  label="Featured"
                />
              ),
            },
            { title: 'Invite Friends', Icon: AddUserSolid },
            { title: 'Feedback', Icon: StarSolid },
            {
              title: 'List',
              badge: (
                <Badge
                  appearance="secondary"
                  icon={<TwinkleSolid />}
                  label="Featured"
                />
              ),
              Icon: StarSolid,
              type: 'list',
              children: [
                { title: 'item 1', disabled: true, type: 'link', href: '/' },
                { title: 'item 2' },
              ],
            },
          ]}
        />

        <Layout className="flex-1 bg-neutral-outline/50">
          <PageHeader
            title="Page Title"
            titleExtra="(2,951 members)"
            description="Lorem ipsum dolor sit amet consectetur. Sed turpis eget sed nullam volutpat integer posuere."
            className="border-b"
          />
          <PageContent containerClassName="bg-background-surface p-6 border rounded-md">
            <Typography level="p4">Content</Typography>
          </PageContent>
        </Layout>
      </Layout>
    </Layout>
  )
}
