import { Children, ReactElement } from 'react'
import { Sidebar } from '@mochi-ui/sidebar'

export function useHasSidebar(children?: React.ReactNode) {
  const childNodes = Children.toArray(children)

  return childNodes.some(
    (node) => (node as ReactElement<any, any>).type === Sidebar,
  )
}
