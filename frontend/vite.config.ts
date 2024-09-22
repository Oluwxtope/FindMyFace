import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl({
      /** name of certification */
      name: 'FindMyFace',
      /** custom trust domains */
      domains: ['localhost'],
      /** custom certification directory */
      certDir: '/Users/emmanuel/Desktop/find-my-face/backend/certificates/server.crt'
    })
  ],
})
