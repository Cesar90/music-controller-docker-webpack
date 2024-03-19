import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";

interface Props extends RouteComponentProps {
    update: boolean
    votesToSkip: number
    guestCanPause: boolean
    roomCode: string
}

interface State {
    guestCanPause: boolean,
    votesToSkip: number
}


export default class CreateRoomPage extends React.Component<Props, State> {
    defaultVotes = 2;

    constructor(props: Props) {
        super(props);
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes
        }

        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    }

    handleVotesChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            votesToSkip: e.target.value as unknown as number
        });
    }

    handleGuestCanPauseChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            guestCanPause: e.target.value === 'true' ? true : false
        })
    }

    handleRoomButtonPressed() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause
            })
        };

        fetch('/api/create-room', requestOptions)
            .then((response) => response.json())
            .then((data) => this.props.history.push("room/" + data.code));
    }

    render() {
        return (
            <Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
                <Grid item xs={12}>
                    <Typography component="h4" variant="h4">
                        Create A Room
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormHelperText component="span">
                            {/* <div> */}
                            Guest Control of Playback State
                            {/* </div> */}
                            <RadioGroup
                                row
                                defaultValue="true"
                                onChange={this.handleGuestCanPauseChange}>
                                <FormControlLabel
                                    value="true"
                                    control={<Radio color="primary" />}
                                    label="Play/Pause"
                                    labelPlacement="bottom"
                                />
                                <FormControlLabel
                                    value="false"
                                    control={<Radio color="secondary" />}
                                    label="No Control"
                                    labelPlacement="bottom"
                                />
                            </RadioGroup>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            defaultValue={this.defaultVotes}
                            onChange={this.handleVotesChange}
                            inputProps={{
                                min: 1
                            }}
                        />
                        <FormHelperText>
                            {/* <div> */}
                            Votes Required to Skitp Song
                            {/* </div> */}
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleRoomButtonPressed}>
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} to="/" component={Link}>
                    <Button color="secondary" variant="contained">
                        Back
                    </Button>
                </Grid>
            </Grid>)
    }
}