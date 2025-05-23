import { getAuthToken } from '../auth/userModels'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5004'
const COLLECTION_URL = `${BASE_URL}/collections`

export const fetchUserCollection = async (userId: string) => {
  const token = getAuthToken()
  const res = await fetch(`${COLLECTION_URL}/${userId}`, {
    headers: { 'auth-token': token },
  })
  if (!res.ok) throw new Error('Failed to fetch collection')
  return res.json()
}

export const addCard = async (userId: string, cardId: string, quantity = 1, condition = 'mint') => {
  const token = getAuthToken()
  const res = await fetch(`${COLLECTION_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({ userId, cardId, quantity, condition }),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    console.error('Failed to add card:', error)
    throw new Error(error.message || 'Failed to add card')
  }
}

export const updateCard = async (
  userId: string,
  cardId: string,
  quantity: number,
  condition: string,
) => {
  const token = getAuthToken()
  const res = await fetch(`${COLLECTION_URL}/${userId}/${cardId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
    body: JSON.stringify({ quantity, condition }),
  })
  if (!res.ok) throw new Error('Failed to update card')
}

export const deleteCard = async (userId: string, cardId: string) => {
  const token = getAuthToken()
  const res = await fetch(`${COLLECTION_URL}/${userId}/${cardId}`, {
    method: 'DELETE',
    headers: { 'auth-token': token },
  })
  if (!res.ok) throw new Error('Failed to delete card')
}
