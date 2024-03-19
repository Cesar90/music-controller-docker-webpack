import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core"
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
import Room from './Room'

interface Props {
}

interface State {
    roomCode: string
}


export default class HomePage extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            roomCode: ''
        }
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount() {
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data: { code: string }) => {
                this.setState({
                    roomCode: data.code
                })
            })
    }

    renderHomePage() {
        return (
            <Grid container spacing={3}>
                <Grid
                    xs={12}
                    item
                    container
                    alignItems="center"
                    justifyContent="center"
                    direction="column">
                    <Typography variant="h3">
                        House Party
                    </Typography>
                </Grid>
                <Grid
                    xs={12}
                    item
                    container
                    alignItems="center"
                    justifyContent="center"
                    direction="column">
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        color="primary"
                    >
                        <Button component={Link} to="/join" color="primary">
                            Join a Room
                        </Button>
                        <Button component={Link} to="/create" color="secondary">
                            Create a Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode() {
        this.setState({
            roomCode: '',
        });
    }

    render() {
        return (<Router>
            <Switch>
                <Route exact path='/' render={() => {
                    return this.state.roomCode ? (<Redirect to={`/room/${this.state.roomCode}`} />) : (this.renderHomePage())
                }} />

                <Route path='/join' component={RoomJoinPage} />
                <Route path='/create' component={CreateRoomPage} />
                {/* <Route path='/room/:roomCode' component={Room} /> */}
                <Route
                    path="/room/:roomCode"
                    render={(props) => {
                        return <Room {...props} leaveRoomCallback={this.clearRoomCode} />
                    }}
                />
            </Switch>
        </Router>)
    }
}