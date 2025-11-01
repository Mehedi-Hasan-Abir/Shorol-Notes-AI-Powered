import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import AIProviderSettings, { type AIConfig } from "@/components/AIProviderSettings";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function SettingsPage() {
  const { toast } = useToast();
  const [config, setConfig] = useState<AIConfig>({
    transcriptionProvider: "huggingface",
    summarizationProvider: "ollama",
    ollamaModel: "llama3.1",
    huggingfaceToken: "",
    huggingfaceSTTModel: "openai/whisper-large-v3",
    huggingfaceSummarizationModel: "facebook/bart-large-cnn",
  });

  // Fetch current config
  const { data: savedConfig } = useQuery<AIConfig>({
    queryKey: ["/api/ai/config"],
  });

  // Check Ollama availability
  const { data: ollamaStatus, refetch: checkOllama } = useQuery<{ available: boolean }>({
    queryKey: ["/api/ai/ollama/check"],
  });

  // Fetch Ollama models
  const { data: ollamaModelsData, refetch: refreshModels } = useQuery<{ models: string[] }>({
    queryKey: ["/api/ai/ollama/models"],
    enabled: ollamaStatus?.available || false,
  });

  // Save config mutation
  const saveMutation = useMutation({
    mutationFn: async (newConfig: AIConfig) => {
      const response = await fetch("/api/ai/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newConfig),
      });
      if (!response.ok) throw new Error("Failed to save configuration");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ai/config"] });
      toast({
        title: "সেটিংস সংরক্ষিত হয়েছে",
        description: "আপনার AI কনফিগারেশন সফলভাবে সংরক্ষিত হয়েছে",
      });
    },
    onError: (error: any) => {
      toast({
        title: "ত্রুটি",
        description: error.message || "সেটিংস সংরক্ষণ করতে সমস্যা হয়েছে",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (savedConfig) {
      setConfig(savedConfig);
    }
  }, [savedConfig]);

  const handleSave = () => {
    saveMutation.mutate(config);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">AI সেটিংস</h1>
        <p className="text-muted-foreground">
          আপনার AI প্রদানকারী কনফিগার করুন - সম্পূর্ণ ফ্রি বা লোকাল
        </p>
      </div>

      <AIProviderSettings
        config={config}
        onConfigChange={setConfig}
        ollamaAvailable={ollamaStatus?.available || false}
        ollamaModels={ollamaModelsData?.models || []}
        onCheckOllama={() => checkOllama()}
        onRefreshModels={() => refreshModels()}
      />

      <Card className="p-6 space-y-3">
        <h2 className="text-xl font-semibold mb-4 pb-3 border-b">ক্যালেন্ডার ইন্টিগ্রেশন</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-4 border-b">
            <div>
              <p className="font-medium">Google Calendar</p>
              <p className="text-sm text-muted-foreground">
                আপনার Google Calendar এর সাথে সংযুক্ত করুন
              </p>
            </div>
            <Button variant="outline" data-testid="button-connect-google">
              সংযুক্ত করুন
            </Button>
          </div>
          <div className="flex justify-between items-center py-4">
            <div>
              <p className="font-medium">Outlook Calendar</p>
              <p className="text-sm text-muted-foreground">
                আপনার Outlook Calendar এর সাথে সংযুক্ত করুন
              </p>
            </div>
            <Button variant="outline" data-testid="button-connect-outlook">
              সংযুক্ত করুন
            </Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saveMutation.isPending}
          data-testid="button-save-settings"
        >
          {saveMutation.isPending ? "সংরক্ষণ করা হচ্ছে..." : "সেটিংস সংরক্ষণ করুন"}
        </Button>
      </div>
    </div>
  );
}
