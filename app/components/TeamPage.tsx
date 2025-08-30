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
import {
  ConstraintId,
  Item,
  PlacedConstraint,
  ScavengerHuntItem,
  Team,
} from "../interfaces";
import Error from "./Error";
import Loading from "./Loading";
import PlacedConstraints from "./PlacedConstraints";
import {
  constraintsSetByThisTeam,
  convertDbTeamDocToClientTeam,
} from "../util";
import ScavengerHuntItemInfo from "./ScavengerHuntItemInfo";
import { SCAVENGER_HUNT_ITEMS } from "../config";
import { useState } from "react";

interface TeamPageProps {
  teamId: string;
}

const keyFromPlacedConstraint = (placedConstraint: PlacedConstraint) =>
  `${placedConstraint.constraintId}-${
    placedConstraint.placedByTeamId
  }-${placedConstraint.timestamp.valueOf()}`;

export default function TeamPage(props: TeamPageProps) {
  const [teamsValue, teamsLoading, teamsError] = useCollection(
    collection(db, "teams")
  );
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

  return (
    <div className={styles.teamPageOuterContainer}>
      <div className={styles.teamPageHeader}>
        Creative Coding Scavenger Hunt
      </div>
      {teamsError ? (
        <Error message="Couldn't load data :/" />
      ) : teamsLoading ? (
        <Loading message="Loading..." />
      ) : missingData ? (
        <Error message="Something weird happened" />
      ) : (
        <>
          <div className={styles.teamName}>{thisTeamData.teamName}</div>
          <div className={styles.memberNames}>
            With {thisTeamData.memberNames.join(", ")}
          </div>
          <div className={styles.constraintsContainer}>
            <div className={styles.constraintsHeader}>Your constraints</div>
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
          <div className={styles.itemsContainer}>
            {SCAVENGER_HUNT_ITEMS.map((item) => (
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
            ))}
          </div>
        </>
      )}
    </div>
  );
}
