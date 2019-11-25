const QRCode = require('qrcode');

const { config } = require('./config');

const { patch, port } = config;

module.exports = () => {
  const adminAddress = `http://192.168.${patch.local_ip}:${port}/admin`;
  QRCode.toString(
    adminAddress,
    {
      errorCorrectionLevel: 'H',
      type: 'terminal'
    },
    (error, string) => {
      if (error) throw new Error(error);
      console.log(`\n${adminAddress}\n`);
      console.log(string);
    }
    );
    
  const viewerAddress = `http://192.168.${patch.local_ip}:${port}/`;
  QRCode.toString(
    viewerAddress,
    {
      errorCorrectionLevel: 'H',
      type: 'terminal'
    },
    (error, string) => {
      if (error) throw new Error(error);
      console.log(`\n${viewerAddress}\n`);
      console.log(string);
    }
  );
}
