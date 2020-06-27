// tslint:disable
const JsonML = require('jsonml.js/lib/utils');
const mustache = require('mustache');
const fs = require('fs');

export function isHeading(node: any) {
  return /h[1-6]/i.test(typeof node === 'string' ? node : JsonML.getTagName(node));
}

export function isStandalone(tagName: string) {
  return tagName === 'hr' || tagName === 'br' || tagName === 'img';
}

export function escapeHTML(str: string, escapeQuotes: boolean = false) {
  if (!str || typeof str !== 'string') {
    return '';
  }

  let escaped = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  if (escapeQuotes) {
    return escaped.replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  }

  return escaped;
}

export function getCode(node: any) {
  return JsonML.getChildren(JsonML.getChildren(node)[0] || '')[0] || '';
}

export function generateSluggedId(children: any): { id: string; text: string } {
  const headingText = children
    .map((node: any) => {
      if (JsonML.isElement(node)) {
        if (JsonML.hasAttributes(node)) {
          return node[2] || '';
        }
        return node[1] || '';
      }
      return node;
    })
    .join('');
  const sluggedId = headingText.trim().replace(/\s+/g, '-');
  return {
    id: sluggedId,
    text: headingText,
  };
}

export function genAttr(attr: any) {
  const ret: any[] = [];
  if (attr) {
    for (const key in attr) {
      ret.push(`${key}="${attr[key]}"`);
    }
  }
  return ret.join(' ');
}

export function generateDoc(data: any, tpl: string, path: string) {
  const content = mustache.render(tpl, data);
  fs.writeFileSync(path, content, { flag: 'w+' });
}

export function genUpperName(name: string) {
  return name
    .split('-')
    .map(v => v.charAt(0).toUpperCase() + v.slice(1))
    .join('');
}
