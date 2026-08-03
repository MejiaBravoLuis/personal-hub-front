import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
  type SpringOptions,
} from 'motion/react'
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from 'react'
import { cn } from '@/utils/cn'

export type DockItemData = {
  icon: ReactNode
  label: ReactNode
  onClick: () => void
  className?: string
  active?: boolean
}

export type DockProps = {
  items: DockItemData[]
  className?: string
  distance?: number
  panelHeight?: number
  baseItemSize?: number
  dockHeight?: number
  magnification?: number
  spring?: SpringOptions
}

type DockItemProps = {
  className?: string
  children: ReactNode
  onClick?: () => void
  mouseX: MotionValue<number>
  spring: SpringOptions
  distance: number
  baseItemSize: number
  magnification: number
  label?: ReactNode
  active?: boolean
}

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
  label,
  active = false,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isHovered = useMotionValue(0)

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    }
    return val - rect.x - baseItemSize / 2
  })

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
  )
  const size = useSpring(targetSize, spring)

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative inline-flex items-center justify-center rounded-full border border-[var(--dock-border)] bg-[var(--dock-item)] text-[var(--dock-icon)] shadow-[var(--shadow-sm)] transition-colors',
        active && 'bg-[var(--dock-item-active)] ring-2 ring-[var(--accent)]/40',
        className,
      )}
      tabIndex={0}
      role="button"
      aria-label={typeof label === 'string' ? label : undefined}
      aria-current={active ? 'page' : undefined}
    >
      {Children.map(children, (child) =>
        isValidHoverChild(child)
          ? cloneElement(child, { isHovered })
          : child,
      )}
    </motion.div>
  )
}

function isValidHoverChild(
  child: ReactNode,
): child is ReactElement<{ isHovered?: MotionValue<number> }> {
  return !!child && typeof child === 'object' && 'type' in child
}

type DockLabelProps = {
  className?: string
  children: ReactNode
  isHovered?: MotionValue<number>
}

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) return
    const unsubscribe = isHovered.on('change', (latest) => {
      setIsVisible(latest === 1)
    })
    return () => unsubscribe()
  }, [isHovered])

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'absolute -top-6 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--dock-label-bg)] px-2 py-0.5 text-xs text-[var(--dock-label)] shadow-[var(--shadow-sm)]',
            className,
          )}
          role="tooltip"
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

type DockIconProps = {
  className?: string
  children: ReactNode
  isHovered?: MotionValue<number>
}

function DockIcon({ children, className = '' }: DockIconProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {children}
    </div>
  )
}

/** React Bits Dock — adapted to Hubify CSS theme tokens */
export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 64,
  distance = 160,
  panelHeight = 64,
  dockHeight = 220,
  baseItemSize = 44,
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification],
  )
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  return (
    <motion.div
      style={{ height, scrollbarWidth: 'none' }}
      className="mx-2 flex max-w-full items-center"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1)
          mouseX.set(pageX)
        }}
        onMouseLeave={() => {
          isHovered.set(0)
          mouseX.set(Infinity)
        }}
        className={cn(
          'absolute bottom-2 left-1/2 flex w-fit -translate-x-1/2 items-end gap-3 rounded-2xl border border-[var(--dock-border)] bg-[var(--dock-bg)] px-3 pb-2 shadow-[var(--shadow-lg)] backdrop-blur-xl',
          className,
        )}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Navegación principal"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
            active={item.active}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  )
}
