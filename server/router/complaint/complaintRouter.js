const express = require("express");
const { submitComplaint, getComplaints } = require("../../controller/complaint/complaintController");
const upload = require("../../middlewares/uploadmiddleware/uploadMiddleware");
const Complaint = require("../../models/complaint/complaintModel");

const router = express.Router();

// Complaint submission route
router.post(
  "/submit",
  upload.fields([{ name: "images", maxCount: 5 }, { name: "videos", maxCount: 2 }]),
  submitComplaint
);

// Fetch all complaints
router.get("/", getComplaints);

router.get("/:id", async (req, res) => {
  try {
    console.log("Hii");
    const complaint = await Complaint.findById(req.params.id);
    console.log("hello");
    
    
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.put("/complaints/:id/response", async (req, res) => {
  try {
    const { response, status } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { response, status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;


