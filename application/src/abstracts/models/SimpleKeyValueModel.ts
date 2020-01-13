export default class SimpleKeyValueModel{
	private key:any;
	private value:string;
	private id:number | null;
	private text:string;

	constructor(){
		this.key = "";
		this.value = "";
		this.id = 0;
		this.text = "";
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number | null{
		return this.id;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number| null) {
		this.id = value;
	}

    /**
     * Getter $key
     * @return {string}
     */
	public get $key(): any {
		return this.key;
	}

	/**
	 * Setter $key
	 * @param {string} value
	 */
	public set $key(value: any) {
		this.key = value;
	}

    /**
     * Getter $value
     * @return {string}
     */
	public get $value(): string {
		return this.value;
	}

    /**
     * Setter $value
     * @param {string} value
     */
	public set $value(value: string) {
		this.value = value;
	}

	/**
	 * Getter $text
	 * @return {string}
	 */
	public get $text(): string {
		return this.text;
	}

	/**
	 * Setter $text
	 * @param {string} text
	 */
	public set $text(text: string) {
		this.text = text;
	}

}