export default {
    isPhone: (val) => /^1[3|7|8|5|4]\d{9}$/.test(val),
    isPassword: (pwd) => /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,16}$/.test(pwd),
    // isPassword: (pwd) => /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&*?])[a-zA-Z\d@#$%^&*?]{8,16}$/.test(pwd),
}