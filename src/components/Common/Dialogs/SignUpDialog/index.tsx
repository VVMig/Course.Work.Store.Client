import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { UserErrorMessages } from '../../../../constants/ErrorMessages';
import { requestErrorMessage } from '../../../../helpers/errorResponse';
import { saveTokens } from '../../../../helpers/tokensHelpers';
import { signUp } from '../../../../services/authApiService';
import { User } from '../../../../store';
import { CustomInput } from '../../CustomInput';
import { GoogleButton } from '../../GoogleButton';

interface IProps {
    isOpen: boolean;
    handleClose?: () => void;
}

const validationSchema = yup.object().shape({
    email: yup.string().email('Wrong format').required('Required'),
    password: yup.string().required('Required'),
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
});

const initialValues = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
};

type FormValues = typeof initialValues;

export const SignUpDialog = ({ isOpen, handleClose }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const registerUser = useCallback(
        async (
            email: string,
            password: string,
            firstName: string,
            lastName: string,
            actions: FormikHelpers<FormValues>
        ) => {
            try {
                setIsLoading(true);

                const { data } = await signUp({
                    email,
                    password,
                    firstName,
                    lastName,
                });

                toast.success('Check the activation link in your mail');

                saveTokens(data.accessToken, data.refreshToken);
                User.loginUser(data.user);

                handleClose();
            } catch (error) {
                const errorMessage = requestErrorMessage(error);

                if (errorMessage === UserErrorMessages.EMAIL_EXIST) {
                    actions.setFieldError(
                        'email',
                        UserErrorMessages.EMAIL_EXIST
                    );
                }

                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
        []
    );

    const onSubmit = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        registerUser(
            values.email,
            values.password,
            values.firstName,
            values.lastName,
            actions
        );
        actions.setSubmitting(false);
    };

    return (
        <Dialog open={isOpen} onBackdropClick={handleClose}>
            <DialogTitle>Sign Up</DialogTitle>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {() => (
                    <Form className="sign-in-form">
                        <div className="sign-in-form__inputs">
                            <CustomInput
                                name="email"
                                type="email"
                                placeholder="Example@example.com"
                                variant="outlined"
                                label="Email"
                            />
                            <CustomInput
                                name="password"
                                type="password"
                                placeholder="Password"
                                variant="outlined"
                                label="Password"
                            />
                            <CustomInput
                                name="firstName"
                                type="text"
                                placeholder="Cristiano"
                                variant="outlined"
                                label="First name"
                            />
                            <CustomInput
                                name="lastName"
                                type="text"
                                placeholder="Ronaldo"
                                variant="outlined"
                                label="Last name"
                            />
                        </div>

                        <div className="sign-in-form__google">
                            <GoogleButton />
                        </div>

                        <div className="sign-in-form__submit">
                            <LoadingButton
                                loading={isLoading}
                                variant="outlined"
                                type="submit"
                            >
                                Sign Up
                            </LoadingButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};
