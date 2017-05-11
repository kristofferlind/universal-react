import React from 'react';
import PropTypes from 'prop-types';

const isNode = typeof window === 'undefined';

if (!isNode) {
  require('./bundle.scss'); // eslint-disable-line global-require
}

class Bundle extends React.Component {
  static Components = {};

  state = {
    ActiveComponent: null,
    Components: Bundle.Components,
    resolver: null
  };

  componentWillMount() {
    const { name, load } = this.props;
    if (!this.state.Components[name]) {
      load
        .then(module => module.default)
        .then((Component) => {
          Bundle.Components[name] = Component;
          // const clonedComponent = React.cloneElement(Component);
          // bundleActions.cacheComponent({ name, component: clonedComponent });
          if (this.mounted) {
            this.setState({ ActiveComponent: name, Components: Bundle.Components });
          }
          // console.log(Bundle.render()); // eslint-disable-line
        })
        .catch((error) => {
          console.error('mount error: ', error); //eslint-disable-line
        });
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  asyncBootstrap() {
    if (this.state.Components[this.props.name]) {
      return true;
    }
    return this.props.load.then(() => true);
  }

  render() {
    const { Components } = this.state;
    const Component = Components[this.props.name];
    if (Component) {
      return (<Component {...this.props} />);
    }
    return (
      <div className="bundle is-loading">
        Loading..
      </div>
    );
  }
}

Bundle.propTypes = {
  load: PropTypes.instanceOf(Promise).isRequired,
  name: PropTypes.string.isRequired
};

export default Bundle;
