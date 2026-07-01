import { defineConfig } from '@playwright/test'

export default defineConfig({
    testDir: '.',
    timeout: 120_000,
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
    },
    workers: 1,
})
