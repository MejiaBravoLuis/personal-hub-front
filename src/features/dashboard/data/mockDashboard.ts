import { MOCK_TRACKS } from '@/features/spotify/data/mockTracks'
import { ROUTES } from '@/constants'

/** Dashboard mock snapshot — replace with live module stores later */
export const dashboardSpotify = {
  isPlaying: false,
  track: MOCK_TRACKS[0],
  path: ROUTES.spotify,
}

export const dashboardInstagram = {
  path: ROUTES.instagram,
  unreadCount: 7,
  messages: [
    {
      id: '1',
      from: 'maya.studio',
      preview: '¿Te gustó el set de hoy?',
      time: '2m',
    },
    {
      id: '2',
      from: 'leo.frames',
      preview: 'Te envió una foto',
      time: '18m',
    },
    {
      id: '3',
      from: 'nova.archive',
      preview: 'Respuesta a tu story',
      time: '1h',
    },
  ],
}

export const dashboardReminders = [
  {
    id: 'r1',
    title: 'Enviar avance del lab',
    when: 'Hoy · 17:00',
    source: 'Personal',
  },
  {
    id: 'r2',
    title: 'Revisar brief de UX',
    when: 'Mañana · 10:30',
    source: 'Universidad',
  },
  {
    id: 'r3',
    title: 'Llamar a mamá',
    when: 'Vie · 19:00',
    source: 'Personal',
  },
] as const

export const dashboardCanvas = {
  path: ROUTES.canvas,
  course: 'CS-301 · Estructuras de Datos',
  tasks: [
    {
      id: 't1',
      title: 'Lab 4 · Árboles AVL',
      due: 'Hoy · 23:59',
      urgent: true,
    },
    {
      id: 't2',
      title: 'Reading · Graph traversal',
      due: 'Lun · 09:00',
      urgent: false,
    },
    {
      id: 't3',
      title: 'Quiz prep · Heaps',
      due: 'Mié · 12:00',
      urgent: false,
    },
  ],
}
