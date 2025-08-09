const express = require('express');
const { add_school_details, get_school_details } = require('../controllers/schoolController');
const router = express.Router();


// routes for both apis addSchool and listSchools
router.post("/addSchool", add_school_details);
router.get("/listSchools", get_school_details);


module.exports = router;