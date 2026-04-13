import React, { useState } from 'react';
import {
  Box, Typography, Button, Checkbox, FormControlLabel, FormGroup,
  TextField, Chip, Alert,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmberOutlined';
import { todayStr, thirtyDaysStr } from '../../data';

const CHANNELS = [
  { id: 'email',     label: 'Email',                  sizes: '1 size' },
  { id: 'dv360',     label: 'DV360',                  sizes: '3 sizes' },
  { id: 'ttd',       label: 'The Trade Desk',          sizes: '3 sizes' },
  { id: 'onsite',    label: 'Home Depot On-site',      sizes: '11 sizes' },
  { id: 'meta',      label: 'Meta / Facebook',         sizes: '3 sizes' },
  { id: 'pinterest', label: 'Pinterest',               sizes: '1 size' },
];

const MANUAL_ITEMS = [
  { id: 'm1', label: 'Logo quality acceptable' },
  { id: 'm2', label: 'Imagery matches campaign theme' },
  { id: 'm3', label: 'CTA clear and compelling' },
  { id: 'm4', label: 'No competing brand mentions' },
  { id: 'm5', label: 'Pricing / offer is accurate' },
];

const CHANGE_TAGS = ['Copy', 'Image', 'Compliance', 'Brand', 'Other'];

// ── Atomic Diagram ──────────────────────────────────────────────
function AtomicDiagram() {
  const Box2 = ({ children, bg, color = '#fff' }) => (
    <Box sx={{
      background: bg, color, px: '10px', py: '6px',
      borderRadius: '6px', fontSize: 11, fontWeight: 700,
      textAlign: 'center', minWidth: 60, whiteSpace: 'nowrap',
    }}>
      {children}
    </Box>
  );

  return (
    <Box sx={{ mt: '12px' }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#6B7B8D', textTransform: 'uppercase', letterSpacing: '.5px', mb: '10px' }}>
        Atomic Asset Breakdown
      </Typography>

      {/* Master */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: '4px' }}>
        <Box2 bg="#1E3A5F">Master Creative</Box2>
      </Box>

      {/* Arrow */}
      <Box sx={{ textAlign: 'center', color: '#9BAFBF', fontSize: 14, mb: '4px' }}>↓</Box>

      {/* Components */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap', mb: '4px' }}>
        {['Text Layer', 'Image Layer', 'Logo Layer', 'Background'].map(l => (
          <Box2 key={l} bg="#43A047">{l}</Box2>
        ))}
      </Box>

      {/* Arrow */}
      <Box sx={{ textAlign: 'center', color: '#9BAFBF', fontSize: 14, mb: '4px' }}>↓</Box>

      {/* Channels */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap', mb: '4px' }}>
        {['Email', 'DV360', 'On-site', 'Meta'].map(c => (
          <Box2 key={c} bg="#F97316">{c}</Box2>
        ))}
      </Box>

      {/* Arrow */}
      <Box sx={{ textAlign: 'center', color: '#9BAFBF', fontSize: 14, mb: '4px' }}>↓</Box>

      {/* Output */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{
          background: '#EEF2F7', border: '2px solid #1E3A5F', color: '#1E3A5F',
          px: '14px', py: '8px', borderRadius: '8px', fontSize: 13, fontWeight: 800, textAlign: 'center',
        }}>
          18 Ad Variants — One Source of Truth
        </Box>
      </Box>
    </Box>
  );
}

// ── Activation Dashboard ────────────────────────────────────────
function ActivationDashboard({ onActivate, activatedChannels }) {
  const [checked, setChecked] = useState(CHANNELS.map(c => c.id));
  const [startDate, setStartDate] = useState(todayStr());
  const [endDate, setEndDate] = useState(thirtyDaysStr());
  const isLive = activatedChannels.length > 0;

  const toggle = (id) =>
    setChecked(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);

  return (
    <Box sx={{ mt: '14px', pt: '14px', borderTop: '1px solid #EDF1F5' }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#6B7B8D', textTransform: 'uppercase', letterSpacing: '.5px', mb: '10px' }}>
        Activate to Channels
      </Typography>

      {isLive ? (
        <Alert severity="success" sx={{ fontSize: 13, fontWeight: 600 }}>
          ✓ Creative Activated — Live in ~2 hours
        </Alert>
      ) : (
        <>
          <FormGroup sx={{ mb: '10px' }}>
            {CHANNELS.map(ch => (
              <FormControlLabel
                key={ch.id}
                control={
                  <Checkbox
                    checked={checked.includes(ch.id)}
                    onChange={() => toggle(ch.id)}
                    size="small"
                    sx={{ py: '3px', color: '#F97316', '&.Mui-checked': { color: '#F97316' } }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Typography sx={{ fontSize: 12 }}>{ch.label}</Typography>
                    <Typography sx={{ fontSize: 11, color: '#9BAFBF' }}>{ch.sizes}</Typography>
                  </Box>
                }
              />
            ))}
          </FormGroup>

          <Box sx={{ display: 'flex', gap: '8px', mb: '12px' }}>
            <TextField
              label="Start date"
              type="date"
              size="small"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1 }}
            />
            <TextField
              label="End date"
              type="date"
              size="small"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1 }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onActivate}
            sx={{ fontWeight: 700, py: '9px', fontSize: 13 }}
          >
            Activate to {checked.length} Channel{checked.length !== 1 ? 's' : ''} →
          </Button>
        </>
      )}
    </Box>
  );
}

// ── Main ActionsPanel ───────────────────────────────────────────
export default function ActionsPanel({
  selectedSub,
  manualChecks,
  activatedChannels,
  atomicVisible,
  changesInputOpen,
  rejectInputOpen,
  selectedChangeTags,
  onApprove,
  onSendChanges,
  onConfirmReject,
  onActivate,
  onToggleManual,
  onToggleChangesInput,
  onToggleRejectInput,
  onToggleChangeTag,
}) {
  const [changesText, setChangesText] = useState('');
  const [rejectText, setRejectText] = useState('');

  if (!selectedSub) {
    return (
      <Box sx={{
        width: 280, flexShrink: 0, bgcolor: '#fff',
        borderLeft: '1px solid #DDE3EA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Typography sx={{ color: '#9BAFBF', fontSize: 12, textAlign: 'center', px: 2 }}>
          Select a submission to see actions
        </Typography>
      </Box>
    );
  }

  const sub = selectedSub;
  const isApproved = sub.status === 'approved';

  return (
    <Box sx={{
      width: 280, flexShrink: 0, bgcolor: '#fff',
      borderLeft: '1px solid #DDE3EA',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      <Box sx={{ flex: 1, overflowY: 'auto', p: '14px 14px 20px' }}>

        {/* ── AI Compliance ── */}
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#6B7B8D', textTransform: 'uppercase', letterSpacing: '.5px', mb: '8px' }}>
          AI Compliance Report
        </Typography>

        <Box sx={{
          bgcolor: '#F9FAFB', border: '1px solid #EDF1F5', borderRadius: '8px', p: '10px', mb: '10px',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', mb: '8px' }}>
            <Box sx={{
              background: '#F3E8FF', color: '#7B1FA2', fontSize: 10, fontWeight: 700,
              px: '6px', py: '2px', borderRadius: '4px', border: '1px solid #E1BEF8',
            }}>
              ✦ AI Check
            </Box>
            <Typography sx={{ fontSize: 11, color: '#6B7B8D' }}>{sub.confidence}% confidence</Typography>
          </Box>

          {[
            { label: 'Logo placement: Detected, compliant', pass: true },
            { label: 'Text overlay: Readable, correct position', pass: true },
            { label: 'Brand colors: Within HD palette', pass: true },
            { label: sub.aiStatus === 'pass' ? `Copy tone: Matches HD voice (${sub.confidence}%)` : 'Copy tone: Issues detected', pass: sub.aiStatus === 'pass' },
            { label: 'Legal disclaimer: Present & formatted', pass: true },
            ...sub.aiIssues.map(issue => ({ label: issue, pass: false })),
          ].map((item, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: '6px', mb: '4px' }}>
              {item.pass
                ? <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#43A047', mt: '1px', flexShrink: 0 }} />
                : <WarningAmberIcon sx={{ fontSize: 14, color: '#FFA000', mt: '1px', flexShrink: 0 }} />
              }
              <Typography sx={{ fontSize: 11, color: item.pass ? '#1E3A5F' : '#E65100', lineHeight: 1.4 }}>
                {item.label}
              </Typography>
            </Box>
          ))}

          <Box sx={{ mt: '8px' }}>
            {sub.aiStatus === 'pass'
              ? <Alert severity="success" sx={{ py: '2px', fontSize: 11 }}>✓ Ready for Approval</Alert>
              : <Alert severity="warning" sx={{ py: '2px', fontSize: 11 }}>⚠ Issues Detected</Alert>
            }
          </Box>
        </Box>

        {/* ── Manual Checklist ── */}
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#6B7B8D', textTransform: 'uppercase', letterSpacing: '.5px', mb: '6px' }}>
          Manual Checklist
        </Typography>

        <FormGroup sx={{ mb: '14px' }}>
          {MANUAL_ITEMS.map(item => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  checked={!!manualChecks[item.id]}
                  onChange={() => onToggleManual(item.id)}
                  size="small"
                  sx={{ py: '3px', color: '#F97316', '&.Mui-checked': { color: '#F97316' } }}
                />
              }
              label={<Typography sx={{ fontSize: 12 }}>{item.label}</Typography>}
            />
          ))}
        </FormGroup>

        {/* ── Action Buttons ── */}
        {!isApproved && (
          <>
            <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#6B7B8D', textTransform: 'uppercase', letterSpacing: '.5px', mb: '8px' }}>
              Actions
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '7px', mb: '12px' }}>
              <Button
                variant="contained"
                color="success"
                fullWidth
                startIcon={<CheckCircleOutlineIcon />}
                onClick={() => onApprove(sub.id)}
                sx={{ fontWeight: 700 }}
              >
                Approve
              </Button>

              <Button
                variant="contained"
                color="warning"
                fullWidth
                onClick={onToggleChangesInput}
                sx={{ fontWeight: 700 }}
              >
                ↩ Request Changes
              </Button>

              {changesInputOpen && (
                <Box sx={{ bgcolor: '#FFFDE7', border: '1px solid #FFF176', borderRadius: '6px', p: '10px' }}>
                  <TextField
                    multiline
                    rows={2}
                    fullWidth
                    size="small"
                    placeholder="What needs to change?"
                    value={changesText}
                    onChange={e => setChangesText(e.target.value)}
                    sx={{ mb: '8px', fontSize: 12 }}
                  />
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', mb: '8px' }}>
                    {CHANGE_TAGS.map(tag => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        onClick={() => onToggleChangeTag(tag)}
                        color={selectedChangeTags.includes(tag) ? 'warning' : 'default'}
                        sx={{ fontWeight: 600, fontSize: 10, cursor: 'pointer' }}
                      />
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    color="warning"
                    size="small"
                    fullWidth
                    onClick={() => onSendChanges(sub.id)}
                    sx={{ fontWeight: 700 }}
                  >
                    Send Feedback
                  </Button>
                </Box>
              )}

              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={onToggleRejectInput}
                sx={{ fontWeight: 700 }}
              >
                ✗ Reject
              </Button>

              {rejectInputOpen && (
                <Box sx={{ bgcolor: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: '6px', p: '10px' }}>
                  <TextField
                    multiline
                    rows={2}
                    fullWidth
                    size="small"
                    placeholder="Reason for rejection..."
                    value={rejectText}
                    onChange={e => setRejectText(e.target.value)}
                    sx={{ mb: '8px' }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    fullWidth
                    onClick={() => onConfirmReject(sub.id)}
                    sx={{ fontWeight: 700 }}
                  >
                    Confirm Reject
                  </Button>
                </Box>
              )}
            </Box>
          </>
        )}

        {/* ── Atomic Diagram + Activation (shown when approved or atomicVisible) ── */}
        {(isApproved || atomicVisible) && (
          <>
            <AtomicDiagram />
            <ActivationDashboard onActivate={onActivate} activatedChannels={activatedChannels} />
          </>
        )}
      </Box>
    </Box>
  );
}
