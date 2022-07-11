import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleOAuthProvider } from '@react-oauth/google';  
import { GoogleLogin } from '@react-oauth/google';  

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res) => {
        console.log(res);
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log("Google Sign In was unsuccessful. Try Again Later")
    };
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>  
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    {/* <GoogleLogin 
                        clientId="802921324162-uqug93tf3d18l3666814vd1c11gjsg3v.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton}  color="primary"  fullWidth  onClick={renderProps.onClick}  disabled={renderProps.disabled}  startIcon={<Icon/>}  variant="contained"
                             >
                                Google Sign In
                             </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    /> */}
                    <GoogleOAuthProvider clientId="802921324162-uqug93tf3d18l3666814vd1c11gjsg3v.apps.googleusercontent.com">
                    <GoogleLogin 
                        render={(renderProps) => (
                            <Button className={classes.googleButton}  color="primary"  fullWidth  onClick={renderProps.onClick}  disabled={renderProps.disabled}  startIcon={<Icon/>}  variant="contained"
                             >
                                Google Sign In
                             </Button>
                        )}      
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}   
                        cookiePolicy="single_host_origin"  
                    />
                </GoogleOAuthProvider>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth