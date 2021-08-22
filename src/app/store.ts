import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./app-reducer";
import {recoveryReducer} from "../ PasswordRecovery/recovery-reducer";
import {loginReducer} from "../Login/login-reducer";
import {profileReducer} from "../Profile/profile-reducer";
import {registrationReducer} from "../Registration/registration-reducer";
import {passwordReducer} from "../NewPassword/password-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    recovery: recoveryReducer,
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    newPassword: passwordReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;