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
import { editProduct } from '../../../../services/productApiService';
import { Bootstrap } from '../../../../store';
import { IProduct } from '../../../../store/interfaces';
import { CustomFileUploader } from '../../CustomFileUploader';
import { CustomInput } from '../../CustomInput';
import { ImagePreview } from '../../ImagePreview';

interface IProps {
    isOpen: boolean;
    product: IProduct;
    handleClose?: () => void;
    updateProductsList: () => void;
}

const fileTypes = ['JPG', 'PNG', 'GIF', 'JPEG'];

const validationSchema = yup.object().shape({
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
    briefInformation: yup.string().required('Required'),
    price: yup.number().min(1, 'Minimum 1$').required('Required'),
    amount: yup.number().min(1, 'Minimum 1 amount').required('Required'),
});

type FormValues = {
    title: string;
    description: string;
    briefInformation: string;
    price: number;
    amount: number;
};

export const EditProductDialog = observer(
    ({ isOpen, handleClose, product, updateProductsList }: IProps) => {
        const [isLoading, setIsLoading] = useState(false);
        const [category, setCategory] = useState(product.category);
        const [images, setImages] = useState<string[]>(
            product?.images.map((image) => image.url) ?? []
        );

        const initialValues = {
            title: product?.title,
            description: product?.description,
            briefInformation: product?.briefInformation,
            price: product?.price,
            amount: product?.amount,
        };

        const editProductRequest = async (values: FormValues) => {
            try {
                setIsLoading(true);

                await editProduct(
                    {
                        ...values,
                        images,
                        category,
                        id: product?.id ?? product._id,
                    },
                    getAccessToken()
                );

                toast.success('Product has been updated');
                updateProductsList();
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
            editProductRequest(values);
            actions.setSubmitting(false);
        };

        const onChangeCategory = (event: SelectChangeEvent) => {
            setCategory(event.target.value);
        };

        const onRemoveImage = (imageIndex: number) => () => {
            setImages((prev) =>
                prev.filter((_, index) => index !== imageIndex)
            );
        };

        const handleChangeFile = async (uploadedImages: Blob[]) => {
            const promisedImages = Array.from(uploadedImages).map((file) => {
                const reader = new FileReader();

                return new Promise<ArrayBuffer | string>((resolve) => {
                    reader.onload = () => resolve(reader.result);

                    reader.readAsDataURL(file);
                });
            });

            const renderedImages = await Promise.all(promisedImages);

            setImages(renderedImages as string[]);
        };

        return (
            <Dialog
                open={isOpen}
                onBackdropClick={handleClose}
                className="global-dialog"
            >
                <DialogTitle>Edit product</DialogTitle>
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
                                <CustomFileUploader
                                    handleChange={handleChangeFile}
                                    name="images"
                                    fileTypes={fileTypes}
                                />
                                {!!images?.length && (
                                    <div className="image-preview__list">
                                        {images.map((image, imageIndex) => (
                                            <ImagePreview
                                                key={`${imageIndex}-image`}
                                                src={image}
                                                onClickClose={onRemoveImage(
                                                    imageIndex
                                                )}
                                            />
                                        ))}
                                    </div>
                                )}

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
                                        <MenuItem
                                            value={category}
                                            key={category}
                                        >
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
                                    Edit Product
                                </LoadingButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Dialog>
        );
    }
);
