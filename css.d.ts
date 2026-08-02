// Allow side-effect CSS imports (globals.css, third-party CSS like react-toastify)
// without TS "Cannot find module … side-effect import" (2882).
declare module "*.css";
