// @flow

export const getLocalStream = async ():Promise<MediaStream> => {
  const stream = await window.navigator
    .mediaDevices
    .getUserMedia({ video: true, audio: false })
    .catch(err => { throw err })

  return stream
}

export const getDummyStream = ():MediaStream => {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  const ac = new AudioContext();
  const osc = ac.createOscillator();
  const dest = ac.createMediaStreamDestination();
  osc.connect(dest);
  osc.start(0)

  return dest.stream
}