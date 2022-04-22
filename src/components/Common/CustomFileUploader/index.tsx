import { UploadFile } from '@mui/icons-material';
import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';

interface IProps {
    handleChange: (uploadedImages: Blob[]) => Promise<void>;
    fileTypes: string[];
    name: string;
}

export const CustomFileUploader = ({
    handleChange,
    fileTypes,
    name,
}: IProps) => {
    return (
        <FileUploader
            handleChange={handleChange}
            name={name}
            types={fileTypes}
            classes="image-uploader"
            multiple
            maxSize={10}
            onSizeError={() =>
                toast.error('Too large image. Max file size is 10mb')
            }
        >
            <div className="image-uploader__tip">
                <UploadFile />
                <h3>Drop or Upload Your Images here</h3>
            </div>
        </FileUploader>
    );
};
