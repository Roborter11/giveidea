const fs = require('node:fs');
const opentype = require('@shuding/opentype.js');
const sharp = require('sharp');
const fontBytes = fs.readFileSync('/System/Library/Fonts/Supplemental/Arial Bold.ttf');
const font = opentype.parse(fontBytes.buffer.slice(fontBytes.byteOffset, fontBytes.byteOffset + fontBytes.byteLength));
const blue = '#3157e8', ink = '#171717', paper = '#f7f7f4';
const icon = (color=blue) => `<path fill="${color}" d="M18 18h28c8.84 0 16 7.16 16 16v4c0 8.84-7.16 16-16 16H24L10 64V51.85A15.97 15.97 0 0 1 2 38v-4c0-8.84 7.16-16 16-16Z"/><circle cx="32" cy="6" r="6" fill="${color}"/><rect x="28" y="27" width="8" height="18" rx="4" fill="${paper}"/>`;
const word = font.getPath('giveidea', 0, 0, 66, {kerning:true,tracking:-35}).toPathData(3);
const lockup = (color=ink, accent=blue) => `<g transform="translate(0 2)">${icon(accent)}</g><path d="${word}" transform="translate(85 52)" fill="${color}"/>`;
const svg = (w,h,body,title) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title"><title id="title">${title}</title>${body}</svg>`;
fs.writeFileSync('design/logo/giveidea-logo.svg', svg(340,70,lockup(),'giveidea'));
fs.writeFileSync('design/logo/giveidea-logo-dark.svg', svg(340,70,lockup(paper,'#8298ff'),'giveidea — dark background'));
fs.writeFileSync('design/logo/giveidea-mark.svg', svg(64,66,icon(),'giveidea symbol'));
const label = (x,y,text,color='#777771',size=13) => `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" letter-spacing="1.5" fill="${color}">${text}</text>`;
const board = svg(1440,1000,`<rect width="1440" height="1000" fill="${paper}"/>
${label(72,66,'GIVEIDEA / LOGO CONCEPT')}${label(1220,66,'01 — 2026')}
<g transform="translate(300 215) scale(2.5)">${lockup()}</g>
${label(72,525,'SHARE A THOUGHT. START SOMETHING.',ink,14)}
<path d="M72 560H1368" stroke="#dcdcd6"/>
<rect x="72" y="606" width="632" height="298" rx="20" fill="${ink}"/>
${label(106,648,'ON DARK','#a5a5a0',11)}
<g transform="translate(175 724) scale(1.28)">${lockup(paper,'#8298ff')}</g>
<rect x="736" y="606" width="298" height="298" rx="20" fill="${blue}"/>
${label(770,648,'SYMBOL','#dbe2ff',11)}
<g transform="translate(837 704) scale(1.5)">${icon(paper).replace(`fill="${paper}"/>`, `fill="${paper}"/>`).replace(/<rect x="28"([^>]+)fill="#f7f7f4"/, '<rect x="28"$1fill="#3157e8"')}</g>
<rect x="1066" y="606" width="302" height="298" rx="20" fill="#eaeae4"/>
${label(1100,648,'SMALL SIZES','#777771',11)}
<g transform="translate(1121 743) scale(.375)">${icon()}</g>
<g transform="translate(1185 735) scale(.625)">${icon()}</g>
<g transform="translate(1264 723)">${icon()}</g>
${label(72,958,'DIALOGUE + IDEA',ink,12)}${label(1130,958,'#3157E8 / #171717',ink,12)}`,'giveidea logo presentation');
fs.writeFileSync('design/logo/giveidea-preview.svg',board);
sharp(Buffer.from(board)).png().toFile('design/logo/giveidea-preview.png');
