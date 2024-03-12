import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogbookComponent } from './logbook.component';

describe('LogbookComponent', () => {
  let component: LogbookComponent;
  let fixture: ComponentFixture<LogbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogbookComponent]
    });
    fixture = TestBed.createComponent(LogbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
