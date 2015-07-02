import materialize from 'Dogfalo/materialize'; // ensure the materialize jquery plugins are installed.

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('./resources/index') // install application resources such as value-converters and custom html attributes.
    .plugin('aurelia-breeze');   // install the aurelia-breeze integration plugin.

  aurelia.start().then(a => a.setRoot());
}
