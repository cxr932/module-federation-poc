// NOTE: if you want type s for the applets, you need to add them yourself
// (unless I find out otherwise in the future)
declare module 'prism_applets/*' {
  export interface Type {
    subtitle?: string;
  }
  const AppComponent: React.FC<Type>;
  export default AppComponent;
}
