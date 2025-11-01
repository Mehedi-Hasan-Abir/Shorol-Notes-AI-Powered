import { useState } from 'react';
import TabNavigation from '../TabNavigation';

export default function TabNavigationExample() {
  const [tab, setTab] = useState<"notes" | "calendar" | "settings">("notes");
  
  return (
    <div>
      <TabNavigation activeTab={tab} onTabChange={setTab} />
      <div className="p-6">
        <p className="text-muted-foreground">সক্রিয় ট্যাব: {tab}</p>
      </div>
    </div>
  );
}
