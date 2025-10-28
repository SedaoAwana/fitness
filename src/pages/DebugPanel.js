import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors, spacing, typography, shadows, transitions } from '../design-tokens';
import Button from '../components/atoms/Button';
import Icon from '../components/atoms/Icon';

const DebugPanel = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [apiStatus, setApiStatus] = useState('disconnected');
  const [systemInfo, setSystemInfo] = useState({});

  useEffect(() => {
    // Mock debug data
    const mockLogs = [
      {
        id: 1,
        timestamp: new Date().toISOString(),
        level: 'INFO',
        message: 'Application started',
        component: 'App'
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 1000).toISOString(),
        level: 'INFO',
        message: 'Camera permissions granted',
        component: 'CardScanner'
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 2000).toISOString(),
        level: 'DEBUG',
        message: 'Image uploaded: jordan.jpg (256KB)',
        component: 'CardScanner'
      },
      {
        id: 4,
        timestamp: new Date(Date.now() - 3000).toISOString(),
        level: 'INFO',
        message: 'API call started: /analyze-card',
        component: 'CardAnalysis'
      },
      {
        id: 5,
        timestamp: new Date(Date.now() - 5000).toISOString(),
        level: 'SUCCESS',
        message: 'Card analysis completed (92% confidence)',
        component: 'CardAnalysis'
      },
    ];

    setLogs(mockLogs);
    setApiStatus('connected');
    setSystemInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      screenResolution: `${screen.width}x${screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      colorDepth: screen.colorDepth,
    });
  }, []);

  const testApiConnection = async () => {
    setApiStatus('testing');
    
    // Simulate API test
    setTimeout(() => {
      const isConnected = Math.random() > 0.3; // 70% success rate
      setApiStatus(isConnected ? 'connected' : 'error');
      
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toISOString(),
        level: isConnected ? 'SUCCESS' : 'ERROR',
        message: isConnected ? 'API connection test successful' : 'API connection test failed',
        component: 'DebugPanel'
      };
      
      setLogs(prevLogs => [newLog, ...prevLogs]);
    }, 2000);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const downloadLogs = () => {
    const logData = logs.map(log => 
      `[${log.timestamp}] ${log.level}: ${log.message} (${log.component})`
    ).join('\n');
    
    const blob = new Blob([logData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-logs-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return colors.success[500];
      case 'testing': return colors.primary[400];
      case 'error': return colors.error?.light || '#e74c3c';
      default: return colors.neutral[400];
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return colors.error?.light || '#e74c3c';
      case 'SUCCESS': return colors.success[500];
      case 'INFO': return colors.primary[500];
      case 'DEBUG': return colors.neutral[600];
      default: return colors.text.primary;
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.neutral[900]} 0%, ${colors.neutral[800]} 100%)`,
      padding: spacing.lg,
      fontFamily: typography.fontFamily.primary,
      color: colors.text.inverse,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.xl,
      maxWidth: '1200px',
      margin: '0 auto',
      paddingBottom: spacing.lg,
      borderBottom: `1px solid ${colors.neutral[700]}`,
    },
    backButton: {
      backgroundColor: colors.neutral[700],
      border: `1px solid ${colors.neutral[600]}`,
      borderRadius: '12px',
      padding: `${spacing.md} ${spacing.lg}`,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: transitions.normal,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      color: colors.text.inverse,
      textDecoration: 'none',
    },
    title: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.text.inverse,
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: spacing.xl,
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },
    section: {
      backgroundColor: colors.neutral[800],
      borderRadius: '12px',
      padding: spacing.xl,
      border: `1px solid ${colors.neutral[700]}`,
    },
    sectionTitle: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: colors.text.inverse,
      marginBottom: spacing.lg,
      display: 'flex',
      alignItems: 'center',
    },
    statusIndicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: getStatusColor(apiStatus),
      marginLeft: spacing.sm,
      animation: apiStatus === 'testing' ? 'pulse 1s infinite' : 'none',
    },
    logContainer: {
      backgroundColor: colors.neutral[900],
      borderRadius: '8px',
      padding: spacing.lg,
      maxHeight: '400px',
      overflowY: 'auto',
      fontFamily: 'Monaco, "Courier New", monospace',
      fontSize: typography.fontSize.sm,
      border: `1px solid ${colors.neutral[700]}`,
    },
    logEntry: {
      marginBottom: spacing.sm,
      paddingBottom: spacing.sm,
      borderBottom: `1px solid ${colors.neutral[800]}`,
    },
    logHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xs,
    },
    logLevel: {
      fontWeight: typography.fontWeight.bold,
      fontSize: typography.fontSize.xs,
      padding: `2px 6px`,
      borderRadius: '4px',
      backgroundColor: colors.neutral[700],
    },
    logTimestamp: {
      fontSize: typography.fontSize.xs,
      color: colors.neutral[400],
    },
    logMessage: {
      color: colors.text.inverse,
      lineHeight: typography.lineHeight.normal,
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: spacing.md,
    },
    infoItem: {
      padding: spacing.md,
      backgroundColor: colors.neutral[900],
      borderRadius: '8px',
      border: `1px solid ${colors.neutral[700]}`,
    },
    infoLabel: {
      fontSize: typography.fontSize.xs,
      color: colors.neutral[400],
      marginBottom: spacing.xs,
      textTransform: 'uppercase',
      fontWeight: typography.fontWeight.medium,
    },
    infoValue: {
      fontSize: typography.fontSize.sm,
      color: colors.text.inverse,
      wordBreak: 'break-all',
    },
    buttonContainer: {
      display: 'flex',
      gap: spacing.md,
      marginTop: spacing.lg,
      flexWrap: 'wrap',
    },
    fullWidth: {
      gridColumn: '1 / -1',
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
      
      <div style={styles.header}>
        <button
          style={styles.backButton}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = colors.neutral[600];
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = colors.neutral[700];
          }}
        >
          <Icon name="arrow-left" style={{ marginRight: spacing.sm }} />
          Back to Scanner
        </button>
        <h1 style={styles.title}>
          🐛 Debug Panel
        </h1>
      </div>

      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            API Status
            <div style={styles.statusIndicator} />
          </h2>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Connection Status</div>
              <div style={styles.infoValue}>
                {apiStatus === 'connected' && '✅ Connected'}
                {apiStatus === 'testing' && '🔄 Testing...'}
                {apiStatus === 'error' && '❌ Error'}
                {apiStatus === 'disconnected' && '⭕ Disconnected'}
              </div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Last Test</div>
              <div style={styles.infoValue}>
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <Button
              variant="primary"
              size="medium"
              onClick={testApiConnection}
              disabled={apiStatus === 'testing'}
            >
              {apiStatus === 'testing' ? 'Testing...' : 'Test API Connection'}
            </Button>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>System Information</h2>
          
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Platform</div>
              <div style={styles.infoValue}>{systemInfo.platform}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Language</div>
              <div style={styles.infoValue}>{systemInfo.language}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Screen Resolution</div>
              <div style={styles.infoValue}>{systemInfo.screenResolution}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Viewport</div>
              <div style={styles.infoValue}>{systemInfo.viewport}</div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Online Status</div>
              <div style={styles.infoValue}>
                {systemInfo.onLine ? '✅ Online' : '❌ Offline'}
              </div>
            </div>
            <div style={styles.infoItem}>
              <div style={styles.infoLabel}>Cookies Enabled</div>
              <div style={styles.infoValue}>
                {systemInfo.cookieEnabled ? '✅ Yes' : '❌ No'}
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...styles.section, ...styles.fullWidth }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
            <h2 style={styles.sectionTitle}>Debug Logs ({logs.length})</h2>
            <div style={styles.buttonContainer}>
              <Button variant="secondary" size="small" onClick={clearLogs}>
                Clear Logs
              </Button>
              <Button variant="primary" size="small" onClick={downloadLogs}>
                Download Logs
              </Button>
            </div>
          </div>
          
          <div style={styles.logContainer}>
            {logs.length === 0 ? (
              <div style={{ textAlign: 'center', color: colors.neutral[400], padding: spacing.xl }}>
                No logs available
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} style={styles.logEntry}>
                  <div style={styles.logHeader}>
                    <span
                      style={{
                        ...styles.logLevel,
                        color: getLevelColor(log.level),
                      }}
                    >
                      {log.level}
                    </span>
                    <span style={styles.logTimestamp}>
                      {new Date(log.timestamp).toLocaleTimeString()} • {log.component}
                    </span>
                  </div>
                  <div style={styles.logMessage}>{log.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;