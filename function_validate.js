// Style for Text
export const styleText = (key) => {
    key.style.color = "red"
    key.style.fontStyle = "italic"
    key.style.fontSize = "14px"
}


// check email duplicated
export const validateEmail = (email) => {
    // get value of Local Storage
    let getLocalStorage = localStorage.getItem('userList')

    let users = JSON.parse(getLocalStorage)

    for (let data of users) {
        if (email === data.email) {
            return true
        }
    }
    return false
}

// check password duplicated
export const validatePassword = (pwd) => {
    // get value of Local Storage
    let getLocalStorage = localStorage.getItem('userList')

    let users = JSON.parse(getLocalStorage)

    for (let data of users) {
        if (pwd === data.password) {
            return true //email da ton tai
        }
    }
    return false // emaail chx ton tai -> va co the dang ki dc
}