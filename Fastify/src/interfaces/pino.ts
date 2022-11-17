export interface PinoTransportOptions {
  translateTime: string,
  ignore: string,
}

export interface PinoTransport {
  target: string,
  options: PinoTransportOptions,
}

export interface PinoDevelopment {
  transport: PinoTransport,
}

export enum PinoEnvironment {
  development = 'development',
  production = 'production',
}

export interface Pino {
  [PinoEnvironment.production]: boolean,
  [PinoEnvironment.development]: PinoDevelopment,
  test: boolean,
}
