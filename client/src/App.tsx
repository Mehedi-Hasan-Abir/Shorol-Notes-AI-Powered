import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TabNavigation from "@/components/TabNavigation";
import ThemeToggle from "@/components/ThemeToggle";
import NotesPage from "@/pages/NotesPage";
import CalendarPage from "@/pages/CalendarPage";
import SettingsPage from "@/pages/SettingsPage";

function App() {
  const [activeTab, setActiveTab] = useState<"notes" | "calendar" | "settings">("notes");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col h-screen">
          <header className="border-b bg-background">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">সরল নোট</h1>
                <p className="text-xs text-muted-foreground">Shorol Notes</p>
              </div>
              <ThemeToggle />
            </div>
          </header>

          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          <main className="flex-1 overflow-y-auto">
            {activeTab === "notes" && <NotesPage />}
            {activeTab === "calendar" && <CalendarPage />}
            {activeTab === "settings" && <SettingsPage />}
          </main>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
