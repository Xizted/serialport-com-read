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
        rej(new Error('The balance is not connected'));
        return;
      }
    });

    port.on('open', () => {
      console.log('Serial Port Opend');

      const data = [
        '= \n \r 0000001kg',
        '= \n \r 0000002kg',
        '= \n \r 0000003kg',
        '= \n \r 0000004kg',
        '= \n \r 0000005kg',
        '= \n \r 0000006kg',
        '= \n \r 0000007kg',
        '= \n \r 0000008kg',
        '= \n \r 0000009kg',
        '= \n \r 0000010kg',
        '= \n \r 0000011kg',
        '= \n \r 0000012kg',
        '= \n \r 0000013kg',
      ];

      port.port?.emitData(
        data[Math.floor(Math.random() * (data.length - 1 + 1) + 1 - 1)]
      );
    });

    port.on('data', (data: Buffer, err: Error) => {
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

      if (data.toString().includes('kg')) res(data.toString());
      return;
    });
  });

export default getPesoTestServices;
