import { Injectable } from '@angular/core';
import { sumPointsArray, generateId } from '../../services/utils';
import { Waiter } from '../../models/waiters.type';
import { Point } from '../../models/point.type';
import { Entry } from '../../models/entry.type';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {

  calculateWaiterEntryObject(waitersList: Waiter[], date: Date, tips: number): Entry {
    const sumXValueArray: any[] = [];
    waitersList.forEach((waiter) => {
      waiter.xValue = this.transform(waiter.pointsList) + waiter.hours;
      sumXValueArray.push(waiter.xValue);
    });
    const aValue = sumPointsArray(sumXValueArray);
    const lWaiter: Waiter[] = [];
    waitersList.forEach((waiter) => {
      const yValue = tips / aValue;
      waiter.yValue = yValue,
        lWaiter.push(new Waiter({
          id: waiter?.id,
          name: waiter?.name,
          pointsList: waiter?.pointsList,
          totalPoints: this.transform(waiter.pointsList),
          hours: waiter?.hours,
          tipsShare: parseFloat((waiter.xValue * waiter.yValue).toFixed(2)),
          avatar: waiter?.avatar,
          xValue: this.transform(waiter.pointsList) + waiter.hours,
          yValue: parseFloat(yValue.toFixed(2))
        }));
    });
    return new Entry({
      id: generateId(),
      tipsMade: tips,
      date,
      waiters: lWaiter,
    });
  }

  private transform(array: []) {
    if (array.length > 0) {
      const totalPoints: number[] = [];
      array.forEach((point: Point) => {
        totalPoints.push(point.value);
      });
      const sum = totalPoints.reduce((a: any, b: any) => a + b, 0);
      return sum;
    }
  }

}
