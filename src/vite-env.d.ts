/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_AUTH_URL: string;
  readonly VITE_APP_IMG_URL: string;
  readonly VITE_APP_WS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
