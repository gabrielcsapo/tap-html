# 1.1.0 (03/14/2023)

- fixes issue when no assert name is provided (#11) - @achappuis
- fixes issue when no test name is provided with TAP comment (#11) - @achappuis
- Change behavior when no output file is given to tap-html to restore what is described in README.md (#5) - @achappuis
- Updates deps to latest - @gcsapo

# 1.0.1 (04/20/2019)

- fixes backwards compatibility with node@8

# 1.0.0 (04/20/2019)

- removes react dependencies
- inlines assets

# 0.3.0 (03/04/2019)

- fixes issue with plan not checking for plan name to be a string and instead uses range

# 0.2.1 (05/09/2018)

- includes `babel-minify-webpack-plugin` as a dependency instead of devDependency.

# 0.2.0 (12/20/2017)

- removes commander
- improves readability
- adds a named function `tapHTML` for readability
- updates dependencies

# 0.1.8 (11/13/2017)

- uses preact to reduce bundle size.
  - 208 KB -> 130 KB (60% reduction in size)

# 0.1.7 (10/18/2017)

- uses babel-preset-env instead of babel-preset-es2015
- updates webpack and babel
- uses babel-minify-webpack-plugin to minify es6

# 0.1.6 (10/11/2017)

- fixes a styling issue when trying to display an assertion without a parent as the first item in the list

# 0.1.5 (10/11/2017)

- moves font-awesome to dependencies

# 0.1.4 (10/11/2017)

- updates dependencies

# 0.1.3 (09/28/2017)

- updates to react@16.0.0

# 0.1.2 (09/17/2017)

- will recursively generate output directory if it doesn't exist
- bundles font-awesome with output
- adds storybook

# 0.1.1 (09/13/2017)

- fixes error when data is undefined and the extra event is triggered

# 0.1.0 (09/11/2017)

- adds fields to `package.json` that were formerly missing
- fixes a bug with flat tests
  - adds tests for flat and nested tests for the parse functionality
- fixes bug with empty test suites
- default behavior will output to stdout, an added flag --out <file> will write to disk

# 0.0.5 (07/16/2017)

- updates and fixes implementation with tap-parser@6.0.0

# 0.0.4 (06/27/2017)

- fixes issue with webpack ignoring node_modules folder, fixes it by only including `tap-html`

# 0.0.3 (06/27/2017)

- upgrades `webpack@^2.6.1` -> `webpack@^3.0.0`
- upgrades `babel-loader@^7.0.0` -> `babel-loader@^7.1.1`
- upgrades `html-webpack-plugin@^2.28.0` -> `html-webpack-plugin@^2.29.0`
- upgrades `react@^15.5.4` -> `react@^15.6.1`
- upgrades `react-dom@^15.5.4` -> `react-dom@^15.6.1`
- fixes the bin name to be the correct one

# 0.0.2 (06/13/2017)

- removes console statements and unused code paths

# 0.0.1 (06/07/2017)

- basic functionality

# 0.0.0

- keeps npm name
