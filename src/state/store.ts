import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {appReducer} from "../app/app-reducer";
import {actionsLoginType, loginReducer} from '../Login/login-reducer';
import {ActionRecoveryReducerTypes, recoveryReducer} from "../ PasswordRecovery/recovery-reducer";
import {profileReducer} from "../Profile/profile-reducer";
import {actionsRegistrationType, registrationReducer} from "../Registration/registration-reducer";
import { packsReducer } from "../Packs/packs-reducer";
import { cardsReducer } from "../Cards/cards-reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    recovery: recoveryReducer,
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    packs: packsReducer,
    cards: cardsReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

type AppActionsType = actionsRegistrationType | actionsLoginType | ActionRecoveryReducerTypes

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,//экстра арг
    AppActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;