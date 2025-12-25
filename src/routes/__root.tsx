import {
  Outlet,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import { SideNavigation } from '../components/dashboard/SideNavigation.tsx'
import { SidebarInset } from '../components/ui/sidebar'

import StoreDevtools from '../lib/demo-store-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import type { QueryClient } from '@tanstack/react-query'
import LandingHeader from '@/components/LandingHeader.tsx'

interface MyRouterContext {
  queryClient: QueryClient
}

// Routes that should use SideNavigation
const dashboardRoutes = ['/dashboard', '/analytics', '/profile', '/community']

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation()
  const isDashboardRoute = dashboardRoutes.includes(location.pathname)

  return (
    <>
      {isDashboardRoute ? (
        <>
          <SideNavigation />
          <SidebarInset>
            <Outlet />
          </SidebarInset>
        </>
      ) : (
        <div className="flex flex-col w-full min-h-screen">
          <LandingHeader />
          <main className="flex-1 w-full">
            <Outlet />
          </main>
        </div>
      )}
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          StoreDevtools,
          TanStackQueryDevtools,
        ]}
      />
    </>
  )
}
