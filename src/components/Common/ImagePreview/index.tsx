import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import clsx from 'clsx';
import React from 'react';

interface IProps {
    src: string;
    isMain: boolean;
    onClickClose?: () => void;
    onClick: () => void;
}

export const ImagePreview = ({
    src,
    onClickClose,
    isMain,
    onClick,
}: IProps) => {
    return (
        <div
            className={clsx('image-preview', {
                ['image-preview_main']: isMain,
            })}
            onClick={onClick}
        >
            <IconButton color="info" onClick={onClickClose}>
                <Close color="error" />
            </IconButton>
            <img src={src} className="image-preview__content" />
        </div>
    );
};
