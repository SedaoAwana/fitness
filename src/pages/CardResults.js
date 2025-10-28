import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { colors, spacing, typography, shadows, transitions } from '../design-tokens';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';

const CardResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { result, image } = location.state || {};

  if (!result || !image) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: spacing.lg,
        fontFamily: typography.fontFamily.primary,
      }}>
        <h2 style={{ color: colors.text.primary, marginBottom: spacing.lg }}>
          No scan results found
        </h2>
        <Button variant="primary" onClick={() => navigate('/')}>
          Return to Scanner
        </Button>
      </div>
    );
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`,
      padding: spacing.lg,
      fontFamily: typography.fontFamily.primary,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.xl,
      maxWidth: '800px',
      margin: '0 auto',
      paddingBottom: spacing.lg,
    },
    backButton: {
      backgroundColor: colors.background.primary,
      border: `1px solid ${colors.border.medium}`,
      borderRadius: '12px',
      padding: `${spacing.md} ${spacing.lg}`,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: transitions.normal,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      color: colors.text.primary,
      textDecoration: 'none',
    },
    title: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.text.primary,
    },
    content: {
      maxWidth: '800px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: spacing.xl,
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },
    imageSection: {
      backgroundColor: colors.background.primary,
      borderRadius: '20px',
      padding: spacing.xl,
      boxShadow: shadows.lg,
    },
    cardImage: {
      width: '100%',
      maxHeight: '400px',
      objectFit: 'contain',
      borderRadius: '12px',
      marginBottom: spacing.lg,
      boxShadow: shadows.md,
    },
    imageInfo: {
      fontSize: typography.fontSize.sm,
      color: colors.text.secondary,
      textAlign: 'center',
    },
    resultsSection: {
      backgroundColor: colors.background.primary,
      borderRadius: '20px',
      padding: spacing.xl,
      boxShadow: shadows.lg,
    },
    sectionTitle: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.bold,
      color: colors.text.primary,
      marginBottom: spacing.lg,
    },
    resultItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `${spacing.md} 0`,
      borderBottom: `1px solid ${colors.border.light}`,
    },
    resultLabel: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      color: colors.text.secondary,
    },
    resultValue: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      color: colors.text.primary,
      textAlign: 'right',
    },
    confidenceBar: {
      width: '100%',
      height: '8px',
      backgroundColor: colors.neutral[200],
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: spacing.sm,
    },
    confidenceFill: {
      height: '100%',
      backgroundColor: result?.confidence >= 80 ? colors.success[500] : 
                      result?.confidence >= 60 ? '#f39c12' : '#e74c3c',
      borderRadius: '4px',
      transition: transitions.normal,
    },
    valueHighlight: {
      backgroundColor: colors.primary[50],
      color: colors.primary[700],
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: '8px',
      fontWeight: typography.fontWeight.bold,
      fontSize: typography.fontSize.lg,
    },
    actionButtons: {
      marginTop: spacing.xl,
      display: 'flex',
      gap: spacing.md,
      flexWrap: 'wrap',
    },
  };

  const resultData = [
    { label: 'Card Name', value: result.cardName },
    { label: 'Set', value: result.cardSet },
    { label: 'Year', value: result.year },
    { label: 'Player/Character', value: result.player },
    { label: 'Team/Franchise', value: result.team },
    { label: 'Condition', value: result.condition },
    { label: 'Rarity', value: result.rarity },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.neutral[50];
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = colors.background.primary;
          }}
        >
          <Icon name="arrow-left" style={{ marginRight: spacing.sm }} />
          Back to Scanner
        </button>
        <h1 style={styles.title}>Scan Results</h1>
      </div>

      <div style={styles.content}>
        <div style={styles.imageSection}>
          <img
            src={image.preview}
            alt="Scanned card"
            style={styles.cardImage}
          />
          <p style={styles.imageInfo}>
            {image.name} • {(image.file.size / 1024).toFixed(1)} KB
          </p>
        </div>

        <div style={styles.resultsSection}>
          <h2 style={styles.sectionTitle}>Card Information</h2>
          
          {resultData.map((item, index) => (
            <div key={index} style={styles.resultItem}>
              <span style={styles.resultLabel}>{item.label}:</span>
              <span style={styles.resultValue}>{item.value}</span>
            </div>
          ))}

          <div style={{ ...styles.resultItem, borderBottom: 'none', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={styles.resultLabel}>Estimated Value:</span>
            <span style={{ ...styles.resultValue, ...styles.valueHighlight, marginTop: spacing.sm }}>
              {result.estimatedValue}
            </span>
          </div>

          <div style={{ marginTop: spacing.lg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm }}>
              <span style={styles.resultLabel}>Confidence Score:</span>
              <span style={styles.resultValue}>{result.confidence}%</span>
            </div>
            <div style={styles.confidenceBar}>
              <div 
                style={{
                  ...styles.confidenceFill,
                  width: `${result.confidence}%`
                }}
              />
            </div>
          </div>

          <div style={styles.actionButtons}>
            <Button
              variant="primary"
              size="medium"
              onClick={() => navigate('/collection')}
            >
              <Icon name="plus" style={{ marginRight: spacing.sm }} />
              Add to Collection
            </Button>
            <Button
              variant="secondary"
              size="medium"
              onClick={() => navigate('/')}
            >
              Scan Another Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResults;