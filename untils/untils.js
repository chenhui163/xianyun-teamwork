/**
 * @desc: 计算相隔时间
 * 
 * @params: 参数 | 属性说明 | 参考值
 * @params: dep_time | 出发时间 | 06:00
 * @params: arr_time | 到达时间 | 09:00
 * 
 * @return: 相隔时间的字符串
 */

export function getIntervalTime(dep_time, arr_time){
    // 1.将出发时间和到达时间转化为分钟
    // 1.1转成数组
    const dep = dep_time.split(":");
    const arr = arr_time.split(":");

    // 1.2转成分钟
    const depMinuts = dep[0] * 60 + (+dep[1]);
    // 到达时间如果是小于出发时间，说明时第二天
    // 那么就给到达时间加上24小时
    if( (+arr[0]) < dep[0] ){
        arr[0] += 24;
    }
    const arrMinuts = arr[0] * 60 + (+arr[1]);
    
    // 2.计算相差分钟数
    const coustTime = arrMinuts - depMinuts;

    // 小时
    const hours = Math.floor(coustTime / 60);
    // 分钟
    const minuts = coustTime % 60;

    // 3.返回时间
    return `${hours}时${minuts}分`;
}