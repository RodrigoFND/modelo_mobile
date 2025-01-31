import { useEffect, useMemo, useState } from "react";
import { View, Text } from "react-native";

import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
import { SafeAreaView } from 'react-native-safe-area-context';
import SignIn from "./signIn";
import RoleTesting from "./role-testing";


/* WebBrowser.maybeCompleteAuthSession(); */

export default function InitialIndex() {
  /* 
  const [value, setValue] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const googleOAauth = useOAuth({ strategy: "oauth_google" });

  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
  const childrenContent = useMemo(() => <Text>Google Sign In</Text>, []);

  useEffect(() => {
    if (isLoaded && isSignedIn) console.log("User is signed in");
  }, [isLoaded, isSignedIn]);

  async function onGoogleSignIn() {
    try {
      setIsLoading(true);
      const redirectUrl = await Linking.createURL("/");
      const oAuthFlow = await googleOAauth.startOAuthFlow({ redirectUrl });
      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive)
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });
      } else throw new Error("Failed to authenticate with Google");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCreateUser() {
    createUser("rodrigo@gmail.com", "12345678", "Rodrigo")
      .then(() => {
        console.log("User created");
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSignIn() {
    signIn("rodrigo@gmail.com", "12345678")
      .then(() => {
        console.log("User signed in");
      })
      .catch((error) => {
        console.log(error);
      });
  }
 */
  return (
    <SafeAreaView style={{flex:1}}>
           <SignIn />
           <RoleTesting />
    </SafeAreaView>
   
  );
}
