import { Helmet } from "react-helmet"

const SITE_NAME = "Preproute"
const SITE_URL = "https://preproute-production-f679.up.railway.app"
const DEFAULT_DESCRIPTION =
  "Preproute helps learners prepare smarter with structured prep tests, topics, and progress-focused practice."

type SeoProps = {
  title: string
  description?: string
  path?: string
  noIndex?: boolean
}

const getCanonicalUrl = (path: string): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return new URL(normalizedPath, SITE_URL).toString()
}

const Seo = ({ title, description = DEFAULT_DESCRIPTION, path = "/", noIndex = false }: SeoProps) => {
  const canonicalUrl = getCanonicalUrl(path)
  const robots = noIndex ? "noindex, nofollow" : "index, follow"

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default Seo
