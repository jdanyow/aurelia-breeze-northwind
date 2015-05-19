export class EntityViewModel {
  service;
  entityManager;
  entity;

  constructor(service) {
    this.service = service;
  }

  activate(info) {
    var promise;

    // load or create the entity.
    if (info.id === 'new') {
      promise = this.service.createNew();
    } else {
      promise = this.service.loadExisting(info.id);
    }

    return promise.then(result => {
      this.entityManager = result.entityManager;
      this.entity = result.entity;
    });
  }

  canDeactivate() {
    // permit navigating away from new entities.
    if (this.entity.entityAspect.entityState.isAdded()) {
      Materialize.toast('Add-new cancelled.', 2000);
      return true;
    }

    // disallow navigating away from modified entities.
    if (this.hasChanges) {
      // throttle the amount of toast we pop.
      if (!this._lastPop || +new Date() - this._lastPop > 2000) {
        this._lastPop = +new Date();
        Materialize.toast('Navigation cancelled.  Save your changes!', 2000);
      }
      return false;
    }

    // permit navigating away from unmodified entities.
    return true;
  }

  get hasChanges() {
    return this.entityManager.hasChanges();
  }

  save() {
    // fake save...
    this.entityManager.acceptChanges();
    Materialize.toast('Changes saved.', 2000)
  }

  revert() {
    this.entityManager.rejectChanges();
    Materialize.toast('Changes reverted.', 2000)

    // workaround Materialize datepicker binding timezone issue.
    if (this.hasChanges) {
      this.entityManager.rejectChanges();
    }
  }
}
