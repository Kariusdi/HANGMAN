import React, { useCallback, useState } from "react";
import "./App.css";

const alphabet: string[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const HANGMAN: JSX.Element[] = [
  <div className="head"></div>,
  <div className="body"></div>,
  <div className="right-leg"></div>,
  <div className="left-leg"></div>,
  <div className="right-arm"></div>,
  <div className="left-arm"></div>,
];

function App() {
  const [word, setWord] = useState<string[]>([]);
  const [correctWord, setCorrectWord] = useState<string[]>([]);
  const [attempt, setAttempt] = useState<number>(0);
  const [checkGameStatus, setCheckGameStatus] = useState<string>("");

  const randomWords = useCallback(() => {
    const words: string[] = ["fish", "water"];
    const Aword = words[Math.floor(Math.random() * words.length)];
    const split_word = Aword.split("");
    setWord(split_word);
    console.log(split_word);
  }, [word]);

  const checkChar = (idx: number) => {
    const char = alphabet[idx];
    if (!word.includes(char.toLowerCase())) {
      setAttempt((attempt) => attempt + 1);
    }

    if (!correctWord.includes(char.toLowerCase())) {
      setCorrectWord((prevChar) => [...prevChar, char.toLowerCase()]);
    }

    if (attempt == 5) {
      setCheckGameStatus("lose");
    }

    if (correctWord.length + 1 == word.length) {
      setCheckGameStatus("win");
    }
  };
  return (
    <div className="wrapper">
      <h1>
        {word.length === 0
          ? "Press start to play the game"
          : checkGameStatus == "win"
          ? "You Win"
          : checkGameStatus == "lose"
          ? "Game Over"
          : "Game has begun"}
      </h1>
      <div className="hangman">
        <div className="basement"></div>
        <div className="vertical"></div>
        <div className="horizontal"></div>
        <div className="hanging"></div>
        {HANGMAN.map((part, idx) => {
          return idx < attempt ? part : null;
        })}
      </div>
      <section>
        <div className="box">
          {word?.map((char) => {
            return (
              <>
                <span className="blank">
                  <p className="word">
                    {correctWord?.map((cw) => {
                      return char.includes(cw) ? char.toUpperCase() : "";
                    })}
                  </p>
                </span>
              </>
            );
          })}
        </div>
      </section>
      <section className="container">
        {alphabet?.map((char, idx) => (
          <button
            disabled={word.length === 0}
            key={idx}
            className="character-block"
            onClick={() => checkChar(idx)}
          >
            {char}
          </button>
        ))}
      </section>
      <button className="startButton" onClick={randomWords}>
        Start
      </button>
    </div>
  );
}

export default App;
