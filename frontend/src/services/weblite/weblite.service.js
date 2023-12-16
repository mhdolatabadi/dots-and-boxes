import * as api from './weblite.api'

export const getUserId = api.getCurrentUserId

export const showFullImage = api.openImageInModal

export const getUsersWebliteEducationalProfile = async () => {
  const { role, base, major, specialities: specialties } =
    (await api.getUsersEducationalProfile()) || {}

  if (!role) return { role: 'other' }

  return {
    role,
    base: base ? (Array.isArray(base) ? base : [base]) : base,
    specialties: specialties,
    major,
  }
}
