# 🚀 Monorepo Micro-Frontend Architecture with Vite, Nx CLI, and Module Federation 🚀

![freepik__candid-image-photography-natural-textures-highly-r__66949](https://github.com/user-attachments/assets/b47d6ec1-939d-4eb6-bbe4-e8a28d7ea273)

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
