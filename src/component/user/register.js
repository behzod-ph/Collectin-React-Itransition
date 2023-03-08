import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {connect} from "react-redux";
import {register} from "../../store/reducer/user";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {FacebookOutlined, GithubOutlined, GoogleOutlined} from "@ant-design/icons";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../util/constants";

const theme = createTheme();

function Register({authorization,register}) {

    const navigate=useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const firstName = data.get('firstName')
        const lastName = data.get('lastName')
        const email = data.get('email')
        const password = data.get('password')
        const prePassword = data.get('prePassword')
        if (firstName && lastName && email && password && prePassword) {
            if (password !== prePassword) {
                toast.error('Passwords don\'t match', {autoClose: 1500})
                return;
            }
            register({
                name: lastName + ' ' + firstName,
                email,
                password
            })
        } else
            toast.error('You need to fill all inputs', {autoClose: 1500})
    };


    useEffect(() => {
        if (authorization)
            navigate('/')
    }, [authorization])


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="prePassword"
                                    label="Verify password"
                                    type="password"
                                    id="prePassword"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent='center' className='mt-2'>
                            <Grid item className='mx-1'>
                                <Link href={FACEBOOK_AUTH_URL} variant="body2">
                                    <FacebookOutlined style={{fontSize:'30px'}}/>
                                </Link>
                            </Grid>
                            <Grid item className='mx-1'>
                                <Link href={GOOGLE_AUTH_URL} variant="body2">
                                    <GoogleOutlined style={{fontSize:'30px'}} className='text-success'/>
                                </Link>
                            </Grid>
                            <Grid item className='mx-1'>
                                <Link href={GITHUB_AUTH_URL} variant="body2">
                                    <GithubOutlined style={{fontSize:'30px'}} className='text-black'/>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default connect(({user:{authorization}}) => ({authorization}), {register})(Register)