import { useCallback } from 'react';

export const useSliderDrag = () => {
  const handleSliderMouseDown = useCallback((e, setter, currentValue) => {
    e.preventDefault();
    const track = e.currentTarget.parentElement;
    const rect = track.getBoundingClientRect();
    
    const handleMouseMove = (moveEvent) => {
      const y = moveEvent.clientY - rect.top;
      const percentage = Math.max(0, Math.min(1, 1 - (y / rect.height)));
      const newValue = Math.round(percentage * 10);
      setter(newValue);
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  return handleSliderMouseDown;
};
