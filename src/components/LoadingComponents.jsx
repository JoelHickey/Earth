// Loading Components for Travel Search
import React from 'react';

// Skeleton loader for flight results
export const FlightSkeleton = () => (
  <div style={{
    background: "#f0f0f0",
    border: "1px inset #c0c0c0",
    padding: "8px",
    marginBottom: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        width: "24px",
        height: "24px",
        background: "#d4d0c8",
        border: "1px inset #c0c0c0",
        borderRadius: "2px"
      }}></div>
      <div>
        <div style={{
          width: "120px",
          height: "12px",
          background: "#d4d0c0",
          marginBottom: "4px"
        }}></div>
        <div style={{
          width: "80px",
          height: "10px",
          background: "#d4d0c0"
        }}></div>
      </div>
    </div>
    <div style={{ textAlign: "right" }}>
      <div style={{
        width: "60px",
        height: "14px",
        background: "#d4d0c0",
        marginBottom: "4px"
      }}></div>
      <div style={{
        width: "40px",
        height: "10px",
        background: "#d4d0c0"
      }}></div>
    </div>
  </div>
);

// Skeleton loader for hotel results
export const HotelSkeleton = () => (
  <div style={{
    background: "#f0f0f0",
    border: "1px inset #c0c0c0",
    padding: "8px",
    marginBottom: "8px"
  }}>
    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
      <div style={{
        width: "60px",
        height: "40px",
        background: "#d4d0c0",
        border: "1px inset #c0c0c0"
      }}></div>
      <div style={{ flex: 1 }}>
        <div style={{
          width: "150px",
          height: "14px",
          background: "#d4d0c0",
          marginBottom: "4px"
        }}></div>
        <div style={{
          width: "200px",
          height: "10px",
          background: "#d4d0c0",
          marginBottom: "4px"
        }}></div>
        <div style={{
          width: "100px",
          height: "10px",
          background: "#d4d0c0"
        }}></div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{
          width: "60px",
          height: "14px",
          background: "#d4d0c0",
          marginBottom: "4px"
        }}></div>
        <button style={{
          background: "#d4d0c0",
          border: "1px outset #c0c0c0",
          padding: "2px 8px",
          cursor: "not-allowed",
          fontSize: "9px",
          fontFamily: "'MS Sans Serif', sans-serif"
        }}>
          Loading...
        </button>
      </div>
    </div>
  </div>
);

// Loading spinner
export const LoadingSpinner = ({ size = "16px", color = "#808080" }) => (
  <div style={{
    width: size,
    height: size,
    border: `2px solid ${color}`,
    borderTop: `2px solid transparent`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    display: "inline-block"
  }}>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

// Search progress indicator
export const SearchProgress = ({ message = "Searching..." }) => (
  <div style={{
    background: "#d4d0c8",
    border: "1px inset #c0c0c0",
    padding: "12px",
    textAlign: "center",
    fontSize: "10px",
    fontFamily: "'MS Sans Serif', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  }}>
    <LoadingSpinner size="12px" />
    <span>{message}</span>
  </div>
);

// Error message component
export const ErrorMessage = ({ error, onRetry }) => (
  <div style={{
    background: "#ffcccc",
    border: "1px inset #ff6666",
    padding: "8px",
    marginBottom: "8px",
    fontSize: "10px",
    fontFamily: "'MS Sans Serif', sans-serif",
    color: "#cc0000"
  }}>
    <div style={{ marginBottom: "4px", fontWeight: "bold" }}>
      ⚠️ Search Error
    </div>
    <div style={{ marginBottom: "8px" }}>
      {error}
    </div>
    {onRetry && (
      <button
        style={{
          background: "#ff6666",
          border: "1px outset #ff6666",
          color: "#ffffff",
          padding: "2px 8px",
          cursor: "pointer",
          fontSize: "9px",
          fontFamily: "'MS Sans Serif', sans-serif"
        }}
        onClick={onRetry}
      >
        Retry Search
      </button>
    )}
  </div>
);

// No results message
export const NoResultsMessage = ({ searchType = "results" }) => (
  <div style={{
    background: "#f0f0f0",
    border: "1px inset #c0c0c0",
    padding: "16px",
    textAlign: "center",
    fontSize: "10px",
    fontFamily: "'MS Sans Serif', sans-serif",
    color: "#808080"
  }}>
    <div style={{ marginBottom: "8px", fontSize: "12px", fontWeight: "bold" }}>
      🔍 No {searchType} found
    </div>
    <div>
      Try adjusting your search criteria or dates
    </div>
  </div>
);

export default {
  FlightSkeleton,
  HotelSkeleton,
  LoadingSpinner,
  SearchProgress,
  ErrorMessage,
  NoResultsMessage,
};
