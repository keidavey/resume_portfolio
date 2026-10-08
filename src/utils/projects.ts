import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

/** Projects with an `order` come first (lowest first), then the rest by newest date. */
export function sortProjects(projects: Project[]): Project[] {
	return [...projects].sort((a, b) => {
		const orderA = a.data.order ?? Infinity;
		const orderB = b.data.order ?? Infinity;
		if (orderA !== orderB) return orderA - orderB;
		return b.data.date.getTime() - a.data.date.getTime();
	});
}
