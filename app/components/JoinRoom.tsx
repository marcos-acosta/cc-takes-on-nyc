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
import { AZARET, TANKER } from "../fonts";

const getMemberNames = (namesStr: string) =>
  namesStr.split(",").map((name) => name.trim().toLocaleLowerCase());

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
      teamName: teamNameCreate.toLocaleLowerCase(),
      memberNames: getMemberNames(memberNames),
      teamId: uuid(),
      constraints: [],
      extras: [],
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
          <div
            className={combineClasses(
              styles.formHeader,
              TANKER.className,
              styles.itemText
            )}
          >
            Create a team
          </div>
          <div className={styles.formContainer}>
            <div>
              <div className={styles.inputLabel}>team name</div>
              <input
                value={teamNameCreate}
                onChange={(e) => setTeamNameCreate(e.target.value)}
                maxLength={20}
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
              className={combineClasses(styles.button, AZARET.className)}
              disabled={!canAddTeam}
              onClick={addTeamThenGoToTeamPage}
            >
              create team
            </button>
          </div>
        </div>
        <div className={styles.sectionContainer}>
          <div
            className={combineClasses(
              styles.formHeader,
              TANKER.className,
              styles.constraintText
            )}
          >
            Go to team room
          </div>
          <div className={styles.formContainer}>
            {teamsError ? (
              <div className={styles.messageContainerNoTopMargin}>
                <Error message="Couldn't fetch the teams :/" />
              </div>
            ) : teamsLoading ? (
              <div className={styles.messageContainerNoTopMargin}>
                <Loading message="Loading teams..." />
              </div>
            ) : teamsValue?.docs.length === 0 ? (
              <div className={styles.noTeams}>No teams yet.</div>
            ) : (
              teamsValue?.docs.map(convertDbTeamDocToClientTeam).map((team) => (
                <button
                  onClick={() => goToTeamPage(team.teamId)}
                  className={combineClasses(styles.button, AZARET.className)}
                  key={team.teamId}
                >
                  {team.teamName}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    )
  );
}
