import React, { useRef } from 'react';
import {
  Box, Typography, Alert, Button, MenuItem, Select,
  FormControlLabel, Checkbox, InputLabel, FormControl,
} from '@mui/material';
import { checkCompliance } from '../../data';
import AdPreview from './AdPreview';

export default function StepEditor(props) {
  const {
    setSupStep, selectedTemplate,
    headline, setHeadline,
    subheading, setSubheading,
    cta, setCta,
    includeLegal, setIncludeLegal,
    uploadedImage, setUploadedImage,
  } = props;

  const t = selectedTemplate;
  const c = t ? t.constraints : { headlineMax: 30, subMax: 60, cta: ['Shop Now'] };
  const compliance = checkCompliance(headline, subheading);
  const hlLen = headline.length;
  const subLen = subheading.length;
  const hlNearLimit = hlLen > Math.floor(c.headlineMax * 0.8);
  const subNearLimit = subLen > Math.floor(c.subMax * 0.8);
  const fileRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const labelStyle = {
    display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7B8D',
    textTransform: 'uppercase', letterSpacing: '0.5px', mb: '5px',
  };
  const inputStyle = {
    width: '100%', p: '8px 11px', fontSize: 13, fontFamily: "Calibri, 'Segoe UI', sans-serif",
    border: '1px solid #DDE3EA', borderRadius: '6px', color: '#1E3A5F', outline: 'none',
    transition: 'border-color 0.15s', background: '#fff', display: 'block',
    '&:focus': { borderColor: '#1E3A5F' },
  };

  return (
    <Box>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 12, color: '#9BAFBF', mb: '18px' }}>
        <Box
          component="span"
          onClick={() => setSupStep('templates')}
          sx={{ color: '#F97316', cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
        >
          ← Templates
        </Box>
        <span>›</span>
        <span>Editor</span>
      </Box>

      <Box sx={{ mb: '14px' }}>
        <Typography sx={{ fontSize: 17, fontWeight: 700, mb: '2px', color: '#1E3A5F' }}>{t?.name}</Typography>
        <Typography sx={{ fontSize: 12, color: '#6B7B8D' }}>Fill in your creative details below</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        {/* Preview column */}
        <Box sx={{ flex: '0 0 auto' }}>
          <Box sx={{ fontSize: 11, fontWeight: 700, color: '#6B7B8D', textTransform: 'uppercase', letterSpacing: '.5px', mb: '8px' }}>
            Live Preview (300×250)
          </Box>
          <AdPreview
            headline={headline}
            subheading={subheading}
            cta={cta}
            includeLegal={includeLegal}
            uploadedImage={uploadedImage}
          />
        </Box>

        {/* Form column */}
        <Box sx={{ flex: 1 }}>
          {/* Upload zone */}
          <Box
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
            sx={{
              border: '2px dashed #DDE3EA', borderRadius: '8px', p: '18px',
              textAlign: 'center', cursor: 'pointer', mb: '14px',
              transition: 'border-color 0.15s, background 0.15s', background: '#fafbfc',
              '&:hover': { borderColor: '#F97316', background: '#FFF8F3' },
            }}
          >
            <Box sx={{ fontSize: 22, color: '#9BAFBF', mb: '6px' }}>🖼</Box>
            <Box sx={{ fontSize: 12, color: '#6B7B8D' }}>
              {uploadedImage
                ? <><Box component="span" sx={{ color: '#F97316', fontWeight: 600 }}>Change Image</Box></>
                : <>Drag &amp; drop or <Box component="span" sx={{ color: '#F97316', fontWeight: 600 }}>click to upload</Box></>
              }
            </Box>
            {uploadedImage
              ? <Box sx={{ fontSize: 11, color: '#43A047', mt: '5px' }}>✓ Image loaded</Box>
              : <Box sx={{ fontSize: 11, color: '#9BAFBF', mt: '3px' }}>PNG, JPG, GIF up to 10MB</Box>
            }
          </Box>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />

          {/* Headline */}
          <Box sx={{ mb: '14px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '5px' }}>
              <Box sx={labelStyle}>Headline</Box>
              <Box sx={{ fontSize: 11, color: hlNearLimit ? '#E53935' : '#9BAFBF' }}>
                {hlLen}/{c.headlineMax} chars
              </Box>
            </Box>
            <Box
              component="input"
              type="text"
              maxLength={c.headlineMax}
              value={headline}
              onChange={e => setHeadline(e.target.value)}
              placeholder="Enter your headline..."
              sx={inputStyle}
            />
            <Box sx={{
              fontSize: 11, mt: '4px', display: 'flex', alignItems: 'flex-start', gap: '4px',
              lineHeight: 1.4, color: compliance.pass ? '#43A047' : '#E53935',
            }}>
              {compliance.pass
                ? '✓ Copy looks good — no superlatives detected'
                : '⚠ ' + compliance.issues.join(' · ')
              }
            </Box>
          </Box>

          {/* Subheading */}
          <Box sx={{ mb: '14px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: '5px' }}>
              <Box sx={labelStyle}>Subheading</Box>
              <Box sx={{ fontSize: 11, color: subNearLimit ? '#E53935' : '#9BAFBF' }}>
                {subLen}/{c.subMax} chars
              </Box>
            </Box>
            <Box
              component="textarea"
              maxLength={c.subMax}
              value={subheading}
              onChange={e => setSubheading(e.target.value)}
              placeholder="Enter your subheading..."
              rows={3}
              sx={{ ...inputStyle, resize: 'vertical', minHeight: '60px' }}
            />
          </Box>

          {/* CTA */}
          <Box sx={{ mb: '14px' }}>
            <Box sx={labelStyle}>Call to Action</Box>
            <Box
              component="select"
              value={cta}
              onChange={e => setCta(e.target.value)}
              sx={{ ...inputStyle, cursor: 'pointer' }}
            >
              {c.cta.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </Box>
          </Box>

          {/* Legal */}
          <Box sx={{ mb: '14px' }}>
            <Box
              component="label"
              sx={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 13, color: '#1E3A5F', cursor: 'pointer' }}
            >
              <input
                type="checkbox"
                checked={includeLegal}
                onChange={e => setIncludeLegal(e.target.checked)}
                style={{ width: 15, height: 15, accentColor: '#1E3A5F', cursor: 'pointer' }}
              />
              Include disclaimer / legal copy
            </Box>
          </Box>

          <Box sx={{ mt: '18px' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setSupStep('preview')}
              sx={{ px: '22px', py: '11px', fontSize: 14 }}
            >
              Preview All Sizes →
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
