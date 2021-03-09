/* eslint-disable global-require */
const data = [
  {
    type: 'supporter',
    // imageUri: require('../assets/urbanears_blue.png'),
    imageUri: require('../assets/gif/animation_640_1.gif'),

    heading: 'Doctor support',
    description: 'Helps doctors visually in diagnosing diseases.',
    key: 'first',
    color: '#9dcdfa',
  },
  {
    type: 'Machine Leaning',
    // imageUri: require('../assets/urbanears_pink.png'),
    imageUri: require('../assets/gif/animation_640_Macline.gif'),

    heading: 'Machine Leaning',
    description: 'Use machine learning to analyze data.',
    key: 'second',
    color: '#db9efa',
  },
  {
    type: 'AI',
    imageUri: require('../assets/gif/animation_640_noron.gif'),
    heading: 'Artificial Intelligence',
    description: 'Using artificial intelligence to make predictions.',
    key: 'third',
    color: '#999',
  },
  {
    type: 'Result',
    imageUri: require('../assets/gif/animation_640_km2arwnj.gif'),
    heading: 'Result',
    description:
      'Reference results for doctors to better diagnose the disease.',
    key: 'fourth',
    color: '#a1e3a1',
  },
];
export default data;
