import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActionList,
  ActionMenu,
  BaseStyles,
  Button,
  Checkbox,
  Dialog,
  Flash,
  FormControl,
  Heading,
  IconButton,
  Portal,
  PortalContext,
  ProgressBar,
  Select,
  Spinner,
  Stack,
  Text,
  TextInput,
  ThemeProvider,
  ToggleSwitch,
  registerPortalRoot,
  theme
} from '@primer/react';
import {
  ArrowUpIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HistoryIcon,
  HomeIcon,
  KebabHorizontalIcon,
  XIcon
} from '@primer/octicons-react';
import { UnderlineNav } from '@primer/react/deprecated';
import { CalendarPicker, HotelCard } from './shared';
import { generateCalendarMonths } from '../data/mockCalendar';

const TAB_LABELS = ['itinerary', 'travellers', 'documents', 'payments', 'notes', 'history'];

const hotels = [
  { name: 'Hilton Hawaiian Village', price: '$289', rating: '4.5', reviews: '2,341', image: '🏨' },
  { name: 'Royal Hawaiian Resort', price: '$425', rating: '4.7', reviews: '1,892', image: '🏨' },
  { name: 'Moana Surfrider', price: '$350', rating: '4.6', reviews: '1,567', image: '🏨' },
  { name: 'Sheraton Waikiki', price: '$315', rating: '4.4', reviews: '3,112', image: '🏨' },
  { name: 'Hyatt Regency Waikiki', price: '$298', rating: '4.5', reviews: '2,789', image: '🏨' }
];

const DREAM_RESULTS = [
  { name: 'Hilton Hawaiian Village', price: '$289' },
  { name: 'Royal Hawaiian Resort', price: '$425' },
  { name: 'Moana Surfrider', price: '$350' }
];
const DREAM_ROOM_OPTIONS = [
  { id: 'standard', label: 'Standard Room', delta: 0 },
  { id: 'deluxe', label: 'Deluxe Room', delta: 180 },
  { id: 'ocean', label: 'Ocean View Suite', delta: 420 }
];
const DREAM_ROOM_PRICES = {
  standard: '$289',
  deluxe: '$325',
  ocean: '$375'
};
const DREAM_HOTEL_TOTALS = {
  'Hilton Hawaiian Village': 4200,
  'Royal Hawaiian Resort': 4805,
  'Moana Surfrider': 4520
};
const DREAM_BASE_TOTAL = 4805;

const windowBaseSx = {
  position: 'fixed',
  backgroundColor: 'canvas.default',
  border: '1px solid',
  borderColor: 'border.default',
  borderRadius: 2,
  boxShadow: 'shadow.large',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible'
};

const windowSx = (position, zIndex) => ({
  ...windowBaseSx,
  left: position.x,
  top: position.y,
  zIndex,
  width: 'min(95vw, 1000px)',
  maxWidth: '95vw',
  height: 'min(90vh, 700px)',
  maxHeight: '90vh'
});

const Box = Stack;

const AmendmentsFlowDemoPrimer = ({ onBackToCaseStudy, onClose, position, zIndex = 99, embedded = false }) => {
  const fallbackPosition = position || {
    x: typeof window !== 'undefined' ? Math.max(0, (window.innerWidth - 1000) / 2) : 50,
    y: typeof window !== 'undefined' ? Math.max(0, (window.innerHeight - 700) / 2) : 100
  };

  const [activeTab, setActiveTab] = useState('itinerary');
  const portalRootRef = useRef(null);
  const cardSx = {
    border: '1px solid',
    borderColor: 'border.default',
    borderRadius: 2,
    p: 3,
    bg: 'canvas.default'
  };
  const newFlowCardSx = {
    p: 0
  };
  const newFlowCardStyle = {
    border: '1px solid #d0d7de',
    borderRadius: 8,
    padding: '16px',
    background: '#ffffff',
    boxShadow: '0 1px 2px rgba(31,35,40,0.12)'
  };
  const newFlowCompactCardStyle = {
    ...newFlowCardStyle,
    padding: '12px'
  };
  const columnStackSx = { display: 'flex', flexDirection: 'column', gap: 3 };
  const rowBetweenSx = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
    width: '100%'
  };
  const contentAreaSx = { p: 3 };
  const headerSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid',
    borderColor: 'border.default',
    px: 3,
    py: 2,
    bg: 'canvas.default'
  };
  const headerControlsSx = { display: 'flex', alignItems: 'center', gap: 2 };
  const resultsGridSx = {
    display: 'grid',
    gap: 3,
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))'
  };
  const resultsRowSx = { display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3 };
  const textRightSx = { textAlign: 'right' };
  const marginTopSmSx = { mt: 2 };
  const actionsRowSx = { display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mt: 3 };
  const compactRowSx = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'nowrap',
    overflowX: 'auto',
    maxWidth: '100%',
    pb: 1,
    alignSelf: 'flex-start'
  };
  const pillButtonSx = {
    borderRadius: 999,
    width: 'fit-content',
    minWidth: 'unset',
    flex: '0 0 auto',
    display: 'inline-flex',
    alignSelf: 'flex-start',
    whiteSpace: 'nowrap',
    maxWidth: 'max-content'
  };
  const compactPillStyle = {
    appearance: 'none',
    border: '1px solid var(--borderColor-default)',
    background: 'var(--canvas-default)',
    color: 'var(--fgColor-default)',
    borderRadius: 999,
    height: 20,
    minHeight: 20,
    padding: '0 8px',
    fontSize: '12px',
    lineHeight: '18px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer'
  };
  const sectionListSx = { display: 'flex', flexDirection: 'column', gap: 2 };
  const cardSlimSx = {
    border: '1px solid',
    borderColor: 'border.default',
    borderRadius: 2,
    p: 2,
    bg: 'transparent',
    width: '100%'
  };
  const sectionHeaderSx = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3 };
  const footerSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
    borderTop: '1px solid',
    borderColor: 'border.default',
    bg: 'canvas.default',
    px: 3,
    py: 2
  };
  const resultsFooterSx = {
    ...footerSx,
    position: 'sticky',
    bottom: 0,
    zIndex: 1,
    boxShadow: '0 -6px 12px rgba(0,0,0,0.06)'
  };
  const modalFormSx = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mt: 1,
    mb: 2
  };
  const formStackSx = { display: 'flex', flexDirection: 'column', gap: 3 };
  const cardHeaderSx = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 };
  const modalFooterStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 16, flexWrap: 'wrap' };
  const closeIconButtonSx = {
    width: 28,
    height: 28,
    minWidth: 28,
    minHeight: 28,
    p: 0,
    '& svg': { width: 12, height: 12 }
  };
  const inlineToastSx = {
    backgroundColor: 'success.subtle',
    color: 'fg.default',
    borderRadius: 2,
    px: 3,
    py: 2,
    border: '1px solid',
    borderColor: 'success.muted'
  };
  const compactFormStackSx = { display: 'flex', flexDirection: 'column', gap: 2 };
  const travellersGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 8
  };
  const searchGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: 8
  };
  const reviewGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: 12,
    alignItems: 'start'
  };
  const compactCardStyle = {
    border: 'var(--borderWidth-thin) solid var(--borderColor-default)',
    borderRadius: 8,
    background: 'transparent',
    padding: 10
  };
  const [isAmendModalOpen, setIsAmendModalOpen] = useState(false);
  const [isTravellersModalOpen, setIsTravellersModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCartPage, setShowCartPage] = useState(false);
  const [showTravellersPage, setShowTravellersPage] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showNewFlow, setShowNewFlow] = useState(false);
  const [newFlowStep, setNewFlowStep] = useState(1);
  const [showOtherHotels, setShowOtherHotels] = useState(false);
  const [showDreamFlow, setShowDreamFlow] = useState(false);
  const [dreamResults, setDreamResults] = useState(false);
  const [dreamDateChange, setDreamDateChange] = useState(false);
  const [dreamNewDates, setDreamNewDates] = useState(false);
  const [dreamPayment, setDreamPayment] = useState(false);
  const [dreamConfirmed, setDreamConfirmed] = useState(false);
  const [dreamPrompt, setDreamPrompt] = useState('');
  const [dreamSelection, setDreamSelection] = useState({
    type: 'dates',
    label: 'Extend stay by 1 night',
    summary: 'May 15–21, 2024',
    priceDelta: 410,
    total: DREAM_BASE_TOTAL + 410
  });
  const [dreamDateRange, setDreamDateRange] = useState({ start: 15, end: 20, month: 'MAY' });
  const [dreamRoomType, setDreamRoomType] = useState('standard');
  const [selectedRoomId, setSelectedRoomId] = useState('standard');
  const [selectedHotelName, setSelectedHotelName] = useState('Royal Hawaiian Resort');
  const [confirmedHotelName, setConfirmedHotelName] = useState('Royal Hawaiian Resort');
  const [confirmedRoomId, setConfirmedRoomId] = useState('standard');
  const [confirmedDatesSummary, setConfirmedDatesSummary] = useState('May 15–20, 2024');
  const [showAmendmentHistory, setShowAmendmentHistory] = useState(false);
  const [amendmentHistoryEntries, setAmendmentHistoryEntries] = useState([]);
  const [dreamTravellers, setDreamTravellers] = useState({
    john: true,
    sarah: true,
    emily: true,
    max: true
  });
  const [showRoomOptions, setShowRoomOptions] = useState(false);
  const [aiHasAutoTyped, setAiHasAutoTyped] = useState(false);
  const [aiDraftingPrompt, setAiDraftingPrompt] = useState(false);
  const [aiSearching, setAiSearching] = useState(false);
  const [aiDraftingIdle, setAiDraftingIdle] = useState(false);
  const [aiSuggestionVisible, setAiSuggestionVisible] = useState(false);
  const [dreamTestScenario, setDreamTestScenario] = useState('default');
  const [dreamErrorMessage, setDreamErrorMessage] = useState('');
  const [isApplyingDates, setIsApplyingDates] = useState(false);
  const [isConfirmingChange, setIsConfirmingChange] = useState(false);
  const [undoingEntryId, setUndoingEntryId] = useState(null);
  const [reasonForAmendment, setReasonForAmendment] = useState('');
  const [causeOfAmendment, setCauseOfAmendment] = useState('');
  const [oldFlowSelectedHotel, setOldFlowSelectedHotel] = useState(null);
  const [newFlowSelectedHotel, setNewFlowSelectedHotel] = useState({
    name: 'Royal Hawaiian Resort',
    price: '$425'
  });
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successLabel, setSuccessLabel] = useState('Booking updated');
  const debugShowToast = false;
  const modalRootRef = useRef(null);
  const aiTypingTimeoutRef = useRef(null);
  const aiSearchTimeoutRef = useRef(null);
  const aiIdleTimeoutRef = useRef(null);
  const aiDraftingDoneTimeoutRef = useRef(null);
  const aiAutoTypeStartedRef = useRef(false);
  const isAnyModalOpen = Boolean(loadingMessage || isAmendModalOpen || isTravellersModalOpen || isSearchModalOpen);
  const [expandedHotelId, setExpandedHotelId] = useState(null);
  const formatTimestamp = (date) =>
    date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  const roomOptions = [
    { id: 'standard', label: 'Standard Room', price: '$289' },
    { id: 'deluxe', label: 'Deluxe Room', price: '$325' },
    { id: 'suite', label: 'Ocean View Suite', price: '$375' }
  ];
  const dreamAiSuggestion = {
    hotel: 'Hilton Hawaiian Village',
    roomId: 'ocean',
    roomLabel: 'Ocean View Suite'
  };
  const dreamLongPrompt =
    'Please update the reservation to a quieter room, keep two beds, add late checkout, add a note for airport pickup, and ensure the new dates work for a five-night stay.';
  const dreamSpecialPrompt = 'Change dates to 06/01–06/05; add note: VIP #1234 @ gate B.';
  const effectiveDreamAiSuggestion =
    dreamTestScenario === 'ai_alt_suggestion'
      ? { hotel: 'Moana Surfrider', roomId: 'deluxe', roomLabel: 'Deluxe Room' }
      : dreamAiSuggestion;
  const dreamAiSuggestedRoom = DREAM_ROOM_OPTIONS.find((room) => room.id === effectiveDreamAiSuggestion.roomId);
  const dreamAiSuggestedHotelTotal = DREAM_HOTEL_TOTALS[effectiveDreamAiSuggestion.hotel] || DREAM_BASE_TOTAL;
  const dreamAiSuggestedHotelDelta = dreamAiSuggestedHotelTotal - DREAM_BASE_TOTAL;
  const effectiveAiSuggestionVisible = aiSuggestionVisible && dreamTestScenario !== 'ai_no_suggestion';
  const dreamResultsList = dreamTestScenario === 'empty_results' ? [] : DREAM_RESULTS;
  const dreamAvailabilityIssue = dreamTestScenario === 'availability_issue';
  const dreamPaymentFailure = dreamTestScenario === 'payment_failure';
  const dreamForcePayment = dreamTestScenario === 'payment_failure' || dreamTestScenario === 'payment_flow';
  const dreamAiTimeout = dreamTestScenario === 'ai_timeout';
      const proceedToCart = () => {
        showLoadingThen('Adding to cart...', () => {
          setShowSearchResults(false);
          setShowCartPage(true);
        });
      };
  const oldFlowSteps = ['Results', 'Cart', 'Travellers', 'Payment'];
  const newFlowSteps = ['Search', 'Results', 'Review'];
  const dreamSteps = ['Ask', 'Review', 'Confirm', 'Done'];
  const oldFlowStepIndex = showPaymentPage
    ? 4
    : showTravellersPage
      ? 3
      : showCartPage
        ? 2
        : showSearchResults
          ? 1
          : 1;
  const currentOldFlowStep = Math.max(oldFlowStepIndex, 1);
  const currentNewFlowStep = Math.min(Math.max(newFlowStep, 1), newFlowSteps.length);
  const dreamStepIndex = dreamConfirmed ? 4 : dreamPayment ? 3 : dreamResults || dreamDateChange || dreamNewDates ? 2 : 1;
  const showExceedsSummary = effectiveAiSuggestionVisible || (!aiHasAutoTyped && dreamPrompt.trim().length > 0);
  const showDreamConfirmBar =
    dreamNewDates ||
    dreamSelection?.type === 'room' ||
    (selectedHotelName && selectedHotelName !== 'Royal Hawaiian Resort');
  const dreamItineraryDates = confirmedDatesSummary;
  const dreamItineraryHotel = confirmedHotelName;
  const dreamItineraryRoom =
    DREAM_ROOM_OPTIONS.find((room) => room.id === confirmedRoomId)?.label || 'Standard Room';

  const renderDreamConfirmBar = () =>
    showDreamConfirmBar ? (
      <div
        style={{
          padding: 10,
          borderRadius: 8,
          border: '1px dashed var(--borderColor-muted)',
          background: 'var(--canvas-subtle)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Stack direction="horizontal" gap="condensed" sx={{ flexWrap: 'wrap' }}>
            <Text
              as="strong"
              sx={{ color: 'fg.muted' }}
              style={{ fontSize: '12px', lineHeight: '14px' }}
            >
              Changes
            </Text>
            {dreamNewDates && (
              <Text sx={{ fontWeight: 600 }} style={{ fontSize: '12px', lineHeight: '14px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <CalendarIcon size={12} />
                  <span>{dreamSelection?.summary}</span>
                </span>
              </Text>
            )}
            {selectedHotelName && selectedHotelName !== 'Royal Hawaiian Resort' && (
              <Text sx={{ fontWeight: 600 }} style={{ fontSize: '12px', lineHeight: '14px' }}>
                🏨 {selectedHotelName}
              </Text>
            )}
            {dreamSelection?.type === 'room' && selectedRoomId && (
              <Text sx={{ fontWeight: 600 }} style={{ fontSize: '12px', lineHeight: '14px' }}>
                🛏 {DREAM_ROOM_OPTIONS.find((room) => room.id === selectedRoomId)?.label || 'Standard Room'}
              </Text>
            )}
          </Stack>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {showExceedsSummary && (
              <Text sx={{ color: 'fg.muted' }} style={{ fontSize: '12px', lineHeight: '14px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <ArrowUpIcon size={10} />
                  <HomeIcon size={10} />
                  <span>Exceeds traveller preferences: larger ocean-view suite and resort amenities.</span>
                </span>
              </Text>
            )}
            <Button
              size="small"
              variant="primary"
              disabled={isConfirmingChange}
              onClick={() => {
                setIsConfirmingChange(true);
                const historyEntries = [];
                if (selectedHotelName && selectedHotelName !== 'Royal Hawaiian Resort') {
                  historyEntries.push({
                    id: `history-hotel-${Date.now()}`,
                    title: 'Hotel swap',
                    detail: `Royal Hawaiian Resort → ${selectedHotelName}`,
                    timestamp: formatTimestamp(new Date())
                  });
                }
                if (selectedRoomId && selectedRoomId !== 'standard') {
                  const roomLabel = DREAM_ROOM_OPTIONS.find((room) => room.id === selectedRoomId)?.label || 'Standard Room';
                  historyEntries.push({
                    id: `history-room-${Date.now() + 1}`,
                    title: 'Room change',
                    detail: `Standard Room → ${roomLabel}`,
                    timestamp: formatTimestamp(new Date())
                  });
                }
                if (dreamNewDates) {
                  historyEntries.push({
                    id: `history-date-${Date.now() + 2}`,
                    title: 'Date change',
                    detail: `May 15–20 → ${dreamSelection?.summary || 'New dates'}`,
                    timestamp: formatTimestamp(new Date())
                  });
                }
                if (historyEntries.length > 0) {
                  setAmendmentHistoryEntries((prev) => [...historyEntries, ...prev]);
                }
                setTimeout(() => {
                  setIsConfirmingChange(false);
                  if (dreamAvailabilityIssue) {
                    setDreamErrorMessage('No availability for the requested change.');
                    return;
                  }
                  if (selectedHotelName) {
                    setConfirmedHotelName(selectedHotelName);
                  }
                  if (selectedRoomId) {
                    setConfirmedRoomId(selectedRoomId);
                  }
                  if (dreamNewDates && dreamSelection?.summary) {
                    setConfirmedDatesSummary(dreamSelection.summary);
                  }
                  setSuccessLabel('Booking updated');
                  setDreamPayment(false);
                  setDreamDateChange(false);
                  setDreamConfirmed(false);
                  setShowSuccess(true);
                  closeDreamFlow();
                  setTimeout(() => setShowSuccess(false), 2500);
                }, 1400);
              }}
            >
              {isConfirmingChange && <Spinner size="small" />}
              {isConfirmingChange ? 'Processing…' : 'Confirm'}
            </Button>
          </div>
        </div>
      </div>
    ) : null;

  const showLoadingThen = (message, callback, duration = 1400) => {
    setLoadingMessage(message);
    setTimeout(() => {
      setLoadingMessage('');
      callback();
    }, duration);
  };
  useEffect(() => {
    setDreamErrorMessage('');
    setShowSuccess(false);
  }, [dreamTestScenario]);
  useEffect(() => {
    if (aiTypingTimeoutRef.current) {
      clearTimeout(aiTypingTimeoutRef.current);
      aiTypingTimeoutRef.current = null;
    }
    if (aiSearchTimeoutRef.current) {
      clearTimeout(aiSearchTimeoutRef.current);
      aiSearchTimeoutRef.current = null;
    }
    if (aiIdleTimeoutRef.current) {
      clearTimeout(aiIdleTimeoutRef.current);
      aiIdleTimeoutRef.current = null;
    }
    if (aiDraftingDoneTimeoutRef.current) {
      clearTimeout(aiDraftingDoneTimeoutRef.current);
      aiDraftingDoneTimeoutRef.current = null;
    }
    if (dreamTestScenario === 'input_long') {
      aiAutoTypeStartedRef.current = true;
      setAiHasAutoTyped(true);
      setAiDraftingPrompt(false);
      setAiSearching(false);
      setAiDraftingIdle(false);
      setAiSuggestionVisible(false);
      setDreamPrompt(dreamLongPrompt);
      return;
    }
    if (dreamTestScenario === 'input_special') {
      aiAutoTypeStartedRef.current = true;
      setAiHasAutoTyped(true);
      setAiDraftingPrompt(false);
      setAiSearching(false);
      setAiDraftingIdle(false);
      setAiSuggestionVisible(false);
      setDreamPrompt(dreamSpecialPrompt);
      return;
    }
    if (dreamTestScenario === 'input_empty') {
      aiAutoTypeStartedRef.current = false;
      setAiHasAutoTyped(false);
      setAiDraftingPrompt(false);
      setAiSearching(false);
      setAiDraftingIdle(false);
      setAiSuggestionVisible(false);
      setDreamPrompt('');
    }
  }, [dreamTestScenario, dreamLongPrompt, dreamSpecialPrompt]);
  useEffect(() => {
    if (!modalRootRef.current) {
      return undefined;
    }
    registerPortalRoot(modalRootRef.current, 'amendmentsModal');
    return undefined;
  }, []);

  const resetOldFlow = () => {
    setIsAmendModalOpen(false);
    setIsTravellersModalOpen(false);
    setIsSearchModalOpen(false);
    setShowSearchResults(false);
    setShowCartPage(false);
    setShowTravellersPage(false);
    setShowPaymentPage(false);
    setReasonForAmendment('');
    setCauseOfAmendment('');
    setOldFlowSelectedHotel(null);
    setActiveTab('itinerary');
  };

  const closeDreamFlow = () => {
    if (aiTypingTimeoutRef.current) {
      clearTimeout(aiTypingTimeoutRef.current);
      aiTypingTimeoutRef.current = null;
    }
    if (aiSearchTimeoutRef.current) {
      clearTimeout(aiSearchTimeoutRef.current);
      aiSearchTimeoutRef.current = null;
    }
    aiAutoTypeStartedRef.current = false;
    setShowDreamFlow(false);
    setDreamResults(false);
    setDreamDateChange(false);
    setDreamNewDates(false);
    setDreamPayment(false);
    setDreamConfirmed(false);
    setDreamPrompt('');
    setAiHasAutoTyped(false);
    setAiDraftingPrompt(false);
    setAiSearching(false);
    setAiSuggestionVisible(false);
    setDreamSelection({
      type: 'dates',
      label: 'Extend stay by 1 night',
                      summary: 'May 15–21, 2024',
      priceDelta: 410,
      total: DREAM_BASE_TOTAL + 410
    });
    setDreamDateRange({ start: 15, end: 20, month: 'MAY' });
    setDreamRoomType('standard');
    setSelectedRoomId('standard');
    setSelectedHotelName('Royal Hawaiian Resort');
    setDreamTravellers({
      john: true,
      sarah: true,
      emily: true,
      max: true
    });
    setShowRoomOptions(false);
    setIsApplyingDates(false);
    setIsConfirmingChange(false);
    setActiveTab('itinerary');
  };

  const renderActionsMenu = () => (
    <ActionMenu>
      <ActionMenu.Anchor>
        <IconButton
          aria-label="More options"
          icon={KebabHorizontalIcon}
          size="small"
          variant="default"
        />
      </ActionMenu.Anchor>
      <ActionMenu.Overlay portalContainerName="amendmentsFlowPortal">
        <ActionList>
          <ActionList.Item
            onSelect={() => {
              resetOldFlow();
              setShowNewFlow(false);
              setShowDreamFlow(false);
              setIsAmendModalOpen(true);
            }}
          >
            🐢 Amend (Old Flow)
          </ActionList.Item>
          <ActionList.Item
            onSelect={() => {
              closeDreamFlow();
              resetOldFlow();
              setShowNewFlow(true);
              setNewFlowStep(1);
            }}
          >
            ⚡ Amend (New Flow)
          </ActionList.Item>
          <ActionList.Item
            onSelect={() => {
              resetOldFlow();
              setShowNewFlow(false);
              setShowDreamFlow(true);
              startDreamPlan('dates');
            }}
          >
            🚀 Amend (Dream Flow)
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );

  useEffect(() => {
    if (portalRootRef.current instanceof HTMLElement) {
      registerPortalRoot(portalRootRef.current, 'amendmentsFlowPortal');
    }
  }, []);

  useEffect(() => {
    if (newFlowStep !== 2) {
      return;
    }
    const selectedIndex = hotels.findIndex((hotel) => hotel.name === newFlowSelectedHotel?.name);
    if (selectedIndex >= 0) {
      setExpandedHotelId(selectedIndex);
    }
  }, [newFlowStep, newFlowSelectedHotel]);

  useEffect(() => {
    if (!showDreamFlow) {
      return;
    }
  }, [showDreamFlow, dreamResults, dreamDateChange, dreamPayment, dreamConfirmed]);

  const startSearch = () => {
    setOldFlowSelectedHotel(null);
    setShowCartPage(false);
    setShowTravellersPage(false);
    setShowPaymentPage(false);
    setLoadingMessage('Searching available hotels...');
    setTimeout(() => {
      setLoadingMessage('');
      setShowSearchResults(true);
    }, 2000);
  };

  const startDreamPlan = (intent) => {
    if (intent === 'room' || intent === 'dates') {
      setShowAmendmentHistory(false);
      setShowRoomOptions(true);
      setDreamDateChange(true);
      setDreamResults(false);
    }
    if (intent === 'hotel') {
      setShowAmendmentHistory(false);
      setShowRoomOptions(false);
      setDreamResults(true);
    }
    if (intent === 'dates') {
      setDreamDateChange(true);
    }
    setDreamNewDates(false);
    setDreamPayment(false);
    setDreamConfirmed(false);
  };

  const formatDelta = (value) => (value >= 0 ? `+$${value}` : `-$${Math.abs(value)}`);

  const startNewFlowSearch = () => {
    setNewFlowSelectedHotel({ name: 'Royal Hawaiian Resort', price: '$425' });
    setShowOtherHotels(false);
    setLoadingMessage('Searching available hotels...');
    setTimeout(() => {
      setLoadingMessage('');
      const defaultIndex = hotels.findIndex((hotel) => hotel.name === 'Royal Hawaiian Resort');
      setExpandedHotelId(defaultIndex >= 0 ? defaultIndex : null);
      setNewFlowStep(2);
    }, 2000);
  };

  const prepareCheckout = () => {
    setLoadingMessage('Preparing checkout...');
    setTimeout(() => {
      setLoadingMessage('');
      setNewFlowStep(3);
    }, 800);
  };

  const startPaymentLoading = () => {
    setLoadingMessage('Loading payment form...');
    setTimeout(() => {
      setLoadingMessage('');
      setShowPaymentPage(true);
    }, 800);
  };

  const confirmPayment = () => {
    setLoadingMessage('Processing payment and updating booking...');
    setTimeout(() => {
      setLoadingMessage('');
      setSuccessLabel('Booking updated');
      resetOldFlow();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const travelTotals = useMemo(() => {
    const nights = 5;
    const rooms = 2;
    const nightlyRate = oldFlowSelectedHotel ? parseInt(oldFlowSelectedHotel.price.replace('$', ''), 10) : 0;
    const subtotal = nightlyRate * nights * rooms;
    const taxes = Math.round(subtotal * 0.12);
    return { nights, rooms, subtotal, taxes, total: subtotal + taxes + 45 };
  }, [oldFlowSelectedHotel]);
  const newFlowTotals = useMemo(() => {
    const nights = 5;
    const rooms = 2;
    const nightlyRate = newFlowSelectedHotel?.price
      ? parseInt(newFlowSelectedHotel.price.replace('$', ''), 10)
      : 0;
    const subtotal = nightlyRate * nights * rooms;
    const taxes = Math.round(subtotal * 0.12);
    return { nights, rooms, subtotal, taxes, total: subtotal + taxes + 45 };
  }, [newFlowSelectedHotel]);

  const dreamCalendarMonths = useMemo(
    () => generateCalendarMonths(dreamDateRange.start, dreamDateRange.end, dreamDateRange.month),
    [dreamDateRange.start, dreamDateRange.end, dreamDateRange.month]
  );
  const currentBookingRange = useMemo(
    () => ({ month: 'MAY', start: 15, end: 20 }),
    []
  );

  const resolvedWindowSx = embedded
    ? {
        ...windowBaseSx,
        position: 'relative',
        left: 'auto',
        top: 'auto',
        width: '100%',
        maxWidth: '100%',
        height: 'auto',
        maxHeight: 'none',
        border: 'none',
        borderRadius: 0,
        boxShadow: 'none'
      }
    : windowSx(fallbackPosition, zIndex);

  const dreamFlowPanel = showDreamFlow ? (
    <Box sx={columnStackSx}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'minmax(0, 2fr) minmax(220px, 1fr)',
          alignItems: 'start'
        }}
      >
        <Box sx={columnStackSx}>
          <Box sx={{ ...cardSx, position: 'relative' }}>
            <Stack sx={{ ...formStackSx, mt: 2 }}>
              {dreamErrorMessage && <Flash variant="danger">{dreamErrorMessage}</Flash>}
              <FormControl>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    alignItems: 'start',
                    gap: 8,
                    width: '100%'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 1fr)',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <TextInput
                        placeholder={aiSearching ? 'Searching AI options…' : 'Describe the change'}
                        value={dreamPrompt}
                        onFocus={() => {
                          if (aiAutoTypeStartedRef.current || aiDraftingPrompt || dreamPrompt.trim().length > 0) {
                            return;
                          }
                          if (aiIdleTimeoutRef.current) {
                            clearTimeout(aiIdleTimeoutRef.current);
                            aiIdleTimeoutRef.current = null;
                          }
                          if (aiDraftingDoneTimeoutRef.current) {
                            clearTimeout(aiDraftingDoneTimeoutRef.current);
                            aiDraftingDoneTimeoutRef.current = null;
                          }
                          setAiDraftingIdle(false);
                          const promptText =
                            'Find another hotel and room type that exceeds the traveler preferences';
                          aiAutoTypeStartedRef.current = true;
                          setAiHasAutoTyped(true);
                          setAiDraftingPrompt(true);
                          setAiSearching(false);
                          setAiSuggestionVisible(false);
                          setDreamPrompt('');
                          if (aiTypingTimeoutRef.current) {
                            clearTimeout(aiTypingTimeoutRef.current);
                          }
                          const typeNext = (index) => {
                            if (index > promptText.length) {
                              setAiDraftingPrompt(false);
                              setAiSearching(true);
                              if (dreamAiTimeout) {
                                return;
                              }
                              aiSearchTimeoutRef.current = setTimeout(() => {
                                setAiSearching(false);
                              startDreamPlan('room');
                              setSelectedHotelName(effectiveDreamAiSuggestion.hotel);
                              setSelectedRoomId(effectiveDreamAiSuggestion.roomId);
                                setDreamSelection({
                                  type: 'room',
                                label: effectiveDreamAiSuggestion.hotel,
                                summary: `5 nights · 2 rooms · 1 traveller · ${effectiveDreamAiSuggestion.roomLabel}`,
                                  priceDelta: dreamAiSuggestedHotelDelta,
                                  total: dreamAiSuggestedHotelTotal
                                });
                                setAiSuggestionVisible(true);
                              }, 700);
                              return;
                            }
                            setDreamPrompt(promptText.slice(0, index));
                            aiTypingTimeoutRef.current = setTimeout(() => typeNext(index + 1), 24);
                          };
                          typeNext(1);
                        }}
                        onChange={(event) => {
                          if (aiTypingTimeoutRef.current) {
                            clearTimeout(aiTypingTimeoutRef.current);
                            aiTypingTimeoutRef.current = null;
                          }
                          if (aiSearchTimeoutRef.current) {
                            clearTimeout(aiSearchTimeoutRef.current);
                            aiSearchTimeoutRef.current = null;
                          }
                          if (aiIdleTimeoutRef.current) {
                            clearTimeout(aiIdleTimeoutRef.current);
                          }
                          if (aiDraftingDoneTimeoutRef.current) {
                            clearTimeout(aiDraftingDoneTimeoutRef.current);
                          }
                          aiAutoTypeStartedRef.current = true;
                          setAiHasAutoTyped(true);
                          setAiDraftingPrompt(false);
                          setAiSearching(false);
                          setAiSuggestionVisible(false);
                          setAiDraftingIdle(false);
                          setDreamPrompt(event.target.value);
                          aiIdleTimeoutRef.current = setTimeout(() => {
                            setAiDraftingIdle(true);
                            aiDraftingDoneTimeoutRef.current = setTimeout(() => {
                              setAiDraftingIdle(false);
                            }, 1200);
                          }, 650);
                        }}
                        block
                        sx={{
                          borderColor: 'var(--borderColor-accent-emphasis)',
                          background: 'linear-gradient(120deg, rgba(218,227,255,0.35), rgba(255,255,255,0.7))',
                          boxShadow: '0 0 0 1px rgba(130,80,223,0.35), 0 6px 18px rgba(130,80,223,0.12)',
                          paddingRight: aiSearching ? 170 : 34,
                          '&:focus-within': {
                            boxShadow: '0 0 0 2px rgba(130,80,223,0.55), 0 10px 24px rgba(130,80,223,0.18)'
                          }
                        }}
                      />
                      {aiSearching && (
                        <span
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
                            right: 34,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: '#7b5cff',
                            textAlign: 'left',
                            pointerEvents: 'none'
                          }}
                        >
                          AI drafting request…
                        </span>
                      )}
                      {!aiSearching && (
                        <span
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
                            right: 10,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 10,
                            height: 10,
                            borderRadius: 999,
                            background:
                              'radial-gradient(circle at 30% 30%, #fff 0%, #d7c6ff 30%, #7b5cff 65%, #4b2bbf 100%)',
                            boxShadow: '0 0 0 1px rgba(130,80,223,0.35), 0 0 10px rgba(130,80,223,0.45)',
                            animation: 'aiPulse 1.6s ease-in-out infinite',
                            pointerEvents: 'none'
                          }}
                        />
                      )}
                    </div>
                    <div />
                  </div>
              <IconButton
                aria-label="Close dream flow"
                onClick={closeDreamFlow}
                icon={XIcon}
                variant="default"
                size="small"
                sx={closeIconButtonSx}
              />
                </div>
              </FormControl>
              <FormControl>
                <FormControl.Label>Test scenario</FormControl.Label>
                <Select
                  value={dreamTestScenario}
                  onChange={(event) => setDreamTestScenario(event.target.value)}
                  block
                >
                  <Select.Option value="default">Default</Select.Option>
                  <Select.Option value="ai_no_suggestion">AI suggestion hidden</Select.Option>
                  <Select.Option value="ai_alt_suggestion">AI alternate suggestion</Select.Option>
                  <Select.Option value="ai_timeout">AI search timeout</Select.Option>
                  <Select.Option value="input_empty">Input empty</Select.Option>
                  <Select.Option value="input_long">Input long</Select.Option>
                  <Select.Option value="input_special">Input special chars</Select.Option>
                  <Select.Option value="empty_results">No results</Select.Option>
                  <Select.Option value="availability_issue">Availability issue</Select.Option>
                  <Select.Option value="payment_flow">Payment flow</Select.Option>
                  <Select.Option value="payment_failure">Payment failure</Select.Option>
                </Select>
              </FormControl>
            </Stack>
          </Box>

          {dreamResults && !dreamDateChange && (
            <Box sx={cardSx}>
              {effectiveAiSuggestionVisible && (
                <Box sx={{ ...cardSlimSx, mb: 2, borderStyle: 'dashed', background: 'var(--canvas-subtle)' }}>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: 12,
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <Text as="div" sx={{ fontWeight: 600 }}>
                        AI suggestion
                      </Text>
                      <Text sx={{ color: 'fg.muted', fontSize: 0 }}>
                        {effectiveDreamAiSuggestion.hotel} · {dreamAiSuggestedRoom?.label || 'Room upgrade'}
                      </Text>
                    </div>
                    <Button
                      size="small"
                      onClick={() => {
                        startDreamPlan('room');
                        setSelectedHotelName(effectiveDreamAiSuggestion.hotel);
                        setSelectedRoomId(effectiveDreamAiSuggestion.roomId);
                        setDreamSelection({
                          type: 'hotel',
                          label: effectiveDreamAiSuggestion.hotel,
                          summary: '5 nights · 2 rooms · 1 traveller',
                          priceDelta: dreamAiSuggestedHotelDelta,
                          total: dreamAiSuggestedHotelTotal
                        });
                        setAiSuggestionVisible(false);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </Box>
              )}
              <Stack gap="condensed">
                {dreamResultsList.map((item) => {
                  const nextTotal = DREAM_HOTEL_TOTALS[item.name] || DREAM_BASE_TOTAL;
                  const delta = nextTotal - DREAM_BASE_TOTAL;
                  const selectHotel = () => {
                    setSelectedHotelName(item.name);
                    setDreamSelection({
                      type: 'hotel',
                      label: item.name,
                      summary: '5 nights · 2 rooms · 1 traveller',
                      priceDelta: delta,
                      total: nextTotal
                    });
                  };
                  return (
                    <div
                      key={item.name}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: 12,
                        alignItems: 'center',
                        borderBottom: '1px solid var(--borderColor-default)',
                        paddingBottom: 8,
                        cursor: 'pointer'
                      }}
                      onClick={selectHotel}
                    >
                      <div>
                        <Text as="div" sx={{ fontWeight: 600 }}>
                          {item.name} · {item.price} per night · {formatDelta(delta)} total
                        </Text>
                      </div>
                      <Button
                        size="small"
                        variant={selectedHotelName === item.name ? 'primary' : 'default'}
                        disabled={selectedHotelName === item.name}
                        onClick={(event) => {
                          event.stopPropagation();
                          selectHotel();
                          setDreamResults(false);
                          setDreamDateChange(false);
                          setDreamPayment(true);
                        }}
                      >
                        {selectedHotelName === item.name ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  );
                })}
                {dreamResultsList.length === 0 && (
                  <Text as="div" sx={{ color: 'fg.muted' }}>
                    No matching hotels yet. Try different dates or room preferences.
                  </Text>
                )}
              </Stack>
              {renderDreamConfirmBar()}
            </Box>
          )}

          {dreamDateChange && (
            <Box sx={{ ...cardSx, p: 0 }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0, 2fr) minmax(220px, 1fr)',
                  gap: 16,
                  alignItems: 'start'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  <div
                    style={{
                      border: '1px solid var(--borderColor-default)',
                      borderRadius: 8,
                      padding: 12,
                      background: 'var(--canvas-default)'
                    }}
                  >
                    <CalendarPicker
                      startDate={dreamDateRange.start}
                      endDate={dreamDateRange.end}
                      months={dreamCalendarMonths}
                      scale={1.15}
                      live
                      currentRange={currentBookingRange}
                      selectedRange={dreamNewDates ? dreamDateRange : null}
                      onDateClick={(date, month) => {
                        const nextStart = currentBookingRange.start;
                        const nextEnd = Math.max(date, nextStart);
                        setDreamDateRange({ start: nextStart, end: nextEnd, month: month.toUpperCase() });
                        setDreamNewDates(true);
                        setDreamSelection({
                          type: 'dates',
                          label: 'Selected new dates',
                          summary: `${month} ${date}–${nextEnd}, 2024`,
                          priceDelta: 410,
                          total: DREAM_BASE_TOTAL + 410
                        });
                      }}
                    />
                  </div>
                </div>
                {showRoomOptions ? (
                  <div
                    style={{
                      border: '1px solid var(--borderColor-default)',
                      borderRadius: 8,
                      padding: 12,
                      background: 'var(--canvas-default)'
                    }}
                  >
                    {effectiveAiSuggestionVisible && (
                      <Box sx={{ ...cardSlimSx, mb: 2, borderStyle: 'dashed', background: 'var(--canvas-subtle)' }}>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            gap: 12,
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <Text as="div" sx={{ fontWeight: 600 }}>
                              AI suggestion
                            </Text>
                            <Text sx={{ color: 'fg.muted', fontSize: 0 }}>
                              {effectiveDreamAiSuggestion.hotel} · {dreamAiSuggestedRoom?.label || 'Room upgrade'}
                            </Text>
                          </div>
                          <Button
                            size="small"
                            onClick={() => {
                              setSelectedHotelName(effectiveDreamAiSuggestion.hotel);
                              setSelectedRoomId(effectiveDreamAiSuggestion.roomId);
                              setDreamSelection({
                                type: 'hotel',
                                label: effectiveDreamAiSuggestion.hotel,
                                summary: '5 nights · 2 rooms · 1 traveller',
                                priceDelta: dreamAiSuggestedHotelDelta,
                                total: dreamAiSuggestedHotelTotal
                              });
                              setAiSuggestionVisible(false);
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </Box>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                      <div style={{ display: 'inline-flex', border: '1px solid var(--borderColor-default)', borderRadius: 999, overflow: 'hidden' }}>
                        <button
                          type="button"
                          onClick={() => {
                            startDreamPlan('room');
                          }}
                          style={{
                            padding: '2px 10px',
                            fontSize: '11px',
                            border: 'none',
                            background: showRoomOptions ? 'var(--bgColor-accent-muted)' : 'var(--canvas-default)',
                            color: showRoomOptions ? 'var(--fgColor-accent)' : 'var(--fgColor-default)',
                            cursor: 'pointer'
                          }}
                        >
                          Rooms
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            startDreamPlan('hotel');
                          }}
                          style={{
                            padding: '2px 10px',
                            fontSize: '11px',
                            border: 'none',
                            background: !showRoomOptions ? 'var(--bgColor-accent-muted)' : 'var(--canvas-default)',
                            color: !showRoomOptions ? 'var(--fgColor-accent)' : 'var(--fgColor-default)',
                            cursor: 'pointer'
                          }}
                        >
                          Hotels
                        </button>
                      </div>
                    </div>
                    <Stack gap="condensed">
                      {DREAM_ROOM_OPTIONS.map((room) => (
                        <div
                          key={room.id}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            gap: 8,
                            alignItems: 'center',
                            borderBottom: '1px solid var(--borderColor-default)',
                            paddingBottom: 8,
                            background: selectedRoomId === room.id ? 'var(--bgColor-accent-muted)' : 'transparent',
                            borderRadius: 6,
                            paddingLeft: 6,
                            paddingRight: 6
                          }}
                        >
                          <div>
                            <Text as="div" sx={{ fontWeight: 600 }}>
                              {room.label} · {DREAM_ROOM_PRICES[room.id]} per night · {formatDelta(room.delta)} total
                            </Text>
                          </div>
                          <Button
                            size="small"
                            variant={selectedRoomId === room.id ? 'primary' : 'default'}
                            disabled={selectedRoomId === room.id}
                            onClick={() => {
                              setSelectedRoomId(room.id);
                              setDreamSelection({
                                type: 'room',
                                label: `Room: ${room.label}`,
                                summary: '5 nights · 2 rooms · 1 traveller',
                                priceDelta: room.delta,
                                total: DREAM_BASE_TOTAL + room.delta
                              });
                              setDreamPayment(false);
                            }}
                          >
                            {selectedRoomId === room.id ? 'Selected' : 'Select'}
                          </Button>
                        </div>
                      ))}
                    </Stack>
                  </div>
                ) : (
                  <div
                    style={{
                      border: '1px solid var(--borderColor-default)',
                      borderRadius: 8,
                      padding: 12,
                      background: 'var(--canvas-default)'
                    }}
                  >
                    {effectiveAiSuggestionVisible && (
                      <Box sx={{ ...cardSlimSx, mb: 2, borderStyle: 'dashed', background: 'var(--canvas-subtle)' }}>
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr auto',
                            gap: 12,
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <Text as="div" sx={{ fontWeight: 600 }}>
                              AI suggestion
                            </Text>
                            <Text sx={{ color: 'fg.muted', fontSize: 0 }}>
                              {effectiveDreamAiSuggestion.hotel} · {dreamAiSuggestedRoom?.label || 'Room upgrade'}
                            </Text>
                          </div>
                          <Button
                            size="small"
                            onClick={() => {
                              setSelectedHotelName(effectiveDreamAiSuggestion.hotel);
                              setSelectedRoomId(effectiveDreamAiSuggestion.roomId);
                              setDreamSelection({
                                type: 'hotel',
                                label: effectiveDreamAiSuggestion.hotel,
                                summary: '5 nights · 2 rooms · 1 traveller',
                                priceDelta: dreamAiSuggestedHotelDelta,
                                total: dreamAiSuggestedHotelTotal
                              });
                              setAiSuggestionVisible(false);
                            }}
                          >
                            Apply
                          </Button>
                        </div>
                      </Box>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginBottom: 8 }}>
                      <div style={{ display: 'inline-flex', border: '1px solid var(--borderColor-default)', borderRadius: 999, overflow: 'hidden' }}>
                        <button
                          type="button"
                          onClick={() => {
                            startDreamPlan('room');
                          }}
                          style={{
                            padding: '2px 10px',
                            fontSize: '11px',
                            border: 'none',
                            background: showRoomOptions ? 'var(--bgColor-accent-muted)' : 'var(--canvas-default)',
                            color: showRoomOptions ? 'var(--fgColor-accent)' : 'var(--fgColor-default)',
                            cursor: 'pointer'
                          }}
                        >
                          Rooms
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            startDreamPlan('hotel');
                          }}
                          style={{
                            padding: '2px 10px',
                            fontSize: '11px',
                            border: 'none',
                            background: !showRoomOptions ? 'var(--bgColor-accent-muted)' : 'var(--canvas-default)',
                            color: !showRoomOptions ? 'var(--fgColor-accent)' : 'var(--fgColor-default)',
                            cursor: 'pointer'
                          }}
                        >
                          Hotels
                        </button>
                      </div>
                    </div>
                    <Stack gap="condensed">
                      {dreamResultsList.map((item) => {
                        const nextTotal = DREAM_HOTEL_TOTALS[item.name] || DREAM_BASE_TOTAL;
                        const delta = nextTotal - DREAM_BASE_TOTAL;
                        const selectHotel = () => {
                          setSelectedHotelName(item.name);
                          setDreamSelection({
                            type: 'hotel',
                            label: item.name,
                            summary: '5 nights · 2 rooms · 1 traveller',
                            priceDelta: delta,
                            total: nextTotal
                          });
                        };
                        return (
                          <div
                            key={item.name}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '1fr auto',
                              gap: 8,
                              alignItems: 'center',
                              borderBottom: '1px solid var(--borderColor-default)',
                              paddingBottom: 8,
                              background: selectedHotelName === item.name ? 'var(--bgColor-accent-muted)' : 'transparent',
                              borderRadius: 6,
                              paddingLeft: 6,
                              paddingRight: 6,
                              cursor: 'pointer'
                            }}
                            onClick={selectHotel}
                          >
                            <div>
                              <Text as="div" sx={{ fontWeight: 600 }}>
                                {item.name} · {item.price} per night · {formatDelta(delta)} total
                              </Text>
                            </div>
                            <Button
                              size="small"
                              variant={selectedHotelName === item.name ? 'primary' : 'default'}
                              disabled={selectedHotelName === item.name}
                              onClick={(event) => {
                                event.stopPropagation();
                                selectHotel();
                                if (dreamForcePayment) {
                                  setDreamResults(false);
                                  setDreamDateChange(false);
                                  setDreamPayment(true);
                                }
                              }}
                            >
                              {selectedHotelName === item.name ? 'Selected' : 'Select'}
                            </Button>
                          </div>
                        );
                      })}
                      {dreamResultsList.length === 0 && (
                        <Text as="div" sx={{ color: 'fg.muted' }}>
                          No matching hotels yet. Try different dates or room preferences.
                        </Text>
                      )}
                    </Stack>
                  </div>
                )}
              </div>
              {renderDreamConfirmBar()}
            </Box>
          )}


          {dreamPayment && (
            <Box sx={cardSx}>
              <Box sx={cardHeaderSx}>
                <Text as="strong">Confirm change</Text>
                <Text sx={{ color: 'fg.muted', fontSize: 0 }}>1-step checkout</Text>
              </Box>
              <Stack sx={formStackSx}>
                <Box sx={cardSlimSx}>
                  <Text as="strong">{dreamSelection.label}</Text>
                  <Text sx={{ color: 'fg.muted', fontSize: 0 }}>{dreamSelection.summary}</Text>
                  <Text sx={{ fontWeight: 600 }}>
                    {formatDelta(dreamSelection.priceDelta)} · ${dreamSelection.total.toLocaleString()}
                  </Text>
                </Box>
                <FormControl>
                  <FormControl.Label>Payment method</FormControl.Label>
                  <Select defaultValue="card" block>
                    <Select.Option value="card">Visa •••• 2852</Select.Option>
                    <Select.Option value="wallet">Apple Pay</Select.Option>
                    <Select.Option value="voucher">Travel credit</Select.Option>
                  </Select>
                </FormControl>
                <Box sx={actionsRowSx}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      if (dreamPaymentFailure) {
                        setDreamErrorMessage('Payment failed. Please try again.');
                        return;
                      }
                      if (selectedHotelName) {
                        setConfirmedHotelName(selectedHotelName);
                      }
                      if (selectedRoomId) {
                        setConfirmedRoomId(selectedRoomId);
                      }
                      if (dreamNewDates && dreamSelection?.summary) {
                        setConfirmedDatesSummary(dreamSelection.summary);
                      }
                      setDreamPayment(false);
                      setDreamConfirmed(true);
                    }}
                  >
                    Confirm
                  </Button>
                  <Button onClick={() => setDreamPayment(false)} variant="default">
                    Back
                  </Button>
                </Box>
              </Stack>
            </Box>
          )}

          {dreamConfirmed && (
            <Box sx={cardSx}>
              <Flash variant="success">
                Change confirmed. The itinerary and receipt are updated instantly.
              </Flash>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  size="small"
                  onClick={() => {
                    setDreamConfirmed(false);
                    setDreamPayment(false);
                    setDreamResults(false);
                    setDreamDateChange(false);
                    setDreamNewDates(false);
                  }}
                >
                  Undo change
                </Button>
                <Button size="small" variant="invisible" onClick={closeDreamFlow}>
                  Done
                </Button>
              </Box>
            </Box>
          )}
        </Box>

      </Box>
    </Box>
  ) : null;

  const itineraryCards = [
    {
      key: 'hotel-stay',
      content: (
        <div
          style={{
            border: 'var(--borderWidth-thin) solid var(--borderColor-default)',
            borderRadius: 8,
            background: 'transparent',
            padding: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <Text as="div" sx={{ color: 'fg.muted', display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <span>
                  🏨 {dreamItineraryHotel} · {dreamItineraryRoom} · {dreamItineraryDates} · 5 nights · 2 rooms · 1 traveller
                </span>
                {(showSuccess || debugShowToast) && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      marginLeft: 6,
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--fgColor-success)',
                      animation: 'updatedFlash 1.1s ease-in-out infinite'
                    }}
                  >
                    <span aria-hidden="true">✓</span>
                    <span>{successLabel}</span>
                  </span>
                )}
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Text as="div" sx={{ fontWeight: 600 }}>$2,865</Text>
              <Button
                variant="invisible"
                size="small"
                aria-label="Amendment history"
                sx={{ minWidth: 28, px: 1 }}
                onClick={() =>
                  setShowAmendmentHistory((prev) => {
                    const next = !prev;
                    if (next) {
                      setShowDreamFlow(false);
                    }
                    return next;
                  })
                }
                style={
                  showAmendmentHistory
                    ? {
                        background: 'var(--bgColor-accent-muted)',
                        borderRadius: 6
                      }
                    : undefined
                }
              >
                <HistoryIcon size={14} />
              </Button>
              {renderActionsMenu('hotel')}
            </div>
          </div>
          {showDreamFlow && (
            <div
              style={{
                marginTop: 12,
                borderTop: '1px solid var(--borderColor-default)',
                paddingTop: 12
              }}
            >
              {dreamFlowPanel}
            </div>
          )}
          {showAmendmentHistory && !showDreamFlow && (
            <div
              style={{
                marginTop: 12,
                borderTop: '1px solid var(--borderColor-default)',
                paddingTop: 12
              }}
            >
              <Stack gap="condensed">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    borderBottom: amendmentHistoryEntries.length > 0 ? '1px solid var(--borderColor-default)' : 'none',
                    paddingBottom: amendmentHistoryEntries.length > 0 ? 8 : 0
                  }}
                >
                  <Text
                    as="div"
                    sx={{ fontWeight: 600 }}
                    style={{
                      fontSize: '11px',
                      lineHeight: '14px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flex: 1,
                      minWidth: 0
                    }}
                  >
                    Booking created · Royal Hawaiian Resort · Standard Room · May 15–20
                  </Text>
                  <Text
                    as="div"
                    sx={{ color: 'fg.muted' }}
                    style={{ fontSize: '10px', lineHeight: '12px', whiteSpace: 'nowrap' }}
                  >
                    {formatTimestamp(new Date('2024-03-12T09:18:00'))}
                  </Text>
                  <Button size="small" variant="invisible" disabled sx={{ minWidth: 56, px: 2 }}>
                    Undo
                  </Button>
                </div>
                {amendmentHistoryEntries.map((entry) => (
                  <div
                    key={entry.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      borderBottom: '1px solid var(--borderColor-default)',
                      paddingBottom: 8
                    }}
                  >
                    <Text
                      as="div"
                      sx={{ fontWeight: 600 }}
                      style={{
                        fontSize: '11px',
                        lineHeight: '14px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flex: 1,
                        minWidth: 0
                      }}
                    >
                      {entry.title} · {entry.detail}
                    </Text>
                    <Text
                      as="div"
                      sx={{ color: 'fg.muted' }}
                      style={{ fontSize: '10px', lineHeight: '12px', whiteSpace: 'nowrap' }}
                    >
                      {entry.timestamp}
                    </Text>
                    {undoingEntryId === entry.id ? (
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          minWidth: 120,
                          justifyContent: 'flex-end'
                        }}
                      >
                        <Spinner size="small" />
                        <Text as="span" sx={{ color: 'fg.muted' }} style={{ fontSize: '10px' }}>
                          Checking availability…
                        </Text>
                      </div>
                    ) : (
                      <Button
                        size="small"
                        variant="invisible"
                        sx={{ minWidth: 56, px: 2 }}
                        onClick={() => {
                          setUndoingEntryId(entry.id);
                          setTimeout(() => {
                            setUndoingEntryId(null);
                            setSuccessLabel('Change reverted');
                            setShowSuccess(true);
                            setTimeout(() => setShowSuccess(false), 2000);
                          }, 900);
                        }}
                      >
                        Undo
                      </Button>
                    )}
                  </div>
                ))}
              </Stack>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <BaseStyles>
        <div ref={portalRootRef}>
          <style>{`
            @keyframes updatedFlash {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.25; }
            }
            @keyframes livePulse {
              0%, 100% { transform: scale(1); opacity: 0.7; }
              50% { transform: scale(1.5); opacity: 1; }
            }
            @keyframes liveSheen {
              0% { background-position: -200% 0; }
              100% { background-position: 200% 0; }
            }
            @keyframes aiPulse {
              0%, 100% { transform: translateY(-50%) scale(1); opacity: 0.8; }
              50% { transform: translateY(-50%) scale(1.15); opacity: 1; }
            }
          `}</style>
          <Box role="region" aria-label="Amendments demo window" sx={resolvedWindowSx}>
        {!embedded && (
          <Box sx={headerSx}>
            <Heading as="h1" sx={{ fontSize: '12px', lineHeight: 1.3, m: 0 }}>
              Streamlining Amendments
            </Heading>
            <Box sx={headerControlsSx}>
              <Text as="span">Interactive Demo</Text>
              <ToggleSwitch
                size="small"
                aria-label="Interactive demo toggle"
                defaultChecked
                onChange={(event) => {
                  if (!event.target.checked) {
                    onBackToCaseStudy?.();
                  }
                }}
              />
              <IconButton
                aria-label="Close Amendments"
                onClick={onClose}
                icon={XIcon}
                variant="default"
                size="small"
                sx={closeIconButtonSx}
              />
            </Box>
          </Box>
        )}

        {!showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && !showNewFlow && (
          <Box sx={{ ...contentAreaSx, pb: 0 }}>
            <Stack direction="horizontal" align="center" justify="space-between" sx={cardSlimSx}>
              <div>
                <Text as="div" style={{ fontSize: '16px', fontWeight: 500 }}>
                  <Text as="span">Hawaii Family Vacation</Text>
                  {' · '}
                  <Text as="span">May 15–20, 2024 · 1 traveller</Text>
                </Text>
              </div>
              <Text as="strong" style={{ fontSize: '16px', fontWeight: 500 }}>$4,805</Text>
            </Stack>
          </Box>
        )}
        {!showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && !showNewFlow && (
          <Box sx={{ ...contentAreaSx, pt: 0, pb: 0 }}>
            <UnderlineNav aria-label="Trip sections">
              {TAB_LABELS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <UnderlineNav.Link
                    key={tab}
                    href={`#${tab}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveTab(tab);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    selected={isActive}
                    sx={isActive ? { fontWeight: 600 } : undefined}
                    style={isActive ? { fontWeight: 600 } : undefined}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </UnderlineNav.Link>
                );
              })}
            </UnderlineNav>
          </Box>
        )}
        {(showSearchResults || showCartPage || showTravellersPage || showPaymentPage) && (
          <Box sx={{ ...contentAreaSx, pt: 0, pb: 0 }}>
            <Box direction="horizontal" align="center" gap="condensed" wrap="nowrap">
              {oldFlowSteps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentOldFlowStep;
                const isComplete = stepNumber < currentOldFlowStep;
                return (
                  <Box
                    key={step}
                    sx={{
                      flex: 1,
                      textAlign: 'center',
                      color: isActive ? 'fg.default' : isComplete ? 'success.fg' : 'fg.muted'
                    }}
                  >
                    <Text
                      as="div"
                      sx={{
                        fontSize: 0
                      }}
                      style={isActive ? { fontWeight: 700, textDecoration: 'underline' } : { fontWeight: 400 }}
                    >
                      {stepNumber}. {step}
                    </Text>
                  </Box>
                );
              })}
            </Box>
            <ProgressBar sx={{ mt: 1 }} aria-label="Old flow progress">
              <ProgressBar.Item
                aria-label="Old flow progress"
                progress={(currentOldFlowStep / oldFlowSteps.length) * 100}
              />
            </ProgressBar>
          </Box>
        )}
        {showNewFlow && (
          <Box sx={{ ...contentAreaSx, pt: 0, pb: 0 }}>
            <Box direction="horizontal" align="center" gap="condensed" wrap="nowrap">
              {newFlowSteps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentNewFlowStep;
                const isComplete = stepNumber < currentNewFlowStep;
                return (
                  <Box
                    key={step}
                    sx={{
                      flex: 1,
                      textAlign: 'center',
                      color: isActive ? 'fg.default' : isComplete ? 'success.fg' : 'fg.muted'
                    }}
                  >
                    <Text
                      as="div"
                      sx={{
                        fontSize: 0
                      }}
                      style={isActive ? { fontWeight: 700, textDecoration: 'underline' } : { fontWeight: 400 }}
                    >
                      {stepNumber}. {step}
                    </Text>
                  </Box>
                );
              })}
            </Box>
            <ProgressBar sx={{ mt: 1 }} aria-label="New flow progress">
              <ProgressBar.Item
                aria-label="New flow progress"
                progress={(currentNewFlowStep / newFlowSteps.length) * 100}
              />
            </ProgressBar>
          </Box>
        )}
        <Box sx={contentAreaSx}>
          {!showNewFlow && !showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && (
            <Box sx={sectionListSx} />
          )}
          {activeTab === 'itinerary' && !showNewFlow && !showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && (
            <Box sx={sectionListSx}>
              {itineraryCards.map((card) => (
                <React.Fragment key={card.key}>{card.content}</React.Fragment>
              ))}
            </Box>
          )}

          {activeTab === 'documents' && <Box />}
          {activeTab === 'payments' && <Box />}
          {activeTab === 'notes' && <Box />}
          {activeTab === 'travellers' && !showNewFlow && !showSearchResults && !showCartPage && !showTravellersPage && !showPaymentPage && (
            <Box sx={sectionListSx}>
              <div style={{ ...compactCardStyle, display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--canvas-subtle)',
                      color: 'var(--fgColor-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: 11
                    }}
                    aria-hidden="true"
                  >
                    JH
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Text as="span" sx={{ fontWeight: 600 }}>Joel Hickey</Text>
                    <Text as="span" sx={{ color: 'fg.muted', fontSize: 0 }}>• Adult</Text>
                  </div>
                </div>
              </div>
            </Box>
          )}
          {activeTab === 'history' && <Box />}

          {showSearchResults && (
            <Box sx={columnStackSx}>
              <Text as="strong">Found 8 available hotels</Text>
              <Box sx={resultsGridSx}>
                {hotels.concat(hotels.slice(0, 3)).map((hotel, idx) => (
                  <div
                    key={`${hotel.name}-${idx}`}
                    style={{
                      border: 'var(--borderWidth-thin) solid var(--borderColor-default)',
                      borderRadius: 8,
                      background: 'transparent',
                      padding: 12
                    }}
                    onClick={() => {
                      setExpandedHotelId((current) => (current === idx ? null : idx));
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <Text as="div" sx={{ color: 'fg.muted' }}>
                          {hotel.name}
                        </Text>
                        <Text>★ {hotel.rating} ({hotel.reviews} reviews)</Text>
                        <Text>Waikiki Beach · Free WiFi · Pool · Ocean View</Text>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Text as="div" sx={{ fontWeight: 600 }}>{hotel.price}</Text>
                        {expandedHotelId === idx ? (
                          <ChevronDownIcon size={12} />
                        ) : (
                          <ChevronRightIcon size={12} />
                        )}
                      </div>
                    </div>
                    {expandedHotelId === idx && (
                      <div style={{ marginTop: 12, borderTop: '1px solid var(--borderColor-default)', paddingTop: 12 }}>
                        <Text as="strong" style={{ marginBottom: '8px', display: 'block' }}>
                          Available rooms
                        </Text>
                        <Stack gap="condensed" sx={{ width: '100%' }}>
                          {roomOptions.map((room, index) => (
                            <div
                              key={room.id}
                              style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr auto',
                                alignItems: 'center',
                                gap: 8,
                                width: '100%',
                                padding: '6px 0',
                                borderBottom: index === roomOptions.length - 1 ? 'none' : '1px solid var(--borderColor-default)'
                              }}
                            >
                              <Text as="span" sx={{ color: 'fg.muted' }}>
                                {room.label} · {room.price}
                              </Text>
                              <div style={{ justifySelf: 'end' }}>
                                <Button
                                  size="small"
                                  variant="primary"
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    setOldFlowSelectedHotel({ ...hotel, price: room.price });
                                    proceedToCart();
                                  }}
                                  style={{ width: 'auto' }}
                                >
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          ))}
                        </Stack>
                      </div>
                    )}
                  </div>
                ))}
              </Box>
            </Box>
          )}

          {showCartPage && (
            <Box sx={columnStackSx}>
              <Text as="strong">New Hotel Selection</Text>
              <div
                style={{
                  border: 'var(--borderWidth-thin) solid var(--borderColor-default)',
                  borderRadius: 8,
                  background: 'transparent',
                  padding: 12
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <Text as="div" sx={{ color: 'fg.muted' }}>
                      {oldFlowSelectedHotel?.name || 'Selected hotel'} · 5 nights · 2 rooms · 1 traveller
                    </Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Text as="div" sx={{ fontWeight: 600 }}>{oldFlowSelectedHotel?.price || '$0'}</Text>
                  </div>
                </div>
              </div>
              <Text sx={{ color: 'fg.muted' }}>
                Total: ${travelTotals.total.toLocaleString()}
              </Text>
            </Box>
          )}

          {showTravellersPage && (
            <Box sx={columnStackSx}>
              <Box sx={cardSx}>
                <Box sx={cardHeaderSx}>
                  <Text as="strong">Select Travellers</Text>
                  <Text sx={{ color: 'fg.muted', fontSize: 0 }}>For the new room</Text>
                </Box>
                <Stack sx={formStackSx}>
                  {[
                    { id: 'joel-hickey', label: 'Joel Hickey (Adult)', checked: true }
                  ].map((traveller) => (
                    <label
                      key={traveller.id}
                      htmlFor={`traveller-page-${traveller.id}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400 }}
                    >
                      <Checkbox id={`traveller-page-${traveller.id}`} defaultChecked={traveller.checked} />
                      <Text as="span" sx={{ fontWeight: 400 }}>{traveller.label}</Text>
                    </label>
                  ))}
                </Stack>
              </Box>
            </Box>
          )}

          {showPaymentPage && (
            <Box sx={columnStackSx}>
              <Box sx={cardSx}>
                <Box sx={cardHeaderSx}>
                  <Text as="strong">Payment Details</Text>
                  <Text sx={{ color: 'fg.muted', fontSize: 0 }}>Secure checkout</Text>
                </Box>
                <Stack sx={formStackSx}>
                  <FormControl>
                    <FormControl.Label>Card Number</FormControl.Label>
                    <TextInput placeholder="1234 5678 9012 3456" block />
                  </FormControl>
                  <Stack direction="horizontal" gap="condensed" wrap="wrap">
                    <FormControl>
                      <FormControl.Label>Expiry Date</FormControl.Label>
                      <TextInput placeholder="MM/YY" block />
                    </FormControl>
                    <FormControl>
                      <FormControl.Label>CVV</FormControl.Label>
                      <TextInput placeholder="123" block />
                    </FormControl>
                  </Stack>
                  <FormControl>
                  <FormControl.Label>Cardholder Name</FormControl.Label>
                  <TextInput placeholder="Joel Hickey" block />
                  </FormControl>
                </Stack>
              </Box>
              <Box sx={{ ...cardSx, mt: 3 }}>
                <Text as="strong">Payment Summary</Text>
                <Text>Hotel booking</Text>
                <Text>{oldFlowSelectedHotel?.price || '$0'}</Text>
              </Box>
            </Box>
          )}

          {showNewFlow && (
            <Box sx={columnStackSx}>
              {newFlowStep === 1 && (
                <Box sx={columnStackSx}>
                  <Flash
                    variant="warning"
                    sx={{ fontSize: 0, lineHeight: 1.2, display: 'inline-flex', alignSelf: 'flex-start' }}
                    style={{ padding: '6px 8px' }}
                  >
                    <Text sx={{ fontWeight: 600, mb: 0 }} as="span">Amendment Fee:</Text>{' '}
                    <Text sx={{ color: 'fg.muted' }} as="span">$95.00 (includes agency service fee)</Text>
                  </Flash>
                  <Box sx={newFlowCardSx} style={newFlowCompactCardStyle}>
                    <Box sx={cardHeaderSx}>
                      <Text as="strong">Travellers</Text>
                    </Box>
                    <div style={travellersGridStyle}>
                      {[
                        { id: 'joel-hickey-new', label: 'Joel Hickey', checked: true }
                      ].map((traveller) => (
                        <label
                          key={traveller.id}
                          htmlFor={traveller.id}
                          style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400 }}
                        >
                          <Checkbox id={traveller.id} defaultChecked={traveller.checked} />
                          <Text as="span" sx={{ fontWeight: 400 }}>{traveller.label}</Text>
                        </label>
                      ))}
                    </div>
                  </Box>
                  <Box sx={{ ...newFlowCardSx, mt: 3 }} style={newFlowCompactCardStyle}>
                    <Box sx={cardHeaderSx}>
                      <Text as="strong">Search Parameters</Text>
                    </Box>
                    <Stack sx={compactFormStackSx}>
                      <div style={searchGridStyle}>
                        <FormControl style={{ gridColumn: '1 / -1' }}>
                          <FormControl.Label sx={{ fontSize: 0, mb: 1 }}>Destination</FormControl.Label>
                          <TextInput defaultValue="Honolulu, Hawaii" block />
                        </FormControl>
                        <FormControl>
                          <FormControl.Label sx={{ fontSize: 0, mb: 1 }}>Check-in Date</FormControl.Label>
                          <TextInput defaultValue="2024-05-15" block />
                        </FormControl>
                        <FormControl>
                          <FormControl.Label sx={{ fontSize: 0, mb: 1 }}>Check-out Date</FormControl.Label>
                          <TextInput defaultValue="2024-05-20" block />
                        </FormControl>
                        <FormControl>
                          <FormControl.Label sx={{ fontSize: 0, mb: 1 }}>Rooms</FormControl.Label>
                          <Select defaultValue="2" block>
                            <Select.Option value="1">1 room</Select.Option>
                            <Select.Option value="2">2 rooms</Select.Option>
                            <Select.Option value="3">3 rooms</Select.Option>
                          </Select>
                        </FormControl>
                      </div>
                    </Stack>
                  </Box>
                </Box>
              )}
              {newFlowStep === 2 && (
                <Box sx={columnStackSx}>
                  <Text as="strong">Found 8 available hotels</Text>
                  <Box sx={resultsGridSx}>
                    {hotels.concat(hotels.slice(0, 3)).map((hotel, idx) => {
                      const isExpanded = expandedHotelId === idx || (expandedHotelId === null && idx === 1);
                      return (
                      <div
                        key={`${hotel.name}-${idx}`}
                        style={{
                          border: 'var(--borderWidth-thin) solid var(--borderColor-default)',
                          borderRadius: 8,
                          background: 'transparent',
                          padding: 12
                        }}
                        onClick={() => {
                          setExpandedHotelId((current) => (current === idx ? null : idx));
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                          <div>
                            <Text as="div" sx={{ color: 'fg.muted' }}>
                              {hotel.name}
                            </Text>
                            <Text>★ {hotel.rating} ({hotel.reviews} reviews)</Text>
                            <Text>Waikiki Beach · Free WiFi · Pool · Ocean View</Text>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <Text as="div" sx={{ fontWeight: 600 }}>{hotel.price}</Text>
                            {isExpanded ? (
                              <ChevronDownIcon size={12} />
                            ) : (
                              <ChevronRightIcon size={12} />
                            )}
                          </div>
                        </div>
                        {isExpanded && (
                          <div style={{ marginTop: 12, borderTop: '1px solid var(--borderColor-default)', paddingTop: 12 }}>
                            <Text as="strong" style={{ marginBottom: '8px', display: 'block' }}>
                              Available rooms
                            </Text>
                            <Stack gap="condensed" sx={{ width: '100%' }}>
                              {roomOptions.map((room, index) => (
                                <div
                                  key={room.id}
                                  style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr auto',
                                    alignItems: 'center',
                                    gap: 8,
                                    width: '100%',
                                    padding: '6px 0',
                                    borderBottom: index === roomOptions.length - 1 ? 'none' : '1px solid var(--borderColor-default)'
                                  }}
                                >
                                  <Text as="span" sx={{ color: 'fg.muted' }}>
                                    {room.label} · {room.price}
                                  </Text>
                                  <div style={{ justifySelf: 'end' }}>
                                    <Button
                                      size="small"
                                      variant="primary"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setNewFlowSelectedHotel({ ...hotel, price: room.price });
                                        setExpandedHotelId(null);
                                        prepareCheckout();
                                      }}
                                      style={{ width: 'auto' }}
                                    >
                                      Add to Cart
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </Stack>
                          </div>
                        )}
                      </div>
                      );
                    })}
                  </Box>
                </Box>
              )}
              {newFlowStep === 3 && (
                <Box sx={columnStackSx}>
                  <div style={reviewGridStyle}>
                    <div style={compactCardStyle}>
                      <Stack gap="condensed">
                        <Text as="strong">Booking Summary</Text>
                        <Text sx={{ color: 'fg.muted', fontSize: 0 }}>
                          {(newFlowSelectedHotel?.price || '$425')} × 5 nights × 2 rooms × 1 traveller
                        </Text>
                        <Text sx={{ fontWeight: 600 }}>
                          Total ${newFlowTotals.total.toLocaleString()} (incl. taxes & fees)
                        </Text>
                      </Stack>
                    </div>
                    <div style={{ ...compactCardStyle, gridColumn: '1 / -1' }}>
                      <Text as="strong">Payment Details</Text>
                      <Stack sx={{ ...compactFormStackSx, mt: 1 }}>
                        <FormControl>
                          <FormControl.Label sx={{ fontSize: 0, mb: 1 }}>Card Number</FormControl.Label>
                          <TextInput placeholder="1234 5678 9012 3456" block />
                        </FormControl>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
                          <FormControl>
                            <FormControl.Label sx={{ fontSize: 0, mb: 1 }}>Expiry Date</FormControl.Label>
                            <TextInput placeholder="MM/YY" block />
                          </FormControl>
                          <FormControl>
                            <FormControl.Label sx={{ fontSize: 0, mb: 1 }}>CVV</FormControl.Label>
                            <TextInput placeholder="123" block />
                          </FormControl>
                          <FormControl>
                            <FormControl.Label sx={{ fontSize: 0, mb: 1 }}>Name</FormControl.Label>
                            <TextInput placeholder="Joel Hickey" block />
                          </FormControl>
                        </div>
                      </Stack>
                    </div>
                  </div>
                </Box>
              )}
            </Box>
          )}
        </Box>

        {showSearchResults && (
          <Box sx={resultsFooterSx}>
            <Box direction="horizontal" align="center" gap="condensed" wrap="wrap">
              <Button onClick={() => { setShowSearchResults(false); setIsSearchModalOpen(true); }}>Back to Search</Button>
              <Button onClick={resetOldFlow}>Cancel amendment</Button>
            </Box>
            {/* Add to Cart CTA lives in expanded room picker */}
          </Box>
        )}

        {showCartPage && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              gap: 12,
              borderTop: '1px solid var(--borderColor-default)',
              background: 'var(--canvas-default)',
              padding: '12px 16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <Button onClick={() => { setShowCartPage(false); setShowSearchResults(true); }}>Back to Results</Button>
              <Button onClick={resetOldFlow}>Cancel amendment</Button>
            </div>
            <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => {
                  showLoadingThen('Loading travellers...', () => {
                    setShowCartPage(false);
                    setShowTravellersPage(true);
                  });
                }}
                variant="primary"
                style={{ width: 'auto' }}
              >
                Proceed to Travellers →
              </Button>
            </div>
          </div>
        )}

        {showTravellersPage && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              gap: 12,
              borderTop: '1px solid var(--borderColor-default)',
              background: 'var(--canvas-default)',
              padding: '12px 16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <Button onClick={() => { setShowTravellersPage(false); setShowCartPage(true); }}>Back to Cart</Button>
              <Button onClick={resetOldFlow}>Cancel amendment</Button>
            </div>
            <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={() => {
                  showLoadingThen('Loading payment form...', () => {
                    setShowTravellersPage(false);
                    setShowPaymentPage(true);
                  });
                }}
                variant="primary"
                style={{ width: 'auto' }}
              >
                Go to Payment →
              </Button>
            </div>
          </div>
        )}

        {showPaymentPage && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              gap: 12,
              borderTop: '1px solid var(--borderColor-default)',
              background: 'var(--canvas-default)',
              padding: '12px 16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <Button onClick={() => { setShowPaymentPage(false); setShowTravellersPage(true); }}>Back to Travellers</Button>
              <Button onClick={resetOldFlow}>Cancel amendment</Button>
            </div>
            <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>
              <Button variant="primary" onClick={confirmPayment} style={{ width: 'auto' }}>
                Confirm Payment ✓
              </Button>
            </div>
          </div>
        )}

        {showNewFlow && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              gap: 12,
              borderTop: '1px solid var(--borderColor-default)',
              background: 'var(--canvas-default)',
              padding: '12px 16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {newFlowStep === 1 && (
                <Button onClick={() => { setShowNewFlow(false); setActiveTab('itinerary'); }}>
                  Cancel amendment
                </Button>
              )}
              {newFlowStep === 2 && (
                <>
                  <Button onClick={() => setNewFlowStep(1)}>Back to Details</Button>
                  <Button onClick={() => { setShowNewFlow(false); setActiveTab('itinerary'); }}>
                    Cancel amendment
                  </Button>
                </>
              )}
              {newFlowStep === 3 && (
                <>
                  <Button onClick={() => setNewFlowStep(2)}>Back to Select Hotel</Button>
                  <Button onClick={() => { setShowNewFlow(false); setActiveTab('itinerary'); }}>
                    Cancel amendment
                  </Button>
                </>
              )}
            </div>
            <div style={{ display: 'inline-flex', justifyContent: 'flex-end' }}>
              {newFlowStep === 1 && (
                <Button variant="primary" onClick={startNewFlowSearch} style={{ width: 'auto' }}>
                  Search Hotels →
                </Button>
              )}
              {newFlowStep === 3 && (
                <Button
                  variant="primary"
                  onClick={() => {
                    setLoadingMessage('Processing payment...');
                    setTimeout(() => {
                      setLoadingMessage('');
                      setSuccessLabel('Booking updated');
                      setShowNewFlow(false);
                      setActiveTab('itinerary');
                      setShowSuccess(true);
                      setTimeout(() => setShowSuccess(false), 3000);
                    }, 800);
                  }}
                  style={{ width: 'auto' }}
                >
                  Confirm & Pay ✓
                </Button>
              )}
            </div>
          </div>
        )}
        <PortalContext.Provider value={{ portalContainerName: 'amendmentsModal' }}>
          {loadingMessage && (
            <Dialog
              title={<span style={{ fontSize: '18px', fontWeight: 600 }}>{oldFlowSteps[currentOldFlowStep - 1] || 'Loading'}</span>}
              width="medium"
              position="center"
              onClose={() => {}}
              renderHeader={() => null}
            >
              <Dialog.Body>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Spinner size="small" />
                  <Text as="span">{loadingMessage}</Text>
                </div>
              </Dialog.Body>
            </Dialog>
          )}

          {isAmendModalOpen && (
              <Dialog
                title={<span style={{ fontSize: '18px', fontWeight: 600 }}>Amend Hotel</span>}
              width="xlarge"
              position="center"
              onClose={() => setIsAmendModalOpen(false)}
            >
              <Dialog.Body>
                <Stack sx={modalFormSx}>
                  <FormControl>
                    <FormControl.Label>Reason for Amendment</FormControl.Label>
                    <Select value={reasonForAmendment} onChange={(event) => setReasonForAmendment(event.target.value)} block>
                      <Select.Option value="">Select</Select.Option>
                      <Select.Option value="downgrade">Downgrade</Select.Option>
                      <Select.Option value="upgrade">Upgrade</Select.Option>
                      <Select.Option value="date_change">Date Change</Select.Option>
                      <Select.Option value="cancellation">Cancellation</Select.Option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Type of Amendment</FormControl.Label>
                    <Select value={causeOfAmendment} onChange={(event) => setCauseOfAmendment(event.target.value)} block>
                      <Select.Option value="">Select</Select.Option>
                      <Select.Option value="pricing_adjustment">Pricing Adjustment</Select.Option>
                      <Select.Option value="room_change">Room Change</Select.Option>
                      <Select.Option value="availability_issue">Availability Issue</Select.Option>
                    </Select>
                  </FormControl>
                </Stack>
                {reasonForAmendment && causeOfAmendment && (
                  <Flash
                    variant="warning"
                    sx={{ fontSize: 0, lineHeight: 1.2, display: 'inline-flex', alignSelf: 'flex-start' }}
                    style={{ padding: '6px 8px', marginTop: '8px' }}
                  >
                    <Text sx={{ fontWeight: 600, mb: 0 }} as="span">Amendment Fee:</Text>{' '}
                    <Text sx={{ color: 'fg.muted' }} as="span">$95.00 (includes agency service fee)</Text>
                  </Flash>
                )}
              </Dialog.Body>
              <Dialog.Footer>
                <div style={modalFooterStyle}>
                  <Button onClick={() => setIsAmendModalOpen(false)}>Cancel</Button>
                  <Button
                    variant="primary"
                    aria-disabled={reasonForAmendment && causeOfAmendment ? 'false' : 'true'}
                    disabled={!reasonForAmendment || !causeOfAmendment}
                  onClick={() => {
                    setIsAmendModalOpen(false);
                    showLoadingThen('Loading travellers...', () => {
                      setIsTravellersModalOpen(true);
                    });
                  }}
                  >
                    Continue to Travellers →
                  </Button>
                </div>
              </Dialog.Footer>
            </Dialog>
          )}

          {isTravellersModalOpen && (
            <Dialog
              title={<span style={{ fontSize: '18px', fontWeight: 600 }}>Travellers</span>}
              width="xlarge"
              position="center"
              onClose={() => setIsTravellersModalOpen(false)}
            >
              <Dialog.Body>
                <Box sx={columnStackSx}>
                  {[
                    { id: 'joel-hickey', label: 'Joel Hickey (Adult)', checked: true }
                  ].map((traveller) => (
                    <label
                      key={traveller.id}
                      htmlFor={`traveller-${traveller.id}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400 }}
                    >
                      <Checkbox id={`traveller-${traveller.id}`} defaultChecked={traveller.checked} />
                      <span style={{ fontWeight: 400 }}>{traveller.label}</span>
                    </label>
                  ))}
                </Box>
              </Dialog.Body>
              <Dialog.Footer>
                <div style={modalFooterStyle}>
                  <Button onClick={() => { setIsTravellersModalOpen(false); setIsAmendModalOpen(true); }}>Back</Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsTravellersModalOpen(false);
                    showLoadingThen('Loading search...', () => {
                      setIsSearchModalOpen(true);
                    });
                  }}
                >
                  Continue to Search →
                </Button>
                </div>
              </Dialog.Footer>
            </Dialog>
          )}

          {isSearchModalOpen && (
            <Dialog
              title={<span style={{ fontSize: '18px', fontWeight: 600 }}>Search Parameters</span>}
              width="xlarge"
              position="center"
              onClose={() => setIsSearchModalOpen(false)}
            >
              <Dialog.Body>
                <Stack sx={modalFormSx}>
                  <FormControl>
                    <FormControl.Label>Destination</FormControl.Label>
                    <TextInput aria-label="Destination" defaultValue="Honolulu, Hawaii" block />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Check-in Date</FormControl.Label>
                    <TextInput aria-label="Check-in Date" defaultValue="2024-05-15" block />
                  </FormControl>
                  <FormControl>
                    <FormControl.Label>Check-out Date</FormControl.Label>
                    <TextInput aria-label="Check-out Date" defaultValue="2024-05-20" block />
                  </FormControl>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer>
                <div style={modalFooterStyle}>
                  <Button onClick={() => { setIsSearchModalOpen(false); setIsTravellersModalOpen(true); }}>Back</Button>
                  <Button variant="primary" onClick={() => { setIsSearchModalOpen(false); startSearch(); }}>Search Availability</Button>
                </div>
              </Dialog.Footer>
            </Dialog>
          )}
        </PortalContext.Provider>
          </Box>
        </div>
        <div
          ref={modalRootRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            pointerEvents: isAnyModalOpen ? 'auto' : 'none',
            '--overlay-backdrop-bgColor': 'rgba(0, 0, 0, 0.65)'
          }}
        />
      </BaseStyles>
    </ThemeProvider>
  );
};

export default AmendmentsFlowDemoPrimer;
