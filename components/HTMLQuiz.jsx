import React, { useState } from 'react';

const HTMLQuiz = ({ onClose }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'q1',
      type: 'multiple',
      question: 'How many lines of HTML are in index.html?',
      options: ['500+ lines', '100-200 lines', '14 lines', '1,000+ lines'],
      correct: 2
    },
    {
      id: 'q2',
      type: 'multiple',
      question: 'What is <div id="root"></div> for?',
      options: [
        "Footer container",
        "React mounting point",
        "Just for styling",
        "Navigation"
      ],
      correct: 1
    },
    {
      id: 'q3',
      type: 'multiple',
      question: 'What does <script type="module" src="index.jsx"> do?',
      options: [
        'Loads CSS',
        'Loads React app entry',
        'Loads images',
        "Nothing"
      ],
      correct: 1
    },
    {
      id: 'q4',
      type: 'text',
      question: 'Traditional HTML: Where is card HTML written?',
      correct: 'in the html file'
    },
    {
      id: 'q5',
      type: 'text',
      question: 'React app: Where is card HTML created?',
      correct: 'react component'
    },
    {
      id: 'q6',
      type: 'boolean',
      question: 'True/False: React writes HTML at build time only',
      correct: false
    },
    {
      id: 'q7',
      type: 'multiple',
      question: 'What creates the hotel card when you click "Search"?',
      options: [
        'Pre-written HTML in index.html',
        'JavaScript/React dynamically',
        'CSS animations',
        'Server sends new HTML'
      ],
      correct: 1
    },
    {
      id: 'q8',
      type: 'boolean',
      question: 'True/False: React updates only changed parts of the page',
      correct: true
    },
    {
      id: 'q9',
      type: 'boolean',
      question: 'True/False: Clicking button requests new HTML from server',
      correct: false
    },
    {
      id: 'q10',
      type: 'text',
      question: 'What does "Single Page Application (SPA)" mean?',
      correct: 'loads once'
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    
    questions.forEach(q => {
      const userAnswer = answers[q.id];
      
      if (q.type === 'multiple' && userAnswer === q.correct) {
        correctCount++;
      } else if (q.type === 'boolean' && userAnswer === q.correct) {
        correctCount++;
      } else if (q.type === 'text' && userAnswer) {
        const normalizedAnswer = userAnswer.toLowerCase();
        const normalizedCorrect = q.correct.toLowerCase();
        if (normalizedAnswer.includes(normalizedCorrect)) {
          correctCount++;
        }
      }
    });
    
    setScore(correctCount);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return '#34c759';
    if (percentage >= 60) return '#ff9500';
    return '#ff3b30';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return 'Excellent! 🌟';
    if (percentage >= 70) return 'Good work! ✅';
    if (percentage >= 50) return 'Getting there! 📚';
    return 'Keep learning! 💪';
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#ffffff',
        width: '520px',
        maxWidth: '95vw',
        maxHeight: '85vh',
        borderRadius: '6px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        {/* Compact Header */}
        <div style={{
          padding: '8px 10px',
          background: '#667eea',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '600' }}>
              HTML & React Quiz
            </div>
            <div style={{ fontSize: '7px', marginTop: '1px', opacity: 0.9 }}>
              {answeredCount}/{questions.length} answered
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#ffffff',
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '8px'
        }}>
          {!submitted ? (
            <>
              {questions.map((q, idx) => (
                <div key={q.id} style={{
                  marginBottom: '6px',
                  padding: '6px 8px',
                  background: '#fafafa',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px'
                }}>
                  <div style={{ 
                    fontSize: '8px', 
                    fontWeight: '600', 
                    color: '#1d1d1f',
                    marginBottom: '4px'
                  }}>
                    {idx + 1}. {q.question}
                  </div>

                  {q.type === 'multiple' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {q.options.map((option, optIdx) => (
                        <label
                          key={optIdx}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '3px 5px',
                            background: answers[q.id] === optIdx ? '#667eea' : '#ffffff',
                            color: answers[q.id] === optIdx ? '#ffffff' : '#1d1d1f',
                            border: '1px solid',
                            borderColor: answers[q.id] === optIdx ? '#667eea' : '#d1d1d6',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '7px',
                            transition: 'all 0.15s'
                          }}
                          onMouseOver={(e) => {
                            if (answers[q.id] !== optIdx) {
                              e.currentTarget.style.borderColor = '#667eea';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (answers[q.id] !== optIdx) {
                              e.currentTarget.style.borderColor = '#d1d1d6';
                            }
                          }}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            checked={answers[q.id] === optIdx}
                            onChange={() => handleAnswer(q.id, optIdx)}
                            style={{ width: '10px', height: '10px', cursor: 'pointer' }}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {q.type === 'boolean' && (
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[true, false].map(value => (
                        <button
                          key={String(value)}
                          onClick={() => handleAnswer(q.id, value)}
                          style={{
                            flex: 1,
                            padding: '3px 6px',
                            fontSize: '7px',
                            fontWeight: '600',
                            background: answers[q.id] === value ? '#667eea' : '#ffffff',
                            color: answers[q.id] === value ? '#ffffff' : '#1d1d1f',
                            border: '1px solid',
                            borderColor: answers[q.id] === value ? '#667eea' : '#d1d1d6',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                          }}
                          onMouseOver={(e) => {
                            if (answers[q.id] !== value) {
                              e.currentTarget.style.borderColor = '#667eea';
                            }
                          }}
                          onMouseOut={(e) => {
                            if (answers[q.id] !== value) {
                              e.currentTarget.style.borderColor = '#d1d1d6';
                            }
                          }}
                        >
                          {value ? 'True' : 'False'}
                        </button>
                      ))}
                    </div>
                  )}

                  {q.type === 'text' && (
                    <input
                      type="text"
                      value={answers[q.id] || ''}
                      onChange={(e) => handleAnswer(q.id, e.target.value)}
                      placeholder="Type your answer..."
                      style={{
                        width: '100%',
                        padding: '3px 5px',
                        fontSize: '7px',
                        border: '1px solid #d1d1d6',
                        borderRadius: '3px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                    />
                  )}
                </div>
              ))}
            </>
          ) : (
            <div>
              {/* Score Summary */}
              <div style={{
                padding: '8px',
                background: '#f9f9fb',
                border: '2px solid ' + getScoreColor(),
                borderRadius: '4px',
                marginBottom: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '11px', fontWeight: '600', color: '#1d1d1f' }}>
                  Score: {score}/{questions.length} ({Math.round((score/questions.length)*100)}%)
                </div>
                <div style={{ fontSize: '8px', color: '#6e6e73', marginTop: '2px' }}>
                  {getScoreMessage()}
                </div>
              </div>

              {/* Review Answers */}
              {questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                let isCorrect = false;
                let correctAnswer = '';

                if (q.type === 'multiple') {
                  isCorrect = userAnswer === q.correct;
                  correctAnswer = q.options[q.correct];
                } else if (q.type === 'boolean') {
                  isCorrect = userAnswer === q.correct;
                  correctAnswer = q.correct ? 'True' : 'False';
                } else if (q.type === 'text') {
                  const normalizedAnswer = (userAnswer || '').toLowerCase();
                  const normalizedCorrect = q.correct.toLowerCase();
                  isCorrect = normalizedAnswer.includes(normalizedCorrect);
                  correctAnswer = q.correct;
                }

                return (
                  <div key={q.id} style={{
                    marginBottom: '4px',
                    padding: '5px 6px',
                    background: isCorrect ? '#e8f5e9' : '#ffeaea',
                    border: '1px solid',
                    borderColor: isCorrect ? '#34c759' : '#ff3b30',
                    borderRadius: '3px'
                  }}>
                    <div style={{ 
                      fontSize: '7px', 
                      fontWeight: '600', 
                      color: '#1d1d1f',
                      marginBottom: '2px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      <span style={{ color: isCorrect ? '#34c759' : '#ff3b30' }}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      {idx + 1}. {q.question}
                    </div>
                    
                    {!isCorrect && (
                      <div style={{ 
                        fontSize: '6px', 
                        color: '#6e6e73',
                        marginTop: '2px',
                        paddingLeft: '12px'
                      }}>
                        Correct: {q.type === 'multiple' ? correctAnswer : q.correct}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '6px 8px',
          background: '#f5f5f7',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          gap: '4px',
          justifyContent: submitted ? 'space-between' : 'flex-end'
        }}>
          {submitted ? (
            <>
              <button
                onClick={resetQuiz}
                style={{
                  fontSize: '8px',
                  padding: '3px 8px',
                  background: '#ffffff',
                  color: '#667eea',
                  border: '1px solid #667eea',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f5f5f7'}
                onMouseOut={(e) => e.currentTarget.style.background = '#ffffff'}
              >
                Retake Quiz
              </button>
              <button
                onClick={onClose}
                style={{
                  fontSize: '8px',
                  padding: '3px 8px',
                  background: '#667eea',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#5566d9'}
                onMouseOut={(e) => e.currentTarget.style.background = '#667eea'}
              >
                Done
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              style={{
                fontSize: '8px',
                padding: '3px 10px',
                background: allAnswered ? '#667eea' : '#d1d1d6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '3px',
                cursor: allAnswered ? 'pointer' : 'not-allowed',
                fontWeight: '600'
              }}
              onMouseOver={(e) => allAnswered && (e.currentTarget.style.background = '#5566d9')}
              onMouseOut={(e) => allAnswered && (e.currentTarget.style.background = '#667eea')}
            >
              Submit ({answeredCount}/{questions.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HTMLQuiz;
