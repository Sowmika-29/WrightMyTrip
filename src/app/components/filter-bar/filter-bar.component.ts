import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TripFilters {
  search: string;
  category: string;
  maxPrice: number;
  durationRange: 'all' | '1-3' | '4-7' | '8+';
}

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<TripFilters>();

  filters: TripFilters = {
    search: '',
    category: 'All',
    maxPrice: 150000,
    durationRange: 'all'
  };

  categories = [
    'All', 'Domestic', 'International', 'Honeymoon', 
    'Family Trips', 'Corporate', 'Friends Trips', 
    'Group Trip', 'Senior Citizen'
  ];

  durations = [
    { label: 'All Durations', value: 'all' },
    { label: '1-3 Days', value: '1-3' },
    { label: '4-7 Days', value: '4-7' },
    { label: '8+ Days', value: '8+' }
  ];

  ngOnInit() {
    this.emitFilters();
  }

  onFilterChange() {
    this.emitFilters();
  }

  setCategory(cat: string) {
    this.filters.category = cat;
    this.emitFilters();
  }

  resetFilters() {
    this.filters = {
      search: '',
      category: 'All',
      maxPrice: 150000,
      durationRange: 'all'
    };
    this.emitFilters();
  }

  private emitFilters() {
    this.filtersChanged.emit({ ...this.filters });
  }
}
