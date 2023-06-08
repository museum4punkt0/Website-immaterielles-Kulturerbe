import { CDealerUser } from './types/d'

export type CParsedDescription = {
  header: string;
  body: Array<string>;
  valid: boolean;
  unparsedBody: string;
}

export type CAccount = {
  token: string;
  user: CDealerUser;
}

export type CRegisterRequest = {
  salutation: 'Frau' | 'Herr' | '';
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  telephone: string;
  captchaToken?: string;
}

export type CPasswordRecoverRequest = {
  username: string;
  captchaToken?: string;
}

export type CRecoverPassword = {
  password: string;
  operationToken: string;
}
