(function() {
    return JSON.stringify({
        "class": "DepictionTabView",
        "minVersion": "0.7",
        "tabs": [
            {
                "class": "DepictionStackView",
                "views": [
                    {
                        "class": "DepictionMarkdownView",
                        "markdown": "Sinatra - A stunning Now-Playing page for iOS 10\n\nSinatra replaces your current tiny music page with a redesigned look heavily focused on staying true to the existing aesthetics of iOS 10 to provide a natural, fluid Control Center page you will soon forget isn't stock.\n\nCompatible with a ton of popular tweaks such as Masq , Horseshoe, Noctis, Harp, and more, now you can instantly access a full sized, beautiful tool to put you in-charge of your music from anywhere.\n\nIf you cant stand Apple's barren, dreary mess of empty space (and hate the road they're taking in iOS 11) , this will quickly become your favourite change of tune!\n\nNo options to configure."
                    },
                    {
                        "class": "DepictionTableTextView",
                        "text": "September 1, 2017",
                        "title": "Updated"
                    },
                    {
                        "class": "DepictionTableTextView",
                        "text": "Commercial&nbsp;Package",
                        "title": "License"
                    },
                    {
                        "class": "DepictionTableTextView",
                        "text": "$ 1.99",
                        "title": "Suggested Price"
                    },
                    {
                        "class": "DepictionScreenshotsView",
                        "itemCornerRadius": 8,
                        "itemSize": "{160, 160}",
                        "screenshots": [
                            {
                                "url": "https://moreinfo.thebigboss.org/moreinfo/sinatra1.jpg",
                                "accessibilityText": ""
                            },
                            {
                                "url": "https://moreinfo.thebigboss.org/moreinfo/sinatra2.jpg",
                                "accessibilityText": ""
                            },
                            {
                                "url": "https://moreinfo.thebigboss.org/moreinfo/sinatra3.jpg",
                                "accessibilityText": ""
                            },
                            {
                                "url": "https://moreinfo.thebigboss.org/moreinfo/sinatra4.jpg",
                                "accessibilityText": ""
                            }
                        ]
                    },
                    {
                        "class": "DepictionSeparatorView"
                    }
                ],
                "tabname": "Description"
            },
            {
                "class": "DepictionStackView",
                "views": [
                    {
                        "class": "DepictionSubheaderView",
                        "title": "What's New",
                        "useBoldText": true,
                        "useBottomMargin": false
                    },
                    {
                        "class": "DepictionSeparatorView"
                    },
                    {
                        "class": "DepictionMarkdownView",
                        "markdown": "Sinatra - 1.0.1 \n\n- Fixed a bug where the tweak would become confused if opened inside a Landscape-locked app\n\n-Small optimisations & refactoring in preparation for a major update, look through my Twitter feed to sneak a peek\n\n\nFixed a display issue with RTL languages"
                    }
                ],
                "tabname": "Changes"
            }
        ]
    })
}());