import * as YAML from 'yamljs';
import { resolveRefs } from 'json-refs';

/**
 * Return JSON with resolved references
 * @param {array | object} root - The structure to find JSON References within (Swagger spec)
 * @returns {Promise.<JSON>}
 */
export const multiFileSwagger = (root: any) => {
  const options = {
    filter: ['relative', 'remote'],
    location: 'src/schemas/private.yaml',
    loaderOptions: {
      processContent: function (res: any, callback: any) {
        callback(null, YAML.parse(res.text));
      },
    },
  };

  return resolveRefs(root, options).then(
    function (results: any) {
      return results.resolved;
    },
    function (err: any) {
      console.log(err.stack);
    },
  );
};
