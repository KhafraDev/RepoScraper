/*
 Sileo Depiction Generator Utilities
 
 Copyright (c) 2019, Khafra (KhafraDev). All rights reserved.
 
 Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 
 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 3. All advertising materials mentioning features or use of this software must display the following acknowledgement:
    This product includes software developed by the Sileo Team.
 4. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 THIS SOFTWARE IS PROVIDED BY Khafra (KhafraDev) 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL COPYRIGHT HOLDER BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Util functions for RepoScraper
 * Doesn't work, something weird with how SileoGen is exported.
 */
const SileoGen = {}; 

Object.defineProperties(SileoGen, {
    'version': {
        enumerable: true,
        get: () => '2.0'
    },
    'screenshotSizes': {
        enumerable: true,
        get: () => [
            { width: 320, height: 480, cornerRadius: 16 },    // iPhone 4/4S
            { width: 320, height: 568, cornerRadius: 16 },    // iPhone 5/5S/SE
            { width: 375, height: 667, cornerRadius: 16 },    // iPhone 6/6S/7/8
            { width: 414, height: 736, cornerRadius: 16 },    // iPhone 6+/6S+/7+/8+
            { width: 375, height: 812, cornerRadius: 25 },    // iPhone X/XS
            { width: 414, height: 896, cornerRadius: 25 }     // iPhone XR/XS Max
        ]
    },
    'mostCommonSize': {
        enumerable: true,
        get: () => {
            return { 
                width: 414,
                height: 736,
                cornerRadius: 16
            }
        }
    },
    'generateHeader': {
        enumerable: true,
        value: text => {
            return {
                class: 'DepictionHeaderView',
                title: text
            }
        }
    },
    'generateSubheader': {
        enumerable: true,
        value: text => {
            return {
                class: 'DepictionSubheaderView',
                title: text
            }
        }
    },
    'generateLabel': {
        enumerable: true,
        value: (text, fontSize, fontWeight, textColor) => {
            return {
                class: 'DepictionLabelView',
                text: text,
                fontSize: fontSize,
                fontWeight: fontWeight,
                textColor: textColor
            }
        }
    },
    'generateSeparator': {
        enumerable: true,
        get: () => {
            return  {
                class: 'DepictionSeparatorView'
            }
        }
    },
    'trimSeparator': {
        enumerable: true,
        value: (array) => {
            return array instanceof Array && array[array.length - 1].class === 'DepictionSeparatorView' ? array.pop() : array;
        }
    },
    'generateTableText': {
        enumerable: true,
        value: (title, text) => {
            return {
                class: 'DepictionTableTextView',
                text: text,
                title: title
            }
        }
    },
    'generateTableButton': {
        enumerable: true,
        value: (title, action) => {
            return {
                'class': 'DepictionTableButtonView',
                'title': title,
                'action': absoluteURL(action)
            }   
        }
    },
    'generateStackView': {
        enumerable: true,
        get: () => { 
            return {
                class: 'DepictionStackView',
                views: Array(0)
            }
        }
    },
    'generateAutostackView': {
        enumerable: true,
        value: horizontalSpacing => {
            return {
                'class': 'DepictionAutoStackView',
                'horizontalSpacing': horizontalSpacing,
                'views': Array()
            }
        }
    },
    'generateMarkdown': {
        enumerable: true,
        value: html => {
            return {
                class: 'DepictionMarkdownView',
                markdown: html
            }
        }
    },
    'generateImage': {
        enumerable: true,
        value: (url, width, height) => {
            return {
                'class': 'DepictionImageView',
                'URL': absoluteURL(url),
                'width': width,
                'height': height,
                'cornerRadius': 5
            }
        }
    },
    'generateScreenshot': {
        enumerable: true,
        value: (url, accessibilityText) => {
            return {
                'url': absoluteURL(url),
                'accessibilityText': accessibilityText
            }
        }
    },
    'generateScreenshots': {
        enumerable: true,
        value: (width, height, cornerRadius) => {
            return {
                'class': 'DepictionScreenshotsView',
                'itemCornerRadius': cornerRadius,
                'itemSize': '{' + width + ', ' + height + '}',
                'screenshots': Array(0)
            }
        }
    }
});