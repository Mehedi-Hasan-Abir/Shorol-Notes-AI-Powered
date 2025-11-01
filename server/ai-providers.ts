import ollama from "ollama";
import { HfInference } from "@huggingface/inference";

export interface TranscriptionResult {
  text: string;
}

export interface SummarizationResult {
  summary: string;
}

export type AIProvider = "ollama" | "huggingface";

interface AIConfig {
  transcriptionProvider: AIProvider;
  summarizationProvider: AIProvider;
  ollamaModel?: string;
  huggingfaceToken?: string;
  huggingfaceSTTModel?: string;
  huggingfaceSummarizationModel?: string;
}

// Default configuration
const defaultConfig: AIConfig = {
  transcriptionProvider: "huggingface",
  summarizationProvider: "ollama",
  ollamaModel: "llama3.1",
  huggingfaceSTTModel: "openai/whisper-large-v3",
  huggingfaceSummarizationModel: "facebook/bart-large-cnn",
};

let currentConfig: AIConfig = { ...defaultConfig };

export function updateAIConfig(config: Partial<AIConfig>) {
  currentConfig = { ...currentConfig, ...config };
}

export function getAIConfig(): AIConfig {
  return { ...currentConfig };
}

/**
 * Transcribe audio using the configured provider
 */
export async function transcribeAudio(
  audioData: Buffer,
  provider?: AIProvider
): Promise<TranscriptionResult> {
  const selectedProvider = provider || currentConfig.transcriptionProvider;

  try {
    if (selectedProvider === "huggingface") {
      return await transcribeWithHuggingFace(audioData);
    } else if (selectedProvider === "ollama") {
      // Ollama doesn't natively support STT, fallback to HuggingFace
      console.warn("Ollama doesn't support STT, falling back to HuggingFace");
      return await transcribeWithHuggingFace(audioData);
    }
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe audio. Please check your API configuration.");
  }

  throw new Error(`Unsupported transcription provider: ${selectedProvider}`);
}

/**
 * Summarize text using the configured provider
 */
export async function summarizeText(
  text: string,
  provider?: AIProvider
): Promise<SummarizationResult> {
  const selectedProvider = provider || currentConfig.summarizationProvider;

  try {
    if (selectedProvider === "ollama") {
      return await summarizeWithOllama(text);
    } else if (selectedProvider === "huggingface") {
      return await summarizeWithHuggingFace(text);
    }
  } catch (error) {
    console.error("Summarization error:", error);
    throw new Error("Failed to summarize text. Please check your AI configuration.");
  }

  throw new Error(`Unsupported summarization provider: ${selectedProvider}`);
}

/**
 * Transcribe audio using Hugging Face Inference API
 */
async function transcribeWithHuggingFace(audioData: Buffer): Promise<TranscriptionResult> {
  const { huggingfaceToken, huggingfaceSTTModel } = currentConfig;

  if (!huggingfaceToken) {
    throw new Error("Hugging Face token not configured");
  }

  const hf = new HfInference(huggingfaceToken);
  const model = huggingfaceSTTModel || "openai/whisper-large-v3";

  const result = await hf.automaticSpeechRecognition({
    data: audioData,
    model,
  });

  return { text: result.text };
}

/**
 * Summarize text using Ollama (local LLM)
 */
async function summarizeWithOllama(text: string): Promise<SummarizationResult> {
  const { ollamaModel } = currentConfig;
  const model = ollamaModel || "llama3.1";

  try {
    const response = await ollama.chat({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes text in Bangla. Provide a concise summary in 2-3 sentences.",
        },
        {
          role: "user",
          content: `Please summarize the following text in Bangla:\n\n${text}`,
        },
      ],
      options: {
        temperature: 0.7,
        num_ctx: 4096,
      },
    });

    return { summary: response.message.content };
  } catch (error: any) {
    if (error.message?.includes("connect")) {
      throw new Error(
        "Cannot connect to Ollama. Make sure Ollama is running (ollama serve)"
      );
    }
    throw error;
  }
}

/**
 * Summarize text using Hugging Face Inference API
 */
async function summarizeWithHuggingFace(text: string): Promise<SummarizationResult> {
  const { huggingfaceToken, huggingfaceSummarizationModel } = currentConfig;

  if (!huggingfaceToken) {
    throw new Error("Hugging Face token not configured");
  }

  const hf = new HfInference(huggingfaceToken);
  const model = huggingfaceSummarizationModel || "facebook/bart-large-cnn";

  const result = await hf.summarization({
    model,
    inputs: text,
    parameters: {
      max_length: 150,
      min_length: 30,
    },
  });

  return { summary: result.summary_text };
}

/**
 * Check if Ollama is available
 */
export async function checkOllamaAvailability(): Promise<boolean> {
  try {
    await ollama.list();
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Get list of available Ollama models
 */
export async function getOllamaModels(): Promise<string[]> {
  try {
    const models = await ollama.list();
    return models.models.map((m: any) => m.name);
  } catch (error) {
    console.error("Failed to fetch Ollama models:", error);
    return [];
  }
}
