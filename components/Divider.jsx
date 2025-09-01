import React from 'react';

const Divider = ({ height = "200px" }) => {
  const styles = {
    divider: {
      width: "1px",
      height: height,
      background: "transparent",
      borderLeft: "1px solid #808080"
    }
  };

  return <div style={styles.divider} />;
};

export default Divider;
