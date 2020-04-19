// @flow

export const STATUS = {
  INIT: 'INIT',
  READY: 'READY',
  GENERATING: 'GENERATING',
  GENERATED: 'GENERATED',
  ERROR: 'ERROR'
}

const TYPES = {
  CHANGE_GENERATOR_STATUS: 'CHANGE_GENERATOR_STATUS',
  SET_CHANNEL_ID: 'SET_CHANNEL_ID'
}

const initState = {
  status: STATUS.INIT,
  channelId: ''
}

type Action = {
  type: string,
  payload: any
}

///////////////////////////////////////////////////////
// Definitions of Action
///////////////////////////////////////////////////////
export const changeStatusInit = (): Action => {
  return {
    type: TYPES.CHANGE_GENERATOR_STATUS,
    payload: STATUS.INIT
  }
}

export const changeStatusReady = (): Action => {
  return {
    type: TYPES.CHANGE_GENERATOR_STATUS,
    payload: STATUS.READY
  }
}

export const changeStatusGenerating = (): Action => {
  return {
    type: TYPES.CHANGE_GENERATOR_STATUS,
    payload: STATUS.GENERATING
  }
}

export const changeStatusGenerated = (): Action => {
  return {
    type: TYPES.CHANGE_GENERATOR_STATUS,
    payload: STATUS.GENERATED
  }
}

export const changeStatusError = (): Action => {
  return {
    type: TYPES.CHANGE_GENERATOR_STATUS,
    payload: STATUS.ERROR
  }
}

export const setChannelId = (channelId:string):Action => {
  return {
    type: TYPES.SET_CHANNEL_ID,
    payload: channelId
  }
}


///////////////////////////////////////////////////////
// Reducer
///////////////////////////////////////////////////////
export default ( state: Object = initState, action: Object ): Object => {
  switch( action.type ) {
  case TYPES.CHANGE_GENERATOR_STATUS:
    return Object.assign({}, state, { status: action.payload })
  case TYPES.SET_CHANNEL_ID:
    return Object.assign({}, state, { channelId: action.payload} )
  default:
    return state
  }
}
