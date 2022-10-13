const file = Vars.saveDirectory.child('autosave' + '.' + Vars.saveExtension);

Events.on(ServerLoadEvent, (e) => {
  if (Core.settings.get('loadAutoSave', '') === 'true'){
    Core.app.post(() => {
      SaveIO.load(file);
      Log.info('Auto-save recovered.');
    });
}});

Timer.schedule(
  () => {
    if (Core.settings.get('loadAutoSave', '') === 'true'){
      Core.app.post(() => {
        SaveIO.save(file);
        Call.sendMessage('[lime] [white]| Game saved.');
    })};
  },
  60,
  300
);