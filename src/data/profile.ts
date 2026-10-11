export interface School {
	qualification: string;
	school: string;
	year: string;
}

export const profile = {
	name: 'Katherine Davey',
	role: 'QA Software Development Engineer',
	location: 'New York NY | San Diego, CA',
	summary:
		"Engineer systems to automate quality protocols. Build tools to verify integrity. Optimize the interface for human experience.",

	// The PDF lives in public/resume.pdf;
	resumePdf: '/Katherine_Davey_CV.pdf',
	// Leave out or set to undefined to show a placeholder block instead.
	portrait: undefined as string | undefined,

	contact: {
		email: 'daveykei03@gmail.com',
		linkedin: 'https://www.linkedin.com/in/katherin-davey',
		github: 'https://github.com/keidavey',
	},

	// Jobs live in src/data/jobs.json (see src/data/job.ts).

	skills: ['[Skill]', '[Skill]', '[Skill]', '[Skill]', '[Skill]', '[Skill]'],

	education: [
		{ qualification: '[Degree or certificate]', school: '[School]', year: '[Year]' },
	] satisfies School[],
};
