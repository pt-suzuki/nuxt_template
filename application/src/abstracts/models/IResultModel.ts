export default interface IResultModel{
    $total_count: number;
    $next_page_url:string;
    $prev_page_url:string;
    $current_page:number;
    $last_page:number;
    $from:number;
    $to:number;
}