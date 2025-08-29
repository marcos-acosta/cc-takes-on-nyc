import { CONSTRAINTS } from "../config";
import { PlacedConstraint, Team } from "../interfaces";
import styles from "./../page.module.css";

interface PlacedConstraintsProps {
  teams: Team[];
  constraint: PlacedConstraint;
}

export default function PlacedConstraints(props: PlacedConstraintsProps) {
  const constraintData = CONSTRAINTS[props.constraint.constraintId];
  const castByTeam = props.teams.findLast(
    (team) => team.teamId === props.constraint.placedByTeamId
  );

  console.log(props.constraint.timestamp);

  return (
    <div className={styles.constraint}>
      <div className={styles.constraintTitle}>{constraintData?.title}</div>
      <div className={styles.constraintDescription}>
        {constraintData?.description}
      </div>
      {castByTeam && (
        <div className={styles.placedByContainer}>
          Cast by {castByTeam.teamName} at{" "}
          {props.constraint.timestamp.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
