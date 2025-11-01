import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  transcribeAudio,
  summarizeText,
  updateAIConfig,
  getAIConfig,
  checkOllamaAvailability,
  getOllamaModels,
} from "./ai-providers";
import { aiConfigSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // AI Configuration endpoints
  app.get("/api/ai/config", async (req, res) => {
    try {
      const config = getAIConfig();
      res.json(config);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/ai/config", async (req, res) => {
    try {
      const config = aiConfigSchema.parse(req.body);
      updateAIConfig(config);
      res.json({ success: true, config });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/ai/ollama/check", async (req, res) => {
    try {
      const available = await checkOllamaAvailability();
      res.json({ available });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/ai/ollama/models", async (req, res) => {
    try {
      const models = await getOllamaModels();
      res.json({ models });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Transcription endpoint
  app.post("/api/transcribe", async (req, res) => {
    try {
      const { audioData, provider } = req.body;
      
      if (!audioData) {
        return res.status(400).json({ error: "Audio data is required" });
      }

      const buffer = Buffer.from(audioData, "base64");
      const result = await transcribeAudio(buffer, provider);
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Summarization endpoint
  app.post("/api/summarize", async (req, res) => {
    try {
      const { text, provider } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const result = await summarizeText(text, provider);
      
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
