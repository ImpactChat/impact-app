export interface User {
  id: number;
  token?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface Code {
  name: string;
  classe_groupe: string;
  prof: string;
  start: Date;
  end: Date;
  code: BigInt;
  link: string;
  pk: BigInteger;
}
