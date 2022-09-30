import { SerialPort } from 'serialport';

const getPesoServices = () =>
  new Promise<string>((res, rej) => {
    const path = 'COM1';

    const serialPort = new SerialPort(
      {
        path: path,
        baudRate: 9600,
        autoOpen: false,
        lock: true,
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
      const timeOut = setTimeout(() => {
        if (serialPort.isOpen) {
          clearTimeout(timeOut);
          rej('The balance is not connected');
          return;
        }
      }, 10000);
    });

    serialPort.on('data', (data: string, err: Error) => {
      if (err) {
        rej(err);
        return;
      }
      serialPort.close((err) => {
        if (err) {
          rej(err);
          return;
        }
      });
      res(data);
      return;
    });
  });

export default getPesoServices;
