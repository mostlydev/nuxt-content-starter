# Nuxt Content Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

## Tech Stack

- **Nuxt 3** - Vue.js framework for server-side rendering and static site generation
- **@nuxt/content v3.3** - Content management system for Nuxt
- **@nuxtjs/tailwindcss v4** - Tailwind CSS integration for Nuxt
- **PNPM** - Package manager
- **Nuxi** - Nuxt CLI for module management

## Project Structure

1. Content is stored as Markdown files in the `/content` directory:
   - Main pages are directly in `/content` (about.md, contact.md)
   - Blog posts are in `/content/blog/`

2. Key routing files:
   - `pages/index.vue` renders the homepage content from `/content/index.md`
   - `pages/[...slug].vue` handles all other content routes using dynamic routing

3. Important files:
   - `/assets/css/tailwind.css` - Main CSS styling
   - `/layouts/default.vue` - Base layout with navigation and footer
   - `/components/content` - Content-specific components
   - `/tailwind.config.ts` - Tailwind configuration

## Setup

Make sure to install dependencies:

```bash
# pnpm (recommended)
pnpm install

# npm
npm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm (recommended)
pnpm dev

# npm
npm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Adding New Modules

To add new Nuxt modules:

```bash
npx nuxi add <module>
```

## Content Management

Content is written in Markdown with support for [MDC (Markdown Components)](https://content.nuxtjs.org/guide/writing/mdc). Always use block component syntax in content files.

## Styling Guidelines

- Use `/tailwind.config.ts` or `/assets/css/tailwind.css` to extend Tailwind CSS
- Use zinc color palette for grays
- Follow the existing component patterns for consistency

## Production

Build the application for production:

```bash
# pnpm (recommended)
pnpm build

# npm
npm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# pnpm (recommended)
pnpm preview

# npm
npm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
