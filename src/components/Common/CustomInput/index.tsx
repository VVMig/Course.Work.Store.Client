import { OutlinedTextFieldProps, styled, TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

const Input = styled(TextField)(() => ({}));

export const CustomInput = ({ ...props }: OutlinedTextFieldProps) => {
    const { name, type } = props;

    const [field, meta] = useField({
        name,
        type,
    });

    return (
        <Input
            variant="outlined"
            {...props}
            {...field}
            error={meta.touched && !!meta.error}
            helperText={meta.touched && !!meta.error ? meta.error : ''}
        />
    );
};
