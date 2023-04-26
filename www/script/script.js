document.querySelector('#signup-submit').onclick = function (event) {
    event.preventDefault();
    let name = document.querySelector('#signup-name').value;
    let pass = document.querySelector('#signup-pass').value;
    let email = document.querySelector('#signup-email').value;
    let birthday = document.querySelector('#signup-birthday').value;
    let sex = document.querySelectorAll('.sex');
    for (let i = 0; i < sex.length; i++) {
        if (sex[i].checked) {
            sex = sex[i].value;
            break;
        }
    }
    let data = {
        "name": name,
        "pass": pass,
        "email": email,
        "birthday": birthday,
        "sex": sex,
    }

    ajax('http://localhost/tools/phpmyadmin/index.php?db=loud&token=3220e6281958f309964b08a316d2dd37', 'POST', signup, data);

    function signup(result) {
        console.log(result);
        if (result == 2) {
            alert('Заполните поля');
        }
        else if (result == 1) {
            alert('Успех. Теперь можно войти!');
        }
        else {
            alert('Ошибка, повторите регистрацию позже!');
        }
    }
}

document.querySelector('#login-submit').onclick = function (event) {
    event.preventDefault();
    let pass = document.querySelector('#login-pass').value;
    let email = document.querySelector('#login-email').value;

    let data = {
        "pass": pass,
        "email": email
    }

    ajax('http://localhost/tools/phpmyadmin/index.php?db=loud&token=3220e6281958f309964b08a316d2dd37', 'POST', login, data);

    function login(result) {
        //console.log(result);
        if (result == 2) {
            alert('Заполните поля');
        }
        else if (result == 0) {
            alert('Пользователь не найден!');
        }
        else {
            console.log(result);
            result = JSON.parse(result);
            var d = new Date();
            d.setTime(d.getTime() + (60 * 1000));
            var expires = d.toUTCString();
            document.cookie = `email=${result.email}; expires=${expires}; path=/`;
            location.href = "loud.php";
        }
    }
}
