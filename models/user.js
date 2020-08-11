const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    select: false, // Так по умлочанию хеш пароля пользователя не будет возвращаться из базы
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
