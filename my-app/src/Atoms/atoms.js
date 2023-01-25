import { atom } from 'recoil'

// whether the grid is currently transitioning
export const isTransitioningState = atom({
  key: 'isTransitioningState',
  default: false,
})

// which tile, if any, is currently open
export const openTileState = atom({
  key: 'openTileState',
  default: '',
})

// which tile, if any, needs to be closed
export const tileToCloseState = atom({
  key: 'tileToCloseState',
  default: '',
})

// whether the app is in light/dark mode
export const isLightModeState = atom({
  key: 'isLightModeState',
  default: true,
})