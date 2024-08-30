# Geomapping Portal Frontend

This project provides a frontend interface for interacting with the GeoBackend API to calculate wellbore parameters and installation costs based on geological data.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Features

- **Interactive Map:**  Allows users to select a location on a map to specify the wellbore site.
- **Input Form:** Provides a user-friendly form to input required parameters for wellbore calculations.
- **Data Visualisation:** Displays the calculated wellbore parameters and installation cost breakdown in a clear and organized manner.
- **API Integration:**  Communicates with the GeoBackend API(https://github.com/08dhuh/geobackend) to send user input and retrieve calculation results.

## Frontend Dependencies

- React
- Leaflet (for the interactive map)
- Axios (for API communication)

## Installation

1. Clone the repository.
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`

## Configuration

1. Update the API endpoint URL in the frontend code (e.g., in `InputForm.js`) to match the address of your running GeoBackend API.

## Usage Example

1. Start the development server: `npm start`
2. Open your web browser and navigate to `http://localhost:3000`, or the port specified in your development server configuration.
3. Use the interactive map to select a location for the wellbore.
4. Fill in the required parameters or use the default values in the input form.
5. Submit the form to trigger the calculation.
6. The calculated wellbore parameters and installation cost will be displayed on the page.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
