export function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

export function validatePassword(pw) {
    return pw.length >= 8;
}

export function validatePhoneNumber(phone) {
    return /^010-\d{4}-\d{4}$/.test(phone);
}