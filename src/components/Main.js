import React from "react";
import Box from "./Box";
import Confetti from "react-confetti";

export default function Main() {
  const [data, setData] = React.useState(generateAllRandom());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(0);

  function generateAllRandom() {
    let dataValue = [];
    for (let i = 0; i < 10; i++) {
      dataValue.push({
        id: i,
        isHeld: false,
        value: Math.ceil(Math.random() * 6),
      });
    }
    return dataValue;
  }

  function changeDie() {
    if (!tenzies) {
      setCount((prevCount) => prevCount + 1);
      setData(
        data.map((element) => {
          return element.isHeld
            ? { ...element }
            : {
                id: element.id,
                isHeld: false,
                value: Math.ceil(Math.random() * 6),
              };
        })
      );
    } else {
      if (count < (bestScore ?? 200)) {
        localStorage.setItem("bestScore", count);
      }
      setTenzies(false);
      setCount(0);
      setData(generateAllRandom());
    }
  }

  function hold(id) {
    setData(
      data.map((element) => {
        return element.id === id
          ? {
              ...element,
              isHeld: !element.isHeld,
            }
          : { ...element };
      })
    );
  }

  React.useEffect(
    function () {
      let winValue = data[0].value;
      const allHeld = data.every((die) => die.isHeld);
      const allSame = data.every((die) => die.value === winValue);
      allHeld && allSame && setTenzies(true);
    },
    [data]
  );

  const boxarray = data.map((element) => {
    const styles = element.isHeld
      ? { backgroundColor: "lightgreen" }
      : { backgroundColor: "white" };
    return (
      <Box
        styles={styles}
        id={element.id}
        key={element.id}
        value={element.value}
        handleClick={hold}
      />
    );
  });

  let bestScore = localStorage.getItem("bestScore");

  return (
    <main>
      {tenzies && <Confetti />}
      <p className="about-game">
        Roll until all dice are the same. Click each die to freeze it as its
        current value between rolls.
      </p>
      <div className="data-container">
        <div className="counter">No of moves <span>{count}</span></div>
        <div className="counter">Best Score <span>{bestScore ?? "0"}</span></div>
      </div>
      <div className="box-container">{boxarray}</div>
      <div className="btn-container">
        <button className="btn" onClick={changeDie}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
