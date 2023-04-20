import {body} from "express-validator"

export const registerValidation =[
    body('phone', 'Введіть номер.').isMobilePhone(),
    body('password','Пароль повинен бути мінімум 7 сімволів.').isLength({min: 7}),
    body("password2").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Паролі не співпадають.");
        }
        // Indicates the success of this synchronous custom validator
        return true;
      }),
    body('email','Неправильний формат пошти.').isEmail(),
    body('first_name','Введіть ім\'я.').isLength({min:2}),
    body('last_name','Введіть прізвище.').isLength({min: 3}),
    // body("birthday", "Введіть дату народження у форматі YYYY-MM-DD.").isISO8601(),
]

export const loginValidation =[
    body('phone', 'Введіть номер.').isMobilePhone(),
    body('password','Пароль повинен бути мінімум 7 сімволів.').isLength({min: 7}),
]