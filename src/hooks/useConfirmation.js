import { useState } from 'react';

/**
 * Custom hook to manage confirmation flow with inline loading/success states
 * Handles the processing → success → close flow
 */
const useConfirmation = (onSuccess, processingTime = 2500, successTime = 2000) => {
  const [confirmingIdx, setConfirmingIdx] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const confirm = (idx = 0) => {
    setConfirmingIdx(idx);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      
      // Show success message
      setTimeout(() => {
        setConfirmingIdx(null);
        if (onSuccess) {
          onSuccess();
        }
      }, successTime);
    }, processingTime);
  };
  
  const reset = () => {
    setConfirmingIdx(null);
    setIsProcessing(false);
  };
  
  return {
    confirmingIdx,
    isProcessing,
    confirm,
    reset,
    isConfirming: (idx) => confirmingIdx === idx,
    showSuccess: confirmingIdx !== null && !isProcessing
  };
};

export default useConfirmation;

