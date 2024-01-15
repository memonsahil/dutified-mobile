# dutified-mobile

A mobile app for AI automated freelancing where users can create/join freelancing projects and each user gets access to GPT tools for their jobs, essentially improving freelancers’ earning potential by providing built-in AI tools that are relevant to their jobs.

![Dutified Mobile Demo](assets/images/dutified-mobile-demo.gif)

## Tech Stack

Currently a WIP, the front-end is built upon React Native and Zustand (light-weight state management), job payment transactions are processed using Stripe.

The backend is essentially a collection of Firebase tools + a Google Cloud Platform database that stores user and project data.

-   TypeScript
-   React Native
-   Firebase
-   Google Cloud Platform
-   Stripe API
-   OpenAI API

### Firebase Note

Not all React Native Firebase packages have Expo config plugins provided yet. You may see if a module is supported by checking if it contains the app.plugin.js file in its package directory.
