export default class MessageModel{
    private code:string;
    private message:string;


    constructor(){
		this.code = ""; 
        this.message = "";
	}
    /**
     * Getter $code
     * @return {string}
     */
	public get $code(): string {
		return this.code;
	}

    /**
     * Getter $message
     * @return {string}
     */
	public get $message(): string {
		return this.message;
	}

    /**
     * Setter $code
     * @param {string} value
     */
	public set $code(value: string) {
		this.code = value;
	}

    /**
     * Setter $message
     * @param {string} value
     */
	public set $message(value: string) {
		this.message = value;
	}

}