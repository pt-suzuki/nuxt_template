import { Vue, Component } from 'vue-property-decorator'
import moment from 'moment';
import SimpleKeyValueModel from "../models/SimpleKeyValueModel";
//import UserUseCase from "../../domains/user/UserUseCase";

@Component({
    filters:{
        moment(value:Date|null):string{
            if(!value){
                return "";
            }
            var result:string = moment(value).format("YYYY/MM/DD");
            if(result == '1970/01/01'){
                return "";
            }
            return result
        },
        momentMonth(value:Date|null):string{
            if(!value){
                return "";
            }
            var result:string = moment(value).format("YYYY/MM");
            if(result == '1970/01/01'){
                return "";
            }
            return result
        },
        momentMonthJp(value:Date|null):string{
            if(!value){
                return "";
            }
            var result:string = moment(value).format("YYYY年MM月");
            if(result == '1970/01/01'){
                return "";
            }
            return result
        },
        momentJp(value:Date|null):string{
            if(!value){
                return "";
            }
            var result:string = moment(value).format("YYYY年MM月DD日");
            if(result == '1970/01/01'){
                return "";
            }
            return result
        },
        momentTime(value:Date|null):string{
            if(!value){
                return "";
            }
            var result:string = moment(value).format("YYYY/MM/DD HH:mm");
            if(result == '1970/01/01'){
                return "";
            }
            return result
        },
        momentPeriod(value:Date|null):string{
            if(!value){
                return "";
            }
            var result:string = moment(value).format("YYYY/MM");
            if(result == '1970/01/01'){
                return "";
            }
            return result
        },
        roundDown(value:string,digits:number) :string |null{
            if (value === undefined) {
                return "";
            }
            if (value === null) {
                return "";
            }
            if (value === "") {
                return "";
            }
            if(value == "0"){
                return "0"
            }
            if(digits == 0){
                return Math.floor(Number(value)).toString()
            }
            return (Math.floor(Number(value) * Math.pow(10,digits)) / Math.pow(10,digits)).toString();
        },
        roundUp(value:string,digits:number) :string |null{
            if (value === undefined) {
                return "";
            }
            if (value === null) {
                return "";
            }
            if (value === "") {
                return "";
            }
            if(value == "0"){
                return "0"
            }
            if(!digits){
                return String(Math.round(Number(value)));
            }
            const result = Math.round(Number(value) * Math.pow(10,digits)) / Math.pow(10,digits);

            if(digits == 0){
                return String(result);
            }

            let addZero = "";
            for(let i = 0;  i < digits;  i++){
                addZero = addZero + "0";
            }
            if(String(result).indexOf('\.') <= 0){
                return new String(result) + "." + addZero;
            }
            let split = String(result).split('\.');

            return split[1].length == digits ? String(result) : split[0] + "." + (split[1] + addZero).substring(0,digits);
        },
        replace_br(value:string):string{
            return value.replace(/\n/g,"<br>");
        },
        moneyDelimiter(value:number):string {
            // NaNに対する暫定対応、0で良いのか要検討
            if (value == undefined) {
                value = 0;
            }
            const money = Number(value).toLocaleString();
            return  money == "NaN" ? String(value) : money;
        },
        moneyDelimiterErrorToBlank(value:string | number):string {
            // NaNに対する暫定対応、0で良いのか要検討
            if (value == "0") {
                return "0";
            }
            if (value == undefined) {
                return "";
            }
            if (value == null) {
                return "";
            }
            if (value == "") {
                return "";
            }
            const money = Number(value).toLocaleString();
            return  money == "NaN" ? String(value) : money;
        },
        divideAmount(value:string |null ,price_unit:number){
            if (value === undefined) {
                return "";
            }
            if (value === null) {
                return "";
            }
            if (value === "") {
                return "";
            }
            if(Number(value) == 0){
                return 0;
            }
            if(price_unit == 2){
                return Number(value) / 1000;
            }
            return value;
        },
        percentage(value:number|null){
            if(value == null){
                return "";
            }
            if(value == 0){
                return 0;
            }
            return value * 100;
        }
    }
})
export default class AbstractPresenter extends Vue{
	$router:any;
	$route:any;
    $process:any;
    $SmoothScroll:any;
    $toast:any;
    $store:any;
    $auth:any;
    $auth0:any;

    protected currentDate:Date = new Date();
    protected currentYear:string = this.currentDate.getFullYear().toString();
    //protected userUseCase:UserUseCase = new UserUseCase();

    protected getPeriodDropDownValue():SimpleKeyValueModel[]{
        const list:SimpleKeyValueModel[] = [];
        for(var $i = 0;$i < 30;$i++){
            const item = new SimpleKeyValueModel();
            item.$value = (this.currentDate.getFullYear() - $i + 1).toString() + "年3月期";
            item.$key = (this.currentDate.getFullYear() - $i).toString();

            list.push(item);
        }
        return list;
    }

    protected getCurrentPeriod():string{
        if(this.currentDate.getMonth() < 3){
            return (this.currentDate.getFullYear() - 1).toString();
        }
        return this.currentDate.getFullYear().toString();
    }

    protected addMonths(date:Date, months:number):Date {
        var resultDate = new Date(date.getTime());
        resultDate.setMonth(date.getMonth() + months);
        if (date.getDate() > resultDate.getDate()) {
            resultDate.setDate(0);
        }
        return resultDate;
    }

    protected addYears(date:Date, years:number):Date {
        var resultDate = new Date(date.getTime());
        resultDate.setFullYear(date.getFullYear() + years);
        if (date.getDate() > resultDate.getDate()) {
            resultDate.setDate(0);
        }
        return resultDate;
    }

    protected getMonthly(date:Date){
        return date.getFullYear().toString() + '-' + ("0" +(date.getMonth() + 1).toString()).substr(-2);
    }

    public static addComma(label: string) {
        return label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    smoothLink (headH = 0) {
        const interval = 10;               //スクロール処理を繰り返す間隔
        const divisor = 8;                  //近づく割合（数値が大きいほどゆっくり近く）
        const range = (divisor / 2) + 1;    //どこまで近づけば処理を終了するか(無限ループにならないように divisor から算出)
        const links = document.querySelectorAll('a[href^="#"]');

        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function (e) {
                e.preventDefault();
                let toY;
                let nowY = window.pageYOffset;                       //現在のスクロール値
                const item :any = e.target;
                const href = item.getAttribute('href'); //href取得
                const target = document.querySelector(href);         //リンク先の要素（ターゲット）取得
                const targetRect = target.getBoundingClientRect();   //ターゲットの座標取得
                const targetY = targetRect.top + nowY - headH;        //現在のスクロール値 & ヘッダーの高さを踏まえた座標
                //スクロール終了まで繰り返す処理
                (function doScroll() {
                    toY = nowY + Math.round((targetY - nowY) / divisor);  //次に移動する場所（近く割合は除数による。）
                    window.scrollTo(0, toY);                              //スクロールさせる
                    nowY = toY;                                           //nowY更新

                    if (document.body.clientHeight - window.innerHeight < toY) {
                        //最下部にスクロールしても対象まで届かない場合は下限までスクロールして強制終了
                        window.scrollTo(0, document.body.clientHeight);
                        return;
                    }
                    if (toY >= targetY + range || toY <= targetY - range) {
                        //+-rangeの範囲内へ近くまで繰り返す
                        window.setTimeout(doScroll, interval);
                    } else {
                        //+-range の範囲内にくれば正確な値へ移動して終了。
                        window.scrollTo(0, targetY);
                    }
                })();
            });
        }
    };
}