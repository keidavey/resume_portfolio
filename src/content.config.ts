import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each Markdown file in src/content/projects becomes a card on My Projects
// and its own page at /projects/<file-name>/.
const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			date: z.coerce.date(),
			cover: image().optional(),
			coverAlt: z.string().optional(),
			role: z.string().optional(),
			timeline: z.string().optional(),
			links: z
				.object({
					live: z.string().url().optional(),
					repo: z.string().url().optional(),
				})
				.default({}),
			// Lower numbers are shown first; projects without one sort by date.
			order: z.number().optional(),
		}),
});

// Each Markdown file in src/content/blog becomes a post at /blog/<file-name>/.
// Posts with `draft: true` are left out of the site.
const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		summary: z.string(),
		date: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { projects, blog };
