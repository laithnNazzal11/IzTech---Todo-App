import { storage, STORAGE_KEYS } from './storage'
import { v4 as uuidv4 } from 'uuid'
import type { User } from '@/types'

/**
 * Gets the current user from localStorage
 * @returns User object if found, null otherwise
 */
export function getCurrentUser(): User | null {
  return storage.get<User>(STORAGE_KEYS.CURRENT_USER)
}

/**
 * Checks if user is authenticated
 * @returns true if CURRENT_USER exists in localStorage, false otherwise
 */
export function isAuth(): boolean {
  const currentUser = getCurrentUser()
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
 * @param file - Image file to convert
 * @param maxSizeMB - Maximum file size in MB (default: 2MB)
 */
export function imageToBase64(file: File, maxSizeMB: number = 2): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check file size (convert MB to bytes)
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      reject(new Error(`Image size must be less than ${maxSizeMB}MB. Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`))
      return
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'))
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        // Check base64 size (localStorage limit is typically 5-10MB per key)
        // Base64 is ~33% larger than original file
        const base64Size = reader.result.length
        const maxBase64Size = 5 * 1024 * 1024 // 5MB limit for base64 string
        if (base64Size > maxBase64Size) {
          reject(new Error('Image is too large after conversion. Please use a smaller image.'))
          return
        }
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
  // If no avatar provided, use default avatar path
  const newUser: User = {
    id: uuidv4(),
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    password: data.password, // In production, this should be hashed
    avatar: data.avatar || '/images/Avatar.png', // Fallback to default avatar
    tasks: [],
    status: [],
  }

  // Add user to array
  users.push(newUser)

  // Save to localStorage
  storage.set(STORAGE_KEYS.USERS, users)

  // Set as current user (authenticate user)
  console.log("newUser",newUser)
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

