# Granblue Fantasy Numerical HP Display

This extension for Chrome provides a numerical display for the HP of enemies in the mobile game [Granblue Fantasy](http://granbluefantasy.jp/). It is displayed above the regular HP bars that are shown in the game.

![](https://raw.githubusercontent.com/menma1234/gbf-numbers/master/img/hp.jpg)

Of course, this only works if you are playing the game from within the browser with the developer tools console open. It will not work on mobile, as mobile Chrome does not support developer tools or extensions, nor if you are playing with the Chrome app.

## Installation

You can grab a packed version of this extension [here](https://raw.githubusercontent.com/menma1234/gbf-numbers/master/bin/gbf.crx). Drag it into the extensions page of Chrome to install. Due to security settings in Chrome, the extension will be disabled every time you restart Chrome.

If you prefer, you can also download a [ZIP of this repo](https://github.com/menma1234/gbf-numbers/archive/master.zip), unzip it, enable developer mode on the extensions page, hit "Load unpacked extension...", and find the directory you unzipped it to. Instead of being disabled, there will just be a warning popup every time Chrome is started.

If this annoys you, pay me $5 so that I can publish this to the Chrome Web Store. <sub><sup>Goddammit Google.</sup></sub>

## How to Play with Developer Tools

1. Open Chrome and press F12 on your keyboard. Alternatively, open the Chrome menu and go to More tools -> Developer tools. This will open a new section.
2. In the new section that's opened, click the smartphone icon in the top left.
3. Click the three dots immediately to the left of the X in the top right and select "Show console". A new section will open at the bottom.
4. Select the emulation tab and select a mobile device in the model dropdown (preferably Google Nexus 4 or similar). If you don't see this tab, select the three dots beside "Console" and select Emulation from the dropdown.
5. Uncheck emulate screen resolution.
6. Navigate to http://gbf.game.mbga.jp/ in this tab. Resize the window as needed as the contents will fill the window.
7. From now on, all you need to do after opening Chrome is steps 1 and 6.

## Limitations

* The display for a certain enemy will only update whenever you perform an action that affects the HP of that same enemy. As such, in a multibattle, even though the HP bar is changing when you're not doing anything, the numerical display will not change. Similarly, if there are multiple enemies in a multibattle, if you only attack Enemy A, Enemy B's numerical display will not change even if others are hitting that one. This is due to the way multibattle communication is implemented by the game and there is no way to access that network traffic with the Chrome extension API at this time.
  * Additionally, in a multi-enemy multibattle, if the enemy that you haven't been attacking dies, the HP display will probably stay floating there until you refresh the page.
* The HP display will appear before the actual HP bars appear at the start of a battle. They will also be displayed even when a summon animation is playing. They will disappear before the HP bar disappears when an enemy dies. I don't think there's any way to fix this.
