import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useState } from "react";

export interface AIConfig {
  transcriptionProvider: "ollama" | "huggingface";
  summarizationProvider: "ollama" | "huggingface";
  ollamaModel?: string;
  huggingfaceToken?: string;
  huggingfaceSTTModel?: string;
  huggingfaceSummarizationModel?: string;
}

interface AIProviderSettingsProps {
  config: AIConfig;
  onConfigChange: (config: AIConfig) => void;
  ollamaAvailable: boolean;
  ollamaModels: string[];
  onCheckOllama: () => void;
  onRefreshModels: () => void;
}

export default function AIProviderSettings({
  config,
  onConfigChange,
  ollamaAvailable,
  ollamaModels,
  onCheckOllama,
  onRefreshModels,
}: AIProviderSettingsProps) {
  const [showToken, setShowToken] = useState(false);

  const updateConfig = (updates: Partial<AIConfig>) => {
    onConfigChange({ ...config, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Ollama Status */}
      <Alert>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {ollamaAvailable ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <div>
              <p className="font-semibold">Ollama Status</p>
              <AlertDescription>
                {ollamaAvailable
                  ? "Ollama is running locally"
                  : "Ollama is not available. Install and run 'ollama serve' to use local LLMs"}
              </AlertDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onCheckOllama}
            data-testid="button-check-ollama"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            পুনরায় চেক করুন
          </Button>
        </div>
      </Alert>

      {/* Transcription Settings */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">অডিও ট্রান্সক্রিপশন (Speech-to-Text)</h3>

        <div className="space-y-2">
          <Label>প্রদানকারী নির্বাচন করুন</Label>
          <Select
            value={config.transcriptionProvider}
            onValueChange={(value: "ollama" | "huggingface") =>
              updateConfig({ transcriptionProvider: value })
            }
          >
            <SelectTrigger data-testid="select-transcription-provider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="huggingface">
                Hugging Face (Whisper - ফ্রি)
              </SelectItem>
              <SelectItem value="ollama" disabled={!ollamaAvailable}>
                Ollama (Local) {!ollamaAvailable && "- Unavailable"}
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Hugging Face Whisper মডেল Bangla সহ ১০০+ ভাষা সমর্থন করে
          </p>
        </div>

        {config.transcriptionProvider === "huggingface" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="hf-token">Hugging Face Token</Label>
              <div className="relative">
                <Input
                  id="hf-token"
                  type={showToken ? "text" : "password"}
                  value={config.huggingfaceToken || ""}
                  onChange={(e) => updateConfig({ huggingfaceToken: e.target.value })}
                  placeholder="hf_..."
                  className="font-mono pr-12"
                  data-testid="input-hf-token"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowToken(!showToken)}
                  data-testid="button-toggle-token"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Token পেতে:{" "}
                <a
                  href="https://huggingface.co/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  huggingface.co/settings/tokens
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stt-model">STT Model (Optional)</Label>
              <Input
                id="stt-model"
                value={config.huggingfaceSTTModel || ""}
                onChange={(e) => updateConfig({ huggingfaceSTTModel: e.target.value })}
                placeholder="openai/whisper-large-v3"
                data-testid="input-stt-model"
              />
              <p className="text-xs text-muted-foreground">
                ডিফল্ট: openai/whisper-large-v3
              </p>
            </div>
          </>
        )}
      </Card>

      {/* Summarization Settings */}
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">টেক্সট সামারাইজেশন</h3>

        <div className="space-y-2">
          <Label>প্রদানকারী নির্বাচন করুন</Label>
          <Select
            value={config.summarizationProvider}
            onValueChange={(value: "ollama" | "huggingface") =>
              updateConfig({ summarizationProvider: value })
            }
          >
            <SelectTrigger data-testid="select-summarization-provider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ollama" disabled={!ollamaAvailable}>
                Ollama (Local LLM) {!ollamaAvailable && "- Unavailable"}
              </SelectItem>
              <SelectItem value="huggingface">
                Hugging Face (ফ্রি)
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Ollama সেরা Bangla সামারি তৈরি করতে পারে (llama3.1, mistral)
          </p>
        </div>

        {config.summarizationProvider === "ollama" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="ollama-model">Ollama Model</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefreshModels}
                data-testid="button-refresh-models"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
              </Button>
            </div>
            <Select
              value={config.ollamaModel}
              onValueChange={(value) => updateConfig({ ollamaModel: value })}
            >
              <SelectTrigger data-testid="select-ollama-model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {ollamaModels.length > 0 ? (
                  ollamaModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="llama3.1" disabled>
                    No models found - run: ollama pull llama3.1
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Install: <code className="bg-muted px-1 py-0.5 rounded">ollama pull llama3.1</code>
            </p>
          </div>
        )}

        {config.summarizationProvider === "huggingface" && (
          <div className="space-y-2">
            <Label htmlFor="sum-model">Summarization Model (Optional)</Label>
            <Input
              id="sum-model"
              value={config.huggingfaceSummarizationModel || ""}
              onChange={(e) =>
                updateConfig({ huggingfaceSummarizationModel: e.target.value })
              }
              placeholder="facebook/bart-large-cnn"
              data-testid="input-sum-model"
            />
            <p className="text-xs text-muted-foreground">
              ডিফল্ট: facebook/bart-large-cnn
            </p>
          </div>
        )}
      </Card>

      {/* Quick Setup Guide */}
      <Card className="p-6 bg-muted/50">
        <h3 className="text-lg font-semibold mb-3">দ্রুত সেটআপ গাইড</h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-1">🆓 সম্পূর্ণ ফ্রি (Hugging Face):</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
              <li>huggingface.co তে একাউন্ট তৈরি করুন</li>
              <li>Access Token তৈরি করুন</li>
              <li>Token উপরে পেস্ট করুন</li>
              <li>ট্রান্সক্রিপশন এবং সামারি উভয়ের জন্য Hugging Face নির্বাচন করুন</li>
            </ol>
          </div>

          <div>
            <p className="font-semibold mb-1">🚀 সেরা কর্মক্ষমতা (Ollama Local):</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground ml-2">
              <li>
                <a
                  href="https://ollama.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  ollama.com
                </a>{" "}
                থেকে ডাউনলোড করুন
              </li>
              <li>
                টার্মিনালে চালান:{" "}
                <code className="bg-background px-1 py-0.5 rounded">ollama pull llama3.1</code>
              </li>
              <li>
                সার্ভার চালু করুন:{" "}
                <code className="bg-background px-1 py-0.5 rounded">ollama serve</code>
              </li>
              <li>সামারাইজেশনের জন্য Ollama নির্বাচন করুন</li>
              <li>ট্রান্সক্রিপশনের জন্য Hugging Face ব্যবহার করুন (Ollama STT সমর্থন করে না)</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
}
