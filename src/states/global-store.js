// @flow

const SET_REDIRECT_FLAG = 'GLOBAL_SET_REDIRECT_FLAG'

type State = {
  isRedirect: boolean
}

type Action = {
  type: string,
  payload: ?any
}

const initState = {
  isRedirect: false
}

///////////////////////////////////////////
// actions
//
export const setRedirectFlag = ():Action => {
  return {
    type: SET_REDIRECT_FLAG,
    payload: null
  }
}

///////////////////////////////////////////
// reducer
//
export default ( state: State = initState, action: Action ) => {
  switch(action.type) {
  case SET_REDIRECT_FLAG:
    return Object.assign({}, state, {isRedirect: true})
  default:
    return state
  }
}