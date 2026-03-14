window.blazorTodoBridge = {
  _dotNetRef: null,

  init: function (dotNetRef) {
    this._dotNetRef = dotNetRef;
    const bus = window.__microFeBus;
    if (!bus) return;

    // Send current state
    const state = bus.getState();
    dotNetRef.invokeMethodAsync('OnStateChanged', state.items);

    // Subscribe to future changes
    bus.subscribe(function (newState) {
      if (window.blazorTodoBridge._dotNetRef) {
        window.blazorTodoBridge._dotNetRef.invokeMethodAsync('OnStateChanged', newState.items);
      }
    });
  },

  addTodo: function (text) {
    window.__microFeBus?.addTodo(text);
  },

  updateTodo: function (id, completed) {
    window.__microFeBus?.updateTodo(id, { completed: completed });
  },

  editTodo: function (id, text) {
    window.__microFeBus?.updateTodo(id, { text: text });
  },

  deleteTodo: function (id) {
    window.__microFeBus?.deleteTodo(id);
  },
};
