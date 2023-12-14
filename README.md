# HOW RUN THE PROJECT

npm start = to start the project
npx react-native run-android = to build the react native and then run in android device

cd android &&./gradlew clean = to clean the gradle

git rm -r --cached <filename>

# HOW TO REGENERATE ANDROID FOLDER

1. sudo rm -rf android/ ios/
2. yarn add react-native-eject
3. npx react-native eject


react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
