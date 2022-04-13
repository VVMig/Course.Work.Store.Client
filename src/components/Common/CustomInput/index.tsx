import { OutlinedTextFieldProps, styled, TextField } from '@mui/material';
import { FormikProps, useField } from 'formik';
import React from 'react';

const Input = styled(TextField)(() => ({}));

interface IProps extends OutlinedTextFieldProps {
    formik?: FormikProps<any>;
}

export const CustomInput = ({ formik, ...props }: IProps) => {
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
