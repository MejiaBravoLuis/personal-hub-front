import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout, AuthLayout } from '@/layouts'
import {
  GuestRoute,
  LoginPage,
  ProtectedRoute,
  RegisterPage,
} from '@/features/auth'
import { DashboardPage } from '@/features/dashboard'
import { ROUTES } from '@/constants'

import { SpotifyPage } from '@/features/spotify/pages/SpotifyPage'
import { InstagramPage } from '@/features/instagram/pages/InstagramPage'
import { WhatsAppPage } from '@/features/whatsapp/pages/WhatsAppPage'
import { CanvasPage } from '@/features/canvas/pages/CanvasPage'
import { TodosPage } from '@/features/todo/pages/TodosPage'
import { CalendarPage } from '@/features/calendar/pages/CalendarPage'
import { ProfilePage } from '@/features/profile/pages/ProfilePage'
import { SettingsPage } from '@/features/settings/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <Navigate to={ROUTES.dashboard} replace />,
  },
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.login, element: <LoginPage /> },
          { path: ROUTES.register, element: <RegisterPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: ROUTES.dashboard, element: <DashboardPage /> },
          { path: ROUTES.spotify, element: <SpotifyPage /> },
          { path: ROUTES.instagram, element: <InstagramPage /> },
          { path: ROUTES.whatsapp, element: <WhatsAppPage /> },
          { path: ROUTES.canvas, element: <CanvasPage /> },
          { path: ROUTES.todos, element: <TodosPage /> },
          { path: ROUTES.calendar, element: <CalendarPage /> },
          { path: ROUTES.profile, element: <ProfilePage /> },
          { path: ROUTES.settings, element: <SettingsPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.dashboard} replace />,
  },
])
