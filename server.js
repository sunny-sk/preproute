import path from "path"
import { fileURLToPath } from "url"

import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3000
const BACKEND_URL =
  process.env.BACKEND_URL ||
  "https://admin-moderator-backend-staging.up.railway.app"

// Forward /api/* to the backend server-side, so the browser only ever talks to
app.use(
  createProxyMiddleware({
    pathFilter: "/api",
    target: BACKEND_URL,
    changeOrigin: true,
  })
)

// Serve the built static assets.
const distDir = path.join(__dirname, "dist")
app.use(express.static(distDir))

// SPA fallback: any non-file, non-/api route returns index.html so client-side
// routing works on refresh / deep links.
app.use((_req, res) => {
  res.sendFile(path.join(distDir, "index.html"))
})

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}, proxying /api -> ${BACKEND_URL}`)
})
