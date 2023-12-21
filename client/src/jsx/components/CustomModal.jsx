import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from '@chakra-ui/react'
const CustomModal = ({ isOpen, onClose, title, modalBody, okText, okFunction }) => {
    const buttonStyle = {
        _hover: { bg: 'secondary',color: 'primary' },
        color: 'text2',
        bg: 'primary',
    }
    return (
        <>
            <Modal blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent
                    sx={{ bg: 'text2' }}>
                    <ModalHeader color={'primary'}>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {modalBody}
                    </ModalBody>

                    <ModalFooter>
                        <Button type='submit' sx={buttonStyle} mr={3} onClick={okFunction}>
                            {okText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CustomModal
