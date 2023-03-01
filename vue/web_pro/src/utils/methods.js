/*
 * 判断数据是否为空字符串、null、undefined
 * @params {All}      data  需要判断的数据
 * @return {Boolean}  判断结果
 */
function isEmpty(data) {
  // eslint-disable-next-line no-undefined
  if (data === null || data === undefined || data === "") return true;

  return false;
}
/*
 * 获取数据类型
 * @params {All}     data  需要判断的数据
 * @return {String}  获取的数据类型
 */
function judgeDataType(data) {
  return Object.prototype.toString.call(data).slice(8, -1);
}

/*
 * 判断数据是否为原始类型
 * @params {All}      val  需要判断的数据
 * @return {Boolean}  是否为原始类型
 */
function isStatic(val) {
  return ["String", "Number", "Boolean", "Undefined", "Null"].includes(
    judgeDataType(val)
  );
}

/*
 * 复制对象
 * @params {All}      val  需要复制的数组或者对象
 * @params {Boolean}  deep  判断是否需要深拷贝, 默认为true
 * @return {All}      已复制的数据
 */
function clone(val, deep = true) {
  // val: 要复制的对象, deep: 是否深度复制
  if (isStatic(val) || typeof val === "function") return val;
  if (Array.isArray(val))
    return val.map((item) => (deep ? clone(item, deep) : item));
  else if (typeof val === "object") {
    const wType = ["Error", "Date", "RegExp"];

    const type = Object.prototype.toString.call(val).slice(8, -1);

    if (wType.includes(type)) return new window[type](val);
    const tag = {};

    for (const key in val) tag[key] = deep ? clone(val[key], deep) : val[key];

    return tag;
  }
}

/*
 * 下载文件
 * @params {Object}   res       true: 服务响应信息, type = false: file
 * @params {String}   fileName  导出文件名称
 * @params {Boolean}  type      判断是否从后台获取数据
 */
function download(res, fileName, type = true) {
  let url = "";

  let fileNames = clone(fileName);

  isEmpty(fileNames) && (fileNames = "下载文件");
  if (type) {
    const content = res.headers["content-disposition"];

    if (isEmpty(content)) {
      console.log("响应头缺少content-disposition");
      return;
    }
    const fileType = content.slice(content.lastIndexOf(".") + 1);

    url = window.URL.createObjectURL(new Blob([res.data]));
    fileNames = `${fileNames}.${fileType}`;
    const a = document.createElement("a");

    a.download = fileNames;
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
  } else {
    const reader = new FileReader();

    reader.readAsArrayBuffer(res);
    reader.onload = (event) => {
      const result = event.target.result;

      let blob = null;

      if (typeof result === "object") blob = new Blob([result]);
      else blob = result;

      url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.download = fileName;
      a.href = url;
      a.click();
      window.URL.revokeObjectURL(url);
    };
  }
}

/*
 * 构造表单请求参数
 * @params {Array|Object}  data  请求参数的字段和值
 * @return {FormData}      表单数据
 */
function setFormData(data) {
  const params = new FormData();

  for (const value of data) {
    let val = value.value;

    isEmpty(val) && (val = "");
    typeof val === "object" && (val = JSON.stringify(val));
    params.append(value.filed, val);
  }
  return params;
}

/*
 * 四舍五入
 * @params {Number|String}  num     需要四舍五入的数字
 * @params {Number}         figure  需要四舍五入的位数, 默认为8
 * @return {Number}         四舍五入后的数据
 */
function fixed(num, figure = 8) {
  if (isEmpty(num) || num === Infinity) return 0;

  let number = parseFloat(num);
  // let numStr = String(num)
  // let figure = numStr.slice(numStr.indexOf('.') + 1).length;

  if (isNaN(number)) return 0;

  const m = 10 ** figure;

  number = Math.round(number * m) / m;
  // return (number * 10 ** (6 + 2)).toFixed(figure) / (10 ** (6 + 2));
  return number;
}

/*
 * 设置金额显示千分符
 * @params {Number}  num    需要转换的金额数
 * @params {Number}  fixed  需要四舍五入的位数, 默认为2
 * @reutnr {String}  已添加千分符的数据
 */
function setMoney(num = 0, fixeds = 2) {
  if (isEmpty(num) || num === 0 || isNaN(Number(num))) return 0;
  const isNegative = num < 0;

  const numStr = parseFloat(num).toFixed(fixeds);

  let money = "";

  let decimal = "";

  let integer = numStr;
  const decimalIndex = numStr.indexOf(".");

  if (decimalIndex > -1) {
    decimal = Number(0 + numStr.slice(decimalIndex)).toString();
    decimal === "0" && (decimal = "");
    integer = numStr.slice(0, decimalIndex);
  }
  const integerArr = integer.split("").reverse();

  for (let i = 3, l = integerArr.length; i < l; i += 4) {
    integerArr.splice(i, 0, ",");
    l++;
  }
  if (
    isNegative &&
    integerArr[integerArr.length - 1] === "-" &&
    integerArr[integerArr.length - 2] === ","
  )
    integerArr.splice(integerArr.length - 2, 1);
  money = integerArr.reverse().join("");
  return money + decimal.slice(decimal.indexOf("."));
}

/*
 * 带有千分符的数字去掉千分符
 * @params {String}  money  需要转换的金额
 * @return {Number}  去掉千分符的数字
 */
function getMoneyNum(money) {
  if (String(money).indexOf(",") === -1) {
    let num = Number(money);

    isNaN(num) && (num = 0);
    return num;
  }
  const num = money.split(",").join("");

  if (isNaN(Number(num))) return 0;

  return parseFloat(num);
}

/*
 * 设置按钮加载状态
 * @params {Array}   btns  需要设置的按钮数据
 * @params {String}  key   需要设置为加载状态的按钮对应的key
 */
function setBtnLoading(btns, key = "") {
  if (!Array.isArray(btns)) return;
  if (!isEmpty(key) && typeof key === "string") {
    for (const value of btns) {
      if (value.key === key) {
        value.loading = true;
        break;
      }
    }
  } else {
    for (const value of btns) value.loading = false;
  }
}

/*
 * 将数字转换为大写金额
 * @params {Number|String}  num  需要转换的金额
 * @return {String}         大写金额
 */
function changeToChinese(num) {
  let Num = clone(num);

  //判断如果传递进来的不是字符的话转换为字符
  if (typeof Num === "number")
    // eslint-disable-next-line no-new-wrappers
    Num = new String(Num);

  Num = Num.replace(/,/g, ""); //替换tomoney()中的“,”
  Num = Num.replace(/ /g, ""); //替换tomoney()中的空格
  Num = Num.replace(/￥/g, ""); //替换掉可能出现的￥字符
  if (isNaN(Num)) {
    //验证输入的字符是否为数字
    //alert("请检查小写金额是否正确");
    return "";
  }
  //字符处理完毕后开始转换，采用前后两部分分别转换
  const part = String(Num).split(".");

  let tmpnewchar = "";

  let newchar = "";

  //小数点前进行转化
  let perchar = "";

  for (let i = part[0].length - 1; i >= 0; i--) {
    if (part[0].length > 10) return "";
    //若数量超过拾亿单位，提示
    perchar = part[0].charAt(i);

    switch (perchar) {
      case "0":
        tmpnewchar = "零" + tmpnewchar;
        break;
      case "1":
        tmpnewchar = "壹" + tmpnewchar;
        break;
      case "2":
        tmpnewchar = "贰" + tmpnewchar;
        break;
      case "3":
        tmpnewchar = "叁" + tmpnewchar;
        break;
      case "4":
        tmpnewchar = "肆" + tmpnewchar;
        break;
      case "5":
        tmpnewchar = "伍" + tmpnewchar;
        break;
      case "6":
        tmpnewchar = "陆" + tmpnewchar;
        break;
      case "7":
        tmpnewchar = "柒" + tmpnewchar;
        break;
      case "8":
        tmpnewchar = "捌" + tmpnewchar;
        break;
      case "9":
        tmpnewchar = "玖" + tmpnewchar;
        break;
      default:
        break;
    }
    switch (part[0].length - i - 1) {
      case 0:
        tmpnewchar += "元";
        break;
      case 1:
        if (perchar !== "0") tmpnewchar += "拾";
        break;
      case 2:
        if (perchar !== "0") tmpnewchar += "佰";
        break;
      case 3:
        if (perchar !== "0") tmpnewchar += "仟";
        break;
      case 4:
        tmpnewchar += "万";
        break;
      case 5:
        if (perchar !== "0") tmpnewchar += "拾";
        break;
      case 6:
        if (perchar !== "0") tmpnewchar += "佰";
        break;
      case 7:
        if (perchar !== "0") tmpnewchar += "仟";
        break;
      case 8:
        tmpnewchar += "亿";
        break;
      case 9:
        tmpnewchar += "拾";
        break;
      default:
        break;
    }
    newchar = tmpnewchar + newchar;
  }
  //小数点之后进行转化
  if (Num.indexOf(".") !== -1) {
    if (part[1].length > 2) {
      // alert("小数点之后只能保留两位,系统将自动截断");
      part[1] = part[1].substr(0, 2);
    }
    for (let i = 0; i < part[1].length; i++) {
      tmpnewchar = "";
      perchar = part[1].charAt(i);
      switch (perchar) {
        case "0":
          tmpnewchar = "零" + tmpnewchar;
          break;
        case "1":
          tmpnewchar = "壹" + tmpnewchar;
          break;
        case "2":
          tmpnewchar = "贰" + tmpnewchar;
          break;
        case "3":
          tmpnewchar = "叁" + tmpnewchar;
          break;
        case "4":
          tmpnewchar = "肆" + tmpnewchar;
          break;
        case "5":
          tmpnewchar = "伍" + tmpnewchar;
          break;
        case "6":
          tmpnewchar = "陆" + tmpnewchar;
          break;
        case "7":
          tmpnewchar = "柒" + tmpnewchar;
          break;
        case "8":
          tmpnewchar = "捌" + tmpnewchar;
          break;
        case "9":
          tmpnewchar = "玖" + tmpnewchar;
          break;
        default:
          break;
      }
      if (i === 0) tmpnewchar += "角";
      if (i === 1) tmpnewchar += "分";
      newchar += tmpnewchar;
    }
  }
  //替换所有无用汉字
  while (newchar.search("零零") !== -1) newchar = newchar.replace("零零", "零");
  newchar = newchar.replace("零亿", "亿");
  newchar = newchar.replace("亿万", "亿");
  newchar = newchar.replace("零万", "万");
  newchar = newchar.replace("零元", "元");
  newchar = newchar.replace("零角", "");
  newchar = newchar.replace("零分", "");
  if (newchar.charAt(newchar.length - 1) === "元") newchar += "整";

  return newchar;
}

/*
 * 元和万元转换, 自动添加千分符
 * @params {Number|String}  Num   需要转换的金额
 * @params {Number}         type  转换方式, 0: 元转万元, 1: 万元转元, 默认为0
 * @return {Number|String}  转换后的金额
 */
function changeMoneyUnit(Num, type = 0) {
  if (isEmpty(Num) || Num === Infinity) return 0;

  switch (type) {
    case 0:
      return setMoney(Num / 10000, 6);
    case 1:
      return parseFloat((getMoneyNum(Num) * 10000).toFixed(2));
    default:
      break;
  }
}

/*
 * 计算数据倍数
 * @params {Number|String}  Num       需要转换的百分比
 * @params {Number}         type      转换方式, 0: 乘以对应倍数, 1: 除以对应倍数, 默认为0
 * @params {Number}         multiple  计算的倍数, 默认为100
 * @return {Number}         计算后的数据
 */
function changePercent(Num, type = 0, multiple = 100) {
  let percent = parseFloat(Num);

  isNaN(percent) && (percent = 0);
  type === 0 ? (percent *= multiple) : (percent /= multiple);
  const percentStr = String(percent);

  return percentStr.length > 15 ? fixed(percent) : percent;
}

/*
 * 设置卡号格式(每四位隔开)
 * @params {Number|String}  Num  需要设置的卡号
 * @return {String}
 */
function setCardNumber(Num) {
  let card = parseFloat(Num);

  // eslint-disable-next-line no-self-compare
  if (card !== card) return Num;

  card = String(Num);
  const arr = [];

  for (let i = 0; i < card.length; i++) {
    if (i > 0 && i % 4 === 0) arr.push(" ");

    arr.push(card[i]);
  }
  return arr.join("");
}

/*
 * 根据模板设置时间格式
 * @params {String|Object|Number|Date}  time    需要设置的时间, 数据类型为具体时间、时间戳、时间对象, 默认为当天
 * @params {String}                     format  时间格式
 *                                              yyyy: 年份, MM: 月份, dd: 日, hh: 小时(12小时制), HH: 小时(24小时制), mm: 分, ss: 秒,
 *                                              其中不补0为单字母, 补0为双字母, 默认为yyyy-MM-dd
 *                                              eg: 'yyyy-MM-dd', 'yyyy-M-d H:m:s', 'yyyy-MM-dd hh:mm:ss'
 * @return {String}
 */
function setTimeToFormat(time = Date.now(), format = "yyyy-MM-dd") {
  // console.log(format, time);
  if (isEmpty(time)) return "";
  const date = new Date(time);
  const setDate = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  };
  // console.log(setDate)

  setDate.h = setDate.H > 12 ? setDate.H - 12 : setDate.H;
  let msg = format;

  for (const key in setDate) {
    const value = setDate[key];

    if (key !== "yyyy") {
      setDate[`${key}${key}`] = value < 10 ? "0" + value : value;
      msg = msg.replace(`${key}${key}`, setDate[`${key}${key}`]);
      msg = msg.replace(key, value);
    } else msg = msg.replace(key, value);
  }
  return msg;
}

/*
 * 计算时间差
 * @params {Number}  difTime  相差时间的毫秒数, 默认为0
 * @params {String}  format   返回结果的格式, 默认为'dd天hh小时mm分钟ss秒'
 * @return {String}  返回对应格式的时间差
 */
function getDifTime(difTime = 0, format = "dd天hh小时mm分钟ss秒") {
  const SS = 1000;
  const MM = SS * 60;
  const HH = MM * 60;
  const DD = HH * 24;
  const L1 = difTime % DD;
  const L2 = L1 % HH;
  const L3 = L2 % MM;

  const setDate = {
    d: ~~(difTime / DD),
    h: ~~(L1 / HH),
    m: ~~(L2 / MM),
    s: ~~(L3 / SS),
  };

  let msg = format;

  for (const key in setDate) {
    const value = setDate[key];

    setDate[`${key}${key}`] = value < 10 ? "0" + value : value;
    msg = msg.replace(`${key}${key}`, setDate[`${key}${key}`]);
    msg = msg.replace(key, value);
  }
  return msg;
}

/*
 * 获取查询条件
 * @params {Array}   datas  查询条件数据
 * @params {Number}  type  是否转成表单, 1: 是, 0: 否, 默认为1
 * @reutnr {Object|FormData}
 */
function getQuery(datas, type = 1) {
  const params = Object.create(null);

  const data = clone(datas);

  for (let i = data.length; i--;) {
    const msg = data[i];

    let value = msg.value;

    // const val = Object.create(null);

    if (msg.interval) {
      Object.assign(params, getQuery(msg.interval, 0));
      continue;
    }

    const unit = msg.unit;

    if (!isEmpty(value) && unit) {
      switch (unit) {
        case "万元":
          value = changeMoneyUnit(value, 1);
          break;
        case "元":
          value = getMoneyNum(value);
          break;
        case "%":
          value = changePercent(value, 1);
          break;
        default:
          break;
      }
    }

    if (msg.type === "cascader" && Array.isArray(value))
      value = value.length > 0 ? value[value.length - 1] : "";
    else if (isEmpty(value) || (Array.isArray(value) && value.length === 0))
      value = "";

    params[msg.field] = value;
  }
  return type === 1
    ? setFormData([{ filed: "content", value: JSON.stringify(params) }])
    : params;
}

/*
 * 判断选中数据条数
 * @params {Array}   data  需要判断的数据
 * @params {Number}  type  判断方式, 0: 是否选中数据; 1: 是否只选中一条数据, 默认为0
 * @reutrn {Object}  hasRow: 是否通过判断, msg: 提示信息
 */
function hasCheckRow(data, type = 0) {
  const len = data.length;

  let hasRow = true;

  let msg = "";

  if (len === 0) {
    hasRow = false;
    msg = "请至少选择一条数据";
  } else if (type === 1 && len > 1) {
    hasRow = false;
    msg = "请只选择一条数据";
  }
  return { hasRow, msg };
}
// 选择框格式处理
function selectType(sel = [], beforeField) {
  // afterField = afterField || ["label", "value"];
  const select = [];

  sel.map((res) => {
    // console.log(res[beforeField[1]])
    select.push({
      label: res[beforeField[0]],
      value: String(res[beforeField[1]]),
    });
  });
  return select;
}
// 表单数据处理
function formProcessing(form) {
  const forms = {};

  form.map((res) => {
    if (res.value) forms[res.field] = res.value;
  });
  return forms;
}
/*
    查找符合条件的树结构
    data     Array      需要查找的树结构数据
    field    String     需要查找值对应的字段
    value    String     需要查找的值
    child    String     子集字段
*/
function searchArray(data, field, value, child = "children") {
  // data = clone(data);
  let res = [];

  if (!Array.isArray(data)) return res;

  for (let i = data.length; i--;) {
    const val = data[i];

    const children = val[child];

    if (val[field] === value) {
      res = [val];
      break;
    } else if (Array.isArray(children)) {
      res = searchArray(children, value, field);
      if (res.length > 0) break;
    } else if (res.length > 0) break;
  }
  return res;
}

// 身份证15位转18位
function checkCardID(cardID) {
  // eslint-disable-next-line no-array-constructor
  const v = new Array();

  const vs = "10X98765432";

  const cardObj = {
    code: "",
    val: "",
  };

  v.push(2, 4, 8, 5, 10, 9, 7, 3, 6, 1, 2, 4, 8, 5, 10, 9, 7);
  if (cardID.length !== 15) {
    cardObj.code = "0";
    cardObj.val = "请输入15位身份证号码！";
    return cardObj;
  }
  const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;

  if (reg.test(cardID) === false) {
    cardObj.code = "0";
    cardObj.val = "请输入正确的身份证信息";
    return cardObj;
  }
  //将15位的号码转换位17位
  const cardIDcardID17 = cardID.substring(0, 6) + "19" + cardID.substring(6);

  let N = 0;

  let R = -1;

  let T = "0"; //储存最后一个数字

  let j = 0;
  //计数出第18位数字

  for (let i = 16; i >= 0; i--) {
    N += parseInt(cardIDcardID17.substring(i, i + 1)) * v[j];
    j++;
  }
  R = N % 11;
  T = vs.charAt(R);
  cardObj.code = "1";
  cardObj.val = cardIDcardID17 + T;
  return cardObj;
}

/*
  校验是否是合法证件号码
  certType:0-身份证；b-社会信用代码
  idNumber:证件号码
*/
function isLegalIdNumber(certType, idNumbers) {
  let isRight = true;

  let idNumber = clone(idNumbers);

  if (certType === "0") {
    if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(idNumber)) {
      console.log("你输入的身份证长度或格式错误");
      return false;
    }
    if (idNumber.length === 15) {
      const cardId = checkCardID(idNumber);

      cardId.code === "1" && (idNumber = cardId.val);
    }
    //身份证城市
    const aCity = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外",
    };

    if (!aCity[parseInt(idNumber.substr(0, 2))]) {
      console.log("你的身份证地区非法");
      return false;
    }

    // 出生日期验证
    const sBirthday = (
      idNumber.substr(6, 4) +
      "-" +
      Number(idNumber.substr(10, 2)) +
      "-" +
      Number(idNumber.substr(12, 2))
    ).replace(/-/g, "/"),
      d = new Date(sBirthday);

    if (
      sBirthday !==
      d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate()
    ) {
      console.log("身份证上的出生日期非法");
      return false;
    }

    // 身份证号码校验
    let sum = 0;

    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

    const codes = "10X98765432";

    for (let i = 0; i < idNumber.length - 1; i++)
      sum += idNumber[i] * weights[i];

    const last = codes[sum % 11]; //计算出来的最后一位身份证号码

    if (String(idNumber[idNumber.length - 1]) !== last) {
      console.log("你输入的身份证号非法");
      return false;
    }

    return true;
  } else if (certType === "b") {
    let Ancode = null; //统一社会信用代码的每一个值

    let Ancodevalue = null; //统一社会信用代码每一个值的权重

    let total = 0;

    const weightedfactors = [
      1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28,
    ]; //加权因子
    //不用I、O、S、V、Z

    const str = "0123456789ABCDEFGHJKLMNPQRTUWXY";

    for (let i = 0; i < idNumber.length - 1; i++) {
      Ancode = idNumber.substring(i, i + 1);
      Ancodevalue = str.indexOf(Ancode);
      total += Ancodevalue * weightedfactors[i];
      //权重与加权因子相乘之和
    }
    let logiccheckcode = 31 - (total % 31);

    if (Number(logiccheckcode) === 31) logiccheckcode = 0;

    const Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";

    const Array_Str = Str.split(",");

    logiccheckcode = Array_Str[logiccheckcode];

    const checkcode = idNumber.substring(17, 18);

    if (String(logiccheckcode) !== String(checkcode)) isRight = false;
  }
  return isRight;
}

// 筛选表格空数据
function filterEmptyRow(tHead, data) {
  const newRow = [];

  for (let i = data.length; i--;) {
    let emptyRow = true;

    let editRow = false;
    const row = data[i];

    for (const key in row) {
      const column = tHead.filter((item) => item.field === key)[0];

      let ol = row[key];

      if (!isEmpty(ol) && column && column.editRender) {
        const unit = column.editRender.unit;

        switch (unit) {
          case "万元":
            ol = changeMoneyUnit(ol, 1);
            break;
          case "%":
            ol = changePercent(ol, 1);
            break;
          default:
            break;
        }
        row[key] = ol;
      }
      if (emptyRow) {
        if (!isEmpty(column) && column.slots && column.slots.default === "edit")
          editRow = true;

        if (key !== "rowId" && key !== "edit" && !isEmpty(row[key]))
          emptyRow = false;
        // break;
      }
    }
    if ((editRow && !emptyRow) || !editRow) newRow.push(row);
  }
  return newRow;
}

// 字符串转数组
function stringToArray(string) {
  if (Array.isArray(string)) return string;
  else if (/^\[.*]$/.test(string)) return JSON.parse(string);
  else if (isEmpty(string)) return [];
  else if (typeof string === "string") return string.split(",");
}

/*
  树形递归添加属性
*/
function addProperty(data, field = {}) {
  if (!Array.isArray(data)) return;
  for (let i = data.length; i--;) {
    const value = data[i];

    const childrenField = field.children || "children";

    for (const key in field) value[key] = value[field[key]];

    if (value[childrenField]) addProperty(value[childrenField], field);
  }
}

/*
   检测密码强度
   str    Number|String    需要检测的密码
*/
function checkPwd(strs) {
  const str = clone(String(strs));

  let Lv = 0;

  if (str.length < 6) return Lv;

  if (/[0-9]/.test(str)) Lv++;

  if (/[a-z]/.test(str)) Lv++;

  if (/[A-Z]/.test(str)) Lv++;

  if (/[.|-|_]/.test(str)) Lv++;

  return Lv;
}

function filterTree(lists, id, parentId) {
  const idList = {},
    treeList = [];

  for (let i = 0, len = lists.length; i < len; i++) {
    //生成一个以id为键的对象
    idList[lists[i][id]] = lists[i];
  }
  // console.log(idList);
  for (let j = 0, len1 = lists.length; j < len1; j++) {
    const aVal = lists[j];

    const aValParent = idList[aVal[parentId]];
    //如果aValParent存在；就说明当前的aVal是aValParent的孩子

    if (aValParent) {
      if ("children" in aValParent) aValParent.children.push(aVal);
      else {
        aValParent.children = [];
        aValParent.children.push(aVal);
      }
    } else treeList.push(aVal);
  }

  return treeList;
}

/*
 * 设置n月后的日期，导出日期默认为yyyy-MM-dd格式
 * time     Date      需要计算的日期，默认为当天
 * month    Number    需要计算的月份，整数为对应月份之后，负数为对应月份之前，默认为6个月后
 */

function setMonthAround(time = Date.now(), months = 6, format = "yyyy-MM-dd") {
  const date = new Date(time);

  const month = clone(Number(months));

  if (isNaN(month)) return "";
  // 设置增加6个月后的日期
  let [Y, M, D] = [
    date.getFullYear(),
    date.getMonth() + 1 + month,
    date.getDate(),
  ];

  M > 12 && ((M -= 12), (Y += 1));
  M <= 0 && ((M += 12), (Y -= 1));
  M === 2 && D === 30 && (D -= 1);
  M === 2 && D === 31 && (D -= 2);
  let monthAround = new Date(`${Y}-${M}-${D}`);

  if (monthAround.getMonth() + 1 > M)
    monthAround = new Date(`${Y}-${M}-${D - 1}`);

  // 计算一天的毫秒数
  const oneDay = 1000 * 60 * 60 * 24;

  month > 0 ? (monthAround -= oneDay) : (monthAround += oneDay);
  return setTimeToFormat(monthAround, format);
}

function isArray(value) {
  return Array.isArray(value);
}

export {
  clone,
  judgeDataType,
  download,
  setFormData,
  setMoney,
  getMoneyNum,
  setBtnLoading,
  changeToChinese,
  changeMoneyUnit,
  changePercent,
  setCardNumber,
  isEmpty,
  setTimeToFormat,
  getDifTime,
  getQuery,
  hasCheckRow,
  searchArray,
  fixed,
  isLegalIdNumber,
  stringToArray,
  addProperty,
  checkPwd,
  filterTree,
  setMonthAround,
  selectType,
  formProcessing,
  filterEmptyRow,
  isArray,
};
