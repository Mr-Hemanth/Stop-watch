import React, { useState, useEffect } from 'react';
import "./Stopwatch.css"

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timelapses, setTimelapses] = useState([]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // incrementing by 10 milliseconds
      }, 10);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const startStopwatch = () => setIsRunning(true);
  const pauseStopwatch = () => setIsRunning(false);
  const resetStopwatch = () => {
    setIsRunning(false);
    setTime(0);
  };

  
  const saveTimelapse = () => {
    const duration = time; // only storing the duration in milliseconds

    const newTimelapse = {
      _id: Date.now().toString(), // Generating a unique ID based on timestamp
      duration,
    };

    setTimelapses([...timelapses, newTimelapse]);
  };

  const deleteTimelapse = (id) => {
    setTimelapses(timelapses.filter((timelapse) => timelapse._id !== id));
  };

  useEffect(() => {
    // Static timelapses data
    const staticTimelapses = [
      {
        _id: '1',
        duration: 30000, // 30 seconds in milliseconds
      },
      {
        _id: '2',
        duration: 60000, // 60 seconds in milliseconds
      },
    ];
    setTimelapses(staticTimelapses);
  }, []);

  const formatTime = (time) => {
    const milliseconds = time % 1000;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="timer">{formatTime(time)}</div>
      <div className="controls">
        <button onClick={startStopwatch} className="control-button">Start</button>
        <button onClick={pauseStopwatch} className="control-button">Pause</button>
        <button onClick={resetStopwatch} className="control-button">Reset</button>
        <button onClick={saveTimelapse} className="control-button">Save Timelapse</button>
      </div>
      <h2>Timelapses</h2>
      <ul className="timelapses">
        {timelapses.map((timelapse) => (
          <li key={timelapse._id} className="timelapse-item">
            {formatTime(timelapse.duration)}
            <button onClick={() => deleteTimelapse(timelapse._id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
