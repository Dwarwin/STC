export const CONF = [
    {
        id: nickname,
        minLength: 3,
        required: true
    },
    {
        id: firstName,
        minLength: 2,
        required: true
    },
    {
        id: lastName,
        minLength: 2,
        required: true
    },
    {
        id: email,
        required: true,
        pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
    },
    {
        id: bday,
        required: true,
        pattern: /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/
    },
    {
        id: password,
        required: true,
        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    },
    {
        id: rePassword,
        required: true,
        pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    }
];