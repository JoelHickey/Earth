import React from 'react';
import { Button, Pill, CalendarPicker, HotelCard, SuccessBanner } from './shared';
import { useLiveInventory, useDateSelection, useConfirmation, usePillNavigation } from '../hooks';
import { generateHotelUpgrades, generateDifferentHotels } from '../data/mockHotels';
import { generateCalendarMonths } from '../data/mockCalendar';

/**
 * BEFORE: AmendmentsFlowDemo was 4,615 lines with everything mixed together
 * AFTER: This shows how clean it becomes with foundations
 * 
 * This is a simplified example showing the pattern.
 * The full refactor would break AmendmentsFlowDemo into multiple focused components.
 */
const DreamFlowExample = () => {
  // ✅ Custom hooks handle all business logic
  const { inventory, secondsAgo, inventoryChange, soldOutRooms } = useLiveInventory();
  const { startDate, endDate, handleDateClick, calculatePriceDifference } = useDateSelection();
  const { confirm, isConfirming, showSuccess } = useConfirmation(() => {
    console.log('Booking confirmed!');
  });
  const { selectedPill, selectPill, isDateChangePill } = usePillNavigation();
  
  // ✅ Data comes from separate files
  const hotels = selectedPill === 'Different Hotel' 
    ? generateDifferentHotels() 
    : generateHotelUpgrades(inventory);
  const calendarMonths = generateCalendarMonths(startDate, endDate);
  
  return (
    <div style={{ padding: '16px' }}>
      {/* Success Message */}
      <SuccessBanner 
        show={showSuccess}
        title="Booking Updated Successfully"
        message="Changes saved · Client itinerary updated"
      />
      
      {!showSuccess && (
        <>
          {/* Parent Pills */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
            <Pill selected={selectedPill === 'Room Upgrade'} onClick={() => selectPill('Room Upgrade')}>
              Room Upgrade
            </Pill>
            <Pill selected={selectedPill === 'Different Hotel'} onClick={() => selectPill('Different Hotel')}>
              Different Hotel
            </Pill>
            <Pill selected={isDateChangePill()} onClick={() => selectPill('Date Change')}>
              Date Change
            </Pill>
          </div>
          
          {/* Child Pills for Date Change */}
          {isDateChangePill() && (
            <div style={{ display: 'flex', gap: '3px', marginBottom: '8px', paddingTop: '6px', borderTop: '1px solid #e0e0e0' }}>
              <Pill size="small" selected={selectedPill === 'Extend +1'} onClick={() => selectPill('Extend +1')}>
                Extend +1
              </Pill>
              <Pill size="small" selected={selectedPill === 'Shorten -1'} onClick={() => selectPill('Shorten -1')}>
                Shorten -1
              </Pill>
              <Pill size="small" selected={selectedPill === 'Shift +3'} onClick={() => selectPill('Shift +3')}>
                Shift +3
              </Pill>
            </div>
          )}
          
          {/* Calendar View */}
          {isDateChangePill() && (
            <CalendarPicker 
              startDate={startDate}
              endDate={endDate}
              months={calendarMonths}
              onDateClick={handleDateClick}
            />
          )}
          
          {/* Hotel Cards */}
          {!isDateChangePill() && hotels.map((hotel, idx) => (
            <HotelCard
              key={idx}
              hotel={hotel}
              onSelect={() => confirm(idx)}
              isConfirming={isConfirming(idx)}
              inventoryChange={inventoryChange[hotel.roomKey]}
              soldOut={soldOutRooms[hotel.roomKey]}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default DreamFlowExample;

/**
 * COMPARISON:
 * 
 * BEFORE (inline everything):
 * - 4,615 lines in one file
 * - 15+ useState hooks
 * - Inline styles everywhere
 * - Logic mixed with UI
 * - Hard to test
 * - Hard to maintain
 * 
 * AFTER (with foundations):
 * - ~100 lines for this component
 * - 4 custom hooks (clean)
 * - Reusable components
 * - Logic separated
 * - Easy to test
 * - Easy to maintain
 * 
 * The pattern:
 * 1. Import hooks for logic
 * 2. Import data for content
 * 3. Import components for UI
 * 4. Compose them together
 * 
 * This is how professional React apps are structured.
 */

