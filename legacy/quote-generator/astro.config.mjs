import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: netlify(),
  vite: {
    ssr: {
      noExternal: [
        "@hrc/material-icons",
        "@hrc/toggle-theme",
      ],
    },
  },
});
