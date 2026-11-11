export const profile = {
	name: 'Katherine Davey',
	role: 'Test Automation Engineer',
	location: 'United States, based in New York, NY',
	summary:
		"Engineer systems to automate quality protocols. Build tools to verify integrity. Optimize the interface for human experience.",

	// The PDF lives in public/; this is its path on the site.
	resumePdf: '/Katherine_Davey_CV.pdf',
	// Leave out or set to undefined to show a placeholder block instead.
	portrait: undefined as string | undefined,

	contact: {
		email: 'daveykei03@gmail.com',
		linkedin: 'https://www.linkedin.com/in/katherin-davey',
		github: 'https://github.com/keidavey',
	},

	// Jobs live in src/data/jobs.json (see src/data/job.ts).
	// The line under the title on the My Work page.
	workIntro:
		"[One or two sentences summing up your career so far: the kinds of teams and products you've tested.]",
	// The line under the title on the My Projects page.
	projectsIntro:
		'[A line on what you build outside your day job: tools, test frameworks, experiments.]',
	// The line under the title on the Blog page.
	blogIntro: "[A line on what you write about and who it's for.]",

	// The About Me page.
	about: {
		// Each string is one paragraph.
		bio: [
			'[Two or three sentences on who you are: what drew you to test automation, and what you care about in your work.]',
			"[A second paragraph: how you work, the kind of team you do your best work in, or what you're looking for next.]",
		],
		// The three "What I do" cards.
		focus: [
			{
				title: 'Automate quality protocols',
				text: '[What this means in practice: frameworks, pipelines, the tests you build.]',
			},
			{
				title: 'Verify integrity',
				text: '[The tools you build to catch problems before users do.]',
			},
			{
				title: 'Design for people',
				text: '[How you keep the human experience in view while testing.]',
			},
		],
		skills: ['[Skill]', '[Skill]', '[Skill]', '[Skill]', '[Skill]', '[Skill]'],
		education: [
			{ qualification: '[Degree or certificate]', school: '[School]', year: '[Year]' },
		],
		closing: '[A line inviting people to download your résumé or get in touch.]',
	},
};
