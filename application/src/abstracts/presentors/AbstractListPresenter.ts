import AbstractPresenter from "./AbstractPresenter";
import ResponseModel from "../models/ResponseModel";
import ResultModel from "../models/ResultModel";
import AbstractSearchForm from "../forms/AbstractSearchForm";
import MessageModel from "../models/MessageModel";

export default abstract class AbstractListPresenter<T,U extends AbstractSearchForm> extends AbstractPresenter{
    protected listResponse!:ResponseModel<ResultModel<T>>;
    protected result!:ResultModel<T>;
    protected searchForm!:U;
    protected showList:boolean = true;
    protected list_message:string="";

    isFirstPage():boolean{
        return this.listResponse.$body.$current_page == 1;
    }

    isCurrentPage(page:number):boolean{
        return this.listResponse.$body.$current_page === page;
    }

    isLastPage():boolean{
        return this.listResponse.$body.$next_page_url === null;
    }

    async searchByPage(page:number){
        this.search(this.listResponse.$body.$page_url + "?page=" + page);
    }

    protected setList(response:any){
        if(response.$status == 1){
            this.list_message = '';
            response.$message.forEach(function(this:AbstractListPresenter<T,U>,value:MessageModel){
                this.list_message += value.$message+'\n';
                },this);
            this.listResponse = response;
            this.listResponse.$body = new ResultModel()
            this.listResponse.$body.$total_count = 0;
            this.listResponse.$body.$pagenation = [];
            this.showList=false;
            return
        }
        if(response.$status == 2) {
            this.list_message = ''
            response.$message.forEach(function (this: AbstractListPresenter<T, U>, value: MessageModel) {
                this.list_message += value.$message + '\n';
            }, this)
            this.listResponse = response;
            this.listResponse.$body = new ResultModel()
            this.listResponse.$body.$total_count = 0;
            this.listResponse.$body.$pagenation = [];
            this.showList = false;
            return
        }
        this.listResponse = response;
        this.showList=false;
    }

    search(url:string = ""):void{
        this.initListResponse()
        this.showList=true;
        this.list_message = "";
        this.searchForm.$access_url = url;
        setTimeout(this.getList,1);
    }

    async changeRows(rows:number){
        this.searchForm.$rows = rows;
        this.search();
    }

    sortedClass　(key:string) {
        return this.searchForm.$key === key ? `${this.searchForm.$isAsc ? 'sorting_asc' : 'sorting_desc' }` : 'sorting';
    }
    sortBy(key:string) {
        this.searchForm.$isAsc = this.searchForm.$key === key ? !this.searchForm.$isAsc : false;
        this.searchForm.$key = key;

        this.search();
    }

    clickPageLink(page:number) {
        this.searchByPage(page);
    }

    abstract getList():void;

    abstract initListResponse():void;
}