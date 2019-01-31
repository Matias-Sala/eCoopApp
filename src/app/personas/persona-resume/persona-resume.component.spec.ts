import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaResumeComponent } from './persona-resume.component';

describe('PersonaResumeComponent', () => {
  let component: PersonaResumeComponent;
  let fixture: ComponentFixture<PersonaResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
