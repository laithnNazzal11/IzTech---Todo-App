import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser, signIn, imageToBase64, type SignUpData, type SignInData } from '@/utils/auth'

export interface UseAuthReturn {
  signUp: (data: SignUpData, avatarFile?: File) => Promise<void>
  signIn: (data: SignInData) => Promise<void>
  isLoading: boolean
  error: string | null
  clearError: () => void
}

/**
 * Custom hook for authentication operations
 */
export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const clearError = () => {
    setError(null)
  }

  const signUp = async (data: SignUpData, avatarFile?: File): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      // Mock loading delay of 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Convert avatar file to base64 if provided
      let avatarBase64: string | undefined
      if (avatarFile) {
        avatarBase64 = await imageToBase64(avatarFile)
      }

      // Create user with avatar
      const userData: SignUpData = {
        ...data,
        avatar: avatarBase64,
      }

      // Create user (this will validate and save to localStorage)
      createUser(userData)

      // Navigate to dashboard on success
      navigate('/dashboard')
    } catch (err) {
      // Set error message
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during signup'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signInUser = async (data: SignInData): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      // Mock loading delay of 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sign in user (this will validate credentials and set current user)
      signIn(data)

      // Navigate to dashboard on success
      navigate('/dashboard')
    } catch (err) {
      // Set error message
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during signin'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    signUp,
    signIn: signInUser,
    isLoading,
    error,
    clearError,
  }
}

