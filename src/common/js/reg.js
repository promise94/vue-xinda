export default {
    isPhone: (val) => /^1[3|7|8|5|4]\d{9}$/.test(val),
    isPassword: (pwd) => /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{8,16}$/.test(pwd),
    isEmail: (email)=> /^[A-Za-z\d]+([-_][A-Za-z\d]+)*@[A-Za-z\d]+\.[A-Za-z\d]{2,4}$/.test(email),
}