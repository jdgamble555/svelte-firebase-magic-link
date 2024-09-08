import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getUser, isMagicLinkURL, signInWithMagic } from '$lib/use-user';
import { browser } from '$app/environment';


export const load: PageLoad = async ({ url }) => {

    const urlString = url.toString();

    // you can get the email this way as well
    // const _email = url.searchParams.get('email');
    // console.log(_email);

    if (!isMagicLinkURL(urlString)) {
        error(400, 'Bad request');
    }

    // just load on server
    if (!browser) {
        return {
            loading: true
        };
    }

    const loggedIn = !!(await getUser());

    // redirect if already logged in
    if (loggedIn) {
        return redirect(302, '/');
    }

    // ask for email if no email
    const email = localStorage.getItem('emailForSignIn');
    if (!email) {
        return {
            loading: false
        };
    }

    // otherwise login
    const signInError = await signInWithMagic(email, urlString);
    if (signInError) {
        error(500, signInError.message);
    }
    localStorage.removeItem('emailForSignIn');
    return redirect(302, '/');
};