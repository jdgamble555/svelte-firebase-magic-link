export const getEmail = (event: SubmitEvent) => {
    const { email } = Object.fromEntries(new FormData(event.target as HTMLFormElement));

    if (!email || typeof email !== 'string') {
        throw "No email!";
    }
    return email;
};

