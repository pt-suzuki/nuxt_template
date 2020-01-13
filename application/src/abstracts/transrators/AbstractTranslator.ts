import ResponseModel from '../models/ResponseModel';
import MessageModel from '../models/MessageModel';
import { AxiosResponse } from 'axios';

export default class AbstractTranslator{

	public basicTranslate(response:AxiosResponse<any>):ResponseModel<any>{
        const result = new ResponseModel<any>("");

        result.$status = response.data["result_status"];
        result.$status_code = response.status;
        result.$message =[];

        if(response.status === 200 && result.$status_code == 0){
            return result
        }

        const message_data = response.data["message"];

		for(const snippet in message_data){
            const item:MessageModel = new MessageModel();

            item.$code = message_data[snippet].code;
            item.$message = message_data[snippet].message;

            result.$message.push(item);
        }

		return result
    }

    public translateId(response:AxiosResponse<any>):ResponseModel<string>{
        const result = this.basicTranslate(response);
        if(result.$error){
            return result
        }
        const result_data = response.data["result_data"];
        result.$body = result_data["id"];
        return result
    }

    public static translateTotalCount(response:AxiosResponse<any>):number{
        const result_data = response.data["result_data"];
        return result_data.total_count;
    }

    public translateValidate(response:AxiosResponse<Boolean>):ResponseModel<boolean>{
        const result = this.basicTranslate(response);
        if(result.$error){
            result.$body = false;
            return result
        }
        result.$body = true;
        return result;
    }

    public stringToDelimiterAmount(value:string | null):string{
        if(value == null){
            return "";
        }
        if(value == ""){
            return "";
        }
        if(value == "-"){
            return "-";
        }
        const tmp = String(value).replace(/,/g,'');
        const result = parseInt(tmp);

        return Number(result).toLocaleString() == "NaN" ? "" : Number(result).toLocaleString();
    }

    public devideiMllion(value:string | null):string{
        if(value == null){
            return "";
        }
        if(value == ""){
            return "";
        }
        if(value == "0"){
            return "0";
        }
        return String(Number(this.removeDelimiterAmount(value)) / 1000);
    }

    public multiplicationMillion(value:string | null):string{
        if(value == null){
            return "";
        }
        if(value == ""){
            return "";
        }
        if(value == "0"){
            return "0";
        }
        return String(Number(this.removeDelimiterAmount(value)) * 1000);
    }

    public removeDelimiterAmount(value:string | null):string{
        if(value == null){
            return "";
        }
        return String(value).replace(/,/g,'');
    }

    public removeOtherThanHyphenAndInteger (value:string | null):string | null{
        if(value == null){
            return null

        }
	    return value.replace(/[^0-9\-]+/,'')
    }

    public convertArrayIntoString (value:Array<any> | null):string {
        return JSON.stringify(value).replace(/[^0-9,]/g, '')
    }

    public removeOtherThanInteger (value:string | null):string | null{
        if(value == null){
            return null

        }
        return value.replace(/[^0-9]+/,'')
    }

    public trimSpace (value:string | null):string | null{
        if(value == null){
            return null

        }
        return value.replace(/^\s+|\s+$/g,'')
    }

    protected nullToZero(value:number | null):number{
        if(value == null){
            return 0;
        }
        return value;
   }

    public translateCount(response:AxiosResponse<any>):number{
        const result = this.basicTranslate(response);

        result.$body = !result.$error;
        if(result.$error){
            return 0;
        }
        const result_data = response.data["result_data"];
        return result_data["count"];
    }
}