/// <reference types="astro/client" />

interface ImportMetaEnv {
  FAVQS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
