import React from 'react';
import { RouteComponentProps, Link } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core"
import CreateRoomPage from './CreateRoomPage';
import MusicPlayer from './MusicPlayer';
import { KeysToSnakeCase, ISong } from 'src/utils';

interface RouteParams {
    roomCode?: string;
}

interface Props extends RouteComponentProps<RouteParams> {
    leaveRoomCallback: () => void;
}

interface State {
    guestCanPause: boolean;
    votesToSkip: number;
    isHost: boolean;
    showSettings: boolean;
    spotifyAuthenticated: boolean;
    song: ISong
}


export default class Room extends React.Component<Props, State>{
    roomCode: string = '';
    interval: ReturnType<typeof setInterval>

    constructor(props: Props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            spotifyAuthenticated: false,
            song: {
                image_url: '',
                title: '',
                is_playing: false,
                time: 0,
                duration: 0,
                votes: 0,
                votes_required: 0
            }
        }
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.roomCode = this.props.match.params.roomCode;
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.renderSettions = this.renderSettions.bind(this);
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.authenticateSpotify = this.authenticateSpotify.bind(this);
        this.getCurrentSong = this.getCurrentSong.bind(this);
        this.getRoomDetails();
        this.getCurrentSong();
    }

    // componentDidMount(): void {
    //     this.interval = setInterval(this.getCurrentSong, 1000)
    // }

    // componentWillUnmount(): void {
    //     clearInterval(this.interval)
    // }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((response) => {
                if (!response.ok) {
                    this.props.leaveRoomCallback();
                    this.props.history.push("/")
                }
                return response.json()
            })
            .then((data: KeysToSnakeCase<State>) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host
                })
                if (this.state.isHost) {
                    this.authenticateSpotify();
                }
            });
    }

    authenticateSpotify() {
        fetch('/spotify/is-authenticated')
            .then((response) => response.json())
            .then((data: { status: boolean }) => {
                this.setState({
                    spotifyAuthenticated: data.status
                });
                if (!data.status) {
                    fetch('/spotify/get-auth-url')
                        .then((response) => response.json())
                        .then((data: { url: string }) => {
                            // console.log("data", data);
                            // debugger;
                            window.location.replace(data.url)
                        })
                }
            })
    }

    getCurrentSong() {
        fetch('/spotify/current-song').then((response) => {
            if (!response.ok) {
                return {};
            } else {
                return response.json();
            }
        }).then((data: ISong) => {
            this.setState({ song: data })
            console.log(data);
        })
    }

    leaveButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }
        fetch('/api/leave-room', requestOptions).then((_response) => {
            this.props.leaveRoomCallback();
            this.props.history.push("/")
        })
    }

    updateShowSettings(value: boolean) {
        this.setState({
            showSettings: value
        })
    }

    renderSettions() {
        return (
            <Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
                <Grid item xs={12}>
                    <CreateRoomPage
                        {...this.props}
                        update={true}
                        votesToSkip={this.state.votesToSkip}
                        guestCanPause={this.state.guestCanPause}
                        roomCode={this.roomCode}
                        updateCallback={this.getRoomDetails}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => this.updateShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }

    renderSettingsButton() {
        return (
            <Grid item xs={12}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => this.updateShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    render() {
        if (this.state.showSettings) {
            return this.renderSettions();
        }

        return (
            <Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
                <Grid item xs={12}>
                    <Typography variant='h4' component="h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <MusicPlayer {...this.state.song} />
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={this.leaveButtonPressed}>
                        Leave Room
                    </Button>
                </Grid>
            </Grid>
        )
        // return <div>
        //     <h3>{this.roomCode}</h3>
        //     <p>Votes: {this.state.votesToSkip}</p>
        //     <p>Guest can Pause: {this.state.guestCanPause.toString()}</p>
        //     <p>Host: {this.state.isHost.toString()}</p>
        // </div>
    }
}