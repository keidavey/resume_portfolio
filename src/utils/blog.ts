import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts (drafts left out), newest first. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Rough reading time at ~220 words a minute, never less than 1. */
export function readingMinutes(post: Post): number {
	const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}

/** "November 11, 2026" */
export function formatPostDate(date: Date): string {
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'UTC',
	});
}
