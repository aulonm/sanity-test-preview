/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SANITY_STUDIO_API_DATASET: string;
  readonly SANITY_STUDIO_API_PROJECT_ID: string;
  readonly SANITY_STUDIO_DATASET: string;
  readonly SANITY_STUDIO_APP_URL: string;
  readonly SANITY_STUDIO_APP_URL_SE: string;
  readonly NODE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
