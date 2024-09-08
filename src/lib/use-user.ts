import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
    reauthenticateWithPopup,
    type User,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink
} from "firebase/auth";
import { readable, type Subscriber } from "svelte/store";
import { auth } from "./firebase";
import { dev } from "$app/environment";
import { FirebaseError } from "firebase/app";
import { useSharedStore } from "./use-shared";

export const loginWithGoogle = async () =>
    await signInWithPopup(
        auth, new GoogleAuthProvider()
    );

export const reLoginWithGoogle = async () => {
    if (auth.currentUser) {
        await reauthenticateWithPopup(
            auth.currentUser,
            new GoogleAuthProvider()
        );
    }
}

export const logout = async () => await signOut(auth);

const _useUser = (defaultUser: UserType | null = null) =>
    readable<UserType | null>(
        defaultUser,
        (set: Subscriber<UserType | null>) => {
            return onIdTokenChanged(auth, (_user: User | null) => {
                if (!_user) {
                    set(null);
                    return;
                }
                _user.getIdTokenResult()
                    .then((results) => {
                        const username = results.claims.username as string || null;
                        const { displayName, photoURL, uid, email } = _user;
                        if (dev) {
                            console.log(results);
                        }
                        set({ displayName, photoURL, uid, email, username });
                    });

            });
        }
    );

export const useUser = (defaultUser: UserType | null = null) =>
    useSharedStore('user', _useUser, defaultUser);

export const sendMagicLink = async (
    email: string,
    originURL: string
) => {
    try {
        await sendSignInLinkToEmail(auth, email, {
            handleCodeInApp: true,
            url: originURL + '/auth/callback'
        });
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
            return e;
        }
    }
};

export const signInWithMagic = async (
    email: string,
    url: string
) => {
    try {
        await signInWithEmailLink(auth, email, url);
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
            return e;
        }
    }
};

export const isMagicLinkURL = (url: string) => {
    return isSignInWithEmailLink(auth, url);
};







