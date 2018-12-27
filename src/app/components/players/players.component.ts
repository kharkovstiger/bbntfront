import {ChangeDetectorRef, Component, Inject, SimpleChanges, ViewChild} from '@angular/core';
import {Player, Skill} from "../../_models";
import {CountriesService, PlayerService} from '../../_services';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {merge, Observable, Subscription} from "rxjs";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  templateUrl: 'players.component.html',
  styleUrls: ['players.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlayersComponent {

  players: MatTableDataSource<Player>;
  displayedColumns: string[];
  columnsForDisplay: string[];
  isLoadingResults: boolean;
  resultsLength: number;
  private columnsForMyPlayers: string[] = ['Name', 'age', 'potential', 'lastUpdate'];
  expandedElement: Player | null;
  private columnsForNTPlayers: string[] = ['Name', 'team', 'manager', 'salary', 'age', 'height', 'potential', 'gameShape',
    'jumpShot', 'range', 'outsideDef', 'handling', 'driving', 'passing', 'insideShot', 'insideDef', 'rebound', 'block',
    'stamina', 'freeThrow', 'experience',  'lastUpdate'];
  private readonly navigationSubscription: Subscription;
  private currentCountry: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private playerService: PlayerService, private route: ActivatedRoute, public dialog: MatDialog,
              private changeDetectorRefs: ChangeDetectorRef, private router: Router, private countryService:CountriesService) {
    this.countryService.currentCountry.subscribe(x => this.currentCountry = x);
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initTable();
      }
    });
  }

  ngOnInit() {
    // this.initTable();
  }

  getPlayers(): Observable<Player[]> {
    let type: string = '';
    this.route.params.subscribe(p => type = p.type);
    this.displayedColumns = [];
    if (type == 'my') {
      this.columnsForDisplay = this.columnsForMyPlayers;
      this.columnsForDisplay.forEach(c => this.displayedColumns.push(c));
      this.displayedColumns.push('add');
      return this.playerService.getTeamPlayers(this.currentCountry);
    }
    if (type == 'nt'){
      this.columnsForDisplay = this.columnsForNTPlayers;
      this.columnsForDisplay.forEach(c => this.displayedColumns.push(c));
      return this.playerService.getNTPlayers();
    }
    if (type == 'bulk'){
      this.columnsForDisplay = this.columnsForNTPlayers;
      this.columnsForDisplay.forEach(c => this.displayedColumns.push(c));
      return new Observable<Player[]>();
    }
  }

  applyFilter(filterValue: string) {
    this.players.filter = filterValue.trim().toLowerCase();

    if (this.players.paginator) {
      this.players.paginator.firstPage();
    }
  }

  add(playerId: string) {
    this.playerService.addPlayer(playerId).subscribe(r => this.initTable());
  }

  initTable() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.isLoadingResults = true;
    this.resultsLength = 0;

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.getPlayers();
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.length;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return new Observable<Player[]>();
        })
      ).subscribe(data => {
        data.forEach(p => {
          for (let skillsKey in p.skills) {
            p[skillsKey]=p.skills[skillsKey];
          }
        });
        this.players = new MatTableDataSource(data);
        this.players.paginator = this.paginator;
        this.players.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  getColumnValue(player: Player, column: string){
    if (column === 'Name')
      return player.firstName + ' ' + player.lastName;
    return player[column];
  }

  getColumnName(column: string){
    switch(column){
      case 'jumpShot': return 'JS';
      case 'range': return 'JR';
      case 'outsideDef': return 'OD';
      case 'handling': return 'HA';
      case 'driving': return 'DR';
      case 'passing': return 'PA';
      case 'insideShot': return 'IS';
      case 'insideDef': return 'ID';
      case 'rebound': return 'RB';
      case 'block': return 'BL';
      case 'stamina': return 'ST';
      case 'freeThrow': return 'FT';
      case 'experience': return 'EXP';
      case 'gameShape': return 'GS';
      case 'potential': return 'pot';
      default: return column;
    }
  }

  getBBPlayerLink(element: Player) {
    return 'http://www.buzzerbeater.com/player/' + element.id + '/overview.aspx';
  }

  openBio() {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {
        bio: this.expandedElement.bio,
        name: this.expandedElement.firstName + ' ' + this.expandedElement.lastName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.expandedElement.bio = result;
      this.playerService.addBio(result, this.expandedElement.id);
    });
  }
}

interface DialogData {
  bio: string;
  name: string;
}

@Component({
  selector: 'bio-dialog',
  templateUrl: 'bio.dialog.html'
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
