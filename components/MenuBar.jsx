import React, { useState, useEffect } from 'react';

const MenuBar = ({ activeView, setActiveView, saveSliderPositions, recallSliderPositions, hasSavedPositions, undoSliderChange, hasUndoAvailable, resetAllSliders }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenu && !event.target.closest('[data-menu-item]')) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeMenu]);

  const styles = {
    menuBar: {
      background: "#c0c0c0",
      borderBottom: "1px solid #808080",
      borderTop: "1px solid #ffffff",
      height: "22px",
      display: "flex",
      alignItems: "center",
      padding: "0",
      fontFamily: "'MS Sans Serif', sans-serif",
      fontSize: "8px",
      position: "relative",
      zIndex: 1000
    },
    menuItem: {
      background: activeMenu === null ? "transparent" : "#c0c0c0",
      border: "none",
      padding: "2px 8px",
      cursor: "pointer",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      height: "18px",
      display: "flex",
      alignItems: "center",
      color: "#000000",
      position: "relative"
    },
    menuItemHover: {
      background: "#c0c0c0",
      borderTop: "1px solid #ffffff",
      borderLeft: "1px solid #ffffff",
      borderBottom: "1px solid #808080",
      borderRight: "1px solid #808080"
    },
    menuItemActive: {
      background: "#c0c0c0",
      borderTop: "1px solid #808080",
      borderLeft: "1px solid #808080",
      borderBottom: "1px solid #ffffff",
      borderRight: "1px solid #ffffff"
    },
    dropdown: {
      position: "absolute",
      top: "18px",
      left: "0",
      background: "#c0c0c0",
      border: "1px solid #808080",
      borderTop: "1px solid #ffffff",
      borderLeft: "1px solid #ffffff",
      minWidth: "120px",
      boxShadow: "1px 1px 0px #808080",
      zIndex: 1001
    },
    dropdownItem: {
      background: "transparent",
      border: "none",
      padding: "2px 16px",
      cursor: "pointer",
      fontSize: "8px",
      fontFamily: "'MS Sans Serif', sans-serif",
      width: "100%",
      textAlign: "left",
      color: "#000000",
      height: "16px",
      display: "flex",
      alignItems: "center"
    },
    dropdownItemHover: {
      background: "#000080",
      color: "#ffffff"
    },
    dropdownItemDisabled: {
      background: "transparent",
      color: "#808080",
      cursor: "not-allowed"
    },
    separator: {
      height: "1px",
      background: "#808080",
      margin: "1px 0",
      borderTop: "1px solid #ffffff"
    }
  };


  const handleMenuMouseEnter = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleMenuMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleMenuClick = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleMenuItemClick = (action) => {
    setActiveMenu(null);
    
    switch(action) {
      case 'inputs':
      case 'emotions':
      case 'environment':
      case 'timeline':
      case 'about':
        setActiveView(action);
        break;
      case 'save':
      case 'save_positions':
        saveSliderPositions();
        break;
      case 'open':
      case 'recall':
      case 'recall_positions':
        recallSliderPositions();
        break;
      case 'undo':
        undoSliderChange();
        break;
      case 'new':
      case 'reset_all':
        resetAllSliders();
        break;
      case 'exit':
        if (window.confirm('Are you sure you want to exit?')) {
          window.close();
        }
        break;
      case 'cut':
      case 'copy':
      case 'paste':
        // These would typically interact with clipboard
        console.log(`${action} functionality not implemented`);
        break;
      default:
        console.log(`Menu action: ${action}`);
    }
  };

  const getDropdownItemStyle = (action, isDisabled = false) => {
    const baseStyle = isDisabled ? { ...styles.dropdownItem, ...styles.dropdownItemDisabled } : styles.dropdownItem;
    return hoveredItem === action ? { ...baseStyle, ...styles.dropdownItemHover } : baseStyle;
  };

  return (
    <div style={styles.menuBar}>
      {/* File Menu */}
      <button
        style={styles.menuItem}
        data-menu-item
        onMouseEnter={() => handleMenuMouseEnter('file')}
        onMouseLeave={handleMenuMouseLeave}
        onClick={() => handleMenuClick('file')}
      >
        File
        {activeMenu === 'file' && (
          <div style={styles.dropdown}>
            <button
              style={getDropdownItemStyle('new')}
              onMouseEnter={() => setHoveredItem('new')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('new')}
            >
              New
            </button>
            <button
              style={getDropdownItemStyle('open')}
              onMouseEnter={() => setHoveredItem('open')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('open')}
            >
              Open
            </button>
            <button
              style={getDropdownItemStyle('save')}
              onMouseEnter={() => setHoveredItem('save')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('save')}
            >
              Save
            </button>
            <div style={styles.separator} />
            <button
              style={getDropdownItemStyle('exit')}
              onMouseEnter={() => setHoveredItem('exit')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('exit')}
            >
              Exit
            </button>
          </div>
        )}
      </button>

      {/* Edit Menu */}
      <button
        style={styles.menuItem}
        data-menu-item
        onMouseEnter={() => handleMenuMouseEnter('edit')}
        onMouseLeave={handleMenuMouseLeave}
        onClick={() => handleMenuClick('edit')}
      >
        Edit
        {activeMenu === 'edit' && (
          <div style={styles.dropdown}>
            <button
              style={getDropdownItemStyle('undo', !hasUndoAvailable)}
              onMouseEnter={() => setHoveredItem('undo')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => hasUndoAvailable && handleMenuItemClick('undo')}
              disabled={!hasUndoAvailable}
            >
              Undo
            </button>
            <button
              style={getDropdownItemStyle('cut')}
              onMouseEnter={() => setHoveredItem('cut')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('cut')}
            >
              Cut
            </button>
            <button
              style={getDropdownItemStyle('copy')}
              onMouseEnter={() => setHoveredItem('copy')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('copy')}
            >
              Copy
            </button>
            <button
              style={getDropdownItemStyle('paste')}
              onMouseEnter={() => setHoveredItem('paste')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('paste')}
            >
              Paste
            </button>
          </div>
        )}
      </button>

      {/* View Menu */}
      <button
        style={styles.menuItem}
        data-menu-item
        onMouseEnter={() => handleMenuMouseEnter('view')}
        onMouseLeave={handleMenuMouseLeave}
        onClick={() => handleMenuClick('view')}
      >
        View
        {activeMenu === 'view' && (
          <div style={styles.dropdown}>
            <button
              style={getDropdownItemStyle('inputs')}
              onMouseEnter={() => setHoveredItem('inputs')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('inputs')}
            >
              Inputs
            </button>
            <button
              style={getDropdownItemStyle('emotions')}
              onMouseEnter={() => setHoveredItem('emotions')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('emotions')}
            >
              Emotions
            </button>
            <button
              style={getDropdownItemStyle('environment')}
              onMouseEnter={() => setHoveredItem('environment')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('environment')}
            >
              Environment
            </button>
            <button
              style={getDropdownItemStyle('timeline')}
              onMouseEnter={() => setHoveredItem('timeline')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('timeline')}
            >
              Timeline
            </button>
            <div style={styles.separator} />
            <button
              style={getDropdownItemStyle('about')}
              onMouseEnter={() => setHoveredItem('about')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('about')}
            >
              About
            </button>
          </div>
        )}
      </button>

      {/* Tools Menu */}
      <button
        style={styles.menuItem}
        data-menu-item
        onMouseEnter={() => handleMenuMouseEnter('tools')}
        onMouseLeave={handleMenuMouseLeave}
        onClick={() => handleMenuClick('tools')}
      >
        Tools
        {activeMenu === 'tools' && (
          <div style={styles.dropdown}>
            <button
              style={getDropdownItemStyle('save_positions')}
              onMouseEnter={() => setHoveredItem('save_positions')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('save_positions')}
            >
              Save Positions
            </button>
            <button
              style={getDropdownItemStyle('recall_positions', !hasSavedPositions)}
              onMouseEnter={() => setHoveredItem('recall_positions')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => hasSavedPositions && handleMenuItemClick('recall_positions')}
              disabled={!hasSavedPositions}
            >
              Recall Positions
            </button>
            <div style={styles.separator} />
            <button
              style={getDropdownItemStyle('reset_all')}
              onMouseEnter={() => setHoveredItem('reset_all')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('reset_all')}
            >
              Reset All Sliders
            </button>
          </div>
        )}
      </button>

      {/* Help Menu */}
      <button
        style={styles.menuItem}
        data-menu-item
        onMouseEnter={() => handleMenuMouseEnter('help')}
        onMouseLeave={handleMenuMouseLeave}
        onClick={() => handleMenuClick('help')}
      >
        Help
        {activeMenu === 'help' && (
          <div style={styles.dropdown}>
            <button
              style={getDropdownItemStyle('contents')}
              onMouseEnter={() => setHoveredItem('contents')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('contents')}
            >
              Contents
            </button>
            <button
              style={getDropdownItemStyle('search')}
              onMouseEnter={() => setHoveredItem('search')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('search')}
            >
              Search for Help
            </button>
            <div style={styles.separator} />
            <button
              style={getDropdownItemStyle('about_help')}
              onMouseEnter={() => setHoveredItem('about_help')}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => handleMenuItemClick('about')}
            >
              About Mental Health Monitor
            </button>
          </div>
        )}
      </button>
    </div>
  );
};

export default MenuBar;
