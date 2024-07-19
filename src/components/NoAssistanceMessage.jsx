import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Add, ArrowLeft, ArrowLeft2 } from 'iconsax-react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';

const NoAssistanceMessage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/dashboard")
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Card
                elevation={0}
                sx={{
                    border: '2px dashed #E0E0E0',
                    borderRadius: 2,
                    padding: 3,
                    textAlign: 'center',
                    maxWidth: 600,
                    margin: '0 auto'
                }}
            >
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom mb={2}>
                        Actualmente no cuentas con asistencias disponibles.
                    </Typography>
                    <Button startIcon={<ArrowLeft />} variant="contained" size="large" onClick={handleBack}>
                        Volver
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default NoAssistanceMessage;