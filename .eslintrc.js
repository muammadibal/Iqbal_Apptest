module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    quotes: 'off',
    'object-curly-spacing': [
      'error',
      'always',
      {
        singleValue: false,
        objectsInArrays: false,
        arraysInArrays: false,
        arraysInObjects: false,
        objectsInObjects: false,
        propertyName: false,
      },
    ],
  },
};
