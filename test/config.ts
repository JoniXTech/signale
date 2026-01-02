import * as signale from '..';

// Overrides any existing `package.json` config
signale.config({
  displayFilename: true,
  displayTimestamp: true,
  displayDate: false
});

signale.success('Hello from the Global scope');

function scopedConfigTest() {
  // `fooLogger` inherits the config of `signale`
  const fooLogger = signale.scope('foo scope');

  // Overrides both `signale` and `package.json` configs
  fooLogger.config({
    displayFilename: true,
    displayTimestamp: false,
    displayDate: true
  });

  fooLogger.success('Hello from the Local scope');
}

scopedConfigTest();

function fullConfigTest() {
  // Overrides both `signale` and `package.json` configs
  signale.config({
    displayScope: false,
    displayBadge: true,
    displayDate: true,
    displayFilename: true,
    displayLabel: true,
    displayTimestamp: true,
    underlineLabel: true,
    underlineMessage: false,
    underlinePrefix: false,
    underlineSuffix: false,
    uppercaseLabel: false
  });

  signale.success('Hello from the Full Config scope');
  signale.info('This is an info message');
  signale.debug('This is a debug message');
  signale.warn('This is a warning message');
  signale.error('This is an error message');
}

fullConfigTest();