# Resume site

A personal resume site built with [Astro](https://astro.build/) and deployed to [Vercel](https://vercel.com/docs/frameworks/astro). It has a home page (intro, experience, selected work, skills and education), one page per project, and a downloadable PDF résumé.

The look comes from the **Ore** design system: colours, type and spacing are tokens in `src/styles/global.css`.

## Editing your site

| To change…                            | Edit                                                       |
| :------------------------------------ | :--------------------------------------------------------- |
| Name, role, summary, contact links    | `src/data/profile.ts`                                      |
| Experience, skills, education         | `src/data/profile.ts`                                      |
| The downloadable résumé               | Replace `public/resume.pdf` with your own PDF (same name)  |
| Your portrait                         | Put an image in `public/` and set `portrait` in `profile.ts` (e.g. `'/portrait.jpg'`) |
| Projects ("Things I've made")         | Markdown files in `src/content/projects/`                  |
| Colours and fonts                     | `src/styles/global.css`                                    |

### Adding a project

1. Copy `src/content/projects/example-project.md` to a new file, e.g. `my-app.md`. The file name becomes the page address: `/work/my-app/`.
2. Fill in the front matter between the `---` lines (title, summary, date, tags, role, tools, links). Astro checks these fields when it builds, so a typo or a missing field shows up as a clear error.
3. Optional cover image: put it in `src/assets/projects/` and set `cover: ../../assets/projects/my-app.jpg` plus `coverAlt`. Without one, the card shows a coloured placeholder.
4. Write the case study below the front matter in ordinary Markdown.
5. `order: 1` puts a project first; projects without `order` are sorted newest first.

## How it's put together

Astro has no built-in UI kit: each piece of the page is a small `.astro` component (HTML plus a little script at the top), which you can open and edit directly.

```
src/
├── components/
│   ├── Header.astro          name + email, LinkedIn, GitHub
│   ├── NavBar.astro          menu and the Résumé PDF button
│   ├── DownloadButton.astro  the PDF download button used everywhere
│   ├── ExperienceItem.astro  one job in the Experience list
│   ├── ProjectCard.astro     one card in the work grid
│   └── Skills.astro          Skills and Education
├── content/projects/         one Markdown file per project
├── content.config.ts         the fields every project must have
├── data/profile.ts           your details
├── layouts/Layout.astro      page shell: <head>, header and menu
├── pages/
│   ├── index.astro           home page  →  /
│   └── work/[slug].astro     project page  →  /work/<file-name>/
└── styles/global.css         design tokens and shared styles
public/                       files served as-is: resume.pdf, fonts, favicon
```

Built-in Astro features used here:

- **Layouts and `<slot />`**: every page is wrapped in `Layout.astro`.
- **Content collections**: `src/content.config.ts` turns the Markdown files into typed data.
- **`getStaticPaths()`**: `work/[slug].astro` generates one page per project at build time.
- **`<Image>`** from `astro:assets`: project covers are resized and optimised automatically (on Vercel through its image service).

## Commands

| Command           | Action                                              |
| :---------------- | :-------------------------------------------------- |
| `npm install`     | Install dependencies                                |
| `npm run dev`     | Start the local dev server at `localhost:4321`      |
| `npm run check`   | Type-check pages, components and project files      |
| `npm run build`   | Build the site into `./dist/`                       |
| `npm run preview` | Preview the build locally                           |

Use `npm run dev` to work on the site locally. Project cover images in a production build go through Vercel's image service, so they only appear once the site is deployed on Vercel.
