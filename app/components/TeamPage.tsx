import styles from "./../page.module.css";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  arrayUnion,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./../db";
import { ConstraintId, PlacedConstraint, Team } from "../interfaces";
import Error from "./Error";
import Loading from "./Loading";
import PlacedConstraints from "./PlacedConstraints";
import {
  combineClasses,
  constraintsSetByThisTeam,
  convertDbTeamDocToClientTeam,
} from "../util";
import ScavengerHuntItemInfo from "./ScavengerHuntItemInfo";
import { SCAVENGER_HUNT_ITEMS } from "../config";
import { useState } from "react";
import TeamInfo from "./TeamInfo";
import { TANKER } from "../fonts";

interface TeamPageProps {
  teamId: string;
}

const enum Page {
  ITEMS,
  TEAMS,
}

const keyFromPlacedConstraint = (placedConstraint: PlacedConstraint) =>
  `${placedConstraint.constraintId}-${
    placedConstraint.placedByTeamId
  }-${placedConstraint.timestamp.valueOf()}`;

export default function TeamPage(props: TeamPageProps) {
  const [teamsValue, teamsLoading, teamsError] = useCollection(
    collection(db, "teams")
  );
  const [selectedPage, setSelectedPage] = useState(Page.ITEMS);
  const [castingConstraintId, setCastingConstraintId] = useState<string | null>(
    null
  );

  const teamsData: Team[] | undefined =
    teamsValue && teamsValue.docs.map(convertDbTeamDocToClientTeam);

  const thisTeamData =
    teamsData && teamsData.findLast((team) => team.teamId === props.teamId);

  const constraintsFoundByThisTeam =
    teamsData &&
    thisTeamData &&
    constraintsSetByThisTeam(teamsData, thisTeamData.teamId);

  const missingData =
    !teamsData || !thisTeamData || !constraintsFoundByThisTeam;

  const applyConstraint = async (
    onTeamId: string,
    constraintId: ConstraintId
  ) => {
    if (missingData) {
      return;
    }
    const placedConstraint: PlacedConstraint = {
      constraintId: constraintId,
      placedByTeamId: thisTeamData.teamId,
      placedOnTeamId: onTeamId,
      timestamp: new Date(),
    };
    const placedConstraintForDb = {
      ...placedConstraint,
      timestamp: Timestamp.fromDate(placedConstraint.timestamp),
    };
    const docRef = doc(db, "teams", onTeamId);
    await updateDoc(docRef, {
      constraints: arrayUnion(placedConstraintForDb),
    }).then(() => {
      setCastingConstraintId(null);
    });
  };

  const canApplyConstraint = (team: Team, constraintId: ConstraintId) => {
    return [true, null];
  };

  const isOnItemsPage = selectedPage === Page.ITEMS;

  return (
    <div className={styles.teamPageOuterContainer}>
      {teamsError ? (
        <Error message="Couldn't load data :/" />
      ) : teamsLoading ? (
        <Loading message="Loading..." />
      ) : missingData ? (
        <div className={styles.messageContainer}>
          <Error message="Something went wrong" />
        </div>
      ) : (
        <>
          <div className={combineClasses(styles.teamName, TANKER.className)}>
            {thisTeamData.teamName}
          </div>
          <div className={styles.memberNames}>
            {thisTeamData.memberNames.join(" & ")}
          </div>
          <div className={styles.choosePageContainer}>
            <button
              onClick={() => setSelectedPage(Page.ITEMS)}
              className={combineClasses(
                styles.button,
                styles.toggleButton,
                isOnItemsPage && styles.selected
              )}
            >
              us
            </button>
            <button
              onClick={() => setSelectedPage(Page.TEAMS)}
              className={combineClasses(
                styles.button,
                styles.toggleButton,
                !isOnItemsPage && styles.selected
              )}
            >
              them
            </button>
          </div>
          {selectedPage === Page.ITEMS ? (
            <div className={styles.usPageContainer}>
              <div className={styles.ourConstraintsContainer}>
                <div
                  className={combineClasses(
                    styles.constraintsHeader,
                    TANKER.className
                  )}
                >
                  Your constraints
                </div>
                <div className={styles.constraintListContainer}>
                  {thisTeamData.constraints.length ? (
                    thisTeamData.constraints.map((placedConstraint) => (
                      <PlacedConstraints
                        constraint={placedConstraint}
                        teams={teamsData}
                        key={keyFromPlacedConstraint(placedConstraint)}
                      />
                    ))
                  ) : (
                    <div className={styles.noConstraints}>
                      Your team has no constraints! &#40;yet...&#41;
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.itemsContainer}>
                <div
                  className={combineClasses(
                    styles.constraintsHeader,
                    TANKER.className
                  )}
                >
                  Items to find
                </div>
                <div className={styles.scavengerHuntItemListContainer}>
                  {SCAVENGER_HUNT_ITEMS.map((item, index) => (
                    <>
                      <ScavengerHuntItemInfo
                        item={item}
                        key={item.itemId}
                        teamsData={teamsData}
                        foundConstraints={constraintsFoundByThisTeam}
                        find={(constraintId) => {
                          setCastingConstraintId(constraintId);
                        }}
                        castingConstraintId={castingConstraintId}
                        thisTeamId={thisTeamData.teamId}
                        castConstraint={applyConstraint}
                      />
                      {/* {index < SCAVENGER_HUNT_ITEMS.length - 1 && <hr />} */}
                    </>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {teamsData
                .filter((team) => team.teamId !== thisTeamData.teamId)
                .map((team) => (
                  <TeamInfo
                    team={team}
                    allTeams={teamsData}
                    key={team.teamId}
                  />
                ))}
            </>
          )}
        </>
      )}
      {castingConstraintId && (
        <div className={styles.castConstraintOverlay}>
          <button onClick={() => setCastingConstraintId(null)}>cancel</button>
          {!missingData &&
            teamsData
              .filter((team) => team.teamId !== thisTeamData.teamId)
              .map((team) => {
                const [canApply, reason] = canApplyConstraint(
                  team,
                  castingConstraintId as ConstraintId
                );
                return (
                  <TeamInfo team={team} allTeams={teamsData} key={team.teamId}>
                    {!canApply && (
                      <div className={styles.cantApplyReason}>
                        Can&apos;t cast this constraint because {reason}
                      </div>
                    )}
                    <button
                      disabled={!canApply}
                      onClick={() =>
                        applyConstraint(
                          team.teamId,
                          castingConstraintId as ConstraintId
                        )
                      }
                    >
                      Cast on this team!
                    </button>
                  </TeamInfo>
                );
              })}
        </div>
      )}
    </div>
  );
}
