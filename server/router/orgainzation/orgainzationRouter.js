// routes/organizationRoutes.js
const express = require('express');
const router = express.Router();
const { addOrganization } = require('../../controller/orgainzation/organizationController');
const Orgainzation = require('../../models/organization/organizationModel');

// POST /api/organizations
router.post('/', addOrganization);

router.get("/", async (req, res) => {
  try {
    const organization = await Orgainzation.find();
    res.json(organization);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;