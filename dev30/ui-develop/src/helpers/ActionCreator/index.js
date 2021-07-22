/**
 * Action creator helper that defines the context of each action creator
 */
class ActionCreator {
  context;

  constructor(context) {
    this.context = context;
  }

  create(type, payload) {
    return {
      type: `@${this.context}/${type}`,
      payload,
    };
  }
}

export default ActionCreator;
