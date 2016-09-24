var View = {
    "getKey": function getKey( event ){
        return event.keyCode || event.which;
    },
    "KEY": {
        "ENTER": 13,
        "TAB": 9,
        "BACKSPACE": 8,
        "SHIFT": 16,
        "CTRL": 17,
        "ALT": 18,
        "BREAK": 19,
        "CAPSLOCK": 20,
        "ESCAPE": 27,
        "SPACE": 32,
        "PAGEUP": 33,
        "PAGEDOWN": 34,
        "END": 35,
        "HOME": 36,
        "LEFT": 37,
        "UP": 38,
        "RIGHT": 39,
        "DOWN": 40,
        "INSERT": 45,
        "DELETE": 46
    }
};

export default View;
