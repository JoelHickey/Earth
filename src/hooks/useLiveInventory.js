import { useState, useEffect } from 'react';

/**
 * Custom hook to manage live inventory countdown and changes
 * Simulates real-time room availability with visual indicators
 */
const useLiveInventory = (initialInventory = { room1: 2, room2: 5, room3: 3 }) => {
  const [inventory, setInventory] = useState(initialInventory);
  const [secondsAgo, setSecondsAgo] = useState(2);
  const [inventoryChange, setInventoryChange] = useState({ room1: null, room2: null, room3: null });
  const [soldOutRooms, setSoldOutRooms] = useState({});

  // Simulate live inventory changes
  useEffect(() => {
    const interval = setInterval(() => {
      setInventory(prev => {
        const newInventory = { ...prev };
        const changes = {};
        
        // Randomly decrease inventory for rooms
        Object.keys(newInventory).forEach(roomKey => {
          if (newInventory[roomKey] > 0 && Math.random() > 0.6) {
            newInventory[roomKey] -= 1;
            changes[roomKey] = 'down';
            
            // Mark as sold out when hitting 0
            if (newInventory[roomKey] === 0) {
              setTimeout(() => {
                setSoldOutRooms(prev => ({ ...prev, [roomKey]: true }));
              }, 100);
            }
          } else {
            changes[roomKey] = null;
          }
        });
        
        setInventoryChange(changes);
        return newInventory;
      });
    }, 4000); // Every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Update "X seconds ago" timestamp
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo(prev => (prev < 60 ? prev + 1 : 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    inventory,
    secondsAgo,
    inventoryChange,
    soldOutRooms
  };
};

export default useLiveInventory;

