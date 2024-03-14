import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';

interface Props {

}

interface State {

}


export default class HomePage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (<Router>
            <Switch>
                <Route exact path='/'>
                    <p>This is the home page</p>
                </Route>
                <Route path='/join' component={RoomJoinPage} />
                <Route path='/create' component={CreateRoomPage} />
            </Switch>
        </Router>)
    }
}