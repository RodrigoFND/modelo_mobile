



import { useAuth } from "@/src/providers/auth/AuthProvider";
import { useUserStore } from "@/src/store/user/useUserStore";
import { useEffect } from "react";
import { Button, FlatList, SafeAreaView, Text,View } from "react-native";

export default function ListaUsers() {
  /*   const { data,isFetching, isLoading, error } = useUserStore.useGetUsers(); */
    const { user,session } = useAuth();
    const { signOut } = useAuth();



/*  useEffect(() => {
   
  }, [data]);
 */

 

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         {/*    <Link href="/about" style={{ fontSize: 20, fontWeight: 'bold', color: 'green'}}>About</Link> */}
         <Button color={"red"} title="Logout" onPress={signOut} />
         <Text style={{ fontFamily: "SpaceMono", color: "red" }}>User: {user?.username}</Text>
         <Text style={{ fontFamily: "SpaceMono", color: "red" }}>Session ID: {session?.id}</Text>
         <Text style={{ fontFamily: "SpaceMono", color: "red" }}>Access Token: {session?.accessToken}</Text>
         <Text style={{ fontFamily: "SpaceMono", color: "red" }}>Refresh Token: {session?.refreshToken}</Text>

        
    {/*         <FlatList
                data={data}
                keyExtractor={(item) => item.phone.toString()}
                renderItem={({ item }) => (
            <View style={{ padding: 10, margin: 10}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red'}}>{item.name}</Text>
            </View>
          )}
        /> */}
        </View>
      </SafeAreaView>
    );
    };