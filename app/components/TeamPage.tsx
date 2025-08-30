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
  canApplyConstraint,
  combineClasses,
  constraintsSetByThisTeam,
  convertDbTeamDocToClientTeam,
  sortScavengerHuntItems,
  sortTeamsByCanApply,
} from "../util";
import ScavengerHuntItemInfo from "./ScavengerHuntItemInfo";
import { CONSTRAINTS, SCAVENGER_HUNT_ITEMS } from "../config";
import { useState } from "react";
import TeamInfo from "./TeamInfo";
import { TANKER } from "../fonts";
import ConstraintInfo from "./ConstraintInfo";

interface TeamPageProps {
  teamId: string;
  setCastingConstraintId: (constraintId: string | null) => void;
  castingConstraintId: string | null;
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

  const chosenConstraintData =
    props.castingConstraintId &&
    CONSTRAINTS[props.castingConstraintId as ConstraintId];

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
      props.setCastingConstraintId(null);
    });
  };

  const findExtra = async (constraintId: ConstraintId) => {
    if (missingData) {
      return;
    }
    const docRef = doc(db, "teams", thisTeamData.teamId);
    await updateDoc(docRef, {
      extras: arrayUnion(constraintId),
    });
  };

  const isOnItemsPage = selectedPage === Page.ITEMS;

  const sortedScavengerHuntItems = SCAVENGER_HUNT_ITEMS.sort((itemA, itemB) =>
    sortScavengerHuntItems(itemA, itemB, constraintsFoundByThisTeam)
  );

  const otherTeams =
    teamsData &&
    thisTeamData &&
    teamsData.filter((team) => team.teamId !== thisTeamData.teamId);

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
                    styles.constraintText,
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
              <div className={styles.ourConstraintsContainer}>
                <div
                  className={combineClasses(
                    styles.constraintsHeader,
                    styles.extraText,
                    TANKER.className
                  )}
                >
                  Your extras
                </div>
                <div className={styles.constraintListContainer}>
                  {thisTeamData.extras.length ? (
                    thisTeamData.extras.map((constraintId) => (
                      <ConstraintInfo
                        constraint={CONSTRAINTS[constraintId]}
                        key={constraintId}
                      />
                    ))
                  ) : (
                    <div className={styles.noConstraints}>
                      You haven&apos;t found any extras.
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.itemsContainer}>
                <div
                  className={combineClasses(
                    styles.constraintsHeader,
                    styles.itemText,
                    TANKER.className
                  )}
                >
                  Items to find
                </div>
                <div className={styles.scavengerHuntItemListContainer}>
                  {sortedScavengerHuntItems.map((item) => (
                    <ScavengerHuntItemInfo
                      item={item}
                      key={item.itemId}
                      teamsData={teamsData}
                      foundConstraints={constraintsFoundByThisTeam}
                      find={(constraintId) => {
                        props.setCastingConstraintId(constraintId);
                      }}
                      castingConstraintId={props.castingConstraintId}
                      thisTeam={thisTeamData}
                      castConstraint={applyConstraint}
                      findExtra={findExtra}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.allTeamsList}>
              {otherTeams &&
                otherTeams.map((team) => (
                  <TeamInfo
                    team={team}
                    allTeams={teamsData}
                    key={team.teamId}
                  />
                ))}
            </div>
          )}
        </>
      )}
      {props.castingConstraintId && chosenConstraintData && (
        <div className={styles.castConstraintOverlay}>
          <div className={styles.overlayInnerContainer}>
            <div className={styles.cancelButtonContainer}>
              <button
                onClick={() => props.setCastingConstraintId(null)}
                className={combineClasses(styles.button, styles.cancelButton)}
              >
                cancel
              </button>
            </div>
            <div
              className={combineClasses(
                styles.chooseTeamHeader,
                TANKER.className
              )}
            >
              Choose a team
            </div>
            <div className={styles.toInflictText}>
              to cast &quot;{chosenConstraintData.title.toLocaleLowerCase()}
              &quot; on:
            </div>
            <div className={styles.teamToInflictListContainer}>
              {!missingData &&
                otherTeams &&
                sortTeamsByCanApply(
                  otherTeams,
                  props.castingConstraintId as ConstraintId
                ).map((team) => {
                  const [canApply, reason] = canApplyConstraint(
                    team,
                    props.castingConstraintId as ConstraintId
                  );
                  return (
                    <TeamInfo
                      team={team}
                      allTeams={teamsData}
                      key={team.teamId}
                      grayedOut={!canApply}
                    >
                      {!canApply && (
                        <div className={styles.cantApplyReason}>
                          Can&apos;t use on this team because {reason}.
                        </div>
                      )}
                      <button
                        disabled={!canApply}
                        className={styles.button}
                        onClick={() =>
                          applyConstraint(
                            team.teamId,
                            props.castingConstraintId as ConstraintId
                          )
                        }
                      >
                        Cast on this team!
                      </button>
                    </TeamInfo>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
