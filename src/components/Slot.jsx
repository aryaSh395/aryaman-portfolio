import React from 'react';

/*
 * Slot-machine hover text: on :hover of the parent link/button the
 * label rolls up and an identical copy rolls in from below.
 */
export default function Slot({ children }) {
  return (
    <span className="slot">
      <span className="slot-a">{children}</span>
      <span className="slot-b" aria-hidden>{children}</span>
    </span>
  );
}
