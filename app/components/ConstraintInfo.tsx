import { Constraint } from "../interfaces";
import styles from "./../page.module.css";

interface ConstraintInfoProps {
  constraint: Constraint;
}

export default function ConstraintInfo(props: ConstraintInfoProps) {
  return (
    <div className={styles.constraintContainer}>
      <div className={styles.constraintTitle}>{props.constraint.title}</div>
      <div className={styles.constraintDescription}>
        {props.constraint.description}
      </div>
    </div>
  );
}
