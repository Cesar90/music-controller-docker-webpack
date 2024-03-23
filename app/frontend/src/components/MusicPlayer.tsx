import React from 'react';
import { Grid, Typography, Card, IconButton, LinearProgress, Icon } from '@material-ui/core';
import { PlayArrow, SkipNext, Pause } from '@material-ui/icons';
import { ISong } from 'src/utils';

interface Props extends ISong {
}

interface State {

}

export default class MusicPlayer extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
    }

    pauseSong() {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" }
        };
        fetch('/spotify/pause', requestOptions);
    }

    playSong() {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" }
        };
        fetch('/spotify/play', requestOptions);
    }

    render() {
        const songProgress = (this.props.time / this.props.duration) * 100;

        return (
            <Card>
                <Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
                    <Grid item xs={4}>
                        <img src={this.props.image_url} height="100%" width="100%" />
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant='h4'>
                            {this.props.title}
                        </Typography>
                        <Typography color="textSecondary" variant='subtitle1'>
                            {this.props.title}
                        </Typography>
                        <div>
                            <IconButton onClick={() => this.props.is_playing ? this.pauseSong() : this.playSong()}>
                                {this.props.is_playing ? <Pause /> : <PlayArrow />}
                            </IconButton>
                            <IconButton>
                                <SkipNext />
                            </IconButton>
                        </div>
                        <LinearProgress variant='determinate' value={songProgress} />
                    </Grid>
                </Grid>
            </Card>
        )
    }
}