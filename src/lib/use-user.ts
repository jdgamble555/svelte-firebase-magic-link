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
import { get, readable, type Subscriber } from "svelte/store";
import { auth } from "./firebase";
import { dev } from "$app/environment";
import { page } from "$app/stores";
import { FirebaseError } from "firebase/app";
import { goto } from "$app/navigation";

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

export const useUser = (defaultUser: UserType | null = null) =>
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

export const sendMagicLink = async (email: string) => {

    try {
        await sendSignInLinkToEmail(auth, email, {
            handleCodeInApp: true,
            url: get(page).url.origin
        });
        localStorage.setItem('emailForSignIn', email);
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
            return e;
        }
    }
};

export const detectMagicLink = async () => {

    if (!isMagicLinkURL()) {
        return;
    }

    const email = localStorage.getItem('emailForSignIn');

    if (email) {
        return await signInWithMagic(email);
    }
};

export const signInWithMagic = async (email: string) => {

    const url = get(page).url.toString();

    try {
        await signInWithEmailLink(auth, email, url);
        localStorage.removeItem('emailForSignIn');

        // clear URL params
        const _url = get(page).url;
        await goto(`${_url.protocol}//${_url.host}${_url.pathname}`);
    } catch (e) {
        if (e instanceof FirebaseError) {
            console.error(e);
            if (e.code === 'auth/invalid-action-code') {
                // handle invalid login cases...
            }
            return e;
        }
    }
};

export const isMagicLinkURL = () => {

    const url = get(page).url.toString();

    return isSignInWithEmailLink(auth, url);
};







