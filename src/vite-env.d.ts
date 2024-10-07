/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_SECURITY_HEADER_KEY: string;
  readonly VITE_SECURITY_HEADER_VALUE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
