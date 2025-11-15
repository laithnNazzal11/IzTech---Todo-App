import { storage, STORAGE_KEYS } from './storage'
import type { User } from '@/types'

/**
 * Checks if user is authenticated
 * @returns true if CURRENT_USER exists in localStorage, false otherwise
 */
export function isAuth(): boolean {
  const currentUser = storage.get<User>(STORAGE_KEYS.CURRENT_USER)
  return currentUser !== null && currentUser !== undefined
}

/**
 * Logs out the current user by setting CURRENT_USER to null
 */
export function logout(): void {
  storage.set(STORAGE_KEYS.CURRENT_USER, null)
}

export interface SignUpData {
  name: string
  email: string
  password: string
  avatar?: string
}

export interface SignInData {
  email: string
  password: string
}

export interface SignUpValidationError {
  field: 'name' | 'email' | 'password'
  message: string
}

/*
 * @param data - Signup form data
 */

export function validateSignUp(data: SignUpData): SignUpValidationError[] {
  const errors: SignUpValidationError[] = []

  // Validate name
  if (!data.name || data.name.trim().length === 0) {
    errors.push({
      field: 'name',
      message: 'Name is required',
    })
  }

  // Validate email
  if (!data.email || data.email.trim().length === 0) {
    errors.push({
      field: 'email',
      message: 'Email is required',
    })
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push({
      field: 'email',
      message: 'Invalid email format',
    })
  }

  // Validate password
  if (!data.password || data.password.length < 8) {
    errors.push({
      field: 'password',
      message: 'Password must be at least 8 characters',
    })
  }

  return errors
}

/*
 * Checks if a user name already exists
 */
export function isNameExists(name: string): boolean {
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
  return users.some((user) => user.name.toLowerCase() === name.toLowerCase().trim())
}

/*
 * Checks if an email already exists
*/
export function isEmailExists(email: string): boolean {
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []
  return users.some((user) => user.email.toLowerCase() === email.toLowerCase().trim())
}

/*
 * Converts image file to base64 string for localStorage storage
 */
export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Failed to convert image to base64'))
      }
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/*
 * Creates a new user and saves to localStorage
 */
export function createUser(data: SignUpData): User {
  // Validate input
  const validationErrors = validateSignUp(data)
  if (validationErrors.length > 0) {
    throw new Error(validationErrors[0].message)
  }

  // Check if name already exists
  if (isNameExists(data.name)) {
    throw new Error('Name already exists. Please choose a different name.')
  }

  // Check if email already exists
  if (isEmailExists(data.email)) {
    throw new Error('Email already exists. Please use a different email.')
  }

  // Get existing users
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []

  // Create new user object
  const newUser: User = {
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    password: data.password, // In production, this should be hashed
    avatar: data.avatar || undefined,
    tasks: [],
    status: [],
  }

  // Add user to array
  users.push(newUser)

  // Save to localStorage
  storage.set(STORAGE_KEYS.USERS, users)

  // Set as current user (authenticate user)
  storage.set(STORAGE_KEYS.CURRENT_USER, newUser)

  return newUser
}

/**
 * Signs in a user by checking email and password
 * @param data - Sign in form data (email and password)
 * @returns User object if credentials are correct
 * @throws Error if email or password is incorrect
 */
export function signIn(data: SignInData): User {
  // Get all users
  const users = storage.get<User[]>(STORAGE_KEYS.USERS) || []

  // Find user with matching email and password
  const user = users.find(
    (u) =>
      u.email.toLowerCase().trim() === data.email.toLowerCase().trim() &&
      u.password === data.password
  )

  if (!user) {
    throw new Error('Email or password is incorrect')
  }

  // Set as current user (authenticate user)
  storage.set(STORAGE_KEYS.CURRENT_USER, user)

  return user
}

