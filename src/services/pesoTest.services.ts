import { MockBinding } from '@serialport/binding-mock';
import { SerialPortStream } from '@serialport/stream';

const getPesoTestServices = () =>
  new Promise<string>((res, rej) => {
    const path = 'COM1';

    MockBinding.createPort(path, { echo: true, record: true });

    const port = new SerialPortStream({
      binding: MockBinding,
      path,
      baudRate: 9600,
      autoOpen: false,
    });

    port.open((err) => {
      if (err) {
        rej(err);
        return;
      }
    });

    port.on('open', () => {
      console.log('Serial Port Opend');

      const timeOut = setTimeout(() => {
        if (port.isOpen) {
          clearTimeout(timeOut);
          rej('The balance is not connected');
          return;
        }
      }, 10000);

      const data = [
        '=0000001kg',
        '=0000002kg',
        '=0000003kg',
        '=0000004kg',
        '=0000005kg',
        '=0000006kg',
        '=0000007kg',
        '=0000008kg',
        '=0000009kg',
        '=0000010kg',
        '=0000011kg',
        '=0000012kg',
        '=0000013kg',
      ];

      port.port?.emitData(
        data[Math.floor(Math.random() * (data.length - 1 + 1) + 1 - 1)]
      );
    });

    port.on('data', (data: string, err: Error) => {
      if (err) {
        rej(err);
        return;
      }
      port.close((err) => {
        if (err) {
          rej(err);
          return;
        }
      });
      res(data.toString());
      return;
    });
  });

export default getPesoTestServices;
