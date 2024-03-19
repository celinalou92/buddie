import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import DemoVideo from "../components/DemoVideo";

const Password = (props) => {
  const [formState, setFormState] = useState({ password: "" });
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("click");
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
      {
        true? 
        <DemoVideo/> :
            <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
              <Typography align="center" variant="h5">
                Hello welcome to Buddie!
              </Typography>
              <br />
              <Typography align="center">
                A password is required to use this application.
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="applicationPassword"
                label="Application Password"
                type="applicationPassword"
                id="applicationPassword"
                autoComplete="current-application-password"
                value={formState.password}
                onChange={handleChange}
              />
              <Typography align="center" variant="caption">
                The backend server times out after inactivity and takes 90 seconds
                to warm up.
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
                color="primary"
              >
                Submit and Warm Up Server
              </Button>
              <Grid container>
                <Grid item>
                  <Typography align="center" variant="subtitle2">
                    Don't have a password?
                  </Typography>
                  <Typography align="center" variant="subtitle2">
                    You can find a password in the Buddie project description on my
                    portfolio:
                  </Typography>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.louissaint.me/#projects"
                    variant="h5"
                  >
                    louissaint.me
                  </Link>
                </Grid>
              </Grid>
            </form>
          }
      </div>
    </Container>
  );
};

export default Password;
