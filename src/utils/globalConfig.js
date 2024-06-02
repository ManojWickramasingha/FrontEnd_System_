<<<<<<<<< Temporary merge branch 1
=========
import { PATH_DASHBOARD_ADMIN, PATH_DASHBOARD_USER, PATH_PUBLIC } from "../routes/paths";

// URLS -> about backend
export const HOST_API_KEY = 'https://localhost:5296/api';
export const REGISTER_URL = 'http://localhost:5296/Register';
export const LOGIN_URL = 'http://localhost:5296/Login';
export const ME_URL = 'https://localhost:5296/me';
export const USERS_LIST_URL = 'https://localhost:5296/users';
export const USERNAMES_LIST_URL = 'https://localhost:5296/usernames';
export const ALL_MESSAGES_URL = '/Messages';
export const CREATE_MESSAGES_URL = '/Messages/create';
export const MY_MESSAGE_URL = '/Messages/mine';
export const LOGS_URL = 'https://localhost:5296/api/Log';
export const MY_LOGS_URL = 'https://localhost:5296/api/Log/mine';

// Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN_ADMIN = PATH_DASHBOARD_ADMIN.dashboard;
export const PATH_AFTER_LOGIN_USER = PATH_DASHBOARD_USER.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;
>>>>>>>>> Temporary merge branch 2
