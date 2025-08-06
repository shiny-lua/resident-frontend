/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_ZEGOCLOUD_APP_ID: string
  readonly VITE_ZEGOCLOUD_APP_SIGN: string
  readonly VITE_ZEGOCLOUD_SERVER_SECRET: string
  readonly VITE_ZEGOCLOUD_CALLBACK_SECRET: string
  readonly VITE_ZEGOCLOUD_SERVER_URL: string
  readonly VITE_ZEGOCLOUD_BACKUP_SERVER_URL: string
  readonly VITE_MOCK_INTERVIEW_POLLING_INTERVAL: string
  readonly VITE_ENABLE_VIDEO_CALLING: string
  readonly VITE_ENABLE_TRANSCRIPTION: string
  readonly VITE_ENABLE_AI_EVALUATION: string
  readonly VITE_ENABLE_REAL_TIME_UPDATES: string
  readonly VITE_ENVIRONMENT: string
  readonly VITE_DEBUG_MODE: string
  readonly VITE_LOG_LEVEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 