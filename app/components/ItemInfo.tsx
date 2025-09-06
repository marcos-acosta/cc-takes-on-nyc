import { KARLA, TANKER } from "../fonts";
import { Item } from "../interfaces";
import { combineClasses } from "../util";
import styles from "./../page.module.css";

interface ItemInfoProps {
  item: Item;
  found?: boolean;
  depleted?: boolean;
}

export default function ItemInfo(props: ItemInfoProps) {
  return (
    <div className={styles.itemContainer}>
      <div
        className={combineClasses(
          styles.itemTitle,
          TANKER.className,
          styles.itemText,
          (props.found || props.depleted) && styles.foundItem
        )}
      >
        {props.item.title}
      </div>
      <div className={combineClasses(styles.itemDescription, KARLA.className)}>
        {props.item.description}
      </div>
    </div>
  );
}
