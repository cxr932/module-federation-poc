# Module Federation POC with Vite and Dynamic Remotes

This package is meant to demonstrate how to replace the homegrown module federation implementation with the official one from the `@module-federation` package, while also using Vite as the build tool. All concepts are considered in-flight unless stated otherwise.

## Disorganized points
- embed-v2's current react dependency:
  - Currently demonstrates loading a dynamic remote using `React.lazy` and `react-dom` to embed the components. Bringing down react in the embed script would be too heavy; we need to look into either exposing an embed entry from `applets`, or maybe wrapping each applet in an HOC that bootstraps the necessary functionality to it (much like we do today when registering facets in prism-core). This would hopefully allow embed to remain light and depend fully upon the remote components to do all the work.
- DYNAMIC REMOTES vs STATIC REMOTES
  - I've been leaning toward dynamic remotes as a separate thing, but... why? Clearly we know what the remotes are going to be at build time -- that's when the remote's compiling! Need to try a version where the host app doesn't use react, but rather just loads the remote app (including its react deps) and goes from there. How lightweight can it get?
  - Dynamic remotes give us a lot of flexibility, but we have the control in this environment.

## References:
- [Module Federation plugin used w/ vite](https://www.npmjs.com/package/@originjs/vite-plugin-federation)
  - Note this does not use the @module-federation package, but rather a separate one from @originjs that supports Vite.
- [Blog describing this repo](https://dev.to/hxnain619/monorepo-and-micro-frontends-using-module-federation-vite-1e47)


## The following is from the original demo repository:

Hey everyone! 👋

I recently embarked on an exciting journey to learn and experiment with micro-frontend architecture by creating a monorepo project using Vite and the Nx CLI. The project showcases the power of module federation in modern web development.

### 🔍 What’s Covered in the Blog?

In my blog, I dive deep into:

**Micro-frontend architecture:** Understanding the "what" and "why" behind breaking down a large application into smaller, independently deployable pieces.
**Monorepo setup with Nx CLI:** Streamlining project organization and dependency management for multiple micro-frontends.
**Module Federation:** Unlocking seamless sharing of code and features between micro-frontends.
**Vite configuration:** Leveraging Vite's lightning-fast build system for efficient micro-frontend development.
A detailed walkthrough of how I combined these tools to create a robust and scalable micro-frontend monorepo.

### 💡 Why This Matters?

Micro-frontends are revolutionizing how we think about scalability, maintainability, and collaboration in front-end development. Pairing this with modern tools like Nx CLI and Vite makes development faster and more enjoyable.

### 📖 Check Out the Blog

I’ve explained each concept with practical examples and included all the configuration details to help you get started. Whether you're a beginner or an experienced developer looking to explore micro-frontends, you’ll find valuable insights.

👉 [Read the Blog Here](https://dev.to/hxnain619/monorepo-and-micro-frontends-using-module-federation-vite-1e47)

Let me know your thoughts or if you have any questions! Would love to hear your feedback. 🙌

## Guide to run the Project

Install dependencies using:

```shell
pnpm install
```

To run the dev server for your app, use:

```sh
pnpm run preview:all
```

To create a production bundle:

```sh
pnpm run build:all
```

## Add new projects

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```
