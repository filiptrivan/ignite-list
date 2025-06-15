// In environment putting only the variables which are different in dev and prod, and which the client would change ocasionaly so we don't need to redeploy the app
export const environment = {
  production: false,
  apiUrl: 'https://localhost:44388/api',
  frontendUrl: 'http://localhost:4200',
  GoogleClientId: '997916186195-4hk7brksr6jju869o4d0pb87gc6tvkdc.apps.googleusercontent.com',
  companyName: 'Ignitelist',
  primaryColor: '',
};
