import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(20);
  const cardsRef = useRef();
  const observerRef = useRef();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCount((cnt) => cnt + 20);
          observerRef.current.unobserve(entries[0].target);
        }
      },
      { threshold: 1 }
    );
  }, []);

  useEffect(() => {
    if (cardsRef.current) {
      observerRef.current.observe(cardsRef.current.lastElementChild);
    }

    return () => observerRef.current.disconnect();
  }, [count]);

  return (
    <div className="App" ref={cardsRef}>
      {Array(count)
        .fill(null)
        .map((_, index) => (
          <div className="card" key={index}>
            {index + 1}
          </div>
        ))}
    </div>
  );
}
