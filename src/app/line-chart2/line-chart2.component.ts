import { Component, OnInit } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import * as Plotly from 'plotly.js-dist-min';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart2.component.html',
  styleUrls: ['./line-chart2.component.css']
})
export class LineChart2Component implements OnInit {
  
  csvRecords: any[] = [];
  header=false;
  data:any;
  layout:any;
  title:string='';


  pointInfo:string='';

  constructor(private ngxCsvParser: NgxCsvParser,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("data of ",String(this.route.snapshot.paramMap.get('continentNum')));
    this.title = String(this.route.snapshot.paramMap.get('continentNum'));
    // this.title="Countries of "+this.title;
    this.title="Corona data for countries of Africa";
  }


  fileChangeListener($event: any): void {
    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: true, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {

        
        this.csvRecords = result;
        //this.viewScatterPlotWithInteraction(this.csvRecords);
        this.viewLineChartWithInteraction(this.csvRecords);
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });

  }
  viewLineChartWithInteraction(rows): void{
    function unpack(rows, key) {
      
      return rows.map(function(row)
      { return row[key]; });}

    var x1 = unpack(rows , 'one');
    var y1 = unpack(rows , 'Day');
    var z1 = unpack(rows , 'Afghanistan');

    
    var x2 = unpack(rows , 'two');
    var y2 = unpack(rows , 'Day');
    var z2 = unpack(rows , 'Bangladesh');
    

    var x3 = unpack(rows , 'three');
    var y3 = unpack(rows , 'Day');
    var z3 = unpack(rows , 'Congo');

    var x4 = unpack(rows , 'four');
    var y4 = unpack(rows , 'Day');
    var z4 = unpack(rows , 'CotedIvoire');

    var x5 = unpack(rows , 'five');
    var y5 = unpack(rows , 'Day');
    var z5 = unpack(rows , 'Egypt');
    
    var trace1 = {
      type: 'scatter3d',
      name:'Afghanistan',
      mode: 'lines',
      x: x1,
      y: y1,
      z: z1,
      opacity: 1,
      marker:{
        color:'#1f77b4',
        size:12,
        symbol:'circle',
        line:{
          color:'rgb(0,0,0)',
          width:1
      }},
      line: {
        width: 6,
       color: '#1f77b4',
       reversescale: false}  
    };

    var trace2 = {
      type: 'scatter3d',
      name:'Bangladesh', 
      mode: 'lines',
      x: x2,
      y: y2,
      z: z2,
      opacity: 1,
      marker:{
        color:'#9467bd',
        size:12,
        symbol:'circle',
        line:{
          color:'rgb(0,0,0)',
          width:0
      }},
      line: {
        width: 6,
        reversescale: false
       // color: 'rgb(1,0,0)'
      }
        // reversescale: false
      
    };
     

    var trace3 = {
      type: 'scatter3d',
      name:'Congo',
      mode: 'lines',
      x: x3,
      y: y3,
      z: z3,
      opacity: 1,
      marker:{
        color:'#1f77b2',
        size:12,
        symbol:'circle',
        line:{
          color:'rgb(0,0,0)',
          width:1
      }},
      line: {
        width: 6,
       color: '#1f77b4',
       reversescale: false}  
    };

    var trace4 = {
      type: 'scatter3d',
      name:'CotedIvoire',
      mode: 'lines',
      x: x4,
      y: y4,
      z: z4,
      opacity: 1,
      marker:{
        color:'#1f77b1',
        size:12,
        symbol:'circle',
        line:{
          color:'rgb(0,0,0)',
          width:1
      }},
      line: {
        width: 6,
       color: '#1f77b4',
       reversescale: false}  
    };
    var trace5 = {
      type: 'scatter3d',
      name:'Egypt',
      mode: 'lines',
      x: x5,
      y: y5,
      z: z5,
      opacity: 1,
      marker:{
        color:'#1f77b0',
        size:12,
        symbol:'circle',
        line:{
          color:'rgb(0,0,0)',
          width:1
      }},
      line: {
        width: 6,
       color: '#1f77b4',
       reversescale: false}  
    };


    this.layout={

      title:'<br> Corona data per day for selected countries',  
      scene:{
        xaxis:{
          title: {
           text:'Countries ',
           font:{
            family:'Courier New,monospace',
            size:18,
            color:'rgb(0,0,0)'
           }
          }
  
        },  yaxis:{
          autotick:false,
          tickwidth:1,
          tickcolor:'#000',
          title: {
           text:'Day  ',
           font:{
            family:'Courier New,monospace',
            size:18,
            color:'rgb(0,0,0)'
           }
          }
  
        }
      },
      width:500,
      height:500,
      margin:{
        l:0,
        r:0,
        b:0,
        t:0
      }
    };
             
    this.data = [trace1,trace2,trace3,trace4,trace5];



    Plotly.newPlot('myDiv1', this.data, this.layout);



    var myPlot:any = document.getElementById('myDiv1');
      
 
  myPlot.on('plotly_hover',(data)=>{
      data.points.map((d)=>{
        
        this.pointInfo="Country: ";


        switch(d.x){
          case '1':this.pointInfo+='Afghanistan';
          for(var i=0;i<rows.length;i++){
            if(rows[i].Day==d.y && rows[i].Afghanistan==d.z){
              this.pointInfo+='\n' + "Day: "+d.y +'\n'
              +"Total cases: "+ d.z +'\n'+
              "Total deaths: "+ rows[i].AfghanistanDeaths;
              }};break;
          case '2':this.pointInfo+='Bangladesh';
          for(var i=0;i<rows.length;i++){
            if(rows[i].Day==d.y && rows[i].Bangladesh==d.z){
              this.pointInfo+='\n' + "Day: "+d.y +'\n'
              +"Total cases: "+ d.z +'\n'+
              "Total deaths: "+ rows[i].BangladeshDeaths;
              }};break;
          case '3':this.pointInfo+='Congo';
          for(var i=0;i<rows.length;i++){
            if(rows[i].Day==d.y && rows[i].Congo==d.z){
              this.pointInfo+='\n' + "Day: "+d.y +'\n'
              +"Total cases: "+ d.z +'\n'+
              "Total deaths: "+ rows[i].CongoDeaths;
              }};break;
          case '4':this.pointInfo+='CotedIvoire';
          for(var i=0;i<rows.length;i++){
            if(rows[i].Day==d.y && rows[i].CotedIvoire==d.z){
              this.pointInfo+='\n' + "Day: "+d.y +'\n'
              +"Total cases: "+ d.z +'\n'+
              "Total deaths: "+ rows[i].CotedIvoireDeaths;
              }};break;
          case '5':this.pointInfo+='Egypt';
          for(var i=0;i<rows.length;i++){
            if(rows[i].Day==d.y && rows[i].Egypt==d.z){
              this.pointInfo+='\n' + "Day: "+d.y +'\n'
              +"Total cases: "+ d.z +'\n'+
              "Total deaths: "+ rows[i].EgyptDeaths;
              }};break;
        }
      })
  
  })
  .on('plotly_unhover',(data)=>{
        this.pointInfo=' ';
  });


    
  }


}
