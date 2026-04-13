import React from 'react';
import {
  Box, Typography, Card, CardContent, CardActions,
  Chip, Button, Grid,
} from '@mui/material';
import { DEMO_TEMPLATES } from '../../data';

export default function StepTemplates({ setSupStep, setSelectedTemplate, setCta }) {
  const handleSelect = (t) => {
    setSelectedTemplate(t);
    setCta(t.constraints.cta[0]);
    setSupStep('editor');
  };

  return (
    <Box>
      <Box sx={{ mb: '20px' }}>
        <Typography variant="h5" sx={{ fontSize: 20, fontWeight: 700, color: '#1E3A5F', mb: '4px' }}>
          Available Templates
        </Typography>
        <Typography sx={{ color: '#6B7B8D', fontSize: 13 }}>
          Choose a retailer-approved template to create your ad creative
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {DEMO_TEMPLATES.map(t => (
          <Grid item xs={12} sm={6} md={4} key={t.id}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: '10px', border: '1px solid #DDE3EA', height: '100%',
                display: 'flex', flexDirection: 'column',
                transition: 'box-shadow 0.15s, border-color 0.15s',
                '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.09)', borderColor: '#1E3A5F' },
              }}
            >
              <CardContent sx={{ flex: 1, pb: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: '8px' }}>
                  <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#1E3A5F' }}>
                    {t.name}
                  </Typography>
                  <Chip label="Live" size="small" sx={{ bgcolor: '#E8F5E9', color: '#2E7D32', fontWeight: 600, fontSize: 11, height: 22 }} />
                </Box>
                <Typography sx={{ fontSize: 11, color: '#9BAFBF', mb: '8px' }}>
                  Available to: {t.supplier}
                </Typography>
                <Typography sx={{ fontSize: 12, color: '#6B7B8D', mb: '12px', lineHeight: 1.5 }}>
                  {t.description}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', mb: '14px' }}>
                  {t.channels.map(ch => (
                    <Chip
                      key={ch}
                      label={ch}
                      size="small"
                      sx={{
                        bgcolor: '#EDF1F5', color: '#1E3A5F', fontWeight: 600, fontSize: 11,
                        height: 22, border: '1px solid #DDE3EA',
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleSelect(t)}
                  sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#162e4a' } }}
                >
                  Create Ad →
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
