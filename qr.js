const QRCode = require('qrcode');

const { config } = require('./config');

const { patch, port } = config;

QRCode.toString(
  `192.168.${patch.local_ip}:${port}`,
  {
    errorCorrectionLevel: 'H',
    type: 'terminal'
  },
  (error, string) => {
    if (error) throw new Error(error);
    console.log(string);
  }
);
