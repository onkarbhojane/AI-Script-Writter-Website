// backend/src/controllers/scriptController.js
import Script from "../models/Script.js";

// Generate script via LangChain (backend handles AI call)
export const generateScript = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    // TODO: Replace with LangChain.js AI call
    const generatedScript = `AI generated script for: ${prompt}`;

    res.json({ script: generatedScript });
  } catch (err) {
    console.error(err);
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

