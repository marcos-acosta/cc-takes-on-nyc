import { CONSTRAINTS, ITEMS, SCAVENGER_HUNT_ITEMS } from "../config";
import { PlacedConstraint, ScavengerHuntItem, Team } from "../interfaces";
import { countTeamsWithConstraintId } from "../util";
import styles from "./../page.module.css";
import ConstraintInfo from "./ConstraintInfo";
import ItemInfo from "./ItemInfo";

interface ScavengerHuntItemInfoProps {
  item: ScavengerHuntItem;
  find: () => void;
  teamsData: Team[];
  foundConstraints: PlacedConstraint[];
}

export default function ScavengerHuntItemInfo(
  props: ScavengerHuntItemInfoProps
) {
  const fullItemData = SCAVENGER_HUNT_ITEMS.find(
    (item) => item.itemId === props.item.itemId
  );
  const numberOfTeamsWithThisConstraint = countTeamsWithConstraintId(
    props.teamsData,
    props.item.constraintId
  );
  const itemData = fullItemData && ITEMS[fullItemData.itemId];
  const constraintData = fullItemData && CONSTRAINTS[fullItemData.constraintId];

  const haveAllData = fullItemData && itemData && constraintData;

  const alreadyFound = Boolean(
    props.foundConstraints.find(
      (constraint) => constraint.constraintId === constraintData?.constraintId
    )
  );

  return (
    haveAllData && (
      <div className={styles.itemContainer}>
        <div className={styles.numLeft}>
          {props.item.count - numberOfTeamsWithThisConstraint} left
        </div>
        <button onClick={props.find} disabled={alreadyFound}>
          {alreadyFound ? "Already found" : "Found it!"}
        </button>
        <ItemInfo item={itemData} />
        <ConstraintInfo constraint={constraintData} />
      </div>
    )
  );
}
