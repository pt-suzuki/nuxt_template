import IResultModel from "./IResultModel";

export default class ResultModel<T> implements IResultModel{
    private total_count:number;
    private next_page_url:string;
    private prev_page_url:string;
    private current_page:number;
    private last_page:number;
    private from:number;
    private to:number;
    private result_list:T[];
    private page_url:string;
    private first_page_url:string;
    private last_page_url:string;
    private pagenation:number[];

    public constructor(){
        this.total_count = 0
        this.result_list = []
        this.next_page_url = ""
        this.prev_page_url = ""
        this.current_page = 1
        this.last_page = 0
        this.from = 0
        this.to = 0;
        this.page_url = "";
        this.first_page_url = ""
        this.last_page_url = ""
		this.pagenation = []
    }

    /**
     * Getter $last_page_url
     * @return {string}
     */
	public get $last_page_url(): string {
		return this.last_page_url;
	}

    /**
     * Setter $last_page_url
     * @param {string} value
     */
	public set $last_page_url(value: string) {
		this.last_page_url = value;
	}
    
    /**
     * Getter $first_page_url
     * @return {string}
     */
	public get $first_page_url(): string {
		return this.first_page_url;
	}

    /**
     * Setter $first_page_url
     * @param {string} value
     */
	public set $first_page_url(value: string) {
		this.first_page_url = value;
	}

    /**
     * Getter $page_url
     * @return {string}
     */
	public get $page_url(): string {
		return this.page_url;
	}

    /**
     * Setter $page_url
     * @param {string} value
     */
	public set $page_url(value: string) {
		this.page_url = value;
	}

    /**
     * Getter $current_page
     * @return {number}
     */
	public get $current_page(): number {
		return this.current_page;
	}

    /**
     * Getter $last_page
     * @return {number}
     */
	public get $last_page(): number {
		return this.last_page;
	}

    /**
     * Getter $from
     * @return {number}
     */
	public get $from(): number {
		return this.from;
	}

    /**
     * Getter $to
     * @return {number}
     */
	public get $to(): number {
		return this.to;
	}

    /**
     * Setter $current_page
     * @param {number} value
     */
	public set $current_page(value: number) {
		this.current_page = value;
	}

    /**
     * Setter $last_page
     * @param {number} value
     */
	public set $last_page(value: number) {
		this.last_page = value;
	}

    /**
     * Setter $from
     * @param {number} value
     */
	public set $from(value: number) {
		this.from = value;
	}

    /**
     * Setter $to
     * @param {number} value
     */
	public set $to(value: number) {
		this.to = value;
	}

    /**
     * Getter $total_count
     * @return {number}
     */
	public get $total_count(): number {
		return this.total_count;
	}

    /**
     * Getter $result_list
     * @return {T[]}
     */
	public get $result_list(): T[] {
		return this.result_list;
	}

    /**
     * Setter $total_count
     * @param {number} value
     */
	public set $total_count(value: number) {
		this.total_count = value;
	}

    /**
     * Setter $result_list
     * @param {T[]} value
     */
	public set $result_list(value: T[]) {
		this.result_list = value;
	}


    /**
     * Getter $next_page_url
     * @return {string}
     */
	public get $next_page_url(): string {
		return this.next_page_url;
	}

    /**
     * Getter $prev_page_url
     * @return {string}
     */
	public get $prev_page_url(): string {
		return this.prev_page_url;
	}

    /**
     * Setter $next_page_url
     * @param {string} value
     */
	public set $next_page_url(value: string) {
		this.next_page_url = value;
	}

    /**
     * Setter $prev_page_url
     * @param {string} value
     */
	public set $prev_page_url(value: string) {
		this.prev_page_url = value;
	}


    /**
     * Getter $pagenation
     * @return {number[]}
     */
	public get $pagenation(): number[] {
		return this.pagenation;
	}

    /**
     * Setter $pagenation
     * @param {number[]} value
     */
	public set $pagenation(value: number[]) {
		this.pagenation = value;
	}




}