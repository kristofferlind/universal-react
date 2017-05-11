import production from './environment.production';
import development from './environment.development';

let environment;
if (process.env.NODE_ENV === 'production') {
  environment = production;
} else {
  environment = development;
}

export default environment;
