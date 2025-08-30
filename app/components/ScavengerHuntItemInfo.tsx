import { useState } from "react";
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
  teamsData: Team[];
  foundConstraints: PlacedConstraint[];
  castingConstraintId: string | null;
  thisTeamId: string;
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

  const alreadyFound = Boolean(
    props.foundConstraints.find(
      (constraint) => constraint.constraintId === constraintData?.constraintId
    )
  );

  const isCasting =
    haveAllData && props.castingConstraintId === constraintData.constraintId;

  return (
    haveAllData && (
      <div className={styles.itemContainer}>
        <div className={styles.numLeft}>
          {props.item.count - numberOfTeamsWithThisConstraint} left
        </div>
        <button
          onClick={() => props.find(constraintData.constraintId)}
          disabled={alreadyFound || isCasting}
        >
          {alreadyFound
            ? "Already found"
            : isCasting
            ? "Casting..."
            : "Found it!"}
        </button>
        <ItemInfo item={itemData} />
        <ConstraintInfo constraint={constraintData} />
      </div>
    )
  );
}
