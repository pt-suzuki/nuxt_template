export default class BredcrumbModel{
    private url :  string;
    private title : string;

    public constructor(){
        this.url = "";
        this.title = "";
    }

    /**
     * Getter $url
     * @return { string }
     */
	public get $url():  string  {
		return this.url;
	}

    /**
     * Getter $title
     * @return {string }
     */
	public get $title(): string  {
		return this.title;
	}

    /**
     * Setter $url
     * @param { string } value
     */
	public set $url(value:  string ) {
		this.url = value;
	}

    /**
     * Setter $title
     * @param {string } value
     */
	public set $title(value: string ) {
		this.title = value;
	}
}