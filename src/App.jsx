import React, { useState, useRef, useCallback } from 'react';
import {
  Box, AppBar, Toolbar, Typography, Button, Chip, ToggleButtonGroup,
  ToggleButton, Snackbar, Alert,
} from '@mui/material';
import LoginScreen from './components/LoginScreen';
import SupplierView from './components/SupplierView';
import RetailerView from './components/RetailerView';
import { INITIAL_SUBMISSIONS, INITIAL_TAB_CONFIG } from './data';

export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('cs_auth') === '1');

  // ── Role / navigation state ──
  const [role, setRoleState] = useState('supplier');

  // ── Supplier state ──
  const [supStep, setSupStep] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [headline, setHeadline] = useState('');
  const [subheading, setSubheading] = useState('');
  const [cta, setCta] = useState('Shop Now');
  const [includeLegal, setIncludeLegal] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);

  // ── Retailer state ──
  const [submissions, setSubmissions] = useState(() =>
    INITIAL_SUBMISSIONS.map(s => ({ ...s }))
  );
  const [tabConfig, setTabConfig] = useState(() =>
    JSON.parse(JSON.stringify(INITIAL_TAB_CONFIG))
  );
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);
  const [retTab, setRetTab] = useState('pending');
  const [manualChecks, setManualChecks] = useState({});
  const [activatedChannels, setActivatedChannels] = useState([]);
  const [atomicVisible, setAtomicVisible] = useState(false);
  const [changesInputOpen, setChangesInputOpen] = useState(false);
  const [rejectInputOpen, setRejectInputOpen] = useState(false);
  const [selectedChangeTags, setSelectedChangeTags] = useState([]);

  // ── Toast ──
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const showToast = (message, severity = 'success') =>
    setToast({ open: true, message, severity });

  // ── Auth ──
  const handleLogin = () => {
    sessionStorage.setItem('cs_auth', '1');
    setAuthed(true);
  };

  // ── Role setter ──
  const setRole = useCallback((r) => {
    setRoleState(r);
    if (r === 'supplier') setSupStep('templates');
  }, []);

  // ── Demo scenarios ──
  const loadScenario = (s) => {
    if (s === 'a') {
      setRetTab('pending');
      setSelectedSubmissionId('sub_a');
      setActivatedChannels([]);
      setAtomicVisible(false);
      setChangesInputOpen(false);
      setRejectInputOpen(false);
      setSelectedChangeTags([]);
      setRoleState('retailer');
    } else if (s === 'b') {
      setRetTab('pending');
      setSelectedSubmissionId('sub_b');
      setActivatedChannels([]);
      setAtomicVisible(false);
      setChangesInputOpen(false);
      setRejectInputOpen(false);
      setSelectedChangeTags([]);
      setRoleState('retailer');
    } else if (s === 'c') {
      setRetTab('approved');
      setSelectedSubmissionId('sub_c');
      setAtomicVisible(true);
      setChangesInputOpen(false);
      setRejectInputOpen(false);
      setSelectedChangeTags([]);
      setRoleState('retailer');
    }
  };

  // ── Retailer actions ──
  const approveSubmission = (id) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    setTabConfig(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.approved.ids.includes(id)) next.approved.ids.unshift(id);
      next.pending.ids = next.pending.ids.filter(i => i !== id);
      next.revisions.ids = next.revisions.ids.filter(i => i !== id);
      return next;
    });
    setAtomicVisible(true);
    setRetTab('approved');
    setSelectedSubmissionId(id);
    showToast('Submission approved');
  };

  const sendChangesRequest = (id) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'revisions' } : s));
    setTabConfig(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.revisions.ids.includes(id)) next.revisions.ids.push(id);
      next.pending.ids = next.pending.ids.filter(i => i !== id);
      return next;
    });
    setRetTab('revisions');
    setChangesInputOpen(false);
    setSelectedChangeTags([]);
    showToast('Changes requested');
  };

  const confirmReject = (id) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
    setTabConfig(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next.rejected.ids.includes(id)) next.rejected.ids.push(id);
      next.pending.ids = next.pending.ids.filter(i => i !== id);
      return next;
    });
    setRetTab('rejected');
    setRejectInputOpen(false);
    showToast('Submission rejected', 'error');
  };

  const activateChannels = () => {
    setActivatedChannels(['email', 'dv360', 'ttd', 'onsite', 'meta', 'pinterest']);
    showToast('Creative activated — live in ~2 hours');
  };

  const selectSub = (id) => {
    setSelectedSubmissionId(id);
    setChangesInputOpen(false);
    setRejectInputOpen(false);
    setSelectedChangeTags([]);
  };

  const setRetTabAndClear = (tab) => {
    setRetTab(tab);
    setSelectedSubmissionId(null);
    setChangesInputOpen(false);
    setRejectInputOpen(false);
    setSelectedChangeTags([]);
  };

  const toggleManual = (key) => {
    setManualChecks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleChangeTag = (tag) => {
    setSelectedChangeTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  if (!authed) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const statusLabel = role === 'supplier' ? 'Supplier' : 'Retailer Admin';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* ── Topbar ── */}
      <AppBar position="static" sx={{ bgcolor: '#1E3A5F', zIndex: 10, flexShrink: 0 }}>
        <Toolbar variant="dense" sx={{ minHeight: 52, gap: 1.5, px: 2 }}>
          {/* Logo */}
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap', mr: 1 }}
          >
            Vantage <Box component="span" sx={{ color: '#F97316' }}>Creative Studio</Box>
          </Typography>

          {/* Role toggle */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ background: 'rgba(255,255,255,0.12)', borderRadius: '20px', p: '3px', display: 'flex' }}>
              {['supplier', 'retailer'].map((r) => (
                <Box
                  key={r}
                  component="button"
                  onClick={() => setRole(r)}
                  sx={{
                    px: 2, py: '5px', fontSize: 12, fontWeight: 600, fontFamily: "Calibri, 'Segoe UI', sans-serif",
                    border: 'none', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.15s',
                    background: role === r ? '#fff' : 'transparent',
                    color: role === r ? '#1E3A5F' : 'rgba(255,255,255,0.65)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r === 'supplier' ? 'Supplier' : 'Retailer Admin'}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Demo buttons + status */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {['a', 'b', 'c'].map((s) => (
              <Box
                key={s}
                component="button"
                onClick={() => loadScenario(s)}
                sx={{
                  px: '11px', py: '5px', fontSize: 11, fontWeight: 600,
                  fontFamily: "Calibri, 'Segoe UI', sans-serif",
                  background: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '5px', cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  '&:hover': { background: 'rgba(255,255,255,0.22)' },
                }}
              >
                {s === 'a' ? 'Demo A: Happy Path' : s === 'b' ? 'Demo B: AI Flag' : 'Demo C: Atomic Assets'}
              </Box>
            ))}
            <Box sx={{
              background: 'rgba(255,255,255,0.15)', px: '10px', py: '4px',
              borderRadius: '4px', fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap',
            }}>
              {statusLabel}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Workspace ── */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        {role === 'supplier' ? (
          <SupplierView
            supStep={supStep}
            setSupStep={setSupStep}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            headline={headline}
            setHeadline={setHeadline}
            subheading={subheading}
            setSubheading={setSubheading}
            cta={cta}
            setCta={setCta}
            includeLegal={includeLegal}
            setIncludeLegal={setIncludeLegal}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            showToast={showToast}
          />
        ) : (
          <RetailerView
            submissions={submissions}
            tabConfig={tabConfig}
            selectedSubmissionId={selectedSubmissionId}
            retTab={retTab}
            manualChecks={manualChecks}
            activatedChannels={activatedChannels}
            atomicVisible={atomicVisible}
            changesInputOpen={changesInputOpen}
            rejectInputOpen={rejectInputOpen}
            selectedChangeTags={selectedChangeTags}
            onSelectSub={selectSub}
            onSetRetTab={setRetTabAndClear}
            onApprove={approveSubmission}
            onSendChanges={sendChangesRequest}
            onConfirmReject={confirmReject}
            onActivate={activateChannels}
            onToggleManual={toggleManual}
            onToggleChangesInput={() => { setChangesInputOpen(p => !p); setRejectInputOpen(false); }}
            onToggleRejectInput={() => { setRejectInputOpen(p => !p); setChangesInputOpen(false); }}
            onToggleChangeTag={toggleChangeTag}
          />
        )}
      </Box>

      {/* ── Toast ── */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast(t => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={toast.severity} onClose={() => setToast(t => ({ ...t, open: false }))}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
