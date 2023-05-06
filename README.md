# nzws.me

[![Node CI](https://github.com/nzws/nzws.me/actions/workflows/nodejs.yml/badge.svg)](https://github.com/nzws/nzws.me/actions/workflows/nodejs.yml)

My website ✨

## Built with

- TypeScript + React + [Next.js 13](https://nextjs.org/)
- [next-mdx-remote](https://npm.im/next-mdx-remote) for markdown rendering
  - [MDX](https://mdxjs.com/) - Markdown + JSX
  - [Unified](https://unifiedjs.com/) - Markdown's pluggable parser
- SCSS - not using any UI framework
- [Vercel](https://vercel.com) for hosting

## Page structures

See also: [nzws.me/visualize](https://nzws.me/visualize)

This website is built with [App Router](https://beta.nextjs.org) and all page components are rendered as Server Component & Static Generation.

- [/](https://nzws.me/) - ISR (fetching github's data)
- [/blog](https://nzws.me/blog) - Build on normal build step
  - /blog/[slug] - Build on normal build step
- [/product](https://nzws.me/product) - Static (WIP)
- /api - Serverless Functions
  - /api/og/[hash]/[base64] - Generate Open Graph image (using [Satori](https://github.com/vercel/satori))
  - /api/search - Search blog posts (using Edge Functions)
  - /api/internal/search-raw - Returns all blog data for the Edge API, Not used directly from the web client.
- [/visualize](https://nzws.me/visualize) - [next-route-visualizer](https://github.com/DiiiaZoTe/next-route-visualizer)

## License

MIT
