const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Club = require('../models/Club');

const clubsData = [
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

const seedClubs = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI is missing in backend/.env');
    }

    await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
    try {
        for (const club of clubsData) {
            await Club.findOneAndUpdate(
                { clubId: club.clubId },
                { $set: club },
                { upsert: true, runValidators: true }
            );
        }
        console.log('Club records 1-4 seeded successfully.');
    } finally {
        await mongoose.disconnect();
    }
};

seedClubs().catch((error) => {
    console.error('Club seeding failed:', error.message);
    process.exitCode = 1;
});
