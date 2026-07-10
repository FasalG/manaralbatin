import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { I18nService } from '../../../core/services/i18n.service';
import { LogoComponent } from '../logo/logo';

interface NavItem {
  key: string;
  path: string;
}

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, LogoComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
  host: {
    '[class.is-scrolled]': 'scrolled()',
    '[class.is-open]': 'menuOpen()',
    '(window:scroll)': 'onScroll()',
  },
})
export class HeaderComponent {
  protected readonly i18n = inject(I18nService);

  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  protected readonly nav: NavItem[] = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.academics', path: '/academics' },
    { key: 'nav.faculty', path: '/faculty' },
    { key: 'nav.facilities', path: '/facilities' },
    { key: 'nav.gallery', path: '/gallery' },
    { key: 'nav.admissions', path: '/admissions' },
    { key: 'nav.contact', path: '/contact' },
  ];

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
