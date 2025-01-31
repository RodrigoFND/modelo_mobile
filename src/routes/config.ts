import { useMemo } from "react";


const screens = {
  config: [
    { name: "index", title: "Configurações", roles: ["user", "admin"] },
    { name: "appConfig", title: "App Config", roles: ["admin"] },
    { name: "userConfig", title: "User Config", roles: ["user", "admin"] },
  ],
  profile: [
    { name: "index", title: "Perfil", roles: ["user", "admin"] },
    { name: "users", title: "Usuários", roles: ["admin"] },
    { name: "company", title: "Empresa", roles: ["admin"] },
  ],
};

