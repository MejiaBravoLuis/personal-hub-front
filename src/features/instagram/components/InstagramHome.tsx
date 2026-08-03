import { useState } from 'react'
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import {
  IG_FEED,
  IG_STORIES,
  toneGradient,
} from '@/features/instagram/data/mockInstagram'
import { cn } from '@/utils/cn'

export function InstagramHome() {
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  return (
    <div className="flex w-full flex-col gap-4 py-1">
      <section
        aria-label="Stories"
        className="w-full rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] px-3 py-3 sm:px-4"
      >
        <ul className="flex w-full gap-4 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {IG_STORIES.map((story) => (
            <li
              key={story.id}
              className="flex w-[4.5rem] shrink-0 flex-col items-center gap-1.5"
            >
              <div
                className={cn(
                  'rounded-full p-[2px]',
                  story.self
                    ? 'bg-[var(--border-strong)]'
                    : story.unseen
                      ? 'bg-[linear-gradient(135deg,var(--module-instagram-from),var(--module-instagram-to))]'
                      : 'bg-[var(--border)]',
                )}
              >
                <div className="rounded-full bg-[var(--surface)] p-0.5">
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
      </section>

      <section
        aria-label="Feed"
        className="mx-auto w-full max-w-xl space-y-4 px-1 sm:px-2"
      >
        {IG_FEED.map((post) => {
          const isLiked = liked[post.id]
          return (
            <article
              key={post.id}
              className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]"
            >
              <header className="flex items-center gap-3 px-4 py-3">
                <Avatar fallback={post.user.slice(0, 2)} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{post.user}</p>
                  <p className="text-[11px] text-[var(--foreground-subtle)]">
                    {post.time}
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-full p-1.5 text-[var(--foreground-muted)] hover:bg-[var(--surface-muted)]"
                  aria-label="Más opciones"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </header>

              <div
                className="aspect-[4/5] w-full sm:aspect-[4/3]"
                style={{ background: toneGradient(post.tone) }}
                aria-hidden
              />

              <div className="space-y-2 px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setLiked((prev) => ({
                        ...prev,
                        [post.id]: !prev[post.id],
                      }))
                    }
                    aria-label={isLiked ? 'Quitar like' : 'Me gusta'}
                    className={cn(
                      'transition-colors',
                      isLiked
                        ? 'text-[var(--module-instagram-to)]'
                        : 'text-[var(--foreground)]',
                    )}
                  >
                    <Heart
                      className={cn('h-5 w-5', isLiked && 'fill-current')}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label="Comentar"
                    className="text-[var(--foreground)]"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Compartir"
                    className="text-[var(--foreground)]"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Guardar"
                    className="ml-auto text-[var(--foreground)]"
                  >
                    <Bookmark className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-sm font-semibold">
                  {isLiked ? 'tú y ' : ''}
                  {post.likes} likes
                </p>
                <p className="text-sm text-[var(--foreground-muted)]">
                  <span className="font-semibold text-[var(--foreground)]">
                    {post.user}
                  </span>{' '}
                  {post.caption}
                </p>
                <button
                  type="button"
                  className="text-xs text-[var(--foreground-subtle)]"
                >
                  Ver los {post.comments} comentarios
                </button>
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
