import React from 'react';

const Divider = ({ height = "200px" }) => {
  const styles = {
    divider: {
      width: "2px",
      height: height,
      background: "#808080",
      border: "1px inset #c0c0c0",
      boxShadow: "inset 1px 1px #808080, inset -1px -1px #ffffff"
    }
  };

  return <div style={styles.divider} />;
};

export default Divider;
