import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    TextField,
    Button,
    Grid,
    Typography
} from "@material-ui/core"

interface Props extends RouteComponentProps {

}

interface State {
    roomCode: string;
    error: string;
}



export default class RoomJoinPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            roomCode: "",
            error: ""
        }
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.roomButtonPressed = this.roomButtonPressed.bind(this);
    }

    render() {
        return (
            <Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Join a Room
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        error={!!this.state.error}
                        label="Code"
                        placeholder="Enter a Room Code"
                        value={this.state.roomCode}
                        helperText={this.state.error}
                        variant="outlined"
                        onChange={this.handleTextFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={this.roomButtonPressed}>
                        Enter Room
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button component={Link} to="/" variant="contained" color="secondary">
                        Back
                    </Button>
                </Grid>
            </Grid>
        )
    }

    handleTextFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            roomCode: e.target.value
        })
    }

    roomButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                code: this.state.roomCode
            })
        }
        fetch('/api/join-room', requestOptions)
            .then((response) => {
                if (response.ok) {
                    this.props.history.push(`/room/${this.state.roomCode}`)
                } else {
                    this.setState({
                        error: "Room not found."
                    })
                }
            }).catch((error) => {
                console.log(error);
            })
    }
}