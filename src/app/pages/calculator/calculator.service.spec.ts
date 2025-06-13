
import { CalculatorService } from './calculator.service';
import { Entry, Waiter } from '../../models';
import { TestBed } from '@angular/core/testing';


describe('HomePage', () => {
  const mockData: Waiter[] = [
    new Waiter({
      id: Math.floor(Math.random() * 100),
      name: 'Jose',
      tipsShare: null,
      hours: 1,
      totalPoints: 1,
      avatar: 'assets/images/goiaba.png',
      pointsList: [
        {
          "id": "123",
          "label": "Serve Wine",
          "type": "radio",
          "value": 1
        },
      ],
      xValue: null,
      yValue: null,
    }),
    new Waiter({
      id: Math.floor(Math.random() * 100),
      name: 'Mary',
      tipsShare: null,
      hours: 1,
      totalPoints: 1,
      avatar: 'assets/images/goiaba.png',
      pointsList: [
        {
          "id": "123",
          "label": "Serve Wine",
          "type": "radio",
          "value": 1
        },
      ],
      xValue: null,
      yValue: null,
    }),
    new Waiter({
      id: Math.floor(Math.random() * 100),
      name: 'Joe',
      tipsShare: null,
      hours: 1,
      totalPoints: 1,
      avatar: 'assets/images/goiaba.png',
      pointsList: [
        {
          "id": "123",
          "label": "Serve Wine",
          "type": "radio",
          "value": 1
        },
      ],
      xValue: null,
      yValue: null,
    }),
  ];

  let service: CalculatorService;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });

  it('should create new Entry using parameter', () => {
    
    const date: Date = new Date();
    const tips: number = 100;

    const re = service.calculateWaiterEntryObject(mockData, date, tips);

    expect(re.date).toBe(date);
    expect(re.tipsMade).toBe(tips);

    re.waiters.forEach(w => {
      expect(w.tipsShare).not.toBeNull();
      expect(w.tipsShare).toBe(33.33);
    });

    expect(re).toEqual(jasmine.any(Entry))

  });
});
