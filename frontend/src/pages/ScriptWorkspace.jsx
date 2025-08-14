import React, { useState, useEffect, useContext } from "react";
import { saveScript, generateScriptApi } from "../api/scriptApi";
import { FiSave, FiPlay, FiEye, FiCode } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ScriptWorkspace = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedScript, setGeneratedScript] = useState("");
  const [formattedScript, setFormattedScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("formatted"); // 'formatted' or 'raw'

  const { user, authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const formatScript = (script) => {
    const lines = script.split('\n');
    let formatted = [];
    let inDialogue = false;
    
    lines.forEach(line => {
      const trimmed = line.trim();
      
      // Skip empty lines at the start
      if (formatted.length === 0 && !trimmed) return;
      
      // Scene headings
      if (trimmed.startsWith("INT.") || trimmed.startsWith("EXT.")) {
        formatted.push(`\n${trimmed.toUpperCase()}`);
        inDialogue = false;
      } 
      // Character names
      else if (trimmed.endsWith(':') || 
               (!inDialogue && trimmed.toUpperCase() === trimmed && trimmed.length > 0 && 
                !trimmed.startsWith('===') && !trimmed.startsWith('TITLE:'))) {
        formatted.push(`\n${trimmed.toUpperCase()}`);
        inDialogue = true;
      } 
      // Scene end marker
      else if (trimmed.startsWith("===")) {
        formatted.push(`\n${trimmed}`);
        inDialogue = false;
      }
      // Title
      else if (trimmed.startsWith("TITLE:")) {
        formatted.push(`${trimmed.toUpperCase()}\n`);
      }
      // Dialogue and action
      else {
        if (inDialogue) {
          // Dialogue lines
          formatted.push(`  ${trimmed}`);
        } else {
          // Action lines
          formatted.push(`\n${trimmed}`);
        }
      }
    });
    
    return formatted.join('\n').trim();
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const { data } = await generateScriptApi(prompt);
      setGeneratedScript(data.script);
      const formatted = formatScript(data.script);
      setFormattedScript(formatted);
    } catch (err) {
      console.error("Error generating script:", err);
      alert("Failed to generate script. Please try again.");
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
      console.error("Error saving script:", err);
      alert("Error saving script");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // Render script with formatting
  const renderFormattedScript = () => {
    return formattedScript.split('\n').map((line, index) => {
      if (line.startsWith("TITLE:")) {
        return <div key={index} className="text-2xl font-bold text-center my-4 text-indigo-700">{line}</div>;
      } else if (line.startsWith("INT.") || line.startsWith("EXT.")) {
        return <div key={index} className="font-bold uppercase my-3">{line}</div>;
      } else if (line.startsWith("===")) {
        return <div key={index} className="text-center text-gray-500 my-4">{line}</div>;
      } else if (line === line.toUpperCase() && line.trim() && !line.startsWith("===")) {
        return <div key={index} className="font-bold uppercase ml-8 mt-4">{line}</div>;
      } else if (line.startsWith("  ")) {
        return <div key={index} className="ml-12 italic">{line.trim()}</div>;
      } else {
        return <div key={index} className="my-2">{line}</div>;
      }
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-8 text-indigo-700">
        AI Script Workspace
      </h2>

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
            onClick={handleGenerate}
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
      {formattedScript && (
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-indigo-600 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-indigo-700">
              Generated Script
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode("formatted")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  viewMode === "formatted"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FiEye className="text-sm" /> Formatted
              </button>
              <button
                onClick={() => setViewMode("raw")}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                  viewMode === "raw"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <FiCode className="text-sm" /> Raw
              </button>
            </div>
          </div>

          {viewMode === "formatted" ? (
            <div className="font-serif text-gray-800 text-lg bg-gray-50 p-4 rounded-lg">
              {renderFormattedScript()}
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-gray-800 text-sm bg-gray-50 p-4 rounded-lg">
              {generatedScript}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default ScriptWorkspace;