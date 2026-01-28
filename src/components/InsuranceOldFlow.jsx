import React, { useState } from 'react';
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  GlobalStyles,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const InsuranceOldFlow = ({ onBackToCaseStudy, onClose, zIndex = 99, onDragStart, position }) => {
  const [activeTab, setActiveTab] = useState('booking');
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  // Old Flow States
  const [showOldFlow, setShowOldFlow] = useState(false);
  const [oldFlowStep, setOldFlowStep] = useState(1);
  
  // New Flow States
  const [showNewFlow, setShowNewFlow] = useState(false);
  const [newFlowStep, setNewFlowStep] = useState(1);
  
  // Dream Flow States
  const [showDreamFlow, setShowDreamFlow] = useState(false);
  const [dreamFlowExpanded, setDreamFlowExpanded] = useState(false);
  
  const [showFlowMenu, setShowFlowMenu] = useState(false);
  const [insuranceAdded, setInsuranceAdded] = useState(false);
  const [selectedCoverage, setSelectedCoverage] = useState(null);
  const [confirmingInsuranceIdx, setConfirmingInsuranceIdx] = useState(null);

  const showLoadingThen = (message, callback, duration = 1500) => {
    setLoadingMessage(message);
    setShowLoadingModal(true);
    setTimeout(() => {
      callback();
      setShowLoadingModal(false);
    }, duration);
  };

  const bookingData = {
    bookingRef: "FC-2024-558",
    customer: "Sarah Johnson",
    destination: "Paris, France",
    startDate: "June 15, 2024",
    endDate: "June 22, 2024",
    travelers: 2,
    totalCost: "$4,850"
  };

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
            Travel insurance integration
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
                    onBackToCaseStudy?.();
                  }
                }}
                inputProps={{ "aria-label": "Interactive demo toggle" }}
              />
            }
          />

          <IconButton
            onClick={onClose}
            aria-label="Close Insurance Demo"
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

      {/* Tab Navigation */}
      {!showOldFlow && !showNewFlow && !showDreamFlow && (
        <Box sx={{ borderBottom: "1px solid", borderColor: "divider", backgroundColor: "action.hover" }}>
          <Tabs
            value={activeTab}
            onChange={(event, value) => setActiveTab(value)}
            aria-label="Insurance demo tabs"
            textColor="primary"
            indicatorColor="primary"
            sx={{ minHeight: 0, px: 1 }}
          >
            {['booking', 'payments', 'documents'].map((tab) => (
              <Tab
                key={tab}
                value={tab}
                label={tab}
                sx={{ minHeight: 0, textTransform: "capitalize", fontSize: "0.75rem", fontWeight: 600 }}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Booking Tab Content */}
      {activeTab === 'booking' && (!showOldFlow || (showOldFlow && (oldFlowStep === 1 || oldFlowStep === 2))) && !showNewFlow && (
        <Box
          sx={{ flex: 1, overflow: showOnboarding ? "visible" : "auto", p: 2, background: "#fafafa" }}
          onClick={() => setShowFlowMenu(false)}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 1.5, position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Insurance Component */}
            <Box
              sx={{
                p: 1.5,
                background: "#ffffff",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                position: "relative",
                zIndex: showOnboarding ? 10 : "auto"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography sx={{ fontSize: "20px" }}>{insuranceAdded ? "✅" : "🛡️"}</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {insuranceAdded ? "Travel Insurance - Comprehensive Plan" : "Travel Insurance"}
                  </Typography>
                  <Box sx={{ color: "text.secondary", mb: insuranceAdded ? 0 : 1 }}>
                    {insuranceAdded ? (
                      <>
                        <Typography variant="caption" sx={{ display: "block" }}>
                          Medical coverage up to $500K · Trip cancellation · Baggage protection
                        </Typography>
                        <Typography variant="caption" sx={{ display: "block", mt: 0.5, color: "#86868b" }}>
                          🌍 Global coverage · 24/7 emergency assistance
                        </Typography>
                      </>
                    ) : (
                      <Typography variant="caption">Protect your trip with comprehensive coverage</Typography>
                    )}
                  </Box>

                  {/* DREAM FLOW - Inline AI Assistant Bar */}
                  {!insuranceAdded && showDreamFlow && (
                    <Box sx={{ mt: 1.5, animation: "fadeIn 0.5s ease-out" }}>
                      <Box
                        onClick={() => setDreamFlowExpanded(!dreamFlowExpanded)}
                        sx={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: 2,
                          p: 1.5,
                          cursor: "pointer",
                          position: "relative",
                          mb: dreamFlowExpanded ? 1.5 : 0,
                          overflow: "hidden",
                          transition: "all 0.3s ease",
                          boxShadow: dreamFlowExpanded
                            ? "0 4px 16px rgba(102, 126, 234, 0.3)"
                            : "0 2px 8px rgba(102, 126, 234, 0.2)"
                        }}
                      >
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
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, position: "relative", zIndex: 1 }}>
                          <Typography
                            sx={{
                              fontSize: "18px",
                              animation: "pulse 2s ease-in-out infinite",
                              filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5))"
                            }}
                          >
                            🤖
                          </Typography>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="caption" sx={{ display: "block", fontWeight: 600, color: "#ffffff", mb: 0.25 }}>
                              AI-Powered Insurance Selection
                            </Typography>
                            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.9)" }}>
                              ✨ Medical history detected · Recommending enhanced coverage
                            </Typography>
                          </Box>
                          <Typography sx={{ fontSize: "12px", color: "#ffffff", fontWeight: 500 }}>
                            {dreamFlowExpanded ? "▼" : "▶"}
                          </Typography>
                        </Box>
                      </Box>

                      {dreamFlowExpanded && (
                        <Box sx={{ animation: "slideDown 0.4s ease-out" }}>
                          {confirmingInsuranceIdx !== null && (
                            <Box
                              sx={{
                                p: "8px 10px",
                                background: "#d4edda",
                                border: "1px solid #34c759",
                                borderRadius: 1,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                animation: "slideDown 0.3s ease-out"
                              }}
                            >
                              <Typography sx={{ fontSize: "14px" }}>✓</Typography>
                              <Box>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: "#155724" }}>
                                  Insurance Added Successfully
                                </Typography>
                                <Typography variant="caption" sx={{ display: "block", color: "#155724", mt: 0.25 }}>
                                  Coverage confirmed · Added to booking
                                </Typography>
                              </Box>
                            </Box>
                          )}

                          {confirmingInsuranceIdx === null && (
                            <>
                              <Box
                                sx={{
                                  p: "6px 8px",
                                  background: "#ffe3e3",
                                  border: "1px solid #ff3b30",
                                  borderRadius: 1,
                                  display: "flex",
                                  gap: 1,
                                  alignItems: "center",
                                  mb: 1
                                }}
                              >
                                <Typography sx={{ fontSize: "12px" }}>🏥</Typography>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="caption" sx={{ fontWeight: 600, color: "#ff3b30" }}>
                                    Medical History Detected
                                  </Typography>
                                  <Typography variant="caption" sx={{ display: "block", color: "#c41e3a", mt: 0.25 }}>
                                    Heart condition (2019) · Enhanced coverage recommended
                                  </Typography>
                                </Box>
                              </Box>

                              <Box sx={{ display: "flex", gap: 0.75, mb: 1, alignItems: "center", flexWrap: "wrap" }}>
                                <Box
                                  sx={{
                                    fontSize: "8px",
                                    px: 0.5,
                                    py: "1px",
                                    background: "#34c759",
                                    color: "#ffffff",
                                    borderRadius: "3px",
                                    fontWeight: 600,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5
                                  }}
                                >
                                  <Box component="span" sx={{ fontSize: "10px" }}>●</Box> LIVE
                                </Box>
                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                  Updated 3s ago
                                </Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary" }}>·</Typography>
                                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                  Direct from providers
                                </Typography>
                              </Box>

                              <Box sx={{ mb: 1 }}>
                                {[
                                  { provider: "Allianz", plan: "Comprehensive+ (Medical)", price: "$185", score: 9.4, badge: "AI Pick", color: "#34c759", medical: true, commission: "$32", commissionRate: "17%" },
                                  { provider: "Covermore", plan: "Premium", price: "$210", score: 9.1, badge: "High Coverage", color: "#0071e3", medical: false, commission: "$29", commissionRate: "14%" },
                                  { provider: "Travel Guard", plan: "Standard", price: "$145", score: 8.7, badge: "Budget", color: "#ff9500", medical: false, commission: "$18", commissionRate: "12%" }
                                ].map((opt, idx) => (
                                  <Box
                                    key={opt.provider}
                                    sx={{
                                      p: "4px 5px",
                                      background: "#fafafa",
                                      border: "1px solid #e0e0e0",
                                      borderRadius: "3px",
                                      mb: 0.5,
                                      animation: `fadeIn 0.4s ease-out ${idx * 0.1}s both`,
                                      position: "relative"
                                    }}
                                  >
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                                      <Box sx={{ flex: 1, minWidth: 0 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.25 }}>
                                          <Typography sx={{ fontSize: "9px", fontWeight: 600, color: "#1d1d1f" }}>
                                            {opt.provider}
                                          </Typography>
                                          {idx === 0 && (
                                            <Box
                                              component="span"
                                              sx={{
                                                fontSize: "6px",
                                                px: "3px",
                                                background: "#34c759",
                                                color: "#ffffff",
                                                borderRadius: "2px",
                                                fontWeight: 600
                                              }}
                                            >
                                              AI PICK
                                            </Box>
                                          )}
                                        </Box>
                                        <Typography sx={{ fontSize: "7px", color: "#86868b" }}>
                                          {opt.plan}
                                          {opt.medical && (
                                            <Box component="span" sx={{ color: "#ff3b30", fontWeight: 600 }}>
                                              {" "}· 🏥 Pre-existing
                                            </Box>
                                          )}
                                        </Typography>
                                        <Typography sx={{ fontSize: "7px", color: "#86868b", mt: 0.25 }}>
                                          Score {opt.score}/10 · Commission {opt.commission} ({opt.commissionRate})
                                        </Typography>
                                      </Box>
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}>
                                        <Typography sx={{ fontSize: "10px", fontWeight: 600, color: "#1d1d1f" }}>
                                          {opt.price}
                                        </Typography>
                                        <Button
                                          size="small"
                                          variant="contained"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setConfirmingInsuranceIdx(idx);
                                            setTimeout(() => {
                                              setInsuranceAdded(true);
                                              setConfirmingInsuranceIdx(null);
                                              setTimeout(() => {
                                                setShowDreamFlow(false);
                                              }, 2000);
                                            }, 2500);
                                          }}
                                          disabled={confirmingInsuranceIdx === idx}
                                          sx={{ minWidth: 0, px: 0.75, fontSize: "8px", lineHeight: 1 }}
                                        >
                                          {confirmingInsuranceIdx === idx ? <CircularProgress size={10} sx={{ color: "white" }} /> : "Select"}
                                        </Button>
                                      </Box>
                                    </Box>
                                  </Box>
                                ))}
                              </Box>
                            </>
                          )}
                        </Box>
                      )}
                    </Box>
                  )}

                  {!insuranceAdded && !showDreamFlow && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1, position: "relative" }}>
                      {showOnboarding && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "calc(100% + 8px)",
                            left: 0,
                            background: "rgba(0, 0, 0, 0.85)",
                            color: "#ffffff",
                            px: 1,
                            py: 0.75,
                            borderRadius: 1,
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
                              left: "16px",
                              width: "8px",
                              height: "8px",
                              background: "rgba(0, 0, 0, 0.85)",
                              transform: "rotate(45deg)"
                            }}
                          />
                        </Box>
                      )}
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          setShowFlowMenu(!showFlowMenu);
                          setShowOnboarding(false);
                        }}
                        sx={{ fontSize: "0.8rem", textTransform: "none" }}
                      >
                        Add to Trip
                      </Button>
                      <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        from <Box component="span" sx={{ fontWeight: 600, color: "text.primary" }}>$95</Box>
                      </Typography>

                      {showFlowMenu && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "100%",
                            left: 0,
                            mt: 1,
                            background: "#ffffff",
                            border: "1px solid #d0d0d0",
                            borderRadius: 1,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            minWidth: 200,
                            zIndex: 100
                          }}
                        >
                          <Button
                            fullWidth
                            onClick={() => {
                              setShowOldFlow(true);
                              setOldFlowStep(1);
                              setShowFlowMenu(false);
                            }}
                            sx={{ justifyContent: "flex-start", textTransform: "none", fontSize: "0.8rem" }}
                          >
                            🐢 Old Flow (Separate System)
                          </Button>
                          <Button
                            fullWidth
                            onClick={() => {
                              setShowFlowMenu(false);
                              showLoadingThen('Loading insurance options...', () => {
                                setShowNewFlow(true);
                                setNewFlowStep(1);
                              }, 800);
                            }}
                            sx={{
                              justifyContent: "flex-start",
                              textTransform: "none",
                              fontSize: "0.8rem",
                              borderTop: "1px solid #e0e0e0"
                            }}
                          >
                            ⚡ New Flow (Integrated)
                          </Button>
                          <Button
                            fullWidth
                            onClick={() => {
                              setShowFlowMenu(false);
                              setShowOnboarding(false);
                              setShowDreamFlow(true);
                              setDreamFlowExpanded(false);
                              setTimeout(() => setDreamFlowExpanded(true), 300);
                            }}
                            sx={{
                              justifyContent: "flex-start",
                              textTransform: "none",
                              fontSize: "0.8rem",
                              borderTop: "1px solid #e0e0e0"
                            }}
                          >
                            🚀 Dream Flow (Future Vision)
                          </Button>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
                <Box sx={{ textAlign: "right", display: "flex", alignItems: "center", gap: 1 }}>
                  {insuranceAdded ? (
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      $185
                    </Typography>
                  ) : null}
                </Box>
              </Box>
            </Box>

            {/* Flight Component */}
            <Box sx={{ p: 1.5, background: "#ffffff", border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography sx={{ fontSize: "20px" }}>✈️</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
                    Round Trip Flights
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    SYD → CDG · {bookingData.startDate} - {bookingData.endDate}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Box sx={{ px: 1, py: "2px", background: "#dff6dd", color: "#0b6a0b", borderRadius: 1, fontSize: "11px", fontWeight: 500, mb: 0.25 }}>
                    Confirmed
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    $2,850
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Hotel Component */}
            <Box sx={{ p: 1.5, background: "#ffffff", border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography sx={{ fontSize: "20px" }}>🏨</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.25 }}>
                    Le Meurice Paris
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    7 nights · Deluxe Room
                  </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Box sx={{ px: 1, py: "2px", background: "#dff6dd", color: "#0b6a0b", borderRadius: 1, fontSize: "11px", fontWeight: 500, mb: 0.25 }}>
                    Confirmed
                  </Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    $2,000
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* OLD FLOW - Step 1: Travellers Modal */}
      {showOldFlow && oldFlowStep === 1 && (
        <Dialog open fullWidth maxWidth="sm" onClose={() => setShowOldFlow(false)}>
          <DialogTitle>Select Travellers for Insurance</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              Choose which travellers to add insurance for
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                { name: "Sarah Mitchell", email: "sarah.mitchell@email.com" },
                { name: "James Mitchell", email: "james.mitchell@email.com" }
              ].map((traveller) => (
                <Box
                  key={traveller.email}
                  sx={{
                    p: 1.5,
                    background: "#f8f9fa",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label=""
                    sx={{ m: 0 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {traveller.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {traveller.email}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowOldFlow(false)} color="inherit">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                showLoadingThen('Loading insurance form...', () => {
                  setOldFlowStep(2);
                }, 800);
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* OLD FLOW - Step 2: Manual Insurance Form Modal */}
      {showOldFlow && oldFlowStep === 2 && (
        <Dialog open fullWidth maxWidth="md" onClose={() => setShowOldFlow(false)}>
          <DialogTitle>Add Manual Item - Travel Insurance</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
              Enter insurance details manually
            </Typography>
            <Box
              sx={{
                background: "#fff3cd",
                border: "1px solid #ffc107",
                borderRadius: 2,
                p: 1.5,
                display: "flex",
                gap: 1.25,
                alignItems: "flex-start",
                mb: 2
              }}
            >
              <Typography sx={{ fontSize: "16px", lineHeight: 1 }}>💡</Typography>
              <Typography variant="caption" sx={{ color: "#856404", lineHeight: 1.5 }}>
                <Box component="span" sx={{ fontWeight: 700 }}>Note:</Box> You need to go to the Covermore website to get a quote first, then copy the details across to this form.
              </Typography>
            </Box>

            <Box sx={{ display: "grid", gap: 2 }}>
              <TextField label="Item Name" placeholder="e.g., Travel Insurance - Comprehensive Plan" fullWidth size="small" />
              <TextField label="Provider" placeholder="e.g., Covermore, Allianz" fullWidth size="small" />
              <FormControl size="small" fullWidth>
                <InputLabel id="coverage-type-label">Coverage Type</InputLabel>
                <Select labelId="coverage-type-label" label="Coverage Type" defaultValue="">
                  <MenuItem value="">Select coverage type...</MenuItem>
                  <MenuItem value="basic">Basic Coverage</MenuItem>
                  <MenuItem value="comprehensive">Comprehensive Coverage</MenuItem>
                  <MenuItem value="premium">Premium Coverage</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
                <TextField label="Coverage Amount" placeholder="e.g., $500,000" fullWidth size="small" />
                <TextField label="Price per Person" placeholder="e.g., $185.00" fullWidth size="small" />
              </Box>
              <TextField label="Number of Travellers" placeholder="2" type="number" fullWidth size="small" />
              <TextField
                label="Coverage Description"
                placeholder="Enter coverage details (e.g., Medical coverage, Trip cancellation, Baggage protection, etc.)"
                multiline
                rows={3}
                fullWidth
              />
            </Box>

            <Box sx={{ background: "#f8f9fa", p: 2, borderRadius: 2, mt: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Total Price:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#0071e3" }}>
                  $370.00
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "block" }}>
                $185.00 × 2 travellers
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowOldFlow(false)} color="inherit">
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                showLoadingThen('Adding to cart...', () => {
                  setOldFlowStep(3);
                }, 1000);
              }}
            >
              Add to Cart →
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* OLD FLOW - Step 3: Cart Page */}
      {showOldFlow && oldFlowStep === 3 && (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8f9fa", overflow: "hidden" }}>
          <Box sx={{ background: "#ffffff", borderBottom: "1px solid #d0d0d0", p: 2, flexShrink: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Cart
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Review your items before checkout
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
            <Box sx={{ maxWidth: 800, mx: "auto" }}>
              <Box sx={{ background: "#ffffff", borderRadius: 2, p: 2, border: "1px solid #e0e0e0", mb: 2 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography sx={{ fontSize: "20px" }}>🛡️</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                      Travel Insurance - Comprehensive Plan
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                      SafeTravel Insurance Co.
                    </Typography>
                    <Box sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                      <Typography variant="body2">• Medical coverage up to $500K</Typography>
                      <Typography variant="body2">• Trip cancellation protection</Typography>
                      <Typography variant="body2">• Baggage protection</Typography>
                      <Typography variant="body2">• Emergency evacuation</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                      <Box component="span" sx={{ fontWeight: 700 }}>Travellers:</Box> Sarah Mitchell, James Mitchell (2 people)
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      $370.00
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      $185.00 × 2
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ background: "#ffffff", borderRadius: 2, p: 2, border: "1px solid #e0e0e0" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Order Summary
                </Typography>
                <Box sx={{ color: "text.secondary" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Subtotal</Typography>
                    <Typography variant="body2">$370.00</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Tax</Typography>
                    <Typography variant="body2">$37.00</Typography>
                  </Box>
                  <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 1.5, mt: 1.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                        Total
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                        $407.00
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ background: "#ffffff", borderTop: "2px solid #e0e0e0", p: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setOldFlowStep(2)} color="inherit">
              ← Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                showLoadingThen('Loading passenger details...', () => {
                  setOldFlowStep(4);
                }, 1000);
              }}
            >
              Continue to Checkout →
            </Button>
          </Box>
        </Box>
      )}

      {/* OLD FLOW - Step 4: Passenger Details */}
      {showOldFlow && oldFlowStep === 4 && (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", background: "#fafafa", overflow: "hidden" }}>
          <Box sx={{ background: "#ffffff", borderBottom: "1px solid #e0e0e0", p: 2, flexShrink: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Passenger Details
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Enter details for each traveller
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
            <Box sx={{ maxWidth: 700, mx: "auto" }}>
              <Box sx={{ background: "#ffffff", borderRadius: 2, p: 2, border: "1px solid #e0e0e0", mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Passenger 1
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
                  <TextField label="First Name" defaultValue="Sarah" size="small" />
                  <TextField label="Last Name" defaultValue="Mitchell" size="small" />
                </Box>
                <TextField label="Date of Birth" defaultValue="1985-06-15" type="date" size="small" InputLabelProps={{ shrink: true }} fullWidth />
              </Box>

              <Box sx={{ background: "#ffffff", borderRadius: 2, p: 2, border: "1px solid #e0e0e0" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Passenger 2
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
                  <TextField label="First Name" defaultValue="James" size="small" />
                  <TextField label="Last Name" defaultValue="Mitchell" size="small" />
                </Box>
                <TextField label="Date of Birth" defaultValue="1983-03-22" type="date" size="small" InputLabelProps={{ shrink: true }} fullWidth />
              </Box>
            </Box>
          </Box>

          <Box sx={{ background: "#ffffff", borderTop: "2px solid #e0e0e0", p: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setOldFlowStep(3)} color="inherit">
              ← Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                showLoadingThen('Loading payment...', () => {
                  setOldFlowStep(5);
                }, 1000);
              }}
            >
              Continue to Payment →
            </Button>
          </Box>
        </Box>
      )}

      {/* OLD FLOW - Step 5: Payment Page */}
      {showOldFlow && oldFlowStep === 5 && (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8f9fa", overflow: "hidden" }}>
          <Box sx={{ background: "#ffffff", borderBottom: "1px solid #e0e0e0", p: 2, flexShrink: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
              Payment
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Complete your purchase
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
            <Box sx={{ maxWidth: 700, mx: "auto" }}>
              <Box sx={{ background: "#ffffff", borderRadius: 2, p: 2, border: "1px solid #e0e0e0", mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Payment Method
                </Typography>
                <TextField
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  defaultValue="4532 1234 5678 9010"
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mb: 2 }}>
                  <TextField label="Expiry Date" placeholder="MM/YY" defaultValue="12/25" size="small" />
                  <TextField label="CVV" placeholder="123" defaultValue="***" size="small" />
                </Box>
                <TextField label="Cardholder Name" placeholder="Name on card" defaultValue="Sarah Mitchell" fullWidth size="small" />
              </Box>

              <Box sx={{ background: "#ffffff", borderRadius: 2, p: 2, border: "1px solid #e0e0e0" }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
                  Order Summary
                </Typography>
                <Box sx={{ color: "text.secondary" }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <Box component="span" sx={{ fontWeight: 700, color: "#1d1d1f" }}>
                      Travel Insurance - Comprehensive Plan
                    </Box>
                    <Box component="span" sx={{ display: "block" }}>
                      2 travellers × $185.00
                    </Box>
                  </Typography>
                  <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 1.5, mt: 1.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">Subtotal</Typography>
                      <Typography variant="body2">$370.00</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2">Tax</Typography>
                      <Typography variant="body2">$37.00</Typography>
                    </Box>
                    <Box sx={{ borderTop: "1px solid #e0e0e0", pt: 1.5, mt: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                          Total
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "#1d1d1f" }}>
                          $407.00
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ background: "#ffffff", borderTop: "2px solid #e0e0e0", p: 2, display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => setOldFlowStep(4)} color="inherit">
              ← Back
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                showLoadingThen('Processing payment...', () => {
                  setInsuranceAdded(true);
                  setShowOldFlow(false);
                  setOldFlowStep(1);
                  setShowSuccessToast(true);
                  setTimeout(() => setShowSuccessToast(false), 3000);
                }, 2000);
              }}
            >
              Pay $407.00 →
            </Button>
          </Box>
        </Box>
      )}

      {/* OLD FLOW - Step 6: Add to Booking (Back in Main System) */}
      {showOldFlow && oldFlowStep === 6 && (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8f9fa", overflow: "hidden" }}>
          <Box sx={{ background: "#ffffff", borderBottom: "1px solid #e0e0e0", p: 2, flexShrink: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Add Insurance to Booking
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
              Manually enter insurance details
            </Typography>
          </Box>

          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
              <Box sx={{ background: "#ffffff", borderRadius: 2, p: 2, border: "1px solid #e0e0e0" }}>
                <Box sx={{ display: "grid", gap: 2 }}>
                  <TextField label="Insurance Provider" placeholder="EA Travel Insurance" fullWidth size="small" />
                  <TextField label="Plan Name" defaultValue={selectedCoverage?.name} fullWidth size="small" />
                  <TextField label="Premium Amount" defaultValue={selectedCoverage?.price} fullWidth size="small" />
                  <TextField label="Policy Number" placeholder="Enter from insurance system" fullWidth size="small" />
                </Box>
              </Box>
            </Box>
          </Box>

          <Box sx={{ background: "#ffffff", borderTop: "2px solid #e0e0e0", p: 2, display: "flex", justifyContent: "flex-end", boxShadow: "0 -4px 12px rgba(0,0,0,0.1)" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                showLoadingThen('Adding insurance to booking...', () => {
                  setShowOldFlow(false);
                  setOldFlowStep(1);
                  setInsuranceAdded(true);
                  setActiveTab('booking');
                  setShowSuccessToast(true);
                  setTimeout(() => setShowSuccessToast(false), 4000);
                }, 4000);
              }}
            >
              Add to Booking ✓
            </Button>
          </Box>
        </Box>
      )}

      {/* NEW FLOW - Step 1: Integrated Insurance Panel */}
      {showNewFlow && newFlowStep === 1 && (
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", background: "#f8f9fa", overflow: "hidden" }}>
          <Box sx={{ background: "#ffffff", borderBottom: "1px solid #e0e0e0", p: 2, flexShrink: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {[
                { label: "Select Coverage", active: true },
                { label: "Confirm & Add", active: false }
              ].map((step, index, array) => (
                <React.Fragment key={step.label}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      px: 1.5,
                      py: 0.75,
                      borderRadius: 1.5,
                      background: step.active ? "#e3f2fd" : "transparent",
                      color: step.active ? "#0071e3" : "#6e6e73",
                      fontSize: "13px",
                      fontWeight: step.active ? 600 : 400
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: step.active ? "#0071e3" : "#d0d0d0",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 500
                      }}
                    >
                      {index + 1}
                    </Box>
                    {step.label}
                  </Box>
                  {index < array.length - 1 && (
                    <Typography variant="caption" sx={{ color: "#d0d0d0" }}>
                      →
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
              <Box sx={{ background: "#e8f5e9", border: "1px solid #4caf50", borderRadius: 2, p: 2, mb: 3 }}>
                <Typography variant="body2" sx={{ color: "#2e7d32", mb: 0.5 }}>
                  ✓ <Box component="span" sx={{ fontWeight: 700 }}>Customer information auto-filled from booking</Box>
                </Typography>
                <Typography variant="caption" sx={{ color: "#2e7d32" }}>
                  {bookingData.customer} · {bookingData.destination} · {bookingData.startDate} - {bookingData.endDate}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Select Coverage Level
              </Typography>

              {(() => {
                const preSelected = { name: "Comprehensive Plan", price: "$185", coverage: "$500K medical, Trip cancellation, Baggage protection" };
                if (!selectedCoverage) {
                  setSelectedCoverage(preSelected);
                }
                const current = selectedCoverage || preSelected;

                return (
                  <Box sx={{ background: "#e3f2fd", borderRadius: 2, p: 2, mb: 2, border: "2px solid #0071e3" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                      <Box sx={{ width: 20, height: 20, borderRadius: "50%", background: "#0071e3", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" }}>
                        ✓
                      </Box>
                      <Typography variant="caption" sx={{ fontWeight: 600, color: "#0071e3" }}>
                        Recommended
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                          {current.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {current.coverage}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {current.price}
                      </Typography>
                    </Box>
                  </Box>
                );
              })()}

              <Button variant="outlined" fullWidth sx={{ py: 1.5, textTransform: "none", fontWeight: 600 }}>
                Show Other Plans <Box component="span" sx={{ fontSize: "12px", ml: 1 }}>▼</Box>
              </Button>
            </Box>
          </Box>

          <Box sx={{ background: "#ffffff", borderTop: "2px solid #e0e0e0", p: 2, display: "flex", justifyContent: "space-between", boxShadow: "0 -4px 12px rgba(0,0,0,0.1)" }}>
            <Button onClick={() => setShowNewFlow(false)} color="inherit">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                showLoadingThen('Adding insurance to booking...', () => {
                  setShowNewFlow(false);
                  setNewFlowStep(1);
                  setInsuranceAdded(true);
                  setActiveTab('booking');
                  setShowSuccessToast(true);
                  setTimeout(() => setShowSuccessToast(false), 4000);
                }, 1500);
              }}
            >
              Add to Booking ✓
            </Button>
          </Box>
        </Box>
      )}

      {/* Other Tabs */}
      {activeTab === 'payments' && (
        <Box sx={{ flex: 1, overflow: "auto", p: 2, background: "#fafafa" }}>
          <Box sx={{ p: 5, textAlign: "center", background: "#ffffff", border: "1px solid #d0d0d0", borderRadius: 2 }}>
            <Typography sx={{ fontSize: "36px", mb: 2 }}>💳</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Payments
            </Typography>
          </Box>
        </Box>
      )}

      {activeTab === 'documents' && (
        <Box sx={{ flex: 1, overflow: "auto", p: 2, background: "#fafafa" }}>
          <Box sx={{ p: 5, textAlign: "center", background: "#ffffff", border: "1px solid #d0d0d0", borderRadius: 2 }}>
            <Typography sx={{ fontSize: "36px", mb: 2 }}>📄</Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Documents
            </Typography>
          </Box>
        </Box>
      )}

      {/* Loading Modal */}
      <Backdrop open={showLoadingModal} sx={{ zIndex: 20000, color: "#ffffff", backdropFilter: "blur(4px)" }}>
        <Box
          sx={{
            background: "#ffffff",
            borderRadius: 2,
            p: 3,
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            minWidth: 280,
            color: "#1d1d1f"
          }}
        >
          <CircularProgress size={40} />
          <Typography variant="body2" sx={{ fontWeight: 600, textAlign: "center" }}>
            {loadingMessage}
          </Typography>
        </Box>
      </Backdrop>

      {/* Success Toast */}
      <Snackbar
        open={showSuccessToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setShowSuccessToast(false)}
        autoHideDuration={3000}
      >
        <Alert severity="success" variant="filled" sx={{ alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Insurance Added
          </Typography>
          <Typography variant="caption">
            Travel insurance successfully added to booking
          </Typography>
        </Alert>
      </Snackbar>

      <GlobalStyles
        styles={{
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" }
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

export default InsuranceOldFlow;

