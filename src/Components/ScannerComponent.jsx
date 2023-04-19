import React, { useState, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";

const ScannerComponent = ({ scannedDataFromScanner, readerId }) => {
  const [scannedDataInScanner, setScannedDataInScanner] = useState("");

  const handleQrCodeSuccess = (decodedText, decodedResult) => {
    setScannedDataInScanner(decodedText);
    scannedDataFromScanner(decodedText); // pass the scanned data back to the SampleBag component
    Html5Qrcode.stop(); // stop scanning
  };

  useEffect(() => {
    Html5Qrcode.getCameras().then((devices) => {
      if (devices && devices.length) {
        const html5QrCode = new Html5Qrcode(readerId);
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
            Html5Qrcode.stop();
          }, 60000);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }, [readerId]);

  return (
    <div>
      <div id={readerId}></div>
    </div>
  );
};

export default ScannerComponent;
