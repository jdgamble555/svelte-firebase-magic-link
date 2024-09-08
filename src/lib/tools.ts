export const getEmail = (event: SubmitEvent) => {

    event.preventDefault();

    const { email } = Object.fromEntries(new FormData(event.target as HTMLFormElement));

    if (!email || typeof email !== 'string') {
        throw "No email!";
    }
    return email;
};

