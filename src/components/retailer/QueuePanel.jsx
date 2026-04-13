import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { fmtDate, statusColor, statusLabel } from '../../data';

const TAB_ORDER = ['pending', 'approved', 'rejected', 'revisions'];

export default function QueuePanel({
  submissions, tabConfig, retTab, selectedSubmissionId,
  onSetRetTab, onSelectSub,
}) {
  const cfg = tabConfig[retTab];
  const items = cfg.ids.map(id => submissions.find(s => s.id === id)).filter(Boolean);
  const more = cfg.total - items.length;

  return (
    <Box sx={{
      width: '30%', minWidth: 260, borderRight: '1px solid #DDE3EA',
      bgcolor: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Header */}
      <Box sx={{ p: '14px 16px 10px', borderBottom: '1px solid #DDE3EA', flexShrink: 0 }}>
        <Typography sx={{ fontSize: 15, fontWeight: 700, mb: '10px', color: '#1E3A5F' }}>
          Submission Queue
        </Typography>
        {/* Tabs */}
        <Box sx={{ display: 'flex', border: '1px solid #DDE3EA', borderRadius: '6px', overflow: 'hidden' }}>
          {TAB_ORDER.map((tab, i) => {
            const c = tabConfig[tab];
            const active = retTab === tab;
            return (
              <Box
                key={tab}
                component="button"
                onClick={() => onSetRetTab(tab)}
                sx={{
                  flex: 1, py: '5px', px: '4px', fontSize: 11, fontWeight: 600,
                  fontFamily: "Calibri, 'Segoe UI', sans-serif",
                  border: 'none',
                  borderRight: i < TAB_ORDER.length - 1 ? '1px solid #DDE3EA' : 'none',
                  bgcolor: active ? '#1E3A5F' : '#F5F7FA',
                  color: active ? '#fff' : '#6B7B8D',
                  cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center', whiteSpace: 'nowrap',
                }}
              >
                {c.label}
                <Box component="span" sx={{
                  display: 'inline-block', ml: '3px', px: '5px', fontSize: 10, borderRadius: '8px',
                  bgcolor: active ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)',
                }}>
                  {c.total}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* List */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: '10px' }}>
        {items.map(sub => {
          const selected = selectedSubmissionId === sub.id;
          return (
            <Box
              key={sub.id}
              onClick={() => onSelectSub(sub.id)}
              sx={{
                border: selected ? '1px solid #1E3A5F' : '1px solid #DDE3EA',
                borderRadius: '7px', p: '11px 12px', mb: '8px', cursor: 'pointer',
                bgcolor: selected ? '#F0F4F9' : '#fff',
                boxShadow: selected ? '0 0 0 2px rgba(30,58,95,0.12)' : 'none',
                transition: 'all 0.15s',
                '&:hover': { borderColor: '#1E3A5F' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: '4px' }}>
                <Box sx={{ fontSize: 13, fontWeight: 700, color: '#1E3A5F' }}>{sub.supplier}</Box>
                <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Box sx={{ fontSize: 11, fontWeight: 700, color: sub.aiStatus === 'pass' ? '#43A047' : '#FFA000' }}>
                    {sub.aiStatus === 'pass' ? 'AI ✓' : 'AI ⚠'}
                  </Box>
                  <Chip
                    label={statusLabel(sub.status)}
                    size="small"
                    color={statusColor(sub.status)}
                    sx={{ fontSize: 10, fontWeight: 600, height: 18 }}
                  />
                </Box>
              </Box>
              <Box sx={{ fontSize: 11, color: '#6B7B8D', mb: '4px' }}>{sub.template}</Box>
              <Box sx={{ fontSize: 10, color: '#9BAFBF' }}>{fmtDate(sub.submittedAt)}</Box>
            </Box>
          );
        })}
        {more > 0 && (
          <Box sx={{ fontSize: 11, color: '#9BAFBF', textAlign: 'center', py: '6px', fontStyle: 'italic' }}>
            ...and {more} more submission{more !== 1 ? 's' : ''}
          </Box>
        )}
      </Box>
    </Box>
  );
}
