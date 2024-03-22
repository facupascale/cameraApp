# Camera App

This is a mobile application built with React Native for capturing photos and videos using React Native Vision Camera and React Native Camera Roll libraries.

## Features

- Toggle between photo and video modes
- Switch between front and rear cameras
- Control flash settings
- Adjust frame rates (30 or 60 fps) in video mode
- Toggle HDR mode
- Choose between HD and maximum quality settings
- Control shutter sound
- Capture photos or record videos
- Display the 10 most recent photos in thumbnails

## Permissions

Upon entering the app, users are prompted to grant permissions for camera, microphone, and library access. If any of these permissions are denied, the app cannot be used and will display a screen showing the granted permissions and the missing ones. For the permission that has not been granted, there is a button to prompt the modal where users can authorize the app.

## Error Handling

If no camera is found, the app displays a screen indicating that no cameras are available. In case of any errors, a modal with the error message is displayed for a few seconds.

## Context Management

All camera-related information and functions are managed using Context to make them accessible from different components.

## Libraries Used

- [React Native Vision Camera](https://react-native-vision-camera.com/docs/guides)
- [React Native Camera Roll](https://github.com/react-native-cameraroll/react-native-camerarolll)
- [Context](https://react.dev/reference/react/createContext)
- [React Native SVG](https://github.com/software-mansion/react-native-svg/tree/main)
- [React Native SVG Transformer](https://github.com/kristerkari/react-native-svg-transformer)

## Scripts

- Install dependencies: `yarn`
- Install dependencies for iOS: `yarn run ios:install`
- Run the project on iOS: `yarn run ios`
- Run the project on Android: `yarn run android`

Feel free to customize and extend the app according to your needs!

For any questions or support, please contact [your contact information].
