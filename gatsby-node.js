const _ = require(`lodash`);
const crypto = require(`crypto`);

async function onNodeCreate({ node, boundActionCreators, loadNodeContent }) {
  const { createNode, updateNode } = boundActionCreators;

  // Only care source data with json
  if (node.sourceInstanceName !== 'data' || node.internal.mediaType !== 'application/json') return;

  const content = await loadNodeContent(node);

  _.forOwn(JSON.parse(content), (value, key) => {
    const JSONArray = value.map((obj, i) => {
      const objStr = JSON.stringify(obj);
      const contentDigest = crypto.createHash(`md5`).update(objStr).digest(`hex`);

      return Object.assign({}, obj, {
        id: obj.id ? obj.id : `${key} [${i}] >>> JSON`,
        children: [],
        parent: node.id,
        internal: {
          contentDigest,
          mediaType: `application/json`,
          // TODO make choosing the "type" a lot smarter. This assumes
          // the parent node is a file.
          // PascalCase
          type: _.upperFirst(_.camelCase(`${key} Json`)),
          content: objStr
        }
      });
    });

    //addNodeToParent({ parent: node, child: j })
    _.each(JSONArray, j => createNode(j));
  });

  return;
}

exports.onNodeCreate = onNodeCreate;