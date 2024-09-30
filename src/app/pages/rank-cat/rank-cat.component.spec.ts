import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankCatComponent } from './rank-cat.component';

describe('RankCatComponent', () => {
  let component: RankCatComponent;
  let fixture: ComponentFixture<RankCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
