import React, { useState } from 'react';
import { Box, Dialog, DialogContent, FormControlLabel, IconButton, Switch, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import RuleIcon from '@mui/icons-material/Rule';
import InsightsIcon from '@mui/icons-material/Insights';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import LayersIcon from '@mui/icons-material/Layers';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const InsuranceCaseStudy = ({ onClose, onViewDemo, position, onDragStart, zIndex = 99 }) => {
  const [lightbox, setLightbox] = useState({ isOpen: false, gallery: null, currentIndex: 0 });
  const [isDemoEnabled, setIsDemoEnabled] = useState(false);

  const handleDemoToggle = (event) => {
    const checked = event.target.checked;
    setIsDemoEnabled(checked);
    if (checked) {
      onViewDemo?.();
    }
  };

  const discoveryActivities = [
    {
      title: "Remote usability testing",
      description: "Remote moderated usability testing with consultants and advisors to validate the end-to-end flow.",
      icon: GroupsIcon,
      artifact: { src: "/images/insurance/image1.png", alt: "Usability testing session notes" }
    },
    {
      title: "Usability goal",
      description: "Focused on the consultant insurance experience and key friction points in quoting and conversion.",
      icon: VisibilityIcon,
      artifact: { src: "/images/insurance/image2.png", alt: "Usability goal artifact" }
    },
    {
      title: "Participants",
      description: "5 participants across brands (3 Flight Centre AU consultants + 2 Travel Associates AU advisors).",
      icon: GroupsIcon,
      artifact: { src: "/images/insurance/image3.png", alt: "Participant summary artifact" }
    },
    {
      title: "Quote task",
      description: "Task-based testing for adding an insurance quote directly into HELiO bookings.",
      icon: AccountTreeIcon,
      artifact: { src: "/images/insurance/image4.png", alt: "Quote task artifact" }
    },
    {
      title: "Policy task",
      description: "Validated conversion from quote to policy without leaving the booking workflow.",
      icon: RuleIcon,
      artifact: { src: "/images/insurance/image5.png", alt: "Policy conversion artifact" }
    },
    {
      title: "Insights synthesis",
      description: "Captured usability gains and click reduction outcomes from the pilot.",
      icon: InsightsIcon,
      artifact: { src: "/images/insurance/image6.png", alt: "Insights synthesis artifact" }
    }
  ];

  const keyFindings = [
    {
      title: "Separate system",
      detail: "Insurance quoting lived in a different platform with re-login required",
      icon: AccountTreeIcon
    },
    {
      title: "Manual calculations",
      detail: "Consultants calculated premiums manually based on trip details",
      icon: ErrorOutlineIcon
    },
    {
      title: "Duplicate data entry",
      detail: "Customer details were entered twice across platforms",
      icon: LayersIcon
    },
    {
      title: "Lengthy process",
      detail: "5-8 minutes to add insurance to a booking",
      icon: TouchAppIcon
    },
    {
      title: "Low attachment rates",
      detail: "Complexity discouraged consultants from offering coverage",
      icon: ThumbDownIcon
    },
    {
      title: "Lost revenue",
      detail: "Missed insurance opportunities on 60% of eligible bookings",
      icon: SentimentDissatisfiedIcon
    }
  ];

  const discoveryImages = discoveryActivities
    .filter((activity) => activity.artifact)
    .map((activity) => activity.artifact);

  const wireframeImages = [];
  const hifiImages = [];
  const userTestingImages = [];

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
    if (!currentGallery.length) return;
    let newIndex = lightbox.currentIndex;

    if (direction === 'next') {
      newIndex = (lightbox.currentIndex + 1) % currentGallery.length;
    } else {
      newIndex = (lightbox.currentIndex - 1 + currentGallery.length) % currentGallery.length;
    }

    setLightbox({ ...lightbox, currentIndex: newIndex });
  };

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

  const galleryImages = lightbox.isOpen ? getGalleryImages() : [];

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
      <Box
        sx={(theme) => ({
          flex: 1,
          overflow: "auto",
          p: 0,
          fontFamily: theme.typography.fontFamily,
          WebkitFontSmoothing: "antialiased",
          position: "relative"
        })}
      >
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
                  Travel insurance integration
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
                aria-label="Close Insurance"
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

        <Box
          sx={(theme) => ({
            px: 4,
            pt: 2,
            pb: 0,
            ...theme.typography.body2,
            color: theme.palette.text.primary
          })}
        >
          <Box sx={{ mb: 3.5, display: "flex", gap: 6, alignItems: "flex-start", flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
                +45%
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                Attachment Rate
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
                90%
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                Time Saved
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "success.main" }}>
                $2.4M
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                Annual Revenue
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3.5 }}>
            <Box sx={{ mb: 2.5 }}>
              <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.7 }}>
                Pilot project for a new booking platform. We integrated travel insurance directly into the booking flow to streamline quoting and lift attachment rates.
              </Typography>
              <Box sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 1 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  Objective & Key Result
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.75 }}>
                  Streamline insurance quoting and increase attachment rates through an integrated workflow.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 1 }}>
              <Typography variant="body2" sx={{ lineHeight: 1.5, m: 0, fontStyle: "italic", mb: 1 }}>
                "The fact that I don't have to do 27 clicks to load this into the quote is a win. This would make a lot of people in retail very happy!"
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                — Flight Centre consultant, usability testing
              </Typography>
            </Box>
          </Box>

          <Box sx={{ pt: 3, mb: 4 }}>
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
                  {keyFindings.map((finding) => {
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

              <Box sx={{ mt: 3.5 }}>
                <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                  Problem Definition
                </Typography>
                <Box sx={bodyTextSx}>
                  <Typography component="p" variant="body2" sx={{ mb: 2, color: "text.primary" }}>
                    How might we embed insurance quoting into the booking workflow so consultants can add coverage in under a minute, without context switching or manual calculations?
                  </Typography>
                </Box>
              </Box>
            </Box>

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
                    Explored inline quote panels versus modal handoffs to keep consultants in the booking context.
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ lineHeight: 1.6, color: "text.primary" }}>
                    Mapped data dependencies to pre-fill customer details and reduce re-entry effort.
                  </Typography>
                  <Typography component="li" variant="body2" sx={{ lineHeight: 1.6, color: "text.primary" }}>
                    Partnered with the insurance API team to validate real-time pricing and policy conversion steps.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
                Concept Development
              </Typography>
              <Box sx={bodyTextSx}>
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Integrated quoting</strong> - Insurance options displayed within the booking screen
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Auto-calculated premiums</strong> - Real-time pricing based on trip details
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Smart recommendations</strong> - Suggested coverage tiers aligned to traveler profiles
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>One-click add</strong> - Add insurance to booking in a single step
                  </Box>
                  <Box component="li" sx={{ mb: 0 }}>
                    <strong>Pre-populated forms</strong> - Customer details auto-filled from booking data
                  </Box>
                </Box>
                <Typography component="p" variant="inherit" sx={{ mb: 0 }}>
                  Result: reduced insurance addition time from 5-8 minutes to 30 seconds while lifting attachment rates by 45%.
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
                Prototyping
              </Typography>
              <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                Wireframes
              </Typography>
              <Box sx={{ lineHeight: 1.6, color: "text.primary", mb: 3 }}>
                <Typography component="p" variant="inherit" sx={{ mb: 2 }}>
                  Early layout iterations focused on keeping quoting, pricing, and policy conversion in a single continuous flow.
                </Typography>
                {wireframeImages.length ? (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
                      gap: 1.5,
                      mt: 2,
                      mb: 0,
                      justifyContent: "start"
                    }}
                  >
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
                          sx={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
                        />
                        <Box sx={{ px: 1.25, py: 0.75 }}>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {image.alt}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Wireframe artifacts available on request.
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                Hi-Fidelity Prototypes
              </Typography>
              <Box sx={{ lineHeight: 1.6, color: "text.primary", mb: 3 }}>
                {hifiImages.length ? (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
                      gap: 1.5,
                      mt: 2,
                      mb: 0,
                      justifyContent: "start"
                    }}
                  >
                    {hifiImages.map((image, index) => (
                      <Box
                        key={image.src}
                        onClick={() => openLightbox('hifi', index)}
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
                          sx={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
                        />
                        <Box sx={{ px: 1.25, py: 0.75 }}>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {image.alt}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    High-fidelity prototypes available on request.
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                Usability Testing
              </Typography>
              <Box sx={bodyTextSx}>
                <Typography component="p" variant="inherit" sx={{ mb: 2 }}>
                  Moderated usability testing with 5 consultants/advisors validated the integrated insurance experience.
                </Typography>
                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Methodology</strong> - Remote moderated usability testing
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>Key tasks</strong> - Add insurance quote to HELiO booking, convert quote to policy
                  </Box>
                  <Box component="li" sx={{ mb: 0 }}>
                    <strong>Participants</strong> - 3 Flight Centre AU consultants + 2 Travel Associates AU advisors
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: 2,
                    mb: 2
                  }}
                >
                  <Box sx={{ p: 2, background: "#e8f5e9", borderRadius: 1, border: "1px solid #4caf50" }}>
                    <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: 700 }}>
                      58%
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#2e7d32" }}>
                      Improved usability score (UMUX 27% → 90%)
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, background: "#e3f2fd", borderRadius: 1, border: "1px solid #2196f3" }}>
                    <Typography variant="h5" sx={{ color: "#1565c0", fontWeight: 700 }}>
                      233%
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#1565c0" }}>
                      Reduction in clicks (28-36 → 16)
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ p: 2, backgroundColor: "action.hover", borderRadius: 1, mt: 2 }}>
                  <Typography variant="body2" sx={{ lineHeight: 1.5, m: 0, fontStyle: "italic", mb: 1 }}>
                    "100% I would use the insurance flow. I think it's a very good addition and it will increase our productivity and sales."
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    — Travel Associates advisor, usability testing
                  </Typography>
                </Box>
                {userTestingImages.length ? (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 180px))",
                      gap: 1.5,
                      mt: 2,
                      mb: 0,
                      justifyContent: "start"
                    }}
                  >
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
                          sx={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
                        />
                        <Box sx={{ px: 1.25, py: 0.75 }}>
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            {image.alt}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : null}
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
                Development
              </Typography>
              <Box sx={bodyTextSx}>
                <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>In-house delivery</strong> - Led Flight Centre's internal agile team to build the integration
                  </Box>
                  <Box component="li" sx={{ mb: 1.5 }}>
                    <strong>API integration</strong> - Worked with EA's API team to enable real-time quoting and conversion
                  </Box>
                  <Box component="li" sx={{ mb: 0 }}>
                    <strong>Training rollout</strong> - Created materials and ran training for consultants
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                    Quality Assurance
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                    <Box component="li" sx={{ mb: 1.5 }}>
                      <strong>Compliance validation</strong> - Ensured regulatory requirements were met across markets
                    </Box>
                    <Box component="li" sx={{ mb: 1.5 }}>
                      <strong>Pilot testing</strong> - Controlled pilot with select consultants to validate usability and stability
                    </Box>
                    <Box component="li" sx={{ mb: 0 }}>
                      <strong>Performance monitoring</strong> - Tracked attachment rates and system stability post-launch
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      p: "14px 18px",
                      background: "#d1ecf1",
                      borderRadius: "4px",
                      mt: 2
                    }}
                  >
                    <Typography component="p" variant="inherit" sx={{ m: 0, color: "#0c5460" }}>
                      <strong>Launch readiness:</strong> Pilot stability confirmed | Compliance checks passed | Training completion above 95%
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                    Delivery
                  </Typography>
                  <Typography component="p" variant="inherit" sx={{ mb: 2 }}>
                    Integrating insurance into the booking platform required close coordination with external partners and internal stakeholders.
                  </Typography>

                  <Box sx={{ p: 3, background: "#f5f5f7", borderRadius: "10px", mb: 3 }}>
                    <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                      Delivery Approach
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                      <Box component="li" sx={{ mb: 1.5 }}>
                        <strong>In-house development</strong> - Led Flight Centre's internal agile team
                      </Box>
                      <Box component="li" sx={{ mb: 1.5 }}>
                        <strong>Platform pilot</strong> - Used as a pilot project for the new booking platform
                      </Box>
                      <Box component="li" sx={{ mb: 1.5 }}>
                        <strong>API integration</strong> - Partnered with EA insurance API team
                      </Box>
                      <Box component="li" sx={{ mb: 1.5 }}>
                        <strong>Compliance validation</strong> - Ensured regulatory requirements across markets
                      </Box>
                      <Box component="li" sx={{ mb: 1.5 }}>
                        <strong>Pilot testing</strong> - Controlled pilot with select consultants
                      </Box>
                      <Box component="li" sx={{ mb: 1.5 }}>
                        <strong>Training rollout</strong> - Training materials and sessions for consultants
                      </Box>
                      <Box component="li" sx={{ mb: 0 }}>
                        <strong>Performance monitoring</strong> - Tracked attachment rates and stability post-launch
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      background: "#e8f5e9",
                      border: "1px solid #4caf50",
                      borderRadius: "8px"
                    }}
                  >
                    <Typography component="p" variant="inherit" sx={{ m: 0, color: "#2e7d32", fontWeight: 600 }}>
                      ✓ <strong>Launched successfully in July 2024</strong> — Seamless integration with immediate revenue impact
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
                Rollout
              </Typography>
              <Box sx={bodyTextSx}>
                <Box component="ul" sx={{ pl: 3, mb: 0 }}>
                  <Box component="li" sx={{ mb: 0 }}>
                    <strong>July 2024 launch</strong> - Rolled out from pilot consultants to broader teams with ongoing monitoring
                  </Box>
                </Box>
              </Box>

            <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
              Workflow Efficiency Measurements
            </Typography>
            <Typography component="p" variant="inherit" sx={{ ...bodySecondarySx, mb: 3 }}>
              Technical breakdown of workflow improvements between old and new flows
            </Typography>

            <Box
              sx={{
                p: 3,
                background: "#f8f9fa",
                borderRadius: "10px",
                border: "1px solid #e0e0e0"
              }}
            >
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
                <Box
                  sx={{
                    background: "#ffffff",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #e0e0e0",
                    textAlign: "center"
                  }}
                >
                  <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 500 }}>
                    Context Switching
                  </Box>
                  <Box sx={{ fontSize: "26px", fontWeight: 600, color: "#1d1d1f", mb: 0.5 }}>
                    100%
                  </Box>
                  <Box sx={{ fontSize: "13px", color: "#34c759", fontWeight: 600 }}>
                    ↓ eliminated
                  </Box>
                  <Box sx={{ fontSize: "12px", color: "#6e6e73", mt: 1 }}>
                    2 systems → 1
                  </Box>
                </Box>

                <Box
                  sx={{
                    background: "#ffffff",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #e0e0e0",
                    textAlign: "center"
                  }}
                >
                  <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 500 }}>
                    Process Time
                  </Box>
                  <Box sx={{ fontSize: "26px", fontWeight: 600, color: "#1d1d1f", mb: 0.5 }}>
                    90%
                  </Box>
                  <Box sx={{ fontSize: "13px", color: "#34c759", fontWeight: 600 }}>
                    ↓ faster
                  </Box>
                  <Box sx={{ fontSize: "12px", color: "#6e6e73", mt: 1 }}>
                    5-8m → 30s
                  </Box>
                </Box>

                <Box
                  sx={{
                    background: "#ffffff",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "1px solid #e0e0e0",
                    textAlign: "center"
                  }}
                >
                  <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 500 }}>
                    User Actions
                  </Box>
                  <Box sx={{ fontSize: "26px", fontWeight: 600, color: "#1d1d1f", mb: 0.5 }}>
                    233%
                  </Box>
                  <Box sx={{ fontSize: "13px", color: "#34c759", fontWeight: 600 }}>
                    ↓ fewer
                  </Box>
                  <Box sx={{ fontSize: "12px", color: "#6e6e73", mt: 1 }}>
                    28-36 → 16 clicks
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  textAlign: "center",
                  color: "text.secondary",
                  fontStyle: "italic",
                  mt: 2.5
                }}
              >
                Try the interactive demo to experience both workflows
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                Post-Release Validation
              </Typography>
              <Typography component="p" variant="inherit" sx={{ ...bodySecondarySx, mb: 3 }}>
                Business impact and adoption signals tracked after rollout
              </Typography>

              <Box sx={{ p: 3, background: "#f8f9fa", borderRadius: "10px", border: "1px solid #e0e0e0" }}>
                <Typography variant="subtitle1" component="h3" sx={{ ...subsectionHeadingSx, mb: 2.5 }}>
                  Early Impact Signals
                </Typography>

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", mb: 3 }}>
                  <Box sx={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e0e0e0" }}>
                    <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 600 }}>
                      Attachment Rate
                    </Box>
                    <Box sx={{ fontSize: "26px", fontWeight: 700, color: "#34c759", mb: 1 }}>
                      +45%
                    </Box>
                    <Box sx={{ ...bodyTextSx, lineHeight: 1.5 }}>
                      increase in insurance attachment after launch
                    </Box>
                  </Box>

                  <Box sx={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e0e0e0" }}>
                    <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 600 }}>
                      Time to Add Insurance
                    </Box>
                    <Box sx={{ fontSize: "26px", fontWeight: 700, color: "#34c759", mb: 1 }}>
                      30s
                    </Box>
                    <Box sx={{ ...bodyTextSx, lineHeight: 1.5 }}>
                      average time to add coverage (down from 5-8 minutes)
                    </Box>
                  </Box>

                  <Box sx={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e0e0e0" }}>
                    <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 600 }}>
                      Revenue Lift
                    </Box>
                    <Box sx={{ fontSize: "26px", fontWeight: 700, color: "#0071e3", mb: 1 }}>
                      $2.4M
                    </Box>
                    <Box sx={{ ...bodyTextSx, lineHeight: 1.5 }}>
                      additional annual revenue from improved attachment
                    </Box>
                  </Box>

                  <Box sx={{ background: "#ffffff", padding: "14px", borderRadius: "10px", border: "1px solid #e0e0e0" }}>
                    <Box sx={{ fontSize: "13px", color: "#6e6e73", mb: 1, fontWeight: 600 }}>
                      Compliance Risk
                    </Box>
                    <Box sx={{ fontSize: "26px", fontWeight: 700, color: "#34c759", mb: 1 }}>
                      ↓ lower
                    </Box>
                    <Box sx={{ ...bodyTextSx, lineHeight: 1.5 }}>
                      consistent insurance offering and audit-ready records
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ p: 2, background: "#e3f2fd", borderRadius: "10px", border: "1px solid #90caf9" }}>
                  <Typography component="p" variant="inherit" sx={{ m: 0, ...bodyTextSx, color: "#0d47a1" }}>
                    <strong>Business impact:</strong> Improved consultant efficiency, stronger compliance posture, and new revenue unlocked in the first quarter post-launch.
                  </Typography>
                </Box>
              </Box>
            </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={sectionHeadingSx}>
                Reflection
              </Typography>
              <Box sx={{ lineHeight: 1.6, color: "text.primary", mb: 3 }}>
                <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                  Challenges & Learnings
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography component="p" variant="inherit" sx={{ mb: 2 }}>
                    Building the pilot surfaced a few key learnings that shaped subsequent phases:
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      background: "#fff3cd",
                      borderRadius: "10px",
                      border: "1px solid #ffc107",
                      mb: 2.5
                    }}
                  >
                    <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#856404", mb: 1 }}>
                      Key Challenges
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mt: 1, mb: 0 }}>
                      <Box component="li" sx={{ mb: 1, color: "#856404" }}>
                        <strong>Regulatory complexity:</strong> Coverage rules varied by market, requiring additional validation logic
                      </Box>
                      <Box component="li" sx={{ mb: 0, color: "#856404" }}>
                        <strong>API dependencies:</strong> Tight coupling with partner APIs required careful staging and fallback handling
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      background: "#d4edda",
                      borderRadius: "10px",
                      border: "1px solid #c3e6cb"
                    }}
                  >
                    <Typography sx={{ fontSize: "12px", fontWeight: 600, color: "#155724", mb: 1 }}>
                      What I Learned
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, mt: 1, mb: 0 }}>
                      <Box component="li" sx={{ mb: 1, color: "#155724" }}>
                        <strong>Align with compliance early:</strong> Early validation reduced rework and approval cycles
                      </Box>
                      <Box component="li" sx={{ mb: 0, color: "#155724" }}>
                        <strong>Prototype with real data:</strong> Real booking scenarios revealed edge cases faster than mock data
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Typography variant="subtitle1" component="h3" sx={subsectionHeadingSx}>
                  Dream vs Reality
                </Typography>
                <Typography component="p" variant="inherit" sx={{ mb: 2 }}>
                  The ideal vision was a fully personalized coverage assistant that recommended the right plan automatically. We shipped the highest-impact,
                  feasible version for the pilot timeline.
                </Typography>

                <Box component="ul" sx={{ pl: 3, mb: 2 }}>
                  <Box component="li" sx={{ mb: 1 }}>Instant coverage recommendations based on trip, traveler, and policy rules</Box>
                  <Box component="li" sx={{ mb: 1 }}>Auto-approval for low-risk policies to reduce consultant workload</Box>
                  <Box component="li" sx={{ mb: 1 }}>Real-time compliance checks across markets</Box>
                  <Box component="li" sx={{ mb: 0 }}>One-step policy conversion with no extra data entry</Box>
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    background: "#fff3cd",
                    borderRadius: "10px",
                    border: "1px solid #ffc107"
                  }}
                >
                  <Typography component="p" variant="inherit" sx={{ m: 0, fontWeight: 600, color: "#856404" }}>
                    Why we phased the dream:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3, mt: 1, mb: 0 }}>
                    <Box component="li" sx={{ mb: 1, color: "#856404" }}>
                      <strong>Regulatory constraints:</strong> Requirements varied across markets and insurers
                    </Box>
                    <Box component="li" sx={{ mb: 1, color: "#856404" }}>
                      <strong>API maturity:</strong> Real-time pricing endpoints required staged rollout
                    </Box>
                    <Box component="li" sx={{ mb: 0, color: "#856404" }}>
                      <strong>Pilot timeline:</strong> Delivered the integrated flow first to prove impact and adoption
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

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
            {galleryImages.length ? (
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

                {galleryImages.length > 1 && (
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
                  src={galleryImages[lightbox.currentIndex].src}
                  alt={galleryImages[lightbox.currentIndex].alt}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "95vh",
                    objectFit: "contain",
                    borderRadius: "8px"
                  }}
                />

                {galleryImages.length > 1 && (
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

                {galleryImages.length > 1 && (
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
                    {lightbox.currentIndex + 1} / {galleryImages.length}
                  </Box>
                )}
              </Box>
            ) : null}
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
};

export default InsuranceCaseStudy;

