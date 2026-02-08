import React, { useEffect, useMemo, useState } from 'react';
import { BaseStyles, Heading, IconButton, Text, ThemeProvider, ToggleSwitch, theme } from '@primer/react';
import { insuranceFlowTokens } from '../styles/insuranceFlowTokens';
import { XIcon } from '@primer/octicons-react';

const resolveSpaceValue = (value) => {
  if (typeof value === "number") {
    return theme.space?.[value] ?? value;
  }
  return value;
};

const Box = ({ as: Component = "div", sx, style, ...props }) => {
  const resolvedSx = { ...(sx || {}) };
  if (resolvedSx.p !== undefined) {
    const padding = resolveSpaceValue(resolvedSx.p);
    resolvedSx.padding = padding;
    delete resolvedSx.p;
  }
  if (resolvedSx.px !== undefined) {
    const paddingX = resolveSpaceValue(resolvedSx.px);
    resolvedSx.paddingLeft = paddingX;
    resolvedSx.paddingRight = paddingX;
    delete resolvedSx.px;
  }
  if (resolvedSx.py !== undefined) {
    const paddingY = resolveSpaceValue(resolvedSx.py);
    resolvedSx.paddingTop = paddingY;
    resolvedSx.paddingBottom = paddingY;
    delete resolvedSx.py;
  }

  return <Component {...props} style={{ ...resolvedSx, ...(style || {}) }} />;
};

const InsuranceCaseStudy = ({ onClose, onViewDemo, position, onDragStart, zIndex = 99 }) => {
  const [lightbox, setLightbox] = useState({ isOpen: false, gallery: null, currentIndex: 0 });
  const [isDemoEnabled, setIsDemoEnabled] = useState(false);

  const discoveryActivities = useMemo(
    () => [
      {
        title: "Remote usability testing",
        description: "Remote moderated usability testing with consultants and advisors to validate the end-to-end flow.",
        icon: "🧑‍🤝‍🧑",
        artifact: { src: "/images/insurance/image1.png", alt: "Usability testing session notes" }
      },
      {
        title: "Usability goal",
        description: "Focused on the consultant insurance experience and key friction points in quoting and conversion.",
        icon: "👀",
        artifact: { src: "/images/insurance/image2.png", alt: "Usability goal artifact" }
      },
      {
        title: "Participants",
        description: "5 participants across brands (3 AU travel consultants + 2 AU travel advisors).",
        icon: "👥",
        artifact: { src: "/images/insurance/image3.png", alt: "Participant summary artifact" }
      },
      {
        title: "Quote task",
        description: "Task-based testing for adding an insurance quote directly into HELiO bookings.",
        icon: "🧩",
        artifact: { src: "/images/insurance/image4.png", alt: "Quote task artifact" }
      },
      {
        title: "Policy task",
        description: "Validated conversion from quote to policy without leaving the booking workflow.",
        icon: "✅",
        artifact: { src: "/images/insurance/image5.png", alt: "Policy conversion artifact" }
      },
      {
        title: "Insights synthesis",
        description: "Captured usability gains and click reduction outcomes from the pilot.",
        icon: "📈",
        artifact: { src: "/images/insurance/image6.png", alt: "Insights synthesis artifact" }
      }
    ],
    []
  );

  const keyFindings = useMemo(
    () => [
      {
        title: "Separate system",
        detail: "Insurance quoting lived in a different platform with re-login required",
        icon: "🔀"
      },
      {
        title: "Manual calculations",
        detail: "Consultants calculated premiums manually based on trip details",
        icon: "🧮"
      },
      {
        title: "Duplicate data entry",
        detail: "Customer details were entered twice across platforms",
        icon: "📋"
      },
      {
        title: "Lengthy process",
        detail: "5-8 minutes to add insurance to a booking",
        icon: "⏱️"
      },
      {
        title: "Low attachment rates",
        detail: "Complexity discouraged consultants from offering coverage",
        icon: "📉"
      },
      {
        title: "Lost revenue",
        detail: "Missed insurance opportunities on 60% of eligible bookings",
        icon: "💸"
      }
    ],
    []
  );

  const wireframeImages = [];
  const hifiImages = [];
  const userTestingImages = [];

  const handleDemoToggle = (event) => {
    const checked = event.target.checked;
    setIsDemoEnabled(checked);
    if (checked) {
      onViewDemo?.();
    }
  };

  const openLightbox = (gallery, index) => {
    setLightbox({ isOpen: true, gallery, currentIndex: index });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, gallery: null, currentIndex: 0 });
  };

  const getGalleryImages = () => {
    switch (lightbox.gallery) {
      case 'discovery':
        return discoveryActivities.map((activity) => activity.artifact);
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
    if (!currentGallery.length) return;
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

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (event.key === 'ArrowRight') {
        navigateLightbox('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  const fallbackPosition = position || {
    x: typeof window !== 'undefined' ? Math.max(0, (window.innerWidth - 1000) / 2) : 50,
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 600) / 2) : 100
  };

  const windowSx = {
    ...insuranceFlowTokens.windowSx,
    left: `${fallbackPosition.x}px`,
    top: `${fallbackPosition.y}px`,
    zIndex,
    width: "min(95vw, 1000px)",
    maxWidth: "95vw",
    height: "min(90vh, 700px)",
    maxHeight: "90vh"
  };

  const galleryImages = lightbox.isOpen ? getGalleryImages() : [];
  const headerTitleSx = {
    ...insuranceFlowTokens.headerTitleSx,
    m: 0,
    fontWeight: 700,
    lineHeight: 1.2
  };
  const headerTitleStyle = { fontSize: theme.fontSizes?.[3] };

  return (
    <ThemeProvider theme={theme}>
      <BaseStyles>
        <Box sx={windowSx}>
          <Box sx={insuranceFlowTokens.headerSx} onMouseDown={onDragStart}>
          <Box>
            <Heading as="h1" sx={headerTitleSx} style={headerTitleStyle}>
              Travel insurance integration
            </Heading>
            <Box sx={{ display: "flex", alignItems: "center", gap: 8, mt: 1 }} />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 12 }}
            onMouseDown={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
          >
            <div
              role="switch"
              aria-checked={isDemoEnabled}
              aria-label="Interactive demo toggle"
              tabIndex={0}
              onClick={(event) => {
                event.stopPropagation();
                handleDemoToggle({ currentTarget: { checked: !isDemoEnabled } });
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleDemoToggle({ currentTarget: { checked: !isDemoEnabled } });
                }
              }}
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
              <span
                style={{
                  pointerEvents: "none",
                  display: "inline-flex",
                  transform: "scale(0.85)",
                  transformOrigin: "center"
                }}
              >
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
            <IconButton icon={XIcon} aria-label="Close Insurance" onClick={onClose} size="small" />
          </Box>
        </Box>

        <Box sx={insuranceFlowTokens.bodySx}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
            {[
              { value: "+45%", label: "Attachment Rate" },
              { value: "90%", label: "Time Saved" },
              { value: "$2.4M", label: "Annual Revenue" }
            ].map((stat) => (
              <Box key={stat.label} sx={insuranceFlowTokens.statCardSx}>
                <Text sx={insuranceFlowTokens.statValueSx}>{stat.value}</Text>
                <Text sx={insuranceFlowTokens.statLabelSx}>{stat.label}</Text>
              </Box>
            ))}
          </Box>

          <Box sx={{ marginBottom: 24 }}>
            <Text sx={{ ...insuranceFlowTokens.bodyTextSx, display: "block", marginBottom: 12 }}>
              Pilot project for a new booking platform. We integrated travel insurance directly into the booking flow to streamline quoting
              and lift attachment rates.
            </Text>
            <Box sx={{ ...insuranceFlowTokens.cardSx, marginBottom: 12 }}>
              <Text sx={insuranceFlowTokens.secondaryTextSx}>Objective & Key Result</Text>
              <Text sx={{ ...insuranceFlowTokens.bodyTextSx, marginTop: 6, display: "block" }}>
                Streamline insurance quoting and increase attachment rates through an integrated workflow.
              </Text>
            </Box>
            <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#f6f8fa" }}>
              <Text sx={{ ...insuranceFlowTokens.bodyTextSx, fontStyle: "italic", display: "block", marginBottom: 6 }}>
                "The fact that I don't have to do 27 clicks to load this into the quote is a win. This would make a lot of people in retail very happy!"
              </Text>
              <Text sx={insuranceFlowTokens.secondaryTextSx}>— Travel consultant, usability testing</Text>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 28 }}>
            <Heading as="h2" sx={insuranceFlowTokens.sectionTitleSx}>Discovery</Heading>
            <Heading as="h3" sx={insuranceFlowTokens.subsectionTitleSx}>Research</Heading>
            <Box as="ul" sx={insuranceFlowTokens.listSx}>
              {discoveryActivities.map((activity) => (
                <Box as="li" key={activity.title} sx={insuranceFlowTokens.listItemSx}>
                  <Text sx={insuranceFlowTokens.bodyTextSx}>{activity.description}</Text>
                </Box>
              ))}
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12, marginTop: 12 }}>
              {discoveryActivities.map((activity, index) => (
                <Box
                  as="button"
                  type="button"
                  key={activity.title}
                  onClick={() => openLightbox("discovery", index)}
                  sx={insuranceFlowTokens.gridThumbSx}
                >
                  <Box
                    as="img"
                    src={activity.artifact.src}
                    alt={activity.artifact.alt}
                    sx={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
                  />
                  <Box sx={{ padding: "8px 10px" }}>
                    <Text sx={insuranceFlowTokens.secondaryTextSx}>{activity.title}</Text>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ marginTop: 20 }}>
              <Heading as="h3" sx={insuranceFlowTokens.subsectionTitleSx}>Findings</Heading>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                {keyFindings.map((finding) => (
                  <Box key={finding.title} sx={insuranceFlowTokens.cardSx}>
                    <Box sx={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Text sx={insuranceFlowTokens.pillSx}>{finding.icon}</Text>
                      <Box>
                        <Text sx={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 4 }}>
                          {finding.title}
                        </Text>
                        <Text sx={insuranceFlowTokens.secondaryTextSx}>{finding.detail}</Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ marginTop: 20 }}>
              <Heading as="h3" sx={insuranceFlowTokens.subsectionTitleSx}>Problem Definition</Heading>
              <Text sx={insuranceFlowTokens.bodyTextSx}>
                How might we embed insurance quoting into the booking workflow so consultants can add coverage in under a minute, without
                context switching or manual calculations?
              </Text>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 28 }}>
            <Heading as="h2" sx={insuranceFlowTokens.sectionTitleSx}>Ideation</Heading>
            <Box as="ul" sx={insuranceFlowTokens.listSx}>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}>
                  Explored inline quote panels versus modal handoffs to keep consultants in the booking context.
                </Text>
              </Box>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}>
                  Mapped data dependencies to pre-fill customer details and reduce re-entry effort.
                </Text>
              </Box>
              <Box as="li">
                <Text sx={insuranceFlowTokens.bodyTextSx}>
                  Partnered with the insurance API team to validate real-time pricing and policy conversion steps.
                </Text>
              </Box>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 28 }}>
            <Heading as="h2" sx={insuranceFlowTokens.sectionTitleSx}>Concept Development</Heading>
            <Box as="ul" sx={insuranceFlowTokens.listSx}>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Integrated quoting</strong> - Insurance options displayed within the booking screen</Text>
              </Box>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Auto-calculated premiums</strong> - Real-time pricing based on trip details</Text>
              </Box>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Smart recommendations</strong> - Suggested coverage tiers aligned to traveler profiles</Text>
              </Box>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>One-click add</strong> - Add insurance to booking in a single step</Text>
              </Box>
              <Box as="li">
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Pre-populated forms</strong> - Customer details auto-filled from booking data</Text>
              </Box>
            </Box>
            <Text sx={{ ...insuranceFlowTokens.bodyTextSx, display: "block", marginTop: 10 }}>
              Result: reduced insurance addition time from 5-8 minutes to 30 seconds while lifting attachment rates by 45%.
            </Text>
          </Box>

          <Box sx={{ marginBottom: 28 }}>
            <Heading as="h2" sx={insuranceFlowTokens.sectionTitleSx}>Prototyping</Heading>
            <Heading as="h3" sx={insuranceFlowTokens.subsectionTitleSx}>Wireframes</Heading>
            <Text sx={{ ...insuranceFlowTokens.bodyTextSx, display: "block", marginBottom: 10 }}>
              Early layout iterations focused on keeping quoting, pricing, and policy conversion in a single continuous flow.
            </Text>
            <Text sx={insuranceFlowTokens.secondaryTextSx}>Wireframe artifacts available on request.</Text>

            <Heading as="h3" sx={{ ...insuranceFlowTokens.subsectionTitleSx, marginTop: 18 }}>Hi-Fidelity Prototypes</Heading>
            <Text sx={insuranceFlowTokens.secondaryTextSx}>High-fidelity prototypes available on request.</Text>

            <Heading as="h3" sx={{ ...insuranceFlowTokens.subsectionTitleSx, marginTop: 18 }}>Usability Testing</Heading>
            <Text sx={{ ...insuranceFlowTokens.bodyTextSx, display: "block", marginBottom: 8 }}>
              Moderated usability testing with 5 consultants/advisors validated the integrated insurance experience.
            </Text>
            <Box as="ul" sx={insuranceFlowTokens.listSx}>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Methodology</strong> - Remote moderated usability testing</Text>
              </Box>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Key tasks</strong> - Add insurance quote to HELiO booking, convert quote to policy</Text>
              </Box>
              <Box as="li">
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Participants</strong> - 3 AU travel consultants + 2 AU travel advisors</Text>
              </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginTop: 12 }}>
              <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#e8f5e9", borderColor: "#1a7f37" }}>
                <Text sx={{ fontSize: 18, fontWeight: 700, color: "#1a7f37" }}>58%</Text>
                <Text sx={insuranceFlowTokens.secondaryTextSx}>Improved usability score (UMUX 27% → 90%)</Text>
              </Box>
              <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#ddf4ff", borderColor: "#0969da" }}>
                <Text sx={{ fontSize: 18, fontWeight: 700, color: "#0969da" }}>233%</Text>
                <Text sx={insuranceFlowTokens.secondaryTextSx}>Reduction in clicks (28-36 → 16)</Text>
              </Box>
            </Box>
            <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#f6f8fa", marginTop: 12 }}>
              <Text sx={{ ...insuranceFlowTokens.bodyTextSx, fontStyle: "italic", display: "block", marginBottom: 6 }}>
                "100% I would use the insurance flow. I think it's a very good addition and it will increase our productivity and sales."
              </Text>
              <Text sx={insuranceFlowTokens.secondaryTextSx}>— Travel Associates advisor, usability testing</Text>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 28 }}>
            <Heading as="h2" sx={insuranceFlowTokens.sectionTitleSx}>Development</Heading>
            <Box as="ul" sx={insuranceFlowTokens.listSx}>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>In-house delivery</strong> - Led the internal agile team to build the integration</Text>
              </Box>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>API integration</strong> - Worked with EA's API team to enable real-time quoting and conversion</Text>
              </Box>
              <Box as="li">
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Training rollout</strong> - Created materials and ran training for consultants</Text>
              </Box>
            </Box>

            <Heading as="h3" sx={{ ...insuranceFlowTokens.subsectionTitleSx, marginTop: 18 }}>Quality Assurance</Heading>
            <Box as="ul" sx={insuranceFlowTokens.listSx}>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Compliance validation</strong> - Ensured regulatory requirements were met across markets</Text>
              </Box>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Pilot testing</strong> - Controlled pilot with select consultants to validate usability and stability</Text>
              </Box>
              <Box as="li">
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Performance monitoring</strong> - Tracked attachment rates and system stability post-launch</Text>
              </Box>
            </Box>
            <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#ddf4ff", marginTop: 12 }}>
              <Text sx={insuranceFlowTokens.bodyTextSx}>
                <strong>Launch readiness:</strong> Pilot stability confirmed | Compliance checks passed | Training completion above 95%
              </Text>
            </Box>

            <Heading as="h3" sx={{ ...insuranceFlowTokens.subsectionTitleSx, marginTop: 18 }}>Delivery</Heading>
            <Text sx={{ ...insuranceFlowTokens.bodyTextSx, display: "block", marginBottom: 8 }}>
              Integrating insurance into the booking platform required close coordination with external partners and internal stakeholders.
            </Text>
            <Box sx={{ ...insuranceFlowTokens.cardSx, marginBottom: 12 }}>
              <Heading as="h4" sx={{ fontSize: 14, margin: "0 0 8px 0" }}>Delivery Approach</Heading>
              <Box as="ul" sx={insuranceFlowTokens.listSx}>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}><Text sx={insuranceFlowTokens.bodyTextSx}><strong>In-house development</strong> - Led the internal agile team</Text></Box>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}><Text sx={insuranceFlowTokens.bodyTextSx}><strong>Platform pilot</strong> - Used as a pilot project for the new booking platform</Text></Box>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}><Text sx={insuranceFlowTokens.bodyTextSx}><strong>API integration</strong> - Partnered with EA insurance API team</Text></Box>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}><Text sx={insuranceFlowTokens.bodyTextSx}><strong>Compliance validation</strong> - Ensured regulatory requirements across markets</Text></Box>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}><Text sx={insuranceFlowTokens.bodyTextSx}><strong>Pilot testing</strong> - Controlled pilot with select consultants</Text></Box>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}><Text sx={insuranceFlowTokens.bodyTextSx}><strong>Training rollout</strong> - Training materials and sessions for consultants</Text></Box>
                <Box as="li"><Text sx={insuranceFlowTokens.bodyTextSx}><strong>Performance monitoring</strong> - Tracked attachment rates and stability post-launch</Text></Box>
              </Box>
            </Box>
            <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#e8f5e9", borderColor: "#1a7f37" }}>
              <Text sx={{ ...insuranceFlowTokens.bodyTextSx, fontWeight: 600, color: "#1a7f37" }}>
                ✓ <strong>Launched successfully in July 2024</strong> — Seamless integration with immediate revenue impact
              </Text>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 28 }}>
            <Heading as="h2" sx={insuranceFlowTokens.sectionTitleSx}>Rollout</Heading>
            <Box as="ul" sx={insuranceFlowTokens.listSx}>
              <Box as="li">
                <Text sx={insuranceFlowTokens.bodyTextSx}><strong>July 2024 launch</strong> - Rolled out from pilot consultants to broader teams with ongoing monitoring</Text>
              </Box>
            </Box>

            <Heading as="h3" sx={{ ...insuranceFlowTokens.subsectionTitleSx, marginTop: 18 }}>
              Workflow Efficiency Measurements
            </Heading>
            <Text sx={{ ...insuranceFlowTokens.secondaryTextSx, display: "block", marginBottom: 10 }}>
              Technical breakdown of workflow improvements between old and new flows
            </Text>
            <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#f6f8fa" }}>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {[
                  { label: "Context Switching", value: "100%", note: "2 systems → 1" },
                  { label: "Process Time", value: "90%", note: "5-8m → 30s" },
                  { label: "User Actions", value: "233%", note: "28-36 → 16 clicks" }
                ].map((item) => (
                  <Box key={item.label} sx={insuranceFlowTokens.cardSx}>
                    <Text sx={{ fontSize: 12, color: "#57606a", fontWeight: 600 }}>{item.label}</Text>
                    <Text sx={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{item.value}</Text>
                    <Text sx={insuranceFlowTokens.secondaryTextSx}>{item.note}</Text>
                  </Box>
                ))}
              </Box>
              <Text sx={{ ...insuranceFlowTokens.secondaryTextSx, fontStyle: "italic", textAlign: "center", marginTop: 12 }}>
                Try the interactive demo to experience both workflows
              </Text>
            </Box>

            <Heading as="h3" sx={{ ...insuranceFlowTokens.subsectionTitleSx, marginTop: 18 }}>
              Post-Release Validation
            </Heading>
            <Text sx={{ ...insuranceFlowTokens.secondaryTextSx, display: "block", marginBottom: 10 }}>
              Business impact and adoption signals tracked after rollout
            </Text>
            <Box sx={insuranceFlowTokens.cardSx}>
              <Heading as="h4" sx={{ fontSize: 14, margin: "0 0 10px 0" }}>Early Impact Signals</Heading>
              <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                {[
                  { label: "Attachment Rate", value: "+45%", note: "increase in insurance attachment after launch" },
                  { label: "Time to Add Insurance", value: "30s", note: "average time to add coverage (down from 5-8 minutes)" },
                  { label: "Revenue Lift", value: "$2.4M", note: "additional annual revenue from improved attachment" },
                  { label: "Compliance Risk", value: "↓ lower", note: "consistent insurance offering and audit-ready records" }
                ].map((item) => (
                  <Box key={item.label} sx={insuranceFlowTokens.cardSx}>
                    <Text sx={{ fontSize: 12, color: "#57606a", fontWeight: 600 }}>{item.label}</Text>
                    <Text sx={{ fontSize: 18, fontWeight: 700, marginTop: 6 }}>{item.value}</Text>
                    <Text sx={insuranceFlowTokens.secondaryTextSx}>{item.note}</Text>
                  </Box>
                ))}
              </Box>
              <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#ddf4ff", marginTop: 12 }}>
                <Text sx={insuranceFlowTokens.bodyTextSx}>
                  <strong>Business impact:</strong> Improved consultant efficiency, stronger compliance posture, and new revenue unlocked in the first quarter post-launch.
                </Text>
              </Box>
            </Box>
          </Box>

          <Box sx={{ marginBottom: 8 }}>
            <Heading as="h2" sx={insuranceFlowTokens.sectionTitleSx}>Reflection</Heading>
            <Heading as="h3" sx={insuranceFlowTokens.subsectionTitleSx}>Challenges & Learnings</Heading>
            <Text sx={{ ...insuranceFlowTokens.bodyTextSx, display: "block", marginBottom: 12 }}>
              Building the pilot surfaced a few key learnings that shaped subsequent phases:
            </Text>
            <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#fff8c5", borderColor: "#d4a72c", marginBottom: 12 }}>
              <Text sx={{ fontSize: 12, fontWeight: 600, color: "#7d4e00", marginBottom: 6 }}>Key Challenges</Text>
              <Box as="ul" sx={insuranceFlowTokens.listSx}>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                  <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Regulatory complexity:</strong> Coverage rules varied by market, requiring additional validation logic</Text>
                </Box>
                <Box as="li">
                  <Text sx={insuranceFlowTokens.bodyTextSx}><strong>API dependencies:</strong> Tight coupling with partner APIs required careful staging and fallback handling</Text>
                </Box>
              </Box>
            </Box>
            <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#dafbe1", borderColor: "#1a7f37", marginBottom: 12 }}>
              <Text sx={{ fontSize: 12, fontWeight: 600, color: "#1a7f37", marginBottom: 6 }}>What I Learned</Text>
              <Box as="ul" sx={insuranceFlowTokens.listSx}>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                  <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Align with compliance early:</strong> Early validation reduced rework and approval cycles</Text>
                </Box>
                <Box as="li">
                  <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Prototype with real data:</strong> Real booking scenarios revealed edge cases faster than mock data</Text>
                </Box>
              </Box>
            </Box>

            <Heading as="h3" sx={insuranceFlowTokens.subsectionTitleSx}>Dream vs Reality</Heading>
            <Text sx={{ ...insuranceFlowTokens.bodyTextSx, display: "block", marginBottom: 12 }}>
              The ideal vision was a fully personalized coverage assistant that recommended the right plan automatically. We shipped the highest-impact,
              feasible version for the pilot timeline.
            </Text>
            <Box as="ul" sx={insuranceFlowTokens.listSx}>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}>Instant coverage recommendations based on trip, traveler, and policy rules</Text>
              </Box>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}>Auto-approval for low-risk policies to reduce consultant workload</Text>
              </Box>
              <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}>Real-time compliance checks across markets</Text>
              </Box>
              <Box as="li">
                <Text sx={insuranceFlowTokens.bodyTextSx}>One-step policy conversion with no extra data entry</Text>
              </Box>
            </Box>

            <Box sx={{ ...insuranceFlowTokens.cardSx, background: "#fff8c5", borderColor: "#d4a72c", marginTop: 12 }}>
              <Text sx={{ ...insuranceFlowTokens.bodyTextSx, fontWeight: 600, marginBottom: 6 }}>Why we phased the dream:</Text>
              <Box as="ul" sx={insuranceFlowTokens.listSx}>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                  <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Regulatory constraints:</strong> Requirements varied across markets and insurers</Text>
                </Box>
                <Box as="li" sx={insuranceFlowTokens.listItemSx}>
                  <Text sx={insuranceFlowTokens.bodyTextSx}><strong>API maturity:</strong> Real-time pricing endpoints required staged rollout</Text>
                </Box>
                <Box as="li">
                  <Text sx={insuranceFlowTokens.bodyTextSx}><strong>Pilot timeline:</strong> Delivered the integrated flow first to prove impact and adoption</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {lightbox.isOpen && galleryImages.length ? (
        <Box sx={insuranceFlowTokens.overlaySx} onClick={closeLightbox}>
          <Box sx={insuranceFlowTokens.lightboxSx} onClick={(event) => event.stopPropagation()}>
            <Button sx={{ position: "absolute", top: -48, right: 0 }} onClick={closeLightbox}>
              Close
            </Button>
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={() => navigateLightbox('prev')}
                style={{ ...insuranceFlowTokens.lightboxButtonSx, position: "absolute", left: "-60px" }}
                aria-label="Previous image"
              >
                Prev
              </button>
            )}
            <Box
              as="img"
              src={galleryImages[lightbox.currentIndex].src}
              alt={galleryImages[lightbox.currentIndex].alt}
              sx={{ maxWidth: "95vw", maxHeight: "95vh", borderRadius: 8, objectFit: "contain" }}
            />
            {galleryImages.length > 1 && (
              <button
                type="button"
                onClick={() => navigateLightbox('next')}
                style={{ ...insuranceFlowTokens.lightboxButtonSx, position: "absolute", right: "-60px" }}
                aria-label="Next image"
              >
                Next
              </button>
            )}
            {galleryImages.length > 1 && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "#ffffff",
                  fontSize: 12
                }}
              >
                {lightbox.currentIndex + 1} / {galleryImages.length}
              </Box>
            )}
          </Box>
        </Box>
      ) : null}
      </BaseStyles>
    </ThemeProvider>
  );
};

export default InsuranceCaseStudy;
