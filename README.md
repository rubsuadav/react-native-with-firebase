You can follow the documentation here:
https://docs.expo.dev/guides/using-firebase/
Deploys to Firebase Hosting:
'https://subcripciones-9d96d.web.app/'

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

1. Intall firebase CLI:

```bash
npm install -g firebase-tools
```

2. Run the firebase emulators:

```bash
npm run fb:emulators
```

3. When emulators are running you can run the tests:

```bash
npm run test
```
