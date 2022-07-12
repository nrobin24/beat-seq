import BeatEditor from "~/components/beatEditor";
import "./index.css";

export default function Home() {
  return (
    <main>
      <h1>BeatSeq</h1>
      <BeatEditor />
      <p>
        Make a cool beat!
      </p>
    </main>
  );
}
