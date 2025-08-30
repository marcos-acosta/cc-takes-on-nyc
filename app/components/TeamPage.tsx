import styles from "./../page.module.css";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "./../db";
import { Item, PlacedConstraint, ScavengerHuntItem, Team } from "../interfaces";
import Error from "./Error";
import Loading from "./Loading";
import PlacedConstraints from "./PlacedConstraints";
import { convertDbTeamDocToClientTeam } from "../util";
import ScavengerHuntItemInfo from "./ScavengerHuntItemInfo";

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
  const [itemsValue, itemsLoading, itemsError] = useCollection(
    collection(db, "items")
  );
  const teamsData: Team[] | undefined =
    teamsValue && teamsValue.docs.map(convertDbTeamDocToClientTeam);
  const itemsData: ScavengerHuntItem[] | undefined =
    itemsValue && itemsValue.docs.map((doc) => doc.data() as ScavengerHuntItem);

  const thisTeamData =
    teamsData && teamsData.findLast((team) => team.teamId === props.teamId);

  const anyError = itemsError || teamsError;
  const anyLoading = itemsLoading || teamsLoading;
  const missingData = !teamsData || !itemsData || !thisTeamData;

  return (
    <div className={styles.teamPageOuterContainer}>
      <div className={styles.teamPageHeader}>
        Creative Coding Scavenger Hunt
      </div>
      {anyError ? (
        <Error message="Couldn't load data :/" />
      ) : anyLoading ? (
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
            {itemsData.map((item) => (
              <ScavengerHuntItemInfo
                item={item}
                key={item.itemId}
                find={() => {}}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
