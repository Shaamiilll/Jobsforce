
// Mock job database (in a real app, this would be from a database)
const jobDatabase = [
    {
        id: 'job1',
        title: 'Senior Software Engineer',
        company: 'Tech Innovations Inc.',
        location: 'San Francisco, CA',
        skills: ['React', 'TypeScript', 'Node.js', 'Docker', 'Kubernetes'],
        salary: '$120,000 - $150,000',
        description: 'We are seeking a talented Senior Software Engineer to join our innovative team.',
        link: 'https://example.com/jobs/senior-software-engineer'
    },
    {
        id: 'job2',
        title: 'Frontend Developer',
        company: 'WebSolutions Ltd.',
        location: 'New York, NY',
        skills: ['JavaScript', 'React', 'CSS', 'HTML', 'Redux'],
        salary: '$90,000 - $110,000',
        description: 'Join our frontend team and build cutting-edge web applications.',
        link: 'https://example.com/jobs/frontend-developer'
    },
    {
        id: 'job3',
        title: 'Cloud Solutions Architect',
        company: 'CloudMaster Technologies',
        location: 'Seattle, WA',
        skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
        salary: '$130,000 - $160,000',
        description: 'Design and implement cloud infrastructure solutions for enterprise clients.',
        link: 'https://example.com/jobs/cloud-architect'
    }
];

// Skill matching utility function
const calculateSkillMatchScore = (jobSkills, userSkills) => {
    const matchedSkills = jobSkills.filter(skill =>
        userSkills.some(userSkill =>
            userSkill.toLowerCase().includes(skill.toLowerCase())
        )
    );

    return (matchedSkills.length / jobSkills.length) * 100;
};

// Get all jobs
export const jobs = (req, res) => {
    try {
        console.log("Fetching all jobs");
        res.status(200).json(jobDatabase);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

// Search jobs by skills
export const searchJobsBySkills = (req, res) => {
    try {
        const { skills } = req.body;

        if (!skills || skills.length === 0) {
            return res.status(400).json({
                message: 'No skills provided',
                jobs: []
            });
        }

        // Match and score jobs based on skills
        const matchedJobs = jobDatabase
            .map(job => ({
                ...job,
                matchScore: calculateSkillMatchScore(job.skills, skills)
            }))
            .filter(job => job.matchScore > 0)  // Only return jobs with some skill match
            .sort((a, b) => b.matchScore - a.matchScore)  // Sort by match score
            .slice(0, 10);  // Limit to top 10 matches

        res.status(200).json(matchedJobs);
    } catch (error) {
        console.error('Job search error:', error);
        res.status(500).json({
            message: 'Internal server error',
            jobs: []
        });
    }
};

// Get job by ID
export const getJobById = (req, res) => {
    try {
        const { id } = req.params;
        const job = jobDatabase.find(j => j.id === id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};