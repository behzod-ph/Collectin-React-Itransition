import * as React from 'react';
import {useEffect, useState} from 'react';
import {alpha, styled} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import {createTheme} from "@mui/material";
import {connect} from "react-redux";
import {getResultOfSearch, searchText} from "../../store/reducer/collection";
import DOMPurify from 'dompurify';
import parse from "html-react-parser";
import Box from "@mui/material/Box";
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import CommentIcon from '@mui/icons-material/Comment';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import {getMe} from "../../store/reducer/user";
import {useNavigate} from "react-router";
import {COLLECTION, COMMENT} from "../../util/constants/type";
import {ITEM_DATA} from "../../util/constants";
import {ENG} from "../../util/constants/language";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));


const theme = createTheme()


function SearchAppBar({searchResult, user, searchText, lan, mode, searchData, getResultOfSearch, getMe}) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [type, setType] = useState('');
    const loading = open && options.length === 0;

    const style = {
        paddingLeft: 6,
        input: {color: mode ? 'white' : 'black'},
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }

    const navigate = useNavigate()

    function getSearch(value) {
        if (value)
            searchText(value)
    }

    useEffect(() => {
        getMe()
    }, [])

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            if (active && searchResult) {
                setOptions([...searchResult]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        console.log('searchData', searchData);
        if (searchData.id || searchData.types) {

            if (type === COLLECTION) {
                navigate('/itemsByCollection')
            } else {
                localStorage.setItem(ITEM_DATA, JSON.stringify({
                    user: user.id,
                    item: searchData.id
                }))
                navigate('/item')
            }
        }
    }, [searchData]);

    useEffect(() => {
        setOptions(searchResult ? searchResult : [])
    }, [searchResult])

    const htmlFrom = (htmlString) => {
        const cleanHtmlString = DOMPurify.sanitize(htmlString,
            {USE_PROFILES: {html: true}});
        const text = parse(cleanHtmlString)
        let res = ''
        if (Array.isArray(text)) {
            text.forEach(item => res += getText(item))
        } else {
            res = getText(text)
        }
        return res;
    }

    function getText(text) {
        if (text && text.props) {
            if (Array.isArray(text.props.children)) {
                text.props.children.pop()
                return text.props.children[0] + getText(text.props.children)
            } else {
                return getText(text.props.children)
            }
        } else {
            return text;
        }

    }

    function selectItem(event, newValue) {
        if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
            setType(newValue.type)
            console.log(newValue)
            const param = 'type=' + newValue.type + '&id=' + (newValue.type === COMMENT ? newValue.item_id : newValue.id) + (user.id ? ('&user_id=' + user.id) : '')
            console.log('param', param)
            getResultOfSearch(param)
        }
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <Autocomplete
                onChange={selectItem}
                sx={{minWidth: 150}}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                getOptionLabel={(option) => option.name + ': ' + htmlFrom(option.description).substring(0, 10) + '...'}
                options={options}
                loading={loading}
                renderOption={(props, option) => (
                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                        {
                            option.type === COLLECTION ? <CollectionsBookmarkIcon sx={{width: '20'}}/>
                                : option.type === COMMENT ? <CommentIcon sx={{width: '20'}}/> :
                                    <TurnedInNotIcon sx={{width: '20'}}/>
                        }
                        {option.name + ': ' + htmlFrom(option.description).substring(0, 10) + '...'}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        onChange={({target: {value}}) => getSearch(value)}
                        variant={'standard'}
                        placeholder={lan === ENG ? 'Search...' : 'Поиск...'}
                        {...params}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ?
                                        <CircularProgress style={{color: mode ? 'white' : 'black'}} size={20}/> : null}
                                </React.Fragment>
                            ),
                        }}
                        sx={style}
                    />
                )}
            />
        </Search>
    );
}

export default connect(({collection: {searchResult, searchData}, user: {user}}) => ({searchResult, searchData, user}),
    {searchText, getResultOfSearch, getMe}
)(SearchAppBar)

