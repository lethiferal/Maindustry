const file = Vars.saveDirectory.child('autosave' + '.' + Vars.saveExtension);
Events.on(ServerLoadEvent, (e) => {
  if (Core.settings.get('loadAutoSave', '') === 'true'){
    Core.app.post(() => {
      SaveIO.load(file);
      Vars.state.set(GameState.State.playing);
      Log.info('Auto-save recovered.');
    });
}});

Timer.schedule(
  () => {
    if (Core.settings.get('loadAutoSave', '') === 'true'){
      Core.app.post(() => {
        SaveIO.save(file);
        Call.infoPopup("[#7FD7FD7f]", 5, Align.topRight, 180, 0, 0, 10);
    })};
  },
  60,
  300
);
