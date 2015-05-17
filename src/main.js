import materialize from 'materialize/dist/js/materialize';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('./resources/index')
    .plugin('aurelia-breeze');

  aurelia.start().then(a => a.setRoot());
}
