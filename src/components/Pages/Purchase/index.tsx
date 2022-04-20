import {
    Box,
    Button,
    Paper,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Title } from '../../../constants/HeaderOptions';
import { PaymentMethods } from '../../../constants/PaymentMethods';
import { URL } from '../../../constants/URL';
import { requestErrorMessage } from '../../../helpers/errorResponse';
import {
    clearPurchaseProducts,
    getPurchaseProducts,
    savePurchaseProducts,
} from '../../../helpers/purchaseProductHelpers';
import { getAccessToken } from '../../../helpers/tokensHelpers';
import { purchase } from '../../../services/userApiService';
import { User } from '../../../store';
import { IProduct } from '../../../store/interfaces';
import PurchaseProduct from '../../../store/PurchaseProduct';
import { Amount } from './Steps/Amount';
import { Confirmation } from './Steps/Confirmation';
import { Information } from './Steps/Information';

const steps = ['Select Amount', 'Enter Information', 'Confirm'];

const countTotalPrice = (products: IProduct[], amount: number) =>
    products?.reduce((total, product) => product.price + total, 0) * amount;

export interface ICustomerInfo {
    address: string;
    tel: string;
    commentary?: string;
}

export const Purchase = observer(() => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [amount, setAmount] = useState(1);
    const [customerInfo, setCustomerInfo] = useState<ICustomerInfo>();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethods>();
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const purchaseProductCheck = () => {
        if (!PurchaseProduct.products) {
            const storageProduct = getPurchaseProducts();

            if (storageProduct) {
                PurchaseProduct.setPurchaseProduct(storageProduct);

                return;
            }

            navigate(URL.HOME);

            toast.error('You have not selected any product');
        }

        savePurchaseProducts(PurchaseProduct.products);
    };

    const selectPaymentMethod = useCallback((method: PaymentMethods) => {
        setPaymentMethod(method);
    }, []);

    const onChangeAmount = useCallback(
        (event: Event, value: number | number[]) => {
            setAmount(value as number);
        },
        []
    );

    const updateCustomerInfo = useCallback((info: ICustomerInfo) => {
        setCustomerInfo(info);
    }, []);

    const handleNext = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }, []);

    const handlePurchase = async () => {
        try {
            setIsLoading(true);

            const { data } = await purchase(
                {
                    ...customerInfo,
                    ids: PurchaseProduct.products.map(
                        (product) => product.id ?? product._id
                    ),
                    amount,
                    paymentMethod,
                },
                getAccessToken()
            );

            User.updateCart(data);

            navigate(URL.HOME);

            toast.success(
                'Purchase has been confirmed. The operator will contact you shortly to confirm the information'
            );
        } catch (error) {
            toast.error(requestErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = useCallback(() => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }, []);

    useEffect(() => {
        purchaseProductCheck();

        return () => {
            clearPurchaseProducts();
            PurchaseProduct.restorePurchaseProduct();
        };
    }, []);

    const getProperStepComponent = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return (
                    <Amount
                        onChange={onChangeAmount}
                        amount={amount}
                        price={countTotalPrice(
                            PurchaseProduct.products,
                            amount
                        )}
                    />
                );
            case 1:
                return (
                    <Information
                        info={customerInfo}
                        updateInfo={updateCustomerInfo}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        paymentMethod={paymentMethod}
                        selectPaymentMethod={selectPaymentMethod}
                    />
                );
            case 2:
                return (
                    <Confirmation
                        customerInfo={customerInfo}
                        paymentMethod={paymentMethod}
                        amount={amount}
                        price={countTotalPrice(
                            PurchaseProduct.products,
                            amount
                        )}
                    />
                );
        }
    };

    return (
        <>
            <div className="purchase-page">
                <h2 className="purchase-page__title">Purchase confirmation</h2>
                <div className="purchase-page__stepper">
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                                <StepContent>
                                    {getProperStepComponent(index)}
                                    {index !== 1 && (
                                        <Box sx={{ mb: 2 }}>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={
                                                        index ===
                                                        steps.length - 1
                                                            ? handlePurchase
                                                            : handleNext
                                                    }
                                                    sx={{ mt: 1, mr: 1 }}
                                                    disabled={isLoading}
                                                >
                                                    {index === steps.length - 1
                                                        ? 'Purchase'
                                                        : 'Continue'}
                                                </Button>
                                                <Button
                                                    disabled={index === 0}
                                                    onClick={handleBack}
                                                    sx={{ mt: 1, mr: 1 }}
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </Box>
                                    )}
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length && (
                        <Paper square elevation={0} sx={{ p: 3 }}>
                            <Typography>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Button sx={{ mt: 1, mr: 1 }}>Reset</Button>
                        </Paper>
                    )}
                </div>
            </div>
            <Helmet>
                <title>{Title.PURCHASE}</title>
            </Helmet>
        </>
    );
});
