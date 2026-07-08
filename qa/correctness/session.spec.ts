import { test, expect } from '@playwright/test'

const MESSAGES = [
    'What is machine learning in one sentence?',
    'Give me an example of supervised learning.',
    'What is the difference between precision and recall?',
]

test('user session', async ({ page }) => {
    await page.goto('/')

    for (const message of MESSAGES) {
        // type message
        await page.getByPlaceholder('How can I help you today?').fill(message)

        // send
        await page.getByRole('button', { name: 'Send' }).click()

        // wait for streaming to finish — button re-enables when isStreaming = false
        await expect(page.getByRole('button', { name: 'Send' })).toBeEnabled({ timeout: 90_000 })
    }
})
