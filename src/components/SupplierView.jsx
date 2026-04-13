import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import StepTemplates from './supplier/StepTemplates';
import StepEditor from './supplier/StepEditor';
import StepPreview from './supplier/StepPreview';
import StepSubmitted from './supplier/StepSubmitted';

const STEPS = [
  { key: 'templates', label: 'Templates' },
  { key: 'editor',    label: 'Editor' },
  { key: 'preview',   label: 'Preview' },
  { key: 'submitted', label: 'Submitted' },
];

export default function SupplierView(props) {
  const { supStep } = props;
  const order = STEPS.findIndex(s => s.key === supStep);

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Step Indicator */}
      <Box sx={{
        display: 'flex', alignItems: 'center', px: 3, height: 44,
        background: '#fff', borderBottom: '1px solid #DDE3EA', flexShrink: 0, gap: 0,
      }}>
        {STEPS.map((step, i) => {
          const done = i < order;
          const active = i === order;
          return (
            <React.Fragment key={step.key}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 12,
                color: done ? '#43A047' : active ? '#1E3A5F' : '#9BAFBF',
                fontWeight: active ? 700 : 500,
              }}>
                <Box sx={{
                  width: 20, height: 20, borderRadius: '50%', fontSize: 11, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: done ? '#43A047' : active ? '#1E3A5F' : '#DDE3EA',
                  color: done || active ? '#fff' : '#6B7B8D',
                }}>
                  {done ? <CheckIcon sx={{ fontSize: 12 }} /> : i + 1}
                </Box>
                <span>{step.label}</span>
              </Box>
              {i < STEPS.length - 1 && (
                <Box sx={{ mx: '10px', color: '#DDE3EA', fontSize: 14 }}>›</Box>
              )}
            </React.Fragment>
          );
        })}
      </Box>

      {/* Step Body */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        {supStep === 'templates' && <StepTemplates {...props} />}
        {supStep === 'editor' && <StepEditor {...props} />}
        {supStep === 'preview' && <StepPreview {...props} />}
        {supStep === 'submitted' && <StepSubmitted {...props} />}
      </Box>
    </Box>
  );
}
