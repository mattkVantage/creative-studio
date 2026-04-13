import React from 'react';
import { Box } from '@mui/material';
import QueuePanel from './retailer/QueuePanel';
import ReviewPanel from './retailer/ReviewPanel';
import ActionsPanel from './retailer/ActionsPanel';

export default function RetailerView(props) {
  const {
    submissions, tabConfig, selectedSubmissionId, retTab,
    manualChecks, activatedChannels, atomicVisible,
    changesInputOpen, rejectInputOpen, selectedChangeTags,
    onSelectSub, onSetRetTab,
    onApprove, onSendChanges, onConfirmReject, onActivate,
    onToggleManual, onToggleChangesInput, onToggleRejectInput, onToggleChangeTag,
  } = props;

  const selectedSub = submissions.find(s => s.id === selectedSubmissionId) || null;

  return (
    <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
      <QueuePanel
        submissions={submissions}
        tabConfig={tabConfig}
        retTab={retTab}
        selectedSubmissionId={selectedSubmissionId}
        onSetRetTab={onSetRetTab}
        onSelectSub={onSelectSub}
      />
      <ReviewPanel
        selectedSub={selectedSub}
      />
      <ActionsPanel
        selectedSub={selectedSub}
        manualChecks={manualChecks}
        activatedChannels={activatedChannels}
        atomicVisible={atomicVisible}
        changesInputOpen={changesInputOpen}
        rejectInputOpen={rejectInputOpen}
        selectedChangeTags={selectedChangeTags}
        onApprove={onApprove}
        onSendChanges={onSendChanges}
        onConfirmReject={onConfirmReject}
        onActivate={onActivate}
        onToggleManual={onToggleManual}
        onToggleChangesInput={onToggleChangesInput}
        onToggleRejectInput={onToggleRejectInput}
        onToggleChangeTag={onToggleChangeTag}
      />
    </Box>
  );
}
