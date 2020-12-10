import React, { Component, createRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./registrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import Zoom from "react-reveal/Zoom"
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import { LoginFunc, LoginThunk, Clearfunc } from '../../redux/actions'
import { toast } from 'react-toastify'
import Axios from 'axios';
import { API_URLbe } from '../../helper/idformat';


toast.configure()
class Registration extends Component {
  state = {
    username:createRef(),
    password:createRef(),
    confirmpass:createRef(),
    email:createRef(),
    alert:''
};


checkpass=(pass='')=>{
  var pssw=pass.replace(' ','')
  if(pssw.length>=6){
      var angka=false
      var huruf=false
      for(let i=0;i<pssw.length;i++){
          if(isNaN(pssw[i])){
              huruf=true
          }else{
              angka=true
          }
      }
      if(huruf && angka){
          return {
              status:true
          }
      }else{
          if(huruf){
              return {
                  status:false,
                  message:'password harus ada angkanya'
              }

          }else{
              return {
                  status:false,
                  message:'password harus ada hurufnya'
              }
          }
      }
  }else{
      return {
          status:false,
          message:'password harus 6 karakter atau lebih'
      }
  }
};

OnRegisterClick=(e)=>{
  const {username,password,confirmpass,email}=this.state
  var username1=username.current.value
  var password1=password.current.value
  var conpass=confirmpass.current.value
  var email1=email.current.value
  e.preventDefault()
  if(this.checkpass(password1).status){
      if(password1 === conpass){
          Axios.post(`${API_URLbe}/auth/register`,{
              username:username1,
              password:password1,
              email:email1
          })
          .then((res)=>{
              localStorage.setItem('id',res.data.id)
              this.props.LoginFunc(res.data,[])
          }).catch((err)=>{
              toast.error(err.response.data.message, {
                  position: "top-left",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  draggable: true,
                  progress: undefined,
              });
          })
        }else{
          toast.error('confirmasi dan password harus sama', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
          });
      }
  }else{
      toast.error(this.checkpass(password1).message, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
      });
  }
}

  render() {
    const { classes } = this.props;
    console.log(this.props.Auth)
        if(this.props.Auth.isLogin){
            return <Redirect to='/'/>
        };
    return (
      <Zoom>

      <div className={classes.main} style={{backgroundColor:"#588FC8"}}>
        <CssBaseline />

        <Paper className={classes.paper}>
            <div className={classes.sgnuptext}>
                Drugstore
                <i class="fas fa-prescription-bottle-alt"></i>
            </div>
            <div style={{color:"#eaf2f4", fontSize:"20px", textAlign:"center", marginTop:"20px", fontFamily:"inherit", marginBottom:"-20px"}}>
                Sign Up to See Our Latest Products and Articles!
            </div>
          <form className={classes.form}>
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
              <InputLabel htmlFor="email" className={classes.labels}>
                e-mail
              </InputLabel>
              <Input
                name="email"
                type="email"
                autoComplete="email"
                className={classes.inputs}
                disableUnderline={true}
                inputRef={this.state.email}
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

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="passwordConfrim" className={classes.labels}>
                confrim password
              </InputLabel>
              <Input
                name="passwordConfrim"
                autoComplete="passwordConfrim"
                className={classes.inputs}
                disableUnderline={true}
                onClick={this.state.showPassword}
                inputRef={this.state.confirmpass}
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
              disableRipple
              fullWidth
              variant="outlined"
              className={classes.button}
              type="submit"
              onClick={this.OnRegisterClick}
            >
              Sign-Up
            </Button>
            <div style={{textAlign:"center", marginTop:10}}>
              Already Sign-Up? Login <Link to="/login"> Here </Link>
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

export default withStyles(register)(connect(Mapstatetoprops,{LoginFunc,LoginThunk,Clearfunc})(Registration));
