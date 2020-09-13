const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: {
    vendor: [
      "./node_modules/jquery/src/jquery.js",
      "./node_modules/lodash/lodash.js",
      "./node_modules/backbone/backbone.js",
      "./node_modules/jointjs/dist/joint.js",
      "./node_modules/jquery-ui/ui/core.js",
      "./node_modules/jquery-ui/ui/widgets/accordion.js",
      "./node_modules/popper.js/dist/popper.js",
      "./node_modules/bootstrap/dist/js/bootstrap.js",
      "./node_modules/codemirror/lib/codemirror.js",
      "./node_modules/codemirror/addon/hint/show-hint.js",
      "./node_modules/codemirror/addon/fold/foldcode.js",
      "./node_modules/codemirror/addon/fold/foldgutter.js",
      "./node_modules/codemirror/addon/fold/brace-fold.js",
      "./node_modules/codemirror/addon/fold/xml-fold.js",
      "./node_modules/codemirror/addon/hint/xml-hint.js",
      "./node_modules/codemirror/mode/xml/xml.js",
      "./node_modules/jsonpath-plus/src/jsonpath.js",
      "./node_modules/codemirror/mode/javascript/javascript.js",
      "./node_modules/codemirror/addon/edit/matchbrackets.js",
      "./node_modules/codemirror/addon/edit/closebrackets.js",
      "./node_modules/codemirror/addon/hint/javascript-hint.js",
      "./node_modules/colresizable/colResizable-1.6.min.js",
      "./node_modules/jointjs/dist/joint.css",
      "./node_modules/bootstrap/dist/css/bootstrap.css",
      "./node_modules/jquery-ui/themes/base/core.css",
      "./node_modules/jquery-ui/themes/base/accordion.css",
      "./node_modules/jquery-ui/themes/base/theme.css",
      "./node_modules/jquery.fancytree/dist/skin-lion/ui.fancytree.css",
      "./node_modules/codemirror/lib/codemirror.css",
      "./node_modules/codemirror/addon/hint/show-hint.css"
    ],
    ide: [
      "./app/scripts/definition/xmlelementdefinition.js",
      "./app/scripts/ide/ide.js",
      "./app/styles/ide/ide.css",
      "./app/styles/ide/dragdata.css",
      "./app/styles/ide/splitter.css",
      "./app/styles/repository/repositorybrowser.css"
    ],
    util: [
      "./app/styles/util/zoomfield.css",
      "./app/styles/util/messagebox.css",
      "./app/styles/util/basicform.css",
      "./app/styles/util/generic_ui.css",
      "./app/styles/util/standardform.css"
    ],
    scripts: [
      "./app/styles/properties/properties.css",
      "./app/styles/properties/planitemproperties.css",
      "./app/styles/properties/caseplanproperties.css",
      "./app/styles/properties/planningtableproperties.css",
      "./app/styles/properties/sentryproperties.css",
      "./app/styles/properties/stageproperties.css",
      "./app/styles/properties/timereventproperties.css",
      "./app/styles/elements/elements.css",
      "./app/styles/editors/casefileitemseditor.css",
      "./app/styles/editors/treeeditor.css",
      "./app/styles/editors/roleseditor.css",
      "./app/styles/editors/tableeditor.css",
      "./app/styles/editors/jsoneditor.css",
      "./app/styles/editors/task/taskmappingseditor.css",
      "./app/styles/modeleditors/modeleditor.css",
      "./app/styles/modeleditors/xmleditor/xmlmodeleditor.css",
      "./app/styles/modeleditors/case/casemodeleditor.css",
      "./app/styles/modeleditors/case/caseparameters.css",
      "./app/styles/modeleditors/case/deploy.css",
      "./app/styles/debugger/debugger.css",
      "./app/styles/modeleditors/case/undoredobox.css",
      "./app/styles/modeleditors/case/shapebox.css",
      "./app/styles/modeleditors/case/casesourceeditor.css",
      "./app/styles/modeleditors/case/resizer.css",
      "./app/styles/modeleditors/case/halo/halo.css",
      "./app/styles/validate/validate.css",
      "./app/styles/modeleditors/cfid/casefileitemdefinition.css",
      "./app/styles/settings/settingseditor.css"
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/scripts')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: '../images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../styles/[name].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'app/index.html'),
          to: path.resolve(__dirname, 'dist/index.html')
        },
        {
          from: path.resolve(__dirname, 'app/images/favicon.ico'),
          to: path.resolve(__dirname, 'dist/images/favicon.ico')
        }
      ]
    }),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: false,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    })  ]
};
