const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
      "./app/scripts/ide/ide.js",
      "./app/scripts/ide/ideheader.js",
      "./app/scripts/ide/idemain.js",
      "./app/scripts/ide/idefooter.js",
      "./app/scripts/ide/dragdata.js",
      "./app/scripts/ide/messagebox.js",
      "./app/scripts/ide/coverpanel.js",
      "./app/scripts/editors/movableeditor.js",
      "./app/scripts/editors/standardform.js",
      "./app/scripts/editors/tableeditor.js",
      "./app/scripts/editors/table/tablerenderer.js",
      "./app/scripts/editors/table/rowrenderer.js",
      "./app/scripts/editors/table/columnrenderer.js",
      "./app/scripts/settings/settings.js",
      "./app/scripts/settings/settingseditor.js",
      "./app/scripts/settings/settingsstorage.js",
      "./app/scripts/util/util.js",
      "./app/scripts/util/xml.js",
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
    ],
    splitter: [
      "./app/scripts/ide/splitter/splittersettings.js",
      "./app/scripts/ide/splitter/splitter.js",
      "./app/scripts/ide/splitter/horizontalsplitter.js",
      "./app/scripts/ide/splitter/leftsplitter.js",
      "./app/scripts/ide/splitter/rightsplitter.js",
      "./app/scripts/ide/splitter/verticalsplitter.js"
    ],
    elements: [
      "./app/scripts/elements/elements.js",
      "./app/scripts/elements/properties/properties.js",
      "./app/scripts/elements/properties/casefileitemproperties.js",
      "./app/scripts/elements/properties/planitemproperties.js",
      "./app/scripts/elements/properties/planningtableproperties.js",
      "./app/scripts/elements/properties/sentryproperties.js",
      "./app/scripts/elements/properties/taskstageproperties.js",
      "./app/scripts/elements/properties/stageproperties.js",
      "./app/scripts/elements/properties/caseplanproperties.js",
      "./app/scripts/elements/properties/milestoneproperties.js",
      "./app/scripts/elements/properties/taskproperties.js",
      "./app/scripts/elements/properties/humantaskproperties.js",
      "./app/scripts/elements/properties/textboxproperties.js",
      "./app/scripts/elements/properties/timereventproperties.js",
      "./app/scripts/elements/properties/usereventproperties.js",
      "./app/scripts/elements/halo/halo.js",
      "./app/scripts/elements/halo/halobar.js",
      "./app/scripts/elements/halo/item/haloitem.js",
      "./app/scripts/elements/halo/item/halodragitems.js",
      "./app/scripts/elements/halo/item/haloclickitems.js",
      "./app/scripts/elements/halo/casefileitemhalo.js",
      "./app/scripts/elements/halo/caseplanhalo.js",
      "./app/scripts/elements/halo/planitemhalo.js",
      "./app/scripts/elements/halo/planningtablehalo.js",
      "./app/scripts/elements/halo/sentryhalo.js",
      "./app/scripts/elements/halo/taskhalo.js",
      "./app/scripts/elements/cmmnelement.js",
      "./app/scripts/elements/planitemview.js",
      "./app/scripts/elements/taskstage.js",
      "./app/scripts/elements/task.js",
      "./app/scripts/elements/casetask.js",
      "./app/scripts/elements/humantask.js",
      "./app/scripts/elements/processtask.js",
      "./app/scripts/elements/eventlistener.js",
      "./app/scripts/elements/timerevent.js",
      "./app/scripts/elements/userevent.js",
      "./app/scripts/elements/sentry.js",
      "./app/scripts/elements/casefileitem.js",
      "./app/scripts/elements/milestone.js",
      "./app/scripts/elements/stage.js",
      "./app/scripts/elements/caseplanmodel.js",
      "./app/scripts/elements/textbox.js",
      "./app/scripts/elements/planningtable.js",
      "./app/scripts/elements/case.js",
      "./app/scripts/elements/connector.js"
    ],
    cmmnlib: [
      "./app/scripts/definition/definitionparser.js",
      "./app/scripts/definition/modeldocument.js",
      "./app/scripts/definition/definitiondocument.js",
      "./app/scripts/definition/xmlelementdefinition.js",
      "./app/scripts/definition/cmmn/definitions/cmmnelementdefinition.js",
      "./app/scripts/definition/cmmn/definitions/unnamedcmmnelementdefinition.js",
      "./app/scripts/definition/modeldefinition.js",
      "./app/scripts/definition/typecounter.js",
      "./app/scripts/definition/cmmn/dimensions/dimensions.js",
      "./app/scripts/definition/cmmn/dimensions/diagramelement.js",
      "./app/scripts/definition/cmmn/dimensions/bounds.js",
      "./app/scripts/definition/cmmn/dimensions/edge.js",
      "./app/scripts/definition/cmmn/dimensions/shape.js",
      "./app/scripts/definition/cmmn/dimensions/vertex.js",
      "./app/scripts/definition/cmmn/definitions/cafienneextension.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/planitem.js",
      "./app/scripts/definition/cmmn/definitions/itemcontroldefinition.js",
      "./app/scripts/definition/cmmn/definitions/casedefinition.js",
      "./app/scripts/definition/cmmn/definitions/casefile/casefileitemcollection.js",
      "./app/scripts/definition/cmmn/definitions/casefile/casefiledefinition.js",
      "./app/scripts/definition/cmmn/definitions/casefile/casefileitemdefinition.js",
      "./app/scripts/definition/cmmn/definitions/constraintdefinition.js",
      "./app/scripts/definition/cmmn/definitions/parameterdefinition.js",
      "./app/scripts/definition/cmmn/definitions/parametermappingdefinition.js",
      "./app/scripts/definition/cmmn/definitions/planningtabledefinition.js",
      "./app/scripts/definition/cmmn/definitions/sentry/sentrydefinition.js",
      "./app/scripts/definition/cmmn/definitions/sentry/criteriondefinition.js",
      "./app/scripts/definition/cmmn/definitions/sentry/entrycriteriondefinition.js",
      "./app/scripts/definition/cmmn/definitions/sentry/exitcriteriondefinition.js",
      "./app/scripts/definition/cmmn/definitions/sentry/ifpartdefinition.js",
      "./app/scripts/definition/cmmn/definitions/sentry/onpartdefinition.js",
      "./app/scripts/definition/cmmn/definitions/sentry/planitemonpartdefinition.js",
      "./app/scripts/definition/cmmn/definitions/sentry/casefileitemonpartdefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/planitemdefinitiondefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/stagedefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/task/taskdefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/task/casetaskdefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/task/humantaskdefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/task/assignmentdefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/task/duedatedefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/task/processtaskdefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/caseplandefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/milestonedefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/eventlistenerdefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/timereventdefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseplan/usereventdefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseteam/caseroledefinition.js",
      "./app/scripts/definition/cmmn/definitions/caseteam/caserolereference.js",
      "./app/scripts/repository/serverfile.js",
      "./app/scripts/repository/repository.js",
      "./app/scripts/repository/repositorybrowser.js",
      "./app/scripts/repository/modellistpanel.js"
    ],
    definitions: [
      "./app/scripts/definition/humantask/humantaskmodeldefinition.js",
      "./app/scripts/definition/humantask/humantaskmodelelementdefinition.js",
      "./app/scripts/definition/humantask/humantaskimplementationdefinition.js",
      "./app/scripts/definition/humantask/taskmodeldefinition.js",

      "./app/scripts/definition/process/processmodeldefinition.js",
      "./app/scripts/definition/process/processimplementationdefinition.js",

      "./app/scripts/definition/cfid/casefileitemdefinitiondefinition.js",
      "./app/scripts/definition/cfid/propertydefinition.js",

      "./app/scripts/modeleditors/cfid/casefileitemdefinitioneditor.js",
      "./app/scripts/modeleditors/cfid/cfidefinitionunspecified.js",
      "./app/scripts/modeleditors/cfid/cfidefinitionxmlelement.js",
      "./app/scripts/modeleditors/cfid/cfidefinitionunknown.js"
    ],
    validate: [
      "./app/scripts/validate/problemtype.js",
      "./app/scripts/validate/problem.js",
      "./app/scripts/validate/validator.js",
      "./app/scripts/validate/validationsettings.js",
      "./app/scripts/validate/validateform.js"
    ],
    editors: [
      "./app/scripts/editors/casefileitemseditor.js",
      "./app/scripts/editors/case/caseparameterseditor.js",
      "./app/scripts/editors/case/cfizoom.js",
      "./app/scripts/editors/case/expressionchanger.js",
      "./app/scripts/editors/case/namechanger.js",
      "./app/scripts/editors/case/parameterdeleter.js",
      "./app/scripts/editors/task/taskmappingseditor.js",
      "./app/scripts/editors/task/mappingcomponents.js",
      "./app/scripts/editors/task/bindingrefinementeditor.js",
      "./app/scripts/editors/roleseditor.js",

      "./app/scripts/modeleditors/modeleditor.js",
      "./app/scripts/modeleditors/modeleditormetadata.js",
      "./app/scripts/modeleditors/xmleditor/xmlmodeleditor.js",
      "./app/scripts/modeleditors/xmleditor/modelsourceeditor.js",
      "./app/scripts/modeleditors/case/casemodeleditor.js",
      "./app/scripts/modeleditors/xmleditor/processmodeleditor.js",
      "./app/scripts/modeleditors/xmleditor/humantaskmodeleditor.js",

      "./app/scripts/modeleditors/case/casesourceeditor.js",
      "./app/scripts/modeleditors/case/shapebox.js",
      "./app/scripts/modeleditors/case/resizer.js",
      "./app/scripts/modeleditors/case/undoredo.js",
      "./app/scripts/modeleditors/case/action.js",
      "./app/scripts/modeleditors/case/grid.js",
      "./app/scripts/debugger/debugger.js",
      "./app/scripts/modeleditors/case/deploy.js",
      "./app/scripts/editors/modelparameters.js",
      "./app/scripts/editors/startcaseeditor.js",
      "./app/scripts/editors/expressioneditor.js",
      "./app/scripts/editors/intellisense.js"
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
    })
  ]
};
