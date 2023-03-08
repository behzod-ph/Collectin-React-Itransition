import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useNavigate} from "react-router";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {WHITE} from "../../util/constants/color";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import parse from "html-react-parser";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import post from '../../util/img/post/post.png'
import {LANGUAGE} from "../../util/constants";
function MainFeaturedPost({collection, getItemsByCollectionId, download}) {



    const navigate = useNavigate()

    function getCollection(id) {
        getItemsByCollectionId(id)
        navigate('/itemsByCollection')
    }

    function downloadCSV(id) {
        const lang = localStorage.getItem(LANGUAGE)
        download(id, lang ? lang : 'eng')
    }

    return (
        <Paper
            sx={{
                borderRadius: '0',
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundImage: `url(${collection.image_url?collection.image_url:post})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe"
                                    src={collection.collection_author.image_url ? collection.collection_author.image_url : "/static/images/avatar/1.jpg"}/>
                        }
                        title={collection.collection_author.name}
                        subheader={new Intl.DateTimeFormat('en-US',
                            {year: 'numeric', month: '2-digit', day: '2-digit'})
                            .format(collection.creation_date)}
                    />
                    <Box
                        sx={{
                            position: 'relative',
                            p: {xs: 3, md: 6},
                            pr: {md: 0},
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                            {collection.name}
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                            {
                                parse(collection.description)
                            }
                        </Typography>
                        <CardActions disableSpacing>
                            <div onClick={() => getCollection(collection.id)}>
                                <IconButton>
                                    <ArrowCircleRightIcon sx={{color: WHITE}} fontSize={'large'}/>
                                </IconButton>
                            </div>
                            <div onClick={() => downloadCSV(collection.id)}>
                                <IconButton aria-label="share">
                                    <DownloadForOfflineIcon sx={{color: WHITE}} fontSize={'large'}/>
                                </IconButton>
                            </div>
                        </CardActions>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}

MainFeaturedPost.propTypes = {
    collection: PropTypes.shape({
        description: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
};

export default MainFeaturedPost;