function init() {
    registerQuarterSnapShortcup("Left", onLeft);
    registerQuarterSnapShortcup("Up", onUp);
    registerQuarterSnapShortcup("Right", onRight);
    registerQuarterSnapShortcup("Down", onDown);
}

function isLeft(client) {
    const workArea = workspace.clientArea(workspace.MaximizeArea, client);
    return client.geometry.x == 0 
        && client.geometry.y == 0
        && client.geometry.width == workArea.width / 2
        && client.geometry.height == workArea.height;
}

function isRight(client) {
    const workArea = workspace.clientArea(workspace.MaximizeArea, client);
    return looseEquals(client.geometry.x, workArea.width / 2)
        && client.geometry.y == 0
        && looseEquals(client.geometry.width, workArea.width / 2)
        && client.geometry.height == workArea.height;
}

function isTop(client) {
    const workArea = workspace.clientArea(workspace.MaximizeArea, client);
    return client.geometry.x == 0 
        && client.geometry.y == 0
        && client.geometry.width == workArea.width
        && client.geometry.height == workArea.height / 2;
}

function isBottom(client) {
    const workArea = workspace.clientArea(workspace.MaximizeArea, client);
    return client.geometry.x == 0 
        && client.geometry.y == workArea.height / 2
        && client.geometry.width == workArea.width
        && client.geometry.height == workArea.height / 2;
}

function onLeft() {
    print('onLeft!');
    const client = workspace.activeClient;
    debugClientSize(client);
    if(isTop(client)) {
        workspace.slotWindowQuickTileTopLeft(client);
    } else if(isBottom(client)) {
        workspace.slotWindowQuickTileBottomLeft(client);
    } else {
        workspace.slotWindowQuickTileLeft(client);
    }
}

function onUp() {
    print('onUp!');
    const client = workspace.activeClient;
    const workArea = workspace.clientArea(workspace.MaximizeArea, client);
    debugClientSize(client);
    if(isTop(client)) {
        workspace.slotWindowMaximize(cilent);
    } else if(isLeft(client)) {
        workspace.slotWindowQuickTileTopLeft(client);
    } else if(isRight(client)) {
        workspace.slotWindowQuickTileTopRight(client);
    } else {
        client.geometry = {
            x: 0,
            y: 0,
            width: workArea.width,
            height: workArea.height / 2
        };
    }
}

function onRight() {
    print('onRight!');
    const client = workspace.activeClient;
    debugClientSize(client);
    if(isTop(client)) {
        workspace.slotWindowQuickTileTopRight(client);
    } else if(isBottom(client)) {
        workspace.slotWindowQuickTileBottomRight(client);
    } else {
        workspace.slotWindowQuickTileRight(client);
    }
}

function onDown() {
    print('onDown!');
    const client = workspace.activeClient;
    const workArea = workspace.clientArea(workspace.MaximizeArea, client);
    debugClientSize(client);
    if(isLeft(client)) {
        workspace.slotWindowQuickTileBottomLeft(client);
    } else if(isRight(client)) {
        workspace.slotWindowQuickTileBottomRight(client);
    } else {
        client.geometry = {
            x: 0,
            y: workArea.height / 2,
            width: workArea.width,
            height: workArea.height / 2
        };
    }
}

function registerQuarterSnapShortcup(direction, callback) {
    const name = "Quarter Snap: " + direction;
    const keys = "Meta+" + direction;
    print('registerQuarterSnapShortcup ' + direction + ' | ' + name + ' | ' + keys);
    registerShortcut(name, name, keys, callback);
}

function debugClientSize(client) {
    if(!client) {
        client = workspace.activeClient;
    }
    const area = workspace.clientArea(workspace.MaximizeArea, client);
    print('Pos: ' + client.geometry.x + ',' + client.geometry.y + ' | Size: ' + client.geometry.width + 'x' + client.geometry.height + ' | Workspace Size: ' + area.width + 'x' + area.height);
    print('Left -> ' + isLeft(client) + ' | Top -> ' + isTop(client) + ' | Right -> ' + isRight(client) + ' | Bottom -> ' + isBottom(client));
}

function looseEquals(a, b) {
    return a == b 
        || a == b - 1 
        || a == b + 1;
}

init();
