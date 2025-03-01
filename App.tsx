import React, {useCallback, useRef} from 'react';
import {Platform, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

const styles = {
  safearea: {
    flex: 1,
  },
};

const App = () => {
  const webViewRef = useRef<WebView | null>(null);
  const sendMessageToWebview = useCallback(
    ({type, data}: {type: string; data?: any}) => {
      const message = JSON.stringify({type, data});
      webViewRef.current?.postMessage(message);
    },
    [],
  );

  const startRecord = useCallback(async () => {
    sendMessageToWebview({type: 'onStartRecord'});
  }, [sendMessageToWebview]);

  const stopRecord = useCallback(async () => {
    const data = {};
    sendMessageToWebview({type: 'onStopRecord', data});
  }, [sendMessageToWebview]);

  const pauseRecord = useCallback(async () => {
    sendMessageToWebview({type: 'onPauseRecord'});
  }, [sendMessageToWebview]);

  const resumeRecord = useCallback(async () => {
    sendMessageToWebview({type: 'onResumeRecord'});
  }, [sendMessageToWebview]);

  return (
    <SafeAreaView style={styles.safearea}>
      <WebView
        ref={webViewRef}
        source={{
          // uri: 'https://e488-148-252-146-50.ngrok-free.app/',
          uri:
            Platform.OS === 'android'
              ? 'http://10.0.2.2:3000'
              : 'http://localhost:3000',
        }}
        onMessage={event => {
          console.log(event.nativeEvent.data);
          const {type} = JSON.parse(event.nativeEvent.data);
          if (type === 'start-record') {
            startRecord();
          } else if (type === 'stop-record') {
            stopRecord();
          } else if (type === 'pause-record') {
            pauseRecord();
          } else if (type === 'resume-record') {
            resumeRecord();
          }
        }}
        webviewDebuggingEnabled
      />
    </SafeAreaView>
  );
};

export default App;
