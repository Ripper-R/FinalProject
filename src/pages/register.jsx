import React from 'react';
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { GolfCourse } from '@material-ui/icons';
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from '@material-ui/core/Button';

const RegisterSc=()=>{
    const [values, setValues] = React.useState({
        password:'',
        username:'',
        conpassword:''
    })
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    
    
    return(
        <div style={{display:'flex',justifyContent:'center',width:'100%',padding:20}}>
            <div style={{marginTop:100,flexDirection:'column',display:'flex',height:300,padding:30}}>
                <FormControl >
                    <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
                    <Input
                    id="input-with-icon-adornment"
                    value={values.username}
                    startAdornment={
                    <InputAdornment position="start">
                        <PersonIcon/>
                    </InputAdornment>
                     }
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
                    <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            startAdornment={
                                <InputAdornment position='start'>
                                    <LockIcon/>
                                </InputAdornment>
                            }
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                >
                                {values.showPassword ? <VisibilityIcon /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="input-with-icon-adornment">Confirm Password</InputLabel>
                    <Input
                            id="standard-adornment-password"
                            type={'password'}
                            value={values.conpassword}
                            onChange={handleChange('conpassword')}
                            
                        />
                </FormControl>
                <div>
                <Button variant='contained' style={{width:'50%', marginLeft:130,marginTop:20}}>
                    Register
                </Button>

                </div>
                
                
                <Button style={{marginTop:20}} variant='contained' color='primary'>
                    <FacebookIcon/>&nbsp; Sign in with Facebook
                </Button>

            </div>
            
            
        </div>
    )


}

export default RegisterSc