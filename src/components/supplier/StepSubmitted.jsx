import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function StepSubmitted({
  setSupStep, setSelectedTemplate, setHeadline, setSubheading,
  setCta, setIncludeLegal, setUploadedImage,
  selectedTemplate, headline,
}) {
  const t = selectedTemplate;
  const now = new Date().toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const createAnother = () => {
    setSupStep('templates');
    setSelectedTemplate(null);
    setHeadline('');
    setSubheading('');
    setCta('Shop Now');
    setIncludeLegal(true);
    setUploadedImage(null);
  };

  const rows = [
    { label: 'Template', val: t?.name || '—' },
    { label: 'Headline', val: headline || '—' },
    { label: 'Channels', val: t ? t.channels.join(', ') : '—' },
    { label: 'Ad Sizes', val: '18 sizes' },
    { label: 'Submitted', val: now },
    { label: 'Status', val: null },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <Box sx={{
        width: 72, height: 72, borderRadius: '50%', bgcolor: '#43A047', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', mb: '18px',
        boxShadow: '0 4px 18px rgba(67,160,71,0.3)',
      }}>
        <CheckCircleIcon sx={{ fontSize: 36 }} />
      </Box>

      <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', mb: '8px' }}>
        Creative Submitted for Review
      </Typography>
      <Typography sx={{ fontSize: 14, color: '#6B7B8D', mb: '22px', maxWidth: 420, lineHeight: 1.6 }}>
        Your creative will be reviewed by Home Depot within 24 hours. You'll receive a notification once a decision has been made.
      </Typography>

      <Box sx={{
        bgcolor: '#fff', border: '1px solid #DDE3EA', borderRadius: '8px',
        p: '18px 24px', textAlign: 'left', mb: '22px', minWidth: 360,
      }}>
        {rows.map(({ label, val }) => (
          <Box key={label} sx={{
            display: 'flex', justifyContent: 'space-between',
            py: '5px', borderBottom: '1px solid #EDF1F5',
            '&:last-child': { borderBottom: 'none' },
            fontSize: 12,
          }}>
            <Box sx={{ color: '#6B7B8D', fontWeight: 600 }}>{label}</Box>
            <Box sx={{ color: '#1E3A5F', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>
              {val === null
                ? <Chip label="Pending Review" size="small" sx={{ bgcolor: '#FFF3E0', color: '#E65100', fontWeight: 600, fontSize: 11, height: 20 }} />
                : val
              }
            </Box>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={createAnother}
        sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#162e4a' }, px: '22px', py: '11px', fontSize: 14 }}
      >
        Create Another →
      </Button>
    </Box>
  );
}
