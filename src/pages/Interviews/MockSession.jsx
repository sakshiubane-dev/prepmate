import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Mic, MicOff, Volume2, VolumeX, Send, ArrowRight, Clock, ShieldCheck, CheckCircle2, AlertCircle, X, RotateCcw } from 'lucide-react';
import { aiOrchestrator } from '../../lib/ai/aiOrchestrator';

export default function MockSession({ interviewType = 'TECHNICAL', candidate, onFinishInterview }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speechError, setSpeechError] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationHistory, setEvaluationHistory] = useState([]);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const recognitionRef = useRef(null);
  const shouldRecordRef = useRef(false);
  const restartTimeoutRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animFrameRef = useRef(null);
  const utteranceRef = useRef(null);

  const getQuestionSet = (type, branch = 'cs') => {
    if (type === 'interviews-hr') {
      return [
        { id: "h_1", question: "Tell me about a time you had a technical conflict with a team member. How did you resolve it?", type: "HR" },
        { id: "h_2", question: "What is your biggest engineering weakness and how are you working to improve it?", type: "HR" },
        { id: "h_3", question: "Where do you see yourself in 5 years in your engineering career?", type: "HR" }
      ];
    }

    if (type === 'interviews-fullmock' || type === 'mixed') {
      switch(branch) {
        case 'extc':
          return [
            { id: "m_1", question: "Aptitude: A signal is sampled at 8 kHz. What is the Nyquist rate required to prevent aliasing?", type: "APTITUDE" },
            { id: "m_2", question: "Explain the difference between a BJT and a MOSFET in terms of operation and applications.", type: "TECHNICAL" },
            { id: "m_3", question: "Tell me about a high-pressure project deadline and how you prioritized tasks.", type: "HR" }
          ];
        case 'mechanical':
          return [
            { id: "m_1", question: "Aptitude: Calculate the efficiency of a Carnot engine operating between 500K and 300K.", type: "APTITUDE" },
            { id: "m_2", question: "Explain the Second Law of Thermodynamics and how entropy applies to real heat engines.", type: "TECHNICAL" },
            { id: "m_3", question: "Describe a situation where a mechanical component failed during testing and how you diagnosed it.", type: "HR" }
          ];
        case 'cs':
        default:
          return [
            { id: "f_1", question: "Write a function to reverse a linked list in O(N) time and O(1) space.", type: "TECHNICAL" },
            { id: "f_2", question: "Design a URL shortener like TinyURL. What database and caching layer would you choose?", type: "SYSTEM_DESIGN" },
            { id: "f_3", question: "Tell me about a time you failed in a project and what you learned from it.", type: "HR" }
          ];
      }
    }

    // Branch specific technical questions
    switch(branch) {
      case 'extc':
        return [
          { id: "extc_1", question: "Explain the difference between BJT and MOSFET. When would you prefer MOSFET in power electronics?", type: "TECHNICAL" },
          { id: "extc_2", question: "What is the purpose of modulation in communication systems? Compare AM and FM noise immunity.", type: "TECHNICAL" },
          { id: "extc_3", question: "How does an ADC work? Explain resolution, sampling rate, and quantization error.", type: "TECHNICAL" }
        ];
      case 'mechanical':
        return [
          { id: "mech_1", question: "Explain the fundamental difference between stress and strain. How does Hooke's Law relate them?", type: "TECHNICAL" },
          { id: "mech_2", question: "Explain the second law of thermodynamics and the concept of entropy in closed systems.", type: "TECHNICAL" },
          { id: "mech_3", question: "Why are bearings used in rotational machinery and what factors affect fatigue failure?", type: "TECHNICAL" }
        ];
      case 'cs':
      default:
        return [
          { id: "t_1", question: "Explain the JavaScript Event Loop and the difference between Macro-tasks and Micro-tasks.", type: "TECHNICAL" },
          { id: "t_2", question: "How does React's Virtual DOM work and why is it faster than direct DOM manipulation?", type: "TECHNICAL" },
          { id: "t_3", question: "What are the key differences between SQL and NoSQL databases?", type: "TECHNICAL" }
        ];
    }
  };

  const getPersona = (type, branch = 'cs') => {
    const branchNames = { cs: 'Software', extc: 'EXTC Core', mechanical: 'Mechanical Core' };
    const bName = branchNames[branch] || 'Software';

    switch(type) {
      case 'interviews-technical': return `Senior ${bName} Lead`;
      case 'interviews-hr': return "HR Manager & Recruiter";
      case 'interviews-fullmock': return `${bName} MNC Interview Panel`;
      default: return `AI Senior ${bName} Interviewer`;
    }
  };

  const questionSet = getQuestionSet(interviewType, candidate?.branch);
  const personaTitle = getPersona(interviewType, candidate?.branch);
  const currentQuestion = questionSet[currentQuestionIdx] || questionSet[0];

  // Timer tick effect
  useEffect(() => {
    const interval = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const playQuestionVoice = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
      
      setTimeout(() => {
        if (!isMuted) {
          utteranceRef.current = new SpeechSynthesisUtterance(currentQuestion.question);
          utteranceRef.current.rate = 1.0;
          window._currentUtterance = utteranceRef.current;
          window.speechSynthesis.speak(utteranceRef.current);
        }
      }, 50);
    }
  };

  // Web Speech API Voice synthesis prompt read
  useEffect(() => {
    playQuestionVoice();
    
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentQuestionIdx, isMuted, currentQuestion.question]);

  // Audio metering via Web Audio API for responsive visual equalizer
  const startAudioMetering = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream;

    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        if (!shouldRecordRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const level = Math.min(100, Math.round((avg / 128) * 100));
        setAudioLevel(level);
        animFrameRef.current = requestAnimationFrame(updateLevel);
      };
      updateLevel();
    }
    return stream;
  };

  const stopAudioMetering = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch (e) {
        // ignore
      }
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (e) {
          // ignore
        }
      });
      mediaStreamRef.current = null;
    }
    setAudioLevel(0);
  };

  const stopVoiceRecording = () => {
    shouldRecordRef.current = false;
    setIsRecording(false);

    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
      restartTimeoutRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    stopAudioMetering();

    // Flush any pending interim transcript into userAnswer
    setInterimTranscript(interim => {
      if (interim && interim.trim()) {
        setUserAnswer(prev => {
          const trimmed = prev.trim();
          const pending = interim.trim();
          return trimmed ? `${trimmed} ${pending}` : pending;
        });
      }
      return '';
    });
  };

  const startVoiceRecording = async () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Google Chrome, Microsoft Edge, or Safari.');
      return;
    }

    setSpeechError(null);

    // Cancel TTS so mic doesn't catch interviewer's question audio
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Try starting audio visualizer metering (fails gracefully if getUserMedia unavailable)
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await startAudioMetering();
      }
    } catch (meterErr) {
      console.warn('Audio metering stream unavailable (speech recognition will proceed directly):', meterErr);
    }

    try {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = navigator.language || 'en-US';

      shouldRecordRef.current = true;
      setIsRecording(true);

      recognition.onresult = (event) => {
        let interimText = '';
        let finalizedText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          const transcriptChunk = item[0]?.transcript || '';
          if (item.isFinal) {
            finalizedText += (finalizedText ? ' ' : '') + transcriptChunk;
          } else {
            interimText += transcriptChunk;
          }
        }

        if (finalizedText.trim()) {
          setUserAnswer(prev => {
            const trimmed = prev.trim();
            const chunk = finalizedText.trim();
            return trimmed ? `${trimmed} ${chunk}` : chunk;
          });
        }

        setInterimTranscript(interimText);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition event:', event.error);
        if (event.error === 'no-speech') {
          // Pause in candidate speaking is normal - continue listening
          return;
        }
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setSpeechError('Microphone permission blocked. Please click the lock or site settings icon in your browser URL bar and set Microphone to "Allow".');
          stopVoiceRecording();
          return;
        }
        if (event.error === 'audio-capture') {
          setSpeechError('No microphone was detected. Please ensure your microphone is plugged in and enabled in system settings.');
          stopVoiceRecording();
          return;
        }
        if (event.error === 'network') {
          setSpeechError('Network error connecting to speech recognition service. Please check your internet connection or type your answer.');
          stopVoiceRecording();
          return;
        }
        if (event.error === 'aborted') {
          return;
        }
      };

      recognition.onend = () => {
        // If user didn't explicitly press Stop, auto-restart with a short debounce to prevent unexpected cutoff
        if (shouldRecordRef.current) {
          restartTimeoutRef.current = setTimeout(() => {
            if (shouldRecordRef.current && recognitionRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                // Already running or restarting
              }
            }
          }, 200);
        } else {
          setIsRecording(false);
          setInterimTranscript('');
        }
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setSpeechError('Failed to start speech recognition: ' + (err.message || 'Please check mic permissions.'));
      stopVoiceRecording();
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      stopVoiceRecording();
    } else {
      startVoiceRecording();
    }
  };

  // Full cleanup on unmount or question step
  useEffect(() => {
    return () => {
      shouldRecordRef.current = false;
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      stopAudioMetering();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendAnswer = async () => {
    const finalAnswer = (userAnswer + (interimTranscript ? ' ' + interimTranscript : '')).trim();
    if (!finalAnswer) return;

    if (isRecording) {
      stopVoiceRecording();
    }

    setEvaluating(true);
    const evalRes = await aiOrchestrator.evaluateAnswer({
      type: currentQuestion.type,
      question: currentQuestion.question,
      answer: finalAnswer
    });
    setEvaluating(false);

    const historyItem = {
      question: currentQuestion.question,
      answer: finalAnswer,
      evaluation: evalRes
    };

    const newHistory = [...evaluationHistory, historyItem];
    setEvaluationHistory(newHistory);
    setUserAnswer('');
    setInterimTranscript('');

    if (currentQuestionIdx < questionSet.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // Finish Interview Session
      onFinishInterview({
        type: interviewType,
        history: newHistory,
        duration: `${Math.floor(timerSeconds / 60)}m ${timerSeconds % 60}s`,
        avgScore: Math.round(newHistory.reduce((acc, h) => acc + h.evaluation.score, 0) / newHistory.length)
      });
    }
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ padding: '2rem', margin: '0', minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-dark)' }}>
      {/* Top Session Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Sparkles size={20} color="var(--accent-primary)" />
          <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-main)' }}>
            AI Mock Interviewer Session
          </h2>
          <span className="badge badge-indigo">
            Question {currentQuestionIdx + 1} of {questionSet.length}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <button onClick={() => setIsMuted(!isMuted)} className="btn btn-outline btn-sm">
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} color="var(--accent-emerald)" />}
            <span>{isMuted ? 'Voice Off' : 'Voice On'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--accent-amber)' }}>
            <Clock size={16} />
            <span>{formatTimer(timerSeconds)}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: AI Interviewer Persona + Candidate Input Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1, minHeight: 0 }}>
        {/* Left Column: AI Interviewer Prompt Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'linear-gradient(180deg, var(--bg-surface) 0%, rgba(17, 22, 37, 0.95) 100%)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f46e5, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(236, 72, 153, 0.35)',
                border: '3px solid var(--border-color)'
              }}>
                <Sparkles size={32} color="#fff" />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  {personaTitle}
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
                  Active Assessment Mode ({interviewType.replace('interviews-', '').toUpperCase()})
                </span>
              </div>
            </div>

            {/* Question Text Box */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'var(--bg-dark)',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-color)',
              marginBottom: '1.5rem',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', display: 'block' }}>
                  INTERVIEWER QUESTION:
                </span>
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      speechSynthesis.cancel();
                      setTimeout(() => {
                        const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
                        window._currentUtterance = utterance;
                        window.speechSynthesis.speak(utterance);
                      }, 50);
                    }
                  }} 
                  className="btn btn-sm" 
                  style={{ padding: '0.25rem 0.5rem', background: 'var(--bg-surface-hover)', border: '1px solid var(--border-color)', color: 'var(--text-dim)' }}
                  title="Replay Audio"
                >
                  <Volume2 size={14} />
                  <span style={{ fontSize: '0.75rem' }}>Replay</span>
                </button>
              </div>
              <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-main)', lineHeight: 1.6 }}>
                "{currentQuestion.question}"
              </p>
            </div>
          </div>

          {/* Previous Question Feedback Snippet */}
          {evaluationHistory.length > 0 && (
            <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                  PREVIOUS ANSWER EVALUATION:
                </span>
                <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>
                  {evaluationHistory[evaluationHistory.length - 1].evaluation.score}%
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {evaluationHistory[evaluationHistory.length - 1].evaluation.strengths[0]}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Candidate Answer Input (Speech/Text) */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)' }}>
                YOUR RESPONSE (TEXT OR SPEECH)
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {userAnswer && !isRecording && (
                  <button
                    onClick={() => setUserAnswer('')}
                    className="btn btn-sm"
                    style={{ padding: '0.25rem 0.5rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-dim)', fontSize: '0.75rem' }}
                    title="Clear text"
                  >
                    <RotateCcw size={12} />
                    <span>Clear</span>
                  </button>
                )}
                <button
                  onClick={toggleVoiceRecording}
                  className="btn btn-sm"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    backgroundColor: isRecording ? '#dc2626' : 'var(--bg-surface-hover)',
                    color: isRecording ? '#ffffff' : 'var(--text-main)',
                    border: isRecording ? '1px solid #b91c1c' : '1px solid var(--border-color)',
                    fontWeight: 600,
                    boxShadow: isRecording ? '0 0 16px rgba(220, 38, 38, 0.45)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {isRecording ? <MicOff size={16} /> : <Mic size={16} color="var(--accent-primary)" />}
                  <span>{isRecording ? 'Stop Recording' : 'Voice Input'}</span>
                </button>
              </div>
            </div>

            {/* Speech error banner */}
            {speechError && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.625rem 0.875rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.5rem',
                color: '#ef4444',
                fontSize: '0.8125rem',
                marginBottom: '0.75rem',
                gap: '0.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>{speechError}</span>
                </div>
                <button
                  onClick={() => setSpeechError(null)}
                  style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.25rem' }}
                  title="Dismiss"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Active voice visualizer bar */}
            {isRecording && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.625rem 0.875rem',
                backgroundColor: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.25)',
                borderRadius: '0.5rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                    boxShadow: '0 0 10px #ef4444',
                    animation: 'pulse 1.2s infinite'
                  }} />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    Listening... Speak your answer now
                  </span>
                  {/* Dynamic Equalizer Bars */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }}>
                    {[0.6, 1.0, 0.8, 1.2, 0.7].map((factor, idx) => {
                      const h = audioLevel > 0 
                        ? Math.max(4, Math.min(16, (audioLevel / 100) * 16 * factor))
                        : 4;
                      return (
                        <span
                          key={idx}
                          style={{
                            width: '3px',
                            height: `${h}px`,
                            backgroundColor: 'var(--accent-primary)',
                            borderRadius: '2px',
                            transition: audioLevel > 0 ? 'height 0.08s ease' : 'none',
                            animation: audioLevel === 0 ? `soundwave 1s ease-in-out infinite ${idx * 0.15}s` : 'none'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  Click "Stop Recording" when done
                </span>
              </div>
            )}

            {/* Live interim transcript preview */}
            {interimTranscript && (
              <div style={{
                padding: '0.5rem 0.75rem',
                backgroundColor: 'var(--bg-dark)',
                border: '1px dashed var(--accent-primary)',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                color: 'var(--accent-primary)',
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Sparkles size={14} style={{ flexShrink: 0 }} />
                <span>Transcribing: "{interimTranscript}"</span>
              </div>
            )}

            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="State your answer clearly or click 'Voice Input' to speak. Include trade-offs, Big-O complexity, or STAR framework metrics where applicable..."
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'var(--bg-dark)',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                padding: '1.25rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border-color)',
                outline: 'none',
                resize: 'none',
                lineHeight: 1.6,
                marginBottom: '1rem'
              }}
            />
          </div>

          <button
            onClick={handleSendAnswer}
            disabled={evaluating || (!userAnswer.trim() && !interimTranscript.trim())}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {evaluating ? (
              <span>Evaluating Response...</span>
            ) : (
              <>
                <span>{currentQuestionIdx < questionSet.length - 1 ? 'Submit & Next Question' : 'Submit & Finish Mock Session'}</span>
                <Send size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
