import redis from './src/redis.js'

await redis.set('city', 'Paris')
await redis.set('language', 'TypeScript')
await redis.set('framework', 'Express')

console.log('Seeded 3 keys: city, language, framework')
redis.disconnect()
