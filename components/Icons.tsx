import React from 'react';

export const LeafIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10"/>
  </svg>
);

export const BotIcon = (props: any) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="8" cy="8" r="2" fill="currentColor"/>
    <circle cx="16" cy="8" r="2" fill="currentColor"/>
  </svg>
);
