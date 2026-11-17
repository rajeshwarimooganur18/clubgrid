const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', eventController.getEvents);
router.post('/', verifyToken, requireAdmin, eventController.createEvent);
router.put('/:id', verifyToken, requireAdmin, eventController.updateEvent);
router.delete('/:id', verifyToken, requireAdmin, eventController.deleteEvent);

module.exports = router;
