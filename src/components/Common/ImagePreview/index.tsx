import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';

interface IProps {
    src: string;
    onClickClose?: () => void;
}

export const ImagePreview = ({ src, onClickClose }: IProps) => {
    return (
        <div className="image-preview">
            <IconButton color="info" onClick={onClickClose}>
                <Close color="error" />
            </IconButton>
            <img src={src} className="image-preview__content" />
        </div>
    );
};
