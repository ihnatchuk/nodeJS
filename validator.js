const ageIsValid = (age) => {
    const res = {
        isValid: false,
        reqMassage: ''
    }

    if ((!isNaN(age)) && (age > 0)) {
        res.isValid = true
        return res
    }
    res.isValid = false
    res.reqMassage = 'Age is incorrect'
    return res
}
const nameIsValid = (name) => {
    const res = {
        isValid: false,
        reqMassage: ''
    }
    if ((typeof name === 'string') && (name.length > 1)&&(name.match(/[a-zA-Z]/g)).length===name.length) {
        res.isValid = true
        return res
    }
    res.isValid = false
    res.reqMassage = 'Name is incorrect'
    return res
}
const genderIsValid = (gender) => {
    const res = {
        isValid: false,
        reqMassage: ''
    }
    if (gender === 'male' || gender === 'female' || gender === 'mixed') {
        res.isValid = true
        return res
    }
    res.isValid = false
    res.reqMassage = 'Gender is incorrect'
    return res
}

module.exports = {
    ageIsValid,
    nameIsValid,
    genderIsValid,
}