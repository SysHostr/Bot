module.exports = {
    name: "Better Get Property From Object",

    description: "Gets the property from the object.",

    category: "Object Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "object",
            "name": "Object",
            "description": "Acceptable Types: Object, Unspecified\n\nDescription: The object to get the property.",
            "types": ["object", "unspecified"],
            "required": true
        },
        {
            "id": "key",
            "name": "Key",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The key of the property to get. Supports many keys divided by a ; separator.",
            "types": ["text", "unspecified"],
            "required": true
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Type: Object\n\nDescription: The property value obtained.",
            "types": ["object"]
        }
    ],

    code(cache) {
        const object = this.GetInputValue("object", cache);
        const keys = this.GetInputValue("key", cache).split(';');
    
        let value = object;
        for (let i = 0; i < keys.length; i++) {
            value = value[keys[i]];
        }
    
        this.StoreOutputValue(value, "value", cache);
        this.RunNextBlock("action", cache);
    }
}