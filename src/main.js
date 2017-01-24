export function configure(aurelia) {

  let materialize = "Dogfalo/materialize";

  return aurelia.loader.loadModule("jquery").then(aurelia.loader.loadModule(materialize).then(() => {

    aurelia.use
      .standardConfiguration()
      .developmentLogging()
      .feature('resources')        // install application resources such as value-converters and custom html attributes.
      .plugin('aurelia-breeze')
      .plugin('aurelia-materialize-bridge', bridge => bridge.useAll());   // install the aurelia-breeze integration plugin.

    return aurelia.start().then(a => a.setRoot());
  }));
}
