module.exports = {   
   name: "Chat GPT Turbo Reply V2",

    description: "None",

    category: "Message Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "id",
            "name": "Organisation ID",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "key",
            "name": "API Key",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
        {
            "id": "text",
            "name": "Text",
            "description": "Acceptable Types: Text, Unspecified\n\nDescription: The text to put in the message. (OPTIONAL)",
            "types": ["text", "unspecified"]
        },
		{
			"id": "prompt",
			"name": "Prompt",
			"description": "Acceptable Types: Text, Unspecified\n\nDescription: The prompt to give ChatGPT.  Use these as parameters for your bot's personality.  DO NOT USE QUOTE MARKS. (OPTIONAL)",
			"types": ["text", "unspecified"]
		},
        {
			"id": "usermsg",
			"name": "User Response",
			"description": "Acceptable Types: Text, Unspecified\n\nDescription: Could be a collection of stuff to use as data for the chatbot. (OPTIONAL)",
			"types": ["text", "unspecified"]
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
            "id": "response",
            "name": "Response",
            "description": "Type: Object\n\nDescription: The message obtained.",
            "types": ["text"]
        }
    ],

    async code(cache) {
        const { Configuration, OpenAIApi } = require("openai")
        const id = this.GetInputValue("id", cache);
        const key = this.GetInputValue("key", cache);
        const text = this.GetInputValue("text", cache);
		const prompt = this.GetInputValue("prompt", cache);
        const usermsg = this.GetInputValue("usermsg", cache);
		
        const config = new Configuration({
            organization: id,
            apiKey: key
        })
        const openai = new OpenAIApi(config)
        const gptresponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
			{"role": "system", "content": prompt},
            {"role": "user", "content": "Chat History: " + usermsg + "member: " + text}
			],
            temperature: 0.9,
            max_tokens: 400,
            //stop: ["ChatGPTs:", "member:"]
        });
        const response = gptresponse.data.choices[0].message.content;

        this.StoreOutputValue(response, "response", cache);
        this.RunNextBlock("action", cache);
    }
}