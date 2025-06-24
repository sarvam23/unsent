import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [tone, setTone] = useState("");
  const [answers, setAnswers] = useState({
    a1: "",
    a2: "",
    a3: ""
  });
  const [letter, setLetter] = useState("");

  useEffect(() => {
    if (step === 4) {
      const generated = `Dear You,

${answers.a1}

What really hurt me was this: ${answers.a2}

And here’s what I wish you knew: ${answers.a3}

I won’t be sending this, but I needed to set it down.

Goodbye.

— Me`;
      setLetter(generated);
    }
  }, [step, answers]);

  if (step === 1) {
    return (
      <div className="container background">
        <h1 className="typewriter">UNSENT</h1>
        <p>A gentle space to say what never got said.</p>
        <p>Write the letter they’ll never read — and release it for your own peace.</p>
        <button onClick={() => setStep(2)}>Begin Writing</button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="container background">
        <h2>Pick a tone:</h2>
        {[
          { key: "gentle", text: "I’ve made peace, but I still have things to say." },
          { key: "angry", text: "I need to let it out, raw and unfiltered." },
          { key: "unsure", text: "I’m torn. I’m still figuring it out." },
          { key: "detached", text: "I’ve moved on, but I want to close the loop." },
          { key: "grieving", text: "This isn’t just about pain — it’s about letting go." }
        ].map((t) => (
          <button
            key={t.key}
            className="tone-button"
            onClick={() => {
              setTone(t.key);
              setStep(3);
            }}
          >
            <strong>{t.key.toUpperCase()}</strong><br />
            {t.text}
          </button>
        ))}
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="container background">
        <h2>Write Your Truth</h2>
        {[
          { q: "What would you say if you weren’t afraid?", k: "a1", e: "I never got to tell you how much it broke me." },
          { q: "What hurt the most?", k: "a2", e: "The silence after everything we shared." },
          { q: "What do you wish they understood before they left?", k: "a3", e: "I wasn’t perfect, but I always cared." }
        ].map((p) => (
          <div className="prompt" key={p.k}>
            <label><strong>{p.q}</strong></label><br />
            <textarea
              rows={4}
              placeholder={p.e}
              value={answers[p.k as keyof typeof answers]}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [p.k]: e.target.value
                })
              }
            ></textarea>
          </div>
        ))}
        <button onClick={() => setStep(4)}>Continue</button>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="container background">
        <h2>Your UNSENT Letter</h2>
        <pre>{letter}</pre>
        <button onClick={() => window.print()}>Download</button>
        <button onClick={() => window.location.reload()}>Write Another</button>
        <p className="footer-note">
          Want to go deeper? Subscribe to <strong>Unlearn With Me</strong> — the raw, real newsletter behind this tool.<br />
          <a href="https://unlearningwithme.substack.com" target="_blank" rel="noreferrer">unlearningwithme.substack.com</a>
        </p>
      </div>
    );
  }

  return null;
}
