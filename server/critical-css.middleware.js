// express-inline-css, rewritten to work and follow this projects rules
import flatten from 'lodash.flatten';
import uniq from 'lodash.uniq';
import fs from 'fs';

const RE_CLASS = /class="([^"]*)"/gi;
const DEFAULT_SELECTORS = ['html', 'body', 'h1', 'h2', 'h3'];

const cache = {};

export default ({ override = true, cssFilePath }) => {
  function getClassSelectors({ content = '' }) {
    const result = [];
    let matches;
    while (matches) {
      result.push(matches[1].split(' '));
      matches = RE_CLASS.exec(content);
    }
    return uniq(flatten(result)).map(className => `.${className}`).concat(DEFAULT_SELECTORS);
  }

  function getStylesheet() {
    return new Promise((resolve, reject) => {
      fs.readFile(cssFilePath, 'utf8', (err, file) => {
        if (err) {
          return reject(err);
        }
        return resolve(file);
      });
    });
  }

  function extractCss({ stylesheet = '', selectors = [] }) {
    const styles = stylesheet.split('}');
    const styleRules = [];
    styles.forEach((style) => {
      let updatedStyle = `${style}}`;
      updatedStyle = updatedStyle.replace(/\r\n|\n|\r|\s\s+/gm, ' ');
      selectors.forEach((selector) => {
        if (updatedStyle.indexOf('@media') === -1 && updatedStyle.indexOf(selector) !== -1) {
          styleRules.push(updatedStyle);
        }
      });
    });
    return styleRules;
  }

  function crticalCSS(req, res, next) {
    const renderCallback = () => (err, html) => {
      if (err) {
        return next(err);
      }
      const classSelectors = getClassSelectors({ content: html });
      const cacheKey = classSelectors.join('');

      if (cache[cacheKey]) {
        return res.send(html.replace(/(<head>)/g, `$1${cache[cacheKey] || ''}`));
      }
      return getStylesheet().then((stylesheet) => {
        const cssRules = extractCss({ stylesheet, selectors: classSelectors
        }).join('');
        const style = `<style>${cssRules}</style>`;
        cache[cacheKey] = style;
        res.send(html.replace(/(<head>)/g, `$1${style}`));
      }).catch(error => next(error));
    };

    if (override === false) {
      res.renderInlineCSS = (view, renderOpts, callback) => {
        this.render(view, renderOpts, renderCallback(callback));
      };
    } else {
      res.oldRenderMethod = res.render;
      res.render = function criticalCSSRender(view, renderOpts, callback) {
        this.oldRenderMethod(view, renderOpts, renderCallback(callback));
      };
    }

    return next();
  }

  return (crticalCSS);
};
