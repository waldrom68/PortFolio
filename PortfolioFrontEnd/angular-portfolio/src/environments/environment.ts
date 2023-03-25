// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'portfolio-frontend-wdr',
    appId: '1:303985749883:web:307a4d9093a6bc550e57de',
    storageBucket: 'portfolio-frontend-wdr.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyCQ8_LyFv4JuSW_9lsWTy5muwCRg7g2EhA',
    authDomain: 'portfolio-frontend-wdr.firebaseapp.com',
    messagingSenderId: '303985749883',
    measurementId: 'G-Z292YC8H9F',
  },
  production: false,
  // apiURL: "https://yoprogramo-waldrom68.koyeb.app:8000",  // KOYEB
  apiURL: "https://yoprogramo-waldrom68.onrender.com",  // RENDER
  // apiURL: "http://localhost:8080",
  idPersona:1,
};

console.log("Modo development")


// 
// ng in development mode, you can import the following file
//  * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
//  *
//  * This import should be commented out in production mode because it will have a negative impact
//  * on performance if an error is thrown.
//  */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
