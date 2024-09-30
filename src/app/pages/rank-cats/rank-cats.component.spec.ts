import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankCatsComponent } from './rank-cats.component';

describe('RankCatsComponent', () => {
  let component: RankCatsComponent;
  let fixture: ComponentFixture<RankCatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankCatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
