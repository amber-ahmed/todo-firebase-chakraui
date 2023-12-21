import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import React from "react"

function Alert({ title, description, okFun, isOpen, onClose, okText,buttonColor }) {
    const cancelRef = React.useRef()

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent sx={{ bg: 'text2' }}>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold' color={'primary'}>
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody color={'primary'}>
                            {description}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button sx={{ bg: 'secondary' }} ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme={buttonColor} onClick={okFun} ml={3}>
                                {okText}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}
export default Alert