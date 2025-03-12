



import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  aws_project_region: 'us-east-1',
  Interactions: {
    bots: {
      'clinical-bot': {
        name: 'examplebot',
        aliasId: '3xxx',
        botId: 'xx',
        localeId: 'es_US',
        region: 'us-east-1',
      },
    },
  },
};

Amplify.configure(amplifyConfig);

export default amplifyConfig;