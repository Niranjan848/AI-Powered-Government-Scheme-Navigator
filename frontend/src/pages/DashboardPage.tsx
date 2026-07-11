import { useEffect, useMemo, useState } from 'react';

import { EmptyState } from '../components/EmptyState';
import { StatCard } from '../components/StatCard';
import { personas } from '../lib/demoData';
import { api } from '../services/api';
import type { PersonaSnapshot } from '../types';

type DashboardPageProps = {
  isDarkMode: boolean;
};

export function DashboardPage({ isDarkMode }: DashboardPageProps) {
  const [selectedPersonaIndex, setSelectedPersonaIndex] = useState(0);
  const [backendStatus, setBackendStatus] = useState<'loading' | 'online' | 'offline'>('loading');
  const [livePersona, setLivePersona] = useState<PersonaSnapshot | null>(null);
  const [chatMessage, setChatMessage] = useState('Explain PM Kisan eligibility for my profile.');
  const [assistantReply, setAssistantReply] = useState('Ask the assistant to see a live backend response here.');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const persona = personas[selectedPersonaIndex];

  useEffect(() => {
    let isMounted = true;

    async function loadLiveData() {
      try {
        await api.health();
        const [profileResponse, recommendationsResponse, historyResponse, notificationsResponse] = await Promise.all([
          api.profile(),
          api.recommendations(),
          api.history(),
          api.notifications(),
        ]);

        if (!isMounted) {
          return;
        }

        setBackendStatus('online');
        setLivePersona({
          ...persona,
          profileCompletion: profileResponse.profile_completion ?? persona.profileCompletion,
          readinessScore: profileResponse.readiness_score ?? persona.readinessScore,
          recentChats: historyResponse.items?.length
            ? historyResponse.items.map((item) => item.title ?? item.detail ?? 'Conversation update')
            : persona.recentChats,
          recommendedSchemes: recommendationsResponse.items?.length
            ? recommendationsResponse.items.map((item) => ({
                id: item.id ?? item.name ?? 'scheme',
                name: item.name ?? 'Government scheme',
                ministry: item.ministry ?? 'Unknown ministry',
                status: (item.status as PersonaSnapshot['recommendedSchemes'][number]['status']) ?? 'Recommended',
                score: item.score ?? persona.readinessScore,
              }))
            : persona.recommendedSchemes,
          savedSchemes: persona.savedSchemes,
          applicationTimeline: persona.applicationTimeline,
          notifications: notificationsResponse.items?.length
            ? notificationsResponse.items.map((item) => ({
                title: item.title ?? 'Update',
                detail: item.detail ?? 'Notification received',
              }))
            : persona.notifications,
        });
      } catch {
        if (isMounted) {
          setBackendStatus('offline');
          setLivePersona(null);
        }
      }
    }

    loadLiveData();

    return () => {
      isMounted = false;
    };
  }, [persona]);

  const activePersona = livePersona ?? persona;

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 2600);
  }

  async function handleChatSubmit(event: { preventDefault(): void }) {
    event.preventDefault();

    if (!chatMessage.trim()) {
      showToast('Enter a question for the assistant.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.chat({ message: chatMessage, conversation_id: selectedPersonaIndex.toString() });
      setAssistantReply(response.response);
      showToast('Assistant response loaded from the backend.');
    } catch {
      setAssistantReply('The backend chat endpoint is unavailable right now.');
      showToast('Chat request failed.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleBookmark(schemeId: string) {
    try {
      await api.bookmark(schemeId);
      showToast('Scheme bookmarked successfully.');
    } catch {
      showToast('Could not bookmark scheme.');
    }
  }

  async function handleUpload(event: { target: HTMLInputElement }) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.uploadPdf(formData);
      if (response.ok) {
        showToast(`Queued ${file.name} for indexing.`);
      } else {
        showToast('Upload request returned an error.');
      }
    } catch {
      showToast('Upload failed.');
    } finally {
      event.target.value = '';
    }
  }

  const readinessBars = useMemo(
    () => [
      { label: 'Profile completion', value: activePersona.profileCompletion },
      { label: 'Readiness score', value: activePersona.readinessScore },
      { label: 'Recommendation confidence', value: Math.min(100, activePersona.readinessScore + 4) },
    ],
    [activePersona],
  );

  return (
    <section className="dashboard-grid">
      <article className="glass-panel hero-card">
        <div className="hero-headline">
          <div>
            <p className="eyebrow">Citizen and admin cockpit</p>
            <h2>Explainable scheme discovery with memory, retrieval, and production-grade UX.</h2>
          </div>
          <div className="chip-row">
            <span className="chip">JWT Auth</span>
            <span className="chip">LangGraph</span>
            <span className="chip">RAG</span>
            <span className="chip">Redis Memory</span>
          </div>
        </div>

        <div className="backend-status-bar">
          <span className={`status-dot ${backendStatus}`} />
          <span className="status-label">
            {backendStatus === 'loading' && 'Connecting to backend...'}
            {backendStatus === 'online' && 'Backend connected — live data active'}
            {backendStatus === 'offline' && 'Backend offline — showing demo data'}
          </span>
        </div>

        <div className="persona-tabs">
          {personas.map((entry, index) => (
            <button
              key={entry.name}
              className={index === selectedPersonaIndex ? 'persona-button active' : 'persona-button'}
              onClick={() => setSelectedPersonaIndex(index)}
            >
              {entry.name}
            </button>
          ))}
        </div>
      </article>

      <section className="span-12 glass-panel section-card action-panel">
        <div className="action-grid">
          <form className="action-card" onSubmit={handleChatSubmit}>
            <div className="action-copy">
              <p className="eyebrow">Live assistant</p>
              <h3 className="card-title">Ask the scheme copilot</h3>
            </div>
            <label className="field-label" htmlFor="chat-message">Citizen question</label>
            <textarea
              id="chat-message"
              className="text-input"
              rows={4}
              value={chatMessage}
              onChange={(event) => setChatMessage(event.target.value)}
            />
            <div className="action-row">
              <button className="primary-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Thinking...' : 'Generate answer'}
              </button>
              <button className="secondary-button" type="button" onClick={() => setChatMessage('Which schemes fit a farmer with crop insurance needs?')}>
                Load farmer prompt
              </button>
            </div>
            <p className="assistant-response">{assistantReply}</p>
          </form>

          <div className="action-card">
            <div className="action-copy">
              <p className="eyebrow">Document ingestion</p>
              <h3 className="card-title">Upload scheme PDFs</h3>
            </div>
            <label className="file-upload">
              <input type="file" accept="application/pdf" onChange={handleUpload} />
              <span>Choose a PDF to index</span>
            </label>
            <p className="muted">Connects directly to the backend upload endpoint.</p>

            <div className="action-copy" style={{ marginTop: 18 }}>
              <p className="eyebrow">One-click save</p>
              <h3 className="card-title">Bookmark a recommended scheme</h3>
            </div>
            <button className="primary-button" type="button" onClick={() => handleBookmark(activePersona.recommendedSchemes[0]?.id ?? 'scheme')}>
              Save top recommendation
            </button>
          </div>
        </div>
      </section>

      <div className="span-12 split-view">
        <section className="glass-panel section-card">
          <h3 className="card-title">Citizen dashboard</h3>
          <div className="grid-slim">
            <div className="stack-list">
              <StatCard label="Profile completion" value={`${activePersona.profileCompletion}%`} detail="All key profile fields are being tracked." />
              <StatCard label="Readiness score" value={activePersona.readinessScore} detail="Checklist coverage and eligibility confidence." />
            </div>
          </div>
          <div className="bar-chart" style={{ marginTop: 18 }}>
            {readinessBars.map((bar) => (
              <div key={bar.label} className="bar-row">
                <span className="muted">{bar.label}</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${bar.value}%` }} />
                </div>
                <strong>{bar.value}%</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel section-card">
          <h3 className="card-title">Admin dashboard</h3>
          <div className="bar-chart">
            <div className="bar-row">
              <span className="muted">Registered users</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: '76%' }} /></div>
              <strong>1,248</strong>
            </div>
            <div className="bar-row">
              <span className="muted">Uploaded PDFs</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: '62%' }} /></div>
              <strong>84</strong>
            </div>
            <div className="bar-row">
              <span className="muted">Vector DB health</span>
              <div className="bar-track"><div className="bar-fill" style={{ width: '92%' }} /></div>
              <strong>Healthy</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="span-4 glass-panel section-card">
        <h3 className="card-title">Recent chats</h3>
        <ul className="stack-list">
          {activePersona.recentChats.map((chat) => (
            <li key={chat} className="list-item">
              {chat}
            </li>
          ))}
        </ul>
      </section>

      <section className="span-4 glass-panel section-card">
        <h3 className="card-title">Recommended schemes</h3>
        <ul className="kpi-list">
          {activePersona.recommendedSchemes.map((scheme) => (
            <li key={scheme.id} className="list-item">
              <strong>{scheme.name}</strong>
              <p className="muted">{scheme.ministry}</p>
              <p className="muted">{scheme.status} - match score {scheme.score}%</p>
              <button className="secondary-button compact" type="button" onClick={() => handleBookmark(scheme.id)}>
                Bookmark
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="span-4 glass-panel section-card">
        <h3 className="card-title">Saved schemes</h3>
        {activePersona.savedSchemes.length === 0 ? (
          <EmptyState title="No saved schemes yet" detail="Saved schemes will appear here after the first bookmark." />
        ) : (
          <ul className="bookmark-list">
            {activePersona.savedSchemes.map((scheme) => (
              <li key={scheme} className="bookmark-item">
                {scheme}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="span-6 glass-panel section-card">
        <h3 className="card-title">Application timeline</h3>
        <ul className="timeline-list">
          {activePersona.applicationTimeline.map((entry) => (
            <li key={entry.title} className="timeline-item">
              <strong>{entry.title}</strong>
              <p className="muted">{entry.detail}</p>
              <p className="muted">{entry.timestamp}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="span-6 glass-panel section-card">
        <h3 className="card-title">Notifications and updates</h3>
        <div className="stack-list">
          {activePersona.notifications.length === 0 ? (
            <EmptyState title="No notifications" detail="Policy alerts and deadline reminders will show up here." />
          ) : (
            activePersona.notifications.map((notification) => (
              <div key={notification.title} className="notification-item">
                <strong>{notification.title}</strong>
                <p className="muted">{notification.detail}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="span-8 glass-panel section-card">
        <h3 className="card-title">AI workflow status</h3>
        <p className="muted">The assistant is currently in {isDarkMode ? 'dark' : 'light'} mode and ready to explain eligibility, retrieve context, and generate checklists.</p>
        <div className="chip-row" style={{ marginTop: 16 }}>
          <span className="chip">Planning</span>
          <span className="chip">Tool usage</span>
          <span className="chip">Memory</span>
          <span className="chip">Autonomous execution</span>
        </div>
      </section>

      <section className="span-12 glass-panel section-card">
        <h3 className="card-title">Empty state example</h3>
        <EmptyState title="No pending application in this demo slot" detail="Use this space for an onboarding or zero-data state in the live build." />
      </section>

      {toastMessage ? <div className="toast">{toastMessage}</div> : null}
    </section>
  );
}
