import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Modal} from "@mui/material";
import {BLOCK, GET_PERMISSION} from "../../util/constants";

function ModalPage({open, toggle, action, makeAction}) {

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

    function activate(action) {
        toggle()
        makeAction(action)
    }


    return (
        <Modal
            open={open}
            onClose={toggle}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h6 className='text-danger mb-4'>Warning! You
                    my {action === BLOCK ? 'block' : action === GET_PERMISSION ? GET_PERMISSION : 'delete'} yourself</h6>
                <Box style={{
                    position: 'absolute',
                    right: 15,
                    bottom: 15,
                }}>
                    <Button variant='outlined' color={'error'}
                            onClick={() => activate(action)}>
                        {action === BLOCK ? 'Block' : action === GET_PERMISSION ? GET_PERMISSION : 'Delete'}</Button>
                    <Button sx={{ml: 1}} variant='outlined' color={'success'} onClick={toggle}>Cancel</Button>
                </Box>

            </Box>
        </Modal>
    )
}

export default ModalPage