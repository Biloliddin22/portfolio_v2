import DownloadLink from './DownloadLink'
import VideoPlayer from './VideoPlayer'
import FamilyTreeViewer, { familyTreeImage } from './FamilyTreeViewer'
import TechnologyTags from './TechnologyTags'
import { projects } from '../data/projects'

const mediaPath = '/bilkin-media'
const project = projects.find(({ id }) => id === 'bilkin')
const versions = ['1.0.1', '1.0.0']
const actionClass = 'nav-lift inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-3.5 py-2 text-sm font-semibold'

const copy = {
  en: {
    back: 'Back to projects',
    examples: 'Export examples',
    exampleDescription: 'A family tree exported from BilKin in two formats.',
    video: 'Video presentation',
    videoLanguage: 'Russian',
    versions: 'Windows downloads',
    requirements: 'Requires .NET Framework 4.8 or later. The installers are unsigned.',
    latest: 'Recommended',
    releaseNotes: ['Improved family navigation and relationship editing.', 'Initial release with family trees, photos, and exports.'],
    download: 'Download',
  },
  ru: {
    back: 'Назад к проектам',
    examples: 'Примеры экспорта',
    exampleDescription: 'Семейное дерево, экспортированное из BilKin в двух форматах.',
    video: 'Видеопрезентация',
    videoLanguage: 'На русском',
    versions: 'Скачать для Windows',
    requirements: 'Требуется .NET Framework 4.8 или новее. Установщики без цифровой подписи.',
    latest: 'Рекомендуемая версия',
    releaseNotes: ['Улучшена навигация по дереву и редактирование родственных связей.', 'Первая версия с семейными деревьями, фотографиями и экспортом.'],
    download: 'Скачать',
  },
  uz: {
    back: 'Loyihalarga qaytish',
    examples: 'Eksport namunalari',
    exampleDescription: 'BilKin dasturidan ikki formatda eksport qilingan shajara.',
    video: 'Video taqdimot',
    videoLanguage: 'Rus tilida',
    versions: 'Windows uchun yuklab olish',
    requirements: '.NET Framework 4.8 yoki yangirog‘i talab qilinadi. O‘rnatish fayllari raqamli imzolanmagan.',
    latest: 'Tavsiya etilgan versiya',
    releaseNotes: ['Shajara bo‘ylab harakatlanish va qarindoshlik aloqalarini tahrirlash yaxshilandi.', 'Shajara, suratlar va eksport imkoniyatlari bilan birinchi versiya.'],
    download: 'Yuklab olish',
  },
}

function DownloadIcon() {
  return (
    <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12m-4-4 4 4 4-4M4 16v4h16v-4" />
    </svg>
  )
}

function BilKinPage({ language }) {
  const text = copy[language]

  return (
    <main data-repeat-reveals="" className="mx-auto grid max-w-4xl gap-8 px-5 py-8 sm:gap-12 sm:px-6 sm:py-14">
      <div data-reveal="">
        <a href="/#projects" className={actionClass}>
          <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5m6-6-6 6 6 6" />
          </svg>
          {text.back}
        </a>
        <div className="mt-5 flex items-start gap-4 sm:items-center sm:gap-6">
          <img src={`${mediaPath}/logo.png`} width={220} height={203} alt="" className="w-14 shrink-0 sm:w-20" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">BilKin</h1>
            <p className="mt-3 max-w-[60ch] text-pretty leading-relaxed text-secondary">{project.text[language].description}</p>
            <div className="mt-4"><TechnologyTags items={project.technologies} /></div>
          </div>
        </div>
      </div>

      <section data-reveal="" aria-labelledby="bilkin-video-title" className="rounded-3xl border border-border bg-surface p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="bilkin-video-title" className="text-xl font-bold tracking-tight">{text.video}</h2>
          <span className="text-sm text-secondary">{text.videoLanguage}</span>
        </div>
        <VideoPlayer language={language} titleId="bilkin-video-title" />
      </section>

      <section data-reveal="" aria-labelledby="bilkin-versions-title">
        <h2 id="bilkin-versions-title" className="text-2xl font-bold tracking-tight">{text.versions}</h2>
        <p className="mt-2 text-sm leading-relaxed text-secondary">{text.requirements}</p>
        <ul className="mt-4 grid gap-3">
          {versions.map((version, index) => {
            const file = `${mediaPath}/BilKin-${version}-Setup.exe`
            return (
              <li key={version} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-4 sm:px-5">
                <div>
                  <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold">
                    <span>BilKin {version}</span>
                    {index === 0 && <span className="rounded-full bg-accent-light px-2.5 py-1 text-xs font-medium text-accent">{text.latest}</span>}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-secondary">{text.releaseNotes[index]}</p>
                </div>
                <DownloadLink href={file} className={actionClass} aria-label={`${text.download} BilKin ${version}`}>
                  <DownloadIcon />
                  {text.download}
                </DownloadLink>
              </li>
            )
          })}
        </ul>
      </section>
      <section data-reveal="" aria-labelledby="bilkin-examples-title" className="rounded-3xl border border-border bg-surface p-4 sm:p-6">
        <h2 id="bilkin-examples-title" className="text-xl font-bold tracking-tight">{text.examples}</h2>
        <p className="mt-2 text-sm leading-relaxed text-secondary">{text.exampleDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <DownloadLink href={`${mediaPath}/family-tree-example.pdf`} className={actionClass}>
            <DownloadIcon /> {text.download} PDF
          </DownloadLink>
          <DownloadLink href={familyTreeImage} className={actionClass}>
            <DownloadIcon /> {text.download} PNG
          </DownloadLink>
        </div>
        <FamilyTreeViewer language={language} caption={project.text[language].previewCaption} className="mt-5" />
      </section>
    </main>
  )
}

export default BilKinPage
