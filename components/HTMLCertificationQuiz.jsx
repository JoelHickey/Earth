import React, { useState, useEffect } from 'react';

const HTMLCertificationQuiz = ({ onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState({});

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('htmlQuizProgress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (levelId, newScore, passed) => {
    const now = Date.now();
    const levelProgress = progress[levelId] || { attempts: [], bestScore: 0, passed: false };
    
    const updatedProgress = {
      ...progress,
      [levelId]: {
        attempts: [...levelProgress.attempts, { score: newScore, date: now, passed }],
        bestScore: Math.max(levelProgress.bestScore, newScore),
        passed: passed || levelProgress.passed,
        lastAttempt: now
      }
    };
    
    setProgress(updatedProgress);
    localStorage.setItem('htmlQuizProgress', JSON.stringify(updatedProgress));
  };

  // Calculate next review date
  const getNextReviewDate = (levelId) => {
    const levelProgress = progress[levelId];
    if (!levelProgress || levelProgress.attempts.length === 0) return null;
    
    const lastAttempt = levelProgress.lastAttempt;
    const attemptCount = levelProgress.attempts.length;
    
    // Spaced repetition intervals (in days)
    const intervals = [1, 2, 7, 14, 30, 90];
    const daysSinceLastAttempt = (Date.now() - lastAttempt) / (1000 * 60 * 60 * 24);
    const nextInterval = intervals[Math.min(attemptCount - 1, intervals.length - 1)];
    
    if (daysSinceLastAttempt >= nextInterval) {
      return 'Ready to review!';
    }
    
    const daysUntilReview = Math.ceil(nextInterval - daysSinceLastAttempt);
    return `Review in ${daysUntilReview}d`;
  };

  // Get stats for a level
  const getLevelStats = (levelId) => {
    const levelProgress = progress[levelId];
    if (!levelProgress) return null;
    
    return {
      attempts: levelProgress.attempts.length,
      bestScore: levelProgress.bestScore,
      passed: levelProgress.passed,
      lastAttempt: levelProgress.lastAttempt
    };
  };

  const levels = [
    {
      id: 'foundations',
      title: 'Foundations & History',
      subtitle: 'HTML origins, basic structure, syntax',
      icon: '📚',
      passRate: 70,
      color: '#34c759'
    },
    {
      id: 'intermediate',
      title: 'Intermediate Development',
      subtitle: 'Forms, semantics, accessibility basics',
      icon: '🔨',
      passRate: 75,
      color: '#0071e3'
    },
    {
      id: 'advanced',
      title: 'Advanced Concepts',
      subtitle: 'Performance, SEO, modern HTML5',
      icon: '🚀',
      passRate: 80,
      color: '#667eea'
    },
    {
      id: 'professional',
      title: 'Professional Level',
      subtitle: 'Security, optimization, PWA',
      icon: '💼',
      passRate: 85,
      color: '#ff9500'
    },
    {
      id: 'expert',
      title: 'Expert & Architect',
      subtitle: 'Architecture, scaling, cutting-edge',
      icon: '🏆',
      passRate: 90,
      color: '#ff3b30'
    }
  ];

  const questionsByLevel = {
    foundations: [
      {
        id: 'f1',
        type: 'multiple',
        question: 'What does HTML stand for?',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language'
        ],
        correct: 0,
        explanation: 'HTML stands for HyperText Markup Language - the standard markup language for creating web pages.'
      },
      {
        id: 'f2',
        type: 'multiple',
        question: 'Who invented HTML and when?',
        options: [
          'Bill Gates in 1990',
          'Tim Berners-Lee in 1991',
          'Steve Jobs in 1989',
          'Linus Torvalds in 1992'
        ],
        correct: 1,
        explanation: 'Tim Berners-Lee invented HTML in 1991 while working at CERN, along with the first web browser and server.'
      },
      {
        id: 'f3',
        type: 'boolean',
        question: 'True or False: HTML is a programming language.',
        correct: false,
        explanation: 'HTML is a markup language, not a programming language. It structures content but doesn\'t contain logic or control flow.'
      },
      {
        id: 'f4',
        type: 'multiple',
        question: 'What is the correct HTML5 doctype?',
        options: [
          '<!DOCTYPE HTML5>',
          '<!DOCTYPE html>',
          '<html5>',
          '<!DOCTYPE HTML PUBLIC>'
        ],
        correct: 1,
        explanation: 'HTML5 simplified the doctype to just <!DOCTYPE html>, making it easier to remember.'
      },
      {
        id: 'f5',
        type: 'multiple',
        question: 'Which tag creates a paragraph?',
        options: ['<para>', '<p>', '<paragraph>', '<pg>'],
        correct: 1,
        explanation: 'The <p> tag defines a paragraph and is one of the most basic HTML elements.'
      },
      {
        id: 'f6',
        type: 'boolean',
        question: 'True or False: HTML tags are case-sensitive.',
        correct: false,
        explanation: 'HTML tags are not case-sensitive, but lowercase is the standard convention.'
      },
      {
        id: 'f7',
        type: 'multiple',
        question: 'Which tag makes text bold?',
        options: ['<b> or <strong>', '<bold>', '<text-bold>', '<weight>'],
        correct: 0,
        explanation: '<b> makes text bold (presentational), <strong> indicates semantic importance (also bold).'
      },
      {
        id: 'f8',
        type: 'multiple',
        question: 'What does the <head> section contain?',
        options: [
          'Main content',
          'Metadata and links to resources',
          'Navigation',
          'Footer'
        ],
        correct: 1,
        explanation: '<head> contains metadata, title, links to CSS/JS, and other document information.'
      },
      {
        id: 'f9',
        type: 'boolean',
        question: 'True or False: <br> requires a closing tag.',
        correct: false,
        explanation: '<br> is a self-closing tag (void element) that doesn\'t need a closing tag.'
      },
      {
        id: 'f10',
        type: 'multiple',
        question: 'Which version introduced semantic elements like <article> and <nav>?',
        options: ['HTML4', 'HTML5', 'XHTML', 'HTML3'],
        correct: 1,
        explanation: 'HTML5 introduced semantic elements to better describe content meaning and structure.'
      }
    ],
    intermediate: [
      {
        id: 'i1',
        type: 'multiple',
        question: 'What is the purpose of the <label> element?',
        options: [
          'Styles text',
          'Associates text with form input for accessibility',
          'Creates a tag',
          'Marks important content'
        ],
        correct: 1,
        explanation: '<label> associates text with inputs, improving accessibility and expanding click area.'
      },
      {
        id: 'i2',
        type: 'multiple',
        question: 'Which attribute makes an input field required?',
        options: ['mandatory', 'required', 'needed', 'validate'],
        correct: 1,
        explanation: 'The "required" attribute prevents form submission until the field is filled.'
      },
      {
        id: 'i3',
        type: 'boolean',
        question: 'True or False: <article> should only be used for blog posts.',
        correct: false,
        explanation: '<article> is for any self-contained content: blog posts, forum posts, news articles, widgets, etc.'
      },
      {
        id: 'i4',
        type: 'multiple',
        question: 'What is the purpose of the alt attribute in images?',
        options: [
          'Adds a border',
          'Provides alternative text for accessibility and failed loads',
          'Alters the image',
          'Aligns the image'
        ],
        correct: 1,
        explanation: 'alt provides text for screen readers and displays when images fail to load.'
      },
      {
        id: 'i5',
        type: 'multiple',
        question: 'Which input type validates email addresses?',
        options: [
          '<input type="text">',
          '<input type="email">',
          '<input type="mail">',
          '<email>'
        ],
        correct: 1,
        explanation: 'type="email" provides validation and appropriate mobile keyboard.'
      },
      {
        id: 'i6',
        type: 'boolean',
        question: 'True or False: Semantic HTML improves SEO.',
        correct: true,
        explanation: 'Search engines better understand semantic HTML structure, improving SEO rankings.'
      },
      {
        id: 'i7',
        type: 'multiple',
        question: 'What does <nav> represent?',
        options: [
          'Naval content',
          'Navigation links section',
          'New article view',
          'Navbar styling'
        ],
        correct: 1,
        explanation: '<nav> defines a section of navigation links.'
      },
      {
        id: 'i8',
        type: 'multiple',
        question: 'Which element represents a section of a page?',
        options: ['<div>', '<section>', '<part>', '<segment>'],
        correct: 1,
        explanation: '<section> represents a thematic grouping of content, typically with a heading.'
      },
      {
        id: 'i9',
        type: 'boolean',
        question: 'True or False: <header> can only be used once per page.',
        correct: false,
        explanation: '<header> can be used multiple times - for page header, article headers, section headers.'
      },
      {
        id: 'i10',
        type: 'multiple',
        question: 'What is the purpose of <aside>?',
        options: [
          'Main content',
          'Tangentially related content (sidebars, pull quotes)',
          'Footer',
          'Navigation'
        ],
        correct: 1,
        explanation: '<aside> is for content tangentially related to main content, like sidebars or callouts.'
      }
    ],
    advanced: [
      {
        id: 'a1',
        type: 'multiple',
        question: 'What is the Critical Rendering Path?',
        options: [
          'User navigation flow',
          'Browser\'s sequence: DOM → CSSOM → Render Tree → Layout → Paint',
          'JavaScript execution order',
          'HTTP request path'
        ],
        correct: 1,
        explanation: 'CRP is the sequence browsers follow to render pages. Optimizing it improves performance.'
      },
      {
        id: 'a2',
        type: 'multiple',
        question: 'What does the "loading" attribute do?',
        options: [
          'Shows spinner',
          'Lazy loads images (loading="lazy")',
          'Preloads resources',
          'Compresses files'
        ],
        correct: 1,
        explanation: 'loading="lazy" defers loading off-screen images until user scrolls near them.'
      },
      {
        id: 'a3',
        type: 'boolean',
        question: 'True or False: The <picture> element enables responsive images with art direction.',
        correct: true,
        explanation: '<picture> with <source> serves different images based on viewport, resolution, or format.'
      },
      {
        id: 'a4',
        type: 'multiple',
        question: 'What is the purpose of <link rel="preload">?',
        options: [
          'Loads pages early',
          'Fetches critical resources with high priority',
          'Caches everything',
          'Prefetches DNS'
        ],
        correct: 1,
        explanation: 'rel="preload" tells browser to fetch critical resources early, improving performance.'
      },
      {
        id: 'a5',
        type: 'multiple',
        question: 'What does "defer" attribute do on scripts?',
        options: [
          'Blocks execution',
          'Downloads during parsing, executes after, maintains order',
          'Deletes script',
          'Delays by 1 second'
        ],
        correct: 1,
        explanation: '"defer" downloads scripts during HTML parsing but executes only after parsing completes.'
      },
      {
        id: 'a6',
        type: 'boolean',
        question: 'True or False: Using "async" on scripts can cause race conditions.',
        correct: true,
        explanation: 'async scripts execute as soon as downloaded, potentially out of order, causing races.'
      },
      {
        id: 'a7',
        type: 'multiple',
        question: 'Which meta tag is essential for responsive design?',
        options: [
          '<meta name="responsive">',
          '<meta name="viewport" content="width=device-width">',
          '<meta name="mobile">',
          '<meta name="screen">'
        ],
        correct: 1,
        explanation: 'viewport meta tag controls responsive behavior on mobile devices.'
      },
      {
        id: 'a8',
        type: 'multiple',
        question: 'What is srcset used for?',
        options: [
          'Setting source',
          'Providing multiple images for different screen densities/sizes',
          'CSS styling',
          'JavaScript source'
        ],
        correct: 1,
        explanation: 'srcset provides different images for different screen densities (1x, 2x, 3x) and sizes.'
      },
      {
        id: 'a9',
        type: 'boolean',
        question: 'True or False: WebP provides better compression than JPEG.',
        correct: true,
        explanation: 'WebP typically achieves 25-35% smaller file sizes than JPEG with similar quality.'
      },
      {
        id: 'a10',
        type: 'multiple',
        question: 'What does rel="dns-prefetch" do?',
        options: [
          'Loads DNS server',
          'Resolves domain DNS early, reducing latency',
          'Blocks DNS',
          'Caches DNS forever'
        ],
        correct: 1,
        explanation: 'dns-prefetch resolves DNS for external domains early, improving load times.'
      }
    ],
    professional: [
      {
        id: 'p1',
        type: 'multiple',
        question: 'What is Content Security Policy (CSP)?',
        options: [
          'Encrypts content',
          'Prevents XSS by restricting resource sources',
          'User permissions',
          'SEO policy'
        ],
        correct: 1,
        explanation: 'CSP header/meta whitelists trusted sources, preventing XSS and injection attacks.'
      },
      {
        id: 'p2',
        type: 'multiple',
        question: 'What does rel="noopener" prevent?',
        options: [
          'SEO penalties',
          'Security vulnerability where new window accesses opener',
          'Cookie sharing',
          'Form submission'
        ],
        correct: 1,
        explanation: 'rel="noopener" prevents tabnabbing attacks where opened page accesses window.opener.'
      },
      {
        id: 'p3',
        type: 'boolean',
        question: 'True or False: Service Workers enable offline-first applications.',
        correct: true,
        explanation: 'Service Workers proxy between browser and network, enabling offline functionality.'
      },
      {
        id: 'p4',
        type: 'multiple',
        question: 'What does the "integrity" attribute provide?',
        options: [
          'Validates logic',
          'Subresource Integrity (SRI) - verifies file hash',
          'Prevents errors',
          'Encrypts file'
        ],
        correct: 1,
        explanation: 'integrity attribute verifies file hash, ensuring CDN files haven\'t been tampered with.'
      },
      {
        id: 'p5',
        type: 'multiple',
        question: 'Which WCAG level is required for government websites?',
        options: ['Level A', 'Level AA (standard)', 'Level AAA', 'No requirement'],
        correct: 1,
        explanation: 'WCAG 2.1 Level AA is the international standard, required by many governments.'
      },
      {
        id: 'p6',
        type: 'boolean',
        question: 'True or False: HTTP/2 makes domain sharding obsolete.',
        correct: true,
        explanation: 'HTTP/2 multiplexing allows multiple requests per connection, eliminating domain sharding.'
      },
      {
        id: 'p7',
        type: 'multiple',
        question: 'What reduces Cumulative Layout Shift (CLS)?',
        options: [
          'Inline CSS',
          'Setting explicit width/height on images',
          'Minifying JS',
          'Using CDN'
        ],
        correct: 1,
        explanation: 'Setting dimensions reserves space, preventing layout shifts - critical for Core Web Vitals.'
      },
      {
        id: 'p8',
        type: 'multiple',
        question: 'What is a Progressive Web App (PWA) requirement?',
        options: [
          'Must use React',
          'HTTPS, manifest.json, service worker',
          'Mobile-only',
          'Single-page only'
        ],
        correct: 1,
        explanation: 'PWAs require HTTPS, manifest.json for metadata, and service worker for offline capability.'
      },
      {
        id: 'p9',
        type: 'boolean',
        question: 'True or False: Inlining critical CSS improves First Contentful Paint.',
        correct: true,
        explanation: 'Inlining critical CSS eliminates render-blocking request, improving FCP.'
      },
      {
        id: 'p10',
        type: 'multiple',
        question: 'Which ARIA role for custom dropdown menus?',
        options: ['role="menu"', 'role="dropdown"', 'role="listbox"', 'role="select"'],
        correct: 2,
        explanation: 'role="listbox" is for custom dropdowns. role="menu" is for application menus.'
      }
    ],
    expert: [
      {
        id: 'e1',
        type: 'multiple',
        question: 'What is the difference between HTTP/2 and HTTP/3?',
        options: [
          'No difference',
          'HTTP/3 uses QUIC (UDP) instead of TCP',
          'HTTP/3 is slower',
          'HTTP/3 requires HTTP/2'
        ],
        correct: 1,
        explanation: 'HTTP/3 uses QUIC protocol over UDP, reducing latency and improving performance over lossy networks.'
      },
      {
        id: 'e2',
        type: 'multiple',
        question: 'What is Largest Contentful Paint (LCP) threshold for "Good"?',
        options: ['Under 1.0s', 'Under 2.5s', 'Under 4.0s', 'Under 5.0s'],
        correct: 1,
        explanation: 'LCP should be under 2.5s for good user experience - a Core Web Vital metric.'
      },
      {
        id: 'e3',
        type: 'boolean',
        question: 'True or False: Resource Hints (preload, prefetch, preconnect) can hurt performance if misused.',
        correct: true,
        explanation: 'Over-using resource hints wastes bandwidth and can delay critical resources.'
      },
      {
        id: 'e4',
        type: 'multiple',
        question: 'What is Intersection Observer API used for?',
        options: [
          'API intersection',
          'Detecting when element enters viewport (lazy loading, infinite scroll)',
          'Math operations',
          'Route intersection'
        ],
        correct: 1,
        explanation: 'Intersection Observer efficiently detects element visibility, enabling lazy loading and infinite scroll.'
      },
      {
        id: 'e5',
        type: 'multiple',
        question: 'What is the purpose of fetchpriority="high"?',
        options: [
          'Orders fetch calls',
          'Hints browser to prioritize resource (e.g., LCP image)',
          'Prevents fetching',
          'Fetches from specific server'
        ],
        correct: 1,
        explanation: 'fetchpriority hints browser to prioritize important resources like LCP images.'
      },
      {
        id: 'e6',
        type: 'boolean',
        question: 'True or False: Container Queries are now widely supported.',
        correct: true,
        explanation: 'Container Queries have good browser support as of 2023, enabling component-level responsive design.'
      },
      {
        id: 'e7',
        type: 'multiple',
        question: 'What is the purpose of Speculation Rules API?',
        options: [
          'Predicts user behavior',
          'Enables prerendering pages for instant navigation',
          'Runs speculation algorithms',
          'Tests API calls'
        ],
        correct: 1,
        explanation: 'Speculation Rules API prefers pages user is likely to visit, enabling instant navigation.'
      },
      {
        id: 'e8',
        type: 'multiple',
        question: 'What is Subgrid in CSS Grid?',
        options: [
          'A smaller grid',
          'Allows nested grid to inherit parent grid tracks',
          'Submarine layout',
          'Grid alternative'
        ],
        correct: 1,
        explanation: 'Subgrid allows nested grids to align with parent grid tracks, solving complex layout problems.'
      },
      {
        id: 'e9',
        type: 'boolean',
        question: 'True or False: AVIF provides better compression than WebP.',
        correct: true,
        explanation: 'AVIF offers superior compression (50% smaller than JPEG) but has less browser support than WebP.'
      },
      {
        id: 'e10',
        type: 'multiple',
        question: 'What is View Transitions API?',
        options: [
          'Changes views',
          'Enables smooth, native-like page transitions in SPAs',
          'Viewport transitions',
          'View counter'
        ],
        correct: 1,
        explanation: 'View Transitions API creates smooth, animated transitions between pages/states in SPAs.'
      }
    ]
  };

  const currentLevel = levels.find(l => l.id === selectedLevel);
  const questions = questionsByLevel[selectedLevel] || [];

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
    
    const percentage = (correctCount / questions.length) * 100;
    const passed = percentage >= currentLevel.passRate;
    
    setScore(correctCount);
    setSubmitted(true);
    
    // Save progress
    saveProgress(selectedLevel, correctCount, passed);
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const backToLevels = () => {
    setSelectedLevel(null);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    const passRate = currentLevel.passRate;
    if (percentage >= passRate) return '#34c759';
    if (percentage >= passRate - 10) return '#ff9500';
    return '#ff3b30';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    const passRate = currentLevel.passRate;
    if (percentage >= passRate + 10) return `🏆 Outstanding! Master of ${currentLevel.title}!`;
    if (percentage >= passRate) return `✅ Pass! ${currentLevel.title} certified!`;
    if (percentage >= passRate - 10) return `📚 Close! Review and retake.`;
    return `❌ More study needed for ${currentLevel.title}.`;
  };

  const getCertificationStatus = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= currentLevel.passRate) return `PASS - ${currentLevel.title}`;
    return `NOT PASS - Need ${currentLevel.passRate}%`;
  };

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  // Level Selection Screen
  if (!selectedLevel) {
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
          width: '560px',
          maxWidth: '95vw',
          maxHeight: '85vh',
          borderRadius: '6px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          <div style={{
            padding: '10px 12px',
            background: '#667eea',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>
                Web Development Certification Path
              </div>
              <div style={{ fontSize: '9px', marginTop: '2px', opacity: 0.9 }}>
                Choose your level • 10 questions per exam
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

          <div style={{ padding: '12px', overflowY: 'auto' }}>
            {levels.map((level, idx) => {
              const reviewDate = getNextReviewDate(level.id);
              const readyToReview = reviewDate === 'Ready to review!';
              
              return (
              <div
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                style={{
                  marginBottom: '8px',
                  padding: '10px 12px',
                  background: readyToReview ? '#fffbea' : '#fafafa',
                  border: '2px solid',
                  borderColor: readyToReview ? '#ff9500' : '#e0e0e0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = level.color;
                  e.currentTarget.style.background = '#ffffff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = readyToReview ? '#ff9500' : '#e0e0e0';
                  e.currentTarget.style.background = readyToReview ? '#fffbea' : '#fafafa';
                }}
              >
                {readyToReview && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '10px',
                    background: '#ff9500',
                    color: '#ffffff',
                    fontSize: '7px',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontWeight: '700',
                    animation: 'pulse 2s infinite'
                  }}>
                    REVIEW NOW
                  </div>
                )}
                <div style={{ fontSize: '24px' }}>{level.icon}</div>
                <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1d1d1f', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Level {idx + 1}: {level.title}
                  {(() => {
                    const stats = getLevelStats(level.id);
                    if (stats?.passed) return <span style={{ fontSize: '12px' }}>✅</span>;
                    return null;
                  })()}
                </div>
                <div style={{ fontSize: '9px', color: '#6e6e73' }}>
                  {level.subtitle}
                </div>
                <div style={{ fontSize: '8px', color: '#86868b', marginTop: '2px' }}>
                  {(() => {
                    const stats = getLevelStats(level.id);
                    const reviewDate = getNextReviewDate(level.id);
                    if (stats) {
                      return `Attempts: ${stats.attempts} • Best: ${stats.bestScore}/10 ${reviewDate ? `• ${reviewDate}` : ''}`;
                    }
                    return `Pass rate: ${level.passRate}% • 10 questions • Never attempted`;
                  })()}
                </div>
                </div>
                <div style={{ 
                  fontSize: '14px', 
                  color: level.color,
                  fontWeight: '700'
                }}>
                  →
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Exam Screen
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
        <div style={{
          padding: '8px 10px',
          background: currentLevel.color,
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>
              {currentLevel.icon} {currentLevel.title}
            </div>
            <div style={{ fontSize: '9px', marginTop: '1px', opacity: 0.9 }}>
              {answeredCount}/{questions.length} answered • {currentLevel.passRate}% to pass
            </div>
          </div>
          <button
            onClick={backToLevels}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#ffffff',
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '3px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            ← Back
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
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
                  <div style={{ fontSize: '10px', fontWeight: '600', color: '#1d1d1f', marginBottom: '4px' }}>
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
                            background: answers[q.id] === optIdx ? currentLevel.color : '#ffffff',
                            color: answers[q.id] === optIdx ? '#ffffff' : '#1d1d1f',
                            border: '1px solid',
                            borderColor: answers[q.id] === optIdx ? currentLevel.color : '#d1d1d6',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '9px',
                            transition: 'all 0.15s'
                          }}
                          onMouseOver={(e) => {
                            if (answers[q.id] !== optIdx) {
                              e.currentTarget.style.borderColor = currentLevel.color;
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
                            fontSize: '9px',
                            fontWeight: '600',
                            background: answers[q.id] === value ? currentLevel.color : '#ffffff',
                            color: answers[q.id] === value ? '#ffffff' : '#1d1d1f',
                            border: '1px solid',
                            borderColor: answers[q.id] === value ? currentLevel.color : '#d1d1d6',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            transition: 'all 0.15s'
                          }}
                          onMouseOver={(e) => {
                            if (answers[q.id] !== value) {
                              e.currentTarget.style.borderColor = currentLevel.color;
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
              <div style={{
                padding: '10px',
                background: (score / questions.length) >= (currentLevel.passRate / 100) ? '#e8f5e9' : '#ffeaea',
                border: '2px solid ' + getScoreColor(),
                borderRadius: '4px',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#1d1d1f', marginBottom: '2px' }}>
                  {getCertificationStatus()}
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#1d1d1f', marginBottom: '2px' }}>
                  Score: {score}/{questions.length} ({Math.round((score/questions.length)*100)}%)
                </div>
                <div style={{ fontSize: '10px', color: '#6e6e73' }}>
                  {getScoreMessage()}
                </div>
              </div>

              {questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                const isCorrect = q.type === 'multiple' ? userAnswer === q.correct : userAnswer === q.correct;

                return (
                  <div key={q.id} style={{
                    marginBottom: '4px',
                    padding: '5px 6px',
                    background: isCorrect ? '#e8f5e9' : '#ffeaea',
                    border: '1px solid',
                    borderColor: isCorrect ? '#34c759' : '#ff3b30',
                    borderRadius: '3px'
                  }}>
                    <div style={{ fontSize: '9px', fontWeight: '600', color: '#1d1d1f', marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ color: isCorrect ? '#34c759' : '#ff3b30' }}>
                        {isCorrect ? '✓' : '✗'}
                      </span>
                      {idx + 1}. {q.question}
                    </div>
                    <div style={{ fontSize: '8px', color: '#6e6e73', marginTop: '2px', paddingLeft: '12px', fontStyle: 'italic' }}>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

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
                  fontSize: '10px',
                  padding: '4px 10px',
                  background: '#ffffff',
                  color: currentLevel.color,
                  border: `1px solid ${currentLevel.color}`,
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#f5f5f7'}
                onMouseOut={(e) => e.currentTarget.style.background = '#ffffff'}
              >
                Retake
              </button>
              <button
                onClick={backToLevels}
                style={{
                  fontSize: '10px',
                  padding: '4px 10px',
                  background: currentLevel.color,
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Choose Level
              </button>
            </>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              style={{
                fontSize: '10px',
                padding: '4px 12px',
                background: allAnswered ? currentLevel.color : '#d1d1d6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '3px',
                cursor: allAnswered ? 'pointer' : 'not-allowed',
                fontWeight: '600'
              }}
            >
              Submit ({answeredCount}/{questions.length})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HTMLCertificationQuiz;
