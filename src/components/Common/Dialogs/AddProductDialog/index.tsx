import { LoadingButton } from '@mui/lab';
import {
    Dialog,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { requestErrorMessage } from '../../../../helpers/errorResponse';
import { getAccessToken } from '../../../../helpers/tokensHelpers';
import { addProduct } from '../../../../services/productApiService';
import { Bootstrap } from '../../../../store';
import { CustomInput } from '../../CustomInput';

interface IProps {
    isOpen: boolean;
    handleClose?: () => void;
}

const validationSchema = yup.object().shape({
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
    briefInformation: yup.string().required('Required'),
    price: yup.number().min(1, 'Minimum 1$').required('Required'),
    amount: yup.number().min(1, 'Minimum 1 amount').required('Required'),
});

const initialValues = {
    title: '',
    description: '',
    briefInformation: '',
    price: 0,
    amount: 0,
};

type FormValues = typeof initialValues;

export const AddProductDialog = observer(({ isOpen, handleClose }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState('');

    const addProductRequest = async (values: FormValues) => {
        try {
            setIsLoading(true);

            addProduct(
                {
                    ...values,
                    category,
                },
                getAccessToken()
            );

            toast.success('Product has been added');
            handleClose();
        } catch (error) {
            toast.error(requestErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        console.log(values);
        addProductRequest(values);
        actions.setSubmitting(false);
    };

    const onChangeCategory = (event: SelectChangeEvent) => {
        setCategory(event.target.value);
    };

    return (
        <Dialog open={isOpen} onBackdropClick={handleClose}>
            <DialogTitle>Add product</DialogTitle>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <Form className="sign-in-form">
                        <div className="sign-in-form__inputs">
                            <CustomInput
                                name="title"
                                type="text"
                                placeholder="Title"
                                variant="outlined"
                                label="Title"
                            />
                            <CustomInput
                                name="description"
                                type="text"
                                placeholder="Description"
                                variant="outlined"
                                label="Description"
                            />
                            <CustomInput
                                name="briefInformation"
                                type="text"
                                placeholder="Brief Information"
                                variant="outlined"
                                label="Brief Information"
                            />
                            <CustomInput
                                name="price"
                                type="number"
                                placeholder="128.5"
                                variant="outlined"
                                label="Price"
                            />
                            <CustomInput
                                name="amount"
                                type="number"
                                placeholder="128.5"
                                variant="outlined"
                                label="Amount"
                            />
                            <InputLabel id="demo-simple-select-label">
                                Category
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                onChange={onChangeCategory}
                            >
                                {Bootstrap.navItems.map((category) => (
                                    <MenuItem value={category} key={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        <div className="sign-in-form__submit">
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                type="submit"
                            >
                                Add Product
                            </LoadingButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
});
