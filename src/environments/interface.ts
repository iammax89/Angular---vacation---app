export interface Environments {
  production: boolean,
  firebase: {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string
  }
}

export interface logIn {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
export interface FirebaseAuthResponse {
  idToken: string;
  expiresIn: string;
}
