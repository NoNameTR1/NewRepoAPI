const moduleAlias = require('module-alias');
require('module-alias/register');
//
// Register alias
//
moduleAlias.addAlias('@client', __dirname + '/src/client');

// Or multiple aliases
moduleAlias.addAliases({
  '~root': __dirname,
  '~services': __dirname + '/services',
  '~plugins': -__dirname + '/plugins',
  '~helpers': __dirname + '/helpers',
  '~errors': __dirname + '/errors',
  '~config': __dirname + '/config',
  '~components': __dirname + '/components',
});

moduleAlias();