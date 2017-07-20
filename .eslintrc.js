module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],

  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  'env': {
    browser: true
  },
  // add your custom rules here
  'rules': {
    'global-require': 0,
    'import/first': 0,
    'no-multi-assign': 0,
    'no-extra-bind': 0,
    'no-alert': 0,
    'no-prototype-builtins': 0,
    'no-mixed-operators': 0,
    'no-console':0,
    'no-lonely-if': 0,
    'no-param-reassign': 0,
    'prefer-template' : 0,
    'import/no-unresolved': 0,
    'import/imports-first': 0,
    'arrow-body-style': 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
