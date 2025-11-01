export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

export const AIQUAA_REQ_LINT_URL =
  process.env.NEXT_PUBLIC_AIQUAA_REQ_LINT_URL || 'http://localhost:8000/labs/req-lint'

export const AIQUAA_RISK_MATRIX_URL =
  process.env.NEXT_PUBLIC_AIQUAA_RISK_MATRIX_URL || 'http://localhost:8000/labs/risk-matrix'

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AIQUAA Test Management'

export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'

export const ITEMS_PER_PAGE = 20

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const ALLOWED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'application/pdf',
  'text/plain',
  'application/json',
  'text/csv',
]

export const DEBOUNCE_DELAY = 300

export const TOAST_DURATION = 3000
