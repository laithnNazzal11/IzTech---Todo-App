const STORAGE_KEYS = {
  USERS: 'users',
  CURRENT_USER: 'todo_app_current_user',
  TASKS: 'todo_app_tasks',
  THEME: 'todo_app_theme',
  LANGUAGE: 'todo_app_language',
} as const

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return null
      }
      // Try to parse as JSON first
      try {
        return JSON.parse(item) as T
      } catch {
        // If parsing fails, return the raw string value
        // This handles cases where data was stored as plain string
        return item as T
      }
    } catch {
      return null
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },
  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },
}

export { STORAGE_KEYS }

