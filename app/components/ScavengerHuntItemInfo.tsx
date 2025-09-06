import { CONSTRAINTS, ITEMS, SCAVENGER_HUNT_ITEMS } from "../config";
import {
  ConstraintId,
  PlacedConstraint,
  ScavengerHuntItem,
  Team,
} from "../interfaces";
import { countTeamsWithConstraintId } from "../util";
import styles from "./../page.module.css";
import ConstraintInfo from "./ConstraintInfo";
import ItemInfo from "./ItemInfo";

interface ScavengerHuntItemInfoProps {
  item: ScavengerHuntItem;
  find: (constraintId: string | null) => void;
  findExtra: (constraintId: ConstraintId) => void;
  teamsData: Team[];
  foundConstraints: PlacedConstraint[];
  castingConstraintId: string | null;
  thisTeam: Team;
  castConstraint: (onTeamId: string, constraintId: ConstraintId) => void;
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

  const alreadyFound =
    Boolean(
      props.foundConstraints.find(
        (constraint) => constraint.constraintId === constraintData?.constraintId
      )
    ) ||
    (constraintData &&
      props.thisTeam.extras.includes(constraintData.constraintId));

  const isCasting =
    haveAllData && props.castingConstraintId === constraintData.constraintId;

  const findItem = () => {
    if (!haveAllData) {
      return;
    }
    if (CONSTRAINTS[constraintData.constraintId].isVeto) {
      props.findExtra(constraintData.constraintId);
    } else {
      props.find(constraintData.constraintId);
    }
  };

  const isDepleted =
    (props.item.count || 0) - numberOfTeamsWithThisConstraint <= 0;

  return (
    haveAllData && (
      <div className={styles.scavengerHuntItemContainer}>
        <div className={styles.itemHeader}>
          <div className={styles.numLeft}>
            {props.item.count
              ? props.item.count - numberOfTeamsWithThisConstraint
              : "∞"}{" "}
            left
          </div>
          <button
            className={styles.button}
            onClick={findItem}
            disabled={alreadyFound || isCasting || isDepleted}
          >
            {alreadyFound
              ? "Already found"
              : isCasting
              ? "Casting..."
              : "Found it!"}
          </button>
        </div>
        <ItemInfo item={itemData} found={alreadyFound} depleted={isDepleted} />
        <div className={styles.grantsContainer}>
          <div className={styles.grantsText}>grants ability to cast:</div>
          <div className={styles.grantsConstraintContainer}>
            <ConstraintInfo constraint={constraintData} />
          </div>
        </div>
      </div>
    )
  );
}
