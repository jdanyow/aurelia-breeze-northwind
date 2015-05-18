import materialize from 'materialize/dist/js/materialize'; // ensure the materialize jquery plugins are installed.

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('./resources/index') // install some application resources such as value-converters.
    .plugin('aurelia-breeze');   // install the aurelia-breeze integration plugin.

  aurelia.start().then(a => a.setRoot());
}
