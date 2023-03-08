import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Modal} from "@mui/material";

function DeleteModal({suffix, id, open, toggle, givenFunction}) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 350,
        bgcolor: 'background.paper',
        p: 4,
        borderRadius: 2
    };


    function activate() {
        toggle()
        givenFunction(id)
    }


    return (
        <Modal
            open={open}
            onClose={toggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h6 className='text-danger mb-4'>Warning! Do you really want to delete {suffix}?</h6>
                <Box style={{
                    position: 'absolute',
                    right: 15,
                    bottom: 15,
                }}>
                    <Button variant='outlined' color={'error'}
                            onClick={() => activate()}>
                        Delete</Button>
                    <Button sx={{ml: 1}} variant='outlined' color={'success'} onClick={toggle}>Cancel</Button>
                </Box>

            </Box>
        </Modal>
    )
}

export default DeleteModal