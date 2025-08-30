import { Team } from "../interfaces";
import styles from "./../page.module.css";
import PlacedConstraints from "./PlacedConstraints";

interface TeamInfoProps {
  team: Team;
  allTeams: Team[];
  children?: React.ReactNode;
}

export default function TeamInfo(props: TeamInfoProps) {
  return (
    <div className={styles.teamInfoContainer}>
      <div className={styles.teamName}>{props.team.teamName}</div>
      <div className={styles.teamMembersContainer}>
        {props.team.memberNames.join(", ")}
      </div>
      {props.children}
      <div className={styles.constraintsContainer}>
        <div className={styles.numConstraintsContainer}>
          {props.team.constraints.length} constraints
        </div>
        <div className={styles.constraintsListContainer}>
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
