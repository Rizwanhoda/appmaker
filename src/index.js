import React from 'react';
import { AppmakerApp } from '@appmaker-xyz/react-native';
import { ApThemeProvider, styles } from '@appmaker-xyz/uikit';
import { setProject } from '@appmaker-xyz/app-config';
import './initApp';
import config from './config';

setProject({ id: config.projectId });
export default function CustomAppmakerApp() {
  return (
    <ApThemeProvider styles={styles}>
      <AppmakerApp />
    </ApThemeProvider>
  );
}

// export default App;
