import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstreamdeckComponent } from './liststreamdeck.component';

describe('ListstreamdeckComponent', () => {
  let component: ListstreamdeckComponent;
  let fixture: ComponentFixture<ListstreamdeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListstreamdeckComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListstreamdeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
