import { Route } from "expo-router";

interface MyRoutes<P extends Record<string, string> | undefined = undefined> {
  path: Route;
  params?: P; // `params` agora é opcional
}

export type AllRoutes = {
  /*   EXAMPLEWITHPARAMS: MyRoutes<{ userId: string }>; */
  APPCONFIG: MyRoutes<undefined>;
  MYROUTE: MyRoutes<undefined>; 
};

export const APP_ROUTES: AllRoutes = {
  /*   EXAMPLEWITHPARAMS: {
    path: '/(private)/config/myRoute',
    redirect: '/login',
    params: { userId: 'defaultUser' }, // valor default => garante inferência como string
  }, */
  APPCONFIG: {
    path: "/(private)/config/appConfig",
  },

  MYROUTE: {
    path: "/(private)/config/myRoute",
  },
};
