import { TANKER } from "../fonts";
import { Team } from "../interfaces";
import { combineClasses } from "../util";
import styles from "./../page.module.css";
import PlacedConstraints from "./PlacedConstraints";

interface TeamInfoProps {
  team: Team;
  allTeams: Team[];
  children?: React.ReactNode;
  grayedOut?: boolean;
}

export default function TeamInfo(props: TeamInfoProps) {
  return (
    <div className={styles.teamInfoContainer}>
      <div
        className={combineClasses(
          styles.teamInfoName,
          TANKER.className,
          props.grayedOut && styles.grayedOut
        )}
      >
        {props.team.teamName}
      </div>
      <div className={styles.teamInfoMembersContainer}>
        {props.team.memberNames.join(" & ")}
      </div>
      <div className={styles.teamChildrenContainer}>{props.children}</div>
      <div className={styles.constraintsContainer}>
        <div className={styles.numConstraintsContainer}>
          {props.team.constraints.length} constraint
          {props.team.constraints.length === 1 ? "" : "s"}
        </div>
        <div className={styles.inflictedConstraintsListContainer}>
          {props.team.constraints.map((constraint) => (
            <PlacedConstraints
              teams={props.allTeams}
              constraint={constraint}
              key={constraint.constraintId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
