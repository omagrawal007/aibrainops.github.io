/// <reference types="node" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import tailwindcssNesting from '@tailwindcss/nesting';
import matter from 'gray-matter';

// Vite plugin to handle markdown files
function markdownPlugin() {
  return {
    name: 'markdown-loader',
    transform(code: string, id: string) {
      if (!id.endsWith('.md')) return null;
      
      try {
        const { data, content } = matter(code);
        return `export const frontmatter = ${JSON.stringify(data)};
                export const content = ${JSON.stringify(content)};`;
      } catch (e) {
        console.error(`Error processing markdown file: ${id}`, e);
        return null;
      }
    },
  };
}

export default defineConfig({
  base: '/', // custom domain uses root; ensures correct asset paths on GitHub Pages
  plugins: [
    react(),
    markdownPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        tailwindcssNesting(),
        tailwindcss({
          config: './tailwind.config.js',
        }),
        autoprefixer(),
      ],
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    include: ['@heroicons/react', 'react-router-dom'],
  },
});
