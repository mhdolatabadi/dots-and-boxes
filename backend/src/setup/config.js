const parseOrigin = (origin) => {
  if (!origin) return process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:3000'
  const origins = origin
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  return origins.length > 1 ? origins : origins[0]
}

module.exports = {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 13797,
    origin: parseOrigin(process.env.CORS_ORIGIN),
  },
}
