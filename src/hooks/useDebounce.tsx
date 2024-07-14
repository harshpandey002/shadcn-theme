import React, { useState, useRef, useCallback } from 'react';

export function useDebounce(callback: any, delay: number) {
  // useRef to store the timer handle between renders
  const timer = useRef<any>(null);

  // The debounced function wraps the provided callback
  const debouncedFunction = useCallback(
    (...args: any) => {
      // Clear existing timer
      if (timer.current) {
        clearTimeout(timer.current);
      }
      // Set up a new timer
      timer.current = setTimeout(() => {
        console.log('Debounced function called');
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ); // Dependencies array ensures this is stable unless callback or delay changes

  return debouncedFunction;
}
