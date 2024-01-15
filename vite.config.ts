import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";

// config_prefix environment
const ENV_PREFIX = [loadEnv("", process.cwd(), "ENV_").ENV_PREFIX];
process.env = { ...process.env, ...loadEnv("", process.cwd(), ENV_PREFIX) };

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.PETKITMON_MODE,
  envPrefix: ENV_PREFIX,
  envDir: process.cwd(),
  plugins: [vue()],
  root: process.cwd(),
  build: {
    cssMinify: true,
    modulePreload: false,
    target: "esnext",
    minify: true,
    cssCodeSplit: false,
    outDir: "dist",
    assetsDir: "",
    sourcemap: true,
    rollupOptions: {
      output: {
        chunkFileNames: `chunk-petkitmon.js`,
        entryFileNames: `petkitmon.js`,
        assetFileNames: `petkitmon.css`,
        minifyInternalExports: true,
        noConflict: true,
        validate: true,
        format: "esm",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes(""))
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
          }
        },
      },
    },
    copyPublicDir: true,
    emptyOutDir: true,
  },
  publicDir: "public",
  clearScreen: true,
  appType: "spa",
  resolve: {
    alias: [
      { find: /^~/, replacement: "" },
      { find: "@", replacement: "/src" },
    ],
  },
  base: process.env.PETKITMON_BASE_PATH,
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        rootpath: process.env.PETKITMON_HOST,
      },
    },
    postcss: {
      plugins: [autoprefixer({ supports: true }), postcssPresetEnv({})],
    },
  },
});

