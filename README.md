

# Remote-DEV on Vite
Example JavaScript / CSS / HTML that helps software developers find job listings. This edition uses vite, typescript, and react to create a more up to date and realistic version of the app. 

## Demonstrated technologies 
* Used hashing and per-component fetching ensure users will use minimal amount of resources while allowing for individual lookup and simple return to pages
* UseQuery is used to create more readable and feature full fetch requests thats cache 
* Requests are debounced to create a quick but server efficent app lifecycle
* Effect components are simplified and distributed via a custom hook files to allow for global access, compliance to DRY and quick modificiation of app functionality.

## Part of the Online ByteGrad Class

This Project was created alongside the ByteGrad Javascript class. This project is sample code that shows how to do the following:

* Create a professional-standard CSS styled HTML page, that reacts to user events such as hovers, and uses up-to-date technology like flex-box.
* Uses Javascript to create a system that reacts to inputs in a dynamic and consistent way, using queries to the ByteGrad "Example Job Database".
* Uses Typescript to keep data types consistent, and create a more readable codebase.
* Allows for Job Searching, Pagination, Bookmarking, Hash-Link-Navigation, and sorting of Job entries.
* Demonstrates use of webpack, post-css, and babel to create a lightweight, well packaged, and universally-available  App.


# How to install 

* `git clone` main or download the zip
* Navigate to root folder and `npm run dev`
* Production version may availible in the future



#Details about this versions technologies


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
