import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import {LANGUAGE, PAGE_AUTHENTICATION, PAGE_COLLECTION} from "../../../util/constants";
import {useState} from "react";
import {ENG} from "../../../util/constants/language";
import {useNavigate} from "react-router";
import {SHADE_BLUE} from "../../../util/constants/color";
import PagesIcon from '@mui/icons-material/Pages';


const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const {user, setCrtPage, ...other} = props;
    const lan=localStorage.getItem(LANGUAGE)
    const navigate = useNavigate();

    const [categories, setCategories] = useState([
        {
            id: 'Admin',
            children: [
                {
                    id: PAGE_AUTHENTICATION,
                    icon: <PeopleIcon/>,
                    active: true,
                }
            ]
        },
        {
            id: '',
            children: [
                {
                    id: PAGE_COLLECTION,
                    icon: <DnsRoundedIcon/>,
                    active: false
                },
            ],
        }
    ])


    function changeCrtPage(id) {
        setCategories(previous => {
            previous.map(prev => prev.children.map(item => {
                item.active = item.id === id
                return item;
            }))
            return previous;
        })
        setCrtPage(id)
    }

    function navigateHomePage(){
        navigate("/", {state: {lan: localStorage.getItem(LANGUAGE)}});
    }



    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{...item, ...itemCategory, fontSize: 22, marginTop:'20px',marginBottom:'20px'}}>
                    {/*{lan === ENG ? 'DASHBOARD' : 'ПАНЕЛЬ'}*/}
                    {'🅲🅾🅻🅻🅴🅲🆃🅸🅽'}
                </ListItem>

                <ListItem  sx={{...item, ...itemCategory}} onClick={()=>{navigate("/")}}>
                    <ListItemIcon>
                        <PagesIcon/>
                    </ListItemIcon>
                    <ListItemText>{lan===ENG?'MAIN':'ГЛАВНЫЙ'}</ListItemText>
                </ListItem>

                {
                    categories.map(({id, children}) => (
                        (id === 'Admin' && (user.roles & 2) === 0) ? '' :
                            <Box key={id} sx={{bgcolor: SHADE_BLUE}}>
                                <ListItem sx={{py: 2, px: 3}}>
                                    <ListItemText sx={{color: '#fff'}}>{id}</ListItemText>
                                </ListItem>

                                {
                                    children.map(({id: childId, icon, active}) => <ListItem disablePadding key={childId}
                                                                                            onClick={() => changeCrtPage(childId)}>
                                            <ListItemButton selected={active} sx={item}>
                                                <ListItemIcon>{icon}</ListItemIcon>
                                                <ListItemText>{childId}</ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    )}
                                <Divider sx={{mt: 2}}/>
                            </Box>
                    ))}
            </List>
        </Drawer>
    );
}

