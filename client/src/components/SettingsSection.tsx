import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface SettingsSectionProps {
  openaiKey: string;
  onOpenaiKeyChange: (key: string) => void;
  onSave: () => void;
}

export default function SettingsSection({
  openaiKey,
  onOpenaiKeyChange,
  onSave,
}: SettingsSectionProps) {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">সেটিংস</h1>
        <p className="text-muted-foreground">
          আপনার API কী এবং পছন্দসমূহ কনফিগার করুন
        </p>
      </div>

      <Card className="p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4 pb-3 border-b">API কনফিগারেশন</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="openai-key">OpenAI API Key</Label>
              <div className="relative">
                <Input
                  id="openai-key"
                  type={showKey ? "text" : "password"}
                  value={openaiKey}
                  onChange={(e) => onOpenaiKeyChange(e.target.value)}
                  placeholder="sk-..."
                  className="font-mono pr-12"
                  data-testid="input-openai-key"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowKey(!showKey)}
                  data-testid="button-toggle-key-visibility"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                ট্রান্সক্রিপশন এবং সামারাইজেশনের জন্য ব্যবহৃত হবে
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 pb-3 border-b">ক্যালেন্ডার ইন্টিগ্রেশন</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-4 border-b">
              <div>
                <p className="font-medium">Google Calendar</p>
                <p className="text-sm text-muted-foreground">আপনার Google Calendar এর সাথে সংযুক্ত করুন</p>
              </div>
              <Button variant="outline" data-testid="button-connect-google">
                সংযুক্ত করুন
              </Button>
            </div>
            <div className="flex justify-between items-center py-4">
              <div>
                <p className="font-medium">Outlook Calendar</p>
                <p className="text-sm text-muted-foreground">আপনার Outlook Calendar এর সাথে সংযুক্ত করুন</p>
              </div>
              <Button variant="outline" data-testid="button-connect-outlook">
                সংযুক্ত করুন
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onSave} data-testid="button-save-settings">
          সেটিংস সংরক্ষণ করুন
        </Button>
      </div>
    </div>
  );
}
