interface userData {
    mail: string;
    pass: string;
}

const SERVER_URI = process.env.SERVER_URI;

const logIn = async (userData: userData): Promise<any> => {
    const response = await fetch(SERVER_URI + 'users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    return result;
}

const signIn = async (userData: userData): Promise<any> => {
    const response = await fetch(SERVER_URI + 'users/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    return result;
}
export { logIn, signIn }