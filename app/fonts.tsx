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
