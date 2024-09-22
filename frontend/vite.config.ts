import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl({
      /** name of certification */
      name: 'faceblock',
      /** custom trust domains */
      domains: ['localhost'],
      /** custom certification directory */
      certDir: '/Users/emmanuel/Desktop/faceblock/backend/certificates/server.crt'
    })
  ],
})
