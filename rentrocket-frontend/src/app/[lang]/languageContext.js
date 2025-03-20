'use client'
import React, { createContext, useContext } from 'react';

const LanguageContext = createContext({
    lang: 'en',  
    dictionary: {}  
}, );

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children, lang, dictionary }) => {
    return (
      <LanguageContext.Provider value={{ lang, dictionary }}>
        {children}
      </LanguageContext.Provider>
    );
  };