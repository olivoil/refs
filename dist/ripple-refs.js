
;(function(){

/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("refs", function (exports, module) {
module.exports = function(View) {
  View.directive('ref', {
    bind: function(){
      this.view.refs = this.view.refs || {};
    },
    update: function(value){
      this.view.refs[value] = this.node;
    },
    unbind: function(){
      this.view.refs = null;
    }
  });
};

});

if (typeof exports == "object") {
  module.exports = require("refs");
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return require("refs"); });
} else {
  this.ripple.refs = require("refs");
}
})()
