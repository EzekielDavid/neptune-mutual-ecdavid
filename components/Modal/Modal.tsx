import {
    Modal,
} from '@mui/material'

export default function ModalComponent(props) {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            {...props.base}
        >
           {props.children}
        </Modal>
    )
}
