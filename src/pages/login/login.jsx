import React, { Component, createRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { signin } from "./loginStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link, Redirect } from "react-router-dom"
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import Zoom from 'react-reveal/Zoom';
import {LoginFunc,LoginThunk,Clearfunc} from '../../redux/actions'
import { connect } from 'react-redux'
// import Snackbar from "@material-ui/core/Snackbar";
// import SnackbarContent from "@material-ui/core/SnackbarContent";
// import IconButton from "@material-ui/core/IconButton";
// import ErrorIcon from "@material-ui/icons/Error";
// import CloseIcon from "@material-ui/icons/Close";

class Login extends Component {
    state = {
        username:createRef(),
        password:createRef(),
        alert:''
    }

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

// // passwordMatch = () => this.state.password === this.state.passwordConfrim;

showPassword = () => {
this.setState(prevState => ({ hidePassword: !prevState.hidePassword }));
};

OnLoginClick = (e) => {
    const {username,password}=this.state
    var username1=username.current.value
    var password1=password.current.value
    this.props.LoginThunk(username1,password1)
    e.preventDefault()
};

render() {
const { classes } = this.props;
console.log(this.props.Auth)
if(this.props.Auth.isLogin){
    return <Redirect to='/'/>
}
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
        className={classes.form}>
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
            inputRef={this.state.username} 
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
            inputRef={this.state.password} 
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
        onClick={this.OnLoginClick}
        >
            Log-In
        </Button>
        <div style={{textAlign:"center", marginTop:10}}>
            Dont Have an Account? Sign-Up <Link to="/Register"> Here! </Link>
        </div>
        </form>
    </Paper>
    </div>
    </Zoom>
);
}
}

const Mapstatetoprops=(state)=>{
    return{
        Auth:state.Auth
    }
}

export default withStyles(signin) (connect(Mapstatetoprops,{LoginFunc,LoginThunk,Clearfunc})(Login));