import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [step, setStep] = useState(0);
  const [tone, setTone] = useState("");
  const [answers, setAnswers] = useState({
    a1: "",
    a2: "",
    a3: "",
  });
  const [letter, setLetter] = useState("");

  const tones = {
    gentle: "I’ve made peace, but I still have things to say.",
    angry: "I need to let it out, raw and unfiltered.",
    unsure: "I’m torn. I’m still figuring it out.",
    detached: "I’ve moved on, but I want to close the loop.",
    grieving: "This isn’t just about pain — it’s about letting go.",
  };

  const prompts = [
    {
      question: "What would you say if you weren’t afraid?",
      example: "(e.g. I never got to tell you how much it broke me.)",
    },
    {
      question: "What hurt the most?",
      example: "(e.g. The silence after everything we shared.)",
    },
    {
      question: "What do you wish they understood before they left?",
      example: "(e.g. I wasn’t perfect, but I always cared.)",
    },
  ];

  const generateLetter = () => {
    const { a1, a2, a3 } = answers;
    setLetter(
      `Dear You,\n\n${a1}\n\nWhat really hurt me was this: ${a2}\n\nAnd here’s what I wish you knew: ${a3}\n\nI won’t be sending this, but I needed to set it down.\n\nGoodbye.\n\n— Me`
    );
  };

  if (step === 0) {
    return (
      <div className="container center-content full-height">
        <h1>UNSENT</h1>
        <p className="center-text">
          A gentle space to say what never got said.
        </p>
        <p className="center-text">
          Write the letter they’ll never read — and release it for your own
          peace.
        </p>
        <button onClick={() => setStep(1)}>Begin Writing</button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="container center-content">
        <h2>Pick a tone:</h2>
        {Object.entries(tones).map(([key, value]) => (
          <button
            key={key}
            className="tone-button"
            onClick={() => {
              setTone(key);
              setStep(2);
            }}
          >
            <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {key}
            </span>
            <p>{value}</p>
          </button>
        ))}
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="container center-content">
        <h2>Write Your Truth</h2>
        {prompts.map((p, idx) => (
          <div key={idx} className="prompt-block">
            <label>{p.question}</label>
            <p className="example">{p.example}</p>
            <textarea
              rows={4}
              value={answers[`a${idx + 1}` as keyof typeof answers]}
              onChange={(e) =>
                setAnswers({
                  ...answers,
                  [`a${idx + 1}` as keyof typeof answers]: e.target.value,
                })
              }
            />
          </div>
        ))}
        <button onClick={() => setStep(3)}>Continue</button>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="container center-content">
        <h2>Before you see your letter...</h2>
        <p>Please fill out this quick form so we can keep this tool free!</p>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdarRgt0MCNtOGAtx_DJ-qZqvHY60sT038WSBac7U4EmSIFww/viewform?usp=dialog"
          width="100%"
          height="500"
          frameBorder="0"
          title="Google Form"
        />
        <button
          onClick={() => {
            generateLetter();
            setStep(4);
          }}
        >
          See My Letter
        </button>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="container center-content">
        <h2>Your UNSENT Letter</h2>
        <pre className="letter">{letter}</pre>
        <button onClick={() => window.print()}>Download</button>
        <button onClick={() => window.location.reload()}>Write Another</button>
        <p className="footer-note">
          Want to go deeper? Subscribe to <strong>Unlearn With Me</strong> — the
          raw, real newsletter behind this tool.
        </p>
        <a
          href="https://unlearningwithme.substack.com"
          target="_blank"
          rel="noreferrer"
        >
          unlearningwithme.substack.com
        </a>
      </div>
    );
  }

  return null;
}
