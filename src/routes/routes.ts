import { Route } from "expo-router";
import { PermissionsList  } from "../models/services/auth/auth.models";

export interface MyRoutes<P extends Record<string, string> | undefined = undefined> {
  name: string;
  path: Route;
  params?: P; // `params` agora é opcional
  redirect?: Route;
  permission: PermissionsList[];
}

type PrivateRoutes = {
  PRIVATE_APPCONFIG: MyRoutes<undefined>;
  PRIVATE_MYROUTE: MyRoutes<undefined>; 
}

type PublicRoutes = {
  PUBLIC_SIGNIN: MyRoutes<undefined>;
}

export type AllRoutes = PrivateRoutes & PublicRoutes;

const PRIVATE_ROUTES: PrivateRoutes = {
  PRIVATE_APPCONFIG: {
    name: "appConfig",
    path: "/(private)/config/appConfig",
    redirect: "/",
    permission: [],
  },


  PRIVATE_MYROUTE: {
    name: "myRoute",
    path: "/(private)/config/myRoute",
    redirect: "/",
    permission: [],
  },
}

const PUBLIC_ROUTES: PublicRoutes = {
  PUBLIC_SIGNIN: {
    name: "signIn",
    path: "/(public)/signIn",
    permission: ["comments:create"],
  },
}



export const APP_ROUTES: AllRoutes = {
  ...PRIVATE_ROUTES,
  ...PUBLIC_ROUTES,
  /*   EXAMPLEWITHPARAMS: {
    path: '/(private)/config/myRoute',
    redirect: '/login',
    params: { userId: 'defaultUser' }, // valor default => garante inferência como string
  }, */
}



