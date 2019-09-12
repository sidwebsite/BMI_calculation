var btnResult = document.querySelector('#btnResultId'); //計算結果
var resultNum = document.querySelector('#resultNum'); //
var data = JSON.parse(localStorage.getItem('bmiData')) || []; //如果有資料會被抓出來，如沒有就是空陣列
var dataContent = document.querySelector('.data'); //BMI紀錄內容
var height = document.querySelector('#heightId'); //身高
var weight = document.querySelector('#weightId'); //體重
var resultNumber = document.querySelector('.resultNumber'); //BMI結果樣式
var noData = document.querySelector('#noDataText');
var levelName = document.querySelector('.bmiName'); //級別
var contentTitle = document.querySelector('.title'); //內容標題
var btnDel = document.querySelector('#del');  //刪除按鈕


//日期物件
var today = new Date(); //當天日期
var year = today.getFullYear(); //年
var momth = today.getMonth(); //月
var date = today.getDate(); //日

//BMI計算
function bmiCalculation() {  
    var heightValue = height.value;
    var weightValue = weight.value;
    var heightNum = parseInt(heightValue) / 100;
    var weightNum = parseInt(weightValue);
    var result = 0;
    var color = '';       
    result = weightNum / (heightNum * heightNum); //BMI計算公式
    resultNum.textContent = result.toFixed(2); //結果，小數2位數(註:value.toFixed(number) - 設定小數幾位數)
    
    //判斷input是否為數字
    if(isNaN(heightValue)){
        alert("您輸入的身高格式錯誤");
        return;
    }
    if(isNaN(weightValue)){
        alert("您輸入的體重格式錯誤");
        return;
    }
    //判斷input是否有數值
    if(heightValue == null || heightValue == ""){
        alert('請輸入你的身高');
        return;
    }
    if(weightValue == null || weightValue == ""){
        alert('請輸入你的體重');
        return;
    }
    //判斷BMI值數，屬於什麼級別
    if(result < 18.5) {    
        levelName.textContent = '過輕';
        resultNumber.classList.add('color-blue');
        levelName.classList.add('color-blue');
        color = 'blue'    
    } else if(result >= 18.5 && result < 25) {    
        levelName.textContent = '理想';
        resultNumber.classList.add('color-green');
        levelName.classList.add('color-green');
        color = 'green'
    } else if(result >= 25 && result < 27){    
        levelName.textContent = '過重';
        resultNumber.classList.add('color-orange');
        levelName.classList.add('color-orange');
        color = 'orange'    
    } else if(result >= 27 && result < 30){    
        levelName.textContent = '輕度肥胖';
        resultNumber.classList.add('color-darkOrange');
        levelName.classList.add('color-darkOrange');
        color = 'darkOrange'    
    } else if(result >= 30 && result < 35){    
        levelName.textContent = '中度肥胖';
        resultNumber.classList.add('color-darkOrange');
        levelName.classList.add('color-darkOrange');
        color = 'darkOrange'    
    } else if(result >= 35){    
        levelName.textContent = '重度肥胖';
        resultNumber.classList.add('color-red');
        levelName.classList.add('color-red');
        color = 'red'    
    }    
    resultNumber.style.display = 'block';
    btnResult.style.display = 'none';
    levelName.style.display = 'block';
    var levelStr = levelName.textContent; 
    var bmiDate = year + '-' + momth + '-' + date;
    var cont = {levelName:levelStr,bmi:result.toFixed(2),weight:weightValue,height:heightValue,date:bmiDate,color:color};
    data.push(cont);
    
    localStorage.setItem('bmiData', JSON.stringify(data)); 
    upData(data);      
}

upData(data);

btnResult.addEventListener('click', bmiCalculation);

//更新資料
function upData(item){
    var str = '';
    var len = item.length;
    for(var i = 0; i < len; i++){
        var levelName = item[i].levelName;
        var bmi = item[i].bmi;
        var w = item[i].weight;
        var h = item[i].height;
        var date = item[i].date;
        var borderColor = item[i].color;
        var content = '<div class="wrapper border-color-'+ borderColor +'">\
        <div class="item">'+ levelName +'</div>\
        <div class="item"><small>BMI</small>'+ bmi +'</div>\
        <div class="item"><small>weight</small>'+ w +'kg</div>\
        <div class="item"><small>height</small>'+ h +'cm</div>\
        <div class="item"><small>'+ date +'</small></div>\
    </div>';
        str += content;
    }
    dataContent.innerHTML = str;
    if(len == 0){         
        noData.style.display = 'block'
    } else {
        noData.style.display = 'none'
    }

}

//刪除資料
function delData(e){
    e.preventDefault();
    var len = data.length;
    data.splice(0,len);    
    localStorage.setItem('bmiData', JSON.stringify(data));    
    if(len == 0){         
        alert('BMI紀錄已全部清除');
        noData.style.display = 'block'
    }    
    upData(data);    
}

btnDel.addEventListener('click', delData);

//清除input內容和初始class
var btnLoad = document.querySelector('#btnload');

function loadData(e){
    e.preventDefault();
    height.value = "";
    weight.value = "";
    resultNumber.style.display = 'none';
    btnResult.style.display = 'block';
    levelName.style.display = 'none';
    resultNumber.className = 'resultNumber';
    levelName.className = 'bmiName';
}

btnLoad.addEventListener('click', loadData)
