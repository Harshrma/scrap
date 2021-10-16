let request=require("request");
let cheerio=require("cheerio");
let fs=require("fs");
var json2xlsx = require('node-json-xlsx');
// let json2xls = require('json2xls');


const XLSX=require("xlsx");


let url="https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results"

request(url,cllback);

       



function cllback(err,response,html){
    const $=cheerio.load(html);
    const objofscoreURL=$("[data-hover=Scorecard]");
   
     for(let i=0;i<objofscoreURL.length;i++){
         let URL="https://www.espncricinfo.com/" + $(objofscoreURL[i]).attr("href");
         request(URL,cllbackAgain);
     }
}
let c=0;
const rowarray=[];
const arrayofbatsman=[];
function cllbackAgain(err,response,data){
    c++;
   // console.log(c);
    //console.log(data);
   
    const $=cheerio.load(data);
    let Batsmantable=$(".table.batsman");
    let bowlertable=$(".table.bowler");
    
    let batsmaninforow=$(Batsmantable[0]).find("tbody tr");
    console.log(batsmaninforow.length + " ->"+ c);

    let mathnamearr=$(".name-link .name");
    let name1=$(mathnamearr[0]).text();
    let n1=name1.split(" ")[0];
    let name2=$(mathnamearr[1]).text();
    let n2=name2.split(" ")[0];
    let name=n1+n2;
    const temp=[];
    for(let i=0;i<batsmaninforow.length;i++){
        let td=$(batsmaninforow[i]).find("td").length;
        if(td>2){
           

            rowarray.push(
                batsmaninforow[i],
                
            )
           // console.log($($(batsmaninforow[i]).find("td")[0]).text());
           
            const info={
                "name":$($(batsmaninforow[i]).find("td")[0]).text(),
                "r":$($(batsmaninforow[i]).find("td")[2]).text(),
                "b":$($(batsmaninforow[i]).find("td")[3]).text(),
                "4s":$($(batsmaninforow[i]).find("td")[5]).text(),
                "6s":$($(batsmaninforow[i]).find("td")[6]).text(),
                "SR":$($(batsmaninforow[i]).find("td")[7]).text()
            }
            

          
            arrayofbatsman.push(info);
            temp.push(info);


        }
        if(i==batsmaninforow.length-1){
            


           

            

                const worksheet=XLSX.utils.json_to_sheet(temp);
                const workbook=XLSX.utils.book_new();
            
                XLSX.utils.book_append_sheet(workbook,worksheet,name);
            
               
                XLSX.writeFile(workbook,"sampledata.export"+ c + ".xlsx");
            
            
      
        }
    }
    if(c==60){
      
        // for(let i=0;i<arrayofbatsman.length;i++){

        //     console.log(arrayofbatsman[i]);
        // }
      
 
       
         
    }
    

   
}
