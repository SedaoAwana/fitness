import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const DatabaseTest = () => {
  const [testResult, setTestResult] = useState('Testing...');

  useEffect(() => {
    const testDatabase = async () => {
      try {
        console.log('🧪 Testing database connection...');
        
        // Test 1: Check if we can connect to Supabase
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        console.log('🧪 Auth test:', { user: user?.id, error: authError });
        
        // Test 2: Try to query user_profiles table
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .limit(1);
        
        console.log('🧪 Database test:', { data, error });
        
        if (error) {
          setTestResult(`❌ Database Error: ${error.message}`);
        } else {
          setTestResult('✅ Database connection working');
        }
      } catch (err) {
        console.error('🧪 Test failed:', err);
        setTestResult(`❌ Test failed: ${err.message}`);
      }
    };

    testDatabase();
  }, []);

  const containerStyles = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '12px',
    fontFamily: 'monospace',
    maxWidth: '300px',
    zIndex: 9999,
  };

  return (
    <div style={containerStyles}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>🧪 DB Test</div>
      <div>{testResult}</div>
    </div>
  );
};

export default DatabaseTest;
