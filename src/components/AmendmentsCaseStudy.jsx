import React, { useEffect, useState } from 'react';
import {
  BaseStyles,
  Button,
  Dialog,
  Heading,
  IconButton,
  Stack,
  Text,
  ThemeProvider,
  theme,
  ToggleSwitch
} from '@primer/react';
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from '@primer/octicons-react';
import AmendmentsFlowDemo from './AmendmentsFlowDemo';

const AmendmentsCaseStudy = ({
  onViewOldFlow,
  onViewNewFlow,
  onClose,
  position,
  onDragStart,
  zIndex = 120
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, gallery: null, currentIndex: 0 });
  const [isDemoEnabled, setIsDemoEnabled] = useState(false);

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 200);
  };

  const handleDemoToggle = (event) => {
    setIsDemoEnabled((prev) => {
      const targetChecked = event?.target?.checked;
      const currentChecked = event?.currentTarget?.checked;
      const nextChecked = typeof targetChecked === 'boolean'
        ? targetChecked
        : typeof currentChecked === 'boolean'
          ? currentChecked
          : !prev;
      return nextChecked;
    });
  };

  const handleDemoToggleClick = () => {
    setIsDemoEnabled((prev) => !prev);
  };

  const handleDemoToggleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsDemoEnabled((prev) => !prev);
    }
  };

  const handleHeaderMouseDown = (e) => {
    if (e.target.closest('button, a, input, label, [role="switch"], [role="button"]')) {
      return;
    }
    onDragStart?.(e);
  };

  const discoveryActivities = [
    {
      title: "Global workshops",
      description: "Co-led interactive workshops with 60+ consultants and stakeholders across all brands globally to ensure complete coverage.",
      icon: "👥",
      artifact: { src: "/images/amendments/image1.png", alt: "Global workshops artifact" }
    },
    {
      title: "Problem discovery workshop",
      description: "Captured pain points and context during the problem discovery session.",
      icon: "🧭",
      artifact: { src: "/images/amendments/Problem discovery.png", alt: "Problem discovery workshop artifact" }
    },
    {
      title: "Voting on pain points",
      description: "Mapped manual amendment steps across product verticals.",
      icon: "🗳️",
      artifact: { src: "/images/amendments/image3.png", alt: "Workflow mapping artifact" }
    },
    {
      title: "Matrix analysis",
      description: "Prioritized amendment types by frequency versus friction, with stakeholder voting to align on the biggest productivity wins.",
      icon: "📊",
      artifact: { src: "/images/amendments/matrix.png", alt: "Matrix analysis artifact" }
    },
    {
      title: "Competitive analysis",
      description: "Benchmarked amendment flows across key competitors.",
      icon: "🔎",
      artifact: null
    },
    {
      title: "Risk assessment",
      description: "Assessed technical and financial impacts and risks.",
      icon: "🛡️",
      artifact: null
    }
  ];

  const keyFindings = [
    { title: "Click-heavy flow", detail: "13+ clicks with hidden dependency impacts", icon: "🖱️" },
    { title: "Error-prone process", detail: "Manual data entry caused booking errors", icon: "⚠️" },
    { title: "Need for bulk amendments", detail: "Complex bookings required updates across all components", icon: "🧩" },
    { title: "Reduced confidence", detail: "Slow performance and unclear errors eroded trust", icon: "📉" },
    { title: "Customer frustration", detail: "Long hold times and slow service", icon: "😕" },
    { title: "Technical constraints", detail: "Core fixes were blocked by platform constraints", icon: "🛠️" }
  ];

  const discoveryImages = discoveryActivities
    .filter((activity) => activity.artifact)
    .map((activity) => activity.artifact);

  const wireframeImages = [
    { src: "/images/amendments/amendment-wireframes-r16.png", alt: "Amendment wireframes" },
    { src: "/images/amendments/amendment-wiresframes2.png", alt: "Amendment wireframes 2" }
  ];

  const hifiImages = [
    { src: "/images/amendments/amendments-hifi.png", alt: "Hi-fidelity prototypes" }
  ];

  const userTestingImages = [
    { src: "/images/amendments/amendments-proto-testing.png", alt: "Prototype testing" }
  ];

  const openLightbox = (gallery, index) => {
    setLightbox({ isOpen: true, gallery, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, gallery: null, currentIndex: 0 });
  };

  const getGalleryImages = () => {
    switch (lightbox.gallery) {
      case 'discovery':
        return discoveryImages;
      case 'hifi':
        return hifiImages;
      case 'userTesting':
        return userTestingImages;
      case 'wireframes':
      default:
        return wireframeImages;
    }
  };

  const navigateLightbox = (direction) => {
    const currentGallery = getGalleryImages();
    let newIndex = lightbox.currentIndex;

    if (direction === 'next') {
      newIndex = (lightbox.currentIndex + 1) % currentGallery.length;
    } else {
      newIndex = (lightbox.currentIndex - 1 + currentGallery.length) % currentGallery.length;
    }

    setLightbox({ ...lightbox, currentIndex: newIndex });
  };

  useEffect(() => {
    if (!lightbox.isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, lightbox.currentIndex, lightbox.gallery]);

  const fallbackPosition = position || {
    x: typeof window !== 'undefined' ? Math.max(0, (window.innerWidth - 1000) / 2) : 50,
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 700) / 2) : 100
  };

  const effectiveZIndex = typeof zIndex === 'number' ? Math.max(zIndex, 2000) : 2000;

  const containerStyle = {
    position: "fixed",
    left: `${fallbackPosition.x}px`,
    top: `${fallbackPosition.y}px`,
    zIndex: effectiveZIndex,
    backgroundColor: "var(--canvas-default, #ffffff)",
    width: "min(95vw, 1000px)",
    maxWidth: "95vw",
    height: "min(90vh, 700px)",
    maxHeight: "90vh",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.16)",
    borderRadius: "var(--borderRadius-medium)",
    border: "1px solid var(--borderColor-default)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxSizing: "border-box"
  };

  const headerSx = {
    position: "sticky",
    top: 0,
    backgroundColor: "var(--canvas-default, #ffffff)",
    zIndex: 10,
    borderBottom: "1px solid var(--borderColor-default)",
    boxShadow: isScrolled ? "0 1px 0 rgba(0, 0, 0, 0.08)" : "none",
    boxSizing: "border-box",
    px: 5,
    py: 3
  };

  const sectionHeadingSx = {
    mb: 2,
    fontWeight: 700,
    color: "#4b2f73",
    letterSpacing: "0.04em"
  };

  const subsectionHeadingSx = {
    mb: 2,
    fontWeight: 700,
    color: "var(--fgColor-default)"
  };

  const bodySx = {
    lineHeight: 1.6,
    color: "var(--fgColor-default)"
  };

  const secondarySx = {
    lineHeight: 1.6,
    color: "var(--fgColor-muted)"
  };

  const cardSx = {
    border: "1px solid var(--borderColor-default)",
    borderRadius: 12,
    backgroundColor: "var(--canvas-default, #ffffff)",
    p: 3
  };

  const subtleCardSx = {
    borderRadius: 10,
    backgroundColor: "var(--canvas-subtle, #f6f8fa)",
    p: 3
  };

  const contentPadding = "var(--base-size-16, 16px)";
  const caseStudyPaddingStyle = { padding: contentPadding, boxSizing: "border-box" };

  const listStyle = {
    margin: 0,
    paddingLeft: contentPadding,
    listStyle: "disc",
    listStylePosition: "outside"
  };

  const listItemStyle = {
    marginBottom: "8px"
  };

  const imageThumbHeight = 96;
  const imageThumbWidth = 180;

  const scrollAreaStyle = {
    flex: 1,
    minHeight: 0,
    overflow: "auto",
    boxSizing: "border-box"
  };

  return (
    <ThemeProvider theme={theme}>
      <BaseStyles>
        <div style={containerStyle}>
          <Stack
              direction="horizontal"
              align="center"
              justify="space-between"
              gap="normal"
              sx={headerSx}
              style={{ padding: contentPadding }}
            >
            <Stack
              direction="horizontal"
              align="center"
              gap="normal"
              onMouseDown={handleHeaderMouseDown}
              onPointerDown={handleHeaderMouseDown}
              style={{ cursor: "move" }}
            >
              <Heading as="h1" sx={{ m: 0, fontWeight: 700 }}>
                Streamlining amendments
              </Heading>
              <img
                src="/Flight_Centre_company_logo_(Non-free).png"
                alt="Flight Centre logo"
                style={{ height: 24, width: "auto", maxWidth: 120, display: "block" }}
              />
            </Stack>

            <Stack
              direction="horizontal"
              align="center"
              gap="condensed"
              onMouseDown={(event) => event.stopPropagation()}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                role="switch"
                aria-checked={isDemoEnabled}
                aria-label="Interactive demo toggle"
                tabIndex={0}
                onClick={handleDemoToggleClick}
                onKeyDown={handleDemoToggleKeyDown}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                  padding: "2px 4px",
                  borderRadius: "6px"
                }}
              >
                <Text as="span" sx={{ fontSize: 0, fontWeight: 600 }}>
                  Interactive Demo
                </Text>
                <span style={{ pointerEvents: "none" }}>
                  <ToggleSwitch
                    size="small"
                    checked={isDemoEnabled}
                    buttonLabelOn=""
                    buttonLabelOff=""
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                </span>
              </div>
              <IconButton icon={XIcon} aria-label="Close Amendments" onClick={onClose} />
            </Stack>
          </Stack>

          <div
            style={{
              height: "1px",
              backgroundColor: "var(--borderColor-muted, #d0d7de)"
            }}
          />

          <div style={scrollAreaStyle} onScroll={handleScroll}>
          {isDemoEnabled ? (
            <div style={caseStudyPaddingStyle}>
              <AmendmentsFlowDemo
                embedded
                zIndex={zIndex}
                onBackToCaseStudy={() => setIsDemoEnabled(false)}
                onClose={() => setIsDemoEnabled(false)}
              />
            </div>
          ) : (
          <div style={caseStudyPaddingStyle}>
            <Stack gap="spacious">
            <Stack direction="horizontal" gap="spacious" sx={{ flexWrap: "wrap" }}>
              {[
                { value: "89%", label: "Satisfaction" },
                { value: "—", label: "Conversion" },
                { value: "+67%", label: "Efficiency" }
              ].map((metric) => (
                <Stack key={metric.label} gap="none">
                  <Text as="div" sx={{ fontSize: 3, fontWeight: 700, color: "var(--fgColor-success)" }}>
                    {metric.value}
                  </Text>
                  <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)", fontWeight: 600 }}>
                    {metric.label}
                  </Text>
                </Stack>
              ))}
            </Stack>

            <Stack gap="normal">
              <Text as="p" sx={{ fontSize: 1, lineHeight: 1.7, m: 0 }}>
                For a change to be made to a customer's booking, the system forced the Consultant through multiple screens and manual steps for even simple amendments. Building a streamlined flow in a complex travel stack, with an offshore vendor, was tough and full of learning. Here is how we did it.
              </Text>

            <Stack sx={subtleCardSx} gap="condensed">
                <Text as="p" sx={{ m: 0, fontStyle: "italic" }}>
                  "What used to take my entire shift now takes minutes. I finally have time to build real relationships with customers."
                </Text>
                <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)" }}>
                  — Sarah Mitchell, Senior Consultant, Melbourne
                </Text>
              </Stack>
            </Stack>

            <Stack gap="spacious">
              <Heading as="h2" sx={sectionHeadingSx}>Discovery</Heading>

              <Stack gap="normal">
                <Heading as="h3" sx={subsectionHeadingSx}>Research</Heading>
                <ul style={listStyle}>
                  {discoveryActivities.map((activity) => (
                    <li key={activity.title} style={listItemStyle}>
                      {activity.description}
                    </li>
                  ))}
                </ul>

                <Stack
                  direction="horizontal"
                  gap="normal"
                  sx={{ mt: 2, flexWrap: "wrap", justifyContent: "space-between" }}
                >
                  {discoveryActivities
                    .filter((activity) => activity.artifact)
                    .map((activity, index) => (
                      <Stack
                        key={activity.title}
                        sx={{
                          border: "1px solid var(--borderColor-default)",
                          borderRadius: 2,
                          overflow: "hidden",
                          cursor: "pointer",
                          backgroundColor: "var(--canvas-default, #ffffff)"
                        }}
                        onClick={() => openLightbox("discovery", index)}
                        gap="none"
                      >
                        <img
                          src={activity.artifact.src}
                          alt={activity.artifact.alt}
                          style={{ width: imageThumbWidth, height: imageThumbHeight, objectFit: "cover", display: "block" }}
                        />
                        <Stack>
                          <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)" }}>
                            {activity.title}
                          </Text>
                        </Stack>
                      </Stack>
                    ))}
                </Stack>
              </Stack>

              <Stack gap="normal">
                <Heading as="h3" sx={subsectionHeadingSx}>Findings</Heading>
                <Stack
                  gap="normal"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: 3
                  }}
                >
                  {keyFindings.map((finding) => (
                    <Stack key={finding.title} sx={cardSx} gap="condensed">
                      <Stack direction="horizontal" gap="normal" align="flex-start">
                        <Stack
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: 2,
                            color: "var(--fgColor-muted)",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <Text as="span">{finding.icon}</Text>
                        </Stack>
                        <Stack gap="condensed">
                          <Text as="div" sx={{ fontWeight: 700 }}>
                            {finding.title}
                          </Text>
                          <Text as="div" sx={{ color: "var(--fgColor-muted)" }}>
                            {finding.detail}
                          </Text>
                        </Stack>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Stack>

              <Stack gap="normal">
                <Heading as="h3" sx={subsectionHeadingSx}>Problem Definition</Heading>
                <Text as="p" sx={{ m: 0 }}>
                  How might we help consultants complete amendments quickly and accurately with dependency checks, without jumping between systems?
                </Text>
              </Stack>
            </Stack>

            <Stack gap="normal">
              <Heading as="h2" sx={sectionHeadingSx}>Ideation</Heading>
              <Stack sx={bodySx} gap="normal">
                <ul style={listStyle}>
                  <li style={listItemStyle}>
                    Design studio workshops and Crazy 8s with internal and external stakeholders produced rapid sketches and 50+ reframes to explore breadth.
                  </li>
                  <li style={listItemStyle}>
                    Competitive reviews and technology exploration benchmarked flows and assessed AI, automation, and real-time integration feasibility.
                  </li>
                </ul>
              </Stack>
            </Stack>

            <Stack gap="normal">
              <Heading as="h2" sx={sectionHeadingSx}>Concept Development</Heading>
              <Stack sx={bodySx} gap="normal">
                <ul style={listStyle}>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>AI-powered conversational interface</Text> - Natural language amendment requests (ideal, not feasible due to technical constraints)</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Single-page unified workflow</Text> - All amendment logic on one screen (too complex, failed usability testing)</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Three-page guided workflow</Text> - Step-by-step validation with dependency checking (selected approach)</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Inline flow</Text> - Changes made directly within the booking view (cluttered interface, unclear validation states)</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Modal flow</Text> - Pop-up dialogs for each amendment (disrupted context, frustrated users)</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Codegen-led solutions (not used)</Text> - Technical and financial impacts and risks assessed; UX unsatisfactory.</li>
                </ul>
                <Stack sx={{ background: "#d4edda", borderRadius: 2, p: 3 }}>
                  <Text as="p" sx={{ m: 0, color: "#155724" }}>
                    <Text as="span" sx={{ fontWeight: 700 }}>Chosen concept:</Text> Three-page guided workflow with dependency validation.
                  </Text>
                </Stack>
              </Stack>
            </Stack>
            </Stack>

            <Stack gap="normal">
              <Heading as="h2" sx={sectionHeadingSx}>Prototyping</Heading>

              <Stack gap="normal">
                <Heading as="h3" sx={subsectionHeadingSx}>Wireframes</Heading>
                <Stack direction="horizontal" gap="normal" sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
                  {wireframeImages.map((image, index) => (
                    <Stack
                      key={image.src}
                      sx={{
                        border: "1px solid var(--borderColor-default)",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        backgroundColor: "var(--canvas-default, #ffffff)"
                      }}
                      onClick={() => openLightbox('wireframes', index)}
                      gap="none"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{ width: imageThumbWidth, height: imageThumbHeight, objectFit: "cover", display: "block" }}
                      />
                      <Stack>
                        <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)" }}>
                          {image.alt}
                        </Text>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Stack>

              <Stack gap="normal">
                <Heading as="h3" sx={subsectionHeadingSx}>Hi-Fidelity Prototypes</Heading>
                <Stack direction="horizontal" gap="normal" sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
                  <Stack
                    sx={{
                      border: "1px solid var(--borderColor-default)",
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundColor: "var(--canvas-default, #ffffff)"
                    }}
                    onClick={() => openLightbox('hifi', 0)}
                    gap="none"
                  >
                    <img
                      src="/images/amendments/amendments-hifi.png"
                      alt="Hi-fidelity prototypes"
                      style={{ width: imageThumbWidth, height: imageThumbHeight, objectFit: "cover", display: "block" }}
                    />
                    <Stack>
                      <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)" }}>
                        Hi-fidelity prototypes
                      </Text>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              <Stack gap="normal">
                <Heading as="h3" sx={subsectionHeadingSx}>Usability Testing</Heading>
                <Text as="p" sx={{ m: 0 }}>
                  I conducted moderated usability testing with consultants across experience levels:
                </Text>
                <ul style={listStyle}>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Task-based testing</Text> - 15 common amendment scenarios tested with 24 consultants</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Think-aloud protocols</Text> - Identified confusion points and mental model mismatches</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>A/B testing</Text> - Compared new workflow against legacy system for time and accuracy</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Edge case validation</Text> - Tested complex multi-component amendments (e.g., date change + hotel swap)</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Accessibility audit</Text> - Keyboard navigation, screen reader compatibility, color contrast</li>
                </ul>
                <Stack sx={{ background: "#d4edda", borderRadius: 2, p: 3 }}>
                  <Text as="p" sx={{ m: 0, color: "#155724" }}>
                    <Text as="span" sx={{ fontWeight: 700 }}>Testing Results:</Text> 97% task success rate | 89% CSAT | Average time reduced from 8-12 min to 2-3 min
                  </Text>
                </Stack>
                <Stack sx={subtleCardSx} gap="condensed">
                  <Text as="p" sx={{ m: 0, fontStyle: "italic" }}>
                    "If this works the way it looks, amendments will take minutes, dependencies will be clear, and the risk of missed changes drops."
                  </Text>
                  <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)" }}>
                    — Alex Carter, Senior Consultant, Sydney
                  </Text>
                </Stack>
                <Stack direction="horizontal" gap="normal" sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
                  {userTestingImages.map((image, index) => (
                    <Stack
                      key={image.src}
                      sx={{
                        border: "1px solid var(--borderColor-default)",
                        borderRadius: 2,
                        overflow: "hidden",
                        cursor: "pointer",
                        backgroundColor: "var(--canvas-default, #ffffff)"
                      }}
                      onClick={() => openLightbox('userTesting', index)}
                      gap="none"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        style={{ width: imageThumbWidth, height: imageThumbHeight, objectFit: "cover", display: "block" }}
                      />
                      <Stack>
                        <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)" }}>
                          {image.alt}
                        </Text>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Stack>

            <Stack gap="normal">
              <Heading as="h2" sx={sectionHeadingSx}>Development</Heading>
              <Stack sx={bodySx} gap="normal">
                <ul style={listStyle}>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Design handoff</Text> - Detailed specs for Codegen with flowcharts and annotated prototypes to reduce ambiguity.</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Delivery cycles</Text> - 3-month cycles with planned checkpoints across the 5.5-hour time gap.</li>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Real-time collaboration</Text> - Continuous UI/UX alignment and fast adjustments during build.</li>
                </ul>

                <Stack gap="normal">
                  <Heading as="h3" sx={subsectionHeadingSx}>Quality Assurance</Heading>
                  <ul style={listStyle}>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Comprehensive testing</Text> - Real-world scenarios validated through UAT.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Data validation</Text> - Edge cases like past dates, sold-out inventory, and concurrent bookings.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>UAT with consultants</Text> - 2-week pilot with 50 consultants.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Regression testing</Text> - Existing booking flows stayed stable.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Iteration</Text> - Fixes tested and patched as needed.</li>
                  </ul>
                  <Stack sx={{ background: "#d1ecf1", borderRadius: 2, p: 3 }}>
                    <Text as="p" sx={{ m: 0, color: "#0c5460" }}>
                      <Text as="span" sx={{ fontWeight: 700 }}>Launch readiness:</Text> Zero critical bugs, 94% UAT approval, benchmarks exceeded.
                    </Text>
                  </Stack>
                </Stack>

                <Stack gap="normal">
                  <Heading as="h3" sx={subsectionHeadingSx}>Delivery</Heading>
                  <Text as="p" sx={{ m: 0 }}>
                    Coordinated teams and regions while keeping consultants productive during the transition:
                  </Text>
                  <Stack sx={{ background: "var(--canvas-subtle)", borderRadius: 3, p: 3 }} gap="normal">
                    <Heading as="h4" sx={{ m: 0, fontWeight: 700 }}>Delivery Approach</Heading>
                    <ul style={listStyle}>
                      <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Global partnership</Text> - Codegen delivered within HELiO.</li>
                      <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Cross-functional delivery</Text> - Engineering, design, ops, and training across time zones.</li>
                      <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Pilots first</Text> - Validate with select markets before global rollout.</li>
                      <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Training</Text> - Materials and sessions for 60+ consultants.</li>
                      <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Change management</Text> - Support docs and feedback loops.</li>
                      <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Feature toggles</Text> - Enable/disable releases safely.</li>
                      <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Success tracking</Text> - Adoption and efficiency monitoring.</li>
                    </ul>
                  </Stack>
                  <Stack sx={{ background: "#e8f5e9", border: "1px solid #4caf50", borderRadius: 2, p: 3 }}>
                    <Text as="p" sx={{ m: 0, color: "#2e7d32", fontWeight: 600 }}>
                      ✓ <Text as="span" sx={{ fontWeight: 700 }}>On‑time, zero downtime</Text> - Transitioned without disrupting daily operations.
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            <Stack gap="normal">
              <Heading as="h2" sx={sectionHeadingSx}>Rollout</Heading>
              <Stack sx={bodySx} gap="normal">
                <ul style={listStyle}>
                  <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Progressive rollout</Text> - Shipped high-impact verticals first, then expanded in later releases from Australia to global</li>
                </ul>
              </Stack>

              <Heading as="h3" sx={subsectionHeadingSx}>Workflow Efficiency Measurements</Heading>
              <Text as="p" sx={{ ...secondarySx, m: 0 }}>
                Old vs new workflow efficiency at a glance.
              </Text>

              <Stack sx={{ background: "var(--canvas-subtle)", borderRadius: 3, border: "1px solid var(--borderColor-muted)", p: 3 }} gap="normal">
                <Stack
                  gap="normal"
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 3
                  }}
                >
                  {[
                    { label: "Screens", value: "67%", detail: "9 → 3 screens" },
                    { label: "Loading time", value: "69%", detail: "30s → 9s" },
                    { label: "User actions", value: "55%", detail: "18+ → 8-10 clicks" }
                  ].map((metric) => (
                    <Stack key={metric.label} sx={{ background: "var(--canvas-default, #ffffff)", borderRadius: 2, border: "1px solid var(--borderColor-muted)", textAlign: "center", p: 3 }} gap="condensed">
                      <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)", fontWeight: 600 }}>{metric.label}</Text>
                      <Text as="div" sx={{ fontSize: 3, fontWeight: 700 }}>{metric.value}</Text>
                      <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-success)", fontWeight: 600 }}>
                        ↓ {metric.label === "Loading time" ? "faster" : "fewer"}
                      </Text>
                      <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)" }}>{metric.detail}</Text>
                    </Stack>
                  ))}
                </Stack>
                <Text as="div" sx={{ textAlign: "center", color: "var(--fgColor-muted)", fontStyle: "italic" }}>
                  Try the interactive demo to experience both workflows
                </Text>
              </Stack>

              <Stack gap="normal">
                <Heading as="h3" sx={subsectionHeadingSx}>Post-Release Validation</Heading>
                <Text as="p" sx={{ ...secondarySx, m: 0 }}>
                  FullStory used to validate real‑world impact post‑launch.
                </Text>

                <Stack sx={{ background: "var(--canvas-subtle)", borderRadius: 3, border: "1px solid var(--borderColor-muted)", p: 3 }} gap="normal">
                  <Heading as="h4" sx={{ m: 0, fontWeight: 700 }}>
                    FullStory Analytics (First 90 Days)
                  </Heading>

                  <Stack
                    gap="normal"
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 3
                    }}
                  >
                    {[
                      { label: "Adoption rate", value: "94%", detail: "active within 30 days", color: "var(--fgColor-success)" },
                      { label: "Task completion", value: "97%", detail: "error-free amendments", color: "var(--fgColor-success)" },
                      { label: "Avg session time", value: "2.4m", detail: "down from 10.2m", color: "var(--fgColor-accent)" },
                      { label: "Rage clicks", value: "-82%", detail: "reduction in frustrated interactions", color: "var(--fgColor-success)" }
                    ].map((metric) => (
                      <Stack key={metric.label} sx={{ background: "var(--canvas-default, #ffffff)", borderRadius: 2, border: "1px solid var(--borderColor-muted)", p: 3 }} gap="condensed">
                        <Text as="div" sx={{ fontSize: 0, color: "var(--fgColor-muted)", fontWeight: 600 }}>{metric.label}</Text>
                        <Text as="div" sx={{ fontSize: 3, fontWeight: 700, color: metric.color }}>{metric.value}</Text>
                        <Text as="div" sx={{ ...bodySx, fontSize: 0 }}>{metric.detail}</Text>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack sx={{ background: "#e3f2fd", borderRadius: 2, border: "1px solid #90caf9", p: 3 }}>
                    <Text as="p" sx={{ m: 0, ...bodySx, color: "#0d47a1" }}>
                      <Text as="span" sx={{ fontWeight: 700 }}>FullStory insights:</Text> Amendments completed 76% faster; error‑related tickets down 88% in the first quarter.
                    </Text>
                  </Stack>

                  <Text as="p" sx={{ m: 0, fontStyle: "italic", color: "var(--fgColor-muted)" }}>
                    💼 <Text as="span" sx={{ fontWeight: 700 }}>Business impact available on request</Text> — ROI, labor savings, and revenue attribution.
                  </Text>
                </Stack>
              </Stack>
            </Stack>

            <Stack gap="normal">
              <Heading as="h2" sx={sectionHeadingSx}>Reflection</Heading>
              <Stack sx={bodySx} gap="normal">
                <Heading as="h3" sx={subsectionHeadingSx}>Challenges & Learnings</Heading>
                <Text as="p" sx={{ m: 0 }}>
                  Working with Codegen across 7+ hour time zones created coordination challenges:
                </Text>

                <Stack sx={{ background: "#fff3cd", borderRadius: 3, border: "1px solid #ffc107", p: 3 }} gap="condensed">
                  <Text as="div" sx={{ fontSize: 0, fontWeight: 700, color: "#856404" }}>Key Challenges</Text>
                  <ul style={{ ...listStyle, color: "#856404" }}>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Limited domain context:</Text> Engineers lacked direct exposure to consultant workflows.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Bulk amendments out of scope:</Text> Group/corporate flows weren’t covered initially.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Stakeholder pushback:</Text> UX improvements conflicted with delivery effort.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Decision noise:</Text> Too many stakeholders and unclear ownership slowed progress.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Async gaps:</Text> 12+ hour feedback loops delayed decisions.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Context loss:</Text> Edge cases didn’t transfer well through docs alone.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Long cycles:</Text> 3‑month delivery limited iteration during build.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Quality trade‑offs:</Text> Timelines constrained UX refinement.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Testing limits:</Text> Limited production‑like environments slowed validation.</li>
                  </ul>
                </Stack>

                <Stack sx={{ background: "#d4edda", borderRadius: 3, border: "1px solid #c3e6cb", p: 3 }} gap="condensed">
                  <Text as="div" sx={{ fontSize: 0, fontWeight: 700, color: "#155724" }}>What I Learned</Text>
                  <ul style={{ ...listStyle, color: "#155724" }}>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Kick‑off alignment:</Text> Early workshops prevented months of rework.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Visual specs win:</Text> Flowcharts and annotated screenshots cut back‑and‑forth by 60%.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Video walkthroughs:</Text> Short Looms beat long documents.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Overlap windows:</Text> Small time‑shift enabled real‑time decisions.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Reliability builds trust:</Text> Consistent cadence reduced uncertainty.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Embrace constraints:</Text> Limits led to simpler, maintainable solutions.</li>
                  </ul>
                </Stack>

                <Heading as="h3" sx={{ ...subsectionHeadingSx, mt: 2 }}>Dream vs Reality</Heading>
                <Text as="p" sx={{ m: 0 }}>
                  The ideal solution was an AI “Dream Flow” where consultants describe the change in plain language and the system handles the rest.
                </Text>

                <ul style={listStyle}>
                  <li style={listItemStyle}>Interpret intent and recommend best options</li>
                  <li style={listItemStyle}>Validate dependencies across flights, hotels, transfers, and activities</li>
                  <li style={listItemStyle}>Show live pricing and availability</li>
                  <li style={listItemStyle}>Auto-check business rules and compliance</li>
                  <li style={listItemStyle}>Complete the amendment in one conversational flow</li>
                </ul>

                <Stack sx={{ background: "#fff3cd", borderRadius: 3, border: "1px solid #ffc107", p: 3 }} gap="condensed">
                  <Text as="p" sx={{ m: 0, fontWeight: 700, color: "#856404" }}>
                    Why we couldn’t build this (2019–2020):
                  </Text>
                  <ul style={{ ...listStyle, color: "#856404" }}>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Technical constraints:</Text> Legacy systems couldn’t aggregate real-time inventory across GDS providers.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Data silos:</Text> Hotel, car, and activity inventory had no unified API.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>AI limitations:</Text> NLP wasn’t production-ready for complex bookings.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Business risk:</Text> Commission/SLA requirements needed human validation.</li>
                    <li style={listItemStyle}><Text as="span" sx={{ fontWeight: 700 }}>Timeline pressure:</Text> Consultants needed relief now, not a multi‑year build.</li>
                  </ul>
                </Stack>

                <Text as="p" sx={{ m: 0, fontStyle: "italic", color: "var(--fgColor-muted)" }}>
                  We delivered a practical three‑page workflow with 75% time savings. The Dream Flow later became the 2024 demo showing what’s now possible.
                </Text>
              </Stack>
            </Stack>
          </div>
          )}
        </div>

        {lightbox.isOpen && (
          <Dialog
            title={getGalleryImages()[lightbox.currentIndex].alt}
            onClose={closeLightbox}
            sx={{ width: "auto", maxWidth: "95vw" }}
          >
            <Stack align="center" gap="normal" sx={{ maxWidth: "90vw" }}>
              <Stack direction="horizontal" align="center" gap="condensed">
                <IconButton
                  icon={ChevronLeftIcon}
                  aria-label="Previous image"
                  onClick={() => navigateLightbox('prev')}
                  disabled={getGalleryImages().length <= 1}
                />
                <img
                  src={getGalleryImages()[lightbox.currentIndex].src}
                  alt={getGalleryImages()[lightbox.currentIndex].alt}
                  style={{ maxWidth: "70vw", maxHeight: "70vh", objectFit: "contain", borderRadius: 8, display: "block" }}
                />
                <IconButton
                  icon={ChevronRightIcon}
                  aria-label="Next image"
                  onClick={() => navigateLightbox('next')}
                  disabled={getGalleryImages().length <= 1}
                />
              </Stack>
              {getGalleryImages().length > 1 && (
                <Text as="span" sx={{ fontSize: 0, color: "var(--fgColor-muted)" }}>
                  {lightbox.currentIndex + 1} / {getGalleryImages().length}
                </Text>
              )}
            </Stack>
          </Dialog>
        )}
        </div>
      </BaseStyles>
    </ThemeProvider>
  );
};

export default AmendmentsCaseStudy;
