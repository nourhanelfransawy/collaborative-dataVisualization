import { Component, OnInit } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import * as Plotly from 'plotly.js-dist-min';
import * as d3 from 'd3';

import point from 'src/app/models/point.model';
import { DataVisualizationService } from 'src/app/services/data-visualization.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

//let d3X3d = require("d3-x3d");

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  selectedPoint: point = new point();
  submitted = false;
  items: Observable<any[]>;

  csvRecords: any[] = [];

  europe: any[] = [];
  africa: any[] = [];
  asia: any[] = [];
  northAmerica: any[] = [];
  southAmerica: any[] = [];

  header:string='';
  header1:string='';
  continentName:string='';
 
  pointInfo:string='';

  textOfX:string='Totalcases';

  textOfY:string='TotalDeaths';

  textOfZ:string='Population';

  data:any;
  layout:any;

  arr=[] ;
  indicies=[];

  // d3X3d = require("d3-x3d");
   constructor(private ngxCsvParser: NgxCsvParser,
    private dvService: DataVisualizationService,
    private db: AngularFireDatabase) {
    this.items = db.list('points').valueChanges();
    
    }

  ngOnInit() {
    
  }
 // @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: true, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {

        console.log($event.srcElement.name);
        if($event.srcElement.name=='Europe'){
          this.europe=result;
        }else if($event.srcElement.name=='Africa'){
          this.africa = result;
        }else if($event.srcElement.name=='Asia'){
          this.asia = result;
        }else if($event.srcElement.name=='SouthAmerica'){
          this.southAmerica = result;
        }else if($event.srcElement.name=='NorthAmerica'){
          this.northAmerica = result;
        }
       }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });

  }
  selectContinent(selectVal:any):void{
    //console.log("hello",selectVal);
    if(selectVal=="Europe"){
      this.continentName="Europe";
  }else if(selectVal=="Asia"){
    this.continentName="Asia";
} else if(selectVal=="Africa"){
  this.continentName="Africa";
} else if(selectVal=="SouthAmerica"){
  this.continentName="SouthAmerica";
} else if(selectVal=="NorthAmerica"){
  this.continentName="NorthAmerica";
} 
  }
  chooseContinent(selectVal:any):void{
        if(selectVal=="europe"){
            this.csvRecords=this.europe;
        }else if(selectVal=="asia"){
          this.csvRecords=this.asia;
      } else if(selectVal=="africa"){
        this.csvRecords=this.africa;
    } else if(selectVal=="southAmerica"){
      this.csvRecords=this.southAmerica;
  } else if(selectVal=="northAmerica"){
    this.csvRecords=this.northAmerica;
} 

this.viewScatterPlotWithInteraction(this.csvRecords);

  }


  viewScatterPlotWithInteraction(rows): void{
    function unpack(rows, key) {
      
        return rows.map(function(row)
        { return row[key]; });}

        var trace1 = {
          x:unpack(rows, this.textOfX),
          y: unpack(rows, this.textOfY),
          z: unpack(rows, this.textOfZ),
          name:'Data', 
          mode: 'markers',
          marker: {
            size: 7,
            symbol: 'circle',
            line: {
            color: 'rgba(217, 217, 217, 0.14)',
            width: 0.5},
            opacity: 0.8},
          type: 'scatter3d'
        };
                 
        this.data = [trace1];

        var layout = {
        autosize:false,
        
        width:500,
        height:500,
        
        title:'</br> <br> Press on any point to view more data about it',    
        scene:{ 
          xaxis:{
            title:{
              text:this.textOfX,
              font:{
                family:'Courier New,monospace',
                size:18,
                color:'rgb(255,0,0)'
              }}
         }, 
     yaxis:{
        title:{
        text:this.textOfY,
        font:{
          family:'Courier New,monospace',
          size:18,
          color:'rgb(255,0,0)'
        }}

    },zaxis:{
      title:{
        text:this.textOfZ,
        font:{
          family:'Courier New,monospace',
          size:18,
          color:'rgb(255,0,0)'
        }}
    }
  }, 
       
      margin: {
          l: 0,
          r: 0,
          b: 0,
          t: 0,
          pad:4
          }, 
          activeselection:{
            fillcolor:'#c7c7c7'
          },
          //paper_bgcolor:'#c7c7c7',
          //plot_bgcolor:'#c7c7c7'
          //hovermode:'closest',
        
        };

          Plotly.newPlot('myDiv', this.data, layout);

      var myPlot:any = document.getElementById('myDiv');
      
      myPlot.on('plotly_click', (data)=>{

        var pts = '';
        for(var i=0; i < data.points.length; i++){
            
            pts = 'x = '+ data.points[i].x +'\ny = '+
                data.points[i].y + '\n\n';
        } 
        for(var i=0;i<rows.length;i++){
          if(rows[i].Totalcases==data.points[0].x && rows[i].TotalDeaths==data.points[0].y
            && rows[i].Population==data.points[0].z){
              this.selectedPoint.index=i;
              if(!(this.arrayContains(this.indicies,i))){
              this.indicies.push(i);
              this.saveIndexOfSelectedPoint();
              this.newPoint();
              this.packArray();
            }
                  }
       }
     

}); 
    myPlot.on('plotly_hover',(data)=>{
        data.points.map((d)=>{
          for(var i=0;i<rows.length;i++){
            if(rows[i].Totalcases==d.x && rows[i].TotalDeaths==d.y
              && rows[i].Population==d.z){
                 //console.log(rows[i]);
                 this.pointInfo=' ';
                 this.pointInfo="Number: "+ rows[i].Number +'\n'
                 +"Country: "+ rows[i].Country +'\n'+
                 "Total cases : "+ rows[i].Totalcases +'\n'+
                 "Total Deathes: "+ rows[i].TotalDeaths +'\n'+
                 "Total recoverd: "+ rows[i].TotalRecovered +'\n'+
                 "Population: "+ rows[i].Population +'\n';
              }
            } 
          console.log(d.x," ",d.y," ",d.z," ");
        })
    
    })
    .on('plotly_unhover',(data)=>{
          this.pointInfo=' ';
    });




}

arrayContains(arr:any[],element:number):boolean{
    for(var i=0;i<arr.length;i++){
      if(arr[i]==element){
        return true;
      }
    }
      return false;
}

       saveIndexOfSelectedPoint(): void {
        console.log('here');
          this.dvService.create(this.selectedPoint).then(() => {
            console.log('Created new item successfully!');
            this.submitted = true;
          });    
          }

        newPoint(): void {
          this.submitted = false;
          this.selectedPoint = new point();
        }

        packArray(){
          this.items.forEach(a => {
            this.arr=[];
            for(var i=0;i<a.length;i++){
                this.arr.push(this.csvRecords[a[i].index]);
              }
        });
        }
        DisplayCountryData(){

        }
}
