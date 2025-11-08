declare module '@tailwindcss/nesting';
declare module '@tailwindcss/nesting' {
  import { PluginCreator } from 'postcss';
  const plugin: PluginCreator<unknown>;
  export default plugin;
}
