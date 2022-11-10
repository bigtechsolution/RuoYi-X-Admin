export default {
  '*.{md,json}': ['prettier --cache --write'],
  '*.{js,jsx}': ['eslint --fix', 'prettier --cache --write'],
  '*.{css,less}': ['prettier --cache --write'],
  '*.ts?(x)': ['eslint --fix', 'prettier --cache --parser=typescript --write'],
};
