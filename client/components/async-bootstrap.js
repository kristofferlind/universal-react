// react-async-bootstrapper, modified to not require asyncBootstrap to be set on every single component
// TODO: this functionality has been requested for that project, make a PR

import reactTreeWalker from './tree-walker';

export default function asyncBootstrap(app, options) {
  const visitor = (element, instance) => {
    if (instance && typeof instance.asyncBootstrap === 'function') {
      const result = instance.asyncBootstrap();
      if (result === false) {
        return false;
      }
      if (!result) {
        return true;
      }
      return result;
    }
    return true;
  };

  return reactTreeWalker(app, visitor, {}, options);
}
