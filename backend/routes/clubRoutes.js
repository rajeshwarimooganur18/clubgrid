const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

router.get('/', clubController.getClubs);
router.get('/:id', clubController.getClubById);
router.get('/:id/teams', clubController.getClubTeams);
router.post('/', verifyToken, requireAdmin, clubController.createClub);

module.exports = router;
