import { SerialPort } from 'serialport';

const getPesoServices = () =>
  new Promise<string>((res, rej) => {
    const path = 'COM1';

    const serialPort = new SerialPort(
      {
        path: path,
        baudRate: 9600,
        autoOpen: false,
      },
      (err) => {
        if (err) {
          rej(err);
          return;
        }
      }
    );

    serialPort.open((err) => {
      if (err) {
        rej(err);
        return;
      }
    });
    serialPort.on('open', () => {
      console.log('Serial Port Opend');
    });

    serialPort.on('data', (data: string, err: Error) => {
      if (err) {
        rej(err);
        return;
      }
      serialPort.on('close', () => console.log('Serial Port Close'));
      res(data);
      return;
    });
  });

export default getPesoServices;
