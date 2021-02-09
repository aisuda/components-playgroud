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

const zip = new JSZip();
const items = fileDisplay('./src/components');

for (const item of items) {
  const source = fs.readFileSync(item).toString();
  const parts = /src\/components\/([jquery|react|vue]+)\/([renderer|formitem|options]+)\/(.+).(js|jsx|tsx)/.exec(
    item
  );

  // 没有命中的就设置成其他的
  if (!parts) {
    continue;
  }

  const [_, framework, usage, name, ext] = parts;

  zip.file(
    `component-${name}.json`,
    JSON.stringify({
      name,
      framework: frameworkMap[framework],
      usage: usageMap[usage],
      type: name,
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
