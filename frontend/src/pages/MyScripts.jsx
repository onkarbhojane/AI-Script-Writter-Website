// src/pages/MyScripts.jsx
import React, { useEffect, useState } from "react";
import { getScripts } from "../api/scriptApi";

const MyScripts = () => {
  const [scripts, setScripts] = useState([]);

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

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6">My Scripts</h2>
      {scripts.length === 0 ? (
        <p>No scripts saved yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {scripts.map((s) => (
            <div key={s._id} className="bg-white p-4 rounded shadow">
              <h3 className="font-bold mb-2">{s.prompt}</h3>
              <pre className="whitespace-pre-wrap">{s.script}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyScripts;
