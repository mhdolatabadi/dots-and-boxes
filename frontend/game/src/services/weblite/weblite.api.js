/// <reference path="../../../node_modules/@web-lite/api-types/index.d.ts" />

const { W } = window

export const getCurrentUserId = () => prompt('user id')

export const openImageInModal = src => W.images.openModal({ src })

export const getUsersEducationalProfile = () => W.user.getProfile('school')

// export const fetchUserEducationalProfile = () => W.user.getProfile('school')

// TODO: Add getUsersById for more performant version
// export const fetchUserById = userId =>
//   W.users.getById([userId]).then(usersInfo => usersInfo[userId] || {})

// export const openImageInModal = src => W.images.openModal({ src })

// export const upload = (...args) => W.fileSystem.upload(...args)

// export const sendToUsers = ({
//   title,
//   body,
//   type = ['push'],
//   data = {},
//   userIds = [],
// }) => W.notifications.sendToUsers(title, body, type, data, userIds)

// export const openProfile = userId => W.users.openProfile(userId)
export const sendAnalytics = ({ type, ...args }) => W.analytics(type, args)

export const doneDrawer = output => W.wapp.doneDrawer(output)

export const getWisId = () =>
  'lswea13zenV34ed5m361sskh91s1d0n4LnK383kJHiHgF8Nlj23esosdm1f45AXQwl4dsw'
