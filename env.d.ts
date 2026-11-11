/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/vue" />

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    settings?: boolean
    about?: boolean
  }
}
