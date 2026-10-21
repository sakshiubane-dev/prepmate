import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, CheckCircle2, Circle, Clock, ArrowRight, Target, Activity } from 'lucide-react';

export default function TodaysPlanWidget({ plan = [], onNavigate }) {
  const [tasks, setTasks] = useState(plan);

  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <AnimatePresence>
        {tasks.map((t) => (
          <motion.div 
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={t.id} 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              backgroundColor: t.completed ? 'rgba(52, 211, 153, 0.05)' : 'var(--bg-surface)',
              border: `1px solid ${t.completed ? 'rgba(52, 211, 153, 0.2)' : 'var(--border-color)'}`,
              borderRadius: '0.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {t.completed && (
              <motion.div
                layoutId={`bg-${t.id}`}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'linear-gradient(90deg, rgba(52, 211, 153, 0.05) 0%, transparent 100%)',
                  zIndex: 0
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1, zIndex: 1 }}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleTask(t.id)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  color: t.completed ? 'var(--accent-emerald)' : 'var(--text-dim)', 
                  padding: 0,
                  marginTop: '0.125rem'
                }}
              >
                {t.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </motion.button>

              <div style={{ flex: 1 }}>
                <motion.div 
                  layout="position"
                  style={{
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--text-main)',
                    marginBottom: '0.25rem'
                  }}
                >
                  {t.title}
                </motion.div>

                <AnimatePresence mode="wait">
                  {!t.completed ? (
                    <motion.div 
                      key="incomplete"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}
                    >
                      <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{t.category}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {t.duration}
                      </span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Activity size={12} /> Medium
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="complete"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 500 }}
                    >
                      <span>Completed</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Target size={12} /> +4 skill points
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {!t.completed && (
              <motion.button
                whileHover={{ x: 2, background: 'var(--bg-surface-active)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(t.route)}
                className="btn btn-sm"
                style={{ 
                  zIndex: 1,
                  padding: '0.4rem 0.75rem',
                  background: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  fontWeight: 500
                }}
              >
                <span>Start</span>
                <ArrowRight size={14} />
              </motion.button>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
