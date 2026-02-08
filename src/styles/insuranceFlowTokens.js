export const insuranceFlowTokens = {
  windowSx: {
    position: "fixed",
    background: "#ffffff",
    border: "1px solid #d0d7de",
    borderRadius: 8,
    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  headerSx: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    px: 5,
    py: 3,
    borderBottom: "1px solid #d0d7de",
    background: "#ffffff",
    gap: 12
  },
  headerTitleSx: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: "#1f2328",
    lineHeight: 1.3
  },
  headerMetaSx: {
    fontSize: 12,
    color: "#57606a"
  },
  toggleLabelSx: {
    fontSize: 12,
    fontWeight: 600,
    color: "#1f2328"
  },
  bodySx: {
    flex: 1,
    overflow: "auto",
    padding: "16px"
  },
  sectionTitleSx: {
    fontSize: 16,
    fontWeight: 700,
    color: "#4b2f73",
    margin: "0 0 12px 0",
    letterSpacing: "0.03em"
  },
  subsectionTitleSx: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1f2328",
    margin: "0 0 10px 0"
  },
  bodyTextSx: {
    fontSize: 13,
    color: "#24292f",
    lineHeight: 1.6
  },
  secondaryTextSx: {
    fontSize: 12,
    color: "#57606a",
    lineHeight: 1.6
  },
  statCardSx: {
    border: "1px solid #d0d7de",
    borderRadius: 8,
    padding: "10px 14px",
    background: "#f6f8fa",
    minWidth: 140
  },
  statValueSx: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1a7f37"
  },
  statLabelSx: {
    fontSize: 11,
    fontWeight: 600,
    color: "#57606a"
  },
  cardSx: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff"
  },
  pillSx: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    borderRadius: 999,
    background: "#f6f8fa",
    color: "#57606a",
    fontSize: 11,
    fontWeight: 600
  },
  listSx: {
    margin: 0,
    paddingLeft: "18px"
  },
  listItemSx: {
    marginBottom: "8px"
  },
  gridThumbSx: {
    border: "1px solid #d0d7de",
    borderRadius: 8,
    overflow: "hidden",
    background: "#ffffff",
    cursor: "pointer",
    padding: 0,
    textAlign: "left"
  },
  overlaySx: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3000
  },
  lightboxSx: {
    position: "relative",
    maxWidth: "95vw",
    maxHeight: "95vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  lightboxButtonSx: {
    background: "rgba(255,255,255,0.12)",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 999,
    padding: "6px 10px",
    cursor: "pointer"
  },
  tabListSx: {
    display: "flex",
    gap: 8,
    padding: "8px 16px",
    borderBottom: "1px solid #d0d7de",
    background: "#f6f8fa"
  },
  tabButtonSx: (active) => ({
    padding: "4px 8px",
    borderRadius: 6,
    border: active ? "1px solid #0969da" : "1px solid transparent",
    background: active ? "#ddf4ff" : "transparent",
    fontSize: 12,
    fontWeight: 600,
    textTransform: "capitalize",
    cursor: "pointer",
    color: "#1f2328"
  }),
  bookingCardSx: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff"
  },
  successToastSx: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "#1a7f37",
    color: "#ffffff",
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600
  },
  menuSx: {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 8,
    background: "#ffffff",
    border: "1px solid #d0d7de",
    borderRadius: 8,
    minWidth: 220,
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    zIndex: 1000,
    padding: "6px"
  },
  menuItemSx: {
    width: "100%",
    justifyContent: "flex-start",
    padding: "6px 8px",
    fontSize: 12
  },
  modalOverlaySx: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4000
  },
  modalCardSx: {
    width: "min(90vw, 560px)",
    background: "#ffffff",
    borderRadius: 10,
    border: "1px solid #d0d7de",
    boxShadow: "0 18px 40px rgba(0,0,0,0.2)",
    padding: "16px"
  },
  modalTitleSx: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
    color: "#1f2328"
  },
  modalFooterSx: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
    flexWrap: "wrap"
  },
  formLabelSx: {
    fontSize: 12,
    fontWeight: 600,
    color: "#1f2328",
    marginBottom: 6,
    display: "block"
  },
  inputSx: {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #d0d7de",
    borderRadius: 6,
    fontSize: 13,
    background: "#ffffff",
    color: "#1f2328"
  },
  footerSx: {
    borderTop: "1px solid #d0d7de",
    padding: "12px 16px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  },
  loadingCardSx: {
    background: "#ffffff",
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "24px 28px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    color: "#1f2328"
  },
  loadingSpinnerSx: {
    width: 32,
    height: 32,
    border: "3px solid #d0d7de",
    borderTopColor: "#0969da",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  }
};
