import { useEffect, useState } from "react";

export default function TypeWriter({ cities = [] }) {
  const [text, setText] = useState("");
  const [cityIndex, setCityIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!cities.length) return;

    const currentCity = cities[cityIndex];
    let timer;

    if (charIndex < currentCity.length) {
      timer = setTimeout(() => {
        setText((prev) => prev + currentCity.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 120);
    } else {
      timer = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setCityIndex((prev) => (prev + 1) % cities.length);
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [charIndex, cityIndex, cities]);

  return (
    <span className="text-primary">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}