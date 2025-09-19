import React, { useState } from 'react';
import { colors, spacing, typography } from '../design-tokens';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

const ProgressPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [newPhoto, setNewPhoto] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: '',
    file: null,
  });

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyles = {
    marginBottom: spacing.xl,
  };

  const titleStyles = {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  };

  const subtitleStyles = {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
  };

  const formStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  };

  const formRowStyles = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.md,
    marginBottom: spacing.md,
  };

  const photoGridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: spacing.lg,
  };

  const photoCardStyles = {
    backgroundColor: colors.background.secondary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: spacing.md,
    padding: spacing.md,
    textAlign: 'center',
  };

  const photoPlaceholderStyles = {
    width: '100%',
    height: '200px',
    backgroundColor: colors.neutral[100],
    borderRadius: spacing.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    fontSize: typography.fontSize['2xl'],
    color: colors.text.secondary,
  };

  const handleInputChange = (e) => {
    setNewPhoto({
      ...newPhoto,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhoto({
        ...newPhoto,
        file: file,
      });
    }
  };

  const handleAddPhoto = () => {
    if (newPhoto.date && newPhoto.file) {
      const photoData = {
        ...newPhoto,
        id: Date.now(),
        url: URL.createObjectURL(newPhoto.file),
      };
      setPhotos([photoData, ...photos]);
      setNewPhoto({
        date: new Date().toISOString().split('T')[0],
        notes: '',
        file: null,
      });
    }
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <h1 style={titleStyles}>Progress Photos</h1>
        <p style={subtitleStyles}>
          Track your transformation with progress photos and notes.
        </p>
      </div>

      <div style={formStyles}>
        <h3 style={{ marginBottom: spacing.lg, color: colors.text.primary }}>
          Add New Progress Photo
        </h3>
        
        <div style={formRowStyles}>
          <Input
            label="Date"
            name="date"
            type="date"
            value={newPhoto.date}
            onChange={handleInputChange}
          />
          <div>
            <label style={{
              display: 'block',
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.text.primary,
              marginBottom: spacing.xs,
            }}>
              Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                width: '100%',
                padding: spacing.sm,
                border: `1px solid ${colors.border.primary}`,
                borderRadius: spacing.sm,
                fontSize: typography.fontSize.sm,
              }}
            />
          </div>
        </div>
        
        <div style={{ marginBottom: spacing.md }}>
          <Input
            label="Notes (optional)"
            name="notes"
            value={newPhoto.notes}
            onChange={handleInputChange}
            placeholder="Add any notes about your progress..."
          />
        </div>
        
        <Button onClick={handleAddPhoto} style={{ width: '100%' }}>
          Add Photo
        </Button>
      </div>

      <div>
        <h3 style={{ marginBottom: spacing.lg, color: colors.text.primary }}>
          Your Progress Photos
        </h3>
        
        {photos.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: spacing.xl,
            color: colors.text.secondary,
          }}>
            <div style={{ fontSize: typography.fontSize['2xl'], marginBottom: spacing.md }}>
              📸
            </div>
            <p>No progress photos yet. Start by adding your first photo!</p>
          </div>
        ) : (
          <div style={photoGridStyles}>
            {photos.map((photo) => (
              <div key={photo.id} style={photoCardStyles}>
                <div style={photoPlaceholderStyles}>
                  📷
                </div>
                <div style={{
                  fontSize: typography.fontSize.sm,
                  color: colors.text.secondary,
                  marginBottom: spacing.xs,
                }}>
                  {new Date(photo.date).toLocaleDateString()}
                </div>
                {photo.notes && (
                  <div style={{
                    fontSize: typography.fontSize.sm,
                    color: colors.text.primary,
                    fontStyle: 'italic',
                  }}>
                    {photo.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPhotos;
