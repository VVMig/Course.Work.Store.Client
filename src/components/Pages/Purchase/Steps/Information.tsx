import { CreditCard, Money } from '@mui/icons-material';
import { Box, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import { PaymentMethods } from '../../../../constants/PaymentMethods';
import { codeMatchRegExp, phoneRegExp } from '../../../../constants/regex';
import { CustomInput } from '../../../Common/CustomInput';

const validationSchema = yup.object().shape({
    address: yup.string().required('Required'),
    tel: yup
        .string()
        .required('Required')
        .matches(codeMatchRegExp, 'Invalid code')
        .matches(phoneRegExp, 'Phone number is not valid'),
    commentary: yup.string().max(100),
});

type FormValues = {
    address: string;
    tel: string;
    commentary?: string;
};

interface IProps {
    info: FormValues | undefined;
    paymentMethod: PaymentMethods;
    updateInfo: (info: FormValues) => void;
    handleNext: () => void;
    handleBack: () => void;
    selectPaymentMethod: (method: PaymentMethods) => void;
}

export const Information = ({
    info,
    updateInfo,
    handleBack,
    handleNext,
    paymentMethod,
    selectPaymentMethod,
}: IProps) => {
    const onSubmit = (values: FormValues) => {
        updateInfo(values);

        handleNext();
    };

    const initialValues = {
        address: info?.address || '',
        tel: info?.tel || '+375',
        commentary: info?.commentary ?? '',
    };

    const isContinueDisabled = (values: FormValues) => {
        if (!values || !paymentMethod) {
            return true;
        }

        return Object.keys(values).some(
            (key) => key !== 'commentary' && !values[key]
        );
    };

    const onChangePayment = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        value: PaymentMethods
    ) => {
        selectPaymentMethod(value);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form className="purchase-page__information">
                    <CustomInput
                        name="address"
                        variant="outlined"
                        label="Address"
                    />
                    <CustomInput
                        name="tel"
                        variant="outlined"
                        label="Phone number"
                        type="tel"
                        placeholder="+3754400000000"
                    />
                    <CustomInput
                        name="commentary"
                        variant="outlined"
                        label="Commentary"
                        multiline
                        minRows={10}
                    />
                    <ToggleButtonGroup
                        value={paymentMethod}
                        exclusive
                        onChange={onChangePayment}
                        aria-label="text alignment"
                        color="primary"
                    >
                        <ToggleButton value="CASH" aria-label="cash method">
                            Cash <Money />
                        </ToggleButton>
                        <ToggleButton value="CARD" aria-label="card method">
                            Card <CreditCard />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                                variant="contained"
                                sx={{ mt: 1, mr: 1 }}
                                disabled={isContinueDisabled(values)}
                                type="submit"
                            >
                                Continue
                            </Button>
                            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                Back
                            </Button>
                        </div>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};
