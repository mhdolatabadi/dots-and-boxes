export const HTTP_BACKEND =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:13797'
    : // 'https://noghteh-bazi.wapp.weblite.me/'
      'https://noghteh-bazi.wapp.weblite.me/'
