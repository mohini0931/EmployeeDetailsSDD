import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTeamComponent } from './my-team.component';
import { By } from '@angular/platform-browser';

describe('MyTeamComponent', () => {
  let component: MyTeamComponent;
  let fixture: ComponentFixture<MyTeamComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTeamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyTeamComponent);
    component = fixture.componentInstance;
  });

  // Test to ensure the component is created
  it('should create', () => {
    //fixture.detectChanges() is called only after setting the necessary properties and calling lifecycle hooks manually.
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Test to ensure the teamDetails input is received correctly
  it('should receive teamDetails input correctly', () => {
    const mockTeamDetails = [
      {
        id: 1,
        name: 'John Doe',
        lastMonth: 80,
        role: 'Developer',
        score: 90,
        thisMonth: 85,
        avatar: 'avatar1.png',
        performanceCategory: 'good-score',
      },
      {
        id: 2,
        name: 'Jane Smith',
        lastMonth: 75,
        role: 'Designer',
        score: 85,
        thisMonth: 80,
        avatar: 'avatar2.png',
        performanceCategory: 'average-score',
      },
    ];

    component.teamDetails = mockTeamDetails;
    fixture.detectChanges();

    expect(component.teamDetails).toEqual(mockTeamDetails);
  });

  // Test to ensure the team members are displayed correctly in the template
  it('should display team members correctly', () => {
    const mockTeamDetails = [
      {
        id: 1,
        name: 'John Doe',
        lastMonth: 80,
        role: 'Developer',
        score: 90,
        thisMonth: 85,
        avatar: 'avatar1.png',
        performanceCategory: 'good-score',
      },
      {
        id: 2,
        name: 'Jane Smith',
        lastMonth: 75,
        role: 'Designer',
        score: 85,
        thisMonth: 80,
        avatar: 'avatar2.png',
        performanceCategory: 'average-score',
      },
    ];

    component.teamDetails = mockTeamDetails;
    fixture.detectChanges();

    const teamRows = fixture.debugElement.queryAll(By.css('.team-row'));
    expect(teamRows.length).toBe(mockTeamDetails.length + 1); // Including the header row

    const firstTeamMember = teamRows[1].nativeElement;
    expect(firstTeamMember.textContent).toContain('John Doe');
    expect(firstTeamMember.textContent).toContain('90');
    expect(firstTeamMember.textContent).toContain('85%');
    expect(firstTeamMember.textContent).toContain('80%');
  });

  // Test to ensure the legend items are displayed correctly
  it('should display the correct number of legend items', () => {
    fixture.detectChanges();
    const legendItems = fixture.nativeElement.querySelectorAll('.legend-item');
    expect(legendItems.length).toBe(4); // We expect 4 legend items: Perfect score, Good score, Average score, and Bad score
  });

  // Test to ensure the ngOnInit lifecycle hook is called and logs the teamDetails
  it('should log teamDetails on initialization', () => {
    const mockTeamDetails = [
      {
        id: 1,
        name: 'John Doe',
        lastMonth: 80,
        role: 'Developer',
        score: 90,
        thisMonth: 85,
        avatar: 'avatar1.png',
        performanceCategory: 'good-score',
      },
    ];

    spyOn(console, 'log');
    component.teamDetails = mockTeamDetails;
    //Calling ngOnInit Explicitly: To ensure that ngOnInit uses the provided teamDetails, 
    //the method is called explicitly after setting the input.
    component.ngOnInit(); // Explicitly call ngOnInit
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith(
      'data from dashboard component=' + mockTeamDetails
    );
  });
});
