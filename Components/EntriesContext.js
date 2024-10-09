import React, { createContext, useState } from 'react';

export const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState({
    exercise: [],
    diet: [],
  });

  const addNewEntry = (type, newEntry) => {
    if (!['exercise', 'diet'].includes(type)) {
      console.error('Invalid entry type');
      return;
    }
    setEntries((prevEntries) => ({
      ...prevEntries,
      [type]: [...prevEntries[type], newEntry],
    }));
  };

  return (
    <EntriesContext.Provider value={{ entries, addNewEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};