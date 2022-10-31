import { SerialPort } from 'serialport';

export const getPesoServices = () =>
  new Promise<string>((res, rej) => {
    const path = 'COM1';

    const serialPort = new SerialPort({
      path: path,
      baudRate: 9600,
      autoOpen: false,
      lock: true,
    });

    serialPort.open((err) => {
      if (err) {
        rej(new Error('The balance is not connected'));
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
      serialPort.close((err) => {
        if (err) {
          rej(err);
          return;
        }
      });
      res(data.toString());
      return;
    });
  });

export const getPortService = () =>
  new Promise<any[]>((res, rej) => {
    SerialPort.list().then((ports) => {
      let coms: any[] = [];
      ports.forEach((port) => {
        coms.push(port);
      });
      res(coms);
    });
  });
