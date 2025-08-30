"use client";

import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "./../db";

import { useState } from "react";
import styles from "./../page.module.css";
import Error from "./Error";
import Loading from "./Loading";
import { Team } from "../interfaces";
import { v4 as uuid } from "uuid";
import { combineClasses, convertDbTeamDocToClientTeam } from "../util";
import { TANKER } from "../fonts";

const getMemberNames = (namesStr: string) =>
  namesStr.split(",").map((name) => name.trim());

export default function JoinRoom() {
  const router = useRouter();
  const [teamNameCreate, setTeamNameCreate] = useState("");
  const [memberNames, setMemberNames] = useState("");
  const [teamsValue, teamsLoading, teamsError] = useCollection(
    collection(db, "teams")
  );
  const [addingTeam, setAddingTeam] = useState(false);
  const [addingTeamFailed, setAddingTeamFailed] = useState(false);

  const canAddTeam = teamNameCreate.length > 0 && memberNames.length > 0;

  const goToTeamPage = (teamId: string) => {
    router.push(`/?team=${teamId}`);
  };

  const addTeamThenGoToTeamPage = async () => {
    if (!canAddTeam) {
      return;
    }
    const newTeam: Team = {
      teamName: teamNameCreate,
      memberNames: getMemberNames(memberNames),
      teamId: uuid(),
      constraints: [],
    };
    setAddingTeam(true);
    setDoc(doc(db, "teams", newTeam.teamId), newTeam).then(
      () => goToTeamPage(newTeam.teamId),
      () => {
        setAddingTeam(false);
        setAddingTeamFailed(true);
      }
    );
  };

  return (
    !addingTeam && (
      <div className={styles.joinRoomOuterContainer}>
        <div className={styles.titleOuterContainer}>
          <div
            className={combineClasses(
              styles.titleInnerContainer,
              TANKER.className
            )}
          >
            CREATIVE CODING
            <br />
            SCAVENGER HUNT
          </div>
        </div>
        {addingTeamFailed && <Error message={"Failed to add team :/"} />}
        <div className={styles.sectionContainer}>
          <div className={combineClasses(styles.formHeader, TANKER.className)}>
            Create a team
          </div>
          <div className={styles.formContainer}>
            <div>
              <div className={styles.inputLabel}>team name</div>
              <input
                value={teamNameCreate}
                onChange={(e) => setTeamNameCreate(e.target.value)}
              />
            </div>
            <div>
              <div className={styles.inputLabel}>
                team member names &#40;comma-separated&#41;
              </div>
              <input
                value={memberNames}
                onChange={(e) => setMemberNames(e.target.value)}
              />
            </div>
            <button
              className={styles.button}
              disabled={!canAddTeam}
              onClick={addTeamThenGoToTeamPage}
            >
              create team ↩
            </button>
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <div className={combineClasses(styles.formHeader, TANKER.className)}>
            Go to team room
          </div>
          <div className={styles.formContainer}>
            {teamsError ? (
              <Error message="Couldn't fetch the teams :/" />
            ) : teamsLoading ? (
              <Loading message="Loading teams..." />
            ) : (
              teamsValue?.docs.map(convertDbTeamDocToClientTeam).map((team) => (
                <button
                  onClick={() => goToTeamPage(team.teamId)}
                  key={team.teamId}
                >
                  {team.teamName} ↩
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
}
