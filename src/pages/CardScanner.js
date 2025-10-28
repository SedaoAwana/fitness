import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography, shadows, transitions } from '../design-tokens';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';
import LoadingSpinner from '../components/LoadingSpinner';

const CardScanner = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const handleImageUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage({
          file,
          preview: e.target.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCameraCapture = useCallback(() => {
    // Trigger file input for camera access on mobile
    fileInputRef.current?.click();
  }, []);

  const handleScanCard = useCallback(async () => {
    if (!selectedImage) return;
    
    setIsScanning(true);
    
    // Simulate API call to backend for card analysis
    try {
      if (debugMode) {
        console.log('🔍 Debug: Starting card analysis...');
        console.log('📷 Image details:', {
          name: selectedImage.name,
          size: selectedImage.file.size,
          type: selectedImage.file.type
        });
      }
      
      // Mock API call - replace with actual backend integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult = {
        cardName: 'Michael Jordan 1997 Upper Deck',
        cardSet: 'Upper Deck Basketball',
        year: '1997',
        player: 'Michael Jordan',
        team: 'Chicago Bulls',
        condition: 'Near Mint',
        estimatedValue: '$450-650',
        rarity: 'Rare',
        confidence: 92
      };
      
      if (debugMode) {
        console.log('✅ Debug: Analysis complete');
        console.log('📊 Results:', mockResult);
      }
      
      // Navigate to results page with data
      navigate('/results', { state: { result: mockResult, image: selectedImage } });
      
    } catch (error) {
      console.error('❌ Scan failed:', error);
      if (debugMode) {
        console.log('🐛 Debug: Error details:', error);
      }
    } finally {
      setIsScanning(false);
    }
  }, [selectedImage, debugMode, navigate]);

  const styles = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.secondary[50]} 100%)`,
      padding: spacing.lg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: typography.fontFamily.primary,
    },
    header: {
      textAlign: 'center',
      marginBottom: spacing.xxxl,
      width: '100%',
      maxWidth: '600px',
    },
    title: {
      fontSize: typography.fontSize['3xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.text.primary,
      marginBottom: spacing.md,
      lineHeight: typography.lineHeight.tight,
    },
    subtitle: {
      fontSize: typography.fontSize.lg,
      color: colors.text.secondary,
      lineHeight: typography.lineHeight.normal,
    },
    scannerCard: {
      backgroundColor: colors.background.primary,
      borderRadius: '20px',
      padding: spacing.xxxl,
      boxShadow: shadows.lg,
      width: '100%',
      maxWidth: '500px',
      textAlign: 'center',
      border: `2px dashed ${selectedImage ? colors.primary[300] : colors.border.medium}`,
      transition: transitions.normal,
    },
    uploadArea: {
      cursor: selectedImage ? 'default' : 'pointer',
      padding: spacing.xxxl,
      borderRadius: '15px',
      transition: transitions.normal,
    },
    imagePreview: {
      width: '100%',
      maxWidth: '300px',
      maxHeight: '400px',
      objectFit: 'contain',
      borderRadius: '12px',
      marginBottom: spacing.lg,
      boxShadow: shadows.md,
    },
    placeholderIcon: {
      fontSize: '64px',
      color: colors.text.tertiary,
      marginBottom: spacing.lg,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.md,
      width: '100%',
      maxWidth: '300px',
      marginTop: spacing.lg,
    },
    debugToggle: {
      position: 'fixed',
      top: spacing.lg,
      right: spacing.lg,
      backgroundColor: debugMode ? colors.primary[500] : colors.neutral[200],
      color: debugMode ? colors.text.inverse : colors.text.primary,
      border: 'none',
      borderRadius: '20px',
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      cursor: 'pointer',
      transition: transitions.normal,
      boxShadow: shadows.sm,
    },
    hiddenInput: {
      display: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.debugToggle}
        onClick={() => setDebugMode(!debugMode)}
      >
        🐛 Debug {debugMode ? 'ON' : 'OFF'}
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>Trading Card Scanner</h1>
        <p style={styles.subtitle}>
          Scan your trading cards and sports cards to get instant information and valuations
        </p>
      </div>

      <div style={styles.scannerCard}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageUpload}
          style={styles.hiddenInput}
        />

        <div
          style={styles.uploadArea}
          onClick={!selectedImage ? handleCameraCapture : undefined}
        >
          {selectedImage ? (
            <img
              src={selectedImage.preview}
              alt="Selected card"
              style={styles.imagePreview}
            />
          ) : (
            <>
              <div style={styles.placeholderIcon}>📷</div>
              <h3 style={{ color: colors.text.primary, marginBottom: spacing.md }}>
                Tap to scan a card
              </h3>
              <p style={{ color: colors.text.secondary, fontSize: typography.fontSize.sm }}>
                Take a photo or upload an image of your trading card
              </p>
            </>
          )}
        </div>

        <div style={styles.buttonContainer}>
          {!selectedImage ? (
            <>
              <Button
                variant="primary"
                size="large"
                onClick={handleCameraCapture}
                disabled={isScanning}
              >
                <Icon name="camera" style={{ marginRight: spacing.sm }} />
                Take Photo
              </Button>
              <Button
                variant="secondary"
                size="large"
                onClick={handleCameraCapture}
                disabled={isScanning}
              >
                <Icon name="upload" style={{ marginRight: spacing.sm }} />
                Upload Image
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="primary"
                size="large"
                onClick={handleScanCard}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <LoadingSpinner size="small" style={{ marginRight: spacing.sm }} />
                    Analyzing Card...
                  </>
                ) : (
                  <>
                    <Icon name="search" style={{ marginRight: spacing.sm }} />
                    Scan Card
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                size="medium"
                onClick={() => setSelectedImage(null)}
                disabled={isScanning}
              >
                Choose Different Image
              </Button>
            </>
          )}
        </div>
      </div>

      {debugMode && selectedImage && (
        <div style={{
          marginTop: spacing.xl,
          padding: spacing.lg,
          backgroundColor: colors.neutral[900],
          color: colors.text.inverse,
          borderRadius: '12px',
          fontFamily: 'monospace',
          fontSize: typography.fontSize.sm,
          maxWidth: '500px',
          width: '100%',
        }}>
          <h4 style={{ marginBottom: spacing.md, color: colors.primary[300] }}>
            🐛 Debug Information
          </h4>
          <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
            {JSON.stringify({
              fileName: selectedImage.name,
              fileSize: `${(selectedImage.file.size / 1024).toFixed(2)} KB`,
              fileType: selectedImage.file.type,
              timestamp: new Date().toISOString(),
            }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CardScanner;