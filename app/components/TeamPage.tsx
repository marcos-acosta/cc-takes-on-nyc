import styles from "./../page.module.css";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "./../db";
import { PlacedConstraint, Team } from "../interfaces";
import Error from "./Error";
import Loading from "./Loading";
import PlacedConstraints from "./PlacedConstraints";
import { convertDbTeamDocToClientTeam } from "../util";

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
  const teamsData: Team[] | undefined =
    teamsValue && teamsValue.docs.map(convertDbTeamDocToClientTeam);

  const thisTeamData =
    teamsData && teamsData.findLast((team) => team.teamId === props.teamId);

  return (
    <div className={styles.teamPageOuterContainer}>
      <div className={styles.teamPageHeader}>
        Creative Coding Scavenger Hunt
      </div>
      {teamsError ? (
        <Error message="Couldn't load teams :/" />
      ) : teamsLoading ? (
        <Loading message="Loading teams..." />
      ) : !thisTeamData ? (
        <Error message="Loaded teams, but couldn't find this team?" />
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
        </>
      )}
    </div>
  );
}
