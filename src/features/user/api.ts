import {
  IUserCredentials,
  IRegisterSuccess,
  UserRole,
  PasswordObj,
  EmailObj,
  IUser,
} from './userSlice';
import axios, { AxiosError } from 'axios';
import { ValidationErrors } from '../promotion/promotionSlice';
import clientApi from '../shared/api';

const USERS_URL = clientApi + '/auth/users/';
const AUTH_URL = clientApi + '/auth/signin';

export interface AccessTokenDTO {
  accessToken: string;
}

export interface AuthorizationDTO {
  Authorization: string;
}

function parseStorage(location: string, target: string) {
  if (localStorage.getItem(`${location}`) !== null) {
    const res = JSON.parse(localStorage.getItem(`${location}`) || '{}')[target];
    if (res === 'null' || null) return null;
    return JSON.parse(res);
  }
  return null;
}

const authHeader = (): AuthorizationDTO | unknown => {
  const token = parseStorage('persist:user', 'accessToken');
  if (token !== null) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return {};
  }
};

async function register(arg: IUserCredentials): Promise<IRegisterSuccess> {
  return axios
    .post(USERS_URL, arg, { headers: authHeader() })
    .then((res) => {
      const { email, id } = res.data;
      return { email, id };
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

async function login(arg: IUserCredentials): Promise<AccessTokenDTO> {
  return axios
    .post(AUTH_URL, arg)
    .then((res) => {
      return res.data.accessToken;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

async function fetchRole(): Promise<UserRole> {
  return axios
    .get(USERS_URL + 'role', { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

async function updatePassword(passwords: PasswordObj): Promise<string> {
  return axios
    .patch(USERS_URL + 'changepw', passwords, { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

async function updateEmail(emails: EmailObj): Promise<string> {
  return axios
    .patch(USERS_URL + 'email', emails, { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

async function fetchAllUsers(): Promise<IUser[]> {
  return axios
    .get(USERS_URL, { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

async function deleteUser(id: string): Promise<void> {
  return axios
    .delete(USERS_URL + id, { headers: authHeader() })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const error: AxiosError<ValidationErrors> = err;
      if (!error.response) {
        throw err;
      }
      return Promise.reject(err);
    });
}

export {
  deleteUser,
  fetchAllUsers,
  updateEmail,
  updatePassword,
  fetchRole,
  login,
  register,
  authHeader,
  AUTH_URL,
  USERS_URL,
};
