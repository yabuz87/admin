import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [action,setAction]=useState('');

  return (
    <MyContext.Provider value={{ subject, setSubject, chapter, setChapter,action,setAction }}>
      {children}
    </MyContext.Provider>
  );
};
