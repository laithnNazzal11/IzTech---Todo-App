export interface User {
  name: string
  email: string
  password: string
  avatar?: string
  tasks: Task[]
  status: Status[]
}

export interface Status {
  id: string
  name: string
  color: string
  userId: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: string
  userId: string
  createdAt: string
  updatedAt: string
  isFavorite?: boolean
}

export type Theme = 'light' | 'dark'
export type Language = 'en' | 'ar'

