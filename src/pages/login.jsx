import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "../components/RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Link} from "react-router-dom"
import Zoom from 'react-reveal/Zoom';

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";

class Registration extends Component {
state = {
username: "",
// email: "",
password: "",
// passwordConfrim: "",
hidePassword: true,
// error: null,
// errorOpen: false
};

errorClose = e => {
this.setState({
    errorOpen: false
});
};

handleChange = name => e => {
this.setState({
    [name]: e.target.value
});
};

// passwordMatch = () => this.state.password === this.state.passwordConfrim;

showPassword = () => {
this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
};

isValid = () => {
if (this.state.email === "") {
    return false;
}
return true;
};
submitRegistration = e => {
e.preventDefault();
// if (!this.passwordMatch()) {
//     this.setState({
//     errorOpen: true,
//     error: "Passwords don't match"
//     });
// }
const UserCredentials = {
    username: this.state.username,
    // email: this.state.email,
    password: this.state.password,
    // passwordConfrim: this.state.passwordConfrim
};
console.log("this.props.UserCredentials", UserCredentials);
//dispath to userActions
};


render() {
const { classes } = this.props;
return (
    <Zoom>
    <div className={classes.main} style={{backgroundColor:"#588FC8"}}>
    <CssBaseline />
        
    <Paper className={classes.paper}>
        <div className={classes.sgnuptext}>
            Drugstore
            <i class="fas fa-prescription-bottle-alt"></i>
        </div>
        <Avatar className={classes.avatar}>
        <PeopleAltIcon className={classes.icon} />
        </Avatar>
        <form
        className={classes.form}
        onSubmit={() => this.submitRegistration}
        >
        <FormControl required fullWidth margin="normal">
            <InputLabel className={classes.labels}>
            Username
            </InputLabel>
            <Input
            name="Username"
            type="Username"
            autoComplete="Username"
            className={classes.inputs}
            disableUnderline={true}
            onChange={this.handleChange("username")}
            />
        </FormControl>

        <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="password" className={classes.labels}>
            password
            </InputLabel>
            <Input
            name="password"
            autoComplete="password"
            className={classes.inputs}
            disableUnderline={true}
            onChange={this.handleChange("password")}
            type={this.state.hidePassword ? "password" : "input"}
            endAdornment={
                this.state.hidePassword ? (
                <InputAdornment position="end">
                    <VisibilityOffTwoToneIcon
                    fontSize="default"
                    className={classes.passwordEye}
                    onClick={this.showPassword}
                    />
                </InputAdornment>
                ) : (
                <InputAdornment position="end">
                    <VisibilityTwoToneIcon
                    fontSize="default"
                    className={classes.passwordEye}
                    onClick={this.showPassword}
                    />
                </InputAdornment>
                )
            }
            />
        </FormControl>

    <Button
        // disabled={!this.isValid()}
        // disableRipple
        fullWidth
        variant="outlined"
        className={classes.button}
        type="submit"
        onClick={this.submitRegistration}
        >
            Log-In
        </Button>
        <div style={{textAlign:"center", marginTop:10}}>
            Dont Have an Account? Sign-Up <Link to="/Register"> Here! </Link>
        </div>
        </form>

        {this.state.error ? (
        <Snackbar
            variant="error"
            key={this.state.error}
            anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
            }}
            open={this.state.errorOpen}
            onClose={this.errorClose}
            autoHideDuration={3000}
        >
            <SnackbarContent
            className={classes.error}
            message={
                <div>
                <span style={{ marginRight: "8px" }}>
                    <ErrorIcon fontSize="large" color="error" />
                </span>
                <span> {this.state.error} </span>
                </div>
            }
            action={[
                <IconButton
                key="close"
                aria-label="close"
                onClick={this.errorClose}
                >
                <CloseIcon color="error" />
                </IconButton>
            ]}
            />
        </Snackbar>
        ) : null}
    </Paper>
    </div>
    </Zoom>
);
}
}

export default withStyles(register)(Registration);
