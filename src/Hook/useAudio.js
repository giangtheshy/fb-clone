import React, { useState, useEffect } from "react";
import ringtone from "../ringtone.mp3";
const useAudio = () => {
  const [audio] = useState(new Audio(ringtone));
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    setPlaying(!playing);
  };
  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);
  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return audio.removeEventListener("ended", () => setPlaying(false));
  }, []);
  return [playing, toggle];
};

export default useAudio;
