import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/react-week6/" : "/", // 加入此段程式碼
  plugins: [react()],
});
