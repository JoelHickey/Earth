import { createTheme } from '@mui/material/styles';

// Modern 2025 Material-UI theme with contemporary design
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#6366f1', // Modern indigo
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#10b981', // Modern emerald
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Modern light gray
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', // Modern dark slate
      secondary: '#64748b',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
    info: {
      main: '#3b82f6',
    },
    divider: '#e2e8f0',
  },
  typography: {
    fontFamily: '"Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: '700',
      lineHeight: '1.2',
    },
    h2: {
      fontSize: '28px',
      fontWeight: '700',
      lineHeight: '1.3',
    },
    h3: {
      fontSize: '24px',
      fontWeight: '600',
      lineHeight: '1.3',
    },
    h4: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    h5: {
      fontSize: '18px',
      fontWeight: '600',
      lineHeight: '1.4',
    },
    h6: {
      fontSize: '16px',
      fontWeight: '600',
      lineHeight: '1.5',
    },
    body1: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '1.6',
    },
    body2: {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '1.5',
    },
    button: {
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 20px',
          fontWeight: '500',
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          },
        },
        outlined: {
          borderColor: '#e2e8f0',
          color: '#475569',
          backgroundColor: '#ffffff',
          '&:hover': {
            borderColor: '#6366f1',
            backgroundColor: '#f8fafc',
          },
        },
        text: {
          color: '#6366f1',
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '20px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#ffffff',
          padding: '20px 24px',
          fontSize: '18px',
          fontWeight: '600',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px',
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused': {
              borderColor: '#6366f1',
              boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
            },
          },
          '& .MuiInputBase-input': {
            padding: '12px 16px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          height: '28px',
          fontSize: '12px',
          fontWeight: '500',
          backgroundColor: '#f1f5f9',
          color: '#475569',
          border: '1px solid #e2e8f0',
        },
        colorPrimary: {
          backgroundColor: '#6366f1',
          color: '#ffffff',
          border: '1px solid #6366f1',
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          padding: '0',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '16px',
          marginBottom: '8px',
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#f8fafc',
            borderColor: '#cbd5e1',
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '8px',
          backgroundColor: '#f1f5f9',
          borderRadius: '4px',
        },
        bar: {
          background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
        },
        elevation1: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

export default muiTheme;