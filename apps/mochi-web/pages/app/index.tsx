import AuthLayout from '~components/auth-layout'
import { NextPageWithLayout } from '~pages/_app'
import { ReactElement } from 'react-markdown/lib/react-markdown'
import { Statistics } from '~cpn/app/Statistics'
import { AppListing } from '~cpn/app/AppListing'
import { useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'
import { API } from '~constants/api'
import useSWR from 'swr'
import { ViewApplicationListResponse } from '~types/mochi-pay-schema'

const App: NextPageWithLayout = () => {
  const { id } = useProfileStore(
    (s) => ({
      id: s.me?.id,
      name: s.me?.profile_name,
      avatar: s.me?.avatar,
    }),
    shallow,
  )
  const { data: apps } = useSWR<ViewApplicationListResponse>(
    ['get-list-apps', id],
    async ([_, id]: [any, string]) => {
      if (!id) return []
      return API.MOCHI_PAY.get(`/profiles/${id}/applications`).json(
        (r) => r ?? [],
      )
    },
  )

  return (
    <div>
      <Statistics apps={apps?.data} />
      <AppListing apps={apps?.data} />
    </div>
  )
}

App.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export default App
