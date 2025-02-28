import React from 'react';
import {Platform, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

const styles = {
  safearea: {
    flex: 1,
  },
};

const App = () => {
  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        source={{
          uri:
            Platform.OS === 'android'
              ? 'http://10.0.2.2:3000'
              : 'http://localhost:3000',
        }}
      />
    </SafeAreaView>
  );
};

export default App;
