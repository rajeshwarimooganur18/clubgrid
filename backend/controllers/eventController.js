const Event = require('../models/Event');

const defaultEvents = [
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
];

// Get all events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        if (events && events.length > 0) {
            return res.status(200).json(events);
        }
        return res.status(200).json(defaultEvents);
    } catch (error) {
        console.error('Error fetching events, using defaults:', error.message);
        return res.status(200).json(defaultEvents);
    }
};

// Create a new event (Admin)
exports.createEvent = async (req, res) => {
    try {
        const { title, club, category, date, time, venue, description, status, countdown, icon, color, background } = req.body;

        if (!title || !club || !category || !date || !time || !venue || !description) {
            return res.status(400).json({
                message: 'Please provide title, club, category, date, time, venue, and description.'
            });
        }

        const newEvent = new Event({
            title: title.trim(),
            club: club.trim(),
            category: category.trim(),
            date: date.trim(),
            time: time.trim(),
            venue: venue.trim(),
            description: description.trim(),
            status: status || 'Upcoming',
            countdown: countdown || '',
            icon: icon || '📅',
            color: color || '#7953ed',
            background: background || '#f0ebff'
        });

        await newEvent.save();

        res.status(201).json({
            message: 'Event created successfully!',
            event: newEvent
        });
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({
            message: 'Failed to create event.'
        });
    }
};

// Update an event (Admin)
exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Event.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updated) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        res.status(200).json({
            message: 'Event updated successfully!',
            event: updated
        });
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({ message: 'Failed to update event.' });
    }
};

// Delete an event (Admin)
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Event.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ message: 'Failed to delete event.' });
    }
};
