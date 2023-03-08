import * as React from 'react';
import {useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useNavigate} from "react-router";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import {DARK} from "../../util/constants/color";
import parse from "html-react-parser";
import DeleteModal from "../../component/modal/DeleteModal";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import DeleteIcon from '@mui/icons-material/Delete';
import post from '../../util/img/post/post.png'
import {LANGUAGE} from "../../util/constants";

function FeaturedPost({collection, getItemsByCollectionId, deleteCollection, download, collections}) {

    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    function toggle() {
        setOpen(!open)
    }

    function getCollection(id) {
        getItemsByCollectionId(id)
        navigate('/itemsByCollection')
    }


    function delCollection(collection_id) {
        deleteCollection(collection_id)
        collections = collections.filter(col => col.id !== collection_id)
    }

    function downloadCSV(id) {
        const lang = localStorage.getItem(LANGUAGE)
        download(id, lang ? lang : 'eng')
    }

    return (
        <Grid item xs={12} md={6}>
            <Card sx={{maxWidth: 800, minHeight: 450, maxHeight: 450, margin: 1}}>
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe"
                                    src={collection.collection_author.image_url ? collection.collection_author.image_url : "/static/images/avatar/1.jpg"}/>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon/>
                            </IconButton>
                        }
                        title={collection.collection_author.name}
                        subheader={new Intl.DateTimeFormat('en-US',
                            {year: 'numeric', month: '2-digit', day: '2-digit'})
                            .format(collection.creation_date)}
                    />
                    <CardMedia
                        component="img"
                        height="200"
                        image={collection.image_url ? collection.image_url : post}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {collection.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {
                                parse(collection.description)
                            }
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <div onClick={() => getCollection(collection.id)}>
                            <IconButton aria-label="share">
                                <ArrowCircleRightIcon/>
                            </IconButton>
                        </div>
                        <div onClick={() => downloadCSV(collection.id)}>
                            <IconButton aria-label="share">
                                <DownloadForOfflineIcon sx={{color: DARK}}/>
                            </IconButton>
                        </div>
                        <div onClick={toggle}>
                            <IconButton aria-label="share">
                                <DeleteIcon/>
                                <DeleteModal id={collection.id} open={open} toggle={toggle} givenFunction={delCollection}
                                             suffix={'your collection'}/>
                            </IconButton>
                        </div>
                    </CardActions>
                </CardActionArea>
            </Card>
            {/*<DeleteModal id={collection.id} open={open} toggle={toggle} givenFunction={delCollection}*/}
            {/*             suffix={'your collection'}/>*/}
        </Grid>
    );
}

FeaturedPost.propTypes = {
    collection: PropTypes.shape({
        description: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default FeaturedPost;


