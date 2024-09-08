import { getUser } from '$lib/use-user';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { browser } from '$app/environment';

export const load: PageLoad = async () => {

    if (!browser) {
        return {
            loading: true
        };
    }

    const loggedIn = !!(await getUser());

    if (loggedIn) {
        return redirect(302, '/');
    }
};