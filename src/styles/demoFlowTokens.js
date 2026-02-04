export const demoFlowTokens = {
  spacing: {
    xs: 6,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24
  },
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
    padding: "12px 16px",
    borderBottom: "1px solid #d0d7de",
    background: "#ffffff",
    gap: 12
  },
  headerTitleTextStyle: {
    fontSize: 18,
    fontWeight: 600,
    margin: 0
  },
  headerControlsRowStyle: {
    display: "flex",
    alignItems: "center",
    gap: 8
  },
  headerMetaRowSx: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 6
  },
  headerActionsRowSx: {
    display: "flex",
    alignItems: "center",
    gap: 12
  },
  logoImageSx: {
    height: 24,
    width: "auto",
    display: "block"
  },
  toggleLabelRowStyle: {
    display: "flex",
    alignItems: "center",
    gap: 6
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
  contentAreaStyle: {
    flex: 1,
    overflow: "auto",
    padding: "16px"
  },
  itineraryTitleStyle: {
    margin: 0
  },
  pageContainerSx: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: "#f6f8fa",
    overflow: "hidden"
  },
  pageHeaderSx: {
    padding: 16,
    borderBottom: "1px solid #d0d7de",
    background: "#ffffff"
  },
  pageBodySx: {
    flex: 1,
    overflow: "auto",
    padding: 16
  },
  pageBodyWithOverflowSx: (overflow) => ({
    flex: 1,
    overflow,
    padding: 16
  }),
  columnGapMdSx: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  columnGapSmWithMarginTopSx: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginTop: 12
  },
  rowAlignStartGapMdSx: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12
  },
  rowAlignCenterGapMdSx: {
    display: "flex",
    alignItems: "center",
    gap: 12
  },
  rowAlignCenterGapMdRelativeSx: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    position: "relative"
  },
  rowSpaceBetweenGapMdSx: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12
  },
  rowSpaceBetweenGapMdWithMarginTopSx: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 6
  },
  wrapRowGapSmSx: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap"
  },
  rowSpaceBetweenSmSx: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6
  },
  summaryRowSx: {
    borderTop: "1px solid #d0d7de",
    paddingTop: 8,
    marginTop: 8,
    display: "flex",
    justifyContent: "space-between"
  },
  textEmojiSx: {
    fontSize: 20
  },
  textEmojiLgSx: {
    fontSize: 32
  },
  textTitleSmSx: {
    fontSize: 13,
    fontWeight: 700,
    display: "block"
  },
  textTitleSmMbSx: {
    fontSize: 13,
    fontWeight: 700,
    display: "block",
    marginBottom: 4
  },
  textTitleSmMbLgSx: {
    fontSize: 13,
    fontWeight: 700,
    display: "block",
    marginBottom: 8
  },
  textTitleMdSx: {
    margin: 0,
    fontSize: 16
  },
  sectionTitleWithMarginSx: {
    margin: "0 0 12px 0",
    fontSize: 16
  },
  textPriceMdSx: {
    fontSize: 13,
    fontWeight: 700,
    display: "block"
  },
  textPriceLgSx: {
    fontSize: 16,
    fontWeight: 700
  },
  textCaptionBoldSx: {
    fontSize: 12,
    fontWeight: 600,
    display: "block"
  },
  textSuccessCaptionSx: {
    fontSize: 12,
    fontWeight: 600,
    color: "#1a7f37"
  },
  textInfoCaptionSx: {
    fontSize: 12,
    fontWeight: 600,
    color: "#0969da"
  },
  priceHighlightSx: {
    fontSize: 16,
    fontWeight: 700,
    color: "#0969da"
  },
  textAlignRightSx: {
    textAlign: "right"
  },
  onboardingTooltipSx: {
    position: "absolute",
    bottom: "calc(100% + 8px)",
    left: 0,
    background: "#24292f",
    color: "#ffffff",
    padding: "6px 8px",
    borderRadius: 6,
    fontSize: 11
  },
  cardMarginBottomMdSx: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff",
    marginBottom: 12
  },
  gridTwoColumnSx: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12
  },
  gridGapMdWithMarginTopSx: {
    display: "grid",
    gap: 12,
    marginTop: 12
  },
  gridTwoColumnWithMarginTopSx: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
    marginTop: 10
  },
  gridTwoColumnWithMarginSx: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
    marginBottom: 8
  },
  successCardSx: {
    border: "1px solid #1a7f37",
    borderRadius: 10,
    padding: "12px",
    background: "#dafbe1"
  },
  warningCardSx: {
    border: "1px solid #d4a72c",
    borderRadius: 10,
    padding: "12px",
    background: "#fff8c5"
  },
  warningCardWithMarginTopSx: {
    border: "1px solid #d4a72c",
    borderRadius: 10,
    padding: "12px",
    background: "#fff8c5",
    marginTop: 12
  },
  dangerCardSx: {
    border: "1px solid #cf222e",
    borderRadius: 10,
    padding: "12px",
    background: "#fff1f3",
    marginBottom: 10
  },
  dreamCardSx: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#f6f0ff",
    cursor: "pointer"
  },
  infoCardSx: {
    border: "1px solid #1a7f37",
    borderRadius: 10,
    padding: "12px",
    background: "#dafbe1",
    marginBottom: 12
  },
  recommendedCardSx: {
    border: "1px solid #0969da",
    borderRadius: 10,
    padding: "12px",
    background: "#ddf4ff"
  },
  pillActiveSx: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    borderRadius: 999,
    background: "#ddf4ff",
    color: "#57606a",
    fontSize: 11,
    fontWeight: 600
  },
  pillInactiveSx: {
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
  mutedSectionSx: {
    background: "#f6f8fa"
  },
  marginTopXsStyle: {
    marginTop: 6
  },
  marginTopSmStyle: {
    marginTop: 8
  },
  marginTopMdStyle: {
    marginTop: 12
  },
  marginTopLgStyle: {
    marginTop: 16
  },
  rowGapSmStyle: {
    display: "flex",
    gap: 8
  },
  actionsRowStyle: {
    marginTop: 12,
    display: "flex",
    gap: 8
  },
  resultsGridStyle: {
    display: "grid",
    gap: 12,
    marginTop: 12
  },
  resultsRowStyle: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12
  },
  flex1Style: {
    flex: 1
  },
  flex1Sx: {
    flex: 1
  },
  maxWidth820Sx: {
    maxWidth: 820,
    margin: "0 auto"
  },
  maxWidth760Sx: {
    maxWidth: 760,
    margin: "0 auto"
  },
  maxWidth900Sx: {
    maxWidth: 900,
    margin: "0 auto"
  },
  textRightStyle: {
    textAlign: "right"
  },
  cardWithMarginTopMdStyle: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff",
    marginTop: 12
  },
  subtleCardWithMarginTopSx: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#f6f8fa",
    marginTop: 12
  },
  cardWithMarginTopSmStyle: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff",
    marginTop: 8
  },
  cardWithMarginBottomSmStyle: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff",
    marginBottom: 8
  },
  blockMarginTopSmStyle: {
    display: "block",
    marginTop: 8
  },
  cardSx: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff"
  },
  cardRowAlignCenterSx: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff",
    display: "flex",
    gap: 8,
    alignItems: "center"
  },
  centerCardSx: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff",
    textAlign: "center"
  },
  bookingCardSx: {
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff"
  },
  bookingCardWithZIndexSx: (zIndex) => ({
    border: "1px solid #d0d7de",
    borderRadius: 10,
    padding: "12px",
    background: "#ffffff",
    position: "relative",
    zIndex
  }),
  footerSx: {
    borderTop: "1px solid #d0d7de",
    padding: "12px 16px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
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
  modalHeaderRowStyle: {
    display: "flex",
    justifyContent: "space-between"
  },
  modalFooterRowStyle: {
    marginTop: 12,
    display: "flex",
    gap: 8
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
  menuPanelStyle: {
    border: "1px solid #d0d7de",
    padding: 8,
    marginTop: 8,
    width: 220
  },
  menuItemSpacingStyle: {
    marginTop: 6
  },
  menuItemSx: {
    width: "100%",
    justifyContent: "flex-start",
    padding: "6px 8px",
    fontSize: 12
  },
  secondaryTextSx: {
    fontSize: 12,
    color: "#57606a",
    lineHeight: 1.6
  },
  bodyTextSx: {
    fontSize: 13,
    color: "#24292f",
    lineHeight: 1.6
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
  }
};
