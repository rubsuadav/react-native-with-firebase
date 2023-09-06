You can follow the documentation here:
https://docs.expo.dev/guides/using-firebase/
Deploys to Firebase Hosting:
'https://subcripciones-9d96d.web.app/'

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c06f896ede2d42b8809488e98a4c68b2)](https://app.codacy.com/gh/rubsuadav/react-native-with-firebase?utm_source=github.com&utm_medium=referral&utm_content=rubsuadav/react-native-with-firebase&utm_campaign=Badge_Grade)

![Test Badge](https://github.com/rubsuadav/react-native-with-firebase/actions/workflows/tests.yml/badge.svg)
![Hosting Badge](https://github.com/rubsuadav/react-native-with-firebase/actions/workflows/firebase-hosting-merge.yml/badge.svg)
![Codacy Badge](https://github.com/rubsuadav/react-native-with-firebase/actions/workflows/analysis.yml/badge.svg)

## FOR SUBCRIPTIONS' IMPLEMENTANTION

https://github.com/invertase/stripe-firebase-extensions/blob/next/firestore-stripe-payments/POSTINSTALL.md

## FOR FIREBASE EMULATORS' IMPLEMENTANTION

https://firebase.google.com/docs/emulator-suite/install_and_configure?hl=es-419

## Available Scripts

In the project directory, you can run:

# For installing the dependencies: (This script should be eject previously to other because is neseccary for doing the others operations)

```bash
npm install
```

### For running the app on web:

```bash
npm run web
```

### For running the app on android you must previously open android studio: (You must have android studio installed and configured with a device)

```bash
npm run android
```

## For export the app to web:

```bash
npm run predeploy
```

# For deploy the app to web:

```bash
npm run deploy
```

## For testing the app you must follow this steps:

1. Check java version (with the last version of firebase emulators you must have java version >= 15, recommeded version 17):

```bash
java -version
```

2. If you have a java version < 15 go to this link and download the executable: (if you have a java version >= 15 you can skip the folowwing steps and go to step 6)

```bash
https://www.oracle.com/java/technologies/downloads/#jdk17-windows
```

3. Open the executable and follow the instructions to install the java version thats you choose.

4. After instalation finish you must set the java version in your system variables:

```bash
Go to: Control Panel > System and Security > System > Advanced System Settings > Environment Variables > System Variables > Path
```

In path variable you must add the path of the java version that you installed and put it on the top of the variable, for example:

```bash
C:\Program Files\Java\jdk-17\bin
```

5. Check that the java version is setted:

```bash
java -version
```

6. Intall firebase CLI:

```bash
npm install -g firebase-tools
```

7. Run the firebase emulators:

```bash
npm run fb:emulators
```

8. When emulators are running you can run the tests:

```bash
npm run test
```

# IF YOU HAVE A CACHED PROCESS USING THE EMULATOR'S PORT YOU CAN FOLLOW THIS STEPS FOR KILL IT:

1. Open a cmd and find the process:

```bash
netstat -ano | findstr :port-number
```

The output will be a line like this:

```bash
TCP/UDP   IP:PORT (ORIGIN)  IP:PORT (DEST)  LISTENING  process-id
```

2. Kill the process using the process-id:

```bash
taskkill /PID process-id /F
```

3. Check that the process is killed:

```bash
netstat -ano | findstr: port-number
```

The output will be empty if the process is killed.
