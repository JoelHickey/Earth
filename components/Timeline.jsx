import React from 'react';

const Timeline = ({ events = [], onAddEvent, onDeleteEvent }) => {
  const styles = {
    container: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      background: "#d4d0c8",
      padding: "8px"
    },
    header: {
      fontSize: "12px",
      fontWeight: "bold",
      color: "#000000",
      fontFamily: "'MS Sans Serif', sans-serif",
      borderBottom: "1px solid #808080",
      paddingBottom: "4px"
    },
    timelineContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      overflowY: "auto"
    },
    eventItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "4px",
      background: "#ffffff",
      border: "1px inset #c0c0c0",
      fontSize: "10px",
      fontFamily: "'MS Sans Serif', sans-serif"
    },
    timeStamp: {
      minWidth: "60px",
      fontWeight: "bold",
      color: "#000080"
    },
    eventText: {
      flex: 1,
      color: "#000000"
    },
    deleteButton: {
      width: "16px",
      height: "16px",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff",
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000",
      fontWeight: "normal"
    },
    addEventForm: {
      display: "flex",
      gap: "4px",
      alignItems: "center",
      padding: "4px",
      background: "#d4d0c8",
      border: "1px inset #c0c0c0"
    },
    timeInput: {
      width: "60px",
      height: "16px",
      fontSize: "10px",
      fontFamily: "'MS Sans Serif', sans-serif",
      border: "1px inset #c0c0c0",
      background: "#ffffff",
      padding: "0 2px"
    },
    eventInput: {
      flex: 1,
      height: "16px",
      fontSize: "10px",
      fontFamily: "'MS Sans Serif', sans-serif",
      border: "1px inset #c0c0c0",
      background: "#ffffff",
      padding: "0 2px"
    },
    addButton: {
      width: "50px",
      height: "16px",
      background: "#d4d0c8",
      borderTop: "2px solid #ffffff",
      borderLeft: "2px solid #ffffff",
      borderBottom: "2px solid #808080",
      borderRight: "2px solid #808080",
      cursor: "pointer",
      fontSize: "10px",
      fontFamily: "'MS Sans Serif', sans-serif",
      color: "#000000",
      fontWeight: "normal",
      padding: "0 6px"
    }
  };

  const [newTime, setNewTime] = React.useState('');
  const [newEvent, setNewEvent] = React.useState('');

  const handleAddEvent = () => {
    if (newTime && newEvent) {
      onAddEvent({ time: newTime, text: newEvent });
      setNewTime('');
      setNewEvent('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddEvent();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Event Timeline</div>
      
      <div style={styles.timelineContainer}>
        {events.length === 0 ? (
          <div style={{ 
            padding: "16px", 
            textAlign: "center", 
            color: "#808080", 
            fontSize: "10px",
            fontFamily: "'MS Sans Serif', sans-serif"
          }}>
            No events recorded yet. Add your first event below.
          </div>
        ) : (
          events.map((event, index) => (
            <div key={index} style={styles.eventItem}>
              <span style={styles.timeStamp}>{event.time}</span>
              <span style={styles.eventText}>{event.text}</span>
              <button
                style={styles.deleteButton}
                onClick={() => onDeleteEvent(index)}
                onMouseDown={(e) => {
                  e.target.style.borderTop = "2px solid #808080";
                  e.target.style.borderLeft = "2px solid #808080";
                  e.target.style.borderBottom = "2px solid #ffffff";
                  e.target.style.borderRight = "2px solid #ffffff";
                  e.target.style.background = "#c0c0c0";
                }}
                onMouseUp={(e) => {
                  e.target.style.borderTop = "2px solid #ffffff";
                  e.target.style.borderLeft = "2px solid #ffffff";
                  e.target.style.borderBottom = "2px solid #808080";
                  e.target.style.borderRight = "2px solid #808080";
                  e.target.style.background = "#d4d0c8";
                }}
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      <div style={styles.addEventForm}>
        <input
          type="text"
          placeholder="Time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          style={styles.timeInput}
          onKeyPress={handleKeyPress}
        />
        <input
          type="text"
          placeholder="Event description"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          style={styles.eventInput}
          onKeyPress={handleKeyPress}
        />
        <button
          style={styles.addButton}
          onClick={handleAddEvent}
          onMouseDown={(e) => {
            e.target.style.borderTop = "2px solid #808080";
            e.target.style.borderLeft = "2px solid #808080";
            e.target.style.borderBottom = "2px solid #ffffff";
            e.target.style.borderRight = "2px solid #ffffff";
            e.target.style.background = "#c0c0c0";
          }}
          onMouseUp={(e) => {
            e.target.style.borderTop = "2px solid #ffffff";
            e.target.style.borderLeft = "2px solid #ffffff";
            e.target.style.borderBottom = "2px solid #808080";
            e.target.style.borderRight = "2px solid #808080";
            e.target.style.background = "#d4d0c8";
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Timeline;