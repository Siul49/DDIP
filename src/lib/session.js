const { sealData, unsealData } = require('iron-session');

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error('SESSION_SECRET 환경변수가 필요해요!');
}

// 세션 암호화
async function encrypt(data) {
    return await sealData(data, {
        password: sessionSecret,
        ttl: 60 * 60 * 24 * 7, // 7일
    });
}

// 세션 복호화
async function decrypt(session) {
    try {
        return await unsealData(session, {
            password: sessionSecret,
        });
    } catch (err) {
        console.error('세션 복호화 실패:', err);
        return null;
    }
}

module.exports = { encrypt, decrypt };
