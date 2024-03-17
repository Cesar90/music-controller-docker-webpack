import React from 'react';
import { RouteComponentProps } from "react-router-dom";

interface RouteParams {
    roomCode: string
}

interface Props extends RouteComponentProps<RouteParams> {

}

interface State {
    guestCanPause: boolean;
    votesToSkip: number;
    isHost: boolean;
}

type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
    ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
    : Lowercase<S>

type KeysToCamelCase<T> = {
    [K in keyof T as CamelCase<string & K>]: T[K]
}


type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}` ?
    `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}` :
    S

type KeysToSnakeCase<T> = {
    [K in keyof T as CamelToSnakeCase<string & K>]: T[K]
}


export default class Room extends React.Component<Props, State>{
    roomCode: string = '';

    constructor(props: Props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false
        }
        this.getRoomDetails = this.getRoomDetails.bind(this);
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
    }

    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.roomCode)
            .then((response) => response.json())
            .then((data: KeysToSnakeCase<State>) => {
                this.setState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host
                })
            });
    }

    render() {
        return <div>
            <h3>{this.roomCode}</h3>
            <p>Votes: {this.state.votesToSkip}</p>
            <p>Guest can Pause: {this.state.guestCanPause.toString()}</p>
            <p>Host: {this.state.isHost.toString()}</p>
        </div>
    }
}