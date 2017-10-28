# AngularLiveSass

## Installation

- Install gulp packages

`npm install -g gulp`

`npm install --save-dev gulp gulp-inject gulp-inject-string gulp-sass gulp-sourcemaps map-stream`

- Add script to package.json

`"livesass": "gulp --gulpfile livesass/gulpfile.js"`

- Add *livesass* folder at the root of your project

- In the index.html
    - Add `<!-- inject:css --><!-- endinject -->` into head tag
    - Add `<!-- inject:js --><!-- endinject -->` into body tag
    
- Activate *Live Sass* option in Chrome Devtools
    
## Running

`ng serve`

`npm run livesass -- --dirPaths=src/app/<component-1>/ --dirPaths=src/app/<component-2>`

- Map your scss file in Chrome Devtools
