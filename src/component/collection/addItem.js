import {useEffect, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {
    ButtonGroup,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    TextareaAutosize,
    ThemeProvider
} from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {connect} from "react-redux";
import {getAllCollectionsByUserId, getCollectionFields, getTags, saveItem} from "../../store/reducer/collection";
import Button from "@mui/material/Button";
import {BOOLEAN, TEXT, types} from "../../util/constants/type";
import {LANGUAGE} from "../../util/constants";
import {ENG} from "../../util/constants/language";


const theme = createTheme();

function AddItem({user, collections, tags, fields, getAllCollectionsByUserId, getTags, getCollectionFields, saveItem}) {

    const [collection_id, setCollection_id] = useState('');
    const [tag_ids, setTagIds] = useState([]);
    const [btnType, setBtnType] = useState(false);

    const lan = localStorage.getItem(LANGUAGE)

    const select = (method, list, name) => {
        return <FormControl fullWidth>
            <InputLabel id="collectionId">{name}</InputLabel>
            <Select
                labelId={name}
                id={name}
                label={name}
                onChange={method}
            >
                {
                    list.map(item => (
                        <MenuItem key={item.id}
                                  value={item.id}>{item.name}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    }
    const textField = (type, name) => {
        return <TextField
            autoComplete="given-name"
            name={name}
            required
            type={type}
            fullWidth
            id={name}
            label={name}
            autoFocus
        />
    }
    const textArea = (name) => {
        return <TextareaAutosize
            name={name}
            aria-label={name}
            placeholder={'Write about ' + name}
            style={{width: '100%', height: 57}}
        />
    }

    useEffect(() => {
        getAllCollectionsByUserId(user.id)
        getTags()
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const item_name = data.get('item_name')
        const field_values = fields
            .filter(field => data.get(field.name))
            .map(field => {
                return {
                    field_id: field.id,
                    value: field.type !== BOOLEAN.id ? data.get(field.name) : !!data.get(field.name)
                }
            })
        saveItem({
            item_name,
            collection_id,
            tag_ids,
            field_values: [...field_values, {
                field_id: fields.filter(item => item.name === 'name')[0].id,
                value: item_name
            }]
        })
    };

    function handleChooseTag(id) {
        if (tag_ids.includes(id)) {
            setTagIds(tag_ids.filter(tag => tag !== id))
        } else {
            setTagIds(p => {
                p.push(id)
                return p
            })
        }
        setBtnType(p => !p)
    }

    function handleChangeCollection(event) {
        const collection_id = event.target.value
        getCollectionFields(collection_id)
        setCollection_id(collection_id)
    }

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
                                    name="item_name"
                                    required
                                    fullWidth
                                    id="item_name"
                                    label={lan===ENG?"Name":'Имя'}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {select(handleChangeCollection, collections, lan===ENG?'Collection':'Коллекция')}
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl>
                                    <ButtonGroup>
                                        <Button size={'small'} variant={'contained'} className='me-1'>
                                            {lan===ENG?'Choose Tags':'Выберите теги'}:</Button>
                                        {
                                            tags.map(item => (
                                                //tems without 2 languages
                                                < Button size={'small'} about={btnType} key={item.id}
                                                         variant={tag_ids.includes(item.id) ? 'contained' : 'outlined'}
                                                         onClick={() => handleChooseTag(item.id)}>{lan===ENG ? item.name : item.name}
                                                </Button>
                                            ))
                                        }
                                    </ButtonGroup>
                                </FormControl>
                            </Grid>


                            {
                                fields[0] && fields.map(field => {
                                    return (
                                        field.name === 'tag' || field.name === 'name' ? '' :
                                            <Grid item xs={12} sm={6} key={field.id}>
                                                {
                                                    field.type === BOOLEAN.id ?
                                                        <FormControlLabel
                                                            control={<Checkbox name={field.name}
                                                                               sx={{'& .MuiSvgIcon-root': {fontSize: 35}}}/>}
                                                            label={field.name}/> :
                                                        field.type === TEXT.id ? textArea(field.name) :
                                                            textField(types.filter(type => type.id === field.type)[0].type, field.name)
                                                }
                                            </Grid>
                                    )
                                })
                            }


                            <Grid item xs={12} sm={12}>
                                <Button fullWidth
                                        type="submit"
                                        variant="contained"
                                        sx={{mt: 3, mb: 2}}>
                                    {lan===ENG?'Save':'Сохранять'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default connect(
    ({user: {user}, collection: {collections, tags, fields}}) =>
        ({user, collections, tags, fields}),
    {
        getAllCollectionsByUserId,
        getTags,
        getCollectionFields,
        saveItem
    })(AddItem)