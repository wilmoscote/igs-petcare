import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Add } from 'iconsax-react';
import { FormattedMessage } from 'react-intl';

const NoPetsMessage = ({ handleAdd }) => {
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
                    <Typography variant="h4" component="div" gutterBottom>
                        <FormattedMessage id="no-pets" />
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        <FormattedMessage id="no-pets-desc" />
                    </Typography>
                    <Button startIcon={<Add />} variant="contained" size="large" onClick={handleAdd}>
                        <FormattedMessage id="add-pet" />
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default NoPetsMessage;