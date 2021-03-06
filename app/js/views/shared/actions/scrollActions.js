import { RESET_SCROLL_SETTINGS, SET_BARS_CONTAINER_HIGHT, SET_SCROLLBAR_HEIGHT, SET_SCROLLBAR_POSITION_Y, TOOGLE_IS_GRABBED, CHANGE_SCROLL_BUTTON_POSITION, CHANGE_BARS_POSITION, SET_BARS_HEIGHT } from '../../../constants/actionTypes';

export const toogleIsGrabbed = bool => ({
  type: TOOGLE_IS_GRABBED,
  payload: bool
});

export const changeScrollButtonPosition = newPosition => ({
  type: CHANGE_SCROLL_BUTTON_POSITION,
  payload: newPosition
});

export const changeBarsPosition = newPosition => ({
  type: CHANGE_BARS_POSITION,
  payload: newPosition
});

export const setBarsHeight = height => ({
  type: SET_BARS_HEIGHT,
  payload: height
})

export const setScrollbarPositionY = position => ({
  type: SET_SCROLLBAR_POSITION_Y,
  payload: position
})

export const setScrollbarHeight = height => ({
  type: SET_SCROLLBAR_HEIGHT,
  payload: height
})

export const setBarsContainerHeight = height => ({
  type: SET_BARS_CONTAINER_HIGHT,
  payload: height
})

export const resetScrollSettings = () => ({
  type: RESET_SCROLL_SETTINGS
})
