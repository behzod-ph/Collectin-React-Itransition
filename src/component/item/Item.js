import {connect} from "react-redux";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import {DARK, ORANGE} from "../../util/constants/color";
import {useEffect, useRef, useState} from "react";
import {getItem, putLike, saveComment} from "../../store/reducer/collection";
import {FormControl, FormControlLabel, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useNavigate} from "react-router";
import {toast} from "react-toastify";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import parse from "html-react-parser";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {AccountCircle} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import {ACCESS_TOKEN, ITEM_DATA, LANGUAGE, SOCKET_URL} from "../../util/constants";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {getMe} from "../../store/reducer/user";
import {ENG} from "../../util/constants/language";
import * as StompJs from "@stomp/stompjs";

function ItemPage({item, user, putLike, getItem, getMe, authorization}) {

    const lan = localStorage.getItem(LANGUAGE)
    const client = useRef({});
    const [color, setColor] = useState(item.is_liked ? ORANGE : DARK)
    const [cnt, setCnt] = useState(0)
    const [condition, setCondition] = useState([])
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([]);

    useEffect(() => {
        connect();
        return () => disconnect();
    }, [item]);

    const connect = () => {
        client.current = new StompJs.Client({
            brokerURL: SOCKET_URL,
            onConnect: () => {
                subscribe();
            },
            debug: function (str) {
                console.log(str);
            }
        });
        client.current.activate();
    };

    const disconnect = () => {
        if (client.current.connected)
            client.current.deactivate();
    };

    const subscribe = () => {
        item.id && client.current.subscribe(`/topic/comment/${item.id}`, ({body}) => {
            if (body) {
                addComment(JSON.parse(body));
            }
        })
    };

    const option = {
        align: 'center',
        minWidth: '170px',
        height: '50px'
    }

    const addComment = (content) => {
        comments.unshift(content.data)
        console.log('addComment',comments)
        setComments([...comments])
    }

    function giveLike() {
        console.log(item);
        if (authorization) {
            let isLike = color === DARK
            putLike(user.id, item.id, isLike)
            setCnt(isLike ? condition[0] : condition[1])
            setColor(p => p === DARK ? ORANGE : DARK)
        } else {
            toast.error("You need to sign up to give like", {autoClose: 1500});
        }
    }

    useEffect(() => {
        console.log("item", item)
        if (item.id) {
            setColor(item.is_liked ? ORANGE : DARK)
            setCondition(item.is_liked ? [0, -1] : [1, 0])
            setComments([...item.comments])
        }
    }, [item])


    useEffect(() => {
        const itemData = JSON.parse(localStorage.getItem(ITEM_DATA))
        getMe()
        if (itemData && itemData.user)
            getItem(itemData.user, itemData.item)
        else getItem(0, itemData.item)
        if (!authorization) {
            localStorage.removeItem(ITEM_DATA)
            localStorage.removeItem(ACCESS_TOKEN)
        }
    }, [])

    function sendMessage() {
        if (!client.current.connected) {
            return;
        }
        if (authorization && client.current.connected) {
            client.current.publish({
                destination: "/app/comment",
                body: JSON.stringify({
                    text: comment,
                    item_id: item.id,
                    user_id: user.id
                }),
            });
        } else {
            toast.error("You need to sign up to send comment", {autoClose: 1500});
        }
        setComment('')
    }

    console.log('comments',comments)
    return (
        <Paper
            sx={{
                borderRadius: '0',
                position: 'relative',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,0)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <CardHeader
                        title={item.name}
                    />
                    <Box
                        sx={{
                            position: 'relative',
                            p: {xs: 3, md: 6},
                            pr: {md: 0},
                        }}
                    >

                        <Table stickyHeader aria-label="sticky table"
                               className='table'>
                            <TableHead>
                                <TableRow hover>
                                    {
                                        item.fields && item.fields.types.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={option.align}
                                                style={{minWidth: option.minWidth, height: option.height}}
                                            >
                                                {column.name.toUpperCase()}
                                            </TableCell>
                                        ))}
                                </TableRow>
                                <TableRow hover>
                                    {
                                        item.fields && item.fields
                                            .types
                                            .map(column => <TableCell key={column.id} align={option.align}
                                                                      style={{
                                                                          minWidth: option.minWidth,
                                                                          height: option.height
                                                                      }}>
                                                    {
                                                        column.name === 'tag' ? item.tags.map(tag => parse(lan=== ENG ? tag.name : tag.name + '<br>')) :
                                                            item.fields.values[item.id]
                                                                .map(cell =>
                                                                    column.id === cell.field_id ?
                                                                        cell.value : '')

                                                    }
                                                </TableCell>
                                            )}
                                </TableRow>
                                <CardActions disableSpacing>
                                    <div onClick={giveLike}>
                                        <FormControlLabel control={<IconButton>
                                            <ThumbUpAltIcon sx={{color: color}}/>
                                        </IconButton>} label={item.likes ? item.likes + cnt : cnt}/>
                                    </div>
                                </CardActions>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth sx={{m: 1}}>
                                                    <InputLabel htmlFor="outlined-adornment-amount">
                                                        {lan === ENG ? 'You may write your comments here' : 'Здесь вы можете написать свои комментарии'}
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-amount"
                                                        value={comment}
                                                        onChange={({target: {value}}) => setComment(value)}
                                                        startAdornment={
                                                            <AccountCircle
                                                                sx={{color: 'action.active', mr: 1, my: 0.5}}/>}
                                                        label="You may write your comments here"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label="toggle password visibility"
                                                                    edge="end">
                                                                    <SendIcon onClick={sendMessage}/>
                                                                </IconButton>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                {

                                    comments.map(item => <TableRow key={item.id}>
                                            <TableCell key={item.id}>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe"
                                                                src={item.user ? item.user.image_url : "/static/images/avatar/1.jpg"}/>
                                                    }
                                                    title={item.user ? item.user.name : '?'}
                                                    subheader={new Intl.DateTimeFormat('en-US',
                                                        {year: 'numeric', month: '2-digit', day: '2-digit'})
                                                        .format(item.creation_date)}
                                                />
                                            </TableCell>
                                            <TableCell colSpan={3}>
                                                <CardContent>
                                                    {item.text}
                                                </CardContent>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>

                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default connect(({collection: {item}, user: {user, authorization}}) => ({item, user, authorization}),
    {putLike, saveComment, getItem, getMe}
)(ItemPage)
