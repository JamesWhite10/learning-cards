import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import Error404 from '../Error404';
import {Profile} from "../../Profile/Profile";
import {Login} from "../../Login/Login";
import {Registration} from "../../Registration/Registration";
import {PasswordRecovery} from "../../ PasswordRecovery/PasswordRecovery";



export const PATH = {
    PROFILE: '/profile',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    TEST: '/test',
    RECOVERY: '/password-recovery'
}

function Routes() {
    return (
        <div>
            {/*Switch выбирает первый подходящий роут*/}
            <Switch>

                <Route path={'/'} exact render={() => <Redirect to={PATH.LOGIN}/>}/>

                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Registration/>}/>
                <Route path={PATH.RECOVERY} render={() => <PasswordRecovery/>}/>

                {/*у этого роута нет пути, он отрисуется если пользователь захочет попасть на несуществующую страницу*/}
                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    )
}

export default Routes