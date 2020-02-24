export default function getTrackInfo(state) {
  const { track_window: { current_track: currentTrack = {} } = {} } = (state || {});
  return currentTrack;
}