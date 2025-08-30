export const enum ItemId {
  LIVING_RAT = "LIVING_RAT",
  SCAVENGED_BIKE = "SCAVENGED_BIKE",
  // BODEGA_CAT = "BODEGA_CAT",
  // BOOK_ON_TRAIN = "BOOK_ON_TRAIN",
  BIG_CHEF = "BIG_CHEF",
  // LANGUAGES = "LANGUAGES",
  // STOOP = "STOOP",
  // ANALOG_CLOCK = "ANALOG_CLOCK",
  CITIBIKE = "CITIBIKE",
  // SPORT = "SPORT",
  // POST_NO_BILLS = "POST_NO_BILLS",
  // METROCARD = "METROCARD",
  // PERFORMER = "PERFORMER",
  // PIZZA = "PIZZA",
  // VINYL = "VINYL",
  // PIGEONS = "PIGEONS"
}

export const enum ConstraintId {
  NO_JAVASCRIPT = "NO_JAVASCRIPT",
  NO_PYTHON = "NO_PYTHON",
  // NO_P5 = "NO_P5",
  // NO_TOUCHDESIGNER = "NO_TOUCHDESIGNER",
  NO_COLOR = "NO_COLOR",
  // NO_TEXT = "NO_TEXT",
  // NO_MOTION = "NO_MOTION",
  // SMALL_OUTPUT = "SMALL_OUTPUT",
  UGLY_GRADIENT = "UGLY_GRADIENT",
  // SHORT_VAR_NAMES = "SHORT_VAR_NAMES",
  // NYC_VAR_NAMES = "NYC_VAR_NAMES",
  // NO_KEYBOARD_SHORTCUTS = "NO_KEYBOARD_SHORTCUTS",
  // SMALL_CODE = "SMALL_CODE",
  // STANDUP = "STANDUP",
  // REVERSE_CARD = "REVERSE_CARD",
  // VETO = "VETO"
}

export interface Item {
  itemId: ItemId;
  title: string;
  description: string;
}

export interface Constraint {
  constraintId: ConstraintId;
  title: string;
  description: string;
  incompatibleWith?: ConstraintId[];
}

export interface PlacedConstraint {
  constraintId: ConstraintId;
  placedByTeamId: string;
  placedOnTeamId: string;
  timestamp: Date;
}

export interface Team {
  teamId: string;
  teamName: string;
  memberNames: string[];
  constraints: PlacedConstraint[];
}

export interface ScavengerHuntItem {
  itemId: ItemId;
  constraintId: ConstraintId;
  count: number;
}
