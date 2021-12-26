const express=require('express');
const app=express();
const request=require('request');
const path=require('path')
const PORT=process.env.PORT ||8000;




app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/weather',(req,res)=>{
    res.render('home');
});
app.get('/n',(req,res)=>{
    res.render('search')
});
app.get('/results',(req,res)=>{
let query=req.query.search;
request('http://api.openweathermap.org/data/2.5/weather?q='+query+'&appid=cbbdf6296227c362411653ac32ac230d',(err,response,body)=>{
    let data=JSON.parse(body);

        let now=new Date();
        let day=now.getDate();
        let year=now.getFullYear();
        let month=now.getMonth()+1;
        let week=new Array(7);
        week[0]="SUN";
        week[1]="MON";
        week[2]="TUE";
        week[3]="WED";
        week[4]="THU";
        week[5]="Fri";
        week[6]="SAT";
        let weekday=week[now.getDay()];
    
    let temperature=data.main.temp-273;
    let tempe=temperature.toFixed(2);
    let min=(data.main.temp_min-273).toFixed(2);
    let max=(data.main.temp_max-273).toFixed(2);
    
    
    res.render('home',{data:data,tempe:tempe,max:max,min:min,day:day,year:year,month:month,weekday:weekday});

});

});

app.listen(PORT,()=>{
    console.log('Server Started');
});