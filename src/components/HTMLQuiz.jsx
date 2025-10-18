import React, { useState } from 'react';

const HTMLQuiz = ({ onClose }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'q1',
      type: 'multiple',
      question: 'How many lines of HTML are in the index.html file?',
      options: ['500+ lines', '100-200 lines', '14 lines', '1,000+ lines'],
      correct: 2 // Index of correct answer
    },
    {
      id: 'q2',
      type: 'multiple',
      question: 'What is the purpose of <div id="root"></div> in this app?',
      options: [
        "It's where the footer goes",
        "It's the mounting point for React to inject the entire app",
        "It's just for styling",
        "It's a navigation container"
      ],
      correct: 1
    },
    {
      id: 'q3',
      type: 'multiple',
      question: 'What does <script type="module" src="index.jsx"></script> do?',
      options: [
        'Loads a CSS file',
        'Loads the React application entry point',
        'Loads images',
        "Nothing, it's commented out"
      ],
      correct: 1
    },
    {
      id: 'q4',
      type: 'text',
      question: 'In a traditional HTML website, where is the hotel booking card HTML written?',
      correct: 'in the html file'
    },
    {
      id: 'q5',
      type: 'text',
      question: 'In this React app, where is the hotel booking card HTML created?',
      correct: 'react component'
    },
    {
      id: 'q6',
      type: 'boolean',
      question: 'True or False: The HTML you see in the browser (when you "Inspect Element") is exactly what\'s written in index.html',
      correct: false
    },
    {
      id: 'q7',
      type: 'multiple',
      question: 'When you click "Room Upgrade" pill, what happens to the HTML in the browser?',
      options: [
        'The page refreshes and loads new HTML from the server',
        'React updates only the changed parts of the DOM',
        'Nothing happens',
        'A new HTML file is loaded'
      ],
      correct: 1
    },
    {
      id: 'q8',
      type: 'multiple',
      question: 'How many separate HTML files does this app use?',
      options: [
        '1 (index.html only)',
        '5 (one per page)',
        '20+ (one per component)',
        '100+'
      ],
      correct: 0
    },
    {
      id: 'q9',
      type: 'boolean',
      question: 'True or False: Every time you click a button in the app, the browser requests a new HTML file from the server.',
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
        // Simple text matching (contains key words)
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
    if (percentage >= 90) return 'Excellent! 🌟 You have a great understanding!';
    if (percentage >= 70) return 'Good work! ✅ You grasp the concepts well.';
    if (percentage >= 50) return 'Getting there! 📚 Review the explanations.';
    return 'Keep learning! 💪 Try reviewing the concepts again.';
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999,
      background: '#ffffff',
      width: '800px',
      maxWidth: '95vw',
      height: '700px',
      maxHeight: '90vh',
      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      borderRadius: '10px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: '#667eea',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>
            HTML & React Architecture Quiz
          </h2>
          <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.9 }}>
            Test your understanding of this portfolio project
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: 'none',
            background: 'rgba(255,255,255,0.2)',
            color: '#ffffff',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '20px'
      }}>
        {!submitted ? (
          <>
            {questions.map((q, idx) => (
              <div key={q.id} style={{
                marginBottom: '24px',
                padding: '16px',
                background: '#f9f9fb',
                borderRadius: '8px',
                border: '1px solid #e0e0e0'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1d1d1f', marginBottom: '12px' }}>
                  {idx + 1}. {q.question}
                </div>
                
                {q.type === 'multiple' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((option, optIdx) => (
                      <label key={optIdx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        background: answers[q.id] === optIdx ? '#e3f2fd' : '#ffffff',
                        border: answers[q.id] === optIdx ? '2px solid #667eea' : '1px solid #d0d0d0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}>
                        <input
                          type="radio"
                          name={q.id}
                          checked={answers[q.id] === optIdx}
                          onChange={() => handleAnswer(q.id, optIdx)}
                          style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '13px', color: '#1d1d1f' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {q.type === 'boolean' && (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: answers[q.id] === true ? '#e3f2fd' : '#ffffff',
                      border: answers[q.id] === true ? '2px solid #667eea' : '1px solid #d0d0d0',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id] === true}
                        onChange={() => handleAnswer(q.id, true)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '13px', color: '#1d1d1f' }}>True</span>
                    </label>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      background: answers[q.id] === false ? '#e3f2fd' : '#ffffff',
                      border: answers[q.id] === false ? '2px solid #667eea' : '1px solid #d0d0d0',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id] === false}
                        onChange={() => handleAnswer(q.id, false)}
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '13px', color: '#1d1d1f' }}>False</span>
                    </label>
                  </div>
                )}
                
                {q.type === 'text' && (
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswer(q.id, e.target.value)}
                    placeholder="Type your answer here..."
                    style={{
                      width: '100%',
                      minHeight: '60px',
                      padding: '10px',
                      fontSize: '13px',
                      border: '1px solid #d0d0d0',
                      borderRadius: '6px',
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      resize: 'vertical'
                    }}
                  />
                )}
              </div>
            ))}
          </>
        ) : (
          /* Results Screen */
          <div>
            <div style={{
              textAlign: 'center',
              padding: '40px 20px'
            }}>
              <div style={{
                fontSize: '64px',
                marginBottom: '16px'
              }}>
                {score >= 8 ? '🌟' : score >= 6 ? '✅' : '📚'}
              </div>
              <div style={{
                fontSize: '32px',
                fontWeight: '700',
                color: getScoreColor(),
                marginBottom: '8px'
              }}>
                {score} / {questions.length}
              </div>
              <div style={{
                fontSize: '18px',
                color: '#6e6e73',
                marginBottom: '24px'
              }}>
                {getScoreMessage()}
              </div>
              
              {/* Answer breakdown */}
              <div style={{
                textAlign: 'left',
                marginTop: '32px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Review Your Answers:
                </h3>
                {questions.map((q, idx) => {
                  const userAnswer = answers[q.id];
                  let isCorrect = false;
                  
                  if (q.type === 'multiple') {
                    isCorrect = userAnswer === q.correct;
                  } else if (q.type === 'boolean') {
                    isCorrect = userAnswer === q.correct;
                  } else if (q.type === 'text') {
                    isCorrect = userAnswer && userAnswer.toLowerCase().includes(q.correct.toLowerCase());
                  }
                  
                  return (
                    <div key={q.id} style={{
                      padding: '12px',
                      marginBottom: '12px',
                      background: isCorrect ? '#d4edda' : '#ffe3e3',
                      border: `1px solid ${isCorrect ? '#34c759' : '#ff3b30'}`,
                      borderRadius: '6px'
                    }}>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <div style={{ fontSize: '20px' }}>
                          {isCorrect ? '✓' : '✗'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                            Question {idx + 1}: {q.question}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6e6e73' }}>
                            {q.type === 'multiple' && (
                              <>
                                Your answer: {q.options[userAnswer] || 'Not answered'}
                                {!isCorrect && (
                                  <div style={{ marginTop: '4px', color: '#34c759' }}>
                                    Correct: {q.options[q.correct]}
                                  </div>
                                )}
                              </>
                            )}
                            {q.type === 'boolean' && (
                              <>
                                Your answer: {userAnswer !== undefined ? (userAnswer ? 'True' : 'False') : 'Not answered'}
                                {!isCorrect && (
                                  <div style={{ marginTop: '4px', color: '#34c759' }}>
                                    Correct: {q.correct ? 'True' : 'False'}
                                  </div>
                                )}
                              </>
                            )}
                            {q.type === 'text' && (
                              <>
                                Your answer: {userAnswer || 'Not answered'}
                                {!isCorrect && (
                                  <div style={{ marginTop: '4px', color: '#34c759' }}>
                                    Should contain: "{q.correct}"
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: '16px 20px',
        background: '#f5f5f7',
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: submitted ? 'center' : 'space-between',
        alignItems: 'center'
      }}>
        {!submitted ? (
          <>
            <div style={{ fontSize: '13px', color: '#6e6e73' }}>
              {Object.keys(answers).length} / {questions.length} answered
            </div>
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length < questions.length}
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '600',
                background: Object.keys(answers).length < questions.length ? '#d1d1d6' : '#667eea',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: Object.keys(answers).length < questions.length ? 'not-allowed' : 'pointer'
              }}
            >
              Submit Quiz
            </button>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={resetQuiz}
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '600',
                background: '#667eea',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Retake Quiz
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '600',
                background: '#34c759',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HTMLQuiz;

