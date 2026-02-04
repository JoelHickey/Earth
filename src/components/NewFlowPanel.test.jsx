import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NewFlowPanel from './NewFlowPanel';

const defaultHotel = {
  name: 'Royal Hawaiian Resort',
  price: '$425',
  rating: '4.7',
  reviews: '1,892',
  image: '🏨'
};

const renderPanel = (overrides = {}) => {
  const props = {
    showNewFlow: true,
    newFlowStep: 1,
    setShowNewFlow: vi.fn(),
    setNewFlowStep: vi.fn(),
    showOtherHotels: false,
    setShowOtherHotels: vi.fn(),
    selectedHotel: defaultHotel,
    setSelectedHotel: vi.fn(),
    showLoadingThen: vi.fn((_, callback) => callback()),
    setHotelAmended: vi.fn(),
    setActiveTab: vi.fn(),
    setShowSuccessToast: vi.fn(),
    ...overrides
  };

  const result = render(<NewFlowPanel {...props} />);
  return { props, ...result };
};

describe('NewFlowPanel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('returns null when new flow is hidden', () => {
    const { container } = renderPanel({ showNewFlow: false });
    expect(container).toBeEmptyDOMElement();
  });

  it('renders step 1 and triggers cancel/search actions', () => {
    const { props } = renderPanel({ newFlowStep: 1 });

    expect(screen.getByText('Search Parameters')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(props.setShowNewFlow).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByRole('button', { name: /Search Hotels/i }));
    expect(props.showLoadingThen).toHaveBeenCalledWith(
      'Searching available hotels...',
      expect.any(Function),
      3500
    );
    expect(props.setNewFlowStep).toHaveBeenCalledWith(2);
  });

  it('renders step 2 and seeds default hotel when missing', async () => {
    const setSelectedHotel = vi.fn();
    renderPanel({
      newFlowStep: 2,
      selectedHotel: null,
      setSelectedHotel
    });

    await act(async () => {});
    expect(setSelectedHotel).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Royal Hawaiian Resort' })
    );
    expect(screen.getByText('Selected')).toBeVisible();
    expect(screen.getByText('Show Other Hotels')).toBeVisible();
  });

  it('renders step 2 with existing hotel and toggles options', () => {
    const setShowOtherHotels = vi.fn();
    const setSelectedHotel = vi.fn();
    const setNewFlowStep = vi.fn();
    const setShowNewFlow = vi.fn();
    const setActiveTab = vi.fn();
    renderPanel({
      newFlowStep: 2,
      selectedHotel: { ...defaultHotel, name: 'Hilton Hawaiian Village', price: '$289' },
      setSelectedHotel,
      showOtherHotels: true,
      setShowOtherHotels,
      setNewFlowStep,
      setShowNewFlow,
      setActiveTab
    });

    expect(setSelectedHotel).not.toHaveBeenCalled();
    expect(screen.getByText('Hide Other Hotels')).toBeVisible();
    const hotelHeadings = screen.getAllByRole('heading', { name: 'Hilton Hawaiian Village' });
    fireEvent.click(hotelHeadings[1]);
    expect(setSelectedHotel).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Hilton Hawaiian Village' })
    );
    expect(setShowOtherHotels).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByRole('button', { name: 'Back to Details' }));
    expect(setNewFlowStep).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel amendment' }));
    expect(setShowNewFlow).toHaveBeenCalledWith(false);
    expect(setNewFlowStep).toHaveBeenCalledWith(1);
    expect(setActiveTab).toHaveBeenCalledWith('itinerary');
  });

  it('renders step 3 and completes payment flow', async () => {
    const showLoadingThen = vi.fn((_, callback) => callback());
    const setShowNewFlow = vi.fn();
    const setNewFlowStep = vi.fn();
    const setHotelAmended = vi.fn();
    const setActiveTab = vi.fn();
    const setShowSuccessToast = vi.fn();

    renderPanel({
      newFlowStep: 3,
      showLoadingThen,
      setShowNewFlow,
      setNewFlowStep,
      setHotelAmended,
      setActiveTab,
      setShowSuccessToast
    });

    expect(screen.getByText('Booking Summary')).toBeVisible();
    expect(screen.getByText('Payment Details')).toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Back to Select Hotel' }));
    expect(setNewFlowStep).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel amendment' }));
    expect(setShowNewFlow).toHaveBeenCalledWith(false);
    expect(setNewFlowStep).toHaveBeenCalledWith(1);
    expect(setActiveTab).toHaveBeenCalledWith('itinerary');

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Confirm & Pay/i }));
    });

    expect(showLoadingThen).toHaveBeenCalledWith(
      'Processing payment...',
      expect.any(Function),
      3000
    );
    expect(setShowNewFlow).toHaveBeenCalledWith(false);
    expect(setNewFlowStep).toHaveBeenCalledWith(1);
    expect(setHotelAmended).toHaveBeenCalledWith(true);
    expect(setActiveTab).toHaveBeenCalledWith('itinerary');
    expect(setShowSuccessToast).toHaveBeenCalledWith(true);

    act(() => {
      vi.runAllTimers();
    });
    expect(setShowSuccessToast).toHaveBeenCalledWith(false);
  });

  it('returns null for unsupported step', () => {
    const { container } = renderPanel({ newFlowStep: 0 });
    expect(container).toBeEmptyDOMElement();
  });
});
