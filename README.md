# Country Information App

## Overview

This application provides information about various countries, including details such as their names, currencies, time zones, languages spoken, and more. It consists of features to search for specific countries, view their details, and visualize them on an interactive map.

## Features

### Search Bar

The search bar allows users to enter the name of a country, state, or continent. Upon submission, it retrieves matching results and displays relevant information, including time zone, currency, emoji, phone code, and languages spoken.

### Interactive Map

The interactive map visualizes countries using a color-coded scheme. It showcases various regions and provides tooltips on hover, displaying country names and additional information. Users can click on specific regions to view country details.

### Country Details

Upon selecting a country on the map or through the search results, the application displays detailed information about that country. It showcases the country's flag, time zone, currency, emoji, phone code, and languages spoken.

### Context Usage

The application efficiently manages country data using React Context. It stores and provides access to country-related information across various components, ensuring consistency and ease of access.

### Map Interactivity

The map should allow users to interact by clicking on regions or markers. On click, it displays the name of the selected country or region, enhancing user engagement and exploration.Still work in progress.

## Technologies Used

- **React**: The application is built using React to manage UI components and state efficiently.
- **@react-jvectormap/core**: It utilizes this library to render the interactive world map.
- **Apollo Client**: For handling GraphQL queries and retrieving country data.
- **Yup**: Used for form validation within the search functionality.
- **TypeScript**: Provides static typing to the application, enhancing code reliability and maintainability.
- **Formik**: Provides form handling in a robust way.

## Setup Instructions

1. Clone the repository. -**https://github.com/daveasiamah/country-info.git**
2. Install dependencies using `npm install`.
3. Run the application with `npm run dev` for development mode or `npm start`.
4. Access the app in the browser at `http://localhost:3000`.

## Notable Decisions

As a senior software engineer, several decisions were made during the development of this application to ensure robustness, scalability, and a seamless user experience, notably:

### Prop Passing vs. Context API

A crucial decision was whether to pass search bar input as props directly from the search bar component to the search results component or utilize React's Context API for managing shared data. After careful consideration, the Context API was chosen to manage country data, enabling easy access across multiple components without prop drilling.

### Selection of Map Library

Selecting the appropriate map library was pivotal for the interactive map feature. Several options were evaluated, including Mapbox, Leaflet, and @react-jvectormap/core. Ultimately, @react-jvectormap/core was chosen for its simplicity, compatibility with React, and robust visualization capabilities.

### Utilization of Hooks and TypeScript

The application extensively utilizes React Hooks and TypeScript. Hooks provide a clean and functional approach to manage stateful logic, ensuring cleaner code structure and better code organization. TypeScript's static typing significantly enhanced code reliability, catching errors during development and promoting better documentation through type definitions.

### Search Functionality and Form Validation

The decision to implement search functionality alongside form validation using Yup offered a user-friendly experience. Form validation ensures that users enter valid search queries, providing immediate feedback and enhancing overall usability.

### Future Considerations

In future iterations, exploring server-side rendering (SSR) or static site generation (SSG) using Next.js could enhance performance and SEO. Additionally, incorporating a state management library like Redux might streamline data flow in larger-scale applications.

These decisions were made with careful consideration of performance, user experience, and maintainability, aiming to provide a robust and scalable application.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
