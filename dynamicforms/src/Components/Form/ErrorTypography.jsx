import { Typography } from '@mui/material';
import React from 'react';

function ErrorTypography(props) {
    return (
        <>
            <Typography sx={{color:"red"}}>
                {props.errors}
            </Typography>
        </>
    );
}

export default ErrorTypography;