import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import { Root } from './Root.tsx'
import { LanguageProvider } from './i18n.tsx'
import { normalizePath } from './routing.ts'

const rootEl = document.getElementById('root')!
const app = (
  <StrictMode>
    <LanguageProvider>
      <Root />
    </LanguageProvider>
  </StrictMode>
)

// Built pages ship with their own content already in #root (see
// scripts/prerender-routes.mjs) and are hydrated. Anything else — the dev
// server, or a path that reached us through the 404.html redirect and so was
// served another page's HTML — is rendered from scratch.
if (rootEl.hasChildNodes() && rootEl.dataset.path === normalizePath(window.location.pathname)) {
  hydrateRoot(rootEl, app)
} else {
  rootEl.replaceChildren()
  createRoot(rootEl).render(app)
}
