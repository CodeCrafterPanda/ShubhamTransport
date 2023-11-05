import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from '@react-native-community/app-state';

const DownloadContext = createContext();

export const DownloadProvider = ({ children }) => {
  const [downloading, setDownloading] = useState([]);
  const [downloaded, setDownloaded] = useState([]);
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const loadData = async () => {
      const storedDownloading = await AsyncStorage.getItem('downloading');
      const storedDownloaded = await AsyncStorage.getItem('downloaded');
      if (storedDownloading) setDownloading(JSON.parse(storedDownloading));
      if (storedDownloaded) setDownloaded(JSON.parse(storedDownloaded));
    };
    loadData();
  }, []);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      // App has come to the foreground. Check the download status of videos.
      checkDownloads();
    }
    setAppState(nextAppState);
  };

  const checkDownloads = async () => {
    // For each video in the downloading list, check its download status asynchronously.
    // Let's simulate this with a promise that resolves after a set timeout for demonstration purposes.
    
    const checkDownloadStatus = (video) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulating checking the download status. 
                // In a real scenario, here you would make an API call or query a download manager.
                if (video.progress === 100) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }, 1000); // Simulating a 1 second delay per check.
        });
    };

    for (const video of downloading) {
        const isDownloaded = await checkDownloadStatus(video);
        if (isDownloaded) {
            moveToDownloaded(video.downloadid);
        }
    }
};

  const addToDownloading = (video) => {
    setDownloading(prev => [...prev, video]);
  };

  const updateProgress = (videoId, progress) => {
    setDownloading(prev => prev.map(video => {
      if (video.downloadid === videoId) {
        video.progress = progress;
      }
      return video;
    }));
    if (progress === 100) {
      moveToDownloaded(videoId);
    }
  };

  const moveToDownloaded = (videoId) => {
    const video = downloading.find(v => v.downloadid === videoId);
    if (video) {
      setDownloading(prev => prev.filter(v => v.downloadid !== videoId));
      setDownloaded(prev => [...prev, video]);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem('downloading', JSON.stringify(downloading));
    AsyncStorage.setItem('downloaded', JSON.stringify(downloaded));
  }, [downloading, downloaded]);

  return (
    <DownloadContext.Provider value={{ downloading, downloaded, addToDownloading, updateProgress, moveToDownloaded }}>
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownloads = () => {
    const context = useContext(DownloadContext);
    if (!context) {
        throw new Error('useDownloads must be used within a DownloadProvider');
    }
    return context;
};



// import React from 'react';
// import { Button } from 'react-native';
// import { useDownloads } from './path-to-this-file'; // Update the path accordingly

// const MyComponent = () => {
//     const { downloading, downloaded, addToDownloading, updateProgress, moveToDownloaded } = useDownloads();

//     const handleDownload = () => {
//         const newVideo = { 
//             downloadid: '124', 
//             downloadLocation: '/path/to/new/video', 
//             progress: 0 
//         };
//         addToDownloading(newVideo);
//     };

//     const handleUpdateProgress = () => {
//         // For the sake of demonstration, let's say we're updating the progress of video '124' to 50%
//         updateProgress('124', 50);
//     };

//     return (
//         <>
//             <Button title="Start Download" onPress={handleDownload} />
//             <Button title="Update Download Progress" onPress={handleUpdateProgress} />
//             {/* You can further render downloading and downloaded lists here */}
//         </>
//     );
// };

// export default MyComponent;
