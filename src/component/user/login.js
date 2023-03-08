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
import {toast} from "react-toastify";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {connect} from "react-redux";
import {login} from "../../store/reducer/user";
import {FacebookOutlined, GithubOutlined, GoogleOutlined} from "@ant-design/icons";
import {FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL} from "../../util/constants";


const theme = createTheme();

function Login({authorization, login}) {

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email')
        const password = data.get('password')
        if (email && password)
            login({
                email,
                password
            })
        else
            toast.error('You need to fill all inputs', {
                autoClose: 1500
            })
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent='center'>
                            <Grid item>
                                <Link href="register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent='center' className='mt-2'>
                            <Grid item className='mx-1'>
                                <Link href={FACEBOOK_AUTH_URL} variant="body2">
                                    <FacebookOutlined style={{fontSize: '30px'}}/>
                                </Link>
                            </Grid>
                            <Grid item className='mx-1'>
                                <Link href={GOOGLE_AUTH_URL} variant="body2">
                                    <GoogleOutlined style={{fontSize: '30px'}} className='text-success'/>
                                </Link>
                            </Grid>
                            <Grid item className='mx-1'>
                                <Link href={GITHUB_AUTH_URL} variant="body2">
                                    <GithubOutlined style={{fontSize: '30px'}} className='text-black'/>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default connect(({user: {authorization}}) => ({authorization}), {login})(Login)