import React, { useState } from 'react';

const HTMLCertificationQuiz = ({ onClose }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'q1',
      type: 'multiple',
      question: 'Which HTML5 element is used for independent, self-contained content?',
      options: ['<section>', '<article>', '<div>', '<aside>'],
      correct: 1,
      explanation: '<article> is for independent, self-contained content that could be distributed separately (blog posts, news articles, etc.)'
    },
    {
      id: 'q2',
      type: 'multiple',
      question: 'What is the correct HTML for creating a hyperlink?',
      options: [
        '<a url="http://example.com">',
        '<a href="http://example.com">',
        '<link src="http://example.com">',
        '<hyperlink>http://example.com</hyperlink>'
      ],
      correct: 1,
      explanation: 'The <a> tag with href attribute creates hyperlinks'
    },
    {
      id: 'q3',
      type: 'multiple',
      question: 'Which doctype is correct for HTML5?',
      options: [
        '<!DOCTYPE html>',
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 5.0//EN">',
        '<!DOCTYPE HTML5>',
        '<doctype html5>'
      ],
      correct: 0,
      explanation: 'HTML5 uses the simple <!DOCTYPE html> declaration'
    },
    {
      id: 'q4',
      type: 'multiple',
      question: 'Which attribute is used to provide alternative text for an image?',
      options: ['title', 'src', 'alt', 'longdesc'],
      correct: 2,
      explanation: 'The alt attribute provides alternative text for accessibility and when images fail to load'
    },
    {
      id: 'q5',
      type: 'multiple',
      question: 'What is the correct HTML for making a checkbox?',
      options: [
        '<input type="check">',
        '<input type="checkbox">',
        '<checkbox>',
        '<check>'
      ],
      correct: 1,
      explanation: '<input type="checkbox"> creates a checkbox input'
    },
    {
      id: 'q6',
      type: 'boolean',
      question: 'True or False: Block-level elements always start on a new line.',
      correct: true,
      explanation: 'Block-level elements (like <div>, <p>, <h1>) take up the full width available and start on a new line'
    },
    {
      id: 'q7',
      type: 'multiple',
      question: 'Which HTML element defines the title of a document?',
      options: ['<meta>', '<title>', '<head>', '<header>'],
      correct: 1,
      explanation: 'The <title> element inside <head> defines the document title shown in browser tabs'
    },
    {
      id: 'q8',
      type: 'multiple',
      question: 'What is the purpose of the <meta charset="UTF-8"> tag?',
      options: [
        'Sets page title',
        'Specifies character encoding',
        'Links to CSS',
        'Creates metadata'
      ],
      correct: 1,
      explanation: 'It specifies the character encoding for the HTML document, UTF-8 supports all languages'
    },
    {
      id: 'q9',
      type: 'boolean',
      question: 'True or False: HTML comments are visible to users viewing the page.',
      correct: false,
      explanation: 'HTML comments (<!-- comment -->) are not rendered in the browser, only visible in source code'
    },
    {
      id: 'q10',
      type: 'multiple',
      question: 'Which HTML5 element is used to define navigation links?',
      options: ['<navigation>', '<nav>', '<navigate>', '<links>'],
      correct: 1,
      explanation: 'The <nav> element defines a set of navigation links'
    },
    {
      id: 'q11',
      type: 'multiple',
      question: 'What is the correct HTML for inserting a line break?',
      options: ['<break>', '<br>', '<lb>', '<newline>'],
      correct: 1,
      explanation: '<br> or <br/> creates a line break (self-closing tag)'
    },
    {
      id: 'q12',
      type: 'multiple',
      question: 'Which attribute specifies a unique identifier for an HTML element?',
      options: ['class', 'id', 'name', 'key'],
      correct: 1,
      explanation: 'The id attribute provides a unique identifier for an element'
    },
    {
      id: 'q13',
      type: 'boolean',
      question: 'True or False: The <header> element can only be used once per page.',
      correct: false,
      explanation: '<header> can be used multiple times - for page header, article headers, section headers, etc.'
    },
    {
      id: 'q14',
      type: 'multiple',
      question: 'Which input type is used for email addresses in HTML5?',
      options: [
        '<input type="email">',
        '<input type="mail">',
        '<input type="e-mail">',
        '<email>'
      ],
      correct: 0,
      explanation: 'type="email" provides validation and appropriate mobile keyboard'
    },
    {
      id: 'q15',
      type: 'multiple',
      question: 'What is semantic HTML?',
      options: [
        'HTML with styling',
        'HTML that describes meaning, not presentation',
        'HTML with JavaScript',
        'HTML with animations'
      ],
      correct: 1,
      explanation: 'Semantic HTML uses elements that clearly describe their meaning (e.g., <article>, <nav>, <header>)'
    },
    {
      id: 'q16',
      type: 'boolean',
      question: 'True or False: <div> and <span> are semantic elements.',
      correct: false,
      explanation: '<div> and <span> are generic containers with no semantic meaning'
    },
    {
      id: 'q17',
      type: 'multiple',
      question: 'Which attribute makes an input field required?',
      options: ['validate', 'required', 'mandatory', 'needed'],
      correct: 1,
      explanation: 'The required attribute prevents form submission until the field is filled'
    },
    {
      id: 'q18',
      type: 'multiple',
      question: 'What does the <meta name="viewport"> tag do?',
      options: [
        'Sets page color',
        'Controls page zoom',
        'Controls responsive layout on mobile',
        'Sets page width'
      ],
      correct: 2,
      explanation: 'viewport meta tag controls responsive behavior on mobile devices'
    },
    {
      id: 'q19',
      type: 'boolean',
      question: 'True or False: HTML elements can be nested inside each other.',
      correct: true,
      explanation: 'HTML elements can be nested, but must be properly closed in reverse order of opening'
    },
    {
      id: 'q20',
      type: 'multiple',
      question: 'Which HTML5 element is used for self-contained content like widgets?',
      options: ['<section>', '<article>', '<aside>', '<widget>'],
      correct: 2,
      explanation: '<aside> is for tangentially related content like sidebars, widgets, pull quotes'
    },
    {
      id: 'q21',
      type: 'multiple',
      question: 'What is the correct HTML for creating a dropdown list?',
      options: ['<list>', '<select>', '<dropdown>', '<input type="list">'],
      correct: 1,
      explanation: '<select> with <option> elements creates a dropdown list'
    },
    {
      id: 'q22',
      type: 'boolean',
      question: 'True or False: The <strong> tag makes text bold and indicates importance.',
      correct: true,
      explanation: '<strong> indicates semantic importance (and renders bold by default)'
    },
    {
      id: 'q23',
      type: 'multiple',
      question: 'Which HTML element is used to define important text?',
      options: ['<important>', '<strong>', '<b>', '<em>'],
      correct: 1,
      explanation: '<strong> indicates semantic importance, while <b> is just visual'
    },
    {
      id: 'q24',
      type: 'multiple',
      question: 'What is the purpose of the <label> element in forms?',
      options: [
        'Styles the form',
        'Associates text with an input for accessibility',
        'Creates a button',
        'Validates input'
      ],
      correct: 1,
      explanation: '<label> associates text with inputs, improving accessibility and click area'
    },
    {
      id: 'q25',
      type: 'boolean',
      question: 'True or False: You can have multiple <h1> tags on one page.',
      correct: true,
      explanation: 'While traditionally one <h1> per page, HTML5 allows multiple in different sectioning elements'
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
    if (percentage >= 90) return '🏆 Excellent! Certification Ready!';
    if (percentage >= 80) return '✅ Very Good! Almost certification ready.';
    if (percentage >= 70) return '📚 Good! Review weak areas.';
    if (percentage >= 60) return '⚠️ Pass, but more study recommended.';
    return '❌ More study needed for certification.';
  };

  const getCertificationStatus = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'PASS - Certification Level';
    return 'NOT PASS - Need 80% to certify';
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
        width: '600px',
        maxWidth: '95vw',
        maxHeight: '85vh',
        borderRadius: '6px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        {/* Header */}
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
              HTML5 Certification Exam
            </div>
            <div style={{ fontSize: '7px', marginTop: '1px', opacity: 0.9 }}>
              {answeredCount}/{questions.length} answered • 80% required to pass
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
                </div>
              ))}
            </>
          ) : (
            <div>
              {/* Certification Result */}
              <div style={{
                padding: '10px',
                background: (score / questions.length) >= 0.8 ? '#e8f5e9' : '#ffeaea',
                border: '2px solid ' + getScoreColor(),
                borderRadius: '4px',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#1d1d1f', marginBottom: '2px' }}>
                  {getCertificationStatus()}
                </div>
                <div style={{ fontSize: '10px', fontWeight: '600', color: '#1d1d1f', marginBottom: '2px' }}>
                  Score: {score}/{questions.length} ({Math.round((score/questions.length)*100)}%)
                </div>
                <div style={{ fontSize: '8px', color: '#6e6e73' }}>
                  {getScoreMessage()}
                </div>
              </div>

              {/* Review Answers */}
              {questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                let isCorrect = false;

                if (q.type === 'multiple') {
                  isCorrect = userAnswer === q.correct;
                } else if (q.type === 'boolean') {
                  isCorrect = userAnswer === q.correct;
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
                    
                    <div style={{ 
                      fontSize: '6px', 
                      color: '#6e6e73',
                      marginTop: '2px',
                      paddingLeft: '12px',
                      fontStyle: 'italic'
                    }}>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
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
                Retake Exam
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
              Submit Exam ({answeredCount}/{questions.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HTMLCertificationQuiz;

