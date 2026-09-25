# Salin: Real-Time FSL Translation

A React Native Expo application designed to translate Filipino Sign Language (FSL) gestures in real-time. The project leverages `react-native-vision-camera` paired with a globally injected `expo-vision-camera-v4-mediapipe` native C++ module, running complex hand-tracking Worklets on a background thread at high frame rates.

## Local Development Setup

To run the Metro bundler locally and serve JavaScript updates to your custom development client, use the following command:

```bash
npx expo start -c --dev-client
```

-c: Clears the Metro bundler cache to ensure modified Worklet dependencies and JavaScript closures are processed cleanly.
--dev-client: Directs the bundler to connect to the custom native APK rather than the standard Expo Go app.

EAS Cloud Build Instructions
Because the application relies on custom C++ MediaPipe binaries and a raw .task model file, it cannot run in Expo Go. You must compile a custom development APK using Expo Application Services (EAS).

Prior to building, ensure all critical files (app.json, assets/hand_landmarker.task, and source code) are firmly committed to Git. EAS Cloud Build ignores uncommitted local files and pulls strictly from your Git history.

```bash
git add .
git commit -m "Prepare for EAS development build"
eas build --platform android --profile development --clear-cache
```
Testing on a Physical Device
1.Follow these sequential steps to deploy and test the native MediaPipe engine on an Android device:

2.Execute the EAS build command above and allow the cloud compilation to complete.

3.Download the compiled .apk file using the URL provided in your terminal or via the online Expo Dashboard.

4.Completely uninstall any existing versions of the Salin app from your Android device to prevent native module cache conflicts or ghost builds.

5.Install the newly downloaded APK onto your physical Android device.

6.Start your local development server using the local setup command (npx expo start -c --dev-client).

7.Launch the Salin app on your device, grant the requested camera permissions, and scan the QR code or connect to your local Metro server URL.

8.Place your hands in the camera frame to verify the native MediaPipe engine is successfully tracking and rendering the emerald green landmark joints.
