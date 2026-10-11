// The jobs in the Experience section come from src/data/jobs.json.
// This file describes what each job must contain, checks the JSON against
// that when the site builds, and sorts the jobs newest first.

import { z } from 'astro/zod';
import data from './jobs.json';

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

// "Month Year", e.g. "October 2025".
const monthYear = z
	.string()
	.regex(
		new RegExp(`^(${MONTHS.join('|')}) \\d{4}$`),
		'Use "Month Year" with the month written out, e.g. "October 2025"',
	);

const jobSchema = z.object({
	title: z.string().min(1),
	company: z.string().min(1),
	start: monthYear,
	/** "Month Year", or "Present" (or leave it out) for your current job. */
	end: z.union([monthYear, z.literal('Present')]).default('Present'),
	highlights: z.array(z.string()).default([]),
});

export type Job = z.infer<typeof jobSchema>;

/** Turns "October 2025" into a number that sorts by date; "Present" sorts last. */
function sortKey(value: string): number {
	if (value === 'Present') return Infinity;
	const [month, year] = value.split(' ');
	return Number(year) * 12 + MONTHS.indexOf(month);
}

const result = z.object({ jobs: z.array(jobSchema) }).safeParse(data);

if (!result.success) {
	// Name the job and field so a mistake in jobs.json is easy to find.
	const problems = result.error.issues.map((issue) => {
		const [, index, field] = issue.path;
		const job =
			typeof index === 'number'
				? (data as { jobs?: { company?: string }[] }).jobs?.[index]
				: undefined;
		const where = job
			? `job ${Number(index) + 1} (${job.company ?? 'no company'}), "${String(field)}"`
			: issue.path.join('.');
		return `  - ${where}: ${issue.message}`;
	});
	throw new Error(`src/data/jobs.json has a problem:\n${problems.join('\n')}`);
}

/** All jobs: current ones first, then by end and start date, newest first. */
export const jobs: Job[] = result.data.jobs.sort(
	(a, b) => sortKey(b.end) - sortKey(a.end) || sortKey(b.start) - sortKey(a.start),
);
