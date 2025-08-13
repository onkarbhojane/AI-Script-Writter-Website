// src/pages/ScriptWorkspace.jsx
import React, { useState } from "react";
import { saveScript } from "../api/scriptApi";
import { FiSave, FiPlay } from "react-icons/fi";

const ScriptWorkspace = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/scripts/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setGeneratedScript(data.script);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedScript) return;
    try {
      await saveScript({ prompt, script: generatedScript });
      alert("Script saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving script");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-8 text-indigo-700">AI Script Workspace</h2>

      {/* Input Section */}
      <div className="w-full max-w-3xl mb-6">
        <textarea
          className="w-full p-5 rounded-2xl border-2 border-indigo-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300 resize-none h-40 md:h-48 shadow-inner bg-white"
          placeholder="Enter your story or idea here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={generateScript}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
            disabled={loading}
          >
            <FiPlay className="text-lg" />
            {loading ? "Generating..." : "Generate Script"}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300"
            disabled={!generatedScript}
          >
            <FiSave className="text-lg" />
            Save Script
          </button>
        </div>
      </div>

      {/* Generated Script Section */}
      {generatedScript && (
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-indigo-600 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-4 text-indigo-700">Generated Script</h3>
          <pre className="whitespace-pre-wrap text-gray-800 text-lg">{generatedScript}</pre>
        </div>
      )}
    </div>
  );
};

export default ScriptWorkspace;
