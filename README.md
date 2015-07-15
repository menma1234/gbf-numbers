# Granblue Fantasy Numerical HP Display

This extension for Chrome provides a numerical display for the HP of enemies in the mobile game [Granblue Fantasy](http://granbluefantasy.jp/). It is currently displayed within a panel in the developer tools console.

![](https://raw.githubusercontent.com/menma1234/gbf-numbers/master/img/devtools.png)

Of course, this only works if you are playing the game from within the browser with the developer tools console open. It will not work on mobile, as mobile Chrome does not support developer tools or extensions, nor if you are playing with the Chrome app.

You can grab a packed version of this extension [here](https://dl.dropboxusercontent.com/u/63060298/gbf.crx). Drag it into the extensions page of Chrome to install.

**Note:** The display will only update whenever you perform an action that affects the enemy's/enemies' HP. Multibattle updating is implemented through WebSockets and there is currently no way to get access that network traffic through the Chrome extension API at this time. (Apparently you can write a wrapper for the WebSocket constructor, but my JavaScript isn't good enough for that.)
