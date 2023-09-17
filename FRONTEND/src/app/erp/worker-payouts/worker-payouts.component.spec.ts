import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerPayoutsComponent } from './worker-payouts.component';

describe('WorkerPayoutsComponent', () => {
  let component: WorkerPayoutsComponent;
  let fixture: ComponentFixture<WorkerPayoutsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerPayoutsComponent]
    });
    fixture = TestBed.createComponent(WorkerPayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
