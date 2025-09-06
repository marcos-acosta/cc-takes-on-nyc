import {
  Constraint,
  ConstraintId,
  Item,
  ItemId,
  ScavengerHuntItem,
} from "./interfaces";
import { UNDERGROUND_ITEMS } from "./items-underground";

const DEFAULT_initialcount = 3;

export const ITEMS: { [key in ItemId]: Item } = UNDERGROUND_ITEMS;

export const CONSTRAINTS: { [key in ConstraintId]: Constraint } = {
  [ConstraintId.NO_JAVASCRIPT]: {
    constraintId: ConstraintId.NO_JAVASCRIPT,
    title: "nope.js",
    description:
      "Your creative sketch cannot be made using Javascript (including P5).",
  },
  [ConstraintId.NO_PYTHON]: {
    constraintId: ConstraintId.NO_PYTHON,
    title: "Snake poison",
    description:
      "Your creative sketch cannot be made using Python (including within TouchDesigner).",
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
  [ConstraintId.NO_P5]: {
    constraintId: ConstraintId.NO_P5,
    title: "Anti-CCNYC",
    description: "Your creative sketch cannot be made using P5.",
  },
  [ConstraintId.NO_TOUCHDESIGNER]: {
    constraintId: ConstraintId.NO_TOUCHDESIGNER,
    title: "Do not touch",
    description: "Your creative sketch cannot be made using TouchDesigner.",
  },
  [ConstraintId.NO_TEXT]: {
    constraintId: ConstraintId.NO_TEXT,
    title: "Picture book",
    description: "Your creative sketch cannot include any text.",
  },
  [ConstraintId.NO_MOTION]: {
    constraintId: ConstraintId.NO_MOTION,
    title: "Still life",
    description:
      "Your creative sketch cannot include any kind of motion or animation.",
  },
  [ConstraintId.SMALL_OUTPUT]: {
    constraintId: ConstraintId.SMALL_OUTPUT,
    title: "Low bandwidth",
    description: "Your creative sketch must be at most 64x64 pixels large.",
  },
  [ConstraintId.SHORT_VAR_NAMES]: {
    constraintId: ConstraintId.SHORT_VAR_NAMES,
    title: "tny vrb nms",
    description:
      "You may not use variable names longer than three characters in your code.",
    incompatibleWith: [ConstraintId.NYC_VAR_NAMES],
  },
  [ConstraintId.NYC_VAR_NAMES]: {
    constraintId: ConstraintId.NYC_VAR_NAMES,
    title: "NYC or nothin'",
    description: "All variables must be named after NYC neighborhoods.",
    incompatibleWith: [ConstraintId.SHORT_VAR_NAMES],
  },
  [ConstraintId.NO_CURVES]: {
    constraintId: ConstraintId.NO_CURVES,
    title: "Grid system",
    description: "Your creative sketch may not feature curves.",
  },
  [ConstraintId.SMALL_CODE]: {
    constraintId: ConstraintId.SMALL_CODE,
    title: "Code like it's 1968",
    description: "Your code cannot exceed 100 lines.",
  },
  [ConstraintId.STANDUP]: {
    constraintId: ConstraintId.STANDUP,
    title: "Enterprise edition",
    description:
      "During hacking, your team will be pulled into an unproductive meeting.",
  },
  [ConstraintId.VETO]: {
    constraintId: ConstraintId.VETO,
    title: "Veto",
    description: "Before hacking, you can remove one constraint.",
    isVeto: true,
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
  {
    itemId: ItemId.BODEGA_CAT,
    constraintId: ConstraintId.NO_P5,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.BOOK_ON_TRAIN,
    constraintId: ConstraintId.NO_TOUCHDESIGNER,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.LANGUAGES,
    constraintId: ConstraintId.NO_TEXT,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.STOOP,
    constraintId: ConstraintId.NO_MOTION,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.ANALOG_CLOCK,
    constraintId: ConstraintId.SMALL_OUTPUT,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.SPORT,
    constraintId: ConstraintId.SHORT_VAR_NAMES,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.POST_NO_BILLS,
    constraintId: ConstraintId.NYC_VAR_NAMES,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.METROCARD,
    constraintId: ConstraintId.NO_CURVES,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.PERFORMER,
    constraintId: ConstraintId.SMALL_CODE,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.PIZZA,
    constraintId: ConstraintId.STANDUP,
    count: DEFAULT_initialcount,
  },
  {
    itemId: ItemId.PIGEONS,
    constraintId: ConstraintId.VETO,
  },
];

export const MAX_NUM_CONSTRAINTS = 4;
