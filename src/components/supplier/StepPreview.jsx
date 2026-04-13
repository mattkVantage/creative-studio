import React from 'react';
import { Box, Typography, Chip, Alert, Button } from '@mui/material';
import { AD_SPECS, checkCompliance } from '../../data';
import AdThumb from './AdThumb';

export default function StepPreview({ setSupStep, headline, subheading, cta }) {
  const compliance = checkCompliance(headline, subheading);
  const totalSizes = AD_SPECS.length;
  const channels = [...new Set(AD_SPECS.map(s => s.channel))];

  return (
    <Box>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 12, color: '#9BAFBF', mb: '18px' }}>
        <Box component="span" onClick={() => setSupStep('templates')}
          sx={{ color: '#F97316', cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
          Templates
        </Box>
        <span>›</span>
        <Box component="span" onClick={() => setSupStep('editor')}
          sx={{ color: '#F97316', cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}>
          Editor
        </Box>
        <span>›</span>
        <span>Preview</span>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '6px' }}>
        <Typography sx={{ fontSize: 18, fontWeight: 700, color: '#1E3A5F' }}>
          18 Ad Sizes — Auto-Generated
        </Typography>
      </Box>

      <Alert
        severity={compliance.pass ? 'success' : 'warning'}
        icon={false}
        sx={{ mb: '20px', fontWeight: 600, fontSize: 13 }}
      >
        {compliance.pass
          ? `✓ ${totalSizes} sizes ready — all sizes passed compliance`
          : `⚠ ${totalSizes} sizes generated — copy issues detected (see warnings below)`}
      </Alert>

      {channels.map(ch => {
        const specs = AD_SPECS.filter(s => s.channel === ch);
        return (
          <Box key={ch} sx={{ mb: '24px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '10px', pb: '6px', borderBottom: '2px solid #DDE3EA' }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#1E3A5F' }}>{ch}</Typography>
              <Chip
                label={`${specs.length} size${specs.length > 1 ? 's' : ''}`}
                size="small"
                sx={{ bgcolor: '#EDF1F5', color: '#6B7B8D', fontWeight: 600, fontSize: 11, height: 20 }}
              />
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {specs.map(spec => (
                <AdThumb
                  key={spec.label}
                  spec={spec}
                  compliance={compliance}
                  headline={headline}
                  subheading={subheading}
                  cta={cta}
                />
              ))}
            </Box>
          </Box>
        );
      })}

      <Box sx={{ display: 'flex', gap: '12px', mt: '8px', pb: '24px' }}>
        <Button
          variant="outlined"
          onClick={() => setSupStep('editor')}
          sx={{ color: '#1E3A5F', borderColor: '#DDE3EA', '&:hover': { bgcolor: '#EDF1F5' } }}
        >
          ← Back to Editor
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setSupStep('submitted')}
          sx={{ px: '22px', py: '11px', fontSize: 14 }}
        >
          Submit for Approval →
        </Button>
      </Box>
    </Box>
  );
}
