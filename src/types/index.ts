export interface User {
  id: string
  email: string
  password: string
  avatar?: string
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: string
  userId: string
  createdAt: string
  updatedAt: string
}

export type Theme = 'light' | 'dark'
export type Language = 'en' | 'ar'

