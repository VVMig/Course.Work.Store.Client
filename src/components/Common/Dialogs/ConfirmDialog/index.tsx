import { Button, ButtonGroup, Dialog } from '@mui/material';
import React from 'react';

interface IProps {
    isOpen: boolean;
    title?: string;
    onPositiveChoice: () => void;
    handleClose?: () => void;
}

export const ConfirmDialog = ({
    isOpen,
    handleClose,
    title,
    onPositiveChoice,
}: IProps) => {
    return (
        <Dialog open={isOpen} onClick={(e) => e.preventDefault()}>
            <div className="confirm-dialog">
                <h2>{title}</h2>
                <div className="confirm-dialog__choice">
                    <ButtonGroup>
                        <Button onClick={onPositiveChoice} color="error">
                            Yes
                        </Button>
                        <Button onClick={handleClose} color="info">
                            No
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </Dialog>
    );
};
