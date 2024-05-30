/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WEATHERAPI_API_KEY: string;
  readonly SERPAPI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
