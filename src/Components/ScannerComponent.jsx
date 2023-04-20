import React, { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

function ScannerComponent({ scannedDataFromScanner }) {
  const [scannedDataInScanner, setScannedDataInScanner] = useState("");

  useEffect(() => {
    let html5QrCode;
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length) {
          html5QrCode = new Html5Qrcode("reader");
          const config = {
            fps: 100,
            qrbox: {
              width: window.screen.width < 600 ? 200 : 300,
              height: window.screen.width < 600 ? 100 : 100,
            },
            aspectRatio: 1,
          };

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
        }
      })
      .catch((err) => {
        console.log("Error getting cameras", err);
      });

    return () => {
      if (html5QrCode) {
        html5QrCode.stop();
      }
    };
  }, []);

  const handleQrCodeSuccess = (decodedText, decodedResult) => {
    setScannedDataInScanner(decodedText);
    scannedDataFromScanner(decodedText); // pass the scanned data back to the SampleBag component
    Html5Qrcode.stop(); // stop scanning
  };

  return <div id="reader"></div>;
}

export default ScannerComponent;
