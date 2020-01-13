export default class AbstractSearchForm {
    private access_url:string;
    private rows:number;
    private key:string;
    private isAsc:boolean;

    public constructor(){
        this.access_url = "";
        this.rows = 50;
        this.key = '0';
        this.isAsc = false;
    }

    /**
     * Getter $key
     * @return {string}
     */
    public get $key(): string {
        return this.key;
    }

    /**
     * Getter $value
     * @return {boolean}
     */
    public get $isAsc(): boolean {
        return this.isAsc;
    }

    /**
     * Setter $key
     * @param {string} value
     */
    public set $key(value: string) {
        this.key = value;
    }

    /**
     * Setter $value
     * @param {boolean} value
     */
    public set $isAsc(value: boolean) {
        this.isAsc = value;
    }

    /**
     * Getter $access_url
     * @return {string}
     */
    public get $access_url(): string {
        return this.access_url;
    }

    /**
     * Setter $access_url
     * @param {string} value
     */
    public set $access_url(value: string) {
        this.access_url = value;
    }


    /**
     * Getter $rows
     * @return {number}
     */
    public get $rows(): number {
        return this.rows;
    }

    /**
     * Setter $rows
     * @param {number} value
     */
    public set $rows(value: number) {
        this.rows = value;
    }
}