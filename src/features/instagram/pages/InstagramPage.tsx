import { motion } from 'motion/react'
import { Heart, MessageCircle, Send, Bookmark, Grid3X3, Film } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { PageHeader } from '@/components/layout/PageHeader'
import { cn } from '@/utils/cn'

const stories = [
  { id: '1', label: 'Tú', self: true },
  { id: '2', label: 'maya' },
  { id: '3', label: 'leo' },
  { id: '4', label: 'studio' },
  { id: '5', label: 'nova' },
  { id: '6', label: 'kai' },
]

const feed = [
  {
    id: '1',
    user: 'studio.light',
    caption: 'Morning light studies · #design',
    likes: '2.4k',
  },
  {
    id: '2',
    user: 'urban.frames',
    caption: 'City grain after rain',
    likes: '891',
  },
  {
    id: '3',
    user: 'soft.archive',
    caption: 'Quiet corners',
    likes: '1.1k',
  },
]

const gridPlaceholders = Array.from({ length: 6 }, (_, i) => i)

export function InstagramPage() {
  return (
    <div data-module="instagram" className="space-y-8">
      <PageHeader
        title="Instagram"
        description="Feed, stories e insights en un módulo Hubify. Todo es mock visual por ahora."
        actions={
          <div className="flex items-center gap-2">
            <Badge variant="default">Sin conectar</Badge>
            <Button variant="secondary" size="sm" disabled>
              Conectar cuenta
            </Button>
          </div>
        }
      />

      {/* Profile strip */}
      <motion.section
        aria-labelledby="ig-profile-heading"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,color-mix(in_srgb,var(--module-instagram-from)_18%,transparent),transparent_50%),radial-gradient(ellipse_at_100%_0%,color-mix(in_srgb,var(--module-instagram-to)_16%,transparent),transparent_45%)]"
          aria-hidden
        />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <div className="rounded-full bg-[linear-gradient(135deg,var(--module-instagram-from),var(--module-instagram-to))] p-[2.5px]">
              <div className="rounded-full bg-[var(--surface)] p-0.5">
                <Avatar fallback="HU" size="lg" />
              </div>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <h2
                id="ig-profile-heading"
                className="font-display text-xl font-semibold tracking-tight"
              >
                hubify.user
              </h2>
              <p className="text-sm text-[var(--foreground-muted)]">
                Perfil simulado · sin OAuth
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <span className="font-semibold text-[var(--foreground)]">128</span>
                <span className="ml-1 text-[var(--foreground-muted)]">posts</span>
              </div>
              <div>
                <span className="font-semibold text-[var(--foreground)]">4.2k</span>
                <span className="ml-1 text-[var(--foreground-muted)]">
                  followers
                </span>
              </div>
              <div>
                <span className="font-semibold text-[var(--foreground)]">310</span>
                <span className="ml-1 text-[var(--foreground-muted)]">
                  following
                </span>
              </div>
            </div>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--module-instagram-from),var(--module-instagram-to))] text-white shadow-[var(--shadow-sm)]">
            <FaInstagram className="h-5 w-5" aria-hidden />
          </div>
        </div>
      </motion.section>

      {/* Stories */}
      <motion.section
        aria-label="Stories"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.35 }}
      >
        <ul className="flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {stories.map((story) => (
            <li
              key={story.id}
              className="flex w-16 shrink-0 flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  'rounded-full p-[2px]',
                  story.self
                    ? 'bg-[var(--border-strong)]'
                    : 'bg-[linear-gradient(135deg,var(--module-instagram-from),var(--module-instagram-to))]',
                )}
              >
                <div className="rounded-full bg-[var(--background)] p-0.5">
                  <Avatar
                    fallback={story.label.slice(0, 2)}
                    size="md"
                    className="!h-14 !w-14"
                  />
                </div>
              </div>
              <span className="w-full truncate text-center text-[11px] text-[var(--foreground-muted)]">
                {story.label}
              </span>
            </li>
          ))}
        </ul>
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Feed preview */}
        <motion.section
          aria-labelledby="feed-heading"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.35 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h2 id="feed-heading" className="font-display text-base font-semibold">
              Feed
            </h2>
            <Badge variant="default">Mock</Badge>
          </div>

          {feed.map((post, index) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <Avatar fallback={post.user.slice(0, 2)} size="sm" />
                <p className="text-sm font-medium">{post.user}</p>
              </div>

              <div
                className={cn(
                  'aspect-[4/3] w-full',
                  index % 2 === 0
                    ? 'bg-[linear-gradient(145deg,color-mix(in_srgb,var(--module-instagram-from)_35%,var(--surface-muted)),var(--surface-muted))]'
                    : 'bg-[linear-gradient(145deg,color-mix(in_srgb,var(--module-instagram-to)_30%,var(--surface-muted)),var(--surface-muted))]',
                )}
                aria-hidden
              />

              <div className="space-y-2 px-4 py-3">
                <div className="flex items-center gap-3 text-[var(--foreground)]">
                  <Heart className="h-5 w-5" aria-hidden />
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  <Send className="h-5 w-5" aria-hidden />
                  <Bookmark className="ml-auto h-5 w-5" aria-hidden />
                </div>
                <p className="text-sm font-medium">{post.likes} likes</p>
                <p className="text-sm text-[var(--foreground-muted)]">
                  <span className="font-medium text-[var(--foreground)]">
                    {post.user}
                  </span>{' '}
                  {post.caption}
                </p>
              </div>
            </article>
          ))}
        </motion.section>

        {/* Grid + insights */}
        <div className="space-y-4">
          <motion.section
            aria-labelledby="grid-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.35 }}
            className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <Grid3X3 className="h-4 w-4 text-[var(--module-instagram-from)]" />
              <h2 id="grid-heading" className="font-display text-base font-semibold">
                Cuadrícula
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {gridPlaceholders.map((item) => (
                <div
                  key={item}
                  className="aspect-square rounded-[var(--radius-sm)] bg-[var(--surface-muted)]"
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--module-instagram-from) ${12 + item * 6}%, var(--surface-muted)), color-mix(in srgb, var(--module-instagram-to) ${10 + item * 4}%, var(--surface-muted)))`,
                  }}
                  aria-hidden
                />
              ))}
            </div>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.35 }}
            className="rounded-[var(--radius-xl)] border border-dashed border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--module-instagram-from)_6%,var(--surface))] p-5"
          >
            <div className="mb-2 flex items-center gap-2">
              <Film className="h-4 w-4 text-[var(--module-instagram-to)]" />
              <p className="text-sm font-medium">Insights después</p>
            </div>
            <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">
              Alcance, guardados y mejores horarios vivirán aquí cuando el
              usuario conecte su propia cuenta — nunca con keys del proyecto.
            </p>
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
