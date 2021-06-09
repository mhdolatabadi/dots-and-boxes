/// <reference path="@web-lite/api-types/index.d.ts" />

const { W } = window

export const getCurrentUserId = W.user.getId

export const openImageInModal = src => W.images.openModal({ src })

export const getUsersEducationalProfile = () => W.user.getProfile('school')
