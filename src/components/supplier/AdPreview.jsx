import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AdPreview({ headline, subheading, cta, includeLegal, uploadedImage }) {
  return (
    <Box sx={{
      width: 300, height: 250,
      background: 'linear-gradient(135deg, #1E3A5F 0%, #2e5087 100%)',
      borderRadius: '8px', overflow: 'hidden', position: 'relative',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column',
    }}>
      {uploadedImage && (
        <>
          <Box sx={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('${uploadedImage}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }} />
          <Box sx={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />
        </>
      )}
      <Box sx={{ position: 'relative', zIndex: 1, p: '20px 18px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ fontSize: 17, fontWeight: 700, color: '#fff', lineHeight: 1.25, mb: '7px', wordBreak: 'break-word' }}>
          {headline || 'Your Headline Here'}
        </Box>
        <Box sx={{ fontSize: 11, color: 'rgba(255,255,255,0.82)', lineHeight: 1.4, mb: '12px', wordBreak: 'break-word' }}>
          {subheading || 'Your subheading goes here with more detail about the offer'}
        </Box>
        <Box sx={{
          display: 'inline-block', background: '#F97316', color: '#fff',
          fontSize: 11, fontWeight: 700, px: '14px', py: '6px',
          borderRadius: '4px', width: 'fit-content',
        }}>
          {cta}
        </Box>
      </Box>
      <Box sx={{
        height: 28, background: '#F97316', display: 'flex',
        alignItems: 'center', px: '14px', flexShrink: 0,
      }}>
        <Box sx={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>
          The Home Depot
        </Box>
        {includeLegal && (
          <Box sx={{ fontSize: 8, color: 'rgba(255,255,255,0.7)', ml: 'auto' }}>
            *See terms &amp; conditions
          </Box>
        )}
      </Box>
    </Box>
  );
}
