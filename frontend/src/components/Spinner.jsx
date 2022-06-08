import React from 'react'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export const Spinner = () => {
    return (
        <Box sx={{ width: '100%'}} spacing={5}>
            <LinearProgress />
        </Box>
    )
}