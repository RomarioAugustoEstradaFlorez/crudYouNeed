# The CRUD you need [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&logo=twitter)](https://twitter.com/romaestradaflo)

![version](https://img.shields.io/badge/version-1.0.0-blue.svg)  ![license](https://img.shields.io/badge/license-MIT-blue.svg)

This CRUD works with Loopback 3, Angular 7 and [Material Admin](https://www.creative-tim.com/product/material-dashboard-angular2) in your free version build for angular, and i use different things of this theme to make a beatifull CRUD thinking on the user experience and make things easier for him.

Special thanks go to:
- [Romario Estrada](http://romaef.com/#!/inicio) for your beautifull develop.


## Table of Contents

* [Languages](#versions)
* [Quick Start](#quick-start)
* [File Structure](#file-structure)
* [Browser Support](#browser-support)
* [Licensing](#licensing)


## Languages



| LoopBack 3| Angular | MySql|
| --- | --- | --- |
| [![Loopback 3](https://miro.medium.com/max/2726/1*U2bi17I5e52U33SevUYpEg.png)]()  | [![Angular](https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/800px-Angular_full_color_logo.svg.png)]() | [![MySql](https://www.anerbarrena.com/wp-content/uploads/2016/05/mysql.jpg)]()

## Quick start

Clone the repo: `git clone https://github.com/RomarioAugustoEstradaFlorez/crudYouNeed`.

Create database whit the name equal to `prueba_crud` with a collation equal to `utf8_general_ci` or use the SQL Script in the folder call `_docu` to create it fast.


The server will run at `port 3000` and the url to access the api explorer is `http://localhost:3000/explorer` and to use it in a client is `http://localhost:3000/api/NAMEOFMODEL`.

To start the API rest:
- `cd server/`
- `npm i`
- `npm start`

The client in Angular will run at `port 4200` and the url to access is `http://localhost:4200`.

To start the client:

- `cd client_angular/`
- `npm i`
- `npm start`


## File Structure
Within the download you'll find the following directories and files:

```
crudYouNeed/
├── _docu/
├── server/
|   ├── bin/
|   |   ├── discovery.js
|   ├── common/
|   |   └── models/
|   |   |   ├── attachment
|   |   |   ├── billHasCategories
|   |   |   ├── bills
|   |   |   └── categories
|   ├── server/
|   |   ├── boot/
|   |   |   ├── authentication.js
|   |   |   └── root.js
|   |   ├── component-config.json
|   |   ├── config.json
|   |   ├── datasources.json
|   |   ├── middleware.development.json
|   |   ├── middleware.json
|   |   ├── model-config.json
|   |   └── server.js
|

├── client_angular/
|   ├── src/
|   |   ├── app/
|   |   |   ├── categories/
|   |   |   ├── data.service.ts
|   |   |   ├── app-routing.ts
|   |   |   ├── app.component.html
|   |   |   ├── app.component.scss
|   |   |   ├── app.component.ts
|   |   |   └── app.module.ts
|   |   ├── assets/
|   |   └── index.html
└── README.md
```


## Browser Support

At present, we officially aim to support the last two versions of the following browsers:


| Chrome | Firefox | Edge | Opera |
| --- | --- | --- | --- |
| [![Chrome](https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png)]() | [![FireFox](https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png)]() | [![Edge](https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png)]() | [![Edge](https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png)]()

## Licensing

Licensed under MIT

##### Social Media
#
Web Page: <http://romaef.com>

Twitter: <https://twitter.com/romaestradaflo>

Facebook: <https://www.facebook.com/romaef/>

Instagram: <https://www.instagram.com/romaef_/>

