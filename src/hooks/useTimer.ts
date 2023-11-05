import { useState, useEffect, useRef } from 'react';

type TimerReturnType = {
  timeInMilliseconds: number;
  isRunning: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  restart: () => void;
};

const useTimer = (initialTimeInMilliseconds: number, isCountUp: boolean = false): TimerReturnType => {
  const [timeInMilliseconds, setTimeInMilliseconds] = useState<number>(initialTimeInMilliseconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const timerIntervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeRef = useRef<number>(initialTimeInMilliseconds);
  const startTimeRef = useRef<number | null>(null);
  const elapsedWhenPausedRef = useRef<number>(0);

  useEffect(() => {
    const updateTimer = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - (startTimeRef.current || 0) + elapsedWhenPausedRef.current;

      if (isCountUp) {
        setTimeInMilliseconds(elapsedTime);
      } else {
        const remainingTime = initialTimeRef.current - elapsedTime;

        if (remainingTime <= 0) {
          if (timerIntervalIdRef.current) {
            clearInterval(timerIntervalIdRef.current);
          }
          setIsRunning(false);
          setTimeInMilliseconds(0);
        } else {
          setTimeInMilliseconds(remainingTime);
        }
      }
    };

    if (isRunning && !timerIntervalIdRef.current) {
      startTimeRef.current = Date.now();
      timerIntervalIdRef.current = setInterval(updateTimer, 100);
    } else if (!isRunning && timerIntervalIdRef.current) {
      clearInterval(timerIntervalIdRef.current);
      timerIntervalIdRef.current = null;
    }

    return () => {
      if (timerIntervalIdRef.current) {
        clearInterval(timerIntervalIdRef.current);
      }
    };
  }, [isRunning, isCountUp]);

  const start = () => {
    elapsedWhenPausedRef.current = 0;
    setIsRunning(true);
    setIsPaused(false);
  };

  const pause = () => {
    setIsRunning(false);
    setIsPaused(true);
    elapsedWhenPausedRef.current = isCountUp 
      ? timeInMilliseconds 
      : initialTimeRef.current - timeInMilliseconds;  
  };

  const resume = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const stop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeInMilliseconds(initialTimeRef.current);
    elapsedWhenPausedRef.current = 0;
  };

  const restart = () => {
    elapsedWhenPausedRef.current = 0;
    setIsRunning(false);
    setIsPaused(false);
    startTimeRef.current = null;
    setTimeInMilliseconds(initialTimeRef.current);
    setIsRunning(true);
  };

  return {
    timeInMilliseconds,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    stop,
    restart,
  };
};

export default useTimer;
