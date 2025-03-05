const express = require("express");
const { submitComplaint, getComplaints } = require("../../controller/complaint/complaintController");
const upload = require("../../middlewares/uploadmiddleware/uploadMiddleware");

const router = express.Router();

// Complaint submission route
router.post(
  "/submit",
  upload.fields([{ name: "images", maxCount: 5 }, { name: "videos", maxCount: 2 }]),
  submitComplaint
);

// Fetch all complaints
router.get("/", getComplaints);

router.put('/assign/:complaintId', async (req, res) => {
  try {
    const { employeeId } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.complaintId,
      { assignedTo: employeeId, status: 'Assigned' },
      { new: true }
    );
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign complaint' });
  }
});

// Update complaint response and status
router.put('/respond/:complaintId', async (req, res) => {
  try {
    const { response, status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.complaintId,
      { response, status },
      { new: true }
    );
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update complaint response' });
  }
});

module.exports = router;
