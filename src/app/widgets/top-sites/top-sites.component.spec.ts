import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSitesComponent } from './top-sites.component';

describe('TopSitesComponent', () => {
  let component: TopSitesComponent;
  let fixture: ComponentFixture<TopSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopSitesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
