import { AppDispatch, AppThunk } from '../store'
import { ClientResponse, clientsApi } from './apiClients'

const SET_CLIENTS = 'SET_CLIENTS'

export type Client = { id: number } & ClientResponse

const initialState = {
  clients: [] as Client[],
}

export type InitialStateType = typeof initialState

export const appReducer = (
  state: InitialStateType = initialState,
  action: AppUnionActionDispatchType
): InitialStateType => {
  switch (action.type) {
    case 'SET_CLIENTS':
      return {
        ...state,
        clients: action.clients,
      }
    default:
      return state
  }
}

export const setClients = (clients: Client[]) => ({ clients, type: SET_CLIENTS }) as const

//thunks
export const getClients =
  (lang: string): AppThunk =>
  (dispatch: AppDispatch) => {
    clientsApi.getClients(lang).then(data => dispatch(setClients(data)))
  }

type SetClients = ReturnType<typeof setClients>

export type AppUnionActionDispatchType = SetClients
