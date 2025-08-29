"use client";

import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "./../db";

import { useState } from "react";
import styles from "./../page.module.css";
import Error from "./Error";
import Loading from "./Loading";
import { Team } from "../interfaces";
import { v4 as uuid } from "uuid";

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
      <div>
        <div className={styles.pageOuterContainer}>
          <div className={styles.titleOuterContainer}>
            <div className={styles.titleInnerContainer}>
              CREATIVE CODING SCAVENGER HUNT
            </div>
          </div>
        </div>
        {addingTeamFailed && <Error message={"Failed to add team :/"} />}
        <div className={styles.teamInputContainer}>
          <div className={styles.sectionContainer}>
            <div className={styles.formHeader}>Create a team</div>
            <div className={styles.formContainer}>
              <div className={styles.inputLabel}>Team name</div>
              <input
                value={teamNameCreate}
                onChange={(e) => setTeamNameCreate(e.target.value)}
              />
              <div className={styles.inputLabel}>
                Team member names &#40;comma-separated&#41;:
              </div>
              <input
                value={memberNames}
                onChange={(e) => setMemberNames(e.target.value)}
              />
              <button
                className={styles.button}
                disabled={!canAddTeam}
                onClick={addTeamThenGoToTeamPage}
              >
                Create team
              </button>
            </div>
          </div>
          <div className={styles.sectionContainer}>
            <div className={styles.formHeader}>See team page</div>
            <div className={styles.formContainer}>
              {teamsError ? (
                <Error message="Couldn't fetch the teams :/" />
              ) : teamsLoading ? (
                <Loading message="Loading teams..." />
              ) : (
                teamsValue?.docs
                  .map((doc) => doc.data() as Team)
                  .map((team) => (
                    <div className={styles.teamJoinButton} key={team.teamId}>
                      <button onClick={() => goToTeamPage(team.teamId)}>
                        {team.teamName}
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
