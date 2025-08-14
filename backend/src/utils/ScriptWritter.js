import fs from 'fs';
import fetch from "node-fetch";
import path from 'path';

const celtxTemplate = (scene) => {
  const sceneHeading = `${scene.location ? scene.location.toUpperCase() : 'LOCATION UNKNOWN'} - ${scene.time || 'TIME UNKNOWN'}`;
  const description = scene.description || 'Scene description missing';
  const dialogue = scene.dialogue ? scene.dialogue.map(line => 
    `${line.character ? line.character.toUpperCase() : 'CHARACTER'}\n${line.text || '...'}`).join('\n\n') : '';
  
  return `INT. ${sceneHeading}\n\n${description}\n\n${dialogue}`.trim();
};

const systemPrompt = `
You are an AI Film Scriptwriter creating professional scripts in Celtx format AUTONOMOUSLY.
🧠 STRICT RULES:
1. You MUST respond with valid JSON in exactly this format:
{
  "step": "think|plan|imagine|output|title",
  "content": { ... }
}

2. Work COMPLETELY AUTONOMOUSLY without user input:
- First suggest a title (title)
- Then create a complete story structure (plan)
- Then generate each scene sequentially (imagine + output)
- Continue until all scenes are completed

3. For each step type:
- "title": {"step":"title","content":"Suggested Story Title"}
- "think": {"step":"think","content":"your thoughts"}
- "plan": {
    "step":"plan",
    "content":[{
      "chapter":number,
      "title":"string",
      "sequences":[{
        "sequence":number,
        "scenes":[{
          "scene":number,
          "location":"string",
          "time":"string"
        }]
      }]
    }]
  }
- "imagine": {
    "step":"imagine",
    "content":{
      "chapter":number,
      "sequence":number,
      "scene":number,
      "location":"string",
      "time":"string",
      "description":"string",
      "characters":["string"],
      "key_elements":["string"]
    }
  }
- "output": {
    "step":"output",
    "content":{
      "chapter":number,
      "sequence":number,
      "scene":number,
      "location":"string",
      "time":"string",
      "description":"string",
      "dialogue":[{
        "character":"string",
        "text":"string"
      }],
      "full_scene":"string"
    }
  }

4. NEVER ask for user input - make all decisions yourself
5. ALWAYS include ALL required fields
6. ONLY respond with the exact JSON format above
`;

// Story database
const storyDB = {
  title: "",
  structure: [],
  content: new Map(),
};

// Tools implementation
const tools = {
  store_title: (title) => {
    storyDB.title = title.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "_");
    return "Title stored";
  },
  store_structure: (structure) => {
    storyDB.structure = structure;
    return "Structure stored";
  },
  store_content: (data) => {
    const key = `c${data.chapter}s${data.sequence}sc${data.scene}`;
    const formattedScene = celtxTemplate(data);
    storyDB.content.set(key, formattedScene);
    return "Content stored";
  },
  write_to_file: (content) => {
    // Create Scripts directory if it doesn't exist
    if (!fs.existsSync('./Scripts')) {
      fs.mkdirSync('./Scripts');
    }
    
    const filename = `${storyDB.title || 'untitled_script'}.celtx`;
    const filepath = path.join('./Scripts', filename);
    fs.writeFileSync(filepath, content, 'utf8');
    return `File written to ${filepath}`;
  }
};

async function executeStep(messages) {
  try {
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "deepseek-coder:6.7b",
        messages,
        format: "json",
        options: {
          temperature: 0.7,
        },
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.message?.content;
    
    if (!content) {
      throw new Error("Empty response from model");
    }

    let parsed;
    try {
      parsed = typeof content === 'string' ? JSON.parse(content) : content;
    } catch (e) {
      throw new Error(`Invalid JSON response: ${content}`);
    }

    if (!parsed.step || !['title', 'think', 'plan', 'imagine', 'output'].includes(parsed.step)) {
      throw new Error(`Invalid step: ${parsed.step}`);
    }

    return parsed;
  } catch (error) {
    console.error("Error in executeStep:", error.message);
    return { 
      error: "Failed to execute step",
      details: error.message 
    };
  }
}

function shouldExit(response) {
  if (response.step !== "output" || !storyDB.structure?.length) return false;

  const lastChapter = storyDB.structure[storyDB.structure.length - 1];
  if (!lastChapter?.sequences?.length) return false;

  const lastSequence = lastChapter.sequences[lastChapter.sequences.length - 1];
  return (
    response.content.chapter === storyDB.structure.length &&
    response.content.scene === (lastSequence.scenes?.length || 0)
  );
}

async function main(userRequest) {
  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userRequest + "\n\nFirst suggest a title, then generate the complete story autonomously without asking for any input." },
  ];

  // Story development workflow
  while (true) {
    const response = await executeStep(messages);
    
    if (response.error) {
      console.error("ERROR:", response.error, "-", response.details);
      break;
    }

    messages.push({ 
      role: "assistant", 
      content: JSON.stringify(response) 
    });

    switch (response.step) {
      case "title":
        console.log(`📌 SUGGESTED TITLE: ${response.content}`);
        await tools.store_title(response.content);
        break;

      case "think":
        console.log(`💭 THINKING: ${response.content}`);
        break;

      case "plan":
        console.log("📋 STORY STRUCTURE CREATED");
        const structure = Array.isArray(response.content) 
          ? response.content 
          : response.content?.plan || response.content;

        if (!structure) {
          console.error("Invalid structure received");
          break;
        }

        await tools.store_structure(structure);
        console.log(`Generated ${structure.length} chapters with ${structure.reduce((acc, ch) => acc + (ch.sequences?.length || 0), 0)} sequences`);
        break;

      case "imagine":
        console.log(
          `🎥 IMAGINING: C${response.content.chapter}-S${response.content.sequence}-SC${response.content.scene}`
        );
        break;

      case "output":
        console.log(
          `📝 WRITING SCENE: C${response.content.chapter}-S${response.content.sequence}-SC${response.content.scene}`
        );
        await tools.store_content(response.content);
        break;

      default:
        console.log("🚫 Received unexpected step:", response.step);
    }

    if (shouldExit(response)) {
      console.log("✅ SCRIPT COMPLETED!");
      break;
    }
  }

  let finalScript = `TITLE: ${storyDB.title}\n\n`;
  storyDB.content.forEach((scene) => {
    finalScript += `${scene}\n\n=== SCENE END ===\n\n`;
  });

  try {
    return finalScript;
    // const result = tools.write_to_file(finalScript);
    // console.log(`\n🎬 Script successfully written as: ${result}`);
  } catch (error) {
    console.error("\n❌ Error writing to file:", error.message);
  }

  return storyDB;
}

export { main };