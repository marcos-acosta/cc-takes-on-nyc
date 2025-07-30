"use client";

import { useState, useEffect } from "react";
import { CLUES, RETURN_TIME } from "./util";
import styles from "./page.module.css";

const SECOND_IN_MILLIS = 1000;
const MINUTE_IN_MILLIS = 60 * SECOND_IN_MILLIS;

export default function Home() {
  const [teamName, setTeamName] = useState("");
  const [teamNumber, setTeamNumber] = useState(0);
  const [showClues, setShowClues] = useState(false);
  const [index, setIndex] = useState(0);
  const [minutesUntilCodeTime, setMinutesUntilCodeTime] = useState<
    number | null
  >(null);

  const updateTimeUntilCodeTime = () => {
    setMinutesUntilCodeTime(
      Math.max(
        0,
        (RETURN_TIME.valueOf() - new Date().valueOf()) / MINUTE_IN_MILLIS
      )
    );
  };

  useEffect(() => {
    updateTimeUntilCodeTime();
    setInterval(updateTimeUntilCodeTime, MINUTE_IN_MILLIS);
  }, [setMinutesUntilCodeTime]);

  // Load cached states from localStorage on component mount
  useEffect(() => {
    const cachedTeamName = localStorage.getItem("teamName");
    const cachedTeamNumber = localStorage.getItem("teamNumber");
    const cachedShowClues = localStorage.getItem("showClues");
    const cachedIndex = localStorage.getItem("index");

    if (cachedTeamName) setTeamName(cachedTeamName);
    if (cachedTeamNumber) setTeamNumber(parseInt(cachedTeamNumber));
    if (cachedShowClues) setShowClues(cachedShowClues === "true");
    if (cachedIndex) setIndex(parseInt(cachedIndex));
  }, []);

  // Cache states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("teamName", teamName);
  }, [teamName]);

  useEffect(() => {
    localStorage.setItem("teamNumber", teamNumber.toString());
  }, [teamNumber]);

  useEffect(() => {
    localStorage.setItem("showClues", showClues.toString());
  }, [showClues]);

  useEffect(() => {
    localStorage.setItem("index", index.toString());
  }, [index]);

  const acceptTeamAndStart = () => {
    if (teamName.length && teamNumber > 0) {
      setShowClues(true);
    }
  };

  const nextClue = () => {
    setIndex(index + 1);
  };

  const clueIndex = (teamNumber + index) % CLUES.length;
  const clue = CLUES[clueIndex];
  const foundAllClues = index == CLUES.length;

  const outOfTime = minutesUntilCodeTime !== null && minutesUntilCodeTime <= 0;

  return (
    <div className={styles.exampleClassForSasha}>
      {showClues ? (
        <div>
          <div>good luck, {teamName}</div>
          {foundAllClues ? (
            <div>
              congrats! you found all the clues. now head back to [venue] to
              code creatively
            </div>
          ) : (
            <div>
              <div>you must now find: {clue}</div>
              <div>
                <button onClick={nextClue}>found</button>
              </div>
              {minutesUntilCodeTime !== null &&
                (outOfTime ? (
                  <div>GET BACK NOW!</div>
                ) : (
                  <div>
                    {Math.floor(minutesUntilCodeTime)} minutes left until
                    creative coding
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div>cc takes on nyc</div>
          <div>
            <label>
              team name
              <input
                type="text"
                name="team-name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </label>
            <label>
              team number
              <input
                type="number"
                name="team-number"
                value={teamNumber}
                onChange={(e) => setTeamNumber(parseInt(e.target.value))}
              />
            </label>
            <div>
              <button onClick={acceptTeamAndStart}>submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
