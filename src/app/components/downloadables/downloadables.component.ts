import { Component, Input } from '@angular/core';
import { ChecklistComponent } from './checklist/checklist.component';
import { CommonModule, NgFor } from '@angular/common';

interface Representation {
  id: string;
  label: string;
  url: string[];
}

interface Child {
  id: string;
  label: string;
  children: Child[];
  representations: Representation[];
  selected?: boolean;
  selectAssociated?: boolean;
}

interface Data {
  [key: string]: {
    label: string;
    children: Child[];
    representations: Representation[];
  };
}

@Component({
  selector: 'app-downloadables',
  standalone: true,
  templateUrl: './downloadables.component.html',
  styleUrls: ['./downloadables.component.scss'],
  imports: [ChecklistComponent, CommonModule, NgFor],
})
export class DownloadablesComponent {
  @Input() data: Data = {
    // Your data goes here
  };

  maxDepth: number = 3; // Set your max depth here

  selectAll() {
    Object.values(this.data).forEach((item) => {
      // Cast to Child to match the method signature
      this.selectChildren(
        {
          id: '',
          label: item.label,
          children: item.children,
          representations: item.representations,
        },
        true,
        false,
      );
    });
  }

  selectAllWithAssociated() {
    Object.values(this.data).forEach((item) => {
      // Cast to Child to match the method signature
      this.selectChildren(
        {
          id: '',
          label: item.label,
          children: item.children,
          representations: item.representations,
        },
        true,
        true,
      );
    });
  }

  deselectAllWithAssociated() {
    Object.values(this.data).forEach((item) => {
      // Cast to Child to match the method signature
      this.selectChildren(
        {
          id: '',
          label: item.label,
          children: item.children,
          representations: item.representations,
        },
        false,
        false,
      );
    });
  }

  selectChildren(item: Child, select: boolean, selectAssociated: boolean) {
    item.selected = select;
    if (item.representations.length > 0) {
      item.selectAssociated = selectAssociated;
    }
    item.children.forEach((child) => {
      this.selectChildren(child, select, selectAssociated);
    });
  }

  download() {
    const selectedIds: string[] = [];
    Object.values(this.data).forEach((item) => {
      // Cast to Child to match the method signature
      this.collectSelectedIds(
        {
          id: '',
          label: item.label,
          children: item.children,
          representations: item.representations,
        },
        selectedIds,
      );
    });
    // Call a function to handle the downloading process
    this.fetchFiles(selectedIds);
  }

  collectSelectedIds(item: Child, selectedIds: string[]) {
    if (item.selected) {
      selectedIds.push(item.id);
      if (item.selectAssociated) {
        item.representations.forEach((rep) => {
          selectedIds.push(rep.id);
          // Assuming download logic is handled elsewhere
          rep.url.forEach((url) => this.downloadFile(url));
        });
      }
    }
    item.children.forEach((child) => {
      this.collectSelectedIds(child, selectedIds);
    });
  }

  downloadFile(url: string) {
    // Implement file download logic here
  }

  fetchFiles(ids: string[]) {
    // Implement the logic to fetch the files based on selected ids
    console.log('Fetching files for IDs:', ids);
  }
}
