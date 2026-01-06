import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals:true,

    env: {
        NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:5000',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-key',
    }
  },
  resolve: {
    alias: {
        '@': path.resolve(__dirname, './src')
    }
  }
})