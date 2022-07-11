import { createSignal } from "solid-js";
import "./Counter.css";

const [isActive, setIsActive] = createSignal(false);

const toggleIsActive = () => setIsActive(!isActive());

export default function Counter() {
  return (
    <button onClick={() => toggleIsActive()}>
      {() => isActive() ? 'on' : 'off'}
    </button>
  );
}
