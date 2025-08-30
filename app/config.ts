import {
  Constraint,
  ConstraintId,
  Item,
  ItemId,
  ScavengerHuntItem,
} from "./interfaces";

const DEFAULT_initialcount = 3;

export const ITEMS: { [key in ItemId]: Item } = {
  [ItemId.LIVING_RAT]: {
    itemId: ItemId.LIVING_RAT,
    title: "A living rat",
    description: "Find a living, breathing rat.",
  },
  [ItemId.SCAVENGED_BIKE]: {
    itemId: ItemId.SCAVENGED_BIKE,
    title: "A scavenged bike",
    description:
      "Find a bike that is missing at least one crucial part (e.g. wheel, seat).",
  },
  [ItemId.BIG_CHEF]: {
    itemId: ItemId.BIG_CHEF,
    title: 'A "BIG CHEF DOG STAY COOKIN" sticker',
    description:
      "Find one of these iconic black-and-white (or blue-and-black) stickers.",
  },
  [ItemId.CITIBIKE]: {
    itemId: ItemId.CITIBIKE,
    title: "An ebike-less CitiBike dock",
    description: "Find a CitiBike docking station with no ebikes.",
  },
};

export const CONSTRAINTS: { [key in ConstraintId]: Constraint } = {
  [ConstraintId.NO_JAVASCRIPT]: {
    constraintId: ConstraintId.NO_JAVASCRIPT,
    title: "nope.js",
    description:
      "Your creative sketch cannot involve Javascript (including P5).",
  },
  [ConstraintId.NO_PYTHON]: {
    constraintId: ConstraintId.NO_PYTHON,
    title: "Snake poison",
    description: "Your creative sketch cannot involve Python.",
  },
  [ConstraintId.NO_COLOR]: {
    constraintId: ConstraintId.NO_COLOR,
    title: "Dog mode",
    description: "Your creative sketch cannot involve any color.",
    incompatibleWith: [ConstraintId.UGLY_GRADIENT],
  },
  [ConstraintId.UGLY_GRADIENT]: {
    constraintId: ConstraintId.UGLY_GRADIENT,
    title: "Brave aesthetic choices",
    description:
      "Your creative sketch must involve the unpleasant gradient (google it).",
    incompatibleWith: [ConstraintId.UGLY_GRADIENT],
  },
};

export const SCAVENGER_HUNT_ITEMS: ScavengerHuntItem[] = [
  {
    itemId: ItemId.LIVING_RAT,
    constraintId: ConstraintId.NO_JAVASCRIPT,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.SCAVENGED_BIKE,
    constraintId: ConstraintId.NO_PYTHON,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.BIG_CHEF,
    constraintId: ConstraintId.NO_COLOR,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.CITIBIKE,
    constraintId: ConstraintId.UGLY_GRADIENT,
    count: DEFAULT_initialcount,
  },
];
