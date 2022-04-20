import { GitHub, LinkedIn } from '@mui/icons-material';
import React from 'react';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__copyright">Ⓒ Reserved by VVMig</div>
                    <div className="footer__social-links">
                        <a
                            href="https://www.linkedin.com/in/vladimir-migay-b04268207/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <LinkedIn />
                        </a>
                        <a
                            href="https://github.com/VVMig/Course.Work.Store.Client"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GitHub />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
