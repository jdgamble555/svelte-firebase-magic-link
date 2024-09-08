import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { isMagicLinkURL } from '$lib/use-user';
import { browser } from '$app/environment';


export const load: PageLoad = async ({ url }) => {

    const urlString = url.toString();

    if (!isMagicLinkURL(urlString)) {
        error(400, 'Bad request');
    }

    if (!browser) {
        // load client version only
        return {
            email: null
        };
    }

    const email = localStorage.getItem('emailForSignIn');

    return {
        email
    };
};