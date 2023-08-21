// 用于格式化时间
function formatDate(value: string | number | Date, format: string) {
    //value: 需要格式化的数据
    //format: 指定格式 yyyy-MM-dd hh:mm:ss
  
    let date = new Date(value);
    // 获取年份
    let year = date.getFullYear();
  
    if (/(y+)/.test(format)) {
      // 获取匹配组的内容
      let content = RegExp.$1;
      format = format.replace(content, year.toString().slice(4 - content.length));
    }
  
    let o:any = {
      // y: date.getFullYear(),  // 用这一句也行，但只适用于四位数显示时候用
      M: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds()
    };
  
    for (let key in o) {
      // 构造动态正则
      let reg = new RegExp(`(${key}+)`);
  
      if (reg.test(format)) {
        // 获取匹配组的内容
        let content = RegExp.$1;
        // let k = o[key] >= 10 ? o[key] : content.length == 2 ? '0' + o[key] : o[key];
        let k = o[key].toString().padStart(2,0);
        format = format.replace(content, k);
      }
    }
    return format;
  }
  
  export default formatDate


//2.0
// const filter = {
//     formatDate: function(value: string | number | Date,args: string) {
//         var dt = new Date(value);
//         if(args == 'yyyy-M-d') {// yyyy-M-d
//             let year = dt.getFullYear();
//             let month = dt.getMonth() + 1;
//             let date = dt.getDate();
//             return `${year}-${month}-${date}`;
//         } else if(args == 'yyyy-M-d H:m:s'){// yyyy-M-d H:m:s
//             let year = dt.getFullYear();
//             let month = dt.getMonth() + 1;
//             let date = dt.getDate();
//             let hour = dt.getHours();
//             let minute = dt.getMinutes();
//             let second = dt.getSeconds();
//             return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
//         } else if(args == 'yyyy-MM-dd') {// yyyy-MM-dd
//             let year = dt.getFullYear();
//             let month = (dt.getMonth() + 1).toString().padStart(2,'0');
//             let date = dt.getDate().toString().padStart(2,'0');
//             return `${year}-${month}-${date}`;
//         } else {// yyyy-MM-dd HH:mm:ss
//             let year = dt.getFullYear();
//             let month = (dt.getMonth() + 1).toString().padStart(2,'0');
//             let date = dt.getDate().toString().padStart(2,'0');
//             let hour = dt.getHours().toString().padStart(2,'0');
//             let minute = dt.getMinutes().toString().padStart(2,'0');
//             let second = dt.getSeconds().toString().padStart(2,'0');
//             return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
//         }
//     }
// }
// export default filter;
  