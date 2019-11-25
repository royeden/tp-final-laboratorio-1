const QRCode = require('qrcode');

const { config } = require('./config');

const { patch, port } = config;

const address = `http://192.168.${patch.local_ip}:${port}/timeout`;

QRCode.toString(
  address,
  {
    errorCorrectionLevel: 'H',
    type: 'terminal'
  },
  (error, string) => {
    if (error) throw new Error(error);
    console.log(`\n${address}\n`);
    console.log(string);
  }
);
