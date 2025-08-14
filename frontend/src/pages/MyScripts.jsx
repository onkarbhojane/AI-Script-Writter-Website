import React, { useState } from "react";
import { getScripts } from "../api/scriptApi";
import { AuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const MyScripts = () => {
  const [scripts, setScripts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { authLoading } = useContext(AuthContext);
  
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const res = await getScripts();
        setScripts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchScripts();
  }, []);

  const formatScript = (script) => {
    const lines = script.split('\n');
    let formatted = [];
    let inDialogue = false;
    let lastWasSceneHeading = false;
    
    lines.forEach(line => {
      const trimmed = line.trim();
      
      if (formatted.length === 0 && !trimmed) return;
      
      if (trimmed.startsWith("INT.") || trimmed.startsWith("EXT.")) {
        formatted.push(trimmed.toUpperCase());
        inDialogue = false;
        lastWasSceneHeading = true;
      } 
      else if (trimmed.endsWith(':') || 
               (!inDialogue && trimmed.toUpperCase() === trimmed && trimmed.length > 0 && 
                !trimmed.startsWith('===') && !trimmed.startsWith('TITLE:'))) {
        formatted.push(trimmed.toUpperCase());
        inDialogue = true;
        lastWasSceneHeading = false;
      } 
      else if (trimmed.startsWith("===")) {
        formatted.push(trimmed);
        inDialogue = false;
        lastWasSceneHeading = false;
      }
      else if (trimmed.startsWith("TITLE:")) {
        formatted.push(trimmed.toUpperCase());
        lastWasSceneHeading = false;
      }
      else {
        if (inDialogue) {
          formatted.push(`  ${trimmed}`);
        } else {
          if (lastWasSceneHeading && trimmed) {
            formatted.push('');
          }
          formatted.push(trimmed);
        }
        lastWasSceneHeading = false;
      }
    });
    
    return formatted.join('\n').trim();
  };

  const renderScript = (script) => {
    const formatted = formatScript(script);
    return formatted.split('\n').map((line, index) => {
      if (line.startsWith("TITLE:")) {
        return <div key={index} className="text-2xl font-bold text-center my-4 text-indigo-700">{line}</div>;
      } else if (line.startsWith("INT.") || line.startsWith("EXT.")) {
        return <div key={index} className="font-bold uppercase my-3 text-center">{line}</div>;
      } else if (line.startsWith("===")) {
        return <div key={index} className="text-center text-gray-500 my-4">{line}</div>;
      } else if (line === line.toUpperCase() && line.trim() && !line.startsWith("===")) {
        // Character names (all uppercase) - now centered
        return <div key={index} className="font-bold uppercase text-center mt-4">{line}</div>;
      } else if (line.startsWith("  ")) {
        return <div key={index} className="ml-12 italic text-center">{line.trim()}</div>;
      } else {
        return <div key={index} className="my-2 text-center">{line}</div>;
      }
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">My Scripts</h2>
      {scripts.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-lg">
          <p className="text-lg text-gray-600">No scripts saved yet.</p>
          <button 
            onClick={() => navigate('/workspace')}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Create New Script
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {scripts.map((s) => (
            <div 
              key={s._id} 
              className="bg-white rounded-2xl shadow-2xl p-6 border-t-4 border-indigo-600 transition-all duration-300 mx-auto max-w-3xl"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-700 text-center">{s.prompt}</h3>
              <div className="font-serif text-gray-800 text-lg bg-gray-50 p-4 rounded-lg mt-4">
                {renderScript(s.script)}
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                Created: {new Date(s.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyScripts;