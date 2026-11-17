const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Student = require('../models/Student');
const Club = require('../models/Club');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');

const seedDatabase = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error('MONGO_URI is missing in .env!');
            process.exit(1);
        }

        console.log('Connecting to MongoDB for seeding...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
        console.log('Connected to MongoDB Atlas!');

        // 1. SEED ADMIN ACCOUNT
        const adminEmail = 'admin@clubgrid.com';
        const existingAdmin = await Student.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await Student.create({
                fullName: 'ClubGrid Admin',
                email: adminEmail,
                password: hashedPassword,
                department: 'Administration',
                year: 'Staff',
                studentId: 'ADMIN-001',
                role: 'admin'
            });
            console.log('Admin account created: admin@clubgrid.com / admin123');
        } else {
            console.log('Admin account already exists.');
        }

        // 2. SEED CLUBS
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

        for (const club of clubsData) {
            await Club.findOneAndUpdate(
                { clubId: club.clubId },
                { $set: club },
                { upsert: true, new: true, runValidators: true }
            );
        }
        console.log('Clubs and teams seeded.');

        // 3. SEED EVENTS
        const countEvents = await Event.countDocuments();
        if (countEvents === 0) {
            await Event.insertMany([
                {
                    title: "Generative AI & Agentic AI Workshop",
                    club: "QWERTY.I/O",
                    category: "Technical Workshop",
                    date: "14 November 2026",
                    time: "10:00 AM – 4:00 PM",
                    venue: "Seminar Hall, SDMCET",
                    description: "Explore the world of Generative AI and Agentic AI through hands-on sessions, demonstrations and interactive learning.",
                    status: "Ongoing",
                    countdown: "",
                    icon: "🤖",
                    color: "#7953ed",
                    background: "#f0ebff"
                },
                {
                    title: "Rhythm & Beats – Dance Showcase",
                    club: "Dance Club",
                    category: "Cultural Event",
                    date: "18 November 2026",
                    time: "5:00 PM onwards",
                    venue: "Near the Main Auditorium",
                    description: "Get ready for an exciting evening filled with energetic performances, music and incredible dance talent.",
                    status: "Upcoming",
                    countdown: "Starts in 4 days",
                    icon: "💃",
                    color: "#e65c8a",
                    background: "#fff0f5"
                }
            ]);
            console.log('Sample events seeded.');
        }

        // 4. SEED ANNOUNCEMENTS
        const countAnnouncements = await Announcement.countDocuments();
        if (countAnnouncements === 0) {
            await Announcement.create({
                title: "Club Recruitment 2026 Now Live!",
                description: "Registrations and recruitment applications for all college clubs are now officially open. Explore clubs and submit your applications before the deadline.",
                category: "Important",
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                postedBy: "ClubGrid Admin"
            });
            console.log('Initial announcement seeded.');
        }

        console.log('\nDatabase seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error.message);
        process.exit(1);
    }
};

seedDatabase();
