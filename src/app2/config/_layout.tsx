/* import { APP_ROUTES } from '@/src/routes/routes';
import { Stack, useLocalSearchParams, useRouter, useSegments } from 'expo-router';

import { ProtectedRoute } from '@/src/routes/PrivateRoute';
import { usePrivateRouteGuard } from '@/src/routes/usePrivateRouteGuard';
import { View, Text } from 'react-native';

const appConfig = APP_ROUTES.PRIVATE_APPCONFIG;
  const myRoute = APP_ROUTES.PRIVATE_MYROUTE;
export default function ConfigLayout() {
  const {isLoading} = usePrivateRouteGuard({routesToProtect:[appConfig,myRoute],fallback:'/(private)/fallback'})
  console.log("ConfigLayout");


  if (isLoading) {
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:'red'}}> Carregando...</Text>
    </View>
  }



  return (
    <Stack>

        <Stack.Screen name={appConfig.name} options={{ headerShown: true, title: appConfig.name }} />

        <Stack.Screen name={myRoute.name} options={{ headerShown: true, title: myRoute.name }} />
        <Stack.Screen name="fallback" options={{ headerShown: false }} />

    </Stack>
  );
}
 */