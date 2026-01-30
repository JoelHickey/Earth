import React, { useState } from 'react';
import {
  Box as MuiBox,
  FormControl as MuiFormControl,
  FormControlLabel as MuiFormControlLabel,
  IconButton as MuiIconButton,
  Chip as MuiChip,
  InputLabel as MuiInputLabel,
  MenuItem,
  Select as MuiSelect,
  Switch as MuiSwitch,
  Tab as MuiTab,
  Tabs as MuiTabs,
  Typography as MuiTypography,
  GlobalStyles
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const HEX_REGEX = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;

const hexToRgb = (hex) => {
  const normalized = hex.replace('#', '');
  const value = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;
  const intValue = parseInt(value, 16);
  return {
    r: (intValue >> 16) & 255,
    g: (intValue >> 8) & 255,
    b: intValue & 255
  };
};

const rgbToHsl = ({ r, g, b }) => {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const lightness = (max + min) / 2;
  if (delta === 0) {
    return { h: 0, s: 0, l: lightness };
  }
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue = 0;
  switch (max) {
    case rn:
      hue = (gn - bn) / delta + (gn < bn ? 6 : 0);
      break;
    case gn:
      hue = (bn - rn) / delta + 2;
      break;
    default:
      hue = (rn - gn) / delta + 4;
  }
  hue *= 60;
  return { h: hue, s: saturation, l: lightness };
};

const mapHexToToken = (hex, theme) => {
  const lower = hex.toLowerCase();
  const map = {
    '#1d1d1f': theme.palette.text.primary,
    '#000000': theme.palette.text.primary,
    '#6e6e73': theme.palette.text.secondary,
    '#86868b': theme.palette.text.secondary,
    '#d1d1d6': theme.palette.divider,
    '#e0e0e0': theme.palette.divider,
    '#d0d0d0': theme.palette.divider,
    '#c0c0c0': theme.palette.divider,
    '#f5f5f7': theme.palette.background.default,
    '#fafafa': theme.palette.background.default,
    '#f7f7f7': theme.palette.background.default,
    '#f2f2f2': theme.palette.background.default,
    '#f0f0f0': theme.palette.background.default,
    '#f9f9fb': theme.palette.background.default,
    '#e3f2fd': theme.palette.background.default,
    '#f3e5f5': theme.palette.background.default,
    '#fff3cd': theme.palette.background.default,
    '#fff8e1': theme.palette.background.default,
    '#ffffff': theme.palette.background.paper,
    '#667eea': theme.palette.primary.main,
    '#5566d9': theme.palette.primary.dark,
    '#34c759': theme.palette.success.main,
    '#ff9500': theme.palette.warning.main,
    '#ff3b30': theme.palette.error.main,
    '#f0f4ff': alpha(theme.palette.primary.main, 0.12)
  };
  if (map[lower]) {
    return map[lower];
  }
  const rgb = hexToRgb(lower);
  const { h, s, l } = rgbToHsl(rgb);
  if (s < 0.08) {
    const greys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    const index = Math.min(greys.length - 1, Math.max(0, Math.round((1 - l) * 9)));
    return theme.palette.grey[greys[index]];
  }
  if (h < 25 || h >= 330) {
    return theme.palette.error.main;
  }
  if (h < 70) {
    return theme.palette.warning.main;
  }
  if (h < 160) {
    return theme.palette.success.main;
  }
  if (h < 260) {
    return theme.palette.info.main;
  }
  return theme.palette.primary.main;
};

const replaceRgba = (value, theme) => {
  return value.replace(/rgba?\(([^)]+)\)/gi, (match, contents) => {
    const parts = contents.split(',').map((part) => part.trim());
    if (parts.length < 3) {
      return match;
    }
    const r = Number(parts[0]);
    const g = Number(parts[1]);
    const b = Number(parts[2]);
    const a = parts.length === 4 ? Number(parts[3]) : 1;
    if ([r, g, b].some((channel) => Number.isNaN(channel))) {
      return match;
    }
    const isWhite = r === 255 && g === 255 && b === 255;
    const isBlack = r === 0 && g === 0 && b === 0;
    if (isWhite) {
      return alpha(theme.palette.common.white, a);
    }
    if (isBlack) {
      return alpha(theme.palette.common.black, a);
    }
    const mapped = mapHexToToken(
      `#${[r, g, b]
        .map((channel) => channel.toString(16).padStart(2, '0'))
        .join('')}`,
      theme
    );
    return alpha(mapped, a);
  });
};

const replaceColors = (value, theme) => {
  if (typeof value !== 'string') {
    return value;
  }
  const withHex = value.replace(HEX_REGEX, (match) => mapHexToToken(match, theme));
  return replaceRgba(withHex, theme);
};

const mapSx = (sx, theme) => {
  if (!sx) {
    return sx;
  }
  if (typeof sx === 'function') {
    return mapSx(sx(theme), theme);
  }
  if (Array.isArray(sx)) {
    return sx.map((entry) => mapSx(entry, theme));
  }
  if (typeof sx !== 'object') {
    return replaceColors(sx, theme);
  }
  return Object.fromEntries(
    Object.entries(sx).map(([key, value]) => [key, mapSx(value, theme)])
  );
};

const withTokenSx = (Component) =>
  React.forwardRef(function TokenComponent({ sx, ...rest }, ref) {
    const theme = useTheme();
    const resolvedSx = React.useMemo(() => mapSx(sx, theme), [sx, theme]);
    return <Component ref={ref} sx={resolvedSx} {...rest} />;
  });

const Box = withTokenSx(MuiBox);
const FormControl = withTokenSx(MuiFormControl);
const Typography = withTokenSx(MuiTypography);
const IconButton = withTokenSx(MuiIconButton);
const Chip = withTokenSx(MuiChip);
const InputLabel = withTokenSx(MuiInputLabel);
const Select = withTokenSx(MuiSelect);
const Tabs = withTokenSx(MuiTabs);
const Tab = withTokenSx(MuiTab);
const FormControlLabel = withTokenSx(MuiFormControlLabel);
const Switch = withTokenSx(MuiSwitch);

const AmendmentsFlowDemo = ({ onBackToCaseStudy, onClose, position, zIndex = 99 }) => {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isAmendModalOpen, setIsAmendModalOpen] = useState(false);
  const [isTravellersModalOpen, setIsTravellersModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCartPage, setShowCartPage] = useState(false);
  const [showTravellersPage, setShowTravellersPage] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  // New Flow States
  const [showNewFlow, setShowNewFlow] = useState(false);
  const [newFlowStep, setNewFlowStep] = useState(1);
  const [showOtherHotels, setShowOtherHotels] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [selectedShell, setSelectedShell] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [hotelAmended, setHotelAmended] = useState(false);
  const [reasonForAmendment, setReasonForAmendment] = useState('');
  const [causeOfAmendment, setCauseOfAmendment] = useState('');
  const isAmendFormComplete = Boolean(reasonForAmendment) && Boolean(causeOfAmendment);
  
  // Dream Flow States
  const [showDreamFlow, setShowDreamFlow] = useState(false);
  const [dreamFlowExpanded, setDreamFlowExpanded] = useState(false);
  const [nlInput, setNlInput] = useState('');
  const [selectedPill, setSelectedPill] = useState(''); // Track which pill is clicked
  const [showDreamResults, setShowDreamResults] = useState(false);
  const [calendarStartDate, setCalendarStartDate] = useState(null); // For manual date selection
  const [calendarEndDate, setCalendarEndDate] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false); // Track confirmation state
  const [confirmingHotelIdx, setConfirmingHotelIdx] = useState(null); // Track which hotel button is confirming
  const [showPayment, setShowPayment] = useState(false); // Show payment options
  const [selectedPayment, setSelectedPayment] = useState(null); // Selected payment method
  const [undoCountdown, setUndoCountdown] = useState(null); // Countdown for undo action
  const [lastAmendment, setLastAmendment] = useState(null); // Store last amendment for undo
  const [processingStep, setProcessingStep] = useState(''); // Show processing steps
  const [showUndoConfirmation, setShowUndoConfirmation] = useState(false); // Show undo success
  const [detectedChangeType, setDetectedChangeType] = useState('room'); // AI-detected change type
  const [liveInventory, setLiveInventory] = useState({ room1: 2, room2: 5, room3: 3 }); // Live countdown
  const [secondsAgo, setSecondsAgo] = useState(2); // Timestamp counter
  const [inventoryChange, setInventoryChange] = useState({ room1: null, room2: null, room3: null }); // Track changes
  const [soldOutRooms, setSoldOutRooms] = useState({}); // Track sold out animation
  const [showBookingPerson, setShowBookingPerson] = useState(false); // Show person booking animation
  const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded for notes
  const [cardNotes, setCardNotes] = useState({}); // Store notes for each card

  const showLoadingThen = (message, callback, duration = 1500) => {
    setLoadingMessage(message);
    setShowLoadingModal(true);
    setTimeout(() => {
      callback();
      setShowLoadingModal(false);
    }, duration);
  };

  const resetOldFlow = () => {
    setIsAmendModalOpen(false);
    setIsTravellersModalOpen(false);
    setIsSearchModalOpen(false);
    setShowSearchResults(false);
    setShowCartPage(false);
    setShowTravellersPage(false);
    setShowPaymentPage(false);
    setSelectedHotel(null);
    setReasonForAmendment('');
    setCauseOfAmendment('');
    setActiveTab('itinerary');
  };

  // Live inventory countdown simulation
  React.useEffect(() => {
    if (showDreamResults && showDreamFlow) {
      const interval = setInterval(() => {
        const roomKey = ['room1', 'room2', 'room3'][Math.floor(Math.random() * 3)];
        const changeDirection = Math.random() > 0.7 ? 'up' : 'down'; // 70% down, 30% up
        
        setLiveInventory(prev => {
          const newInventory = { ...prev };
          if (changeDirection === 'down' && newInventory[roomKey] > 0) {
            newInventory[roomKey] -= 1;
            // If hit zero, trigger sold out animation
            if (newInventory[roomKey] === 0) {
              setSoldOutRooms(prevSold => ({ ...prevSold, [roomKey]: true }));
              // Remove after animation completes
              setTimeout(() => {
                setSoldOutRooms(prevSold => ({ ...prevSold, [roomKey]: false }));
              }, 1000);
            }
          } else if (changeDirection === 'up' && newInventory[roomKey] < 6) {
            newInventory[roomKey] += 1;
          }
          return newInventory;
        });
        
        // Set change indicator
        setInventoryChange({ room1: null, room2: null, room3: null, [roomKey]: changeDirection });
        
        // Clear indicator after 2 seconds
        setTimeout(() => {
          setInventoryChange({ room1: null, room2: null, room3: null });
        }, 2000);
        
        setSecondsAgo(0); // Reset timestamp when inventory changes
      }, 4000); // Every 4 seconds inventory changes (faster for visibility)
      return () => clearInterval(interval);
    }
  }, [showDreamResults, showDreamFlow]);

  // Timestamp ticker
  React.useEffect(() => {
    if (showDreamResults && showDreamFlow) {
      const ticker = setInterval(() => {
        setSecondsAgo(prev => prev + 1);
      }, 1000); // Increment every second
      return () => clearInterval(ticker);
    }
  }, [showDreamResults, showDreamFlow]);

  const tripData = {
    tripName: "Hawaii Family Vacation",
    tripNo: "FC-2026-001",
    destination: "Honolulu, Hawaii",
    startDate: "June 15, 2026",
    endDate: "June 20, 2026",
    travelers: 4,
    totalPriceAud: "A$4,250"
  };

  const reasonOptions = [
    { value: "customer_request", label: "Customer Request" },
    { value: "date_change", label: "Date Change" },
    { value: "upgrade", label: "Upgrade" },
    { value: "downgrade", label: "Downgrade" },
    { value: "pricing_error", label: "Pricing Error" },
    { value: "availability_issue", label: "Availability Issue" },
    { value: "other", label: "Other" }
  ];

  const amendmentTypeOptions = [
    { value: "date_change", label: "Date Change" },
    { value: "room_change", label: "Room/Vehicle Change" },
    { value: "passenger_change", label: "Passenger/Traveller Change" },
    { value: "cancel_component", label: "Cancel Component" },
    { value: "add_component", label: "Add Component" },
    { value: "pricing_adjustment", label: "Pricing Adjustment" },
    { value: "other", label: "Other" }
  ];

  const getOptionLabel = (options, value) => {
    return options.find((option) => option.value === value)?.label || "";
  };

  const shells = [
    {
      id: 1,
      type: 'Hotel',
      name: hotelAmended && selectedHotel ? selectedHotel.name : 'Royal Hawaiian Resort',
      icon: '🏨',
      dates: 'May 15-20, 2024',
      status: hotelAmended ? 'Updated' : 'Confirmed',
      price: hotelAmended && selectedHotel ? `$${parseInt(selectedHotel.price.replace('$', '')) * 5}` : '$2,450',
      room: {
        current: 'Standard King',
        features: ['City View', 'Queen Bed'],
        pricePerNight: 450
      }
    },
    {
      id: 2,
      type: 'Car Rental',
      name: 'Enterprise - Full Size SUV',
      icon: '🚗',
      dates: 'May 15-20, 2024',
      status: 'Confirmed',
      price: '$380'
    },
    {
      id: 3,
      type: 'Activity',
      name: 'Pearl Harbor Tour',
      icon: '🎯',
      dates: 'May 17, 2024',
      status: 'Pending',
      price: '$240'
    }
  ];

  const fallbackPosition = position || {
    x: typeof window !== 'undefined' ? Math.max(0, (window.innerWidth - 1000) / 2) : 50,
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 700) / 2) : 100
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
        overflow: "hidden",
        fontFamily: theme.typography.fontFamily,
        WebkitFontSmoothing: "antialiased"
      })}
    >
      {/* Header Bar */}
      <Box
        sx={{
          px: 3,
          py: 1.5,
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "background.paper"
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              m: 0,
            fontWeight: 600,
              letterSpacing: "0.02em",
              color: "text.primary"
            }}
          >
            Streamlining amendments
          </Typography>
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
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                checked
                onChange={(event) => {
                  if (!event.target.checked) {
                    onBackToCaseStudy();
                  }
                }}
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



      {/* Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Trip Summary - Static Section */}
        <Box sx={{ px: 3, pt: 2, pb: 1.5, background: "background.paper", borderBottom: "1px solid", borderColor: "divider" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1.5 }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.25, color: "text.primary" }}>
                {tripData.tripName}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Trip #{tripData.tripNo} · 📍 {tripData.destination} · 📅 Jun 15–20, 2026 · {tripData.travelers} travelers
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right", whiteSpace: "nowrap" }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary", fontWeight: 700 }}>
                {tripData.totalPriceAud}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Tab Navigation - Apple Compact */}
        {!showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && !showNewFlow && !showDreamFlow && (
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            sx={{
              borderBottom: "1px solid #d0d0d0",
              background: "#f0f0f0",
              minHeight: "auto",
              "& .MuiTab-root": {
                minHeight: "auto",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: 400,
                color: "#6e6e73",
                textTransform: "capitalize"
              },
              "& .Mui-selected": {
                color: "#1d1d1f",
                fontWeight: 600,
                background: "#ffffff"
              }
            }}
            TabIndicatorProps={{
              sx: { backgroundColor: "#0071e3", height: "2px" }
            }}
          >
            {['itinerary', 'documents', 'payments', 'notes', 'history'].map(tab => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>
        )}

        {/* Tab Content - Shells Below */}
        {activeTab === 'itinerary' && !showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && !showNewFlow && (
          <Box sx={{ flex: 1, overflow: showOnboarding ? "visible" : "auto", p: 2, background: "#fafafa" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
              {shells.map(shell => (
                <Box
                  key={shell.id}
                  sx={{
                    p: "8px 10px",
                    backgroundColor: "background.paper",
                    border: showDreamFlow && selectedShell && selectedShell.id === shell.id ? "2px solid #fa709a" : "1px solid #d0d0d0",
                    borderRadius: "8px",
                    position: "relative",
                    zIndex: shell.id === 1 && showOnboarding ? 10 : "auto",
                    transition: "all 0.3s ease"
                  }}
                >
                  {/* Shell Header Row - Always Horizontal */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <Box sx={{ fontSize: "18px" }}>{shell.icon}</Box>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary", mb: 0.25 }}>
                          {shell.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                          {shell.type === 'Hotel' ? (
                            <>
                              {shell.dates}
                              <Box component="span" sx={{ color: "#86868b" }}> · Standard King · $450/night</Box>
                            </>
                          ) : (
                            <>{shell.type} · {shell.dates}</>
                          )}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <Box sx={{ textAlign: "right" }}>
                        <Chip
                          label={shell.status}
                          size="small"
                          sx={(theme) => ({
                            mb: "2px",
                            height: theme.spacing(2.5),
                            fontSize: "11px",
                            fontWeight: 600,
                            backgroundColor: shell.status === "Confirmed"
                              ? alpha(theme.palette.success.main, 0.16)
                              : alpha(theme.palette.warning.main, 0.16),
                            color: shell.status === "Confirmed" ? theme.palette.success.dark : theme.palette.warning.dark,
                            "& .MuiChip-label": {
                              px: 0.75,
                              color: "inherit",
                              WebkitTextFillColor: "inherit"
                            }
                          })}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                          {shell.price}
                        </Typography>
                      </Box>
                      <Box sx={{ position: "relative" }}>
                        {/* Onboarding Tooltip - Only on first shell */}
                        {shell.id === 1 && showOnboarding && (
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: "calc(100% + 8px)",
                              right: "-8px",
                              background: "rgba(0, 0, 0, 0.85)",
                              color: "#ffffff",
                              p: "6px 8px",
                              borderRadius: "6px",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                              zIndex: 1000,
                              fontSize: "11px",
                              fontWeight: 500,
                              lineHeight: 1.4,
                              animation: "pulse 2s infinite",
                              whiteSpace: "nowrap"
                            }}
                          >
                            👋 Click here to try the old or new flow
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: "-4px",
                                right: "16px",
                                width: "8px",
                                height: "8px",
                                background: "rgba(0, 0, 0, 0.85)",
                                transform: "rotate(45deg)"
                              }}
                            />
                          </Box>
                        )}

                        <Box
                          component="button"
                          type="button"
                          onClick={() => {
                            setOpenMenuId(openMenuId === shell.id ? null : shell.id);
                          }}
                          sx={{
                            background: "transparent",
                            border: "none",
                            fontSize: "18px",
                            color: "text.secondary",
                            cursor: "pointer",
                            p: "4px 8px",
                            lineHeight: 1,
                            position: "relative"
                          }}
                          title="Actions menu"
                          aria-label="Actions menu"
                        >
                          ⋮
                        </Box>

                        {openMenuId === shell.id && (
                          <Box
                            sx={{
                              position: "absolute",
                              top: "100%",
                              right: 0,
                              mt: "4px",
                              backgroundColor: "background.paper",
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: "6px",
                              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                              minWidth: "140px",
                              zIndex: 100,
                              opacity: 1
                            }}
                          >
                            <Box
                              component="button"
                              type="button"
                              onClick={() => {
                                setSelectedShell(shell);
                                setIsAmendModalOpen(true);
                                setOpenMenuId(null);
                                setShowOnboarding(false);
                              }}
                              sx={{
                                width: "100%",
                                p: "10px 16px",
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "text.primary",
                                background: "transparent",
                                border: "none",
                                textAlign: "left",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                whiteSpace: "nowrap",
                                "&:hover": { backgroundColor: "#f5f5f7" }
                              }}
                            >
                              🐢 Amend (Old Flow)
                            </Box>
                            <Box
                              component="button"
                              type="button"
                              onClick={() => {
                                setSelectedShell(shell);
                                setOpenMenuId(null);
                                setShowOnboarding(false);
                                showLoadingThen('Loading amendment form...', () => {
                                  setShowNewFlow(true);
                                  setNewFlowStep(1);
                                }, 1200);
                              }}
                              sx={{
                                width: "100%",
                                p: "10px 16px",
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "text.primary",
                                background: "transparent",
                                border: "none",
                                borderTop: "1px solid",
                                borderColor: "divider",
                                textAlign: "left",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                whiteSpace: "nowrap",
                                "&:hover": { backgroundColor: "#f5f5f7" }
                              }}
                            >
                              ⚡ Amend (New Flow)
                            </Box>
                            <Box
                              component="button"
                              type="button"
                              onClick={() => {
                                setSelectedShell(shell);
                                setOpenMenuId(null);
                                setShowOnboarding(false);
                                setShowDreamFlow(true);
                                setDreamFlowExpanded(true); // Skip straight to expanded
                                setShowDreamResults(false); // Don't show results until user searches
                                setNlInput(''); // Start with empty search
                                setSelectedPill(''); // Clear any selected pill
                              }}
                              sx={{
                                width: "100%",
                                p: "10px 16px",
                                fontSize: "14px",
                                fontWeight: 500,
                                color: "text.primary",
                                background: "transparent",
                                border: "none",
                                borderTop: "1px solid",
                                borderColor: "divider",
                                textAlign: "left",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                whiteSpace: "nowrap",
                                "&:hover": { backgroundColor: "#f5f5f7" }
                              }}
                            >
                              🚀 Amend (Dream Flow)
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* DREAM FLOW - Inline AI Bar (only for selected shell) */}
                  {showDreamFlow && selectedShell && selectedShell.id === shell.id && (
                    <Box sx={{ mt: "12px", pt: "12px", borderTop: "1px solid #f0f0f0", animation: "fadeIn 0.5s ease-out" }}>
                      {/* AI Smart Search Bar */}
                      <Box
                        sx={{
                          background: dreamFlowExpanded ? "rgba(255,255,255,0.95)" : "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                          borderRadius: "8px",
                          p: dreamFlowExpanded ? "8px 10px" : "12px",
                          cursor: dreamFlowExpanded ? "default" : "pointer",
                          position: "relative",
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          boxShadow: dreamFlowExpanded ? "0 4px 16px rgba(250, 112, 154, 0.3)" : "0 2px 8px rgba(250, 112, 154, 0.2)"
                        }}
                        onClick={(e) => {
                          if (!dreamFlowExpanded) {
                            e.stopPropagation();
                            setDreamFlowExpanded(true);
                          }
                        }}
                      >
                        {!dreamFlowExpanded && (
                          <>
                            {/* Shimmer */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: "-100%",
                                width: "100%",
                                height: "100%",
                                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                                animation: "shimmer 3s infinite"
                              }}
                            />

                            <Box sx={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
                              <Box sx={{ fontSize: "18px", animation: "pulse 2s ease-in-out infinite", filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))" }}>🤖</Box>
                              <Box sx={{ flex: 1, fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>
                                AI-Powered Amendment
                              </Box>
                              <Box sx={{ fontSize: "12px", color: "#ffffff", fontWeight: 500 }}>
                                ▶
                              </Box>
                            </Box>
                          </>
                        )}

                        {dreamFlowExpanded && (
                          <Box sx={{ animation: "fadeIn 0.3s ease-out" }}>
                            {/* Inline Payment Flow - Universal for all amendments */}
                            {showPayment && (
                              <Box sx={{ mt: "8px", p: "8px", background: "#ffffff", border: "2px solid #667eea", borderRadius: "6px", mb: "8px", animation: "fadeIn 0.3s ease-out" }}>
                                <Box sx={{ fontSize: "8px", color: "#86868b", fontWeight: 600, mb: "6px" }}>
                                  PAYMENT METHOD
                                </Box>
                                
                                {/* Payment Options */}
                                <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", mb: "8px" }}>
                                  {[
                                    { id: 'card', name: 'Credit Card', icon: '💳', subtitle: 'Visa ****4242 • Instant', color: '#667eea' },
                                    { id: 'apple', name: 'Apple Pay', icon: '', subtitle: 'Touch ID • Instant', color: '#000000' },
                                    { id: 'booking', name: 'On File', icon: '📋', subtitle: 'Corporate card on booking • No action', color: '#34c759' }
                                  ].map(method => (
                                    <Box
                                      key={method.id}
                                      onClick={() => setSelectedPayment(method.id)}
                                      sx={{
                                        p: "6px 8px",
                                        background: selectedPayment === method.id ? '#f0f4ff' : '#fafafa',
                                        border: "1px solid",
                                        borderColor: selectedPayment === method.id ? method.color : '#e0e0e0',
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        transition: "all 0.15s",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        "&:hover": {
                                          borderColor: selectedPayment === method.id ? method.color : method.color
                                        }
                                      }}
                                    >
                                      <Box sx={{ fontSize: "16px" }}>{method.icon}</Box>
                                      <Box sx={{ flex: 1 }}>
                                        <Box sx={{ fontSize: "9px", fontWeight: 600, color: "#1d1d1f" }}>
                                          {method.name}
                                        </Box>
                                        <Box sx={{ fontSize: "7px", color: "#6e6e73" }}>
                                          {method.subtitle}
                                        </Box>
                                      </Box>
                                      {selectedPayment === method.id && (
                                        <Box sx={{ fontSize: "12px", color: method.color }}>✓</Box>
                                      )}
                                    </Box>
                                  ))}
                                </Box>
                                
                                {/* Payment Summary */}
                                <Box sx={{ p: "6px 8px", background: "#f9f9fb", borderRadius: "4px", mb: "6px", fontSize: "7px", color: "#6e6e73" }}>
                                  <Box sx={{ fontSize: "8px", fontWeight: 600, color: "#1d1d1f", mb: "4px" }}>
                                    {selectedHotel ? selectedHotel.name : 'Date Change'}
                                  </Box>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: "2px" }}>
                                    <Box component="span">Amendment charge:</Box>
                                    <Box component="span" sx={{ color: "#ff9500", fontWeight: 600 }}>+$450</Box>
                                  </Box>
                                  <Box sx={{ display: "flex", justifyContent: "space-between", pt: "4px", borderTop: "1px solid #e0e0e0", fontWeight: 600, color: "#1d1d1f", fontSize: "8px" }}>
                                    <Box component="span">Total due now:</Box>
                                    <Box component="span">$450</Box>
                                  </Box>
                                </Box>
                                
                                {/* Action Buttons */}
                                <Box sx={{ display: "flex", gap: "4px" }}>
                                  <Box
                                    component="button"
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowPayment(false);
                                      setSelectedPayment(null);
                                      setConfirmingHotelIdx(null);
                                    }}
                                    sx={{
                                      flex: 1,
                                      fontSize: "8px",
                                      p: "4px",
                                      background: "#ffffff",
                                      color: "#6e6e73",
                                      border: "1px solid #e0e0e0",
                                      borderRadius: "3px",
                                      cursor: "pointer",
                                      fontWeight: 600,
                                      "&:hover": { background: "#f5f5f7" }
                                    }}
                                  >
                                    Cancel
                                  </Box>
                                  <Box
                                    component="button"
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setShowPayment(false);
                                      setIsConfirming(true);
                                      
                                      // Realistic multi-step processing
                                      setProcessingStep('Authorizing payment...');
                                      setTimeout(() => {
                                        setProcessingStep('Updating booking...');
                                        setTimeout(() => {
                                          setProcessingStep('Syncing itinerary...');
                                          setTimeout(() => {
                                            setProcessingStep('');
                                            // Keep success message visible longer (5s undo window)
                                            setTimeout(() => {
                                              setShowDreamFlow(false);
                                              setConfirmingHotelIdx(null);
                                              setSelectedPayment(null);
                                              setIsConfirming(false);
                                            }, 5000); // 5s to see success and undo if needed
                                          }, 800);
                                        }, 900);
                                      }, 1000);
                                    }}
                                    disabled={!selectedPayment}
                                    sx={{
                                      flex: 2,
                                      fontSize: "9px",
                                      p: "4px 10px",
                                      backgroundColor: selectedPayment ? "primary.main" : "action.disabledBackground",
                                      color: selectedPayment ? "primary.contrastText" : "text.disabled",
                                      border: "none",
                                      borderRadius: "4px",
                                      cursor: selectedPayment ? "pointer" : "not-allowed",
                                      fontWeight: 600,
                                      "&:hover": {
                                        backgroundColor: selectedPayment ? "primary.dark" : "action.disabledBackground"
                                      }
                                    }}
                                  >
                                    Confirm & Pay ${selectedHotel ? Math.abs((selectedHotel.priceNum - selectedHotel.currentPrice) * selectedHotel.nights) : '450'}
                                  </Box>
                                </Box>
                              </Box>
                            )}
                            
                            {/* Processing or Success Message */}
                            {isConfirming && !showPayment && (
                              <Box sx={{
                                p: "8px 10px",
                                background: processingStep ? "#fff8e1" : "#d4edda",
                                border: `1px solid ${processingStep ? "#ff9500" : "#34c759"}`,
                                borderRadius: "4px",
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                animation: "slideDown 0.3s ease-out"
                              }}>
                                {processingStep ? (
                                  <>
                                    <Box sx={{
                                      width: "12px",
                                      height: "12px",
                                      border: "2px solid #ff9500",
                                      borderTopColor: "transparent",
                                      borderRadius: "50%",
                                      animation: "spin 0.6s linear infinite"
                                    }} />
                                    <Box sx={{ flex: 1 }}>
                                      <Box sx={{ fontSize: "10px", fontWeight: 600, color: "#e65100" }}>
                                        {processingStep}
                                      </Box>
                                      <Box sx={{ fontSize: "7px", color: "#f57c00", mt: "2px" }}>
                                        Secure connection · Encrypted
                                      </Box>
                                    </Box>
                                  </>
                                ) : (
                                  <>
                                    <Box sx={{ fontSize: "14px" }}>✓</Box>
                                    <Box sx={{ flex: 1 }}>
                                      <Box sx={{ fontSize: "10px", fontWeight: 600, color: "#155724" }}>
                                        ✓ Payment Confirmed · Booking Updated
                                      </Box>
                                      <Box sx={{ fontSize: "8px", color: "#155724", mt: "2px" }}>
                                        {selectedPayment === 'card' && 'Visa ****4242 charged • '}
                                        {selectedPayment === 'apple' && 'Apple Pay completed • '}
                                        {selectedPayment === 'booking' && 'Card on file charged • '}
                                        Client itinerary synced
                                      </Box>
                                    </Box>
                                  </>
                                )}
                                {!processingStep && (
                                  <Box
                                    component="button"
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Undo the amendment
                                      setIsConfirming(false);
                                      setConfirmingHotelIdx(null);
                                      setSelectedHotel(null);
                                      setHotelAmended(false);
                                      setUndoCountdown(null);
                                      setLastAmendment(null);
                                      setProcessingStep('');
                                      
                                      // Show undo confirmation
                                      setShowUndoConfirmation(true);
                                      setTimeout(() => {
                                        setShowUndoConfirmation(false);
                                      }, 2000);
                                    }}
                                    sx={{
                                      fontSize: "8px",
                                      p: "3px 8px",
                                      background: "#ffffff",
                                      color: "#ff9500",
                                      border: "1px solid #ff9500",
                                      borderRadius: "3px",
                                      cursor: "pointer",
                                      fontWeight: 700,
                                      transition: "all 0.15s",
                                      "&:hover": { background: "#fff8f0" }
                                    }}
                                  >
                                    ↶ UNDO
                                  </Box>
                                )}
                              </Box>
                            )}
                            
                            {/* Integrated Search */}
                            {confirmingHotelIdx === null && (
                              <Box sx={{ display: "flex", alignItems: "center", gap: "6px", mb: "6px" }}>
                                <Box sx={{ fontSize: "14px" }}>✨</Box>
                                <Box
                                  component="input"
                                  value={nlInput}
                                  onChange={(e) => setNlInput(e.target.value)}
                                  placeholder="Type what you want to change..."
                                  autoFocus
                                  onClick={(e) => e.stopPropagation()}
                                  sx={{
                                    flex: 1,
                                    border: "none",
                                    outline: "none",
                                    fontSize: "12px",
                                    fontFamily: "inherit",
                                    background: "transparent",
                                    color: "text.primary"
                                  }}
                                />
                                <Box
                                  component="button"
                                  type="button"
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setShowDreamResults(true);
                                  }}
                                  sx={{
                                    p: "4px 10px",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    color: "#ffffff",
                                    background: "background.default",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer"
                                  }}
                                >
                                  Search
                                </Box>
                              </Box>
                            )}
                            
                            {/* Quick Pills + Close - AI Context Aware */}
                            {confirmingHotelIdx === null && (
                              <Box sx={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px", alignItems: "center" }}>
                                  {/* Parent pills - always visible */}
                                  {["Room Upgrade", "Different Hotel", "Date Change"].map((ex, idx) => {
                                    const isDateChangeActive = ex === "Date Change" && (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3');
                                    const isActive = isDateChangeActive || selectedPill === ex;
                                    return (
                                      <Chip
                                        key={idx}
                                        label={ex}
                                        component="span"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedPill(ex);
                                          setShowDreamResults(true);
                                        }}
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelectedPill(ex);
                                            setShowDreamResults(true);
                                          }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        color="primary"
                                        variant="filled"
                                        sx={{
                                          height: (theme) => theme.spacing(3),
                                          fontSize: "11px",
                                          fontWeight: isActive ? 600 : 500,
                                          borderRadius: (theme) => theme.shape.borderRadius,
                                          px: 1,
                                          backgroundColor: isActive ? "primary.dark" : "primary.main",
                                          color: "common.white",
                                          opacity: 1,
                                          "& .MuiChip-label": {
                                            px: 1,
                                            py: 0,
                                            color: "common.white",
                                            opacity: 1,
                                            fontSize: "11px",
                                            lineHeight: 1,
                                            WebkitTextFillColor: "common.white",
                                            textShadow: "0 1px 1px rgba(0,0,0,0.25)"
                                          }
                                        }}
                                      />
                                    );
                                  })}
                                  <Box
                                    component="button"
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setShowDreamFlow(false); }}
                                    sx={{
                                      fontSize: "8px",
                                      p: "2px 6px",
                                      background: "transparent",
                                      border: "none",
                                      color: "#6e6e73",
                                      cursor: "pointer",
                                      fontWeight: 500,
                                      marginLeft: "auto",
                                      textDecoration: "underline"
                                    }}
                                  >
                                    Close
                                  </Box>
                                </Box>
                                
                                {/* Show child pills when Date Change is active - on separate line */}
                                {(selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') && (
                                  <Box sx={{ pt: "6px", mt: "6px", borderTop: "1px solid #e0e0e0" }}>
                                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "3px", alignItems: "center", mb: "6px" }}>
                                      {["Extend +1", "Shorten -1", "Shift +3"].map((ex, idx) => {
                                        const isActive = selectedPill === ex;
                                        return (
                                          <Chip
                                            key={idx}
                                            label={ex}
                                            component="span"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedPill(ex);
                                              setShowDreamResults(true);
                                            }}
                                            onKeyDown={(e) => {
                                              if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                setSelectedPill(ex);
                                                setShowDreamResults(true);
                                              }
                                            }}
                                            tabIndex={0}
                                            role="button"
                                            color="primary"
                                            variant="filled"
                                            sx={{
                                              height: (theme) => theme.spacing(2.75),
                                              fontSize: "10px",
                                              fontWeight: isActive ? 600 : 500,
                                              borderRadius: (theme) => theme.shape.borderRadius,
                                              px: 0.5,
                                              backgroundColor: isActive ? "primary.dark" : "primary.main",
                                              color: "common.white",
                                              opacity: 1,
                                              "& .MuiChip-label": {
                                                px: 0.75,
                                                py: 0,
                                                color: "common.white",
                                                opacity: 1,
                                                fontSize: "10px",
                                                lineHeight: 1,
                                                WebkitTextFillColor: "common.white",
                                                textShadow: "0 1px 1px rgba(0,0,0,0.25)"
                                              }
                                            }}
                                          />
                                        );
                                      })}
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            )}

                            {/* AI Results - Inline */}
                            {confirmingHotelIdx === null && showDreamResults && (
                              <Box sx={{ 
                                mt: (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') ? "0px" : "6px", 
                                pt: (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') ? "0px" : "6px", 
                                borderTop: (selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') ? "none" : "1px solid #e0e0e0",
                                animation: "slideDown 0.3s ease-out"
                              }}>
                                {/* Current Booking Reference - conditional based on selected pill */}
                                {!(selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') && (
                                  <Box sx={{
                                    p: "4px 6px",
                                    background: "#f9f9fb",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "4px",
                                    mb: "4px"
                                  }}>
                                    <Box sx={{ fontSize: "8px", color: "#86868b", mb: "3px", fontWeight: 500 }}>
                                      CURRENT ROOM
                                    </Box>
                                    <Box sx={{ fontSize: "10px", fontWeight: 600, color: "#1d1d1f" }}>
                                      Standard King · $450/night
                                    </Box>
                                    <Box sx={{ fontSize: "8px", color: "#6e6e73", mt: "2px" }}>
                                      City View · Queen Bed
                                    </Box>
                                  </Box>
                                )}

                                {/* Trust Signals */}
                                <Box sx={{ display: "flex", gap: "6px", mb: "6px", alignItems: "center", flexWrap: "wrap" }}>
                                  <Box sx={{ fontSize: "8px", p: "2px 5px", background: "#34c759", color: "#ffffff", borderRadius: "3px", fontWeight: 600, display: "flex", alignItems: "center", gap: "3px" }}>
                                    <Box component="span" sx={{ fontSize: "10px" }}>●</Box> LIVE
                                  </Box>
                                  <Box sx={{ fontSize: "9px", color: "#6e6e73" }}>
                                    Updated {secondsAgo}s ago
                                  </Box>
                                  <Box sx={{ fontSize: "9px", color: "#6e6e73" }}>·</Box>
                                  <Box sx={{ fontSize: "9px", color: "#ff9500", fontWeight: 500 }}>
                                    3 viewing
                                  </Box>
                                </Box>
                                {(() => {
                                  const input = (selectedPill || nlInput).toLowerCase();
                                  let hotels;
                                  const isDateChange = selectedPill === 'Date Change' || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3';
                                  
                                  if (input.includes('flight') || input.includes('depart') || input.includes('arrival')) {
                                    hotels = [
                                      { name: "United 1402 - 8:15am", type: "Earlier Departure", price: "+$125", match: 99, badge: "Available", color: "#34c759", available: "4 seats", features: ["Direct", "2h 15m"] },
                                      { name: "Business Class", type: "Upgrade", price: "+$890", match: 95, badge: "Available", color: "#667eea", available: "2 seats", features: ["Lie-flat", "Lounge"] },
                                      { name: "Hawaiian Air 52", type: "Different Airline", price: "+$0", match: 90, badge: "Available", color: "#0071e3", available: "8 seats", features: ["Direct", "Meals"] }
                                    ];
                                  } else if (input.includes('passenger') || input.includes('guest')) {
                                    hotels = [
                                      { name: "Add 1 adult", type: "Passenger Change", price: "+$420", match: 99, badge: "Available", color: "#34c759", available: "Room fits 3", features: ["Rollaway bed", "Extra amenities"] },
                                      { name: "Upgrade to 2-bedroom", type: "Room Change", price: "+$325/nt", match: 95, badge: "Available", color: "#667eea", available: "2 left", features: ["Suite", "Living room"] },
                                      { name: "Remove 1 guest", type: "Passenger Change", price: "-$0", match: 90, badge: "Free", color: "#34c759", features: ["Update booking"] }
                                    ];
                                  } else if (input.includes('activity') || input.includes('tour')) {
                                    hotels = [
                                      { name: "Traditional Luau", type: "Activity", price: "$159/pp", match: 99, badge: "Popular", color: "#ff9500", available: "Tonight 6pm", features: ["Dinner", "Show", "Transport"] },
                                      { name: "Snorkel & Dolphin", type: "Water Activity", price: "$189/pp", match: 95, badge: "Available", color: "#0071e3", available: "Tomorrow 9am", features: ["Gear included", "Lunch"] },
                                      { name: "Volcano Helicopter", type: "Air Tour", price: "$349/pp", match: 92, badge: "Available", color: "#667eea", available: "3 days", features: ["60 min", "Doors off"] }
                                    ];
                                  } else if (input.includes('meal') || input.includes('dining')) {
                                    hotels = [
                                      { name: "All-Inclusive", type: "Meal Upgrade", price: "+$145/night", match: 99, badge: "Available", color: "#34c759", features: ["All meals", "Premium drinks", "Room service"] },
                                      { name: "Half Board", type: "Meal Plan", price: "+$65/night", match: 95, badge: "Available", color: "#0071e3", features: ["Breakfast", "Dinner"] },
                                      { name: "Breakfast Only", type: "Meal Plan", price: "+$35/night", match: 90, badge: "Available", color: "#667eea", features: ["Daily buffet"] }
                                    ];
                                  } else if (isDateChange || input.includes('date') || input.includes('extend') || input.includes('shorten') || input.includes('shift') || input.includes('custom')) {
                                    hotels = 'calendar'; // Special flag for calendar view
                                  } else if (input.includes('hotel') || input.includes('property') || input.includes('resort')) {
                                    const currentPrice = 450;
                                    const nights = 5;
                                    hotels = [
                                      { name: "Four Seasons Hualalai", type: "King Room · Same Dates", price: "$850/nt", priceNum: 850, match: 98, badge: "Luxury", color: "#667eea", available: "3 rooms left", features: ["5-star", "Beachfront", "Golf"], currentPrice, nights, source: "Sabre GDS" },
                                      { name: "Fairmont Orchid", type: "King Room · Same Dates", price: "$625/nt", priceNum: 625, match: 95, badge: "Available", color: "#0071e3", available: "8 rooms left", features: ["Resort", "Spa", "Pools"], currentPrice, nights, source: "Amadeus" },
                                      { name: "Grand Hyatt Kauai", type: "King Room · Same Dates", price: "$580/nt", priceNum: 580, match: 92, badge: "Value", color: "#34c759", available: "12 rooms left", features: ["Family", "Beach", "Activities"], currentPrice, nights, source: "Direct API" }
                                    ];
                                  } else {
                                    // Default: Room changes with LIVE inventory + Cost comparison
                                    const currentPrice = 450;
                                    const nights = 5;
                                    hotels = [
                                      { name: "Ocean Suite", type: "Upgrade", price: "$625", priceNum: 625, match: 99, badge: "Available", color: "#34c759", available: `${liveInventory.room1} left`, features: ["Ocean View", "Living Room", "Balcony"], lastBooked: "4m ago by Maria T.", roomKey: 'room1', inventory: liveInventory.room1, currentPrice, nights, source: "Hilton API" },
                                      { name: "Premium King", type: "Upgrade", price: "$520", priceNum: 520, match: 95, badge: "Available", color: "#34c759", available: `${liveInventory.room2} left`, features: ["Partial Ocean", "King Bed"], lastBooked: "12m ago by John D.", roomKey: 'room2', inventory: liveInventory.room2, currentPrice, nights, source: "Hilton API" },
                                      { name: "Garden View Suite", type: "Upgrade", price: "$580", priceNum: 580, match: 92, badge: "Available", color: "#0071e3", available: `${liveInventory.room3} left`, features: ["Garden View", "Suite"], lastBooked: "28m ago by Lisa K.", roomKey: 'room3', inventory: liveInventory.room3, currentPrice, nights, source: "Hilton API" }
                                    ].filter(room => room.inventory > 0); // Only show rooms with inventory
                                  }
                                
                                  // Render logic
                                  if (hotels === 'calendar') {
                                    // Determine date range based on manual selection or selected pill
                                    let startDate = calendarStartDate || 22;
                                    let endDate = calendarEndDate || 27;
                                    
                                    // Override with pill presets if no manual selection
                                    if (!calendarStartDate && !calendarEndDate) {
                                      if (selectedPill === 'Extend +1') {
                                        startDate = 15; endDate = 21; // Jun 15-21
                                      } else if (selectedPill === 'Shorten -1') {
                                        startDate = 15; endDate = 19; // Jun 15-19
                                      } else if (selectedPill === 'Shift +3') {
                                        startDate = 18; endDate = 23; // Jun 18-23
                                      } else {
                                        startDate = 15; endDate = 20; // Default (current booking)
                                      }
                                    }
                                    
                                    const months = [
                                      {
                                        name: 'MARCH',
                                        emptyStart: 5, // March 2025 starts on Saturday (5 empty cells)
                                        days: Array.from({length: 31}, (_, i) => {
                                          const date = i + 1;
                                          const isCurrent = date >= startDate && date <= endDate;
                                          let price = 450;
                                          let avail = 'high';
                                          
                                          // Weekend pricing
                                          if ([7,8,14,15,20,21].includes(date)) {
                                            price = 480;
                                            avail = 'medium';
                                          }
                                          if ([30,31].includes(date)) {
                                            price = 520;
                                            avail = date === 31 ? 'low' : 'high';
                                          }
                                          
                                          return { 
                                            date, 
                                            price, 
                                            avail: isCurrent ? 'current' : avail,
                                            current: isCurrent
                                          };
                                        })
                                      },
                                      {
                                        name: 'APRIL',
                                        emptyStart: 1, // April 2025 starts on Tuesday (1 empty cell)
                                        days: [
                                          { date: 1, price: 520, avail: 'sold' },
                                          { date: 2, price: 520, avail: 'sold' },
                                          { date: 3, price: 480, avail: 'high' },
                                          { date: 4, price: 480, avail: 'high' },
                                          { date: 5, price: 480, avail: 'medium' },
                                          { date: 6, price: 480, avail: 'medium' },
                                          { date: 7, price: 450, avail: 'high' },
                                          { date: 8, price: 450, avail: 'high' },
                                          { date: 9, price: 450, avail: 'high' },
                                          { date: 10, price: 450, avail: 'high' },
                                          { date: 11, price: 450, avail: 'low' },
                                          { date: 12, price: 520, avail: 'medium' },
                                          { date: 13, price: 520, avail: 'high' },
                                          { date: 14, price: 480, avail: 'high' },
                                          { date: 15, price: 480, avail: 'high' },
                                          { date: 16, price: 450, avail: 'high' },
                                          { date: 17, price: 450, avail: 'high' },
                                          { date: 18, price: 450, avail: 'medium' },
                                          { date: 19, price: 480, avail: 'medium' },
                                          { date: 20, price: 480, avail: 'high' },
                                          { date: 21, price: 450, avail: 'high' },
                                          { date: 22, price: 450, avail: 'high' },
                                          { date: 23, price: 450, avail: 'high' },
                                          { date: 24, price: 450, avail: 'high' },
                                          { date: 25, price: 520, avail: 'medium' },
                                          { date: 26, price: 520, avail: 'low' },
                                          { date: 27, price: 480, avail: 'high' },
                                          { date: 28, price: 480, avail: 'high' },
                                          { date: 29, price: 450, avail: 'high' },
                                          { date: 30, price: 450, avail: 'high' }
                                        ]
                                      },
                                      {
                                        name: 'MAY',
                                        emptyStart: 3, // May 2025 starts on Thursday (3 empty cells)
                                        days: [
                                          { date: 1, price: 450, avail: 'high' },
                                          { date: 2, price: 450, avail: 'high' },
                                          { date: 3, price: 480, avail: 'medium' },
                                          { date: 4, price: 480, avail: 'high' },
                                          { date: 5, price: 450, avail: 'high' },
                                          { date: 6, price: 450, avail: 'high' },
                                          { date: 7, price: 450, avail: 'high' },
                                          { date: 8, price: 450, avail: 'high' },
                                          { date: 9, price: 450, avail: 'low' },
                                          { date: 10, price: 520, avail: 'medium' },
                                          { date: 11, price: 520, avail: 'high' },
                                          { date: 12, price: 480, avail: 'high' },
                                          { date: 13, price: 480, avail: 'high' },
                                          { date: 14, price: 450, avail: 'high' },
                                          { date: 15, price: 450, avail: 'high' },
                                          { date: 16, price: 450, avail: 'medium' },
                                          { date: 17, price: 480, avail: 'medium' },
                                          { date: 18, price: 480, avail: 'high' },
                                          { date: 19, price: 450, avail: 'high' },
                                          { date: 20, price: 450, avail: 'high' },
                                          { date: 21, price: 450, avail: 'high' },
                                          { date: 22, price: 450, avail: 'high' },
                                          { date: 23, price: 520, avail: 'low' },
                                          { date: 24, price: 520, avail: 'medium' },
                                          { date: 25, price: 480, avail: 'high' },
                                          { date: 26, price: 480, avail: 'sold' },
                                          { date: 27, price: 450, avail: 'high' },
                                          { date: 28, price: 450, avail: 'high' },
                                          { date: 29, price: 450, avail: 'high' },
                                          { date: 30, price: 450, avail: 'medium' },
                                          { date: 31, price: 520, avail: 'high' }
                                        ]
                                      },
                                      {
                                        name: 'JUNE',
                                        emptyStart: 6, // June 2025 starts on Sunday (6 empty cells)
                                        days: [
                                          { date: 1, price: 450, avail: 'high' },
                                          { date: 2, price: 450, avail: 'high' },
                                          { date: 3, price: 450, avail: 'high' },
                                          { date: 4, price: 450, avail: 'high' },
                                          { date: 5, price: 450, avail: 'medium' },
                                          { date: 6, price: 480, avail: 'medium' },
                                          { date: 7, price: 480, avail: 'high' },
                                          { date: 8, price: 480, avail: 'high' },
                                          { date: 9, price: 450, avail: 'high' },
                                          { date: 10, price: 450, avail: 'high' },
                                          { date: 11, price: 450, avail: 'high' },
                                          { date: 12, price: 450, avail: 'high' },
                                          { date: 13, price: 520, avail: 'low' },
                                          { date: 14, price: 520, avail: 'medium' },
                                          { date: 15, price: 480, avail: 'high' },
                                          { date: 16, price: 480, avail: 'high' },
                                          { date: 17, price: 450, avail: 'high' },
                                          { date: 18, price: 450, avail: 'high' },
                                          { date: 19, price: 450, avail: 'high' },
                                          { date: 20, price: 450, avail: 'medium' },
                                          { date: 21, price: 520, avail: 'medium' },
                                          { date: 22, price: 520, avail: 'high' },
                                          { date: 23, price: 480, avail: 'high' },
                                          { date: 24, price: 480, avail: 'high' },
                                          { date: 25, price: 450, avail: 'high' },
                                          { date: 26, price: 450, avail: 'high' },
                                          { date: 27, price: 450, avail: 'sold' },
                                          { date: 28, price: 450, avail: 'low' },
                                          { date: 29, price: 520, avail: 'medium' },
                                          { date: 30, price: 520, avail: 'high' }
                                        ]
                                      }
                                    ];
                                  
                                  return (
                                    <Box sx={{ mt: "4px" }}>
                                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "3px" }}>
                                        <Box sx={{ fontSize: "7px", color: "#86868b", fontWeight: 600 }}>
                                          SELECT NEW DATES · LIVE AVAILABILITY
                                        </Box>
                                        <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
                                          <Box
                                            component="button"
                                            type="button"
                                            sx={{
                                              fontSize: "8px",
                                              p: "1px 4px",
                                              background: "#f5f5f7",
                                              border: "1px solid #e0e0e0",
                                              borderRadius: "2px",
                                              cursor: "pointer",
                                              color: "#1d1d1f",
                                              fontWeight: 600,
                                              "&:hover": { background: "#e0e0e0" }
                                            }}
                                          >
                                            ‹
                                          </Box>
                                          <Box sx={{ fontSize: "6px", color: "#6e6e73", fontWeight: 600 }}>
                                            MAR - JUN 2025
                                          </Box>
                                          <Box
                                            component="button"
                                            type="button"
                                            sx={{
                                              fontSize: "8px",
                                              p: "1px 4px",
                                              background: "#f5f5f7",
                                              border: "1px solid #e0e0e0",
                                              borderRadius: "2px",
                                              cursor: "pointer",
                                              color: "#1d1d1f",
                                              fontWeight: 600,
                                              "&:hover": { background: "#e0e0e0" }
                                            }}
                                          >
                                            ›
                                          </Box>
                                        </Box>
                                      </Box>
                                      <Box sx={{ display: "flex", gap: "4px" }}>
                                        {months.map((month, monthIdx) => (
                                          <Box key={month.name} sx={{ flex: 1 }}>
                                            <Box sx={{ fontSize: "6px", fontWeight: 700, color: "#1d1d1f", mb: "2px", textAlign: "center" }}>
                                              {month.name}
                                            </Box>
                                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px", mb: "2px" }}>
                                              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                                <Box key={d} sx={{ fontSize: "5px", color: "#86868b", textAlign: "center", fontWeight: 600, py: "1px" }}>{d}</Box>
                                              ))}
                                            </Box>
                                            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px" }}>
                                              {/* Empty cells for alignment */}
                                              {[...Array(month.emptyStart)].map((_, i) => <Box key={`empty-${i}`} />)}
                                              
                                              {month.days.map(day => {
                                          const bgColor = day.avail === 'sold' ? '#f5f5f7' : 
                                                         day.avail === 'low' ? '#fff3cd' : 
                                                         day.avail === 'medium' ? '#ffe5cc' :
                                                         day.avail === 'current' ? '#667eea' :
                                                         '#d4f5dd';
                                          const textColor = day.current ? '#ffffff' : 
                                                           day.avail === 'sold' ? '#d1d1d6' : '#1d1d1f';
                                          const cursor = day.avail === 'sold' ? 'not-allowed' : 'pointer';
                                          
                                          return (
                                            <Box
                                              key={`${month.name}-${day.date}`}
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                if (day.avail !== 'sold') {
                                                  // First click = start date, second click = end date
                                                  if (!calendarStartDate) {
                                                    setCalendarStartDate(day.date);
                                                    setCalendarEndDate(null);
                                                  } else if (!calendarEndDate) {
                                                    if (day.date > calendarStartDate) {
                                                      setCalendarEndDate(day.date);
                                                    } else {
                                                      setCalendarStartDate(day.date);
                                                      setCalendarEndDate(null);
                                                    }
                                                  } else {
                                                    // Reset and start over
                                                    setCalendarStartDate(day.date);
                                                    setCalendarEndDate(null);
                                                  }
                                                }
                                              }}
                                              sx={{
                                                background: bgColor,
                                                border: day.current ? '1.5px solid #667eea' : '0.5px solid #e0e0e0',
                                                borderRadius: "2px",
                                                py: "1px",
                                                textAlign: "center",
                                                cursor: cursor,
                                                position: "relative",
                                                transition: "all 0.15s",
                                                opacity: day.avail === 'sold' ? 0.5 : 1,
                                                minHeight: "18px",
                                                fontSize: "7px",
                                                "&:hover": day.avail !== 'sold'
                                                  ? { transform: "scale(1.05)", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }
                                                  : undefined
                                              }}
                                            >
                                              <Box sx={{ fontSize: "7px", fontWeight: day.current ? 700 : 600, color: textColor, lineHeight: 1 }}>
                                                {day.date}
                                              </Box>
                                              {!day.current && day.avail !== 'sold' && (
                                                <Box sx={{ fontSize: "4px", color: textColor === '#ffffff' ? textColor : '#6e6e73', mt: "1px", lineHeight: 1 }}>
                                                  ${day.price}
                                                </Box>
                                              )}
                                              {day.avail === 'sold' && (
                                                <Box sx={{ fontSize: "4px", color: "#86868b", mt: "1px", fontWeight: 600, lineHeight: 1 }}>
                                                  FULL
                                                </Box>
                                              )}
                                            </Box>
                                          );
                                        })}
                                            </Box>
                                          </Box>
                                        ))}
                                      </Box>
                                      <Box sx={{ mt: "4px", display: "flex", gap: "4px", fontSize: "6px", color: "#6e6e73" }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                          <Box sx={{ width: "6px", height: "6px", background: "#667eea", borderRadius: "1px" }} />
                                          <Box component="span">Current</Box>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                          <Box sx={{ width: "6px", height: "6px", background: "#d4f5dd", borderRadius: "1px" }} />
                                          <Box component="span">Available</Box>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                          <Box sx={{ width: "6px", height: "6px", background: "#ffe5cc", borderRadius: "1px" }} />
                                          <Box component="span">Limited</Box>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
                                          <Box sx={{ width: "6px", height: "6px", background: "#f5f5f7", borderRadius: "1px" }} />
                                          <Box component="span">Sold Out</Box>
                                        </Box>
                                      </Box>
                                      
                                      {/* Confirmation Bar - Show when dates are selected or pill is clicked */}
                                      {!showPayment && (calendarStartDate || selectedPill === 'Extend +1' || selectedPill === 'Shorten -1' || selectedPill === 'Shift +3') && (
                                        <Box sx={{ mt: "6px", p: "6px 8px", background: "#f9f9fb", border: "1px solid #667eea", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                          <Box>
                                            <Box sx={{ fontSize: "8px", color: "#86868b", fontWeight: 600, mb: "2px" }}>
                                              NEW DATES
                                            </Box>
                                            <Box sx={{ fontSize: "10px", fontWeight: 600, color: "#1d1d1f" }}>
                                              Mar {startDate} - {endDate > 31 ? `Apr ${endDate - 31}` : endDate}
                                              <Box component="span" sx={{ fontSize: "8px", color: startDate === 22 && endDate === 27 ? "#6e6e73" : (endDate - startDate + 1) > 6 ? "#ff9500" : "#34c759", fontWeight: 600, ml: "6px" }}>
                                                {startDate === 22 && endDate === 27 ? '(No change)' : (endDate - startDate + 1) > 6 ? `+$${(endDate - startDate + 1 - 6) * 450}` : `-$${(6 - (endDate - startDate + 1)) * 450}`}
                                              </Box>
                                            </Box>
                                            
                                            {/* Impact Details */}
                                            <Box sx={{ mt: "6px", pt: "6px", borderTop: "1px solid #e0e0e0" }}>
                                              {/* Dependencies */}
                                              <Box sx={{ fontSize: "7px", mb: "3px" }}>
                                                <Box component="span" sx={{ color: "#34c759", fontWeight: 600 }}>✓</Box>
                                                <Box component="span" sx={{ color: "#1d1d1f", ml: "3px" }}>Flight departure compatible</Box>
                                              </Box>
                                              {(endDate - startDate + 1) !== 6 && (
                                                <Box sx={{ fontSize: "7px", mb: "3px" }}>
                                                  <Box component="span" sx={{ color: "#ff9500", fontWeight: 600 }}>⚠</Box>
                                                  <Box component="span" sx={{ color: "#1d1d1f", ml: "3px" }}>Airport transfer needs adjustment (+15min)</Box>
                                                </Box>
                                              )}
                                              <Box sx={{ fontSize: "7px", mb: "3px" }}>
                                                <Box component="span" sx={{ color: "#34c759", fontWeight: 600 }}>✓</Box>
                                                <Box component="span" sx={{ color: "#1d1d1f", ml: "3px" }}>Free cancellation maintained (until Mar 15)</Box>
                                              </Box>
                                              
                                              {/* Total Impact */}
                                              <Box sx={{ fontSize: "8px", mt: "4px", p: "3px 5px", background: "#f5f5f7", borderRadius: "3px", display: "flex", justifyContent: "space-between" }}>
                                                <Box component="span" sx={{ color: "#6e6e73" }}>Total trip:</Box>
                                                <Box component="span" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                                                  $4,250 → ${4250 + (endDate - startDate + 1 - 6) * 450}
                                                </Box>
                                              </Box>
                                              
                                              {/* Booking & Sync */}
                                              <Box sx={{ fontSize: "7px", mt: "4px", color: "#6e6e73" }}>
                                                <Box>Booking #HTL-2847 · Auto-sync to client itinerary</Box>
                                              </Box>
                                            </Box>
                                          </Box>
                                          <Box
                                            component="button"
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setShowPayment(true);
                                              setConfirmingHotelIdx(-1); // Use -1 for date changes
                                            }}
                                            disabled={isConfirming}
                                            sx={{
                                              fontSize: "9px",
                                              p: "4px 10px",
                                              background: isConfirming ? "#34c759" : "#667eea",
                                              color: "#ffffff",
                                              border: "none",
                                              borderRadius: "4px",
                                              cursor: isConfirming ? "default" : "pointer",
                                              fontWeight: 600,
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "4px",
                                              transition: "all 0.3s ease",
                                              "&:hover": { background: isConfirming ? "#34c759" : "#5566d9" }
                                            }}
                                          >
                                            {isConfirming ? (
                                              <>
                                                <Box sx={{ width: "8px", height: "8px", border: "2px solid #ffffff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                                                <Box component="span">Processing...</Box>
                                              </>
                                            ) : (
                                              'Review & Pay'
                                            )}
                                          </Box>
                                        </Box>
                                      )}
                                      
                                      {/* Inline Payment Flow */}
                                      {showPayment && confirmingHotelIdx === -1 && (
                                        <Box sx={{ mt: "8px", p: "8px", background: "#ffffff", border: "2px solid #667eea", borderRadius: "6px", animation: "fadeIn 0.3s ease-out" }}>
                                          <Box sx={{ fontSize: "8px", color: "#86868b", fontWeight: 600, mb: "6px" }}>
                                            PAYMENT METHOD
                                          </Box>
                                          
                                          {/* Payment Options */}
                                          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px", mb: "8px" }}>
                                            {[
                                              { id: 'card', name: 'Credit Card', icon: '💳', subtitle: 'Visa ****4242 • Instant', color: '#667eea' },
                                              { id: 'apple', name: 'Apple Pay', icon: '', subtitle: 'Touch ID • Instant', color: '#000000' },
                                              { id: 'booking', name: 'On File', icon: '📋', subtitle: 'Corporate card on booking • No action', color: '#34c759' }
                                            ].map(method => (
                                              <Box
                                                key={method.id}
                                                onClick={() => setSelectedPayment(method.id)}
                                                sx={{
                                                  p: "6px 8px",
                                                  background: selectedPayment === method.id ? '#f0f4ff' : '#fafafa',
                                                  border: "1px solid",
                                                  borderColor: selectedPayment === method.id ? method.color : '#e0e0e0',
                                                  borderRadius: "4px",
                                                  cursor: "pointer",
                                                  transition: "all 0.15s",
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: "8px",
                                                  "&:hover": {
                                                    borderColor: selectedPayment === method.id ? method.color : method.color
                                                  }
                                                }}
                                              >
                                                <Box sx={{ fontSize: "16px" }}>{method.icon}</Box>
                                                <Box sx={{ flex: 1 }}>
                                                  <Box sx={{ fontSize: "9px", fontWeight: 600, color: "#1d1d1f" }}>
                                                    {method.name}
                                                  </Box>
                                                  <Box sx={{ fontSize: "7px", color: "#6e6e73" }}>
                                                    {method.subtitle}
                                                  </Box>
                                                </Box>
                                                {selectedPayment === method.id && (
                                                  <Box sx={{ fontSize: "12px", color: method.color }}>✓</Box>
                                                )}
                                              </Box>
                                            ))}
                                          </Box>
                                          
                                          {/* Payment Summary */}
                                          <Box sx={{ p: "6px 8px", background: "#f9f9fb", borderRadius: "4px", mb: "6px", fontSize: "7px", color: "#6e6e73" }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "2px" }}>
                                              <Box component="span">Original booking:</Box>
                                              <Box component="span">$4,250</Box>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: "2px" }}>
                                              <Box component="span">Amendment charge:</Box>
                                              <Box component="span" sx={{ color: (endDate - startDate + 1) > 6 ? "#ff9500" : "#34c759" }}>
                                                {(endDate - startDate + 1) > 6 ? `+$${(endDate - startDate + 1 - 6) * 450}` : `-$${(6 - (endDate - startDate + 1)) * 450}`}
                                              </Box>
                                            </Box>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", pt: "4px", borderTop: "1px solid #e0e0e0", fontWeight: 600, color: "#1d1d1f", fontSize: "8px" }}>
                                              <Box component="span">Total due now:</Box>
                                              <Box component="span">${Math.abs((endDate - startDate + 1 - 6) * 450)}</Box>
                                            </Box>
                                          </Box>
                                          
                                          {/* Action Buttons */}
                                          <Box sx={{ display: "flex", gap: "4px" }}>
                                            <Box
                                              component="button"
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setShowPayment(false);
                                                setSelectedPayment(null);
                                              }}
                                              sx={{
                                                flex: 1,
                                                fontSize: "8px",
                                                p: "4px",
                                                background: "#ffffff",
                                                color: "#6e6e73",
                                                border: "1px solid #e0e0e0",
                                                borderRadius: "3px",
                                                cursor: "pointer",
                                                fontWeight: 600,
                                                "&:hover": { background: "#f5f5f7" }
                                              }}
                                            >
                                              Cancel
                                            </Box>
                                            <Box
                                              component="button"
                                              type="button"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setShowPayment(false);
                                                setIsConfirming(true);
                                                setTimeout(() => {
                                                  setIsConfirming(false);
                                                  setTimeout(() => {
                                                    setShowDreamFlow(false);
                                                    setConfirmingHotelIdx(null);
                                                    setSelectedPayment(null);
                                                  }, 2000);
                                                }, 2500);
                                              }}
                                              disabled={!selectedPayment}
                                              sx={{
                                                flex: 2,
                                                fontSize: "9px",
                                                p: "4px 10px",
                                                background: selectedPayment ? "#667eea" : "#d1d1d6",
                                                color: "#ffffff",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: selectedPayment ? "pointer" : "not-allowed",
                                                fontWeight: 600,
                                                "&:hover": { background: selectedPayment ? "#5566d9" : "#d1d1d6" }
                                              }}
                                            >
                                              {selectedPayment === 'apple' ? 'Pay with ' : ''}Confirm & Pay
                                            </Box>
                                          </Box>
                                        </Box>
                                      )}
                                    </Box>
                                  );
                                  }
                                  
                                  return hotels.map((hotel, idx) => (
                                  <Box
                                    key={hotel.roomKey || idx}
                                    sx={{
                                      p: "4px 5px",
                                      background: "#fafafa",
                                      border: "1px solid #e0e0e0",
                                      borderRadius: "3px",
                                      mb: "2px",
                                      transition: "all 0.15s",
                                      animation: `fadeIn 0.4s ease-out ${idx * 0.1}s both`,
                                      position: "relative",
                                      overflow: "hidden",
                                      "&:hover": { borderColor: "#667eea" }
                                    }}
                                  >
                                    {/* SOLD OUT Overlay Animation */}
                                    {hotel.roomKey && soldOutRooms[hotel.roomKey] && (
                                      <Box sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        background: "rgba(255, 59, 48, 0.95)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 10,
                                        animation: "slideInLeft 0.3s ease-out",
                                        borderRadius: "6px"
                                      }}>
                                        <Box sx={{ fontSize: "16px", fontWeight: 900, color: "#ffffff", letterSpacing: "2px", animation: "pulse 0.5s infinite" }}>
                                          SOLD OUT
                                        </Box>
                                      </Box>
                                    )}
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "6px" }}>
                                      <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: "4px", mb: "1px" }}>
                                          <Box sx={{ fontSize: "9px", fontWeight: 600, color: "#1d1d1f" }}>
                                            {hotel.name}
                                          </Box>
                                          {hotel.source && (
                                            <Box component="span" sx={{ fontSize: "6px", p: "1px 3px", background: "#f5f5f7", color: "#86868b", borderRadius: "2px", fontWeight: 600, whiteSpace: "nowrap" }}>
                                              {hotel.source}
                                            </Box>
                                          )}
                                        </Box>
                                        <Box sx={{ fontSize: "7px", color: "#86868b" }}>
                                          {hotel.features ? hotel.features.join(' · ') : (hotel.type || `${hotel.match}% match`)}
                                        </Box>
                                        <Box sx={{ fontSize: "7px", color: "#86868b", mt: "2px", display: "flex", alignItems: "center", gap: "3px" }}>
                                          {inventoryChange[hotel.roomKey] && (
                                            <Box component="span" sx={{ fontSize: "8px", fontWeight: 900, color: inventoryChange[hotel.roomKey] === 'up' ? "#34c759" : "#ff3b30" }}>
                                              {inventoryChange[hotel.roomKey] === 'up' ? '▲' : '▼'}
                                            </Box>
                                          )}
                                          <Box component="span" sx={{ fontSize: "7px", color: hotel.available && hotel.available.includes('1 ') ? "#ff3b30" : hotel.available && hotel.available.includes('2 ') ? "#ff9500" : "#34c759", fontWeight: 600 }}>
                                            {hotel.available || ''}
                                          </Box>
                                          {hotel.lastBooked && (
                                            <>
                                              <Box component="span" sx={{ color: "#d1d1d6" }}>·</Box>
                                              <Box component="span">Last booked {hotel.lastBooked}</Box>
                                            </>
                                          )}
                                        </Box>
                                      </Box>
                                      <Box sx={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                                        <Box sx={{ textAlign: "right" }}>
                                          <Box sx={{ fontSize: "10px", fontWeight: 600, color: "#1d1d1f" }}>
                                            {hotel.price}
                                          </Box>
                                          {hotel.priceNum && hotel.currentPrice && hotel.nights && (
                                            <Box sx={{ fontSize: "7px", color: hotel.priceNum > hotel.currentPrice ? "#ff9500" : "#34c759", fontWeight: 600 }}>
                                              {hotel.priceNum > hotel.currentPrice ? '+' : ''}{hotel.priceNum - hotel.currentPrice > 0 ? '+$' : '-$'}{Math.abs((hotel.priceNum - hotel.currentPrice) * hotel.nights)}
                                            </Box>
                                          )}
                                        </Box>
                                        <Box
                                          component="button"
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedHotel(hotel);
                                            setConfirmingHotelIdx(idx);
                                            setShowPayment(true);
                                          }}
                                          disabled={confirmingHotelIdx === idx && !showPayment}
                                          sx={{
                                            fontSize: "8px",
                                            p: "2px 6px",
                                            background: confirmingHotelIdx === idx && !showPayment ? "#34c759" : "#667eea",
                                            color: "#ffffff",
                                            border: "none",
                                            borderRadius: "3px",
                                            cursor: confirmingHotelIdx === idx && !showPayment ? "default" : "pointer",
                                            fontWeight: 600,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "3px",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                              background: confirmingHotelIdx === idx && !showPayment ? "#34c759" : "#5566d9"
                                            }
                                          }}
                                        >
                                          {confirmingHotelIdx === idx && !showPayment ? (
                                            <>
                                              <Box sx={{ width: "6px", height: "6px", border: "1.5px solid #ffffff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                                              <Box component="span">...</Box>
                                            </>
                                          ) : (
                                            'Select'
                                          )}
                                        </Box>
                                      </Box>
                                    </Box>
                                  </Box>
                                  ));
                                })()}
                              </Box>
                            )}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>

          </Box>
        )}

        {/* DREAM FLOW - Renders inline in shell card above, not as separate view */}
        {false && showDreamFlow && selectedShell && (
          <Box sx={{ flex: 1, overflow: "auto", p: "16px", background: "#fafafa" }}>
            <Box sx={{ maxWidth: "700px", m: "0 auto" }}>
              
              {/* Current Shell Reference */}
              <Box sx={{ p: "10px 12px", background: "#ffffff", border: "1px solid #d0d0d0", borderRadius: "8px", mb: "12px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Box sx={{ fontSize: "16px" }}>{selectedShell.icon}</Box>
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ fontSize: "11px", fontWeight: 600, color: "#6e6e73", textTransform: "uppercase", mb: "2px" }}>
                    Amending
                  </Box>
                  <Box sx={{ fontSize: "13px", fontWeight: 600, color: "#1d1d1f" }}>
                    {selectedShell.name}
                  </Box>
                </Box>
                <Box sx={{ fontSize: "10px", p: "3px 8px", background: "#34c759", color: "#ffffff", borderRadius: "4px", fontWeight: 600 }}>
                  {selectedShell.status}
                </Box>
              </Box>

              {/* AI Assistant Bar */}
              <Box
                onClick={() => setDreamFlowExpanded(!dreamFlowExpanded)}
                sx={{
                  background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  borderRadius: "8px",
                  p: "12px",
                  cursor: "pointer",
                  position: "relative",
                  mb: "12px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  boxShadow: dreamFlowExpanded ? "0 4px 16px rgba(250, 112, 154, 0.3)" : "0 2px 8px rgba(250, 112, 154, 0.2)",
                  animation: "fadeIn 0.5s ease-out"
                }}
              >
                {/* Animated shimmer effect */}
                <Box sx={{ position: "absolute", top: 0, left: "-100%", width: "100%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 3s infinite" }} />
                {/* Future Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(10px)",
                    padding: "3px 8px",
                    borderRadius: "12px",
                    fontSize: "9px",
                    fontWeight: "600",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}
                >
                  🔮 FUTURE
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
                  <Box
                    sx={{ 
                      fontSize: "18px",
                      animation: "pulse 2s ease-in-out infinite",
                      filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))"
                    }}
                  >
                    🤖
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ fontSize: "13px", fontWeight: "600", color: "#ffffff", marginBottom: "3px" }}>
                      Natural Language Amendment
                    </Box>
                    <Box sx={{ fontSize: "11px", color: "rgba(255,255,255,0.9)" }}>
                      {dreamFlowExpanded ? "Tell us what you want to change..." : "✨ AI-powered smart amendments"}
                    </Box>
                  </Box>
                  <Box
                    sx={{ 
                      fontSize: "12px", 
                      color: "#ffffff", 
                      fontWeight: "500",
                      transition: "transform 0.3s ease"
                    }}
                  >
                    {dreamFlowExpanded ? "▼" : "▶"}
                  </Box>
                </Box>
              </Box>

              {/* Expanded Content */}
              {dreamFlowExpanded && (
                <Box sx={{ animation: "slideDown 0.4s ease-out" }}>
                  {/* Natural Language Input */}
                  <Box
                    sx={{
                      background: "#ffffff",
                      border: "1px solid #d0d0d0",
                      borderRadius: "8px",
                      padding: "12px",
                      marginBottom: "10px"
                    }}
                  >
                    <Box
                      component="textarea"
                      value={nlInput}
                      onChange={(e) => setNlInput(e.target.value)}
                      placeholder="e.g., 'Change to 5-star beachfront hotel with pool'"
                      sx={{
                        width: "100%",
                        minHeight: "60px",
                        padding: "8px 10px",
                        fontSize: "13px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        resize: "vertical",
                        boxSizing: "border-box",
                        marginBottom: "8px"
                      }}
                    />
                    <Box
                      component="button"
                      onClick={() => {}}
                      sx={{
                        padding: "6px 14px",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#ffffff",
                        background: "background.default",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      ✨ Find Smart Options
                    </Box>
                  </Box>

                  {/* Quick Examples */}
                  <Box
                    sx={{
                      background: "#f5f5f7",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      marginBottom: "10px"
                    }}
                  >
                    <Box sx={{ fontSize: "11px", fontWeight: "600", color: "#1d1d1f", marginBottom: "6px" }}>
                      💡 Try: 
                    </Box>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {["Upgrade to luxury", "Cheaper alternative", "Beachfront property"].map((ex, idx) => (
                        <Box
                          component="button"
                          key={idx}
                          onClick={() => setNlInput(ex)}
                          sx={{
                            fontSize: "10px",
                            padding: "4px 8px",
                            background: "#ffffff",
                            border: "1px solid #d0d0d0",
                            borderRadius: "4px",
                            color: "#667eea",
                            cursor: "pointer",
                            fontWeight: "500"
                          }}
                        >
                          "{ex}"
                        </Box>
                      ))}
                    </Box>
                  </Box>

                  {/* Technical Constraints */}
                  <Box
                    sx={{
                      background: "#fff3cd",
                      border: "1px solid #ffc107",
                      borderRadius: "6px",
                      padding: "8px 10px"
                    }}
                  >
                  <Box sx={{ fontSize: "10px", color: "#856404", lineHeight: "1.5" }}>
                    <Box component="span" sx={{ fontWeight: 600 }}>⚠️ Why not built:</Box> No NLP/AI infrastructure, complex cross-system dependencies, real-time availability requirements
                  </Box>
                  </Box>

                  {/* Close Dream Flow Button */}
                  <Box
                    component="button"
                    onClick={() => setShowDreamFlow(false)}
                    sx={{
                      marginTop: "10px",
                      width: "100%",
                      padding: "6px 14px",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "#6e6e73",
                      background: "#f8f9fa",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Close Dream Flow
                  </Box>
                </Box>
              )}

            </Box>
          </Box>
        )}

        {/* Search Results View */}
        {showSearchResults && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: "#f5f5f7",
              overflow: "hidden"
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #e0e0e0",
                px: 2.5,
                py: 1.75,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2
              }}
            >
              {/* Breadcrumb Steps */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                {[
                  { label: "Search", active: true },
                  { label: "Review", active: false },
                  { label: "Travellers", active: false },
                  { label: "Payment", active: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: "6px",
                        background: step.active ? "action.hover" : "transparent",
                        color: step.active ? "text.primary" : "text.secondary",
                        fontSize: "13px",
                        fontWeight: step.active ? 600 : 400
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: step.active ? "text.primary" : "divider",
                          color: "background.paper",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: 600
                        }}
                      >
                        {index + 1}
                      </Box>
                      {step.label}
                    </Box>
                    {index < array.length - 1 && (
                      <Box sx={{ color: "divider", fontSize: "12px" }}>→</Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => {
                    setShowSearchResults(false);
                    setIsSearchModalOpen(true);
                  }}
                  sx={{
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "text.secondary",
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "6px",
                    cursor: "pointer",
                    "&:hover": { background: "action.hover" }
                  }}
                >
                  Back to Search
                </Box>
                <Box
                  component="button"
                  type="button"
                  onClick={resetOldFlow}
                  sx={{
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "text.secondary",
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "6px",
                    cursor: "pointer",
                    "&:hover": { background: "action.hover" }
                  }}
                >
                  Cancel amendment
                </Box>
              </Box>
            </Box>

            {/* Results Container */}
            <Box sx={{ flex: 1, overflow: "auto" }}>
              <Box sx={{ maxWidth: "900px", mx: "auto", p: 2 }}>
                <Typography variant="body2" sx={{ color: "#6e6e73", mb: 2.5 }}>
                  Found 8 available hotels
                </Typography>

                {/* Hotel Results */}
                {[
                  { name: "Hilton Hawaiian Village", price: "$289", rating: "4.5", reviews: "2,341", image: "🏨" },
                  { name: "Royal Hawaiian Resort", price: "$425", rating: "4.7", reviews: "1,892", image: "🏨" },
                  { name: "Moana Surfrider", price: "$350", rating: "4.6", reviews: "1,567", image: "🏨" },
                  { name: "Sheraton Waikiki", price: "$315", rating: "4.4", reviews: "3,112", image: "🏨" },
                  { name: "Hyatt Regency Waikiki", price: "$298", rating: "4.5", reviews: "2,789", image: "🏨" },
                  { name: "Outrigger Reef Waikiki", price: "$275", rating: "4.3", reviews: "1,456", image: "🏨" },
                  { name: "Alohilani Resort", price: "$340", rating: "4.6", reviews: "987", image: "🏨" },
                  { name: "The Laylow", price: "$265", rating: "4.4", reviews: "654", image: "🏨" }
                ].map((hotel, index) => (
                  <Box
                    key={index}
                    sx={{
                      background: "background.paper",
                      borderRadius: "8px",
                      p: 2,
                      mb: 1.5,
                      display: "flex",
                      gap: 2,
                      border: "1px solid",
                      borderColor: "divider"
                    }}
                  >
                    {/* Hotel Image Placeholder */}
                    <Box
                      sx={{
                        width: "120px",
                        height: "90px",
                        background: "background.default",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        flexShrink: 0
                      }}
                    >
                      {hotel.image}
                    </Box>

                    {/* Hotel Details */}
                    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5, color: "#1d1d1f" }}>
                        {hotel.name}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>★ {hotel.rating}</Typography>
                        <Typography variant="caption" sx={{ color: "#6e6e73" }}>
                          ({hotel.reviews} reviews)
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: "#6e6e73", mb: 1 }}>
                        Waikiki Beach · Free WiFi · Pool · Ocean View
                      </Typography>
                      <Box sx={{ mt: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                          <Typography component="span" variant="caption" sx={{ color: "#6e6e73" }}>
                            From{" "}
                          </Typography>
                          <Typography component="span" variant="subtitle1" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                            {hotel.price}
                          </Typography>
                          <Typography component="span" variant="caption" sx={{ color: "#6e6e73" }}>
                            {" "} /night
                          </Typography>
                        </Box>
                        <Box 
                          component="button"
                          onClick={() => setSelectedHotel(hotel)}
                          sx={{
                            padding: "8px 20px",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "text.primary",
                            background: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: "6px",
                            cursor: "pointer",
                            "&:hover": { background: "action.hover" }
                          }}
                        >
                          Select Room
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Footer Bar - Shows when hotel selected */}
            {selectedHotel && (
              <Box
                sx={{
                  background: "#ffffff",
                  borderTop: "2px solid #e0e0e0",
                  px: 2.5,
                  py: 1.75,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
                }}
              >
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#1d1d1f", mb: 0.25 }}>
                    {selectedHotel.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6e6e73" }}>
                    5 nights · 2 rooms
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="caption" sx={{ color: "#6e6e73" }}>
                      Total Price
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                      ${parseInt(selectedHotel.price.replace('$', '')) * 5}
                    </Typography>
                  </Box>
                  <Box 
                    component="button"
                    onClick={() => {
                      showLoadingThen('Preparing your booking details...', () => {
                        setShowSearchResults(false);
                        setShowCartPage(true);
                      }, 4000);
                    }}
                    sx={{
                      padding: "12px 32px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#ffffff",
                      background: "#34c759",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(52, 199, 89, 0.3)"
                    }}
                  >
                    Add to Cart
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Cart Page View */}
        {showCartPage && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: "#f5f5f7",
              overflow: "hidden"
            }}
          >
            {/* Header */}
            <Box
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #e0e0e0",
                px: 2.5,
                py: 1.75,
                flexShrink: 0
              }}
            >
              {/* Breadcrumb Steps */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {[
                  { label: "Search", active: false, completed: true },
                  { label: "Review", active: true, completed: false },
                  { label: "Travellers", active: false, completed: false },
                  { label: "Payment", active: false, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: "6px",
                        background: step.active ? "action.hover" : "transparent",
                        color: step.active ? "text.primary" : "text.secondary",
                        fontSize: "13px",
                        fontWeight: step.active ? 600 : 400
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: step.active ? "text.primary" : step.completed ? "text.secondary" : "divider",
                          color: "background.paper",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: 600
                        }}
                      >
                        {step.completed ? "✓" : index + 1}
                      </Box>
                      {step.label}
                    </Box>
                    {index < array.length - 1 && (
                      <Box sx={{ color: "divider", fontSize: "12px" }}>→</Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>

            {/* Cart Content */}
            <Box
              sx={{
                flex: 1,
                overflow: "auto"
              }}
            >
              <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
                
                {/* Selected Hotel Card */}
                <Box
                  sx={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    marginBottom: "20px",
                    border: "1px solid #e0e0e0"
                  }}
                >
                  <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                    New Hotel Selection
                  </Box>
                  <Box sx={{ display: "flex", gap: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                    <Box
                      sx={{
                        width: "100px",
                        height: "75px",
                        background: "background.default",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0
                      }}
                    >
                      {selectedHotel.image}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box component="h4" sx={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
                        {selectedHotel.name}
                      </Box>
                      <Box sx={{ fontSize: "13px", color: "#6e6e73", marginBottom: "4px" }}>
                        ★ {selectedHotel.rating} ({selectedHotel.reviews} reviews)
                      </Box>
                      <Box sx={{ fontSize: "13px", color: "#6e6e73" }}>
                        May 15-20, 2024 · 5 nights · 2 rooms
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Box sx={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>
                        ${parseInt(selectedHotel.price.replace('$', '')) * 5}
                      </Box>
                      <Box sx={{ fontSize: "12px", color: "#6e6e73" }}>
                        {selectedHotel.price}/night
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Price Breakdown */}
                  <Box sx={{ marginTop: "16px" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6e6e73", marginBottom: "8px" }}>
                    <Box component="span">{selectedHotel.price} × 5 nights × 2 rooms</Box>
                    <Box component="span">${parseInt(selectedHotel.price.replace('$', '')) * 5 * 2}</Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6e6e73", marginBottom: "8px" }}>
                    <Box component="span">Taxes & fees</Box>
                    <Box component="span">${Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12)}</Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#ff3b30", marginBottom: "12px" }}>
                    <Box component="span">Amendment fee</Box>
                    <Box component="span">$45</Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "600", color: "#1d1d1f", paddingTop: "12px", borderTop: "2px solid #e0e0e0" }}>
                    <Box component="span">Total</Box>
                    <Box component="span">${parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12) + 45}</Box>
                  </Box>
                  </Box>
                </Box>

                {/* Travellers Summary */}
                <Box
                  sx={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    marginBottom: "20px",
                    border: "1px solid #e0e0e0"
                  }}
                >
                  <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                    Travellers (2 selected)
                  </Box>
                  <Box sx={{ fontSize: "13px", color: "#6e6e73" }}>
                    <Box component="span" sx={{ display: "block" }}>• John Smith</Box>
                    <Box component="span" sx={{ display: "block" }}>• Sarah Smith</Box>
                  </Box>
                </Box>

                {/* Amendment Summary */}
                <Box
                  sx={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    border: "1px solid #e0e0e0"
                  }}
                >
                  <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                    Amendment Details
                  </Box>
                  <Box sx={{ fontSize: "13px", color: "#6e6e73", lineHeight: "1.6" }}>
                    <Box component="span" sx={{ display: "block" }}>
                      <Box component="span" sx={{ fontWeight: 600 }}>Reason:</Box> Found better accommodation
                    </Box>
                    <Box component="span" sx={{ display: "block" }}>
                      <Box component="span" sx={{ fontWeight: 600 }}>Type:</Box> Client request
                    </Box>
                    <Box component="span" sx={{ display: "block" }}>
                      <Box component="span" sx={{ fontWeight: 600 }}>Amendment fee:</Box> $45
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Footer with Checkout Button */}
            <Box
              sx={{
                background: "#ffffff",
                borderTop: "2px solid #e0e0e0",
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => {
                    setShowCartPage(false);
                    setShowSearchResults(true);
                  }}
                  sx={{
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "text.secondary",
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    cursor: "pointer",
                    "&:hover": { background: "action.hover" }
                  }}
                >
                  Back to Results
                </Box>
                <Box
                  component="button"
                  type="button"
                  onClick={resetOldFlow}
                  sx={{
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "text.secondary",
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    cursor: "pointer",
                    "&:hover": { background: "action.hover" }
                  }}
                >
                  Cancel amendment
                </Box>
              </Box>
              <Box>
                <Box sx={{ fontSize: "12px", color: "#6e6e73", marginBottom: "2px" }}>
                  Total Amount
                </Box>
                <Box sx={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>
                  ${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12) + 45}
                </Box>
              </Box>
              <Box 
                component="button"
                onClick={() => {
                  showLoadingThen('Loading traveller information...', () => {
                    setShowCartPage(false);
                    setShowTravellersPage(true);
                  }, 3500);
                }}
                sx={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                  "&:hover": { backgroundColor: "primary.dark" }
                }}
              >
                Proceed to Travellers →
              </Box>
            </Box>
          </Box>
        )}

        {/* Travellers Page */}
        {showTravellersPage && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: "#f5f5f7",
              overflow: "hidden"
            }}
          >
            <Box
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #e0e0e0",
                px: 2.5,
                py: 1.75,
                flexShrink: 0
              }}
            >
              {/* Breadcrumb Steps */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {[
                  { label: "Search", active: false, completed: true },
                  { label: "Review", active: false, completed: true },
                  { label: "Travellers", active: true, completed: false },
                  { label: "Payment", active: false, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: "6px",
                        background: step.active ? "action.hover" : "transparent",
                        color: step.active ? "text.primary" : "text.secondary",
                        fontSize: "13px",
                        fontWeight: step.active ? 600 : 400
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: step.active ? "text.primary" : step.completed ? "text.secondary" : "divider",
                          color: "background.paper",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: 600
                        }}
                      >
                        {step.completed ? "✓" : index + 1}
                      </Box>
                      {step.label}
                    </Box>
                    {index < array.length - 1 && (
                      <Box sx={{ color: "divider", fontSize: "12px" }}>→</Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflow: "auto" }}>
              <Box sx={{ maxWidth: "700px", margin: "0 auto", padding: "16px" }}>
                {[
                  { name: "John Smith", email: "john@example.com", passport: "US123456" },
                  { name: "Sarah Smith", email: "sarah@example.com", passport: "US789012" }
                ].map((traveller, index) => (
                  <Box
                    key={index}
                    sx={{
                      background: "#ffffff",
                      borderRadius: "10px",
                      padding: "16px",
                      marginBottom: "16px",
                      border: "1px solid #e0e0e0"
                    }}
                  >
                    <Box component="h3" sx={{ fontSize: "14px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                      Traveller {index + 1}
                    </Box>
                    <Box sx={{ fontSize: "13px", color: "#6e6e73", lineHeight: "1.8" }}>
                      <Box component="span" sx={{ display: "block" }}>
                        <Box component="span" sx={{ fontWeight: 600 }}>Name:</Box> {traveller.name}
                      </Box>
                      <Box component="span" sx={{ display: "block" }}>
                        <Box component="span" sx={{ fontWeight: 600 }}>Email:</Box> {traveller.email}
                      </Box>
                      <Box component="span" sx={{ display: "block" }}>
                        <Box component="span" sx={{ fontWeight: 600 }}>Passport:</Box> {traveller.passport}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box
              sx={{
                background: "#ffffff",
                borderTop: "2px solid #e0e0e0",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => {
                    setShowTravellersPage(false);
                    setShowCartPage(true);
                  }}
                  sx={{
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "text.secondary",
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    cursor: "pointer",
                    "&:hover": { background: "action.hover" }
                  }}
                >
                  Back to Review
                </Box>
                <Box
                  component="button"
                  type="button"
                  onClick={resetOldFlow}
                  sx={{
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "text.secondary",
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    cursor: "pointer",
                    "&:hover": { background: "action.hover" }
                  }}
                >
                  Cancel amendment
                </Box>
              </Box>
              <Box 
                component="button"
                onClick={() => {
                  showLoadingThen('Loading payment form...', () => {
                    setShowTravellersPage(false);
                    setShowPaymentPage(true);
                  }, 3800);
                }}
                sx={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                  "&:hover": { backgroundColor: "primary.dark" }
                }}
              >
                Go to Payment →
              </Box>
            </Box>
          </Box>
        )}

        {/* Payment Page */}
        {showPaymentPage && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: "#f5f5f7",
              overflow: "hidden"
            }}
          >
            <Box
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #e0e0e0",
                px: 2.5,
                py: 1.75,
                flexShrink: 0
              }}
            >
              {/* Breadcrumb Steps */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {[
                  { label: "Search", active: false, completed: true },
                  { label: "Review", active: false, completed: true },
                  { label: "Travellers", active: false, completed: true },
                  { label: "Payment", active: true, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        px: 1.5,
                        py: 0.75,
                        borderRadius: "6px",
                        background: step.active ? "action.hover" : "transparent",
                        color: step.active ? "text.primary" : "text.secondary",
                        fontSize: "13px",
                        fontWeight: step.active ? 600 : 400
                      }}
                    >
                      <Box
                        sx={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: step.active ? "text.primary" : step.completed ? "text.secondary" : "divider",
                          color: "background.paper",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: 600
                        }}
                      >
                        {step.completed ? "✓" : index + 1}
                      </Box>
                      {step.label}
                    </Box>
                    {index < array.length - 1 && (
                      <Box sx={{ color: "divider", fontSize: "12px" }}>→</Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflow: "auto" }}>
              <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: "16px" }}>
                <Box
                  sx={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    border: "1px solid #e0e0e0"
                  }}
                >
                  <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 20px 0", color: "#1d1d1f" }}>
                    Credit Card Details
                  </Box>
                  
                  <Box sx={{ marginBottom: "16px" }}>
                    <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                      Card Number
                    </Box>
                    <Box
                      component="input"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      sx={{
                        width: "100%",
                        padding: "8px 10px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                    <Box sx={{ flex: 1 }}>
                      <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Expiry Date
                      </Box>
                      <Box
                        component="input"
                        type="text"
                        placeholder="MM/YY"
                        sx={{
                          width: "100%",
                          padding: "8px 10px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        CVV
                      </Box>
                      <Box
                        component="input"
                        type="text"
                        placeholder="123"
                        sx={{
                          width: "100%",
                          padding: "8px 10px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </Box>
                  </Box>

                  <Box sx={{ marginBottom: "16px" }}>
                    <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                      Cardholder Name
                    </Box>
                    <Box
                      component="input"
                      type="text"
                      placeholder="John Smith"
                      sx={{
                        width: "100%",
                        padding: "8px 10px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    marginTop: "20px",
                    border: "1px solid #e0e0e0"
                  }}
                >
                  <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                    Payment Summary
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#6e6e73", marginBottom: "8px" }}>
                    <Box component="span">Hotel booking</Box>
                    <Box component="span">${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 5 * 2}</Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#6e6e73", marginBottom: "8px" }}>
                    <Box component="span">Taxes & fees</Box>
                    <Box component="span">${selectedHotel && Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12)}</Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#ff3b30", marginBottom: "12px" }}>
                    <Box component="span">Amendment fee</Box>
                    <Box component="span">$45</Box>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "600", color: "#1d1d1f", paddingTop: "12px", borderTop: "2px solid #e0e0e0" }}>
                    <Box component="span">Total Due</Box>
                    <Box component="span">${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 5 * 2 * 0.12) + 45}</Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                background: "#ffffff",
                borderTop: "2px solid #e0e0e0",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => {
                    setShowPaymentPage(false);
                    setShowTravellersPage(true);
                  }}
                  sx={{
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "text.secondary",
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    cursor: "pointer",
                    "&:hover": { background: "action.hover" }
                  }}
                >
                  Back to Travellers
                </Box>
                <Box
                  component="button"
                  type="button"
                  onClick={resetOldFlow}
                  sx={{
                    padding: "10px 18px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "text.secondary",
                    background: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "8px",
                    cursor: "pointer",
                    "&:hover": { background: "action.hover" }
                  }}
                >
                  Cancel amendment
                </Box>
              </Box>
              <Box 
                component="button"
                onClick={() => {
                  showLoadingThen('Processing payment and updating booking...', () => {
                    setShowPaymentPage(false);
                    setHotelAmended(true);
                    setActiveTab('itinerary');
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 4000);
                  }, 7000);
                }}
                sx={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    backgroundColor: "primary.dark"
                  }
                }}
              >
                Confirm Payment ✓
              </Box>
            </Box>
          </Box>
        )}

        {/* NEW FLOW - Step 1: Combined Amendment + Travellers + Search */}
        {showNewFlow && newFlowStep === 1 && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: "#f5f5f7",
              overflow: "hidden"
            }}
          >
            <Box
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #e0e0e0",
                padding: "14px 20px",
                flexShrink: 0
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Details", active: true },
                  { label: "Select Hotel", active: false },
                  { label: "Checkout", active: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: step.active ? "action.hover" : "transparent",
                        color: step.active ? "text.primary" : "text.secondary",
                        fontSize: "13px",
                        fontWeight: step.active ? "600" : "400"
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: step.active ? "text.primary" : "divider",
                          color: "background.paper",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: "600"
                        }}
                      >
                        {index + 1}
                      </Box>
                      {step.label}
                    </Box>
                    {index < array.length - 1 && (
                      <Box sx={{ color: "divider", fontSize: "12px" }}>→</Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflow: "auto" }}>
              <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
                
                {/* Amendment Fee Notice */}
                <Box
                  sx={{
                    background: "#fff8e1",
                    border: "1px solid #ffc107",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "20px"
                  }}
                >
                <Box sx={{ fontSize: "14px", color: "#856404", marginBottom: "4px" }}>
                  <Box component="span" sx={{ fontWeight: 600 }}>Amendment Fee:</Box> $45
                </Box>
                  <Box sx={{ fontSize: "13px", color: "#856404" }}>
                    This fee covers the cost of modifying your existing booking
                  </Box>
                </Box>

                {/* Travellers Section */}
                <Box
                  sx={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    marginBottom: "20px",
                    border: "1px solid #e0e0e0"
                  }}
                >
                  <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                    Select Travellers
                  </Box>
                  {[
                    { name: "John Smith", email: "john@example.com" },
                    { name: "Sarah Smith", email: "sarah@example.com" },
                    { name: "Emily Smith", email: "emily@example.com" },
                    { name: "Michael Smith", email: "michael@example.com" }
                  ].map((traveller, index) => (
                    <Box
                      component="label"
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 10px",
                        marginBottom: "8px",
                        border: "1px solid #e0e0e0",
                        borderRadius: "6px",
                        cursor: "pointer",
                        background: index < 2 ? "#f0f8ff" : "transparent"
                      }}
                    >
                      <Box
                        component="input"
                        type="checkbox"
                        defaultChecked={index < 2}
                        sx={{ marginRight: "12px", width: "18px", height: "18px" }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ fontSize: "14px", fontWeight: "500", color: "#1d1d1f" }}>
                          {traveller.name}
                        </Box>
                        <Box sx={{ fontSize: "12px", color: "#6e6e73" }}>
                          {traveller.email}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Search Parameters */}
                <Box
                  sx={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    padding: "16px",
                    border: "1px solid #e0e0e0"
                  }}
                >
                  <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                    Search Parameters
                  </Box>
                  
                  <Box sx={{ marginBottom: "16px" }}>
                    <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                      Destination
                    </Box>
                    <Box
                      component="input"
                      type="text"
                      defaultValue="Honolulu, Hawaii"
                      sx={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "6px",
                        background: "#ffffff",
                        color: "#1d1d1f",
                        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                        boxSizing: "border-box"
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", gap: "12px" }}>
                    <Box sx={{ flex: 1 }}>
                      <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Check-in Date
                      </Box>
                      <Box
                        component="input"
                        type="date"
                        defaultValue="2024-05-15"
                        sx={{
                          width: "100%",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          background: "#ffffff",
                          color: "#1d1d1f",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Check-out Date
                      </Box>
                      <Box
                        component="input"
                        type="date"
                        defaultValue="2024-05-20"
                        sx={{
                          width: "100%",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          background: "#ffffff",
                          color: "#1d1d1f",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                background: "#ffffff",
                borderTop: "2px solid #e0e0e0",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
              }}
            >
              <Box
                component="button"
                onClick={() => setShowNewFlow(false)}
                sx={{
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6e6e73",
                  background: "#f5f5f7",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Cancel
              </Box>
              <Box
                component="button"
                onClick={() => {
                  showLoadingThen('Searching available hotels...', () => {
                    setNewFlowStep(2);
                  }, 3500);
                }}
                sx={{
                  padding: "12px 32px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Search Hotels →
              </Box>
            </Box>
          </Box>
        )}

        {/* NEW FLOW - Step 2: Search Results */}
        {showNewFlow && newFlowStep === 2 && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: "#f5f5f7",
              overflow: "hidden"
            }}
          >
            <Box
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #e0e0e0",
                padding: "14px 20px",
                flexShrink: 0
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Details", active: false, completed: true },
                  { label: "Select Hotel", active: true, completed: false },
                  { label: "Checkout", active: false, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: step.active ? "action.hover" : "transparent",
                        color: step.active ? "text.primary" : "text.secondary",
                        fontSize: "13px",
                        fontWeight: step.active ? "600" : "400"
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: step.active ? "text.primary" : step.completed ? "text.secondary" : "divider",
                          color: "background.paper",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: "600"
                        }}
                      >
                        {step.completed ? "✓" : index + 1}
                      </Box>
                      {step.label}
                    </Box>
                    {index < array.length - 1 && (
                      <Box sx={{ color: "divider", fontSize: "12px" }}>→</Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflow: "auto" }}>
              <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: "16px" }}>
                
                {/* Pre-selected Hotel - Expanded */}
                {(() => {
                  const preSelectedHotel = { name: "Royal Hawaiian Resort", price: "$425", rating: "4.7", reviews: "1,892", image: "🏨" };
                  if (!selectedHotel) {
                    setSelectedHotel(preSelectedHotel);
                  }
                  const currentHotel = selectedHotel || preSelectedHotel;
                  
                  return (
                    <Box
                      sx={{
                        background: "#e3f2fd",
                        borderRadius: "10px",
                        padding: "16px",
                        marginBottom: "20px",
                        border: "2px solid #0071e3"
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "12px"
                        }}
                      >
                        <Box
                          sx={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: "#0071e3",
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "12px",
                            fontWeight: "bold"
                          }}
                        >
                          ✓
                        </Box>
                        <Box component="span" sx={{ fontSize: "13px", fontWeight: "600", color: "#0071e3" }}>
                          Selected
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", gap: "16px" }}>
                        <Box
                          sx={{
                            width: "140px",
                            height: "105px",
                            background: "background.default",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                            flexShrink: 0
                          }}
                        >
                          {currentHotel.image}
                        </Box>

                        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                          <Box component="h3" sx={{ fontSize: "17px", fontWeight: "600", margin: "0 0 8px 0", color: "#1d1d1f" }}>
                            {currentHotel.name}
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                            <Box component="span" sx={{ fontSize: "14px", color: "#f5a623" }}>★ {currentHotel.rating}</Box>
                            <Box component="span" sx={{ fontSize: "13px", color: "#6e6e73" }}>({currentHotel.reviews} reviews)</Box>
                          </Box>
                          <Box component="p" sx={{ fontSize: "13px", color: "#6e6e73", margin: "0 0 12px 0" }}>
                            Waikiki Beach · Free WiFi · Pool · Ocean View · Beachfront
                          </Box>
                          <Box sx={{ marginTop: "auto" }}>
                            <Box component="span" sx={{ fontSize: "13px", color: "#6e6e73" }}>From </Box>
                            <Box component="span" sx={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>{currentHotel.price}</Box>
                            <Box component="span" sx={{ fontSize: "13px", color: "#6e6e73" }}> /night</Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                })()}

                {/* Show Other Hotels Section */}
                <Box>
                  <Box
                    component="button"
                    onClick={() => setShowOtherHotels(!showOtherHotels)}
                    sx={{
                      width: "100%",
                      padding: "14px 20px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#0071e3",
                      background: "#ffffff",
                      border: "1px solid #e0e0e0",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      marginBottom: showOtherHotels ? "16px" : "0"
                    }}
                  >
                    {showOtherHotels ? "Hide" : "Show"} Other Hotels
                    <Box component="span" sx={{ fontSize: "12px" }}>{showOtherHotels ? "▲" : "▼"}</Box>
                  </Box>

                  {showOtherHotels && (
                    <Box>
                      {[
                        { name: "Hilton Hawaiian Village", price: "$289", rating: "4.5", reviews: "2,341", image: "🏨" },
                        { name: "Moana Surfrider", price: "$350", rating: "4.6", reviews: "1,567", image: "🏨" },
                        { name: "Sheraton Waikiki", price: "$315", rating: "4.4", reviews: "3,112", image: "🏨" },
                        { name: "Hyatt Regency Waikiki", price: "$298", rating: "4.5", reviews: "2,789", image: "🏨" }
                      ].map((hotel, index) => (
                        <Box
                          key={index}
                          sx={{
                            background: "#ffffff",
                            borderRadius: "8px",
                            padding: "16px",
                            marginBottom: "12px",
                            display: "flex",
                            gap: "16px",
                            border: "1px solid #e0e0e0",
                            cursor: "pointer"
                          }}
                          onClick={() => {
                            setSelectedHotel(hotel);
                            setShowOtherHotels(false);
                          }}
                        >
                          <Box
                            sx={{
                              width: "100px",
                              height: "75px",
                              background: "background.default",
                              borderRadius: "6px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "20px",
                              flexShrink: 0
                            }}
                          >
                            {hotel.image}
                          </Box>

                          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <Box component="h3" sx={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
                              {hotel.name}
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <Box component="span" sx={{ fontSize: "13px", color: "#f5a623" }}>★ {hotel.rating}</Box>
                              <Box component="span" sx={{ fontSize: "12px", color: "#6e6e73" }}>({hotel.reviews} reviews)</Box>
                            </Box>
                            <Box component="p" sx={{ fontSize: "12px", color: "#6e6e73", margin: "0 0 8px 0" }}>
                              Waikiki Beach · Free WiFi · Pool · Ocean View
                            </Box>
                            <Box sx={{ marginTop: "auto" }}>
                              <Box component="span" sx={{ fontSize: "12px", color: "#6e6e73" }}>From </Box>
                              <Box component="span" sx={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>{hotel.price}</Box>
                              <Box component="span" sx={{ fontSize: "12px", color: "#6e6e73" }}> /night</Box>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            {/* Footer with Continue Button */}
            <Box
              sx={{
                background: "#ffffff",
                borderTop: "2px solid #e0e0e0",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "flex-end",
                boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
              }}
            >
              <Box
                component="button"
                onClick={() => {
                  showLoadingThen('Preparing checkout...', () => {
                    setNewFlowStep(3);
                  }, 1500);
                }}
                sx={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    backgroundColor: "primary.dark"
                  }
                }}
              >
                Continue to Checkout →
              </Box>
            </Box>
          </Box>
        )}

        {/* NEW FLOW - Step 3: Checkout (Summary + Travellers + Payment) */}
        {showNewFlow && newFlowStep === 3 && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              background: "#f5f5f7",
              overflow: "hidden"
            }}
          >
            <Box
              sx={{
                background: "#ffffff",
                borderBottom: "1px solid #e0e0e0",
                padding: "14px 20px",
                flexShrink: 0
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {[
                  { label: "Details", active: false, completed: true },
                  { label: "Select Hotel", active: false, completed: true },
                  { label: "Checkout", active: true, completed: false }
                ].map((step, index, array) => (
                  <React.Fragment key={index}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        background: step.active ? "action.hover" : "transparent",
                        color: step.active ? "text.primary" : "text.secondary",
                        fontSize: "13px",
                        fontWeight: step.active ? "600" : "400"
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          background: step.active ? "text.primary" : step.completed ? "text.secondary" : "divider",
                          color: "background.paper",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "11px",
                          fontWeight: "600"
                        }}
                      >
                        {step.completed ? "✓" : index + 1}
                      </Box>
                      {step.label}
                    </Box>
                    {index < array.length - 1 && (
                      <Box sx={{ color: "divider", fontSize: "12px" }}>→</Box>
                    )}
                  </React.Fragment>
                ))}
              </Box>
            </Box>

            <Box sx={{ flex: 1, overflow: "auto" }}>
              <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: "16px", display: "flex", gap: "24px" }}>
                
                {/* Left Column - Summary */}
                <Box sx={{ flex: 2 }}>
                  {/* Booking Summary */}
                  <Box
                    sx={{
                      background: "#ffffff",
                      borderRadius: "10px",
                      padding: "16px",
                      marginBottom: "20px",
                      border: "1px solid #e0e0e0"
                    }}
                  >
                    <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                      Booking Summary
                    </Box>
                    <Box sx={{ display: "flex", gap: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f0f0" }}>
                      <Box
                        sx={{
                          width: "80px",
                          height: "60px",
                          background: "background.default",
                          borderRadius: "6px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px",
                          flexShrink: 0
                        }}
                      >
                        {selectedHotel?.image}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box component="h4" sx={{ fontSize: "14px", fontWeight: "600", margin: "0 0 4px 0", color: "#1d1d1f" }}>
                          {selectedHotel?.name}
                        </Box>
                        <Box sx={{ fontSize: "13px", color: "#6e6e73" }}>
                          May 15-20, 2024 · 5 nights · 2 rooms
                        </Box>
                      </Box>
                    </Box>
                    
                    <Box sx={{ marginTop: "16px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6e6e73", marginBottom: "8px" }}>
                      <Box component="span">{selectedHotel?.price} × 5 nights × 2 rooms</Box>
                      <Box component="span">${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 10}</Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6e6e73", marginBottom: "8px" }}>
                      <Box component="span">Taxes & fees</Box>
                      <Box component="span">${selectedHotel && Math.round(parseInt(selectedHotel.price.replace('$', '')) * 10 * 0.12)}</Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#ff3b30", marginBottom: "12px" }}>
                      <Box component="span">Amendment fee</Box>
                      <Box component="span">$45</Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "16px", fontWeight: "600", color: "#1d1d1f", paddingTop: "12px", borderTop: "2px solid #e0e0e0" }}>
                      <Box component="span">Total</Box>
                      <Box component="span">${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 10 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 10 * 0.12) + 45}</Box>
                    </Box>
                    </Box>
                  </Box>

                  {/* Travellers */}
                  <Box
                    sx={{
                      background: "#ffffff",
                      borderRadius: "10px",
                      padding: "16px",
                      border: "1px solid #e0e0e0"
                    }}
                  >
                    <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: "#1d1d1f" }}>
                      Travellers
                    </Box>
                    <Box sx={{ fontSize: "13px", color: "#6e6e73", lineHeight: "1.8" }}>
                      <Box component="span" sx={{ display: "block" }}>• John Smith (john@example.com)</Box>
                      <Box component="span" sx={{ display: "block" }}>• Sarah Smith (sarah@example.com)</Box>
                    </Box>
                  </Box>
                </Box>

                {/* Right Column - Payment */}
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      background: "#ffffff",
                      borderRadius: "10px",
                      padding: "16px",
                      border: "1px solid #e0e0e0"
                    }}
                  >
                    <Box component="h3" sx={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: "#1d1d1f" }}>
                      Payment Details
                    </Box>
                    
                    <Box sx={{ marginBottom: "16px" }}>
                      <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Card Number
                      </Box>
                      <Box
                        component="input"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        sx={{
                          width: "100%",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </Box>

                    <Box sx={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                      <Box sx={{ flex: 1 }}>
                        <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                          Expiry
                        </Box>
                        <Box
                          component="input"
                          type="text"
                          placeholder="MM/YY"
                          sx={{
                            width: "100%",
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d0d0d0",
                            borderRadius: "6px",
                            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                            boxSizing: "border-box"
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                          CVV
                        </Box>
                        <Box
                          component="input"
                          type="text"
                          placeholder="123"
                          sx={{
                            width: "100%",
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d0d0d0",
                            borderRadius: "6px",
                            fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                            boxSizing: "border-box"
                          }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ marginBottom: "16px" }}>
                      <Box component="label" sx={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px", color: "#1d1d1f" }}>
                        Cardholder Name
                      </Box>
                      <Box
                        component="input"
                        type="text"
                        placeholder="John Smith"
                        sx={{
                          width: "100%",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d0d0d0",
                          borderRadius: "6px",
                          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                          boxSizing: "border-box"
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                background: "#ffffff",
                borderTop: "2px solid #e0e0e0",
                padding: "20px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 -4px 12px rgba(0,0,0,0.1)"
              }}
            >
              <Box>
                <Box sx={{ fontSize: "12px", color: "#6e6e73", marginBottom: "2px" }}>
                  Total Amount
                </Box>
                <Box sx={{ fontSize: "16px", fontWeight: "600", color: "#1d1d1f" }}>
                  ${selectedHotel && parseInt(selectedHotel.price.replace('$', '')) * 10 + Math.round(parseInt(selectedHotel.price.replace('$', '')) * 10 * 0.12) + 45}
                </Box>
              </Box>
              <Box
                component="button"
                onClick={() => {
                  showLoadingThen('Processing payment...', () => {
                    setShowNewFlow(false);
                    setNewFlowStep(1);
                    setHotelAmended(true);
                    setActiveTab('itinerary');
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 4000);
                  }, 3000);
                }}
                sx={{
                  padding: "14px 40px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                  "&:hover": {
                    backgroundColor: "primary.dark"
                  }
                }}
              >
                Confirm & Pay →
              </Box>
            </Box>
          </Box>
        )}

        {activeTab === 'payments' && (
          <Box sx={{ flex: 1, overflow: "auto", p: 2, background: "#fafafa" }}>
            <Box
              sx={{
                p: "40px 24px",
                textAlign: "center",
                background: "#ffffff",
                border: "1px solid #d0d0d0",
                borderRadius: "8px"
              }}
            >
              <Box sx={{ fontSize: "24px", mb: 2 }}>💳</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: "#1d1d1f" }}>
                Payments Screen
              </Typography>
              <Typography variant="body2" sx={{ color: "#6e6e73" }}>
                Separate screen for payment management
              </Typography>
            </Box>
          </Box>
        )}

        {activeTab === 'documents' && (
          <Box sx={{ flex: 1, overflow: "auto", p: 2, background: "#fafafa" }}>
            <Box
              sx={{
                p: "40px 24px",
                textAlign: "center",
                background: "#ffffff",
                border: "1px solid #d0d0d0",
                borderRadius: "8px"
              }}
            >
              <Box sx={{ fontSize: "24px", mb: 2 }}>📄</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: "#1d1d1f" }}>
                Documents Screen
              </Typography>
              <Typography variant="body2" sx={{ color: "#6e6e73" }}>
                Separate screen for document management
              </Typography>
            </Box>
          </Box>
        )}

        {activeTab === 'notes' && (
          <Box sx={{ flex: 1, overflow: "auto", p: 2, background: "#fafafa" }}>
            <Box
              sx={{
                p: "40px 24px",
                textAlign: "center",
                background: "#ffffff",
                border: "1px solid #d0d0d0",
                borderRadius: "8px"
              }}
            >
              <Box sx={{ fontSize: "24px", mb: 2 }}>📝</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: "#1d1d1f" }}>
                Notes Screen
              </Typography>
              <Typography variant="body2" sx={{ color: "#6e6e73" }}>
                Separate screen for trip notes
              </Typography>
            </Box>
          </Box>
        )}

        {activeTab === 'history' && (
          <Box sx={{ flex: 1, overflow: "auto", p: 2, background: "#fafafa" }}>
            <Box
              sx={{
                p: "40px 24px",
                textAlign: "center",
                background: "#ffffff",
                border: "1px solid #d0d0d0",
                borderRadius: "8px"
              }}
            >
              <Box sx={{ fontSize: "24px", mb: 2 }}>🗂️</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: "#1d1d1f" }}>
                History Screen
              </Typography>
              <Typography variant="body2" sx={{ color: "#6e6e73" }}>
                Timeline of amendments and updates
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Amendment Modal */}
      {isAmendModalOpen && (
        <Box sx={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 200
        }}>
          <Box sx={{
            background: "#ffffff",
            borderRadius: "10px",
            width: "500px",
            maxWidth: "90vw",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }}>
            {/* Modal Header */}
            <Box sx={{
              px: 3,
              py: 2.5,
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                Amend {selectedShell?.type}
              </Typography>
              <IconButton
                onClick={() => setIsAmendModalOpen(false)}
                aria-label="Close amend modal"
                size="small"
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#e0e0e0",
                  color: "#666",
                  "&:hover": { background: "#d5d5d5" }
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Modal Content */}
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  mb: 2.5,
                  p: "6px 10px",
                  backgroundColor: "action.selected",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75
                }}
              >
                <Box component="span" sx={{ fontSize: "14px" }}>
                  {selectedShell?.icon || "🏨"}
                </Box>
                <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
                  {selectedShell?.name}
                </Box>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  · {selectedShell?.type}
                </Box>
              </Box>

              {/* Question 1: Reason for Amendment */}
              <Box sx={{ marginBottom: "20px" }}>
                <FormControl fullWidth size="small">
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
                    Reason for Amendment <Box component="span" sx={{ color: "text.secondary" }}>*</Box>
                  </Typography>
                  <Select
                    id="amendment-reason"
                    value={reasonForAmendment}
                    displayEmpty
                    onChange={(e) => setReasonForAmendment(String(e.target.value))}
                    renderValue={(selected) =>
                      selected ? (
                        getOptionLabel(reasonOptions, selected)
                      ) : (
                        <Box sx={{ color: "text.secondary" }}>Select reason...</Box>
                      )
                    }
                    sx={{
                      backgroundColor: "background.paper",
                      pr: 4,
                      "& .MuiSelect-icon": {
                        right: 10
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "divider"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "text.secondary"
                      }
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select reason...
                    </MenuItem>
                    {reasonOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Question 2: Type of Amendment */}
              <Box sx={{ marginBottom: "24px" }}>
                <FormControl fullWidth size="small">
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
                    Type of Amendment <Box component="span" sx={{ color: "text.secondary" }}>*</Box>
                  </Typography>
                  <Select
                    id="amendment-type"
                    value={causeOfAmendment}
                    displayEmpty
                    onChange={(e) => setCauseOfAmendment(String(e.target.value))}
                    renderValue={(selected) =>
                      selected ? (
                        getOptionLabel(amendmentTypeOptions, selected)
                      ) : (
                        <Box sx={{ color: "text.secondary" }}>Select type...</Box>
                      )
                    }
                    sx={{
                      backgroundColor: "background.paper",
                      pr: 4,
                      "& .MuiSelect-icon": {
                        right: 10
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "divider"
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "text.secondary"
                      }
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select type...
                    </MenuItem>
                    {amendmentTypeOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Warning Message - Shows when both answers selected */}
              {isAmendFormComplete && (
                <Box
                  sx={{
                    padding: "12px 14px",
                    background: "background.default",
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "6px",
                    marginBottom: "20px"
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ fontSize: "12px", color: "text.secondary", fontWeight: 600 }}>
                      Amendment Fee
                    </Box>
                    <Box sx={{ fontSize: "15px", fontWeight: 700, color: "text.primary" }}>
                      $45.00
                    </Box>
                  </Box>
                </Box>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                <Box
                  component="span"
                  role="button"
                  tabIndex={0}
                  onClick={() => setIsAmendModalOpen(false)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setIsAmendModalOpen(false);
                    }
                  }}
                  sx={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "text.secondary",
                    background: "transparent",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "inline-flex",
                    alignItems: "center",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  Cancel
                </Box>
                <Box
                  component="span"
                  role="button"
                  aria-disabled={!isAmendFormComplete}
                  tabIndex={isAmendFormComplete ? 0 : -1}
                  onClick={() => {
                    if (!isAmendFormComplete) return;
                    showLoadingThen('Loading traveller selection...', () => {
                      setIsAmendModalOpen(false);
                      setIsTravellersModalOpen(true);
                    }, 3000);
                  }}
                  onKeyDown={(event) => {
                    if (!isAmendFormComplete) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      showLoadingThen('Loading traveller selection...', () => {
                        setIsAmendModalOpen(false);
                        setIsTravellersModalOpen(true);
                      }, 3000);
                    }
                  }}
                  sx={{
                    padding: "10px 20px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: (!isAmendFormComplete) ? "text.disabled" : "primary.contrastText",
                    backgroundColor: (!isAmendFormComplete) ? "action.disabledBackground" : "primary.main",
                    border: "none",
                    borderRadius: "6px",
                    cursor: (!isAmendFormComplete) ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    display: "inline-flex",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: (!isAmendFormComplete) ? "action.disabledBackground" : "primary.dark"
                    },
                    opacity: 1
                  }}
                >
                  Continue to Travellers →
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Travellers Modal */}
      {isTravellersModalOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: "10px",
              width: "600px",
              maxWidth: "90vw",
              maxHeight: "80vh",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Modal Header */}
            <Box
              sx={{
                padding: "20px 24px",
                borderBottom: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Box
                component="h3"
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: 0,
                  color: "text.primary"
                }}
              >
                Adjust Travellers
              </Box>
              <Box
                component="button"
                onClick={() => setIsTravellersModalOpen(false)}
                aria-label="Close travellers modal"
                sx={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "none",
                  background: "action.hover",
                  color: "text.secondary",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ✕
              </Box>
            </Box>

            {/* Modal Content */}
            <Box sx={{ flex: 1, overflow: "auto", padding: "16px" }}>
              <Box
                sx={{
                  marginBottom: "20px",
                  padding: "6px 10px",
                  backgroundColor: "action.selected",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75
                }}
              >
                <Box component="span" sx={{ fontSize: "14px" }}>
                  {selectedShell?.icon || "🏨"}
                </Box>
                <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
                  {selectedShell?.name}
                </Box>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  · {selectedShell?.type}
                </Box>
              </Box>

              <Box
                component="h4"
                sx={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "#1d1d1f"
                }}
              >
                Select Travellers for Amendment
              </Box>

              {/* Traveller List */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {['John Smith (Adult)', 'Jane Smith (Adult)', 'Emily Smith (Child - 12)', 'Max Smith (Child - 8)'].map((traveller, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: "8px 10px",
                      background: "#ffffff",
                      border: "1px solid #d0d0d0",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}
                  >
                    <Box
                      component="input"
                      type="checkbox"
                      defaultChecked={true}
                      sx={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer"
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ fontSize: "14px", fontWeight: "500", color: "#1d1d1f" }}>
                        {traveller}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

            </Box>

            {/* Modal Footer */}
            <Box
              sx={{
                padding: "20px 24px",
                borderTop: "1px solid #e0e0e0",
                display: "flex",
                gap: "12px",
                justifyContent: "space-between"
              }}
            >
              <Box
                component="button"
                onClick={() => {
                  setIsTravellersModalOpen(false);
                  setIsAmendModalOpen(true);
                }}
                sx={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6e6e73",
                  background: "#f5f5f7",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                ← Back
              </Box>
              <Box
                component="button"
                onClick={() => {
                  showLoadingThen('Loading search form...', () => {
                    setIsTravellersModalOpen(false);
                    setIsSearchModalOpen(true);
                  }, 3000);
                }}
                sx={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "primary.contrastText",
                  backgroundColor: "primary.main",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                  "&:hover": {
                    backgroundColor: "primary.dark"
                  }
                }}
              >
                Continue to Search →
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Search Parameters Modal */}
      {isSearchModalOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200
          }}
        >
          <Box
            sx={{
              background: "#ffffff",
              borderRadius: "10px",
              width: "600px",
              maxWidth: "90vw",
              maxHeight: "80vh",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {/* Modal Header */}
            <Box
              sx={{
                padding: "20px 24px",
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              }}
            >
              <Box
                component="h3"
                sx={{
                  fontSize: "18px",
                  fontWeight: "600",
                  margin: 0,
                  color: "#1d1d1f"
                }}
              >
                Search Parameters
              </Box>
              <Box
                component="button"
                onClick={() => setIsSearchModalOpen(false)}
                aria-label="Close search modal"
                sx={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  border: "none",
                  background: "#e0e0e0",
                  color: "#666",
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                ✕
              </Box>
            </Box>

            {/* Modal Content */}
            <Box sx={{ flex: 1, overflow: "auto", padding: "16px" }}>
              <Box
                sx={{
                  marginBottom: "20px",
                  padding: "6px 10px",
                  backgroundColor: "action.selected",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75
                }}
              >
                <Box component="span" sx={{ fontSize: "14px" }}>
                  {selectedShell?.icon || "🏨"}
                </Box>
                <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>
                  {selectedShell?.name}
                </Box>
                <Box component="span" sx={{ color: "text.secondary" }}>
                  · {selectedShell?.type}
                </Box>
              </Box>

              {/* Destination */}
              <Box sx={{ marginBottom: "20px" }}>
                <Box
                  component="label"
                  sx={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#1d1d1f"
                  }}
                >
                  Destination
                </Box>
                <Box
                  component="input"
                  type="text"
                  defaultValue="Honolulu, Hawaii"
                  sx={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </Box>

              {/* Check-in Date */}
              <Box sx={{ marginBottom: "20px" }}>
                <Box
                  component="label"
                  sx={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#1d1d1f"
                  }}
                >
                  Check-in Date
                </Box>
                <Box
                  component="input"
                  type="date"
                  defaultValue="2024-05-15"
                  sx={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </Box>

              {/* Check-out Date */}
              <Box sx={{ marginBottom: "20px" }}>
                <Box
                  component="label"
                  sx={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#1d1d1f"
                  }}
                >
                  Check-out Date
                </Box>
                <Box
                  component="input"
                  type="date"
                  defaultValue="2024-05-20"
                  sx={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d0d0d0",
                    borderRadius: "6px",
                    background: "#ffffff",
                    color: "#1d1d1f",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    boxSizing: "border-box"
                  }}
                />
              </Box>
            </Box>

            {/* Modal Footer */}
            <Box
              sx={{
                padding: "20px 24px",
                borderTop: "1px solid #e0e0e0",
                display: "flex",
                gap: "12px",
                justifyContent: "space-between"
              }}
            >
              <Box
                component="button"
                onClick={() => {
                  setIsSearchModalOpen(false);
                  setIsTravellersModalOpen(true);
                }}
                sx={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#6e6e73",
                  background: "#f5f5f7",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                ← Back
              </Box>
              <Box
                component="button"
                onClick={() => {
                  showLoadingThen('Searching available hotels...', () => {
                    setIsSearchModalOpen(false);
                    setShowSearchResults(true);
                  }, 6500);
                }}
                sx={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#ffffff",
                  background: "#0071e3",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif"
                }}
              >
                Search Availability →
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* DREAM FLOW - Will render inline in the shell cards below */}
      {false && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            overflow: "hidden",
            position: "relative"
          }}
        >
          {/* Future Vision Badge */}
          <Box
            sx={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "20px",
              padding: "6px 12px",
              fontSize: "11px",
              fontWeight: "600",
              color: "#ffffff",
              zIndex: 10
            }}
          >
            🔮 FUTURE VISION
          </Box>

          {/* Header */}
          <Box
            sx={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              padding: "16px 20px"
            }}
          >
            <Box sx={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginBottom: "4px" }}>
              Natural Language Amendment Assistant
            </Box>
            <Box sx={{ fontSize: "12px", color: "rgba(255,255,255,0.9)" }}>
              Just tell us what you want to change - AI handles the rest
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, overflow: "auto", padding: "20px" }}>
            <Box sx={{ maxWidth: "700px", margin: "0 auto" }}>
              
              {/* Current Booking Reference */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "16px",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Box sx={{ fontSize: "16px" }}>📌</Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ fontSize: "11px", fontWeight: "600", color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px" }}>
                      Amending
                    </Box>
                    <Box sx={{ fontSize: "13px", fontWeight: "600", color: "#1d1d1f" }}>
                      {selectedShell ? selectedShell.name : 'Royal Hawaiian Resort'}
                    </Box>
                    <Box sx={{ fontSize: "12px", color: "#6e6e73" }}>
                      {selectedShell ? selectedShell.type : 'Hotel'} · May 15-20, 2024 · {selectedShell ? selectedShell.price : '$2,450'}
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Box
                      sx={{
                        fontSize: "10px",
                        padding: "3px 8px",
                        background: "#34c759",
                        color: "#ffffff",
                        borderRadius: "4px",
                        fontWeight: "600"
                      }}
                    >
                      Confirmed
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              {/* Natural Language Input */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "10px",
                  padding: "20px",
                  marginBottom: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                }}
              >
                <Box sx={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "12px" }}>
                  What would you like to change?
                </Box>
                <Box
                  component="textarea"
                  value={nlInput}
                  onChange={(e) => setNlInput(e.target.value)}
                  placeholder="e.g., 'Change hotel to 5-star near beach with pool and ocean view' or 'Upgrade to luxury hotel, adjust car to match'"
                  sx={{
                    width: "100%",
                    minHeight: "80px",
                    padding: "12px",
                    fontSize: "14px",
                    border: "2px solid #d0d0d0",
                    borderRadius: "8px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                    resize: "vertical",
                    boxSizing: "border-box"
                  }}
                />
                <Box
                  component="button"
                  onClick={() => setDreamFlowStep(2)}
                  sx={{
                    marginTop: "12px",
                    padding: "8px 16px",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "#ffffff",
                    background: "background.default",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)"
                  }}
                >
                  ✨ Analyze & Find Options
                </Box>
              </Box>

              {/* Example Queries */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                }}
              >
                <Box sx={{ fontSize: "12px", fontWeight: "600", color: "#1d1d1f", marginBottom: "10px" }}>
                  💡 Try these examples:
                </Box>
                {[
                  "Change to cheaper hotel, similar quality",
                  "Upgrade hotel to luxury beachfront",
                  "Move entire trip forward 2 days",
                  "Add family suite with kitchen"
                ].map((example, idx) => (
                  <Box
                    component="button"
                    key={idx}
                    onClick={() => setNlInput(example)}
                    sx={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "8px 12px",
                      marginBottom: "6px",
                      fontSize: "12px",
                      color: "#667eea",
                      background: "#f5f5f7",
                      border: "1px solid #e0e0e0",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
                      "&:hover": {
                        background: "#e8e8ed"
                      }
                    }}
                  >
                    "{example}"
                  </Box>
                ))}
              </Box>

              {/* Why This Couldn't Be Built */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "10px",
                  padding: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                }}
              >
                <Box sx={{ display: "flex", gap: "12px" }}>
                  <Box sx={{ fontSize: "16px" }}>⚠️</Box>
                  <Box>
                    <Box sx={{ fontSize: "12px", fontWeight: "600", color: "#1d1d1f", marginBottom: "6px" }}>
                      Technical Constraints
                    </Box>
                    <Box sx={{ fontSize: "12px", color: "#6e6e73", lineHeight: "1.5", marginBottom: "8px" }}>
                      This vision couldn't be implemented due to:
                    </Box>
                    <Box component="ul" sx={{ margin: 0, paddingLeft: "16px", fontSize: "11px", color: "#6e6e73", lineHeight: "1.6" }}>
                      <Box component="li">No NLP/AI infrastructure for natural language processing</Box>
                      <Box component="li">Complex dependency resolution across multiple booking systems</Box>
                      <Box component="li">Real-time availability checks required across all providers</Box>
                      <Box component="li">Pricing calculation engine not flexible enough for dynamic scenarios</Box>
                      <Box component="li">Legacy system architecture couldn't support automated workflows</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              padding: "16px 20px",
              display: "flex",
              gap: "12px",
              justifyContent: "flex-end"
            }}
          >
            <Box
              component="button"
              onClick={() => setShowDreamFlow(false)}
              sx={{
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#ffffff",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "6px",
                cursor: "pointer",
                backdropFilter: "blur(10px)"
              }}
            >
              Close
            </Box>
          </Box>
        </Box>
      )}

      {false && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            overflow: "hidden",
            position: "relative"
          }}
        >
          {/* Future Vision Badge */}
          <Box
            sx={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "20px",
              padding: "6px 12px",
              fontSize: "11px",
              fontWeight: "600",
              color: "#ffffff",
              zIndex: 10
            }}
          >
            🔮 FUTURE VISION
          </Box>

          {/* Header */}
          <Box
            sx={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
              padding: "16px 20px"
            }}
          >
            <Box sx={{ fontSize: "16px", fontWeight: "600", color: "#ffffff", marginBottom: "4px" }}>
              AI Amendment Recommendations
            </Box>
            <Box sx={{ fontSize: "12px", color: "rgba(255,255,255,0.9)" }}>
              Based on: "{nlInput || 'your request'}"
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, overflow: "auto", padding: "20px" }}>
            <Box sx={{ maxWidth: "700px", margin: "0 auto" }}>
              
              {/* Current Booking Reference */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "16px",
                  border: "1px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Box sx={{ fontSize: "16px" }}>📌</Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ fontSize: "11px", fontWeight: "600", color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px" }}>
                      Current Selection
                    </Box>
                    <Box sx={{ fontSize: "13px", fontWeight: "600", color: "#1d1d1f" }}>
                      {selectedShell ? selectedShell.name : 'Royal Hawaiian Resort'}
                    </Box>
                    <Box sx={{ fontSize: "12px", color: "#6e6e73" }}>
                      {selectedShell ? selectedShell.type : 'Hotel'} · May 15-20, 2024 · {selectedShell ? selectedShell.price : '$2,450'}
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Box
                      sx={{
                        fontSize: "10px",
                        padding: "3px 8px",
                        background: "#34c759",
                        color: "#ffffff",
                        borderRadius: "4px",
                        fontWeight: "600"
                      }}
                    >
                      Current
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              {/* AI Understanding */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                }}
              >
                <Box sx={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                  <Box sx={{ fontSize: "20px" }}>🤖</Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "4px" }}>
                      AI Interpretation
                    </Box>
                    <Box sx={{ fontSize: "13px", color: "#6e6e73", lineHeight: "1.5" }}>
                      Detected: <Box component="span" sx={{ fontWeight: 600 }}>Hotel upgrade</Box> · Looking for luxury beachfront properties with pools and ocean views
                    </Box>
                  </Box>
                </Box>

                {/* Impact Analysis */}
                <Box
                  sx={{
                    background: "#fff3cd",
                    border: "1px solid #ffc107",
                    borderRadius: "6px",
                    padding: "10px",
                    fontSize: "12px",
                    color: "#856404"
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 600 }}>Auto-detected impacts:</Box> Car rental location adjusted · Transfer times updated · Activity schedules verified
                </Box>
              </Box>

              {/* Smart Hotel Recommendations */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                }}
              >
                <Box sx={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "12px" }}>
                  Recommended Hotels (AI-Ranked)
                </Box>

                {[
                  {
                    name: "Four Seasons Resort Hualalai",
                    price: "$850",
                    rating: 4.9,
                    match: 98,
                    badge: "Perfect Match",
                    badgeColor: "#34c759",
                    features: ["Beachfront", "Infinity Pool", "Ocean View", "5-Star Luxury"]
                  },
                  {
                    name: "Fairmont Orchid",
                    price: "$625",
                    rating: 4.7,
                    match: 92,
                    badge: "Best Value",
                    badgeColor: "#0071e3",
                    features: ["Beach Access", "Pool", "Ocean View", "Spa"]
                  },
                  {
                    name: "Grand Hyatt Kauai",
                    price: "$580",
                    rating: 4.6,
                    match: 87,
                    badge: "Budget Option",
                    badgeColor: "#ff9500",
                    features: ["Near Beach", "Pool", "Partial View"]
                  }
                ].map((hotel, idx) => (
                  <Box
                    key={idx}
                    onClick={() => {
                      setSelectedHotel(hotel);
                      showLoadingThen('Applying changes & updating dependencies...', () => {
                        setHotelAmended(true);
                        setShowDreamFlow(false);
                        setShowSuccessToast(true);
                        setTimeout(() => setShowSuccessToast(false), 3000);
                      }, 1500);
                    }}
                    sx={{
                      padding: "12px",
                      background: idx === 0 ? "background.default" : "background.paper",
                      border: idx === 0 ? "2px solid #667eea" : "1px solid #d0d0d0",
                      borderRadius: "8px",
                      marginBottom: "10px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      position: "relative",
                      "&:hover": idx !== 0 ? { borderColor: "#fa709a" } : {}
                    }}
                  >
                    {/* Badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        background: hotel.badgeColor,
                        color: "#ffffff",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: "600"
                      }}
                    >
                      {hotel.badge}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", paddingRight: "90px" }}>
                      <Box>
                        <Box sx={{ fontSize: "14px", fontWeight: "600", color: "#1d1d1f", marginBottom: "3px" }}>
                          {hotel.name}
                        </Box>
                        <Box sx={{ fontSize: "12px", color: "#f5a623" }}>
                          ★ {hotel.rating} · {hotel.match}% match to your request
                        </Box>
                      </Box>
                    </Box>

                    {/* Features */}
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                      {hotel.features.map((feature, fIdx) => (
                        <Box
                          key={fIdx}
                          sx={{
                            fontSize: "10px",
                            padding: "3px 6px",
                            background: idx === 0 ? "rgba(250, 112, 154, 0.1)" : "#f5f5f7",
                            color: idx === 0 ? "#fa709a" : "#6e6e73",
                            borderRadius: "4px",
                            fontWeight: "500"
                          }}
                        >
                          ✓ {feature}
                        </Box>
                      ))}
                    </Box>

                    {/* Price Comparison */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px", borderTop: "1px solid #f0f0f0" }}>
                      <Box sx={{ fontSize: "11px", color: "#6e6e73" }}>
                        <Box component="span" sx={{ textDecoration: "line-through" }}>$490</Box>
                        <Box
                          component="span"
                          sx={{
                            color: parseInt(hotel.price.replace('$','')) > 490 ? "#ff3b30" : "#34c759",
                            fontWeight: "600",
                            marginLeft: "6px"
                          }}
                        >
                          {hotel.price} /night
                        </Box>
                      </Box>
                      <Box sx={{ fontSize: "11px", fontWeight: "600", color: parseInt(hotel.price.replace('$','')) > 490 ? "#ff3b30" : "#34c759" }}>
                        {parseInt(hotel.price.replace('$','')) > 490 ? '+' : '-'}${Math.abs(parseInt(hotel.price.replace('$','')) - 490)} /night
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* Auto-Detected Dependencies */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "10px",
                  padding: "16px",
                  marginBottom: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                }}
              >
                <Box sx={{ fontSize: "13px", fontWeight: "600", color: "#1d1d1f", marginBottom: "10px" }}>
                  🔗 Dependencies Auto-Adjusted
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { item: "Car Rental Pickup", change: "Updated to new hotel location", icon: "🚗" },
                    { item: "Airport Transfer", change: "Time adjusted for new location", icon: "🚕" },
                    { item: "Pearl Harbor Tour", change: "Verified compatibility with new hotel", icon: "🎯" }
                  ].map((dep, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: "flex",
                        gap: "10px",
                        padding: "8px",
                        background: "#f5f5f7",
                        borderRadius: "6px"
                      }}
                    >
                      <Box sx={{ fontSize: "16px" }}>{dep.icon}</Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ fontSize: "12px", fontWeight: "600", color: "#1d1d1f" }}>
                          {dep.item}
                        </Box>
                        <Box sx={{ fontSize: "11px", color: "#6e6e73" }}>
                          {dep.change}
                        </Box>
                      </Box>
                      <Box sx={{ fontSize: "16px", color: "#34c759" }}>✓</Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Technical Constraints */}
              <Box
                sx={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "10px",
                  padding: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)"
                }}
              >
                <Box sx={{ display: "flex", gap: "12px" }}>
                  <Box sx={{ fontSize: "16px" }}>⚠️</Box>
                  <Box>
                    <Box sx={{ fontSize: "12px", fontWeight: "600", color: "#1d1d1f", marginBottom: "6px" }}>
                      Why This Remained a Concept
                    </Box>
                    <Box sx={{ fontSize: "12px", color: "#6e6e73", lineHeight: "1.5", marginBottom: "8px" }}>
                      This natural language approach required:
                    </Box>
                    <Box component="ul" sx={{ margin: 0, paddingLeft: "16px", fontSize: "11px", color: "#6e6e73", lineHeight: "1.6" }}>
                      <Box component="li">Advanced NLP/AI infrastructure not available in legacy platform</Box>
                      <Box component="li">Complex cross-system dependency resolution engine</Box>
                      <Box component="li">Real-time availability aggregation across all providers</Box>
                      <Box component="li">Intelligent pricing optimization algorithms</Box>
                      <Box component="li">Automated workflow orchestration beyond current capabilities</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

            </Box>
          </Box>

          {/* Footer */}
          <Box
            sx={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              padding: "16px 20px",
              display: "flex",
              gap: "12px",
              justifyContent: "space-between"
            }}
          >
            <Box
              component="button"
              onClick={() => setDreamFlowStep(1)}
              sx={{
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#ffffff",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "6px",
                cursor: "pointer",
                backdropFilter: "blur(10px)"
              }}
            >
              ← Back
            </Box>
            <Box
              component="button"
              onClick={() => setShowDreamFlow(false)}
              sx={{
                padding: "7px 16px",
                fontSize: "13px",
                fontWeight: "500",
                color: "#ffffff",
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "6px",
                cursor: "pointer",
                backdropFilter: "blur(10px)"
              }}
            >
              Close
            </Box>
          </Box>
        </Box>
      )}

      {/* Loading Modal */}
      {showLoadingModal && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 300,
            backdropFilter: "blur(4px)"
          }}
        >
          <Box
            sx={{
              background: "#ffffff",
              borderRadius: "10px",
              padding: "32px 40px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              minWidth: "320px"
            }}
          >
            {/* Spinner */}
            <Box
              sx={{
                width: "48px",
                height: "48px",
                border: "4px solid #f0f0f0",
                borderTop: "4px solid #0071e3",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}
            />
            
            {/* Loading Message */}
            <Box
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: "#1d1d1f",
                textAlign: "center"
              }}
            >
              {loadingMessage}
            </Box>
          </Box>
        </Box>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <Box
          sx={{
            position: "fixed",
            top: "24px",
            right: "24px",
            background: "#34c759",
            color: "#ffffff",
            padding: "14px 20px",
            borderRadius: "10px",
            boxShadow: "0 8px 24px rgba(52, 199, 89, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            zIndex: 400,
            animation: "slideInRight 0.3s ease-out"
          }}
        >
          <Box
            sx={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#ffffff",
              color: "#34c759",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              fontWeight: "bold"
            }}
          >
            ✓
          </Box>
          <Box>
            <Box sx={{ fontSize: "14px", fontWeight: "600", marginBottom: "2px" }}>
              Amendment Completed
            </Box>
            <Box sx={{ fontSize: "13px", opacity: 0.9 }}>
              Hotel booking has been successfully updated
            </Box>
          </Box>
        </Box>
      )}

      <GlobalStyles
        styles={{
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" }
          },
          "@keyframes slideInRight": {
            "0%": { transform: "translateX(400px)", opacity: 0 },
            "100%": { transform: "translateX(0)", opacity: 1 }
          },
          "@keyframes shake": {
            "0%, 100%": { transform: "translateX(0)" },
            "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-3px)" },
            "20%, 40%, 60%, 80%": { transform: "translateX(3px)" }
          },
          "@keyframes pulse": {
            "0%, 100%": { transform: "scale(1)", opacity: 1 },
            "50%": { transform: "scale(1.05)", opacity: 0.9 }
          },
          "@keyframes shimmer": {
            "0%": { left: "-100%" },
            "100%": { left: "100%" }
          },
          "@keyframes slideDown": {
            "0%": { opacity: 0, transform: "translateY(-10px)" },
            "100%": { opacity: 1, transform: "translateY(0)" }
          },
          "@keyframes fadeIn": {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 }
          }
        }}
      />
    </Box>
  );
};

export default AmendmentsFlowDemo;



