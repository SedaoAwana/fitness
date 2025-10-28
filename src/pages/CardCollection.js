import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography, shadows, transitions } from '../design-tokens';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';

const CardCollection = () => {
  const navigate = useNavigate();
  const [collection, setCollection] = useState([]);
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterBy, setFilterBy] = useState('all');

  useEffect(() => {
    // Mock collection data - in real app, this would come from backend/localStorage
    const mockCollection = [
      {
        id: 1,
        cardName: 'Michael Jordan 1997 Upper Deck',
        player: 'Michael Jordan',
        year: '1997',
        estimatedValue: '$450-650',
        condition: 'Near Mint',
        dateAdded: '2024-10-28',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIyNjAiIHJ4PSI4IiBmaWxsPSIjRTJFOEYwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM0QTVTNjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNhcmQgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=',
      },
      {
        id: 2,
        cardName: 'Pikachu Base Set 1998',
        player: 'Pikachu',
        year: '1998',
        estimatedValue: '$200-350',
        condition: 'Excellent',
        dateAdded: '2024-10-27',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRkZGM0NEIi8+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIyNjAiIHJ4PSI4IiBmaWxsPSIjRkVENzAwIi8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMzQzRBNDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNhcmQgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=',
      },
      {
        id: 3,
        cardName: 'Tom Brady 2000 Playoff Contenders',
        player: 'Tom Brady',
        year: '2000',
        estimatedValue: '$800-1200',
        condition: 'Mint',
        dateAdded: '2024-10-26',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI4MCIgdmlld0JveD0iMCAwIDIwMCAyODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjgwIiBmaWxsPSIjRjBGOUZGIi8+CjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIyNjAiIHJ4PSI4IiBmaWxsPSIjM0Y4M0Y4Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTQwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNGRkZGRkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNhcmQgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=',
      },
    ];
    setCollection(mockCollection);
  }, []);

  const sortedAndFilteredCollection = collection
    .filter(card => {
      if (filterBy === 'all') return true;
      if (filterBy === 'basketball') return card.player === 'Michael Jordan';
      if (filterBy === 'pokemon') return card.player === 'Pikachu';
      if (filterBy === 'football') return card.player === 'Tom Brady';
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'dateAdded') return new Date(b.dateAdded) - new Date(a.dateAdded);
      if (sortBy === 'value') return parseInt(b.estimatedValue.match(/\d+/)[0]) - parseInt(a.estimatedValue.match(/\d+/)[0]);
      if (sortBy === 'name') return a.cardName.localeCompare(b.cardName);
      return 0;
    });

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
      maxWidth: '1200px',
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
    controls: {
      maxWidth: '1200px',
      margin: '0 auto',
      marginBottom: spacing.xl,
      display: 'flex',
      gap: spacing.lg,
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    select: {
      padding: `${spacing.md} ${spacing.lg}`,
      borderRadius: '12px',
      border: `1px solid ${colors.border.medium}`,
      backgroundColor: colors.background.primary,
      fontSize: typography.fontSize.base,
      color: colors.text.primary,
      cursor: 'pointer',
      outline: 'none',
      transition: transitions.normal,
    },
    grid: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: spacing.xl,
    },
    card: {
      backgroundColor: colors.background.primary,
      borderRadius: '20px',
      padding: spacing.xl,
      boxShadow: shadows.lg,
      transition: transitions.normal,
      cursor: 'pointer',
    },
    cardImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '12px',
      marginBottom: spacing.lg,
      backgroundColor: colors.neutral[100],
    },
    cardName: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: colors.text.primary,
      marginBottom: spacing.sm,
    },
    cardDetails: {
      fontSize: typography.fontSize.sm,
      color: colors.text.secondary,
      marginBottom: spacing.sm,
    },
    cardValue: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.bold,
      color: colors.primary[600],
      marginTop: spacing.md,
      padding: `${spacing.sm} ${spacing.md}`,
      backgroundColor: colors.primary[50],
      borderRadius: '8px',
      textAlign: 'center',
    },
    emptyState: {
      textAlign: 'center',
      padding: spacing.xxxl,
      color: colors.text.secondary,
    },
    stats: {
      maxWidth: '1200px',
      margin: '0 auto',
      marginBottom: spacing.xl,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: spacing.lg,
    },
    statCard: {
      backgroundColor: colors.background.primary,
      padding: spacing.lg,
      borderRadius: '12px',
      boxShadow: shadows.md,
      textAlign: 'center',
    },
    statValue: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.primary[600],
      marginBottom: spacing.sm,
    },
    statLabel: {
      fontSize: typography.fontSize.sm,
      color: colors.text.secondary,
      fontWeight: typography.fontWeight.medium,
    },
  };

  const totalValue = collection.reduce((sum, card) => {
    const value = parseInt(card.estimatedValue.match(/\d+/)[0]);
    return sum + value;
  }, 0);

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
        <h1 style={styles.title}>My Collection</h1>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{collection.length}</div>
          <div style={styles.statLabel}>Total Cards</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>${totalValue}+</div>
          <div style={styles.statLabel}>Estimated Value</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>
            {collection.filter(c => c.condition === 'Mint').length}
          </div>
          <div style={styles.statLabel}>Mint Condition</div>
        </div>
      </div>

      <div style={styles.controls}>
        <select
          style={styles.select}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="dateAdded">Sort by Date Added</option>
          <option value="value">Sort by Value</option>
          <option value="name">Sort by Name</option>
        </select>

        <select
          style={styles.select}
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="all">All Cards</option>
          <option value="basketball">Basketball</option>
          <option value="pokemon">Pokemon</option>
          <option value="football">Football</option>
        </select>

        <Button
          variant="primary"
          size="medium"
          onClick={() => navigate('/')}
        >
          <Icon name="plus" style={{ marginRight: spacing.sm }} />
          Add New Card
        </Button>
      </div>

      {sortedAndFilteredCollection.length === 0 ? (
        <div style={styles.emptyState}>
          <Icon name="folder" style={{ fontSize: '64px', marginBottom: spacing.lg }} />
          <h3>No cards found</h3>
          <p>Start scanning cards to build your collection!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {sortedAndFilteredCollection.map((card) => (
            <div
              key={card.id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = shadows.xl;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = shadows.lg;
              }}
            >
              <img
                src={card.imageUrl}
                alt={card.cardName}
                style={styles.cardImage}
              />
              <h3 style={styles.cardName}>{card.cardName}</h3>
              <p style={styles.cardDetails}>Player: {card.player}</p>
              <p style={styles.cardDetails}>Year: {card.year}</p>
              <p style={styles.cardDetails}>Condition: {card.condition}</p>
              <p style={styles.cardDetails}>Added: {new Date(card.dateAdded).toLocaleDateString()}</p>
              <div style={styles.cardValue}>{card.estimatedValue}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardCollection;