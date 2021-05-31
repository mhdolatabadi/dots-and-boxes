export const SUPPORT_USER_ID = ''

const privilegedUsers = new Set([
  'related-user-id', // @custom_user_id
  SUPPORT_USER_ID, // @custom_user_id
])

export const hasAccessPrivilege = userId => privilegedUsers.has(userId)
