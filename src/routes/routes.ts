import { Route } from "expo-router";
import { PermissionsList } from "../models/services/auth.models";

export interface MyRoutes<
  P extends Record<string, string> | undefined = undefined
> {
  name: string;
  path: Route;
  params?: P; // `params` agora é opcional
  redirect?: Route;
  permission: PermissionsList[];
}

type PrivateRoutes = {
  PRIVATE_ROOT: MyRoutes<undefined>;
  PRIVATE_COMPONENTS_ROOT: MyRoutes<undefined>;
  PRIVATE_COMPONENTS_ATOMS_BUTTONS: MyRoutes<undefined>;
  PRIVATE_COMPONENTS_ATOMS_TEXTS: MyRoutes<undefined>;
  PRIVATE_COMPONENTS_ATOMS_INPUTS: MyRoutes<undefined>;
  PRIVATE_COMPONENTS_PAGES_TESTEUM_LIST: MyRoutes<undefined>;
  PRIVATE_COMPONENTS_PAGES_TESTEUM_ID: MyRoutes<{ id: string,nome:string }>;
};

type PublicRoutes = {
  PUBLIC_SIGNIN: MyRoutes<undefined>;
};

export type AllRoutes = PrivateRoutes & PublicRoutes;

const PRIVATE_ROUTES: PrivateRoutes = {
  PRIVATE_ROOT: {
    name: "index",
    path: "/(private)",
    permission: [],
  },
  PRIVATE_COMPONENTS_ROOT: {
    name: "index",
    path: "/(private)/components",
    permission: [],
  },

  PRIVATE_COMPONENTS_ATOMS_BUTTONS: {
    name: "atoms/buttons",
    path: "/(private)/components/atoms/buttons",
    permission: [],
  },
  PRIVATE_COMPONENTS_ATOMS_TEXTS: {
    name: "atoms/texts",
    path: "/(private)/components/atoms/texts",
    permission: [],

  },
  PRIVATE_COMPONENTS_ATOMS_INPUTS: {
    name: "atoms/inputs",
    path: "/(private)/components/atoms/inputs",
    permission: [],
  },
  PRIVATE_COMPONENTS_PAGES_TESTEUM_LIST: {
    name: "pages/(testeUm)/index",
    path: "/(private)/components/pages/(testeUm)",
    permission: [],
  },


  PRIVATE_COMPONENTS_PAGES_TESTEUM_ID: {
    name: "pages/(testeUm)/[id]",
    path: "/(private)/components/pages/(testeUm)/[id]",
    params: { id: "",nome:"" },
    permission: [],
  },
};

const PUBLIC_ROUTES: PublicRoutes = {
  PUBLIC_SIGNIN: {
    name: "signIn",
    path: "/(public)/signIn",
    permission: ["comments:create"],
  },
};

export const APP_ROUTES: AllRoutes = {
  ...PRIVATE_ROUTES,
  ...PUBLIC_ROUTES,
  /*   EXAMPLEWITHPARAMS: {
    path: '/(private)/config/myRoute',
    redirect: '/login',
    params: { userId: 'defaultUser' }, // valor default => garante inferência como string
  }, */
};
