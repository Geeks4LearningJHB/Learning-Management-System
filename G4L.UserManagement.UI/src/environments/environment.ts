// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:44326/api',
  defaultPassword: 'P@ssword1',
  googleApiKey: '',
  firebase: {
  apiKey: "AIzaSyB-BseEKZTt8lwxLwwyT8QcIEtuDo-Ft_M",
  authDomain: "learner-management-system.firebaseapp.com",
  databaseURL: "https://learner-management-system-default-rtdb.firebaseio.com",
  projectId: "learner-management-system",
  locationId: 'us-central',
  storageBucket: "learner-management-system.appspot.com",
  messagingSenderId: "153948337848",
  appId: "1:153948337848:web:f6fc12e8e622c4a06e264d",
  measurementId: "G-QYL4SBB7XP"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
