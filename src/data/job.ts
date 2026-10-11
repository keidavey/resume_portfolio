// The shape of one job in the Experience section.
//
// To add a job, create a new file in src/data/jobs/ (copy an existing one)
// that default-exports a Job. Every file in that folder is picked up
// automatically and shown on the home page, newest first.

export interface Job {
	title: string;
	company: string;
	/** When you started, as 'YYYY-MM' (e.g. '2023-04') or just 'YYYY'. */
	start: string;
	/** When you left, in the same format. Leave out for your current job. */
	end?: string;
	highlights: string[];
}

const modules = import.meta.glob<{ default: Job }>('./jobs/*.ts', { eager: true });

/** All jobs: current ones first, then by start date, newest first. */
export const jobs: Job[] = Object.values(modules)
	.map((module) => module.default)
	.sort((a, b) => {
		const endA = a.end ?? '9999';
		const endB = b.end ?? '9999';
		if (endA !== endB) return endB.localeCompare(endA);
		return b.start.localeCompare(a.start);
	});

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Turns '2023-04' into 'Apr 2023' and '2023' into '2023'. */
export function formatJobDate(value: string): string {
	const [year, month] = value.split('-');
	const name = month ? MONTHS[Number(month) - 1] : undefined;
	return name ? `${name} ${year}` : year;
}
