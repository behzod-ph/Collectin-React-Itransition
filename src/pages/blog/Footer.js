import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer({description, title,mode}) {

    return (
        <Box component="footer" className={mode?'bg-dark text-white':'text-dark'}
             sx={{
                 display: "flex",
                 justifyContent: "space-between",
                 alignItems: "center",
                 p: 5,
             }}
        >
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.white"
                    component="p"
                >
                    {description}
                </Typography>
            </Container>
        </Box>
    );
}

Footer.propTypes = {
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default Footer;