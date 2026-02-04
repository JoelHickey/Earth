import React from 'react';

const CalendarPicker = ({
  startDate,
  endDate,
  onDateClick,
  months = [],
  scale = 1,
  live = false,
  currentRange,
  selectedRange
}) => {
  const scaleValue = (value) => `${value * scale}px`;
  const shadowValue = (x, y, blur) => `${x * scale}px ${y * scale}px ${blur * scale}px`;
  const [liveMonths, setLiveMonths] = React.useState(months);

  React.useEffect(() => {
    setLiveMonths(months);
  }, [months]);

  React.useEffect(() => {
    if (!live) {
      return undefined;
    }
    const update = () => {
      setLiveMonths((current) =>
        current.map((month) => ({
          ...month,
          days: month.days.map((day) => {
            if (day.current) {
              return day;
            }
            const roll = Math.random();
            if (roll < 0.06) {
              return { ...day, avail: 'sold' };
            }
            if (roll < 0.18) {
              return { ...day, avail: 'low' };
            }
            if (roll < 0.3) {
              return { ...day, avail: 'medium' };
            }
            return day;
          })
        }))
      );
    };
    const interval = setInterval(update, 4000);
    return () => clearInterval(interval);
  }, [live]);
  return (
    <div style={{ marginTop: scaleValue(4) }}>
      {/* Header with navigation */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <div style={{ 
          fontSize: scaleValue(7),
          color: '#86868b', 
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: scaleValue(6)
        }}>
          {live && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: scaleValue(3),
                padding: `${scaleValue(1)} ${scaleValue(6)}`,
                borderRadius: 999,
                background: 'rgba(45,164,78,0.12)',
                color: '#1a7f37',
                fontSize: scaleValue(6),
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em'
              }}
            >
              <span
                style={{
                  width: scaleValue(4),
                  height: scaleValue(4),
                  borderRadius: 999,
                  background: '#2da44e'
                }}
              />
              Live availability
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: scaleValue(4), alignItems: 'center' }}>
          <button
            style={{
              fontSize: scaleValue(8),
              padding: `${scaleValue(1)} ${scaleValue(4)}`,
              background: '#f5f5f7',
              border: `${scaleValue(1)} solid #e0e0e0`,
              borderRadius: scaleValue(2),
              cursor: 'pointer',
              color: '#1d1d1f',
              fontWeight: '600'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#e0e0e0'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f5f5f7'}
          >
            ‹
          </button>
          <div style={{ fontSize: scaleValue(6), color: '#6e6e73', fontWeight: '600' }}>
            MAY - JUL 2024
          </div>
          <button
            style={{
              fontSize: scaleValue(8),
              padding: `${scaleValue(1)} ${scaleValue(4)}`,
              background: '#f5f5f7',
              border: `${scaleValue(1)} solid #e0e0e0`,
              borderRadius: scaleValue(2),
              cursor: 'pointer',
              color: '#1d1d1f',
              fontWeight: '600'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#e0e0e0'}
            onMouseOut={(e) => e.currentTarget.style.background = '#f5f5f7'}
          >
            ›
          </button>
        </div>
      </div>
      
      {/* Calendar grid */}
      <div style={{ display: 'flex', gap: scaleValue(4), marginTop: '12px' }}>
        {liveMonths.map((month, monthIdx) => (
          <div
            key={month.name}
            style={{
              flex: 1
            }}
          >
            <div style={{ 
              fontSize: scaleValue(6),
              fontWeight: '700', 
              color: '#1d1d1f',
              marginBottom: scaleValue(2),
              textAlign: 'center'
            }}>
              {month.name}
            </div>
            
            {/* Day headers */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: scaleValue(1),
              marginBottom: scaleValue(2)
            }}>
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <div key={d} style={{ 
                  fontSize: scaleValue(5),
                  color: '#86868b', 
                  textAlign: 'center',
                  fontWeight: '600',
                  padding: `${scaleValue(1)} 0`
                }}>{d}</div>
              ))}
            </div>
            
            {/* Calendar days */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(7, 1fr)', 
              gap: scaleValue(1)
            }}>
              {/* Empty cells for alignment */}
              {[...Array(month.emptyStart)].map((_, i) => <div key={`empty-${i}`} />)}
              
              {month.days.map(day => {
                const isCurrent = Boolean(
                  currentRange &&
                  currentRange.month === month.name &&
                  day.date >= currentRange.start &&
                  day.date <= currentRange.end
                );
                const isSelected = Boolean(
                  selectedRange &&
                  selectedRange.month === month.name &&
                  day.date >= selectedRange.start &&
                  day.date <= selectedRange.end
                );
                const bgColor = isSelected
                  ? '#8957e5'
                  : isCurrent
                    ? '#667eea'
                    : day.avail === 'sold'
                      ? '#f5f5f7'
                      : day.avail === 'low'
                        ? '#fff3cd'
                        : day.avail === 'medium'
                          ? '#ffe5cc'
                          : '#d4f5dd';
                const textColor = isSelected || isCurrent
                  ? '#ffffff'
                  : day.avail === 'sold'
                    ? '#d1d1d6'
                    : '#1d1d1f';
                const cursor = day.avail === 'sold' ? 'not-allowed' : 'pointer';
                
                return (
                  <div
                    key={`${month.name}-${day.date}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (day.avail !== 'sold' && onDateClick) {
                        onDateClick(day.date, month.name);
                      }
                    }}
                    style={{
                      background: bgColor,
                      border: isSelected
                        ? `${scaleValue(1.5)} solid #6e40c9`
                        : isCurrent
                          ? `${scaleValue(1.5)} solid #667eea`
                          : `${scaleValue(0.5)} solid #e0e0e0`,
                      borderRadius: scaleValue(2),
                      padding: `${scaleValue(1)} 0px`,
                      textAlign: 'center',
                      cursor: cursor,
                      position: 'relative',
                      transition: 'all 0.15s',
                      opacity: day.avail === 'sold' ? 0.5 : 1,
                      minHeight: scaleValue(18),
                      fontSize: scaleValue(7)
                    }}
                    onMouseOver={(e) => {
                      if (day.avail !== 'sold') {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = `${shadowValue(0, 2, 4)} rgba(0,0,0,0.1)`;
                      }
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ 
                      fontSize: scaleValue(7),
                      fontWeight: day.current ? '700' : '600', 
                      color: textColor,
                      lineHeight: '1'
                    }}>
                      {day.date}
                    </div>
                    {!isSelected && !isCurrent && day.avail !== 'sold' && (
                      <div style={{ 
                        fontSize: scaleValue(4),
                        color: textColor === '#ffffff' ? textColor : '#6e6e73',
                        marginTop: scaleValue(1),
                        lineHeight: '1'
                      }}>
                        ${day.price}
                      </div>
                    )}
                    {day.avail === 'sold' && !isSelected && !isCurrent && (
                      <div style={{ 
                        fontSize: scaleValue(4),
                        color: '#86868b',
                        marginTop: scaleValue(1),
                        fontWeight: '600',
                        lineHeight: '1'
                      }}>
                        FULL
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: scaleValue(0),
        display: 'flex',
        gap: scaleValue(4),
        fontSize: scaleValue(6),
        color: '#6e6e73'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: scaleValue(2) }}>
          <div style={{ width: scaleValue(6), height: scaleValue(6), background: '#667eea', borderRadius: scaleValue(1) }} />
          <span>Current</span>
        </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: scaleValue(2) }}>
            <div style={{ width: scaleValue(6), height: scaleValue(6), background: '#8957e5', borderRadius: scaleValue(1) }} />
            <span>Selected</span>
          </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: scaleValue(2) }}>
          <div style={{ width: scaleValue(6), height: scaleValue(6), background: '#d4f5dd', borderRadius: scaleValue(1) }} />
          <span>Available</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: scaleValue(2) }}>
          <div style={{ width: scaleValue(6), height: scaleValue(6), background: '#ffe5cc', borderRadius: scaleValue(1) }} />
          <span>Limited</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: scaleValue(2) }}>
          <div style={{ width: scaleValue(6), height: scaleValue(6), background: '#f5f5f7', borderRadius: scaleValue(1) }} />
          <span>Sold Out</span>
        </div>
      </div>
      
    </div>
  );
};

export default CalendarPicker;

