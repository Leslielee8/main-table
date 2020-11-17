import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faCheck, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  DisplayedColumns,
  displayedColumns,
} from '../entities/displayedColumns';
import { Item } from '../entities/Item';
import { DataApiHelperService } from '../services/data-api-helper.service';
@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.scss'],
})
export class MainTableComponent implements OnInit, AfterViewInit {
  faCheck = faCheck;
  faTimes = faTimes;
  faStar = faStar;
  list: Item[] = [];
  dataSource = new MatTableDataSource<Item>([]);
  Columns = displayedColumns;
  filter = {
    showTrue: true,
    showFalse: true,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(dataApiService: DataApiHelperService) {
    dataApiService.getList().subscribe((ls: Item[]) => {
      this.list = ls;
      this.dataSource = new MatTableDataSource<Item>(ls);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get displayedColumns(): unknown[] {
    return this.Columns.filter((r) => r.selected).map((r) => r.name);
  }

  changeDisplayColumns(evt: DisplayedColumns): void {
    this.Columns = this.Columns.map((r) => {
      return {
        ...r,
        selected: r.name === evt.name ? evt.selected : r.selected,
      };
    });
  }

  changeFilter(evt: any): void {
    this.filter.showTrue = evt.showTrue;
    this.filter.showFalse = evt.showFalse;
    this.dataSource = new MatTableDataSource<Item>(
      this.list.filter((r) => {
        if (this.filter.showTrue && r.fork) {
          return true;
        }
        if (this.filter.showFalse && !r.fork) {
          return true;
        }
        return false;
      })
    );
    this.dataSource.paginator = this.paginator;
  }
}
