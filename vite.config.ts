import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isLibraryMode = mode === 'library';

  return {
    plugins: [
      react(),
      isLibraryMode && dts({
        insertTypesEntry: true,
        include: ['src/index.ts', 'src/components/**/*', 'src/tokens/**/*', 'src/utils/**/*'],
      }),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: isLibraryMode
      ? {
          lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'BelpUiKit',
            formats: ['es', 'umd'],
            fileName: (format) => `belp-ui-kit.${format}.js`,
          },
          rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
          },
        }
      : {
          outDir: 'dist-showcase',
        },
  };
});
