import { useState } from 'react';

import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={isDarkMode ? 'app-shell dark' : 'app-shell light'}>
      <header className="topbar glass-panel">
        <div>
          <p className="eyebrow">Hackathon-ready GovTech SaaS</p>
          <h1>Govs-AI</h1>
        </div>
        <button className="theme-toggle" onClick={() => setIsDarkMode((value) => !value)}>
          {isDarkMode ? 'Light mode' : 'Dark mode'}
        </button>
      </header>

      <main>
        <DashboardPage isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}
