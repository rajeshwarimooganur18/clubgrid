const Club = require('../models/Club');

// Default initial clubs with teams (guarantees frontend works even before seeding)
const defaultClubs = [
    {
        clubId: 1,
        name: "Drama Club",
        category: "Performing art",
        description: "A club for students interested in acting, street plays, skits, and theatre.",
        icon: "🎭",
        image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=900&q=85",
        members: "80+ members",
        teams: [
            { id: 1, name: "Pratibimb", path: "/clubs/drama/pratibimb", description: "SDMCET Hindi dramatics club established in 2009." },
            { id: 2, name: "Antaranga", path: "/clubs/drama/antaranga", description: "Kannada theatre club promoting regional arts." },
            { id: 3, name: "Astitva", path: "/clubs/drama/astitva", description: "English theatre and stage play ensemble." }
        ]
    },
    {
        clubId: 2,
        name: "Dance Club",
        category: "Performing art",
        description: "A club for students passionate about various western, classical, and hip-hop dance styles.",
        icon: "💃",
        image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=900&q=85",
        members: "90+ members",
        teams: [
            { id: 1, name: "Diversity", path: "/clubs/dance/diversity", description: "All-style western dance team." },
            { id: 2, name: "Intensity", path: "/clubs/dance/intensity", description: "High-energy hip-hop and b-boying crew." },
            { id: 3, name: "Alphas", path: "/clubs/dance/alphas", description: "Contemporary and lyrical dance squad." },
            { id: 4, name: "AntarangaD", path: "/clubs/dance/antaranga", description: "Classical and semi-classical dance group." },
            { id: 5, name: "Tashan", path: "/clubs/dance/tashan", description: "Bollywood and fusion powerhouse." },
            { id: 6, name: "Dmax", path: "/clubs/dance/dmax", description: "Popping, locking, and street battle team." }
        ]
    },
    {
        clubId: 3,
        name: "Music Club",
        category: "Performing art",
        description: "A club for musicians, vocalists, instrumentalists, and sound enthusiasts.",
        icon: "🎵",
        image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=900&q=85",
        members: "100+ members",
        teams: [
            { id: 1, name: "Antaranga", path: "/clubs/music/antarangam", description: "Indian classical & semi-classical music team." },
            { id: 2, name: "Finearts", path: "/clubs/music/finearts", description: "Acoustic and instrumental melody group." },
            { id: 3, name: "Musearts", path: "/clubs/music/musearts", description: "Western rock, pop, and fusion band." },
            { id: 4, name: "Nadamrita", path: "/clubs/music/nadamrita", description: "Carnatic & devotional choral society." }
        ]
    },
    {
        clubId: 4,
        name: "Coding Club",
        category: "Technical",
        description: "A club for programmers, hackathon builders, web developers, and tech innovators.",
        icon: "</>",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
        members: "180+ members",
        teams: [
            { id: 1, name: "Anonymous", path: "/clubs/coding/anonymous", description: "Cybersecurity, CTFs, and ethical hacking club." },
            { id: 2, name: "QWERTY.I/O", path: "/clubs/coding/qwerty", description: "Full-stack web & app development unit." },
            { id: 3, name: "Google Developer Team", path: "/clubs/coding/google-developer", description: "GDG student community for Google technologies." },
            { id: 4, name: "Aerospace Club", path: "/clubs/coding/aerospace", description: "Drone tech, avionics, and embedded robotics." }
        ]
    }
];

// Get all clubs
exports.getClubs = async (req, res) => {
    try {
        const clubs = await Club.find().maxTimeMS(2000).sort({ clubId: 1 });
        if (clubs && clubs.length > 0) {
            return res.status(200).json(clubs);
        }
    } catch (error) {
        console.warn('DB read fallback for getClubs:', error.message);
    }
    return res.status(200).json(defaultClubs);
};

// Get a single club by ID
exports.getClubById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        let club = await Club.findOne({ clubId: id }).maxTimeMS(2000);
        if (club) return res.status(200).json(club);
    } catch (error) {
        console.warn('DB read fallback for getClubById:', error.message);
    }
    const defaultClub = defaultClubs.find(c => c.clubId === id);
    if (defaultClub) return res.status(200).json(defaultClub);
    return res.status(404).json({ message: 'Club not found' });
};

// Get all teams belonging to a particular club
exports.getClubTeams = async (req, res) => {
    const clubId = parseInt(req.params.id);
    try {
        let club = await Club.findOne({ clubId: clubId }).maxTimeMS(2000);
        if (club && club.teams && club.teams.length > 0) {
            return res.status(200).json(club.teams);
        }
    } catch (error) {
        console.warn('DB read fallback for getClubTeams:', error.message);
    }
    const defaultClub = defaultClubs.find(c => c.clubId === clubId);
    if (defaultClub) {
        return res.status(200).json(defaultClub.teams);
    }
    return res.status(404).json({ message: 'Club not found' });
};

// Add a new club (admin)
exports.createClub = async (req, res) => {
    try {
        const { name, category, description, icon, image, members, teams } = req.body;
        if (!name || !category || !description) {
            return res.status(400).json({ message: 'Name, category, and description are required.' });
        }

        const count = await Club.countDocuments();
        const club = new Club({
            clubId: count + 1,
            name,
            category,
            description,
            icon: icon || '🎯',
            image: image || '',
            members: members || '0 members',
            teams: teams || []
        });

        await club.save();
        res.status(201).json({ message: 'Club created successfully', club });
    } catch (error) {
        console.error('Create club error:', error);
        res.status(500).json({ message: 'Failed to create club.' });
    }
};
