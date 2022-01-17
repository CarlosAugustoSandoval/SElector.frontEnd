<template>
  <v-container fluid class="page-wrapper">
    <div>
      Home 7
    </div>
    <div>b{{error}}</div>
    <div>c{{controls}}</div>
    <div>a{{result}}</div>
    <div id="test-area-qr-code-webcam">
      <video/>
    </div>
  </v-container>
</template>

<script>
// import {BrowserPDF417Reader} from '@zxing/browser'
// import * as ZXingBrowser from "@zxing/browser";
import {
  MultiFormatReader,
  BarcodeFormat,
  DecodeHintType,
  RGBLuminanceSource,
  BinaryBitmap,
  HybridBinarizer
} from '@zxing/library'

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
      const hints = new Map();
      const formats = [BarcodeFormat.QR_CODE, BarcodeFormat.PDF_417/*, ...*/];

      hints.set(DecodeHintType.POSSIBLE_FORMATS, formats);

      const reader = new MultiFormatReader();

      reader.setHints(hints);

      const luminanceSource = new RGBLuminanceSource(null, 500, 500);
      const binaryBitmap = new BinaryBitmap(new HybridBinarizer(luminanceSource));

      reader.decode(binaryBitmap);
//       const codeReader = new BrowserPDF417Reader()
//       const videoInputDevices = await ZXingBrowser.BrowserCodeReader.listVideoInputDevices();
//
// // choose your media device (webcam, frontal camera, back camera, etc.)
//       const selectedDeviceId = videoInputDevices[1].deviceId;
//
//       console.log(`Started decode from camera with id ${selectedDeviceId}`);
//
//       const previewElem = document.querySelector('#test-area-qr-code-webcam > video');
//
// // you can use the controls to stop() the scan or switchTorch() if available
//       const controls = await codeReader.decodeFromVideoDevice(selectedDeviceId, previewElem, (result, error, controls) => {
//         this.result = result
//         this.error = error
//         this.controls = controls
//         console.log('result', result)
//         console.log('error', error)
//         console.log('controls', controls)
//         // use the result and error values to choose your actions
//         // you can also use controls API in this scope like the controls
//         // returned from the method.
//       });
//
// // stops scanning after 20 seconds
//       setTimeout(() => controls.stop(), 50000)
    }
  }
}
</script>
