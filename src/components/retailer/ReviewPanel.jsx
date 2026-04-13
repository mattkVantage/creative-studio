import React from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import { AD_SPECS, fmtDate, statusColor, statusLabel } from '../../data';

function MiniThumb({ spec, sub }) {
  const MAX = 54;
  const ratio = spec.w / spec.h;
  let tw, th;
  if (ratio >= 1) { tw = MAX; th = Math.max(Math.round(MAX / ratio), 16); }
  else { th = MAX; tw = Math.max(Math.round(MAX * ratio), 16); }
  const pass = sub.aiStatus === 'pass';

  return (
    <Tooltip title={`${spec.label} — ${spec.w}×${spec.h}`} placement="top">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        <Box sx={{
          width: tw, height: th,
          background: 'linear-gradient(135deg, #1E3A5F 0%, #2e5087 100%)',
          borderRadius: '3px', position: 'relative', overflow: 'hidden', flexShrink: 0,
        }}>
          <Box sx={{ p: '2px 3px', fontSize: '5px', color: '#fff', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {sub.headline}
          </Box>
          <Box sx={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: Math.max(4, Math.round(th * 0.12)),
            background: '#F97316',
          }} />
          <Box sx={{
            position: 'absolute', top: '2px', right: '2px', width: 10, height: 10,
            borderRadius: '50%', background: pass ? '#43A047' : '#FFA000',
            fontSize: '7px', color: '#fff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 700,
          }}>
            {pass ? '✓' : '!'}
          </Box>
        </Box>
        <Box sx={{ fontSize: '8px', color: '#9BAFBF', textAlign: 'center', maxWidth: tw, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {spec.w}×{spec.h}
        </Box>
      </Box>
    </Tooltip>
  );
}

export default function ReviewPanel({ selectedSub }) {
  if (!selectedSub) {
    return (
      <Box sx={{ flex: 1, bgcolor: '#EDF1F5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center', color: '#9BAFBF' }}>
          <Box sx={{ fontSize: 40, mb: '10px' }}>←</Box>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Select a submission to review</Typography>
          <Typography sx={{ fontSize: 12, mt: '4px' }}>Choose a submission from the queue on the left</Typography>
        </Box>
      </Box>
    );
  }

  const sub = selectedSub;

  return (
    <Box sx={{ flex: 1, bgcolor: '#EDF1F5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box sx={{ flex: 1, overflowY: 'auto', p: '18px' }}>
        {/* Header card */}
        <Box sx={{ bgcolor: '#fff', border: '1px solid #DDE3EA', borderRadius: '8px', p: '14px 16px', mb: '14px' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: '6px' }}>
            <Typography sx={{ fontSize: 17, fontWeight: 700, color: '#1E3A5F' }}>{sub.supplier}</Typography>
            <Chip
              label={statusLabel(sub.status)}
              size="small"
              color={statusColor(sub.status)}
              sx={{ fontWeight: 600, fontSize: 11 }}
            />
          </Box>
          <Box sx={{ fontSize: 12, color: '#6B7B8D', display: 'flex', gap: '14px', flexWrap: 'wrap', mb: '10px' }}>
            <span><strong>Template:</strong> {sub.template}</span>
            <span><strong>Submitted:</strong> {fmtDate(sub.submittedAt)}</span>
            <span><strong>CTA:</strong> {sub.cta}</span>
          </Box>
          <Box sx={{ background: '#1E3A5F', borderRadius: '6px', p: '12px 14px', color: '#fff' }}>
            <Box sx={{ fontSize: 14, fontWeight: 700, mb: '3px' }}>"{sub.headline}"</Box>
            <Box sx={{ fontSize: 12, opacity: 0.8 }}>{sub.subheading}</Box>
          </Box>
        </Box>

        {/* All 18 sizes */}
        <Box sx={{ fontSize: 11, fontWeight: 700, color: '#6B7B8D', textTransform: 'uppercase', letterSpacing: '.5px', mb: '10px' }}>
          All 18 Ad Sizes
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {AD_SPECS.map(spec => (
            <MiniThumb key={`${spec.channel}-${spec.label}`} spec={spec} sub={sub} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
