import { Client, Models, OAuthProvider } from 'react-native-appwrite';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useState, useEffect } from 'react';
import { Account } from 'react-native-appwrite';
import ApiClient from '@/backend/appwrite/config/appwrite.client';

WebBrowser.maybeCompleteAuthSession();


export const useGoogleAuth = () => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(false);

    const [_, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '11195953346-mlog0out7hg9ior8pptb76ik5dscetph.apps.googleusercontent.com',
        iosClientId: '1195953346-e82kjuiknd48cfb2mjj31ifksoctpgvq.apps.googleusercontent.com',
        webClientId: '11195953346-1s441iu95hs302ated22mksk1jfhgtt1.apps.googleusercontent.com', 

    });

    useEffect(() => {
        console.log('response', response)
        if (response?.type === 'success') {
            handleGoogleLogin(response.authentication?.accessToken);
        }
    }, [response]);

    

    const handleGoogleLogin = async (token: string | undefined) => {
        if (!token) return;
        
        try {
            setLoading(true);
            // Criar sessão OAuth2 no Appwrite
            await ApiClient.account.createOAuth2Session(OAuthProvider.Google, token);
            const session = await ApiClient.account.get();
            setUser(session);
        } catch (error) {
            console.error('Erro na autenticação:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await ApiClient.account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return {
        user,
        loading,
        login: promptAsync,
        logout,
    };
};