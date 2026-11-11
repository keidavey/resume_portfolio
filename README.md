# Resume site

A personal resume site built with [Astro](https://astro.build/) and deployed to [Vercel](https://vercel.com/docs/frameworks/astro). It has five pages in the menu (Home, About Me, My Work, My Projects and Blog), one page per project and per blog post, and a downloadable PDF résumé.

Colours, fonts and spacing are tokens in `src/styles/global.css`: a white page, one red accent (`#A6210D`), Space Grotesk for headings, Montserrat for labels and buttons, and Lato for body text. The fonts load from Google Fonts in `src/layouts/Layout.astro`.

## Editing your site

| To change…                            | Edit                                                       |
| :------------------------------------ | :--------------------------------------------------------- |
| Name, role, summary, contact links    | `src/data/profile.ts`                                      |
| About Me (bio, skills, education)     | `about` in `src/data/profile.ts`                           |
| Intro lines on My Work / Projects / Blog | `workIntro`, `projectsIntro`, `blogIntro` in `profile.ts` |
| My Work (jobs)                        | `src/data/jobs.json` (see below)                           |
| The downloadable résumé               | Put the PDF in `public/` and set `resumePdf` in `profile.ts` |
| Your portrait                         | Put an image in `public/` and set `portrait` in `profile.ts` (e.g. `'/portrait.jpg'`) |
| My Projects                           | Markdown files in `src/content/projects/` (see below)      |
| Blog posts                            | Markdown files in `src/content/blog/` (see below)          |
| Colours and fonts                     | `src/styles/global.css`                                    |

### Adding a job

All jobs are in one file, `src/data/jobs.json`. Each job is one object in the `jobs` list:

```json
{
	"title": "QA Software Development Engineer",
	"company": "Acme",
	"location": "New York, NY",
	"start": "October 2025",
	"end": "Present",
	"highlights": ["What you owned, and the result it produced."]
}
```

- Dates are "Month Year" with the month written out, e.g. "October 2025".
- For your current job, set `end` to `"Present"` or leave it out.
- `location` is optional.
- Your current job also appears on the Home page, with its first highlight.
- The order in the file doesn't matter: the site shows current jobs first, then newest first.
- Separate jobs with a comma, and don't put a comma after the last one.

When the site builds, `src/data/job.ts` checks every job. A missing field or a date like "Oct 2025" stops the build (and `npm run check`) with a message naming the job and the field.

### Adding a project

1. Copy `src/content/projects/example-project.md` to a new file, e.g. `my-app.md`. The file name becomes the page address: `/projects/my-app/`.
2. Fill in the front matter between the `---` lines (title, summary, date, role, timeline, links). Astro checks these fields when it builds, so a typo or a missing field shows up as a clear error.
3. Optional cover image: put it in `src/assets/projects/` and set `cover: ../../assets/projects/my-app.jpg` plus `coverAlt`. Without one, the card shows a coloured placeholder.
4. Write the case study below the front matter in ordinary Markdown.
5. `order: 1` puts a project first; projects without `order` are sorted newest first. The first three also appear on the Home page.

### Writing a blog post

1. Copy `src/content/blog/example-post.md` to a new file, e.g. `flaky-tests.md`. Its address will be `/blog/flaky-tests/`.
2. Fill in `title`, `summary` and `date`, and write the post below the `---` lines in Markdown. Code blocks are highlighted automatically.
3. Delete `draft: true` (or set it to `false`) to publish. Drafts never appear on the site.

The Blog link in the menu, and the "Latest writing" section on Home, only appear once at least one post is published.

## How it's put together

Astro has no built-in UI kit: each piece of the page is a small `.astro` component (HTML plus a little script at the top), which you can open and edit directly.

```
src/
├── components/
│   ├── Header.astro          name + email, LinkedIn, GitHub
│   ├── NavBar.astro          menu and the Résumé PDF button
│   ├── DownloadButton.astro  the PDF download button used everywhere
│   ├── ExperienceItem.astro  one job (full on My Work, short on Home)
│   ├── ProjectCard.astro     one project card
│   ├── PostRow.astro         one blog post in a list
│   ├── Portrait.astro        your photo, or a placeholder
│   └── SectionHeader.astro   red label + heading + "All …" link
├── content/
│   ├── projects/             one Markdown file per project
│   └── blog/                 one Markdown file per post
├── content.config.ts         the fields every project and post must have
├── data/
│   ├── profile.ts            your details
│   ├── jobs.json             your jobs (Experience section)
│   └── job.ts                checks and sorts the jobs
├── layouts/Layout.astro      page shell: <head>, header and menu
├── pages/
│   ├── index.astro           Home  →  /
│   ├── about.astro           About Me  →  /about/
│   ├── work.astro            My Work  →  /work/
│   ├── projects/index.astro  My Projects  →  /projects/
│   ├── projects/[slug].astro one project  →  /projects/<file-name>/
│   ├── blog/index.astro      Blog  →  /blog/
│   └── blog/[slug].astro     one post  →  /blog/<file-name>/
├── styles/global.css         design tokens and shared styles
└── utils/                    sorting projects; listing posts and reading time
public/                       files served as-is: your résumé PDF, favicon
```

Built-in Astro features used here:

- **File-based routing**: each file in `src/pages/` becomes a page at the matching address.
- **Layouts and `<slot />`**: every page is wrapped in `Layout.astro`.
- **Content collections**: `src/content.config.ts` turns the Markdown files into typed data.
- **`getStaticPaths()`**: `projects/[slug].astro` and `blog/[slug].astro` generate one page per project or post at build time.
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
