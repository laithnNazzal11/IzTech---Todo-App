const STORAGE_KEYS = {
  USERS: 'todo_app_users',
  CURRENT_USER: 'todo_app_current_user',
  TASKS: 'todo_app_tasks',
  THEME: 'todo_app_theme',
  LANGUAGE: 'todo_app_language',
} as const

export const storage = {
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
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

