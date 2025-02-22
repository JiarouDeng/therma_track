# therma_track

## Opening web and android app

web app:

1. run node -v, ensure the current version of node.js >= 20
2. npm create vite@latest <app name>
3. when being prompted the framework, choose React + Typescript
4. cd <app name>
5. npm install
6. cp <dir for React/web_app/\*> src/
7. npm install react-router-dom recharts (router is used for navigating between different pages, recharts is used for char display)
8. npm run dev

android app:

1. expo init <app name>
2. when prompted for framework, select blank (TypeScript)
3. cd <app name>
4. cp <dor for React/android_app/\*> .
5. npm install react-native-chart-kit
6. npm install @react-navigation/native
7. npm install react-native-screens react-native-safe-area-context
8. npm install @react-navigation/stack
9. npm start
