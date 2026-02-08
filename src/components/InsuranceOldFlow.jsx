import React, { useState } from 'react';
import { BaseStyles, Button, Checkbox, Heading, Text, TextInput } from '@primer/react';
import { demoFlowTokens } from '../styles/demoFlowTokens';

const insuranceFlowTokens = demoFlowTokens;

const Box = ({ as: Component = "div", sx, style, ...props }) => (
  <Component {...props} style={{ ...(sx || {}), ...(style || {}) }} />
);

const TAB_LABELS = ['booking', 'payments', 'documents'];

const InsuranceOldFlow = ({ onBackToCaseStudy, onClose, zIndex = 99, position }) => {
  const [activeTab, setActiveTab] = useState('booking');
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const [showOldFlow, setShowOldFlow] = useState(false);
  const [oldFlowStep, setOldFlowStep] = useState(1);

  const [showNewFlow, setShowNewFlow] = useState(false);
  const [newFlowStep, setNewFlowStep] = useState(1);

  const [showDreamFlow, setShowDreamFlow] = useState(false);
  const [dreamFlowExpanded, setDreamFlowExpanded] = useState(false);

  const [showFlowMenu, setShowFlowMenu] = useState(false);
  const [insuranceAdded, setInsuranceAdded] = useState(false);
  const [selectedCoverage] = useState({
    name: "Comprehensive Plan",
    price: "$185",
    coverage: "Medical coverage up to $500K · Trip cancellation · Baggage protection"
  });
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

  const dreamOptions = [
    { provider: "Allianz", plan: "Comprehensive+ (Medical)", price: "$185", score: "9.4", badge: "AI Pick" },
    { provider: "Covermore", plan: "Premium", price: "$210", score: "9.1", badge: "High Coverage" },
    { provider: "Travel Guard", plan: "Standard", price: "$145", score: "8.7", badge: "Budget" }
  ];

  return (
    <BaseStyles>
      <Box sx={windowSx}>
        <Box sx={insuranceFlowTokens.headerSx}>
          <Box>
            <Heading as="h1" sx={insuranceFlowTokens.headerTitleSx}>Travel insurance integration</Heading>
            <Box sx={demoFlowTokens.headerMetaRowSx}>
              <Text sx={insuranceFlowTokens.headerMetaSx}>Booking ref {bookingData.bookingRef}</Text>
            </Box>
          </Box>
          <Box sx={demoFlowTokens.headerActionsRowSx}>
            <label style={demoFlowTokens.toggleLabelRowStyle}>
              <Text sx={insuranceFlowTokens.toggleLabelSx}>Interactive Demo</Text>
              <input
                type="checkbox"
                checked
                onChange={(event) => {
                  if (!event.target.checked) {
                    onBackToCaseStudy?.();
                  }
                }}
                aria-label="Interactive demo toggle"
              />
            </label>
            <Button onClick={onClose}>Close</Button>
          </Box>
        </Box>

        {!showOldFlow && !showNewFlow && !showDreamFlow && (
          <Box sx={insuranceFlowTokens.tabListSx}>
            {TAB_LABELS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={insuranceFlowTokens.tabButtonSx(activeTab === tab)}
              >
                {tab}
              </button>
            ))}
          </Box>
        )}

        {activeTab === 'booking' && (!showOldFlow || (showOldFlow && (oldFlowStep === 1 || oldFlowStep === 2))) && !showNewFlow && (
          <Box
            sx={demoFlowTokens.pageBodyWithOverflowSx(showOnboarding ? "visible" : "auto")}
            onClick={() => setShowFlowMenu(false)}
          >
            <Box sx={demoFlowTokens.columnGapMdSx} onClick={(event) => event.stopPropagation()}>
              <Box sx={demoFlowTokens.bookingCardWithZIndexSx(showOnboarding ? 10 : "auto")}>
                <Box sx={demoFlowTokens.rowAlignStartGapMdSx}>
                  <Text sx={demoFlowTokens.textEmojiSx}>{insuranceAdded ? "✅" : "🛡️"}</Text>
                  <Box sx={demoFlowTokens.flex1Sx}>
                    <Text sx={demoFlowTokens.textTitleSmMbSx}>
                      {insuranceAdded ? "Travel Insurance - Comprehensive Plan" : "Travel Insurance"}
                    </Text>
                    {!insuranceAdded ? (
                      <Text sx={insuranceFlowTokens.secondaryTextSx}>Protect your trip with comprehensive coverage</Text>
                    ) : (
                      <Box>
                        <Text sx={insuranceFlowTokens.secondaryTextSx}>Medical coverage up to $500K · Trip cancellation · Baggage protection</Text>
                        <Text sx={insuranceFlowTokens.secondaryTextSx}>Global coverage · 24/7 emergency assistance</Text>
                      </Box>
                    )}

                    {!insuranceAdded && showDreamFlow && (
                      <Box sx={demoFlowTokens.marginTopMdStyle}>
                        <Box
                          sx={demoFlowTokens.dreamCardSx}
                          onClick={() => setDreamFlowExpanded((prev) => !prev)}
                        >
                          <Box sx={demoFlowTokens.rowAlignCenterGapMdSx}>
                            <Text sx={demoFlowTokens.textEmojiSx}>🤖</Text>
                            <Box sx={demoFlowTokens.flex1Sx}>
                              <Text sx={demoFlowTokens.textCaptionBoldSx}>
                                AI-Powered Insurance Selection
                              </Text>
                              <Text sx={insuranceFlowTokens.secondaryTextSx}>
                                Medical history detected · Recommending enhanced coverage
                              </Text>
                            </Box>
                            <Text sx={insuranceFlowTokens.secondaryTextSx}>{dreamFlowExpanded ? "▼" : "▶"}</Text>
                          </Box>
                        </Box>

                        {dreamFlowExpanded && (
                          <Box sx={demoFlowTokens.marginTopSmStyle}>
                            {confirmingInsuranceIdx !== null ? (
                              <Box sx={demoFlowTokens.successCardSx}>
                                <Text sx={demoFlowTokens.textCaptionBoldSx}>Insurance Added Successfully</Text>
                                <Text sx={insuranceFlowTokens.secondaryTextSx}>Coverage confirmed · Added to booking</Text>
                              </Box>
                            ) : (
                              <>
                                <Box sx={demoFlowTokens.dangerCardSx}>
                                  <Text sx={demoFlowTokens.textCaptionBoldSx}>
                                    Medical History Detected
                                  </Text>
                                  <Text sx={insuranceFlowTokens.secondaryTextSx}>
                                    Heart condition (2019) · Enhanced coverage recommended
                                  </Text>
                                </Box>
                                <Box sx={demoFlowTokens.columnGapMdSx}>
                                  {dreamOptions.map((option, idx) => (
                                    <Box key={option.provider} sx={insuranceFlowTokens.cardSx}>
                                      <Box sx={demoFlowTokens.rowSpaceBetweenGapMdSx}>
                                        <Box>
                                          <Text sx={demoFlowTokens.textCaptionBoldSx}>
                                            {option.provider} {idx === 0 ? "· AI Pick" : ""}
                                          </Text>
                                          <Text sx={insuranceFlowTokens.secondaryTextSx}>{option.plan}</Text>
                                          <Text sx={insuranceFlowTokens.secondaryTextSx}>Score {option.score}/10</Text>
                                        </Box>
                                        <Box sx={demoFlowTokens.textAlignRightSx}>
                                          <Text sx={demoFlowTokens.textPriceMdSx}>{option.price}</Text>
                                          <Button
                                            size="small"
                                            onClick={() => {
                                              setConfirmingInsuranceIdx(idx);
                                              setTimeout(() => {
                                                setInsuranceAdded(true);
                                                setConfirmingInsuranceIdx(null);
                                                setTimeout(() => setShowDreamFlow(false), 1200);
                                              }, 1500);
                                            }}
                                            disabled={confirmingInsuranceIdx === idx}
                                          >
                                            {confirmingInsuranceIdx === idx ? "Loading..." : "Select"}
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
                      <Box sx={demoFlowTokens.rowAlignCenterGapMdRelativeSx}>
                        {showOnboarding && (
                          <Box sx={demoFlowTokens.onboardingTooltipSx}>
                            Click here to try the old or new flow
                          </Box>
                        )}
                        <Button
                          onClick={() => {
                            setShowFlowMenu((prev) => !prev);
                            setShowOnboarding(false);
                          }}
                        >
                          Add to Trip
                        </Button>
                        <Text sx={insuranceFlowTokens.secondaryTextSx}>
                          from <strong>$95</strong>
                        </Text>

                        {showFlowMenu && (
                          <Box sx={insuranceFlowTokens.menuSx}>
                            <Button
                              sx={insuranceFlowTokens.menuItemSx}
                              onClick={() => {
                                setShowOldFlow(true);
                                setOldFlowStep(1);
                                setShowFlowMenu(false);
                              }}
                            >
                              🐢 Old Flow (Separate System)
                            </Button>
                            <Button
                              sx={insuranceFlowTokens.menuItemSx}
                              onClick={() => {
                                setShowFlowMenu(false);
                                showLoadingThen('Loading insurance options...', () => {
                                  setShowNewFlow(true);
                                  setNewFlowStep(1);
                                }, 800);
                              }}
                            >
                              ⚡ New Flow (Integrated)
                            </Button>
                            <Button
                              sx={insuranceFlowTokens.menuItemSx}
                              onClick={() => {
                                setShowFlowMenu(false);
                                setShowOnboarding(false);
                                setShowDreamFlow(true);
                                setDreamFlowExpanded(false);
                                setTimeout(() => setDreamFlowExpanded(true), 300);
                              }}
                            >
                              🚀 Dream Flow (Future Vision)
                            </Button>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                <Box sx={demoFlowTokens.textAlignRightSx}>
                    {insuranceAdded ? <Text sx={demoFlowTokens.textPriceMdSx}>$185</Text> : null}
                  </Box>
                </Box>
              </Box>

              <Box sx={insuranceFlowTokens.bookingCardSx}>
                <Box sx={demoFlowTokens.rowAlignCenterGapMdSx}>
                  <Text sx={demoFlowTokens.textEmojiSx}>✈️</Text>
                  <Box sx={demoFlowTokens.flex1Sx}>
                    <Text sx={demoFlowTokens.textTitleSmSx}>Round Trip Flights</Text>
                    <Text sx={insuranceFlowTokens.secondaryTextSx}>
                      SYD → CDG · {bookingData.startDate} - {bookingData.endDate}
                    </Text>
                  </Box>
                  <Box sx={demoFlowTokens.textAlignRightSx}>
                    <Text sx={insuranceFlowTokens.pillSx}>Confirmed</Text>
                    <Text sx={demoFlowTokens.textPriceMdSx}>$2,850</Text>
                  </Box>
                </Box>
              </Box>

              <Box sx={insuranceFlowTokens.bookingCardSx}>
                <Box sx={demoFlowTokens.rowAlignCenterGapMdSx}>
                  <Text sx={demoFlowTokens.textEmojiSx}>🏨</Text>
                  <Box sx={demoFlowTokens.flex1Sx}>
                    <Text sx={demoFlowTokens.textTitleSmSx}>Le Meurice Paris</Text>
                    <Text sx={insuranceFlowTokens.secondaryTextSx}>7 nights · Deluxe Room</Text>
                  </Box>
                  <Box sx={demoFlowTokens.textAlignRightSx}>
                    <Text sx={insuranceFlowTokens.pillSx}>Confirmed</Text>
                    <Text sx={demoFlowTokens.textPriceMdSx}>$2,000</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {showOldFlow && oldFlowStep === 1 && (
          <Box sx={insuranceFlowTokens.modalOverlaySx}>
            <Box sx={insuranceFlowTokens.modalCardSx}>
              <Heading as="h2" sx={insuranceFlowTokens.modalTitleSx}>Select Travellers for Insurance</Heading>
              <Text sx={insuranceFlowTokens.secondaryTextSx}>Choose which travellers to add insurance for</Text>
              <Box sx={demoFlowTokens.columnGapSmWithMarginTopSx}>
                {[
                  { name: "Sarah Mitchell", email: "sarah.mitchell@email.com" },
                  { name: "James Mitchell", email: "james.mitchell@email.com" }
                ].map((traveller) => (
                  <Box key={traveller.email} sx={demoFlowTokens.cardRowAlignCenterSx}>
                    <Checkbox defaultChecked />
                    <Box>
                      <Text sx={demoFlowTokens.textCaptionBoldSx}>{traveller.name}</Text>
                      <Text sx={insuranceFlowTokens.secondaryTextSx}>{traveller.email}</Text>
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={insuranceFlowTokens.modalFooterSx}>
                <Button onClick={() => setShowOldFlow(false)}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    showLoadingThen('Loading insurance form...', () => {
                      setOldFlowStep(2);
                    }, 800);
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {showOldFlow && oldFlowStep === 2 && (
          <Box sx={insuranceFlowTokens.modalOverlaySx}>
            <Box sx={insuranceFlowTokens.modalCardSx}>
              <Heading as="h2" sx={insuranceFlowTokens.modalTitleSx}>Add Manual Item - Travel Insurance</Heading>
              <Text sx={insuranceFlowTokens.secondaryTextSx}>Enter insurance details manually</Text>
              <Box sx={demoFlowTokens.warningCardWithMarginTopSx}>
                <Text sx={insuranceFlowTokens.bodyTextSx}>
                  <strong>Note:</strong> You need to go to the Covermore website to get a quote first, then copy the details across to this form.
                </Text>
              </Box>

              <Box sx={demoFlowTokens.gridGapMdWithMarginTopSx}>
                <label>
                  <Text sx={insuranceFlowTokens.formLabelSx}>Item Name</Text>
                  <TextInput placeholder="e.g., Travel Insurance - Comprehensive Plan" sx={insuranceFlowTokens.inputSx} />
                </label>
                <label>
                  <Text sx={insuranceFlowTokens.formLabelSx}>Provider</Text>
                  <TextInput placeholder="e.g., Covermore, Allianz" sx={insuranceFlowTokens.inputSx} />
                </label>
                <label>
                  <Text sx={insuranceFlowTokens.formLabelSx}>Coverage Type</Text>
                  <select style={insuranceFlowTokens.inputSx}>
                    <option value="">Select coverage type...</option>
                    <option value="basic">Basic Coverage</option>
                    <option value="comprehensive">Comprehensive Coverage</option>
                    <option value="premium">Premium Coverage</option>
                  </select>
                </label>
                <Box sx={demoFlowTokens.gridTwoColumnSx}>
                  <label>
                    <Text sx={insuranceFlowTokens.formLabelSx}>Coverage Amount</Text>
                    <TextInput placeholder="e.g., $500,000" sx={insuranceFlowTokens.inputSx} />
                  </label>
                  <label>
                    <Text sx={insuranceFlowTokens.formLabelSx}>Price per Person</Text>
                    <TextInput placeholder="e.g., $185.00" sx={insuranceFlowTokens.inputSx} />
                  </label>
                </Box>
                <label>
                  <Text sx={insuranceFlowTokens.formLabelSx}>Number of Travellers</Text>
                  <TextInput placeholder="2" type="number" sx={insuranceFlowTokens.inputSx} />
                </label>
                <label>
                  <Text sx={insuranceFlowTokens.formLabelSx}>Coverage Description</Text>
                  <textarea rows="3" placeholder="Enter coverage details" style={insuranceFlowTokens.inputSx} />
                </label>
              </Box>

              <Box sx={demoFlowTokens.subtleCardWithMarginTopSx}>
                <Box sx={demoFlowTokens.rowSpaceBetweenGapMdSx}>
                  <Text sx={demoFlowTokens.textCaptionBoldSx}>Total Price:</Text>
                  <Text sx={demoFlowTokens.priceHighlightSx}>$370.00</Text>
                </Box>
                <Text sx={insuranceFlowTokens.secondaryTextSx}>$185.00 × 2 travellers</Text>
              </Box>

              <Box sx={insuranceFlowTokens.modalFooterSx}>
                <Button onClick={() => setShowOldFlow(false)}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    showLoadingThen('Adding to cart...', () => {
                      setOldFlowStep(3);
                    }, 1000);
                  }}
                >
                  Add to Cart →
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {showOldFlow && oldFlowStep === 3 && (
          <Box sx={demoFlowTokens.pageContainerSx}>
            <Box sx={demoFlowTokens.pageHeaderSx}>
              <Heading as="h2" sx={demoFlowTokens.textTitleMdSx}>Cart</Heading>
              <Text sx={insuranceFlowTokens.secondaryTextSx}>Review your items before checkout</Text>
            </Box>
            <Box sx={demoFlowTokens.pageBodySx}>
              <Box sx={demoFlowTokens.maxWidth820Sx}>
                <Box sx={demoFlowTokens.cardMarginBottomMdSx}>
                  <Box sx={demoFlowTokens.rowAlignCenterGapMdSx}>
                    <Text sx={demoFlowTokens.textEmojiSx}>🛡️</Text>
                    <Box sx={demoFlowTokens.flex1Sx}>
                      <Text sx={demoFlowTokens.textTitleSmSx}>Travel Insurance - Comprehensive Plan</Text>
                      <Text sx={insuranceFlowTokens.secondaryTextSx}>SafeTravel Insurance Co.</Text>
                      <Box sx={demoFlowTokens.marginTopXsStyle}>
                        <Text sx={insuranceFlowTokens.secondaryTextSx}>• Medical coverage up to $500K</Text>
                        <Text sx={insuranceFlowTokens.secondaryTextSx}>• Trip cancellation protection</Text>
                        <Text sx={insuranceFlowTokens.secondaryTextSx}>• Baggage protection</Text>
                        <Text sx={insuranceFlowTokens.secondaryTextSx}>• Emergency evacuation</Text>
                      </Box>
                      <Box sx={demoFlowTokens.marginTopXsStyle}>
                        <Text sx={insuranceFlowTokens.secondaryTextSx}>
                          <strong>Travellers:</strong> Sarah Mitchell, James Mitchell (2 people)
                        </Text>
                      </Box>
                    </Box>
                    <Box sx={demoFlowTokens.textAlignRightSx}>
                      <Text sx={demoFlowTokens.textPriceLgSx}>$370.00</Text>
                      <Text sx={insuranceFlowTokens.secondaryTextSx}>$185.00 × 2</Text>
                    </Box>
                  </Box>
                </Box>

                <Box sx={insuranceFlowTokens.cardSx}>
                  <Text sx={demoFlowTokens.textTitleSmMbLgSx}>Order Summary</Text>
                  <Box sx={demoFlowTokens.rowSpaceBetweenSmSx}>
                    <Text sx={insuranceFlowTokens.secondaryTextSx}>Subtotal</Text>
                    <Text sx={insuranceFlowTokens.secondaryTextSx}>$370.00</Text>
                  </Box>
                  <Box sx={demoFlowTokens.rowSpaceBetweenSmSx}>
                    <Text sx={insuranceFlowTokens.secondaryTextSx}>Tax</Text>
                    <Text sx={insuranceFlowTokens.secondaryTextSx}>$37.00</Text>
                  </Box>
                  <Box sx={demoFlowTokens.summaryRowSx}>
                    <Text sx={demoFlowTokens.textTitleMdSx}>Total</Text>
                    <Text sx={demoFlowTokens.textTitleMdSx}>$407.00</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={insuranceFlowTokens.footerSx}>
              <Button onClick={() => setOldFlowStep(2)}>← Back</Button>
              <Button
                variant="primary"
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

        {showOldFlow && oldFlowStep === 4 && (
          <Box sx={demoFlowTokens.pageContainerSx}>
            <Box sx={demoFlowTokens.pageHeaderSx}>
              <Heading as="h2" sx={demoFlowTokens.textTitleMdSx}>Passenger Details</Heading>
              <Text sx={insuranceFlowTokens.secondaryTextSx}>Enter details for each traveller</Text>
            </Box>
            <Box sx={demoFlowTokens.pageBodySx}>
              <Box sx={demoFlowTokens.maxWidth760Sx}>
                {[
                  { title: "Passenger 1", first: "Sarah", last: "Mitchell", dob: "1985-06-15" },
                  { title: "Passenger 2", first: "James", last: "Mitchell", dob: "1983-03-22" }
                ].map((passenger) => (
                  <Box key={passenger.title} sx={demoFlowTokens.cardMarginBottomMdSx}>
                    <Text sx={demoFlowTokens.textTitleSmMbLgSx}>{passenger.title}</Text>
                    <Box sx={demoFlowTokens.gridTwoColumnWithMarginSx}>
                      <label>
                        <Text sx={insuranceFlowTokens.formLabelSx}>First Name</Text>
                        <TextInput defaultValue={passenger.first} sx={insuranceFlowTokens.inputSx} />
                      </label>
                      <label>
                        <Text sx={insuranceFlowTokens.formLabelSx}>Last Name</Text>
                        <TextInput defaultValue={passenger.last} sx={insuranceFlowTokens.inputSx} />
                      </label>
                    </Box>
                    <label>
                      <Text sx={insuranceFlowTokens.formLabelSx}>Date of Birth</Text>
                      <TextInput type="date" defaultValue={passenger.dob} sx={insuranceFlowTokens.inputSx} />
                    </label>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={insuranceFlowTokens.footerSx}>
              <Button onClick={() => setOldFlowStep(3)}>← Back</Button>
              <Button
                variant="primary"
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

        {showOldFlow && oldFlowStep === 5 && (
          <Box sx={demoFlowTokens.pageContainerSx}>
            <Box sx={demoFlowTokens.pageHeaderSx}>
              <Heading as="h2" sx={demoFlowTokens.textTitleMdSx}>Payment</Heading>
              <Text sx={insuranceFlowTokens.secondaryTextSx}>Complete your purchase</Text>
            </Box>
            <Box sx={demoFlowTokens.pageBodySx}>
              <Box sx={demoFlowTokens.maxWidth760Sx}>
                <Box sx={demoFlowTokens.cardMarginBottomMdSx}>
                  <Text sx={demoFlowTokens.textTitleSmMbLgSx}>Payment Method</Text>
                  <label>
                    <Text sx={insuranceFlowTokens.formLabelSx}>Card Number</Text>
                    <TextInput defaultValue="4532 1234 5678 9010" sx={insuranceFlowTokens.inputSx} />
                  </label>
                  <Box sx={demoFlowTokens.gridTwoColumnWithMarginTopSx}>
                    <label>
                      <Text sx={insuranceFlowTokens.formLabelSx}>Expiry Date</Text>
                      <TextInput defaultValue="12/25" sx={insuranceFlowTokens.inputSx} />
                    </label>
                    <label>
                      <Text sx={insuranceFlowTokens.formLabelSx}>CVV</Text>
                      <TextInput defaultValue="***" sx={insuranceFlowTokens.inputSx} />
                    </label>
                  </Box>
                  <label>
                    <Text sx={insuranceFlowTokens.formLabelSx}>Cardholder Name</Text>
                    <TextInput defaultValue="Sarah Mitchell" sx={insuranceFlowTokens.inputSx} />
                  </label>
                </Box>

                <Box sx={insuranceFlowTokens.cardSx}>
                  <Text sx={demoFlowTokens.textTitleSmMbLgSx}>Order Summary</Text>
                  <Text sx={insuranceFlowTokens.secondaryTextSx}>Travel Insurance - Comprehensive Plan</Text>
                  <Text sx={insuranceFlowTokens.secondaryTextSx}>2 travellers × $185.00</Text>
                  <Box sx={demoFlowTokens.summaryRowSx}>
                    <Box sx={demoFlowTokens.rowSpaceBetweenSmSx}>
                      <Text sx={insuranceFlowTokens.secondaryTextSx}>Subtotal</Text>
                      <Text sx={insuranceFlowTokens.secondaryTextSx}>$370.00</Text>
                    </Box>
                    <Box sx={demoFlowTokens.rowSpaceBetweenSmSx}>
                      <Text sx={insuranceFlowTokens.secondaryTextSx}>Tax</Text>
                      <Text sx={insuranceFlowTokens.secondaryTextSx}>$37.00</Text>
                    </Box>
                    <Box sx={demoFlowTokens.rowSpaceBetweenSmSx}>
                      <Text sx={demoFlowTokens.textTitleMdSx}>Total</Text>
                      <Text sx={demoFlowTokens.textTitleMdSx}>$407.00</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={insuranceFlowTokens.footerSx}>
              <Button onClick={() => setOldFlowStep(4)}>← Back</Button>
              <Button
                variant="primary"
                onClick={() => {
                  showLoadingThen('Processing payment...', () => {
                    setInsuranceAdded(true);
                    setShowOldFlow(false);
                    setOldFlowStep(1);
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 3000);
                  }, 1600);
                }}
              >
                Pay $407.00 →
              </Button>
            </Box>
          </Box>
        )}

        {showNewFlow && newFlowStep === 1 && (
          <Box sx={demoFlowTokens.pageContainerSx}>
            <Box sx={demoFlowTokens.pageHeaderSx}>
              <Box sx={demoFlowTokens.wrapRowGapSmSx}>
                {["Select Coverage", "Confirm & Add"].map((label, index) => (
                  <Box key={label} sx={index === 0 ? demoFlowTokens.pillActiveSx : demoFlowTokens.pillInactiveSx}>
                    {index + 1}. {label}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={demoFlowTokens.pageBodySx}>
              <Box sx={demoFlowTokens.maxWidth900Sx}>
                <Box sx={demoFlowTokens.infoCardSx}>
                  <Text sx={demoFlowTokens.textSuccessCaptionSx}>
                    Customer information auto-filled from booking
                  </Text>
                  <Text sx={insuranceFlowTokens.secondaryTextSx}>
                    {bookingData.customer} · {bookingData.destination} · {bookingData.startDate} - {bookingData.endDate}
                  </Text>
                </Box>
                <Heading as="h2" sx={demoFlowTokens.sectionTitleWithMarginSx}>
                  Select Coverage Level
                </Heading>
                <Box sx={demoFlowTokens.recommendedCardSx}>
                  <Text sx={demoFlowTokens.textInfoCaptionSx}>Recommended</Text>
                  <Box sx={demoFlowTokens.rowSpaceBetweenGapMdWithMarginTopSx}>
                    <Box>
                      <Text sx={demoFlowTokens.textTitleSmSx}>{selectedCoverage.name}</Text>
                      <Text sx={insuranceFlowTokens.secondaryTextSx}>{selectedCoverage.coverage}</Text>
                    </Box>
                    <Text sx={demoFlowTokens.textPriceLgSx}>{selectedCoverage.price}</Text>
                  </Box>
                </Box>
                <Button sx={demoFlowTokens.marginTopMdStyle} variant="invisible">
                  Show Other Plans ▼
                </Button>
              </Box>
            </Box>
            <Box sx={insuranceFlowTokens.footerSx}>
              <Button onClick={() => setShowNewFlow(false)}>Cancel</Button>
              <Button
                variant="primary"
                onClick={() => {
                  showLoadingThen('Adding insurance to booking...', () => {
                    setShowNewFlow(false);
                    setNewFlowStep(1);
                    setInsuranceAdded(true);
                    setActiveTab('booking');
                    setShowSuccessToast(true);
                    setTimeout(() => setShowSuccessToast(false), 4000);
                  }, 1200);
                }}
              >
                Add to Booking ✓
              </Button>
            </Box>
          </Box>
        )}

        {activeTab === 'payments' && !showOldFlow && !showNewFlow && !showDreamFlow && (
          <Box sx={demoFlowTokens.pageBodySx}>
            <Box sx={demoFlowTokens.centerCardSx}>
              <Text sx={demoFlowTokens.textEmojiLgSx}>💳</Text>
              <Heading as="h2" sx={demoFlowTokens.sectionTitleWithMarginSx}>Payments</Heading>
            </Box>
          </Box>
        )}

        {activeTab === 'documents' && !showOldFlow && !showNewFlow && !showDreamFlow && (
          <Box sx={demoFlowTokens.pageBodySx}>
            <Box sx={demoFlowTokens.centerCardSx}>
              <Text sx={demoFlowTokens.textEmojiLgSx}>📄</Text>
              <Heading as="h2" sx={demoFlowTokens.sectionTitleWithMarginSx}>Documents</Heading>
            </Box>
          </Box>
        )}

        {showLoadingModal && (
          <Box sx={insuranceFlowTokens.modalOverlaySx}>
            <Box sx={insuranceFlowTokens.loadingCardSx}>
              <Box sx={insuranceFlowTokens.loadingSpinnerSx} />
              <Text sx={demoFlowTokens.textCaptionBoldSx}>{loadingMessage}</Text>
            </Box>
          </Box>
        )}

        {showSuccessToast && (
          <Box sx={insuranceFlowTokens.successToastSx}>
            Insurance Added
          </Box>
        )}
      </Box>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </BaseStyles>
  );
};

export default InsuranceOldFlow;
