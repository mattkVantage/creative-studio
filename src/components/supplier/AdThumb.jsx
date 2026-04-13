import React from 'react';
import { Box, Tooltip } from '@mui/material';

export default function AdThumb({ spec, compliance, headline, subheading, cta }) {
  const MAX = 90;
  const ratio = spec.w / spec.h;
  let tw, th;
  if (ratio >= 1) { tw = MAX; th = Math.max(Math.round(MAX / ratio), 28); }
  else { th = MAX; tw = Math.max(Math.round(MAX * ratio), 28); }

  const hl = headline || 'Headline';
  const sub = subheading || 'Subheading';
  const ctaText = cta || 'Shop Now';
  const pass = compliance.pass;
  const isWide = ratio > 4;

  return (
    <Tooltip title={`${spec.label} — ${spec.w}×${spec.h}`} placement="top">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
        <Box sx={{
          width: tw, height: th,
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2e5087 100%)',
          borderRadius: '4px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
          position: 'relative', boxShadow: '0 2px 6px rgba(0,0,0,0.12)', flexShrink: 0,
        }}>
          {isWide ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, p: '2px 6px', gap: '6px' }}>
                <Box sx={{ flex: 1, overflow: 'hidden', fontSize: '6px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {hl}
                </Box>
                <Box sx={{ fontSize: '6px', fontWeight: 700, background: '#F97316', color: '#fff', px: '4px', py: '2px', borderRadius: '2px', flexShrink: 0 }}>
                  {ctaText}
                </Box>
              </Box>
              <Box sx={{ height: '4px', background: '#F97316', flexShrink: 0 }} />
            </>
          ) : (
            <>
              <Box sx={{ p: '4px 5px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ fontSize: '7px', fontWeight: 700, color: '#fff', lineHeight: 1.2, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  {hl}
                </Box>
                {th > 50 && (
                  <Box sx={{ fontSize: '6px', color: 'rgba(255,255,255,0.75)', mt: '2px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    {sub}
                  </Box>
                )}
                {th > 70 && (
                  <Box sx={{ fontSize: '6px', fontWeight: 700, background: '#F97316', color: '#fff', px: '4px', py: '2px', borderRadius: '2px', width: 'fit-content', mt: '3px' }}>
                    {ctaText}
                  </Box>
                )}
              </Box>
              <Box sx={{ height: '7px', background: '#F97316', flexShrink: 0 }} />
            </>
          )}
          {/* Compliance badge */}
          <Box sx={{
            position: 'absolute', top: '3px', right: '3px', width: 14, height: 14,
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '8px', fontWeight: 700,
            background: pass ? '#43A047' : '#FFA000', color: '#fff',
          }}>
            {pass ? '✓' : '!'}
          </Box>
        </Box>
        <Box sx={{ fontSize: 10, color: '#6B7B8D', textAlign: 'center' }}>{spec.label}</Box>
        <Box sx={{ fontSize: 9, color: '#9BAFBF', textAlign: 'center' }}>{spec.w}×{spec.h}</Box>
      </Box>
    </Tooltip>
  );
}
