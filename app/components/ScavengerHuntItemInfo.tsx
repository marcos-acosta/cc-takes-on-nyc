import { CONSTRAINTS, ITEMS, SCAVENGER_HUNT_ITEMS } from "../config";
import { ScavengerHuntItem } from "../interfaces";
import styles from "./../page.module.css";
import ConstraintInfo from "./ConstraintInfo";
import ItemInfo from "./ItemInfo";

interface ScavengerHuntItemInfoProps {
  item: ScavengerHuntItem;
  find: () => void;
}

export default function ScavengerHuntItemInfo(
  props: ScavengerHuntItemInfoProps
) {
  const fullItemData = SCAVENGER_HUNT_ITEMS.find(
    (item) => item.itemId === props.item.itemId
  );
  const itemData = fullItemData && ITEMS[fullItemData.itemId];
  const constraintData = fullItemData && CONSTRAINTS[fullItemData.constraintId];

  const haveAllData = fullItemData && itemData && constraintData;

  return (
    haveAllData && (
      <div className={styles.itemContainer}>
        <div className={styles.numLeft}>{props.item.count} left</div>
        <button onClick={props.find}>found!</button>
        <ItemInfo item={itemData} />
        <ConstraintInfo constraint={constraintData} />
      </div>
    )
  );
}
