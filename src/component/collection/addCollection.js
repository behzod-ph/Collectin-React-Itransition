import * as React from 'react';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {connect} from "react-redux";
import {getTopics, addCollection, saveImg, clearImg} from "../../store/reducer/collection";
import {getMe} from "../../store/reducer/user";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import Editor from "../editor/editor";
import {STRING, types} from "../../util/constants/type";
import {LANGUAGE} from "../../util/constants";
import {ENG} from "../../util/constants/language";
import {useNavigate} from "react-router";

const theme = createTheme();


function AddCollection({user, image_url, getTopics, addCollection, topics, saveImg, clearImg}) {

    const lan = localStorage.getItem(LANGUAGE)

    const navigate = useNavigate();

    const [topicId, setTopicId] = useState({});

    const [fields, setFields] = useState([
        {
            id: 1,
            name: 'name',
            type: STRING.id
        }, {
            id: 2,
            name: 'tag',
            type: STRING.id
        },
    ]);
    let [id, setId] = useState(3)
    const [data, setData] = useState({})
    const [description, setDescription] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const name = data.get('name')
        const file = data.get('file')
        const temp = {
            name, description,
            topic_id: topicId,
            user_id: user.id,
            custom_fields: fields
        }
        console.log('temp', temp);
        if (file.size !== 0) {
            setData(temp)
            saveImg(data)
        }
        {
            addCollection(temp)
            console.log('addCol', temp)
            navigate('/dashboard')
        }
    };

    function handleChange(event) {
        setTopicId(event.target.value)
    }

    function handleChangeFieldType(event, id) {
        let type = event.target.value
        if (id > 2)
            setFields(fields.map(field => field.id === id ? {...field, type} : field))
    }

    function saveFieldName(event, id) {
        let name = event.target.value
        if (id > 2)
            setFields(fields.map(field => field.id === id ? {...field, name: name} : field))
    }

    function addRowForField() {
        setFields(p => {
            p.push({
                id,
                name: '',
                type: ''
            })
            return p
        })
        setId(p => p + 1)
    }

    function delRow(id) {
        setFields(fields.filter(field => field.id !== id))
    }

    useEffect(() => {
        getTopics()
        console.log('topic', topics)
    }, [])

    useEffect(() => {
        if (image_url) {
            addCollection({...data, image_url})
            clearImg()
        }
    }, [image_url])


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
                <CssBaseline/>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label={lan === ENG ? "Name" : 'Имя'}
                                    autoFocus
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel
                                        id="demo-simple-select-label">{lan === ENG ? 'Topic' : 'Тема'}</InputLabel>
                                    <Select
                                        labelId="topicId"
                                        id="topicId"
                                        label={lan === ENG ? "Topic" : 'Тема'}
                                        defaultValue=""
                                        onChange={handleChange}
                                    >
                                        {
                                            //topic without 2 languages
                                            topics.map(item => (
                                                <MenuItem key={item.id}
                                                          value={item.id}>{lan === ENG ? item.name : item.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Editor sedDescription={setDescription} description={description}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="file"
                                    label=" "
                                    name="file"
                                    autoComplete="file"
                                    type='file'
                                    autoFocus
                                />
                            </Grid>

                            {
                                fields[0] && fields.map(field => {
                                    return (
                                        <Grid item container spacing={2} key={field.id}>
                                            <Grid item xs={6} sm={6}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    name="name"
                                                    required
                                                    fullWidth
                                                    id="name"
                                                    label={lan === ENG ? "Field Name" : 'Имя поля'}
                                                    autoFocus
                                                    value={field.name}
                                                    onChange={(event) => saveFieldName(event, field.id)}
                                                />
                                            </Grid>
                                            <Grid item xs={5} sm={5}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Field Type</InputLabel>
                                                    <Select
                                                        labelId="type"
                                                        id="type"
                                                        label={lan === ENG ? "Field Type" : 'Тип поля'}
                                                        value={field.type}
                                                        onChange={(event) => handleChangeFieldType(event, field.id)}
                                                    >
                                                        {
                                                            types.map(item => (
                                                                <MenuItem key={item.id}
                                                                          value={item.id}>{item.name}
                                                                </MenuItem>)
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            {
                                                field.id > 2 && <Grid item xs={1} sm={1}>
                                                    <Button
                                                        fullWidth
                                                        variant="contained"
                                                        color={'error'}
                                                        type='button'
                                                        onClick={() => delRow(field.id)}
                                                        style={{height: '100%'}}
                                                    >
                                                        &#10006;
                                                    </Button>
                                                </Grid>
                                            }
                                        </Grid>
                                    )
                                })
                            }


                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={addRowForField}
                                >
                                    &#10010; {lan === ENG ? 'Add field' : 'Добавить поле'}
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    {lan === ENG ? 'Save' : 'Сохранять'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default connect(({collection: {topics, image_url}, user: {user}}) => ({topics, user, image_url}),
    {getTopics, addCollection, getMe, saveImg, clearImg}
)(AddCollection)