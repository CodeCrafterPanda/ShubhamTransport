import { useState, useEffect } from 'react';

type TimeConverterReturnType = {
  hours: string;
  minutes: string;
  seconds: string;
  totalSeconds: number;
  totalMinutes: number;
  totalHours: number;
};

const useTimeConverter = (initialTimeInMilliseconds: number): TimeConverterReturnType => {
  const [hours, setHours] = useState<string>("00");
  const [minutes, setMinutes] = useState<string>("00");
  const [seconds, setSeconds] = useState<string>("00");
  const [totalSeconds, setTotalSeconds] = useState<number>(0);
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    const calculateTimeValues = () => {
      const totalSecondsValue = Math.floor(initialTimeInMilliseconds / 1000);
      const hoursValue = Math.floor(totalSecondsValue / 3600);
      const minutesValue = Math.floor((totalSecondsValue % 3600) / 60);
      const secondsValue = totalSecondsValue % 60;

      setHours(String(hoursValue).padStart(2, '0'));
      setMinutes(String(minutesValue).padStart(2, '0'));
      setSeconds(String(secondsValue).padStart(2, '0'));
      setTotalSeconds(totalSecondsValue);
      setTotalMinutes(Math.floor(totalSecondsValue / 60));
      setTotalHours(hoursValue);
    };

    calculateTimeValues();
    
  }, [initialTimeInMilliseconds]);

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    totalMinutes,
    totalHours,
  };
};

export default useTimeConverter;
