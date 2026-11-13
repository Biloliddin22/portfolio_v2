import { useEffect, useRef, useState } from 'react'
import { notify } from '../notifications'

const copy = {
  en: {
    play: 'Play video', pause: 'Pause', mute: 'Mute', unmute: 'Unmute',
    seek: 'Playback position', volume: 'Volume', fullscreen: 'Full screen', exit: 'Exit full screen',
    rotate: 'Rotate screen', loading: 'Loading video…', error: 'The video could not be played. Try again.',
  },
  ru: {
    play: 'Смотреть видео', pause: 'Пауза', mute: 'Выключить звук', unmute: 'Включить звук',
    seek: 'Позиция воспроизведения', volume: 'Громкость', fullscreen: 'На весь экран', exit: 'Выйти из полноэкранного режима',
    rotate: 'Повернуть экран', loading: 'Загрузка видео…', error: 'Не удалось воспроизвести видео. Попробуйте ещё раз.',
  },
  uz: {
    play: 'Videoni ko‘rish', pause: 'Pauza', mute: 'Ovozni o‘chirish', unmute: 'Ovozni yoqish',
    seek: 'Ijro holati', volume: 'Ovoz balandligi', fullscreen: 'To‘liq ekran', exit: 'To‘liq ekrandan chiqish',
    rotate: 'Ekranni aylantirish', loading: 'Video yuklanmoqda…', error: 'Videoni ijro etib bo‘lmadi. Qayta urinib ko‘ring.',
  },
}

const paths = {
  play: 'm9 5 11 7-11 7V5Z',
  pause: 'M8 5v14M16 5v14',
  volume: 'M11 5 6 9H3v6h3l5 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
  muted: 'M11 5 6 9H3v6h3l5 4V5Zm5 4 5 6m0-6-5 6',
  fullscreen: 'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',
  rotate: 'M3 9a9 9 0 0 1 15-4m0-3v4h-4M21 15a9 9 0 0 1-15 4m0 3v-4h4',
  exit: 'M3 8h5V3m13 5h-5V3M8 21v-5H3m13 5v-5h5',
}

function PlayerIcon({ name }) {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill={name === 'play' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {name === 'rotate' && <rect x="8" y="6" width="8" height="12" rx="1.5" transform="rotate(-20 12 12)" />}
      <path d={paths[name]} />
    </svg>
  )
}

function formatTime(value) {
  const seconds = Math.floor(Number.isFinite(value) ? value : 0)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

const control = 'nav-lift inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-border bg-surface'

function VideoPlayer({ language, titleId }) {
  const text = copy[language]
  const player = useRef(null)
  const video = useRef(null)
  const errorReported = useRef(false)
  const orientationLocked = useRef(false)
  const controls = useRef(null)
  const interaction = useRef(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [activity, setActivity] = useState(0)
  const [rotated, setRotated] = useState(false)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [waiting, setWaiting] = useState(false)
  const [failed, setFailed] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const canFullscreen = !!document.fullscreenEnabled || 'webkitEnterFullscreen' in HTMLVideoElement.prototype

  useEffect(() => {
    const media = video.current
    const updateFullscreen = () => {
      const active = document.fullscreenElement === player.current
      setFullscreen(active)
      if (!active) {
        setRotated(false)
        if (orientationLocked.current) screen.orientation?.unlock?.()
        orientationLocked.current = false
      }
    }
    const restoreControls = () => { media.controls = false }
    document.addEventListener('fullscreenchange', updateFullscreen)
    media.addEventListener('webkitendfullscreen', restoreControls)
    return () => {
      document.removeEventListener('fullscreenchange', updateFullscreen)
      media.removeEventListener('webkitendfullscreen', restoreControls)
      if (orientationLocked.current) screen.orientation?.unlock?.()
    }
  }, [])

  const showControls = !playing || waiting || failed || controlsVisible

  function revealControls() {
    setControlsVisible(true)
    setActivity((value) => value + 1)
  }

  useEffect(() => {
    if (!playing || waiting || failed) return
    const timeout = setTimeout(() => {
      if (!interaction.current && !controls.current?.querySelector(':focus-visible')) setControlsVisible(false)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [playing, waiting, failed, activity])

  function updateDuration() {
    setDuration(Number.isFinite(video.current.duration) ? video.current.duration : 0)
  }

  async function play() {
    const media = video.current
    errorReported.current = false
    if (!media.getAttribute('src')) media.src = '/bilkin-media/presentation-ru.mp4'
    if (failed) media.load()
    setStarted(true)
    setFailed(false)
    setWaiting(true)
    try {
      await media.play()
    } catch (error) {
      if (error.name !== 'AbortError') reportFailure()
    } finally {
      setWaiting(false)
    }
  }

  function reportFailure() {
    setFailed(true)
    setWaiting(false)
    setPlaying(false)
    if (!errorReported.current) notify(navigator.onLine ? 'videoError' : 'videoOffline')
    errorReported.current = true
  }

  async function rotateScreen() {
    try {
      if (document.fullscreenElement !== player.current) await player.current.requestFullscreen()
      const target = screen.orientation?.type?.startsWith('landscape') ? 'portrait' : 'landscape'
      if (!screen.orientation?.lock) throw new Error('Orientation lock unavailable')
      await screen.orientation.lock(target)
      orientationLocked.current = true
      setRotated(false)
    } catch {
      // Desktop browsers and some phones deny orientation locks. Rotate the
      // player inside its existing fullscreen surface instead.
      if (document.fullscreenElement === player.current) setRotated((value) => !value)
    }
  }

  function togglePlayback() {
    if (video.current.paused) {
      play()
    } else {
      video.current.pause()
    }
  }

  function toggleMute() {
    const media = video.current
    media.muted = !(media.muted || media.volume === 0)
    if (media.volume === 0) media.volume = 1
  }

  function changeVolume(event) {
    video.current.volume = Number(event.target.value)
    video.current.muted = false
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement === player.current) {
        await document.exitFullscreen()
      } else if (player.current.requestFullscreen && document.fullscreenEnabled) {
        await player.current.requestFullscreen()
      } else if (video.current.webkitEnterFullscreen) {
        video.current.controls = true
        video.current.webkitEnterFullscreen()
      }
    } catch {
      video.current.controls = false
    }
  }

  return (
    <div ref={player} role="group" aria-labelledby={titleId} tabIndex={started ? 0 : -1} onKeyDown={revealControls} onFocusCapture={revealControls} data-controls-visible={showControls} data-playing={playing} data-rotated={rotated} className="video-player overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="video-player-layout">
        <div className="video-stage relative isolate aspect-video bg-[#faf7f2]" onPointerDown={(event) => {
          if (!started || event.target.closest('.video-start')) return
          if (showControls && playing && !waiting) setControlsVisible(false)
          else revealControls()
        }}>
          <video
            ref={video}
            aria-labelledby={titleId}
            poster="/bilkin-media/video-cover.png"
            preload="none"
            playsInline
            className="block size-full object-cover"
            onPlay={() => setPlaying(true)}
            onPlaying={() => setWaiting(false)}
            onPause={() => { setPlaying(false); setWaiting(false) }}
            onEnded={() => { setPlaying(false); setWaiting(false) }}
            onWaiting={() => setWaiting(true)}
            onLoadedMetadata={updateDuration}
            onDurationChange={updateDuration}
            onTimeUpdate={() => setPosition(video.current.currentTime)}
            onVolumeChange={() => { setVolume(video.current.volume); setMuted(video.current.muted) }}
            onCanPlay={() => setWaiting(false)}
            onSeeking={() => { if (!video.current.paused) setWaiting(true) }}
            onSeeked={() => setWaiting(false)}
            onError={reportFailure}
          />
          {waiting && <div className="video-buffer" role="status"><span className="media-spinner" aria-hidden="true" /><span className="sr-only">{text.loading}</span></div>}
          <div className="video-start absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-5" data-started={started} inert={started}>
            <button
              type="button"
              disabled={started}
              tabIndex={started ? -1 : 0}
              onClick={() => { player.current.focus({ preventScroll: true }); play() }}
              className="nav-lift nav-primary inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap shadow-sm"
            >
              <PlayerIcon name="play" /> {text.play}
            </button>
          </div>
        </div>

        <div ref={controls} hidden={!started} inert={!showControls} className="video-controls p-2 sm:px-3"
          onPointerDown={() => { interaction.current = true; revealControls() }}
          onPointerUp={() => { interaction.current = false; revealControls() }}
          onPointerCancel={() => { interaction.current = false; revealControls() }}
          onLostPointerCapture={() => { interaction.current = false; revealControls() }}
        >
          <input
            type="range"
            min="0"
            max={duration || 1}
            step="0.1"
            value={Math.min(position, duration)}
            disabled={!duration}
            aria-label={text.seek}
            aria-valuetext={`${formatTime(position)} / ${formatTime(duration)}`}
            onChange={(event) => {
              const next = Number(event.target.value)
              video.current.currentTime = next
              setPosition(next)
            }}
            className="video-range block w-full"
          />
          <div className="flex flex-wrap items-center gap-1.5">
            <button type="button" className={control} onClick={togglePlayback} aria-label={playing ? text.pause : text.play} title={playing ? text.pause : text.play}>
              <PlayerIcon name={playing ? 'pause' : 'play'} />
            </button>
            <span className="mr-auto text-xs text-secondary tabular-nums">{formatTime(position)} / {formatTime(duration)}</span>
            <button type="button" className={control} onClick={toggleMute} aria-label={muted || volume === 0 ? text.unmute : text.mute} title={muted || volume === 0 ? text.unmute : text.mute}>
              <PlayerIcon name={muted || volume === 0 ? 'muted' : 'volume'} />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              aria-label={text.volume}
              aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)}%`}
              onChange={changeVolume}
              className="video-range hidden w-20 sm:block"
            />
            {canFullscreen && <button type="button" className={control} onClick={rotateScreen} aria-label={text.rotate} title={text.rotate}><PlayerIcon name="rotate" /></button>}
            {canFullscreen && (
              <button type="button" className={control} onClick={toggleFullscreen} aria-label={fullscreen ? text.exit : text.fullscreen} title={fullscreen ? text.exit : text.fullscreen}>
                <PlayerIcon name={fullscreen ? 'exit' : 'fullscreen'} />
              </button>
            )}
          </div>
        </div>
        <p className="sr-only">{failed ? text.error : ''}</p>
      </div>
    </div>
  )
}

export default VideoPlayer
