import React, { useState, useEffect, FC } from 'react';
import { Grid, Button, Typography, IconButton } from '@material-ui/core';
import { NavigateBefore } from '@material-ui/icons';
import { NavigateNext } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const pages = {
    JOIN: "pages.join",
    CREATE: "page.create"
}

const Info = () => {
    const [page, setPage] = useState(pages.JOIN);

    function joinInfo() {
        return "join page"
    }

    function createInfo() {
        return "Create Page"
    }

    useEffect(() => {

    }, [])

    return (
        <Grid container spacing={1} alignItems="center" justifyContent="center" direction="column">
            <Grid item xs={12}>
                <Typography component="h4">
                    What is House Party?
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant='body1'>
                    {page === pages.JOIN ? joinInfo() : createInfo()}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <IconButton
                    onClick={() => { page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE) }}>
                    {page === pages.CREATE ? <NavigateBefore /> : <NavigateNext />}
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Button component={Link} to="/" variant="contained" color="secondary">
                    Back
                </Button>
            </Grid>
        </Grid>
    )
}

export default Info