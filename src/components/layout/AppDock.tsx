import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Music2,
  MessageCircle,
  GraduationCap,
  CheckSquare,
  CalendarDays,
  UserRound,
  Settings,
} from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import Dock from '@/components/ui/Dock'
import { ROUTES } from '@/constants'
import { cn } from '@/utils/cn'

const dockItems = [
  { label: 'Dashboard', path: ROUTES.dashboard, icon: LayoutDashboard },
  { label: 'Spotify', path: ROUTES.spotify, icon: Music2 },
  { label: 'Instagram', path: ROUTES.instagram, icon: FaInstagram },
  { label: 'WhatsApp', path: ROUTES.whatsapp, icon: MessageCircle },
  { label: 'Canvas', path: ROUTES.canvas, icon: GraduationCap },
  { label: 'Todos', path: ROUTES.todos, icon: CheckSquare },
  { label: 'Calendario', path: ROUTES.calendar, icon: CalendarDays },
  { label: 'Perfil', path: ROUTES.profile, icon: UserRound },
  { label: 'Ajustes', path: ROUTES.settings, icon: Settings },
] as const

type AppDockProps = {
  className?: string
}

export function AppDock({ className }: AppDockProps) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(0.5rem,env(safe-area-inset-bottom))]',
        className,
      )}
      aria-label="Dock de navegación"
    >
      <div className="pointer-events-auto w-full max-w-[min(100%,52rem)] overflow-x-auto px-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Dock
          items={dockItems.map((item) => {
            const Icon = item.icon
            const active =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`)

            return {
              label: item.label,
              active,
              onClick: () => navigate(item.path),
              icon: <Icon className="h-5 w-5" aria-hidden />,
            }
          })}
          panelHeight={68}
          baseItemSize={42}
          magnification={58}
          distance={140}
        />
      </div>

      {/* Mobile-friendly fallback strip for very small screens */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-0 hidden" aria-hidden>
        {dockItems.map((item) => (
          <Link key={item.path} to={item.path}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
