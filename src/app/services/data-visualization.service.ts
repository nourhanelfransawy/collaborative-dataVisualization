import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import point from '../models/point.model';



@Injectable({
  providedIn: 'root'
})
//exports TutorialService that uses @angular/fire‘s

export class DataVisualizationService {
 
  private dbPath = '/points';

  pointsRef: AngularFireList<point>;

  tutorials: Observable<any[]>;
// db: AngularFireDatabase
//this.tutorials = db.list('tutorials').valueChanges();
  constructor(private db: AngularFireDatabase) {
    this.pointsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<point> {
    console.log(this.pointsRef);
    return this.pointsRef;

  }

  create(point: point): any {
    console.log("step2");
    return this.pointsRef.push(point);
  }

  
  // delete(key: string): Promise<void> {
  //   return this.pointsRef.remove(key);
  // }

  deleteAll(): Promise<void> {
    return this.pointsRef.remove();
  }
}
