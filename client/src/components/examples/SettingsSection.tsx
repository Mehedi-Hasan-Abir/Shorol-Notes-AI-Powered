import { useState } from 'react';
import SettingsSection from '../SettingsSection';

export default function SettingsSectionExample() {
  const [key, setKey] = useState('');
  
  return (
    <SettingsSection
      openaiKey={key}
      onOpenaiKeyChange={setKey}
      onSave={() => console.log('Settings saved:', key)}
    />
  );
}
