import { Environments } from "./interface";

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: Environments = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCJJedsKH4UHrLbMk_ZmRtuHYTVE_LllwI",
    authDomain: "vacation-app-f7053.firebaseapp.com",
    databaseURL: "https://vacation-app-f7053.firebaseio.com",
    projectId: "vacation-app-f7053",
    storageBucket: "vacation-app-f7053.appspot.com",
    messagingSenderId: "447738792417"
  }
};
// MongoDBkey - 8dVFSsSuEEMxyUtT
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
