// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiURL: 'http://localhost:8000',
    localApiUrl: `http://localhost:3000`,
    // localApiUrl: `https://22eb-194-126-216-203.eu.ngrok.io`,
    fintessApiUrl: `https://fitness-calculator.p.rapidapi.com`,
    API_KEY: `d47fb99508msh18a8eae724e4658p1a76c0jsn341bae4900b7`,
    API_HOST: `fitness-calculator.p.rapidapi.com`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
