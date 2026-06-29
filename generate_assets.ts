import { GoogleGenAI } from "@google/genai";
import fs from "fs";

async function generateImages() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const model = "gemini-3.1-flash-image-preview";

  const prompts = [
    {
      name: "hero_bjj.png",
      prompt: "Cinematic wide shot of a Brazilian Jiu-Jitsu athlete applying a triangle choke submission, high contrast, dramatic lighting, dark atmosphere, red glow accents on the edges, 4k, professional photography, realistic textures.",
      aspectRatio: "16:9"
    },
    {
      name: "belt_detail.png",
      prompt: "Macro shot of a worn-out Brazilian Jiu-Jitsu black belt tied over a white gi, dramatic side lighting, deep shadows, high texture detail, dark background, 4k, cinematic.",
      aspectRatio: "16:9"
    },
    {
      name: "training_action.png",
      prompt: "Action shot of two BJJ athletes rolling in a dark modern gym, motion blur, intense atmosphere, red lighting highlights, cinematic look, 4k, gritty texture.",
      aspectRatio: "16:9"
    }
  ];

  for (const item of prompts) {
    console.log(`Generating ${item.name}...`);
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: { parts: [{ text: item.prompt }] },
        config: {
          imageConfig: {
            aspectRatio: item.aspectRatio as any,
            imageSize: "1K"
          }
        }
      });

      for (const part of response.candidates![0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          fs.writeFileSync(`./${item.name}`, Buffer.from(base64Data, 'base64'));
          console.log(`Saved ${item.name}`);
        }
      }
    } catch (error) {
      console.error(`Error generating ${item.name}:`, error);
    }
  }
}

generateImages();
