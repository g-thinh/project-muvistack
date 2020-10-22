import React, { createContext, useEffect, useState } from "react";
import Avatar, { Option } from "avataaars";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export const AvatarContext = createContext(null);

const skins = [
  "Tanned",
  "Yellow",
  "Pale",
  "Light",
  "Brown",
  "DarkBrown",
  "Blank",
];

const style = {
  // top,
  skin: skins[Math.floor(Math.random() * skins.length)],
  // mouth,
  // eyebrows,
  // eyes,
  // clothes,
  // accessories,
  // faceColor,
  // hairColor,
};

const AvatarProvider = ({ children, user }) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState(style);

  // Main stuff
  // const [top, setTop] = useState();
  // const [skin, setSkin] = useState();
  // const [mouth, setMouth] = useState();
  // const [eyebrow, setEyebrow] = useState();
  // const [eyes, setEyes] = useState();
  // const [clothes, setClothes] = useState();

  // Optional stuff
  // const [accessories, setAccessories] = useState();
  // const [faceColor, setFaceColor] = useState();

  return (
    <AvatarContext.Provider value={{ options, setOptions }}>
      {children}
    </AvatarContext.Provider>
  );
};

export default AvatarProvider;
