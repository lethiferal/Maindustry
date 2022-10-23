let file;
let playerCount;
let pausedState;

file = Vars.saveDirectory.child('autosave' + '.' + Vars.saveExtension);

Events.on(ServerLoadEvent, (e) => {
  if (Core.settings.get('loadAutoSave', '') === 'true'){
    playerCount = Groups.player.size();
    Core.app.post(() => {
      SaveIO.load(file);
      Vars.state.set(GameState.State.playing);
      Log.info('Auto-save recovered.');
      (playerCount === 0) && (Vars.state.serverPaused = true);
      (playerCount === 0) && (pausedState = 'true');
    });
}});

Events.on(PlayerLeave, (event) => {
  if (Core.settings.get('loadAutoSave', '') === 'true') {
    if (playerCount === 0) {
      playerCount = Groups.player.size();
      Vars.state.serverPaused = true;
      pausedState = 'true';
      return;
    };
  };
});

Events.on(PlayerJoin, (event) => {
  if (Core.settings.get('loadAutoSave', '') === 'true') {
    if (pausedState === 'true') {
      if (playerCount > 0) {
        playerCount = Groups.player.size();
        Vars.state.serverPaused = false;
        pausedState = 'false';
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
