import { KARLA } from "../fonts";
import { Constraint } from "../interfaces";
import { combineClasses } from "../util";
import styles from "./../page.module.css";

interface ConstraintInfoProps {
  constraint: Constraint;
}

export default function ConstraintInfo(props: ConstraintInfoProps) {
  return (
    <div className={styles.constraintContainer}>
      <div className={styles.constraintTitle}>{props.constraint.title}</div>
      <div
        className={combineClasses(
          styles.constraintDescription,
          KARLA.className
        )}
      >
        {props.constraint.description}
      </div>
    </div>
  );
}
