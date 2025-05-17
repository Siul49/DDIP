export function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export function validatePassword(pw) {
    return pw.length >= 8;
}