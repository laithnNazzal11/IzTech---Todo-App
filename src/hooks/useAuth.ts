import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser, imageToBase64, type SignUpData } from '@/utils/auth'
import type { User } from '@/types'

export interface UseAuthReturn {
  signUp: (data: SignUpData, avatarFile?: File) => Promise<void>
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

  return {
    signUp,
    isLoading,
    error,
    clearError,
  }
}

