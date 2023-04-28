function randomString(len) {
  let chars = 'abcdefghijklmnopqrstuvwxyz';

  let str = [];
  for (let i = 0; i < len; i++) str.push(chars.charAt(Math.floor(Math.random() * (chars.length-1))));

  return str.join('');
}
module.exports.randomString = randomString;