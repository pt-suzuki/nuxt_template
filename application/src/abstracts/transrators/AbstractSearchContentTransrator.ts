import ResponseModel from '../models/ResponseModel';
import { AxiosResponse } from 'axios';
import AbstractTranslator from "./AbstractTranslator";
import ResultModel from "../models/ResultModel";

export default abstract class AbstractSearchContentTranslator<T> extends AbstractTranslator{
    public translateSearchResult(response:AxiosResponse<any>):ResponseModel<ResultModel<T>>{
        const result = this.basicTranslate(response);

        result.$body = !result.$error;
        if(result.$error){
            return result
        }

        const result_data = response.data["result_data"];
        const result_component:ResultModel<T> = new ResultModel<T>();

        for(const arr_cnt in result_data["data"]){
            result_component.$result_list.push(this.parseItem(result_data["data"][arr_cnt]))
        }

        result_component.$total_count = result_data["total"];
        result_component.$prev_page_url = result_data["prev_page_url"];
        result_component.$next_page_url = result_data["next_page_url"];
        result_component.$from = result_data["from"];
        result_component.$to = result_data["to"];
        result_component.$current_page = result_data["current_page"];
        result_component.$last_page = result_data["last_page"];
        result_component.$page_url = result_data["path"];
        result_component.$first_page_url = result_data["first_page_url"];
        result_component.$last_page_url = result_data["last_page_url"];

        const pagenation = [];

        var start_page = result_component.$current_page - 2;
        if(start_page <= 0){
            start_page = 1;
        }
        var end_page = start_page + 4;
        if(result_component.$last_page < end_page){
            end_page = result_component.$last_page
        }

        for (var i = start_page;  i <= end_page;  i++  ) {
            pagenation.push(i);
        }

        result_component.$pagenation = pagenation;
        result.$body = result_component;

        return result
    }

    public translateContent(response:AxiosResponse<any>):ResponseModel<T>{
        const result = this.basicTranslate(response);

        result.$body = !result.$error;
        if(result.$error){
            return result
        }

        const result_data = response.data["result_data"];
        result.$body = this.parseItem(result_data);
        return result;
    }

    public translateDelete(response:AxiosResponse<any>):ResponseModel<number>{
        const result = this.basicTranslate(response);

        result.$body = !result.$error;
        if(result.$error){
            return result
        }

        result.$body = response.data["result_data"];
        return result;
    }

    abstract parseItem(item:any):T;
}