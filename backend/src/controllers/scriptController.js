// backend/src/controllers/scriptController.js
import Script from "../models/Script.js";
import { main } from "../utils/ScriptWritter.js";

// Generate script via ScriptWriter utility
export const generateScript = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    console.log("🎬 Generating script for prompt:", prompt);

    // Wait for the final storyDB from ScriptWriter
    const storyDB = await main(prompt);
    console.log(storyDB);
    // Build final script text (same as in main())
    // let finalScript = `TITLE: ${storyDB.title}\n\n`;
    // storyDB.content.forEach((scene) => {
    //   finalScript += `${scene}\n\n=== SCENE END ===\n\n`;
    // });
    console.log(storyDB);

    // Send back to frontend
    return res.json({
      script: storyDB
    });

  } catch (err) {
    console.error("❌ Error generating script:", err);
    res.status(500).json({ message: "Failed to generate script" });
  }
};

// Save script to DB
export const saveScript = async (req, res) => {
  try {
    const { prompt, script } = req.body;
    const newScript = new Script({
      user: req.user._id,
      prompt,
      script,
    });
    await newScript.save();
    res.status(201).json(newScript);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save script" });
  }
};

// Get all scripts for user
export const getMyScripts = async (req, res) => {
  try {
    const scripts = await Script.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(scripts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch scripts" });
  }
};
