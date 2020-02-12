process.on('unhandledRejection', err => {
    console.error(err.message);
});

const { readFileSync, writeFileSync, existsSync } = require('fs');
const fetch = require('node-fetch');
const { select } = require('xpath');
const { DOMParser } = require('xmldom');

const PACKAGES = readFileSync('./Packages.txt')
    .toString() // readFileSync returns a Buffer
    .split(/\n/g) // split the package by new line
    .map(l => {
        const [type, url] = l.split(/:\s+/g);
        if(type.toLowerCase().trim() === 'depiction') {
            try {
                return new URL(url).href; // throws error on invalid URL
            } catch {}
        }
    })
    .filter(Boolean);

writeFileSync('./Depictions.txt', PACKAGES.join('\n'));

/**
 * Get guaranteed(?) package information
 * @param {any} fieldsetNodes 
 */
const BigBossInfo = fieldsetNodes => {
    const info = [];
    const updates = [];

    for(let i = 0; i < fieldsetNodes.length; i++) { // go through every fieldset
        for(const v of Object.values(fieldsetNodes[i].childNodes)) { // minimum 2 fieldsets?
            // Updated and License (and price)
            // this is disgusting.
            if(v.nodeName === 'table') {
                for(const t of Object.values(v.childNodes)) {
                    if(t.tagName === 'tr') {
                        for(const f of Object.values(t.childNodes)) {
                            if(f.tagName === 'td') {
                                info.push(f.childNodes['' + 0].data);
                            }
                        }
                    }
                }
            }
        }

        if(i > 0 && Object.values(fieldsetNodes[i].childNodes).some(c => c.nodeName === '#text')) {
            const elements = Object.values(fieldsetNodes[i].childNodes);
            for(const c of elements) {
                if(c.nodeValue) {
                    updates.push(c.nodeValue);
                }
            }
        }
    }

    return [
        info.reduce((a, _, j) => (j % 2) ? a : [...a, info.slice(j, j + 2)], []),
        updates.join('\n').replace(/\n\n/g, '\n')
    ];
}

(async () => {
    for(const u of PACKAGES) {
        if(existsSync('./Depictions/' + u.split('https://moreinfo.thebigboss.org/moreinfo/depiction.php?file=').pop() + '.json')) {
            continue;
        } else if(!u.match(/moreinfo.thebigboss.org\/moreinfo\/depiction.php\?file=/)) {
            continue;
        }
        
        console.log('Generating depiction for %s.', u);

        const descriptionStackView = { 
            class: 'DepictionStackView', 
            views: [], 
            tabname: 'Description' 
        }

        const changelogStackView = { 
            'class': 'DepictionStackView', 
            'views': [], 
            'tabname': 'Changes' 
        }

        const rootView = { 
            class: 'DepictionTabView', 
            minVersion: '0.7', 
            tabs: [ 
                descriptionStackView, 
                changelogStackView 
            ] 
        }

        const Images = {
            'class': 'DepictionScreenshotsView',
            'itemCornerRadius': 8,
            'itemSize': '{160, 160}',
            'screenshots': []
        }

        const html = await (await fetch(u)).text();
        const doc = new DOMParser({ errorHandler: { error: ()=>{}, warning: ()=>{} } }).parseFromString(html);
        // Can throw an error on invalid pages like
        // https://moreinfo.thebigboss.org/moreinfo/depiction.php?file=xxtouchDp
        // If the HTML is valid, rest of the checks will work regardless of elements not existing/being found.
        let fieldsetNodes;
        try {
            fieldsetNodes = select('//fieldset/div', doc);
        } catch {
            continue;
        }

        /**
         * Depiction description
         */
        let description = '';
        for(const v of Object.values(fieldsetNodes[0].childNodes)) {
            if(/br/i.test(v.tagName)) {
                description += '\n';
            } else if(v.nodeValue && v.nodeValue.trim().length) {
                description += v.nodeValue.trim();
            }
        }

        descriptionStackView.views.push({ 
            class: 'DepictionMarkdownView', 
            markdown: description.trim() 
        });
        descriptionStackView.views.push({ class: 'DepictionSeparatorView' });

        /**
         * Images
         */
        const screenshots = [];
        const imgnodes = select('//*/img', doc);
        for(let i = 0; i < imgnodes.length; i++) {
            for(const attr of Object.values(imgnodes[i].attributes)) {
                if(attr.nodeName === 'src') {
                    try {
                        const url = new URL(attr.nodeValue).href;
                        screenshots.push(url);
                    } catch {
                        if(attr.nodeValue) {
                            screenshots.push('https://moreinfo.thebigboss.org/moreinfo/' + attr.nodeValue);
                        }
                    }
                }
            }
        }

        if(screenshots.length) {
            screenshots.map(u => Images.screenshots.push({
                'url': u,
                'accessibilityText': ''
            }));
            descriptionStackView.views.push(Images);
            descriptionStackView.views.push({ class: 'DepictionSeparatorView' });
        }

        /**
         * Package information and update notes.
         */
        const [chunkedInfo, updates] = BigBossInfo(fieldsetNodes);
        for(const [key, detail] of chunkedInfo) {
            descriptionStackView.views.push({
                class: 'DepictionTableTextView',
                text: detail,
                title: key
            });
        }
        descriptionStackView.views.push({ class: 'DepictionSeparatorView' });
        
        if(updates.trim().length) {
            changelogStackView.views.push({ 
                class : 'DepictionSubheaderView', 
                title: 'What\'s New', 
                useBoldText: true, 
                useBottomMargin: false 
            });
            changelogStackView.views.push({ class: 'DepictionSeparatorView' });
            changelogStackView.views.push({ class: 'DepictionMarkdownView', markdown: updates.trim() });
        }
            
        writeFileSync(
            './Depictions/' + u.split('https://moreinfo.thebigboss.org/moreinfo/depiction.php?file=').pop() + '.json', 
            JSON.stringify(rootView, null, '\t'
        ));

        await new Promise(r => setTimeout(r, 1000));
    }
})();