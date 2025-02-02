import { APP_ROUTES } from '@/src/routes/routes';
import { useTypedNavigation, useTypedSearchParams } from '@/src/routes/useTypedNavigation';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function TestScreen() {
  const { navigate } = useTypedNavigation();



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>



      <Button title="Ir para appConfig" onPress={() => router.push(APP_ROUTES.APPCONFIG.path)} />
      <Button title="Ir para appConfig com safeRouter" onPress={() => navigate({ route: 'APPCONFIG' })} />


      <Button
        title="Ir para HOME (exige userId)"

        onPress={() => {
          // O TS obriga a passar { params: { userId: string } }
          navigate({ route: 'APPCONFIG' });
        }}
      />


      <Button
        title="Ir para ABOUT (sem params)"
        onPress={() => {
          // 'ABOUT' não tem params => chamamos só com { route: 'ABOUT' }
          navigate({ route: 'MYROUTE'});
        }}
      />
    </View>



  );
}

  