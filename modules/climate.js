function getClimate(elevation, moisture, normal) {

  const _elevation = limit(map(elevation, 0, 1, -1, 0.9), -1, .99);
  const _moisture = limit(moisture, 0, .99);

  const climateMap = [
    /* Inspired by Whittaker diagram */
    ["SUBTROPICAL_DESERT", "GRASSLAND", "TUNDRA", "TROPICAL_SEASONAL_FOREST", "TROPICAL_SEASONAL_FOREST", "TROPICAL_RAIN_FOREST"],
    ["TEMPERATE_DESERT", "GRASSLAND", "GRASSLAND", "TEMPERATE_DECIDUOUS_FOREST", "TEMPERATE_DECIDUOUS_FOREST", "TEMPERATE_RAIN_FOREST"],
    ["TEMPERATE_DESERT", "TEMPERATE_DESERT", "SHRUBLAND", "SHRUBLAND", "TAIGA", "TAIGA"],
    ["SCORCHED", "BARE", "TUNDRA", "SNOW", "SNOW", "SNOW"]
  ];

  const colorMap = {
    TEMPERATE_RAIN_FOREST: "#a4c4a8",
    TEMPERATE_DECIDUOUS_FOREST: "#b4c9a9",
    TROPICAL_SEASONAL_FOREST: "#a9cca4",
    TROPICAL_RAIN_FOREST: "#9cbba9",
    SNOW: "#f8f8f8",
    SHRUBLAND: "#c4ccbb",
    GRASSLAND: "#c4d4aa",
    BARE: "#bbbbbb",
    SCORCHED: "#999999",
    TAIGA: "#ccd4bb",
    TUNDRA: "#ddddbb",
    TEMPERATE_DESERT: "#e4e8ca",
    SUBTROPICAL_DESERT: "#e9ddc7",

    OCEAN: "#363661",
    LAKE: "#557da6"
  }

  let finalColor
  if (_elevation < 0) {
    finalColor = color(colorMap['LAKE'])
  } else {
    const col = color(colorMap[climateMap[floor(_elevation*4)][floor(_moisture*6)]])
    finalColor = color(`hsl(${Math.round(col._getHue())}, ${Math.round(col._getSaturation())}%, ${Math.round(col._getLightness() + normal)}%)`)
  }
  
  return {
    color: finalColor,
    // name: climateMap[floor(_elevation*4)][floor(_moisture*6)].toLowerCase()
  };
}