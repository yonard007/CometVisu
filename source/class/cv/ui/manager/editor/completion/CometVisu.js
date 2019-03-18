/**
 *
 */
qx.Class.define('cv.ui.manager.editor.completion.CometVisu', {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    TEMPLATES: null,

    getTemplates: function () {
      if (!this.TEMPLATES) {
        this.TEMPLATES = [{
          filterText: "cvclass",
          label: 'CometVisu-Class',
          kind: window.monaco.languages.CompletionItemKind.Class,
          detail: "A generic CometVisu class.",
          insertText: '/**\n * TODO: Add documentation\n * \n * @since ' + cv.Version.VERSION.replace('-dev', '') + ' ($CURRENT_YEAR)\n */\nqx.Class.define("cv.$0", {\n  extend: qx.core.Object,\n\n  \n});\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvwidget",
          label: 'CometVisu-Widget',
          kind: window.monaco.languages.CompletionItemKind.Class,
          detail: "A CometVisu class for a widget.",
          insertText: '/**\n * TODO: Add documentation\n * \n * @since ' + cv.Version.VERSION.replace('-dev', '') + ' ($CURRENT_YEAR)\n */\nqx.Class.define("cv.ui.structure.pure.$0", {\n  extend: cv.ui.structure.AbstractWidget,\n\n  \n});\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvplugin",
          label: 'CometVisu-Plugin',
          kind: window.monaco.languages.CompletionItemKind.Class,
          detail: "A CometVisu class for a plugin.",
          insertText: [
            '/**',
            ' * TODO: Add documentation',
            ' * ',
            ' * @since ' + cv.Version.VERSION.replace('-dev', '')+ ' ($CURRENT_YEAR)',
            ' */',
            'qx.Class.define("cv.plugin.$0", {',
            '  extend: cv.ui.structure.AbstractWidget,',
            '',
            '  /*',
            '  ***********************************************',
            '    CONSTRUCTOR',
            '  ***********************************************',
            '  */',
            '  construct: function (props) {',
            '    this.base(arguments, props);',
            '  },',
            '',
            '  /*',
            '  ***********************************************',
            '    STATICS',
            '  ***********************************************',
            '  */',
            '  statics: {',
            '    /**',
            '     * Parses the widgets XML configuration and extracts the given information',
            '     * to a simple key/value map.',
            '     *',
            '     * @param xml {Element} XML-Element',
            '     * @param path {String} internal path of the widget',
            '     * @param flavour {String} Flavour of the widget',
            '     * @param pageType {String} Page type (2d, 3d, ...)',
            '     */',
            '    parse: function (xml, path, flavour, pageType) {',
            '      return cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);',
            '    }',
            '  },',
            '',
            ' /*',
            '  ***********************************************',
            '    PROPERTIES',
            '  ***********************************************',
            ' */',
            '  properties: {',
            '    ',
            '  },',
            '',
            '  /*',
            '  ***********************************************',
            '    MEMBERS',
            '  ***********************************************',
            '  */',
            '  members: {',
            '    ',
            '  },',
            '',
            '  /*',
            '  ***********************************************',
            '    DESTRUCTOR',
            '  ***********************************************',
            '  */',
            '  destruct: function () {',
            '    ',
            '  },',
            '',
            '  defer: function (statics) {',
            '    // register the parser, Note: element-name must be changed to the xml-elements name this plugin should parse',
            '    cv.parser.WidgetParser.addHandler("element-name", statics);',
            '  }',
            '});'].join('\n'),
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvinterface",
          label: 'CometVisu-Interface',
          kind: window.monaco.languages.CompletionItemKind.Interface,
          detail: "A generic CometVisu Interface.",
          insertText: '/**\n * TODO: Add documentation\n * \n * @since ' + cv.Version.VERSION.replace('-dev', '') + ' ($CURRENT_YEAR)\n */\nqx.Interface.define("cv.$0", {\n  \n});\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvmixin",
          label: 'CometVisu-Mixin',
          kind: window.monaco.languages.CompletionItemKind.Class,
          detail: "A generic CometVisu Mixin.",
          insertText: '/**\n * TODO: Add documentation\n * \n * @since ' + cv.Version.VERSION.replace('-dev', '') + ' ($CURRENT_YEAR)\n */\nqx.Mixin.define("cv.$0", {\n  \n});\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvmembers",
          label: 'CometVisu-Class members',
          kind: window.monaco.languages.CompletionItemKind.Struct,
          detail: "A CometVisu classes members section.",
          insertText: '  /*\n  ***********************************************\n    MEMBERS\n  ***********************************************\n  */\n  members: {\n    $0\n  },\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvproperties",
          label: 'CometVisu-Class properties',
          kind: window.monaco.languages.CompletionItemKind.Struct,
          detail: "A CometVisu classes properties section.",
          insertText: '  /*\n  ***********************************************\n    PROPERTIES\n  ***********************************************\n  */\n  properties: {\n    $0\n  },\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvstatics",
          label: 'CometVisu-Class statics',
          kind: window.monaco.languages.CompletionItemKind.Struct,
          detail: "statics section.",
          insertText: '  /*\n  ***********************************************\n    STATICS\n  ***********************************************\n  */\n  statics: {\n    $0\n  },\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvevents",
          label: 'CometVisu-Class events',
          kind: window.monaco.languages.CompletionItemKind.Struct,
          detail: "events section.",
          insertText: '  /*\n  ***********************************************\n    EVENTS\n  ***********************************************\n  */\n  events: {\n    $0\n  },\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvconstructor",
          label: 'Constructor',
          kind: window.monaco.languages.CompletionItemKind.Method,
          detail: "constructor.",
          insertText: '  /*\n  ***********************************************\n    CONSTRUCTOR\n  ***********************************************\n  */\n  construct: function () {\n    this.base(arguments);\n    $0\n  },\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }, {
          filterText: "cvdestructor",
          label: 'Destructor',
          kind: window.monaco.languages.CompletionItemKind.Method,
          detail: "destructor.",
          insertText: '  /*\n  ***********************************************\n    DESTRUCTOR\n  ***********************************************\n  */\n  destruct: function () {\n    this.base(arguments);\n    $0\n  }\n',
          insertTextRules: window.monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet | window.monaco.languages.CompletionItemInsertTextRule.KeepWhitespace
        }];
      }
      return this.TEMPLATES;
    },

    getProvider: function () {
      return {
        triggerCharacters: ['cv'],
        provideCompletionItems: function (model, position) {
          // get editor content before the pointer
          var textUntilPosition = model.getValueInRange({
            startLineNumber: 1,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
          });
          console.log(textUntilPosition, position);

          return {suggestions: this.getTemplates()};
        }.bind(this)
      };
    }
  }
});
