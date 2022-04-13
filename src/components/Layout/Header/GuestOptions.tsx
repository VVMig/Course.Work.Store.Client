import { Button } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { SignInDialog } from '../../Common/SignInDialog';
import { SignUpDialog } from '../../Common/SignUpDialog';

export const GuestOptions = () => {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);

    const toggleSignIn = useCallback(() => {
        setIsSignInOpen((prev) => !prev);
    }, []);

    const toggleSignUp = useCallback(() => {
        setIsSignUpOpen((prev) => !prev);
    }, []);

    return (
        <>
            <div>
                <Button onClick={toggleSignIn}>Sign in</Button>
                <Button onClick={toggleSignUp}>Sign up</Button>
            </div>
            <SignInDialog isOpen={isSignInOpen} handleClose={toggleSignIn} />
            <SignUpDialog isOpen={isSignUpOpen} handleClose={toggleSignUp} />
        </>
    );
};
