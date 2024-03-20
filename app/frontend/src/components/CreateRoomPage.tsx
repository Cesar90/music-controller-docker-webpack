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
import Collapse from "@material-ui/core/Collapse";
// import Aler from "@material-ui/lab"
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

interface Props extends RouteComponentProps {
    update: boolean
    votesToSkip: number
    guestCanPause: boolean
    roomCode: string
    updateCallback: () => void;
}

interface State {
    guestCanPause: boolean;
    votesToSkip: number;
    update: boolean;
    successMsg: string;
    errorMsg: string;
}


export default class CreateRoomPage extends React.Component<Props, State> {
    // defaultVotes = 2;
    //If you not pass any props this static object will get the values
    static defaultProps = {
        votesToSkip: 2,
        guestCanPause: true,
        update: false,
        roomCode: '',
        updateCallback: () => { }
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            guestCanPause: this.props.guestCanPause,
            votesToSkip: this.props.votesToSkip,
            update: this.props.update,
            successMsg: '',
            errorMsg: ''
        }

        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
    }

    handleVotesChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            votesToSkip: e.target.value as unknown as number
        });
    }

    handleGuestCanPauseChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            guestCanPause: e.target.value === 'true'
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

    handleUpdateButtonPressed() {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                votes_to_skip: this.state.votesToSkip,
                guest_can_pause: this.state.guestCanPause,
                code: this.props.roomCode
            })
        };

        fetch('/api/update-room', requestOptions)
            .then((response) => {
                if (response.ok) {
                    this.setState({
                        successMsg: 'Room updated successfully'
                    })
                } else {
                    this.setState({
                        errorMsg: 'Error update room...'
                    })
                }
                this.props.updateCallback();
            })
        // .then((data) => this.props.history.push("room/" + data.code));
    }

    renderCreateButton() {
        return (
            <>
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
            </>
        )
    }

    renderUpdateButton() {
        return <>
            <Grid item xs={12}>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={this.handleUpdateButtonPressed}>
                    Update Room
                </Button>
            </Grid>
        </>
    }

    render() {
        const title = this.props.update ? "Update Room" : "Create a Room";

        return (
            <Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
                <Grid item xs={12}>
                    <Collapse in={this.state.errorMsg != '' || this.state.successMsg != ''}>
                        {this.state.successMsg != "" ?
                            (<Alert severity="success"
                                onClose={() => { this.setState({ successMsg: "" }) }}
                            >{this.state.successMsg}</Alert>) :
                            (<Alert severity="error"
                                onClose={() => { this.setState({ errorMsg: "" }) }}
                            >{this.state.errorMsg}</Alert>)}
                    </Collapse>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="h4" variant="h4">
                        {title}
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
                                defaultValue={this.props.guestCanPause.toString()}
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
                            defaultValue={this.state.votesToSkip}
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
                {this.state.update ? this.renderUpdateButton() : this.renderCreateButton()}
            </Grid>)
    }
}