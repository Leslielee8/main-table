import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faCheck,
  faColumns,
  faFilter,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { DisplayedColumns } from 'src/app/entities/displayedColumns';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss'],
})
export class SiderComponent implements OnInit {
  faColumns = faColumns;
  faFilter = faFilter;
  faCheck = faCheck;
  faTimes = faTimes;
  // columns = displayedColumns;
  @Input() displayedColumns!: { name: string; selected: boolean }[];
  @Input() filter: any;

  @Output() changeDisplayColumns = new EventEmitter<DisplayedColumns>();
  @Output() changeFilter = new EventEmitter<{
    showTrue: boolean;
    showFalse: boolean;
  }>();
  constructor() {}

  ngOnInit(): void {}

  // isChecked(key: string): boolean {
  //   return displayedColumns.indexOf(key) >= 0;
  // }

  hanldeCheckBoxClick(name: string, selected: boolean) {
    console.log(name, selected);
    this.changeDisplayColumns.emit({ name, selected });
  }

  hanldeFilterCheckBox(name: string, value: boolean) {
    console.log(name, {
      ...this.filter,
      [name]: value,
    });
    this.changeFilter.emit({
      ...this.filter,
      [name]: !this.filter[name],
    });
  }
}
