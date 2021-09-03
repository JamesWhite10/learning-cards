import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {Profile} from "./components/Profile/Profile";
import {Error404} from "./components/Error404/Error404";
import {EnterNewPassword} from "./components/EnterNewPassword/Enter-new-password";
import {PasswordRecovery} from "./components/PasswordRecovery/Password-recovery";
import {Registration} from "./components/Registration/Registration";
import {Navbar} from "./components/Navbar/Navbar";
import {CheckEmail} from "./components/PasswordRecovery/ChekEmail";
import {PacksList} from "./components/PacksList/PacksList";
import { CardsList } from './components/CardsList/CardsList';
import {Learn} from "./components/Learn/Learn";

function App() {

    return (
             <div className="App">
                <Navbar />
                <main className={'mainContainer'}>
                    <Switch>
                        <Route path={'/learning-cards/'} render={() => <div>Hi!</div>}/>
                        <Route exact path={'/login'} render={() => <Login/>}/>
                        <Route exact path={'/profile'} render={() => <Profile/>}/>
                        <Route path={'/new-password/:token'} render={() => <EnterNewPassword/>}/>
                        <Route exact path={'/password-recovery'} render={() => <PasswordRecovery/>}/>
                        <Route path={'/password-recovery-check-email/:email'} render={() => <CheckEmail/>}/>
                        <Route exact path={'/registration'} render={() => <Registration/>}/>
                        <Route exact path={'/packs-list'} render={() => <PacksList/>}/>
                        <Route exact path={'/cards-list/:id'} render={() => <CardsList/>}/>
                        <Route exact path={'/learn/:id'} render={() => <Learn />}/>
                        <Route path={'*'} render={() => <Error404/>}/>
                    </Switch>
                </main>
            </div>



    );
}

export default App;
