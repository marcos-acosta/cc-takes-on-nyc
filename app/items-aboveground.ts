import { Item, ItemId } from "./interfaces";

export const ABOVEGROUND_ITEMS: { [key in ItemId]: Item } = {
  [ItemId.LIVING_RAT]: {
    itemId: ItemId.LIVING_RAT,
    title: "A rat",
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
    title: "BIG CHEF DOG STAY COOKIN",
    description:
      "Find one of these iconic black-and-white (or blue-and-black) stickers.",
  },
  [ItemId.CITIBIKE]: {
    itemId: ItemId.CITIBIKE,
    title: "A raided Citibike dock",
    description: "Find a CitiBike docking station with no ebikes.",
  },
  [ItemId.BODEGA_CAT]: {
    itemId: ItemId.BODEGA_CAT,
    title: "A bodega cat",
    description: "Find a cat in a bodega.",
  },
  [ItemId.BOOK_ON_TRAIN]: {
    itemId: ItemId.BOOK_ON_TRAIN,
    title: "A train bookworm",
    description: "Find somebody reading a book on the train.",
  },
  [ItemId.LANGUAGES]: {
    itemId: ItemId.LANGUAGES,
    title: "An NYC Rosetta Stone",
    description: "Take a picture with three different languages visible.",
  },
  [ItemId.STOOP]: {
    itemId: ItemId.STOOP,
    title: "Stoopers",
    description: "Find at least three people hanging out on the same stoop.",
  },
  [ItemId.ANALOG_CLOCK]: {
    itemId: ItemId.ANALOG_CLOCK,
    title: "An analog clock",
    description: "Find an analog clock visible from the street.",
  },
  [ItemId.SPORT]: {
    itemId: ItemId.SPORT,
    title: "Athletes",
    description: "Find at least two people playing a sport in a public space.",
  },
  [ItemId.POST_NO_BILLS]: {
    itemId: ItemId.POST_NO_BILLS,
    title: "Post no bills",
    description:
      'Find a green construction wall with "POST NO BILLS" spraypaint.',
  },
  [ItemId.METROCARD]: {
    itemId: ItemId.METROCARD,
    title: "A MetroCard",
    description: "Find a MetroCard that was not purchased by any team member.",
  },
  [ItemId.PERFORMER]: {
    itemId: ItemId.PERFORMER,
    title: "A subway performer",
    description: "Find a subway performer (in a station or on a train).",
  },
  [ItemId.PIZZA]: {
    itemId: ItemId.PIZZA,
    title: "A New York slice",
    description: "Get a slice of pizza larger than the paper plate.",
  },
  [ItemId.PIGEONS]: {
    itemId: ItemId.PIGEONS,
    title: "Pigeons!",
    description: "Take a photo with at least four pigeons visible.",
  },
};
