import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder-page',
  templateUrl: './placeholder-page.html',
  styleUrl: './placeholder-page.css',
})
export class PlaceholderPage {
  private readonly route = inject(ActivatedRoute);

  protected readonly title = computed(() => this.route.snapshot.data['title'] ?? 'Page');
}
