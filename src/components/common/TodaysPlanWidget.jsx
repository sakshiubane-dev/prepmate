import React, { useState } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, ArrowUpRight } from 'lucide-react';

export default function TodaysPlanWidget({ plan = [], onNavigate }) {
  const [tasks, setTasks] = useState(plan);

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={18} color="var(--accent-emerald)" />
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
            Today's Preparation Plan
          </h3>
        </div>
        <span className="badge badge-emerald">
          {completedCount} / {tasks.length} Done
        </span>
      </div>

      {/* Plan Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
        {tasks.map((t) => (
          <div key={t.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem',
            backgroundColor: t.completed ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-surface-hover)',
            border: `1px solid ${t.completed ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)'}`,
            borderRadius: '0.5rem',
            transition: 'all 0.15s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
              <button
                onClick={() => toggleTask(t.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.completed ? 'var(--accent-emerald)' : 'var(--text-dim)', padding: 0 }}
              >
                {t.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </button>

              <div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: t.completed ? 'var(--text-muted)' : '#fff',
                  textDecoration: t.completed ? 'line-through' : 'none'
                }}>
                  {t.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.125rem' }}>
                  <span className="badge badge-indigo" style={{ padding: '0.125rem 0.375rem', fontSize: '0.625rem' }}>
                    {t.category}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {t.duration}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate(t.route)}
              className="btn btn-outline btn-sm"
              style={{ padding: '0.25rem 0.5rem' }}
            >
              <span>Practice</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
