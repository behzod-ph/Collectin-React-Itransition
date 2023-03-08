import * as React from 'react';
import {connect} from "react-redux";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {getItem} from "../../store/reducer/collection";
import {getMe} from "../../store/reducer/user";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import {ITEM_DATA} from "../../util/constants";


const Item = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
}));

function ItemByTag({user, items, getItem, getMe}) {

    const navigate = useNavigate()

    function getCrtItem(itemId) {
        getItem(user.id, itemId)
        localStorage.setItem(ITEM_DATA, JSON.stringify({
            user: user.id,
            item: itemId
        }))
        navigate('/item')
    }

    useEffect(() => {
        getMe()
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                {
                    items && !items.types && Object.keys(items).map((key, index) =>
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Item>
                                <CardActionArea className={'border rounded rounded-1'}>
                                    <Card sx={{maxWidth: 345, maxHeight: 250, minHeight: 250}}>
                                        <CardContent>
                                            {
                                                items[key] && items[key].map(entity => (
                                                    <Typography variant='h6' key={entity.field_key}>
                                                        {entity.field_key && (entity.field_key.toUpperCase() + ':\t' + entity.field_value)}
                                                    </Typography>
                                                ))
                                            }
                                        </CardContent>
                                        <CardActions>
                                            <div onClick={() => getCrtItem(key)}
                                                 style={{
                                                     position: 'absolute',
                                                     right: 20,
                                                     bottom: 5,
                                                 }}>
                                                <IconButton aria-label="share">
                                                    <ArrowCircleRightIcon/>
                                                </IconButton>
                                            </div>
                                        </CardActions>
                                    </Card>
                                </CardActionArea>
                            </Item>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    );
}

export default connect(({collection: {items}, user: {user}}) => ({items, user}),
    {getItem, getMe}
)(ItemByTag)

