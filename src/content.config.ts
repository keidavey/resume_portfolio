import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each Markdown file in src/content/projects becomes one card on the home
// page and one page at /work/<file-name>.
const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string(),
			date: z.coerce.date(),
			tags: z.array(z.string()).default([]),
			cover: image().optional(),
			coverAlt: z.string().optional(),
			role: z.string().optional(),
			timeline: z.string().optional(),
			tools: z.array(z.string()).default([]),
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

export const collections = { projects };
