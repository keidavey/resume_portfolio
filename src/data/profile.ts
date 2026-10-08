// Your personal details. Everything on the site that is about you
// (header, intro, experience, skills, education) is read from here.

export interface Job {
	title: string;
	company: string;
	start: string;
	end: string;
	highlights: string[];
}

export interface School {
	qualification: string;
	school: string;
	year: string;
}

export const profile = {
	name: '[Your Name]',
	role: '[Your role]',
	location: '[City, Country]',
	summary:
		"[Two or three sentences: what you do, who you do it for, and what you're looking for next.]",

	// The PDF lives in public/resume.pdf; replace that file with your own.
	resumePdf: '/resume.pdf',
	// Leave out or set to undefined to show a placeholder block instead.
	portrait: undefined as string | undefined,

	contact: {
		email: 'you@email.com',
		linkedin: 'https://www.linkedin.com/in/your-handle',
		github: 'https://github.com/your-handle',
	},

	experience: [
		{
			title: '[Job title]',
			company: '[Company]',
			start: '[2023]',
			end: 'Present',
			highlights: [
				'[What you owned, and the result it produced.]',
				'[A second accomplishment, with a number if you have one.]',
			],
		},
		{
			title: '[Job title]',
			company: '[Company]',
			start: '[2020]',
			end: '[2023]',
			highlights: [
				'[What you owned, and the result it produced.]',
				'[A second accomplishment, with a number if you have one.]',
			],
		},
	] satisfies Job[],

	skills: ['[Skill]', '[Skill]', '[Skill]', '[Skill]', '[Skill]', '[Skill]'],

	education: [
		{ qualification: '[Degree or certificate]', school: '[School]', year: '[Year]' },
	] satisfies School[],
};
