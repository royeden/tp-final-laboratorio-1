const QRCode = require('qrcode');

const { config } = require('./config');

const { patch, port } = config;

module.exports = () => {
  const adminAddress = `http://192.168.${patch.local_ip}:${port}/admin`;
  const timeoutAddress = `http://192.168.${patch.local_ip}:${port}/timeout`;
  const viewerAddress = `http://192.168.${patch.local_ip}:${port}/`;

  [adminAddress, timeoutAddress, viewerAddress].forEach(adress =>
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
    )
  );
};
