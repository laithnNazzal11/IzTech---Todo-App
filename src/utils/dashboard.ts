import { v4 as uuidv4 } from 'uuid'
import { getCurrentUser } from './auth'
import { storage, STORAGE_KEYS } from './storage'
import type { Task, Status, User } from '@/types'

/*
 * Creates a new task and updates localStorage
 */
export async function createTask(taskData: { title: string; description: string; status: string }): Promise<Task[] | null> {
  // Mock loading delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Get current user
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  // Create new task object
  const newTask: Task = {
    id: uuidv4(),
    title: taskData.title.trim(),
    description: taskData.description?.trim() || undefined,
    status: taskData.status,
    userId: currentUser.id,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isFavorite: false,
  }

  // Update current user's tasks array
  const updatedTasks = [...(currentUser.tasks || []), newTask]
  const updatedUser = {
    ...currentUser,
    tasks: updatedTasks,
  }

  // Update localStorage - CURRENT_USER
  storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

  // Update localStorage - USERS array
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? updatedUser : user
  )
  storage.set(STORAGE_KEYS.USERS, updatedUsers)

  return updatedTasks
}

/*
 * Creates a new status and updates localStorage
 */
export async function createStatus(statusData: { title: string; color: string }): Promise<Status[] | null> {
  // Mock loading delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Get current user
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  // Create new status object
  const newStatus: Status = {
    id: uuidv4(),
    name: statusData.title.trim(),
    color: statusData.color,
    userId: currentUser.id,
  }

  // Update current user's status array
  const updatedStatuses = [...(currentUser.status || []), newStatus]
  const updatedUser = {
    ...currentUser,
    status: updatedStatuses,
  }

  // Update localStorage - CURRENT_USER
  storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

  // Update localStorage - USERS array
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? updatedUser : user
  )
  storage.set(STORAGE_KEYS.USERS, updatedUsers)

  return updatedStatuses
}

/*
 * Deletes a status and all tasks with that status, updates localStorage
 */
export async function deleteStatus(statusId: string, statusName: string, statuses: Status[], tasks: Task[]): Promise<{ updatedStatuses: Status[], updatedTasks: Task[] } | null> {
  // Mock loading delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Get current user
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  // Remove status from statuses array
  const updatedStatuses = statuses.filter((status) => status.id !== statusId)

  // Remove all tasks with this status
  const updatedTasks = tasks.filter((task) => task.status !== statusName)

  const updatedUser = {
    ...currentUser,
    status: updatedStatuses,
    tasks: updatedTasks,
  }

  // Update localStorage - CURRENT_USER
  storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

  // Update localStorage - USERS array
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? updatedUser : user
  )
  storage.set(STORAGE_KEYS.USERS, updatedUsers)

  return { updatedStatuses, updatedTasks }
}

/*
 * Toggles task favorite status and updates localStorage
 */
export function toggleTaskFavorite(taskId: string, tasks: Task[]): Task[] | null {
  // Get current user
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  // Update task's favorite status
  const updatedTasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, isFavorite: !task.isFavorite, updatedAt: new Date().toISOString() }
      : task
  )

  const updatedUser = {
    ...currentUser,
    tasks: updatedTasks,
  }

  // Update localStorage - CURRENT_USER
  storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

  // Update localStorage - USERS array
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? updatedUser : user
  )
  storage.set(STORAGE_KEYS.USERS, updatedUsers)

  return updatedTasks
}

/*
 * Changes task status and updates localStorage
 */

export async function changeTaskStatus(taskId: string, newStatus: string, tasks: Task[]): Promise<Task[] | null> {
  // Mock loading delay of 0.5 seconds
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Get current user
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  // Update task's status
  const updatedTasks = tasks.map((task) =>
    task.id === taskId
      ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
      : task
  )

  const updatedUser = {
    ...currentUser,
    tasks: updatedTasks,
  }

  // Update localStorage - CURRENT_USER
  storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

  // Update localStorage - USERS array
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? updatedUser : user
  )
  storage.set(STORAGE_KEYS.USERS, updatedUsers)

  return updatedTasks
}

/*
 * Updates an existing task and updates localStorage
 */
export async function updateTask(taskId: string, taskData: { title: string; description: string; status: string }, tasks: Task[]): Promise<Task[] | null> {
  // Mock loading delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Get current user
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  // Update task
  const updatedTasks = tasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          title: taskData.title.trim(),
          description: taskData.description?.trim() || undefined,
          status: taskData.status,
          updatedAt: new Date().toISOString(),
        }
      : task
  )

  const updatedUser = {
    ...currentUser,
    tasks: updatedTasks,
  }

  // Update localStorage - CURRENT_USER
  storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

  // Update localStorage - USERS array
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? updatedUser : user
  )
  storage.set(STORAGE_KEYS.USERS, updatedUsers)

  return updatedTasks
}

/*
 * Deletes a task and updates localStorage
 */
export async function deleteTask(taskId: string, tasks: Task[]): Promise<Task[] | null> {
  // Mock loading delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Get current user
  const currentUser = getCurrentUser()
  if (!currentUser) return null

  // Remove task from tasks array
  const updatedTasks = tasks.filter((task) => task.id !== taskId)

  const updatedUser = {
    ...currentUser,
    tasks: updatedTasks,
  }

  // Update localStorage - CURRENT_USER
  storage.set(STORAGE_KEYS.CURRENT_USER, updatedUser)

  // Update localStorage - USERS array
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
  const updatedUsers = users.map((user) =>
    user.id === currentUser.id ? updatedUser : user
  )
  storage.set(STORAGE_KEYS.USERS, updatedUsers)

  return updatedTasks
}
