import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { chromeExtension } from 'vite-plugin-chrome-extension'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     input: ['manifest.json'],
  //   }
  // },
  plugins: [svelte()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})
// export default defineConfig(({command}) => {

//   if (command==='serve') {
//     return {
//       root: 'src/popup/',
//       plugins: [svelte()],
//     } 
//   } else {
//     return {
//       build: {
//         rollupOptions: {
//           input: ['src/manifest.json']
//         },
//         minify: false,
//       },
//       plugins: [svelte(), chromeExtension()],
//     }
//   }
  


// }


// )
