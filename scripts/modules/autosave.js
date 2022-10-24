let file;
let playerCount;
let pausedState;

file = Vars.saveDirectory.child('autosave' + '.' + Vars.saveExtension);

Events.on(ServerLoadEvent, (e) => {
  playerCount = Groups.player.size();
  if (Core.settings.get('loadAutoSave', '') === 'true'){
    Core.app.post(() => {
      SaveIO.load(file);
      Vars.state.set(GameState.State.playing);
      Log.info('Auto-save recovered.');
      (playerCount === 0) && (Vars.state.serverPaused = true);
      (playerCount === 0) && (pausedState = 'true');
      (playerCount === 0) && (Log.info('Server paused.'));
    });
}});

Events.on(PlayerLeave, (event) => {
  playerCount = Groups.player.size();
  if (Core.settings.get('loadAutoSave', '') === 'true') {
    if (playerCount === 0) {
      Vars.state.serverPaused = true;
      pausedState = 'true';
      Log.info('Server paused.');
      return;
    };
  };
});

Events.on(PlayerJoin, (event) => {
  playerCount = Groups.player.size();
  if (Core.settings.get('loadAutoSave', '') === 'true') {
    if (pausedState === 'true') {
      if (playerCount > 0) {
        Vars.state.serverPaused = false;
        pausedState = 'false';
        Log.info('Server resumed.');
        return;
      };
    };
  };
});

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
