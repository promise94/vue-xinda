export default {
    isPhone: (val) => /^1\d{10}$/.test(val),
    isPassword: (pwd)=> /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z\d]{6,16}$/.test(pwd),
}