const QRCode = require('qrcode');

const { config } = require('./config');

const { patch, port } = config;

module.exports = () => {
  const adress = `http://192.168.${patch.local_ip}:${port}/`;

  QRCode.toString(
    adress,
    {
      errorCorrectionLevel: 'H',
      type: 'terminal'
    },
    (error, string) => {
      if (error) throw new Error(error);
      console.log(`\n${adress}\n`);
      console.log(string);
    }
  );
};
