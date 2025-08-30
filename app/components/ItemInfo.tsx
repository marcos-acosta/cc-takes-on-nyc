import { Item } from "../interfaces";
import styles from "./../page.module.css";

interface ItemInfoProps {
  item: Item;
}

export default function ItemInfo(props: ItemInfoProps) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemTitle}>{props.item.title}</div>
      <div className={styles.itemDescription}>{props.item.description}</div>
    </div>
  );
}
