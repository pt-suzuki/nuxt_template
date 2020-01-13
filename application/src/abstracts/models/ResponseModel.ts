import MessageModel from "./MessageModel"

export default class ResponseModel<T>{
	private message:MessageModel[];
    private body:T;
    private status:number;
    private status_code:number;

    constructor(obj:T){
        this.message = []; 
        this.status = 0;
        this.body = obj
        this.status_code = 200;
	}

    /**
     * Getter $status_code
     * @return {number}
     */
	public get $status_code(): number {
		return this.status_code;
	}

    /**
     * Setter $status_code
     * @param {number} value
     */
	public set $status_code(value: number) {
		this.status_code = value;
    }
    
    /**
     * Getter $status
     * @return {number}
     */
	public get $status(): number {
		return this.status;
	}

    /**
     * Setter $status
     * @param {number} value
     */
	public set $status(value: number) {
		this.status = value;
	}

    /**
     * Getter $message
     * @return {MessageModel[]}
     */
	public get $message(): MessageModel[] {
		return this.message;
	}

    /**
     * Setter $message
     * @param {MessageModel[]} value
     */
	public set $message(value: MessageModel[]) {
		this.message = value;
	}

    /**
     * Getter $error
     * @return {boolean}
     */
	public get $error(): boolean {
		return this.status_code !== 200;
	}

    /**
     * Getter $body
     * @return {T}
     */
	public get $body(): T {
		return this.body;
	}

    /**
     * Setter $body
     * @param {T[]} value
     */
	public set $body(value: T) {
		this.body = value;
	}
}