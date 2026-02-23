const https = require('https');
const fs = require('fs');
const path = require('path');

const companies = [
    { file: 'teco.png', domain: 'teco.com.tw' },
    { file: 'weg.png', domain: 'weg.net' },
    { file: 'siemens.png', domain: 'siemens.com' },
    { file: 'milton_roy.png', domain: 'miltonroy.com' },
    { file: 'cnp.png', domain: 'cnppump.com' },
    { file: 'flugo.png', domain: 'flugo.co.id' },
    { file: 'ksb.png', domain: 'ksb.com' },
    { file: 'ebara.png', domain: 'ebara.co.jp' },
    { file: 'wilo.png', domain: 'wilo.com' },
];

const dir = path.join(__dirname, 'public/images/clients');

function download(url, dest) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => { file.close(); resolve(true); });
            } else {
                res.resume();
                resolve(false);
            }
        }).on('error', () => resolve(false));
    });
}

async function run() {
    for (const comp of companies) {
        const dest = path.join(dir, comp.file);
        console.log(`Downloading ${comp.file}...`);

        // Attempt 1: Clearbit
        let success = await download(`https://logo.clearbit.com/${comp.domain}?size=256`, dest);

        // Attempt 2: Google Favicon (always returns an image)
        if (!success) {
            console.log(`Falling back to favicon for ${comp.file}`);
            success = await download(`https://www.google.com/s2/favicons?domain=${comp.domain}&sz=128`, dest);
        }
    }
}

run();
