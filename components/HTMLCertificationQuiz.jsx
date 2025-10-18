import React, { useState } from 'react';

const HTMLCertificationQuiz = ({ onClose }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 'q1',
      type: 'multiple',
      question: 'What is the purpose of the "defer" attribute in a <script> tag?',
      options: [
        'Loads script asynchronously',
        'Executes script after HTML parsing, maintains order',
        'Prevents script execution',
        'Loads script from cache'
      ],
      correct: 1,
      explanation: '"defer" downloads the script during HTML parsing but executes it only after parsing completes, maintaining execution order. Critical for performance optimization.'
    },
    {
      id: 'q2',
      type: 'multiple',
      question: 'Which HTTP header should be set to enable CORS (Cross-Origin Resource Sharing)?',
      options: [
        'Access-Control-Allow-Origin',
        'X-Frame-Options',
        'Content-Security-Policy',
        'X-Content-Type-Options'
      ],
      correct: 0,
      explanation: 'Access-Control-Allow-Origin header enables CORS, allowing resources to be requested from different domains.'
    },
    {
      id: 'q3',
      type: 'multiple',
      question: 'What does the "rel" attribute with value "noopener" prevent?',
      options: [
        'SEO penalties',
        'Security vulnerability where new window can access opener window',
        'Cookie sharing',
        'Form submission'
      ],
      correct: 1,
      explanation: 'rel="noopener" prevents the opened page from accessing window.opener, protecting against tabnabbing attacks.'
    },
    {
      id: 'q4',
      type: 'boolean',
      question: 'True or False: Semantic HTML improves SEO and accessibility.',
      correct: true,
      explanation: 'Semantic HTML provides meaningful structure that search engines and screen readers can better understand and navigate.'
    },
    {
      id: 'q5',
      type: 'multiple',
      question: 'What is the Critical Rendering Path?',
      options: [
        'The route users take through a website',
        'Sequence of steps browser takes to render page (DOM → CSSOM → Render Tree → Layout → Paint)',
        'JavaScript execution order',
        'CSS loading priority'
      ],
      correct: 1,
      explanation: 'Critical Rendering Path is the sequence: DOM construction → CSSOM construction → Render Tree → Layout → Paint. Optimizing this improves perceived performance.'
    },
    {
      id: 'q6',
      type: 'multiple',
      question: 'Which meta tag prevents zoom on mobile devices (and should be avoided)?',
      options: [
        '<meta name="viewport" content="width=device-width">',
        '<meta name="viewport" content="user-scalable=no">',
        '<meta name="mobile" content="no-zoom">',
        '<meta name="scale" content="fixed">'
      ],
      correct: 1,
      explanation: 'user-scalable=no prevents zooming, which is an accessibility violation. Users should always be able to zoom.'
    },
    {
      id: 'q7',
      type: 'boolean',
      question: 'True or False: The <picture> element allows responsive images with art direction.',
      correct: true,
      explanation: '<picture> with <source> elements enables serving different images based on viewport, resolution, or format support (WebP, AVIF).'
    },
    {
      id: 'q8',
      type: 'multiple',
      question: 'What is the purpose of the "loading" attribute in <img>?',
      options: [
        'Shows loading spinner',
        'Lazy loads images (loading="lazy")',
        'Preloads images',
        'Compresses images'
      ],
      correct: 1,
      explanation: 'loading="lazy" defers loading off-screen images until user scrolls near them, improving initial page load performance.'
    },
    {
      id: 'q9',
      type: 'multiple',
      question: 'Which ARIA role should be used for a custom dropdown menu?',
      options: ['role="menu"', 'role="dropdown"', 'role="listbox"', 'role="select"'],
      correct: 2,
      explanation: 'role="listbox" is appropriate for custom dropdowns. role="menu" is for application menus (File, Edit, etc.), not form controls.'
    },
    {
      id: 'q10',
      type: 'boolean',
      question: 'True or False: Using <div> with onClick is semantically equivalent to <button>.',
      correct: false,
      explanation: '<button> provides keyboard navigation, focus management, and screen reader semantics. <div> requires extensive ARIA and JS to replicate this.'
    },
    {
      id: 'q11',
      type: 'multiple',
      question: 'What does the "preload" link rel do?',
      options: [
        'Loads page before user clicks',
        'Tells browser to fetch resource with high priority before needed',
        'Caches all website pages',
        'Prefetches DNS'
      ],
      correct: 1,
      explanation: '<link rel="preload"> tells browser to fetch critical resources (fonts, CSS, JS) early in page load, improving performance.'
    },
    {
      id: 'q12',
      type: 'multiple',
      question: 'What is the purpose of Content Security Policy (CSP)?',
      options: [
        'Encrypts data',
        'Prevents XSS attacks by restricting resource sources',
        'Manages user permissions',
        'Blocks search engines'
      ],
      correct: 1,
      explanation: 'CSP header/meta tag whitelists trusted sources for scripts, styles, images, preventing XSS and data injection attacks.'
    },
    {
      id: 'q13',
      type: 'boolean',
      question: 'True or False: Using "async" attribute on scripts can cause race conditions.',
      correct: true,
      explanation: 'async scripts execute as soon as downloaded, potentially out of order, causing race conditions if scripts depend on each other.'
    },
    {
      id: 'q14',
      type: 'multiple',
      question: 'Which meta tag is crucial for Open Graph social media sharing?',
      options: [
        '<meta name="og:title">',
        '<meta property="og:title">',
        '<meta social="title">',
        '<meta share="title">'
      ],
      correct: 1,
      explanation: 'Open Graph uses property="og:*" (not name). og:title, og:description, og:image control how content appears when shared.'
    },
    {
      id: 'q15',
      type: 'multiple',
      question: 'What is the difference between sessionStorage and localStorage?',
      options: [
        'sessionStorage is server-side, localStorage is client-side',
        'sessionStorage persists per tab/window, localStorage persists across sessions',
        'No difference',
        'sessionStorage is encrypted'
      ],
      correct: 1,
      explanation: 'sessionStorage clears when tab/window closes. localStorage persists until explicitly cleared. Both are client-side, same-origin.'
    },
    {
      id: 'q16',
      type: 'boolean',
      question: 'True or False: The <main> element should be used only once per page.',
      correct: true,
      explanation: '<main> represents the dominant content of the <body>. Only one should be visible at a time (can use hidden for SPA routing).'
    },
    {
      id: 'q17',
      type: 'multiple',
      question: 'What is the purpose of the "autocomplete" attribute in forms?',
      options: [
        'Auto-submits forms',
        'Enables browser autofill (e.g., autocomplete="email")',
        'Validates input',
        'Prevents typing'
      ],
      correct: 1,
      explanation: 'autocomplete with specific values (email, name, address-level1) tells browsers what data to autofill, improving UX and accessibility.'
    },
    {
      id: 'q18',
      type: 'multiple',
      question: 'Which technique reduces Cumulative Layout Shift (CLS)?',
      options: [
        'Using inline CSS',
        'Setting explicit width/height on images and embeds',
        'Minifying JavaScript',
        'Using CDNs'
      ],
      correct: 1,
      explanation: 'Setting dimensions reserves space before resources load, preventing layout shifts. Critical for Core Web Vitals.'
    },
    {
      id: 'q19',
      type: 'boolean',
      question: 'True or False: HTTP/2 makes domain sharding optimization obsolete.',
      correct: true,
      explanation: 'HTTP/2 multiplexing allows multiple requests over single connection, eliminating need for domain sharding used in HTTP/1.1.'
    },
    {
      id: 'q20',
      type: 'multiple',
      question: 'What does the "integrity" attribute in <script> provide?',
      options: [
        'Validates script logic',
        'Enables Subresource Integrity (SRI) - verifies file hash',
        'Prevents script errors',
        'Encrypts script'
      ],
      correct: 1,
      explanation: 'integrity attribute contains hash that browser verifies, ensuring CDN-loaded files haven\'t been tampered with (SRI security).'
    },
    {
      id: 'q21',
      type: 'multiple',
      question: 'Which HTTP status code indicates a permanent redirect?',
      options: ['302 Found', '301 Moved Permanently', '307 Temporary Redirect', '308 Permanent Redirect'],
      correct: 1,
      explanation: '301 signals permanent redirect, transferring SEO value. 302 is temporary. 307/308 are newer equivalents that preserve HTTP method.'
    },
    {
      id: 'q22',
      type: 'boolean',
      question: 'True or False: Service Workers enable offline-first web applications.',
      correct: true,
      explanation: 'Service Workers act as proxy between browser and network, enabling caching strategies for offline functionality and background sync.'
    },
    {
      id: 'q23',
      type: 'multiple',
      question: 'What is the purpose of the "fetchpriority" attribute?',
      options: [
        'Orders fetch() calls',
        'Hints browser about relative priority of resource (high/low/auto)',
        'Prevents fetching',
        'Fetches from specific server'
      ],
      correct: 1,
      explanation: 'fetchpriority hints browser to prioritize important resources (like LCP image) or deprioritize less critical ones.'
    },
    {
      id: 'q24',
      type: 'multiple',
      question: 'Which technique improves First Contentful Paint (FCP)?',
      options: [
        'Adding more JavaScript',
        'Inlining critical CSS in <head>',
        'Using large images',
        'Loading all fonts upfront'
      ],
      correct: 1,
      explanation: 'Inlining critical above-the-fold CSS eliminates render-blocking request, improving FCP - a Core Web Vital metric.'
    },
    {
      id: 'q25',
      type: 'boolean',
      question: 'True or False: WebP format provides better compression than JPEG/PNG.',
      correct: true,
      explanation: 'WebP typically achieves 25-35% smaller file sizes than JPEG/PNG with similar quality. AVIF is even better but less supported.'
    },
    {
      id: 'q26',
      type: 'multiple',
      question: 'What is the purpose of the "rel=dns-prefetch" link?',
      options: [
        'Loads DNS server',
        'Resolves domain DNS early, reducing latency',
        'Blocks DNS queries',
        'Caches DNS records'
      ],
      correct: 1,
      explanation: 'dns-prefetch resolves DNS for external domains early, reducing latency when actually requesting resources from that domain.'
    },
    {
      id: 'q27',
      type: 'multiple',
      question: 'Which WCAG level is recommended for government websites?',
      options: ['Level A', 'Level AA (minimum)', 'Level AAA', 'No requirement'],
      correct: 1,
      explanation: 'WCAG 2.1 Level AA is the international standard for web accessibility, required by many governments and ADA compliance.'
    },
    {
      id: 'q28',
      type: 'boolean',
      question: 'True or False: Using <h1> through <h6> in order improves accessibility.',
      correct: true,
      explanation: 'Hierarchical heading structure helps screen reader users navigate and understand content structure. Skipping levels causes confusion.'
    },
    {
      id: 'q29',
      type: 'multiple',
      question: 'What is the purpose of the "srcset" attribute in <img>?',
      options: [
        'Sets image source',
        'Provides multiple image sources for responsive images',
        'Sets image style',
        'Creates image backup'
      ],
      correct: 1,
      explanation: 'srcset provides different image files for different screen densities (1x, 2x) and sizes, improving performance and quality.'
    },
    {
      id: 'q30',
      type: 'multiple',
      question: 'What is a Progressive Web App (PWA) requirement?',
      options: [
        'Must use React',
        'Must be HTTPS, have manifest.json, and service worker',
        'Must be mobile-only',
        'Must be single-page'
      ],
      correct: 1,
      explanation: 'PWAs require HTTPS for security, manifest.json for install metadata, and service worker for offline capability and app-like experience.'
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
    if (percentage >= 85) return '#34c759';
    if (percentage >= 70) return '#ff9500';
    return '#ff3b30';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return '🎓 Outstanding! Graduate-level knowledge!';
    if (percentage >= 85) return '🏆 Excellent! Bachelor\'s degree competency!';
    if (percentage >= 75) return '✅ Very Good! Strong understanding.';
    if (percentage >= 70) return '📚 Good! Review advanced concepts.';
    if (percentage >= 60) return '⚠️ Pass, but needs more study.';
    return '❌ More study required for degree-level.';
  };

  const getCertificationStatus = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 85) return 'PASS - Bachelor\'s Degree Level';
    if (percentage >= 70) return 'PASS - Associate Level';
    return 'NOT PASS - Need 85% for Bachelor\'s';
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
        width: '650px',
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
              Web Development Bachelor's Degree Exam
            </div>
            <div style={{ fontSize: '7px', marginTop: '1px', opacity: 0.9 }}>
              {answeredCount}/{questions.length} • HTML5 • Performance • Security • Accessibility • 85% to pass
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
              {/* Result */}
              <div style={{
                padding: '10px',
                background: (score / questions.length) >= 0.85 ? '#e8f5e9' : (score / questions.length) >= 0.70 ? '#fff8e1' : '#ffeaea',
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

              {/* Review */}
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
