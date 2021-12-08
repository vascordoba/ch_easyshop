# EasyShop project by Victor Ariel Sanchez Sumay

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It's a cell phone and tablets e-commerce SPA application. It handles products organized by brands and categories. In future releases it will handle authentication.

The gif file for the demonstration is in the root directory (`recording_e1.gif`)

## Available Scripts

In the project directory, you can run:

### `npm i`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Application details

### Architecture

- The base layout includes a `Topbar` to accomodate the options and a `<main>` to render the Catalog
- The main is a `Catalog` of products that uses a `CatalogItem` to render each product, and a `ProductDetail` to navigate to the detailed spec of each product
- When a product is added to the cart from the `Catalog`, it display a dismissable `Alert` indicating the result. When the stock of the unit is depleted (10 units per product), the alert informs the situation
- The `Topbar` contains a `TopbarCart` component to inform the quantity of products already in the cart
- The `Cart` component enables the review of the items to be purchased. Each item is rendered using a `CartItem` component.

### Additional libraries used

- react-bootstrap: components and styles library based on Bootstrap.js
- react-app-rewire-alias: helper to define alias to import resources without the need to know the relative path
- react-spinner-overlay: creates nice overlay and spinner components to show when the back end processing is taking some time
