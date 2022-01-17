<template>
  <v-container fluid class="page-wrapper">
    <div>
      Home
    </div>
    <div>a{{result}}</div>
    <div>b{{error}}</div>
    <div>c{{controls}}</div>
    <div>d{{videoInputDevices}}</div>
    <div id="test-area-qr-code-webcam">
      <video></video>
    </div>
  </v-container>
</template>

<script>
import {BrowserPDF417CodeReader} from '@zxing/browser'
import * as ZXingBrowser from '@zxing/browser'

export default {
  name: 'Home',
  data: () => ({
    result: null,
    error: null,
    controls: null,
    videoInputDevices: null,
  }),
  async mounted() {
    if (this.user?.id === 1) {
      const codeReader = new BrowserPDF417CodeReader()
      const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();

// choose your media device (webcam, frontal camera, back camera, etc.)
      console.log('videoInputDevices', videoInputDevices)
      this.videoInputDevices = videoInputDevices
      const selectedDeviceId = videoInputDevices[0].deviceId;

      console.log(`Started decode from camera with id ${selectedDeviceId}`);

      const previewElem = document.querySelector('#test-area-qr-code-webcam > video');

// you can use the controls to stop() the scan or switchTorch() if available
      const controls = await codeReader.decodeFromVideoDevice(selectedDeviceId, previewElem, (result, error, controls) => {
        this.result = result
        this.error = error
        this.controls = controls
        console.log('result', result)
        console.log('error', error)
        console.log('controls', controls)
        // use the result and error values to choose your actions
        // you can also use controls API in this scope like the controls
        // returned from the method.
      });

// stops scanning after 20 seconds
      setTimeout(() => controls.stop(), 20000)
    }
  }
}
</script>
