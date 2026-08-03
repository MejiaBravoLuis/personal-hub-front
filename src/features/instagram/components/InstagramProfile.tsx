import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import {
  IG_GRID,
  IG_PROFILE,
  toneGradient,
} from '@/features/instagram/data/mockInstagram'

export function InstagramProfile() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-1 py-2 sm:px-2">
      <section className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,color-mix(in_srgb,var(--module-instagram-from)_16%,transparent),transparent_50%),radial-gradient(ellipse_at_100%_0%,color-mix(in_srgb,var(--module-instagram-to)_14%,transparent),transparent_45%)]"
          aria-hidden
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="rounded-full bg-[linear-gradient(135deg,var(--module-instagram-from),var(--module-instagram-to))] p-[2.5px]">
            <div className="rounded-full bg-[var(--surface)] p-0.5">
              <Avatar fallback="HU" size="lg" />
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-xl font-semibold tracking-tight">
                {IG_PROFILE.username}
              </h2>
              <Badge variant="default">Mock</Badge>
            </div>
            <p className="text-sm text-[var(--foreground-muted)]">
              {IG_PROFILE.name} · {IG_PROFILE.bio}
            </p>
            <div className="flex flex-wrap gap-5 text-sm">
              <div>
                <span className="font-semibold">{IG_PROFILE.posts}</span>
                <span className="ml-1 text-[var(--foreground-muted)]">posts</span>
              </div>
              <div>
                <span className="font-semibold">{IG_PROFILE.followers}</span>
                <span className="ml-1 text-[var(--foreground-muted)]">
                  followers
                </span>
              </div>
              <div>
                <span className="font-semibold">{IG_PROFILE.following}</span>
                <span className="ml-1 text-[var(--foreground-muted)]">
                  following
                </span>
              </div>
            </div>
            <Button variant="secondary" size="sm" disabled>
              Conectar cuenta
            </Button>
          </div>
        </div>
      </section>

      <section aria-label="Publicaciones">
        <div className="mb-3 flex items-center justify-between px-1">
          <h3 className="font-display text-sm font-semibold">Publicaciones</h3>
          <span className="text-xs text-[var(--foreground-subtle)]">
            Cuadrícula mock
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1 sm:gap-1.5">
          {IG_GRID.map((item) => (
            <div
              key={item.id}
              className="aspect-square rounded-[var(--radius-sm)]"
              style={{ background: toneGradient(item.tone) }}
              aria-hidden
            />
          ))}
        </div>
      </section>
    </div>
  )
}
