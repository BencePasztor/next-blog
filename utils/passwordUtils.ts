import bcrypt from "bcryptjs"

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}

export const comparePasswords = async (unhashedPassword: string, hashedPassword: string): Promise<boolean> => {
    const compareResult = await bcrypt.compare(unhashedPassword, hashedPassword)

    return compareResult
}

export const generateRandomPassword = (length = 10) => {
    var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var randomPassword = '';
    for (var i = 0; i < length; i++) {
        randomPassword += characters[Math.floor(Math.random() * characters.length)];
    }
    return randomPassword;
}