module.exports = function errHandler() {
  process.on('unhandledRejection', (e) => {
    console.error('===============unhandledRejection error==================');
    console.error(e);
  });
  process.on('uncaughtException', (e) => {
    console.error('===============uncaughtException error==================');
    console.error(e);
  });
}
