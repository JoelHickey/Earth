import React, { useState } from 'react';
import { Box, Dialog, DialogContent, FormControlLabel, IconButton, Switch, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PivotTableChartIcon from '@mui/icons-material/PivotTableChart';
import RuleIcon from '@mui/icons-material/Rule';
import InsightsIcon from '@mui/icons-material/Insights';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import HubIcon from '@mui/icons-material/Hub';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LayersIcon from '@mui/icons-material/Layers';
import ShieldIcon from '@mui/icons-material/Shield';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BuildIcon from '@mui/icons-material/Build';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

const AmendmentsCaseStudy = ({ onViewOldFlow, onViewNewFlow, onClose, position, onDragStart, zIndex = 120 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lightbox, setLightbox] = useState({ isOpen: false, gallery: null, currentIndex: 0 });
  const [isDemoEnabled, setIsDemoEnabled] = useState(false);
  
  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 200);
  };

  const handleDemoToggle = (event) => {
    const checked = event.target.checked;
    setIsDemoEnabled(checked);
    if (checked) {
      onViewOldFlow?.();
    }
  };

  // Discovery artifacts mapped to their bullet points
  const discoveryActivities = [
    {
      title: "Global workshops",
      description: "Co-led interactive workshops with 60+ consultants and stakeholders across all brands globally to ensure complete coverage.",
      icon: GroupsIcon,
      artifact: { src: "/images/amendments/image1.png", alt: "Global workshops artifact" }
    },
    {
      title: "Problem discovery workshop",
      description: "Captured pain points and context during the problem discovery session.",
      icon: GroupsIcon,
      artifact: { src: "/images/amendments/Problem discovery.png", alt: "Problem discovery workshop artifact" }
    },
    {
      title: "Voting on pain points",
      description: "Mapped manual amendment steps across product verticals.",
      icon: AccountTreeIcon,
      artifact: { src: "/images/amendments/image3.png", alt: "Workflow mapping artifact" }
    },
    {
      title: "Matrix analysis",
      description: "Prioritized amendment types by frequency versus friction, with stakeholder voting to align on the biggest productivity wins.",
      icon: PivotTableChartIcon,
      artifact: { src: "/images/amendments/matrix.png", alt: "Matrix analysis artifact" }
    },
    {
      title: "Competitive analysis",
      description: "Benchmarked amendment flows across key competitors.",
      icon: InsightsIcon,
      artifact: null // No artifact for this one
    },
    {
      title: "Risk assessment",
      description: "Assessed technical and financial impacts and risks.",
      icon: ShieldIcon,
      artifact: null // No artifact for this one
    }
  ];

  const keyFindings = [
    {
      title: "Click-heavy flow",
      detail: "13+ clicks with hidden dependency impacts",
      icon: TouchAppIcon
    },
    {
      title: "Error-prone process",
      detail: "Manual data entry caused booking errors",
      icon: ErrorOutlineIcon
    },
    {
      title: "Need for bulk amendments",
      detail: "Complex bookings required updates across all components",
      icon: LayersIcon
    },
    {
      title: "Reduced confidence",
      detail: "Slow performance and unclear errors eroded trust",
      icon: ThumbDownIcon
    },
    {
      title: "Customer frustration",
      detail: "Long hold times and slow service",
      icon: SentimentDissatisfiedIcon
    },
    {
      title: "Technical constraints",
      detail: "Core fixes were blocked by platform constraints",
      icon: BuildIcon
    }
  ];

  // Flattened list for lightbox navigation
  const discoveryImages = discoveryActivities
    .filter(activity => activity.artifact)
    .map(activity => activity.artifact);

  // Wireframes gallery images
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

  // Keyboard navigation
  React.useEffect(() => {
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
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 600) / 2) : 100
  };

  const sectionHeadingSx = {
    mb: 2.5,
    fontWeight: 700,
    color: "#4b2f73",
    letterSpacing: "0.04em"
  };

  const subsectionHeadingSx = {
    mb: 2,
    fontWeight: 700,
    color: "text.primary"
  };

  const bodyTextSx = {
    lineHeight: 1.6,
    color: "text.primary"
  };

  const bodySecondarySx = {
    lineHeight: 1.6,
    color: "text.secondary"
  };
  
  return (
    <Box
      sx={(theme) => ({
      position: "fixed",
        left: `${fallbackPosition.x}px`,
        top: `${fallbackPosition.y}px`,
        zIndex,
        backgroundColor: "background.paper",
        width: { xs: "95vw", md: theme.spacing(125) },
      maxWidth: "95vw",
        height: { xs: "90vh", md: theme.spacing(87.5) },
      maxHeight: "90vh",
        boxShadow: 1,
        borderRadius: theme.shape.borderRadius,
        border: "1px solid",
        borderColor: "divider",
      display: "flex",
      flexDirection: "column",
        overflow: "hidden"
      })}
    >
      {/* Content */}
      <Box
        onScroll={handleScroll}
        sx={(theme) => ({
          flex: 1,
          overflow: "auto",
          p: 0,
          fontFamily: theme.typography.fontFamily,
          WebkitFontSmoothing: "antialiased",
          position: "relative"
        })}
      >
        {/* Sticky Header */}
        <Box
          onMouseDown={onDragStart}
          sx={(theme) => ({
            position: "sticky",
            top: 0,
            backgroundColor: "background.paper",
            zIndex: 10,
            minHeight: 0,
            px: 3,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            transition: "all 0.2s ease",
            cursor: "move"
          })}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25, flex: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{
                    m: 0,
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    color: "text.primary"
                  }}
                >
                  Streamlining amendments
                </Typography>
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ fontWeight: 400, m: 0, color: "text.secondary", letterSpacing: "0.01em" }}
                >
                  <Box
                    component="img"
                    src="/Flight_Centre_company_logo_(Non-free).png"
                    alt="Flight Centre logo"
                    sx={{
                      height: 32,
                      width: "auto",
                      display: "block"
                    }}
                  />
                </Typography>
              </Box>
            </Box>
            
            {/* Header Actions */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <FormControlLabel
                label="Interactive Demo"
                labelPlacement="start"
                sx={{
                  m: 0,
                  gap: 1,
                  "& .MuiFormControlLabel-label": {
                    fontSize: "0.8rem",
                    fontWeight: 500
                  }
                }}
                control={
                  <Switch
                    size="small"
                    checked={isDemoEnabled}
                    onChange={handleDemoToggle}
                    inputProps={{ "aria-label": "Interactive demo toggle" }}
                  />
                }
              />
              
              <IconButton
                onClick={onClose}
                aria-label="Close Amendments"
                size="large"
                sx={{
                  color: "text.primary",
                  "&:focus": {
                    outline: "1px dotted",
                    outlineColor: "text.primary",
                    outlineOffset: "2px"
                  },
                  "&:focus-visible": {
                    outline: "1px dotted",
                    outlineColor: "text.primary",
                    outlineOffset: "2px"
                  }
                }}
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Main Content Container */}
        <Box
          sx={(theme) => ({
            px: 4,
            pt: 2,
            pb: 0,
            ...theme.typography.body2,
            color: theme.palette.text.primary
          })}
        >
        {/* Impact Metrics - Inline */}
        <Box sx={{ mb: 3.5, display: "flex", gap: 6, alignItems: "flex-start", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
              89%
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
              Satisfaction
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
              —
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
              Conversion
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
              +67%
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
              Efficiency
            </Typography>
          </Box>
        </Box>

        {/* Executive Summary (Always Visible) */}
        <Box sx={{ mb: 3.5 }}>
          <Box sx={{ mb: 3.5 }}>
            <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
              For a change to be made to a customer's booking, the system forced the Consultant through multiple screens and manual steps for even simple amendments. Building a streamlined flow in a complex travel stack, with an offshore vendor, was tough and full of learning. Here is how we did it.
            </Typography>
          </Box>

          <Box sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 1, mb: 2 }}>
            <Typography variant="body2" sx={{ lineHeight: 1.5, m: 0, fontStyle: "italic", mb: 1 }}>
              "What used to take my entire shift now takes minutes. I finally have time to build real relationships with customers."
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              — Sarah Mitchell, Senior Consultant, Melbourne
            </Typography>
          </Box>
        </Box>

        {/* Divider before full details */}
        <Box sx={{ pt: 3, mb: 4 }}>

        {/* Discovery */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
            Discovery
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Research
            </Typography>
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 2.5,
                listStyle: "disc",
                "& > li": { mb: 1 },
                "& > li:last-of-type": { mb: 0 }
              }}
            >
              {discoveryActivities.map((activity) => (
                <Typography
                  key={activity.title}
                  component="li"
                  variant="body2"
                  sx={{ lineHeight: 1.6, color: "text.primary" }}
                >
                  {activity.description}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{
                mt: 2,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
                gap: 1.5,
                justifyContent: "start"
              }}
            >
              {discoveryActivities
                .filter((activity) => activity.artifact)
                .map((activity, index) => (
                  <Box
                    key={activity.title}
                    onClick={() => openLightbox("discovery", index)}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                      backgroundColor: "background.paper",
                      width: 180,
                      "&:hover": { boxShadow: 2 }
                    }}
                  >
                    <Box
                      component="img"
                      src={activity.artifact.src}
                      alt={activity.artifact.alt}
                      sx={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
                    />
                    <Box sx={{ px: 1.25, py: 0.75 }}>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {activity.title}
                      </Typography>
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>

          {/* Key Findings - nested subsection */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Findings
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 2
              }}
            >
              {keyFindings.map((finding, index) => {
                const FindingIcon = finding.icon;
                return (
                  <Box
                    key={finding.title}
                    sx={(theme) => ({
                      position: "relative",
                      p: 1.5,
                      borderRadius: "12px",
                      border: "1px solid",
                      borderColor: "divider",
                      backgroundColor: "background.paper"
                    })}
                  >
                    <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: "8px",
                          flexShrink: 0,
                          color: "text.secondary",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {FindingIcon ? <FindingIcon fontSize="small" /> : null}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.25, mb: 0.25 }}>
                          {finding.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.4 }}>
                          {finding.detail}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          {/* Problem Definition - nested subsection */}
          <Box sx={{ mt: 3.5 }}>
            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Problem Definition
            </Typography>
            <Box sx={bodyTextSx}>
              <Typography component="p" variant="body2" sx={{ mb: 2, color: "text.primary" }}>
                How might we help consultants complete amendments quickly and accurately with dependency checks, without jumping between systems?
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Ideation */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
            Ideation
          </Typography>
          <Box sx={bodyTextSx}>
            <Box
              component="ul"
              sx={{
                m: 0,
                pl: 2.5,
                listStyle: "disc",
                "& > li": { mb: 1 },
                "& > li:last-of-type": { mb: 0 }
              }}
            >
              <Typography component="li" variant="body2" sx={{ lineHeight: 1.6, color: "text.primary" }}>
                Design studio workshops and Crazy 8s with internal and external stakeholders produced rapid sketches and 50+ reframes to explore breadth.
              </Typography>
              <Typography component="li" variant="body2" sx={{ lineHeight: 1.6, color: "text.primary" }}>
                Competitive reviews and technology exploration benchmarked flows and assessed AI, automation, and real-time integration feasibility.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Concept Development */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
            Concept Development
          </Typography>
          <Box sx={bodyTextSx}>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>AI-powered conversational interface</strong> - Natural language amendment requests (ideal, not feasible due to technical constraints)
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>Single-page unified workflow</strong> - All amendment logic on one screen (too complex, failed usability testing)
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>Three-page guided workflow</strong> - Step-by-step validation with dependency checking (selected approach)
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>Inline flow</strong> - Changes made directly within the booking view (cluttered interface, unclear validation states)
              </Box>
              <Box component="li" sx={{ mb: 0 }}>
                <strong>Modal flow</strong> - Pop-up dialogs for each amendment (disrupted context, frustrated users)
              </Box>
              <Box component="li" sx={{ mb: 0, mt: 1.5 }}>
                <strong>Codegen-led solutions (not used)</strong> - Technical and financial impacts and risks assessed; UX unsatisfactory.
              </Box>
            </Box>
            <Box sx={{
              p: "14px 18px",
              background: "#d4edda",
              borderRadius: "4px",
              mt: 2
            }}>
              <Typography component="p" variant="inherit" sx={{ m: 0, color: "#155724" }}>
                <strong>Chosen concept:</strong> Three-page guided workflow with dependency validation.
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Prototyping */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
            Prototyping
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Wireframes
            </Typography>
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
              gap: 1.5,
              mt: 2,
              mb: 0,
              justifyContent: "start"
            }}>
              {wireframeImages.map((image, index) => (
                <Box
                  key={index}
                  onClick={() => openLightbox('wireframes', index)}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    backgroundColor: "background.paper",
                    width: 180,
                    "&:hover": { boxShadow: 2 }
                  }}
                >
                  <Box
                    component="img"
                    src={image.src} 
                    alt={image.alt}
                    sx={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                  <Box sx={{ px: 1.25, py: 0.75 }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {image.alt}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Hi-Fidelity Prototypes
            </Typography>
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
              gap: 1.5,
              mt: 2,
              mb: 0,
              justifyContent: "start"
            }}>
              <Box
                onClick={() => openLightbox('hifi', 0)}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: "background.paper",
                  width: 180,
                  "&:hover": { boxShadow: 2 }
                }}
              >
                <Box
                  component="img"
                  src="/images/amendments/amendments-hifi.png"
                  alt="Hi-fidelity prototypes"
                  sx={{
                    width: "100%",
                    height: 120,
                    objectFit: "cover",
                    display: "block"
                  }}
                />
                <Box sx={{ px: 1.25, py: 0.75 }}>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Hi-fidelity prototypes
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ mb: 0 }}>
            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Usability Testing
            </Typography>
            <Box sx={bodyTextSx}>
            <Typography component="p" variant="inherit" sx={{ mb: 2 }}>
              I conducted moderated usability testing with consultants across experience levels:
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>Task-based testing</strong> - 15 common amendment scenarios tested with 24 consultants
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>Think-aloud protocols</strong> - Identified confusion points and mental model mismatches
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>A/B testing</strong> - Compared new workflow against legacy system for time and accuracy
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>Edge case validation</strong> - Tested complex multi-component amendments (e.g., date change + hotel swap)
              </Box>
              <Box component="li" sx={{ mb: 0 }}>
                <strong>Accessibility audit</strong> - Keyboard navigation, screen reader compatibility, color contrast
              </Box>
            </Box>
            <Box sx={{
              p: "14px 18px",
              background: "#d4edda",
              borderRadius: "4px",
              mt: 2
            }}>
              <Typography component="p" variant="inherit" sx={{ m: 0, color: "#155724" }}>
                <strong>Testing Results:</strong> 97% task success rate | 89% CSAT | Average time reduced from 8-12 min to 2-3 min
              </Typography>
            </Box>
            <Box sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 1, mt: 2 }}>
              <Typography variant="body2" sx={{ lineHeight: 1.5, m: 0, fontStyle: "italic", mb: 1 }}>
                "If this works the way it looks, amendments will take minutes, dependencies will be clear, and the risk of missed changes drops."
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                — Alex Carter, Senior Consultant, Sydney
              </Typography>
            </Box>
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
              gap: 1.5,
              mt: 2,
              mb: 0,
              justifyContent: "start"
            }}>
              {userTestingImages.map((image, index) => (
                <Box
                  key={image.src}
                  onClick={() => openLightbox('userTesting', index)}
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    backgroundColor: "background.paper",
                    width: 180,
                    "&:hover": { boxShadow: 2 }
                  }}
                >
                  <Box
                    component="img"
                    src={image.src}
                    alt={image.alt}
                    sx={{
                      width: "100%",
                      height: 120,
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                  <Box sx={{ px: 1.25, py: 0.75 }}>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {image.alt}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            </Box>
          </Box>
        </Box>

        {/* Development & Implementation */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
            Development
          </Typography>
          <Box sx={bodyTextSx}>
            <Box component="ul" sx={{ pl: 3, mb: 0 }}>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>Design handoff</strong> - Detailed specs for Codegen with flowcharts and annotated prototypes to reduce ambiguity.
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>Delivery cycles</strong> - 3-month cycles with planned checkpoints across the 5.5-hour time gap.
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <strong>Real-time collaboration</strong> - Continuous UI/UX alignment and fast adjustments during build.
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                Quality Assurance
              </Typography>
              <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                <Box component="li" sx={{ mb: 1.5 }}>
                  <strong>Comprehensive testing</strong> - Real-world scenarios validated through UAT.
                </Box>
                <Box component="li" sx={{ mb: 1.5 }}>
                  <strong>Data validation</strong> - Edge cases like past dates, sold-out inventory, and concurrent bookings.
                </Box>
                <Box component="li" sx={{ mb: 1.5 }}>
                  <strong>UAT with consultants</strong> - 2-week pilot with 50 consultants.
                </Box>
                <Box component="li" sx={{ mb: 1.5 }}>
                  <strong>Regression testing</strong> - Existing booking flows stayed stable.
                </Box>
                <Box component="li" sx={{ mb: 0 }}>
                  <strong>Iteration</strong> - Fixes tested and patched as needed.
                </Box>
              </Box>
              <Box sx={{
                p: "14px 18px",
                background: "#d1ecf1",
                borderRadius: "4px",
                mt: 2
              }}>
                <Typography component="p" variant="inherit" sx={{ m: 0, color: "#0c5460" }}>
                  <strong>Launch readiness:</strong> Zero critical bugs, 94% UAT approval, benchmarks exceeded.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                Delivery
              </Typography>
              <Typography component="p" variant="inherit" sx={{ mb: 2 }}>
                Coordinated teams and regions while keeping consultants productive during the transition:
              </Typography>
              <Box sx={{
                p: 3,
                background: "#f5f5f7",
                borderRadius: "10px",
                mb: 3
              }}>
                <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                  Delivery Approach
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Global partnership</strong> - Codegen delivered within HELiO.
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Cross-functional delivery</strong> - Engineering, design, ops, and training across time zones.
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Pilots first</strong> - Validate with select markets before global rollout.
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Training</strong> - Materials and sessions for 60+ consultants.
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Change management</strong> - Support docs and feedback loops.
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Feature toggles</strong> - Enable/disable releases safely.
                  </Box>
                  <Box component="li" sx={{ mb: 0 }}>
                    <strong>Success tracking</strong> - Adoption and efficiency monitoring.
                  </Box>
                </Box>
              </Box>
              <Box sx={{
                p: 2,
                background: "#e8f5e9",
                border: "1px solid #4caf50",
                borderRadius: "8px"
              }}>
                <Typography component="p" variant="inherit" sx={{ m: 0, color: "#2e7d32", fontWeight: 600 }}>
                  ✓ <strong>On‑time, zero downtime</strong> - Transitioned without disrupting daily operations.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Rollout */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
            Rollout
          </Typography>
          <Box sx={bodyTextSx}>
            <Box component="ul" sx={{ pl: 3, mb: 3 }}>
              <Box component="li" sx={{ mb: 0 }}>
                <strong>Progressive rollout</strong> - Shipped high-impact verticals first, then expanded in later releases from Australia to global
              </Box>
            </Box>
          </Box>

          <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
            Workflow Efficiency Measurements
          </Typography>
            <Typography component="p" variant="inherit" sx={{ ...bodySecondarySx, mb: 3 }}>
              Old vs new workflow efficiency at a glance.
            </Typography>
          
          <Box sx={{
            p: 3,
            background: "#f8f9fa",
            borderRadius: "10px",
            border: "1px solid #e0e0e0"
          }}>
            <Box sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px"
            }}>
              {/* Screens */}
              <Box sx={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                textAlign: "center"
              }}>
                <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 500 }}>
                  Screens
                </Box>
                <Box sx={{ fontSize: "26px", fontWeight: 600, color: "#1d1d1f", mb: 0.5 }}>
                  67%
                </Box>
                <Box sx={{ fontSize: "13px", color: "#34c759", fontWeight: 600 }}>
                  ↓ fewer
                </Box>
                <Box sx={{ fontSize: "12px", color: "#6e6e73", mt: 1 }}>
                  9 → 3 screens
                </Box>
              </Box>

              {/* Loading Time */}
              <Box sx={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                textAlign: "center"
              }}>
                <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 500 }}>
                  Loading time
                </Box>
                <Box sx={{ fontSize: "26px", fontWeight: 600, color: "#1d1d1f", mb: 0.5 }}>
                  69%
                </Box>
                <Box sx={{ fontSize: "13px", color: "#34c759", fontWeight: 600 }}>
                  ↓ faster
                </Box>
                <Box sx={{ fontSize: "12px", color: "#6e6e73", mt: 1 }}>
                  30s → 9s
                </Box>
              </Box>

              {/* User Actions */}
              <Box sx={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                textAlign: "center"
              }}>
                <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 500 }}>
                  User actions
                </Box>
                <Box sx={{ fontSize: "26px", fontWeight: 600, color: "#1d1d1f", mb: 0.5 }}>
                  55%
                </Box>
                <Box sx={{ fontSize: "13px", color: "#34c759", fontWeight: 600 }}>
                  ↓ fewer
                </Box>
                <Box sx={{ fontSize: "12px", color: "#6e6e73", mt: 1 }}>
                  18+ → 8-10 clicks
                </Box>
              </Box>
            </Box>

            <Box sx={{
              textAlign: "center",
              color: "text.secondary",
              fontStyle: "italic",
              mt: 2.5
            }}>
              Try the interactive demo to experience both workflows
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Post-Release Validation
            </Typography>
            <Typography component="p" variant="inherit" sx={{ ...bodySecondarySx, mb: 3 }}>
              FullStory used to validate real‑world impact post‑launch.
            </Typography>

          <Box sx={{
            p: 3,
            background: "#f8f9fa",
            borderRadius: "10px",
            border: "1px solid #e0e0e0"
          }}>
            <Typography variant="subtitle1" component="h3" sx={{ ...subsectionHeadingSx, mb: 2.5 }}>
              FullStory Analytics (First 90 Days)
            </Typography>

            <Box sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              mb: 3
            }}>
              {/* Adoption Rate */}
              <Box sx={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}>
                <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 600 }}>
                  Adoption rate
                </Box>
                <Box sx={{ fontSize: "26px", fontWeight: 700, color: "#34c759", mb: 1 }}>
                  94%
                </Box>
                <Box sx={{ ...bodyTextSx, lineHeight: 1.5 }}>
                  active within 30 days
                </Box>
              </Box>

              {/* Task Completion */}
              <Box sx={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}>
                <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 600 }}>
                  Task completion
                </Box>
                <Box sx={{ fontSize: "26px", fontWeight: 700, color: "#34c759", mb: 1 }}>
                  97%
                </Box>
                <Box sx={{ ...bodyTextSx, lineHeight: 1.5 }}>
                  error-free amendments
                </Box>
              </Box>

              {/* Average Session Time */}
              <Box sx={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}>
                <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 600 }}>
                  Avg session time
                </Box>
                <Box sx={{ fontSize: "26px", fontWeight: 700, color: "#0071e3", mb: 1 }}>
                  2.4m
                </Box>
                <Box sx={{ ...bodyTextSx, lineHeight: 1.5 }}>
                  down from 10.2m
                </Box>
              </Box>

              {/* User Satisfaction */}
              <Box sx={{
                background: "#ffffff",
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}>
                <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 600 }}>
                  Rage clicks
                </Box>
                <Box sx={{ fontSize: "26px", fontWeight: 700, color: "#34c759", mb: 1 }}>
                  -82%
                </Box>
                <Box sx={{ ...bodyTextSx, lineHeight: 1.5 }}>
                  reduction in frustrated interactions
                </Box>
              </Box>
            </Box>

            <Box sx={{
              p: 2,
              background: "#e3f2fd",
              borderRadius: "10px",
              border: "1px solid #90caf9"
            }}>
              <Typography component="p" variant="inherit" sx={{ m: 0, ...bodyTextSx, color: "#0d47a1" }}>
                <strong>FullStory insights:</strong> Amendments completed 76% faster; error‑related tickets down 88% in the first quarter.
              </Typography>
            </Box>

            <Typography component="p" variant="inherit" sx={{ mt: 2.5, mb: 0, fontStyle: "italic", color: "text.secondary" }}>
              💼 <strong>Business impact available on request</strong> — ROI, labor savings, and revenue attribution.
            </Typography>
          </Box>
          </Box>
        </Box>

        {/* Reflection */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
            Reflection
          </Typography>
          <Box sx={{
            lineHeight: 1.6,
            color: "text.primary",
            mb: 3
          }}>
            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Challenges & Learnings
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography component="p" variant="inherit" sx={{ mb: 2 }}>
                Working with Codegen across 7+ hour time zones created coordination challenges:
              </Typography>

              <Box sx={{
                p: 2,
                background: "#fff3cd",
                borderRadius: "10px",
                border: "1px solid #ffc107",
                mb: 2.5
              }}>
                <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#856404", mb: 1 }}>
                  Key Challenges
                </Typography>
                <Box component="ul" sx={{ pl: 3, mt: 1, mb: 0 }}>
                  <Box component="li" sx={{ mb: 1, color: "#856404" }}><strong>Limited domain context:</strong> Engineers lacked direct exposure to consultant workflows.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#856404" }}><strong>Bulk amendments out of scope:</strong> Group/corporate flows weren’t covered initially.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#856404" }}><strong>Stakeholder pushback:</strong> UX improvements conflicted with delivery effort.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#856404" }}><strong>Decision noise:</strong> Too many stakeholders and unclear ownership slowed progress.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#856404" }}><strong>Async gaps:</strong> 12+ hour feedback loops delayed decisions.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#856404" }}><strong>Context loss:</strong> Edge cases didn’t transfer well through docs alone.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#856404" }}><strong>Long cycles:</strong> 3‑month delivery limited iteration during build.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#856404" }}><strong>Quality trade‑offs:</strong> Timelines constrained UX refinement.</Box>
                  <Box component="li" sx={{ mb: 0, color: "#856404" }}><strong>Testing limits:</strong> Limited production‑like environments slowed validation.</Box>
                </Box>
              </Box>

              <Box sx={{
                p: 2,
                background: "#d4edda",
                borderRadius: "10px",
                border: "1px solid #c3e6cb"
              }}>
                <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#155724", mb: 1 }}>
                  What I Learned
                </Typography>
                <Box component="ul" sx={{ pl: 3, mt: 1, mb: 0 }}>
                  <Box component="li" sx={{ mb: 1, color: "#155724" }}><strong>Kick‑off alignment:</strong> Early workshops prevented months of rework.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#155724" }}><strong>Visual specs win:</strong> Flowcharts and annotated screenshots cut back‑and‑forth by 60%.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#155724" }}><strong>Video walkthroughs:</strong> Short Looms beat long documents.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#155724" }}><strong>Overlap windows:</strong> Small time‑shift enabled real‑time decisions.</Box>
                  <Box component="li" sx={{ mb: 1, color: "#155724" }}><strong>Reliability builds trust:</strong> Consistent cadence reduced uncertainty.</Box>
                  <Box component="li" sx={{ mb: 0, color: "#155724" }}><strong>Embrace constraints:</strong> Limits led to simpler, maintainable solutions.</Box>
                </Box>
              </Box>
            </Box>
            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Dream vs Reality
            </Typography>
            <Typography component="p" variant="inherit" sx={{ mb: 2 }}>
              The ideal solution was an AI “Dream Flow” where consultants describe the change in plain language and the system handles the rest.
            </Typography>
            
            <Box component="ul" sx={{ pl: 3, mb: 2 }}>
              <Box component="li" sx={{ mb: 1 }}>Interpret intent and recommend best options</Box>
              <Box component="li" sx={{ mb: 1 }}>Validate dependencies across flights, hotels, transfers, and activities</Box>
              <Box component="li" sx={{ mb: 1 }}>Show live pricing and availability</Box>
              <Box component="li" sx={{ mb: 1 }}>Auto-check business rules and compliance</Box>
              <Box component="li" sx={{ mb: 0 }}>Complete the amendment in one conversational flow</Box>
            </Box>

            <Box sx={{
              mt: 2,
              p: 2,
              background: "#fff3cd",
              borderRadius: "10px",
              border: "1px solid #ffc107"
            }}>
              <Typography component="p" variant="inherit" sx={{ m: 0, fontWeight: 600, color: "#856404" }}>
                Why we couldn’t build this (2019–2020):
              </Typography>
              <Box component="ul" sx={{ pl: 3, mt: 1, mb: 0 }}>
                <Box component="li" sx={{ mb: 1, color: "#856404" }}>
                  <strong>Technical constraints:</strong> Legacy systems couldn’t aggregate real-time inventory across GDS providers.
                </Box>
                <Box component="li" sx={{ mb: 1, color: "#856404" }}>
                  <strong>Data silos:</strong> Hotel, car, and activity inventory had no unified API.
                </Box>
                <Box component="li" sx={{ mb: 1, color: "#856404" }}>
                  <strong>AI limitations:</strong> NLP wasn’t production-ready for complex bookings.
                </Box>
                <Box component="li" sx={{ mb: 1, color: "#856404" }}>
                  <strong>Business risk:</strong> Commission/SLA requirements needed human validation.
                </Box>
                <Box component="li" sx={{ mb: 0, color: "#856404" }}>
                  <strong>Timeline pressure:</strong> Consultants needed relief now, not a multi‑year build.
                </Box>
              </Box>
            </Box>

            <Typography component="p" variant="inherit" sx={{ mt: 2, mb: 0, fontStyle: "italic", color: "text.secondary" }}>
              We delivered a practical three‑page workflow with 75% time savings. The Dream Flow later became the 2024 demo showing what’s now possible.
            </Typography>
          </Box>
        </Box>
          </Box>
        </Box>

        {/* Lightbox Modal */}
        <Dialog
          open={lightbox.isOpen}
          onClose={closeLightbox}
          fullScreen
          PaperProps={{
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none"
            }
          }}
          BackdropProps={{
            sx: { backgroundColor: "rgba(0, 0, 0, 0.95)" }
          }}
        >
          <DialogContent
            sx={{
              p: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onClick={closeLightbox}
          >
            <Box
              onClick={(e) => e.stopPropagation()}
              sx={{
                position: "relative",
                maxWidth: "95vw",
                maxHeight: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <IconButton
                onClick={closeLightbox}
                aria-label="Close lightbox"
                sx={{
                  position: "absolute",
                  top: "-50px",
                  right: 0,
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  width: "40px",
                  height: "40px",
                  "&:hover": { background: "rgba(255, 255, 255, 0.3)" }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              {getGalleryImages().length > 1 && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('prev');
                  }}
                  aria-label="Previous image"
                  sx={{
                    position: "absolute",
                    left: "-60px",
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    width: "50px",
                    height: "50px",
                    "&:hover": { background: "rgba(255, 255, 255, 0.3)" }
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
              )}

              <Box
                component="img"
                src={getGalleryImages()[lightbox.currentIndex].src}
                alt={getGalleryImages()[lightbox.currentIndex].alt}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "95vh",
                  objectFit: "contain",
                  borderRadius: "8px"
                }}
              />

              {getGalleryImages().length > 1 && (
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateLightbox('next');
                  }}
                  aria-label="Next image"
                  sx={{
                    position: "absolute",
                    right: "-60px",
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    width: "50px",
                    height: "50px",
                    "&:hover": { background: "rgba(255, 255, 255, 0.3)" }
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              )}

              {getGalleryImages().length > 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#ffffff",
                    fontSize: "14px",
                    background: "rgba(0, 0, 0, 0.5)",
                    px: 2,
                    py: 1,
                    borderRadius: "20px"
                  }}
                >
                  {lightbox.currentIndex + 1} / {getGalleryImages().length}
                </Box>
              )}
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AmendmentsCaseStudy;

