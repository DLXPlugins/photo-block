# Photo Block

<img src="https://img.shields.io/badge/node-18.12.1-green" /> <img src="https://img.shields.io/badge/NPM-8.19.2-blue" /> <img src="https://img.shields.io/badge/Webpack-5.74.0-orange" /> <img src="https://img.shields.io/badge/webpack--cli-4.10.0-orange" /> <img src="https://img.shields.io/badge/%40wordpress%2Fscripts-%5E23.3.0-green" />

## Developers

1. Clone the `dev` branch locally.
2. Run `npm install` to install the development scripts.
3. Run `npm run start` to start the build scripts.
4. Run `npm run build` to do a production build.
5. Run `grunt` to create a plugin ZIP file.

Perform a Pull Request against the `dev` branch.

### Location of Block Scripts

```
.
└── src/
    └── index.js
```

```
.
└── src/
    └── blocks/
        └── photo-block/
            └── index.js
```

### Current Screens

The block has several screens, which can be found at:

```
.
└── src/
    └── screens/
```

## Third-party libraries used

1. <a href="https://pqina.nl/filepond/">Filepond<a> - React Image uploader.
2. <a href="https://una.github.io/CSSgram/">CSSgram</a> - CSS Image Effects.
3. <a href="https://lucide.dev/icons">Lucide</a> - React Icon Library.
4. <a href="https://www.npmjs.com/package/react-image-crop">React Image Crop</a> - React Image Cropper.
5. <a href="https://react-hook-form.com/">React Hook Form</a> - React Forms.