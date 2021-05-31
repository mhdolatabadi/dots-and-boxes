const uiColors = Object.freeze({
  red: '#e6494f',
  gray: '#ccc',
  green: '#68d200',
  yellow: '#ffd600',
  keyBlue: '#5adbdf',
  darkBlue: '#0a2057',
  darkGray: '#818181',
  lightGray: '#f0f0f0',
  secondaryBlue: '#4fc4f4',

  white: '#fff',
  black: '#000',
  transparent: 'transparent',
})

export const uiColorsTypes = Object.keys(uiColors)

const COLORS = Object.freeze([
  '#1d252d',
  '#ffc000',
  '#ff9300',
  '#fb983f',
  '#ee932a',
  '#fe7541',
  '#f75a5a',
  '#f95a6c',
  '#fe4f79',
  '#f24749',
  '#ea4492',
  '#a45bd1',
  '#c35fa8',
  '#ff9cda',
  '#f0c9ce',
  '#7f5dfc',
  '#004e9a',
  '#428cd4',
  '#3f98a5',
  '#549227',
  '#aae22e',
  '#469b72',
  '#66d885',
  '#74c58d',
  '#f3f4f5',
  '#bfc1cc',
])
const colorRecommender = (seed = 0) => COLORS[Math.abs(seed) % COLORS.length]

const palette =  {
  ui: uiColors,
  colorRecommender,
}
export default palette 
