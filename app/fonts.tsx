import localFont from "next/font/local";

export const TANKER = localFont({
  src: [
    {
      path: "./fonts/Tanker-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const KARLA = localFont({
  src: [
    {
      path: "./fonts/Karla-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/Karla-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
});

export const AZARET = localFont({
  src: [
    {
      path: "./fonts/AzeretMono-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/AzeretMono-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
});
