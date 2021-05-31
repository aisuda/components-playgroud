const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

const frameworkMap = {
  react: 0,
  vue: 1,
  jquery: 2
};

const usageMap = {
  renderer: 0,
  formitem: 1,
  options: 2
};

const basePath = 'src/components/';

const zip = new JSZip();
const items = fileDisplay(basePath);

for (const item of items) {
  const source = fs.readFileSync(item).toString();
  const parts = /src\/components\/([jquery|react|vue]+)\/([renderer|formitem|options]+)\/(.+)\/(.+)(?<!-plugin).(tsx|jsx|js)/.exec(
    item
  );

  // 没有命中的就设置成其他的
  if (!parts) {
    continue;
  }

  const [_, framework, usage, folderName, name, ext] = parts;
  let entry = [name]; // 资源入口
  let files = [{ // 文件源码
    name,
    type: 'component',
    source,
    ext
  }];
  const cmptPath = `${basePath}${framework}/${usage}/${folderName}/`;

  // 一个样式文件就可以了，scss格式
  const styleFile = source.match(/import (\"|\')(\.\/.+\.scss)\1/);
  if (styleFile) {
    const style = fs.readFileSync(path.resolve(cmptPath, styleFile[0].match(/import \'(\S*)'/)[1])).toString();
    files.push({
      name: 'style',
      type: 'style',
      source: style,
      ext: 'scss'
    });
  }

  const pluginFile = fs.existsSync(`${cmptPath}plugin/`) && fileDisplay(`${cmptPath}plugin/`);
  if (pluginFile) {
    // 一个组件对应一个插件
    const plugin = fs.readFileSync(`./${pluginFile[0]}`).toString();
    entry.push(`${name}-plugin`)
    files.push({
      name: `${name}-plugin`,
      type: 'plugin',
      source: plugin,
      ext: pluginFile[0].replace(/.+\./, '')
    });
  }

  zip.file(
    `component-${name}.json`,
    JSON.stringify({
      name,
      framework: frameworkMap[framework],
      usage: usageMap[usage],
      type: name,
      source,
      entry,
      files,
      status: 1,
      description: ''
    })
  );
}


const utils = fileDisplay('./src/util');

for (const util of utils) {
  if (!/src\/util\/(.+)\.([js|jsx|tsx])+/.test(util)) {
    continue;
  }

  const source = fs.readFileSync(util).toString();
  const name = RegExp.$1.replace(/\//g, '-');

  zip.file(
    `util-${name}.json`,
    JSON.stringify({
      name,
      framework: 0,
      usage: 3,
      type: `util-${name}`,
      source,
      status: 1,
      description: ''
    })
  );
}

zip
  .generateNodeStream({type: 'nodebuffer', streamFiles: true})
  .pipe(fs.createWriteStream('components.zip'));

// 获取所有子文件
function fileDisplay(filePath, result = []) {
  const files = fs.readdirSync(filePath);

  files.forEach(filename => {
    const filedir = path.join(filePath, filename);
    const stats = fs.statSync(filedir);

    if (stats.isFile()) {
      result.push(filedir);
    } else if (stats.isDirectory()) {
      fileDisplay(filedir, result);
    }
  });

  return result;
}
