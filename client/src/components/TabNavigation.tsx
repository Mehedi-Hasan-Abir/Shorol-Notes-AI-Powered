import { FileText, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TabNavigationProps {
  activeTab: "notes" | "calendar" | "settings";
  onTabChange: (tab: "notes" | "calendar" | "settings") => void;
}

const tabs = [
  { id: "notes" as const, label: "নোট", icon: FileText },
  { id: "calendar" as const, label: "ক্যালেন্ডার", icon: Calendar },
  { id: "settings" as const, label: "সেটিংস", icon: Settings },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="border-b bg-background" data-testid="tab-navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                className={`flex-1 md:flex-initial px-6 py-3 rounded-none border-b-2 transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                }`}
                onClick={() => onTabChange(tab.id)}
                data-testid={`tab-${tab.id}`}
              >
                <Icon className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
