import { LoadingButton } from '@mui/lab';
import { Dialog, DialogTitle } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { UserErrorMessages } from '../../../../constants/ErrorMessages';
import { requestErrorMessage } from '../../../../helpers/errorResponse';
import { saveTokens } from '../../../../helpers/tokensHelpers';
import { signIn } from '../../../../services/authApiService';
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
});

const initialValues = {
    email: '',
    password: '',
};

type FormValues = typeof initialValues;

export const SignInDialog = ({ isOpen, handleClose }: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const loginUser = useCallback(
        async (
            email: string,
            password: string,
            actions: FormikHelpers<FormValues>
        ) => {
            try {
                setIsLoading(true);

                const { data } = await signIn({
                    email,
                    password,
                });

                saveTokens(data.accessToken, data.refreshToken);
                User.loginUser(data.user);

                handleClose();
            } catch (error) {
                const errorMessage = requestErrorMessage(error);

                actions.setFieldError('email', UserErrorMessages.WRONG_DATA);
                actions.setFieldError('password', UserErrorMessages.WRONG_DATA);

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
        loginUser(values.email, values.password, actions);
        actions.setSubmitting(false);
    };

    return (
        <Dialog
            open={isOpen}
            onBackdropClick={handleClose}
            className="global-dialog"
        >
            <DialogTitle>Sign In</DialogTitle>
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
                                Sign in
                            </LoadingButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};
