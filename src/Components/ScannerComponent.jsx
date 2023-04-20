import React, { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

function ScannerComponent({ scannedDataFromScanner }) {
  const [scannedDataInScanner, setScannedDataInScanner] = useState("");

  const handleQrCodeSuccess = (decodedText, decodedResult) => {
    setScannedDataInScanner(decodedText);
    scannedDataFromScanner(decodedText); // pass the scanned data back to the SampleBag component
    Html5Qrcode.stop(); // stop scanning
  };

  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        const html5QrCode = new Html5Qrcode("reader");
        const config = {
          fps: 100,
          qrbox: {
            width: window.screen.width < 600 ? 200 : 300,
            height: window.screen.width < 600 ? 100 : 100,
          },
          aspectRatio: 1,
        };

        try {
          html5QrCode.start(
            { facingMode: { exact: "environment" } },
            config,
            handleQrCodeSuccess
          );
          setTimeout(function () {
            html5QrCode.applyVideoConstraints({
              focusMode: "continuous",
              advanced: [{ zoom: 2.0 }],
            });
          }, 2000);
        } catch (error) {
          console.log("Unable to start scanning.", error);
        }
      }
    })
    .catch((err) => {
      console.log("Error getting cameras", err);
    });

  return <div id="reader"></div>;
}

export default ScannerComponent;
