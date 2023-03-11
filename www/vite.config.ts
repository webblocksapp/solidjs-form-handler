import { createHtmlPlugin } from 'vite-plugin-html';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      solidPlugin(),
      tsconfigPaths({ root: __dirname }),
      createHtmlPlugin({
        template: 'index.html',
        inject: {
          data: {
            domain: 'https://www.solid-form-handler.com',
            adSenseScript:
              mode === 'production'
                ? `
                  <script 
                    async 
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5056055199537470"
                    crossorigin="anonymous">
                  </script>
                `
                : '',
          },
        },
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets/images/solid-form-handler.png',
            dest: 'images',
          },
        ],
      }),
    ],
    server: { port: 4000 },
    build: {
      sourcemap: true,
      target: 'esnext',
    },
  };
});
