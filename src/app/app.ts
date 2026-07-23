import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { ContentService } from './core/services/content.service';
import { I18nService } from './core/services/i18n.service';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer';
import { IconComponent } from './shared/components/icon/icon';
import { NoticeInfo } from './core/models/content.model';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, IconComponent, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);
  protected readonly content = inject(ContentService);
  protected readonly i18n = inject(I18nService);

  /** The admin area must render even before content loads (or when the Firebase
   *  doc is empty), so admins can always reach the dashboard to publish. */
  protected readonly isAdminRoute = signal(this.router.url.startsWith('/admin'));

  protected readonly notices = this.content.notices;
  protected readonly selectedNotice = this.content.selectedNotice;
  protected readonly isPopupOpen = this.content.showNoticePopup;
  protected readonly dismissalTrigger = signal(0);

  protected readonly activePopupNotices = computed(() => {
    this.dismissalTrigger(); // Register dependency to track localStorage changes
    return this.notices().filter((n) => {
      if (!n.active || !n.showAsPopup) return false;
      const dismissedTimestamp = localStorage.getItem(`mab-notice-popup-dismissed-${n.id}`);
      return dismissedTimestamp !== n.updatedAt;
    });
  });

  protected readonly noticesToShowInPopup = computed(() => {
    const selected = this.selectedNotice();
    if (selected) {
      return [selected];
    }
    return this.activePopupNotices();
  });

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.isAdminRoute.set(e.urlAfterRedirects.startsWith('/admin'));
        // Scroll to top on route change unless the URL carries a hash anchor.
        if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      });

    // Check localStorage dismissal once content is ready
    effect(() => {
      if (this.content.ready()) {
        const activeNotices = this.notices().filter(n => n.active && n.showAsPopup);
        const hasUndismissed = activeNotices.some((n) => {
          const dismissedTimestamp = localStorage.getItem(`mab-notice-popup-dismissed-${n.id}`);
          return dismissedTimestamp !== n.updatedAt;
        });
        if (hasUndismissed) {
          this.content.showNoticePopup.set(true);
        }
      }
    });
  }

  protected dismissNoticePopup(): void {
    const selected = this.selectedNotice();
    if (selected) {
      // If we are showing a clicked notice, close it instantly.
      this.selectedNotice.set(null);
      this.content.showNoticePopup.set(false);
    } else {
      // If we are showing automatic popups, dismiss the current first notice in the queue.
      const currentActive = this.activePopupNotices();
      if (currentActive.length > 0) {
        const current = currentActive[0];
        localStorage.setItem(`mab-notice-popup-dismissed-${current.id}`, current.updatedAt);
        // Force computed recalculation
        this.dismissalTrigger.update((v) => v + 1);
      }
      
      // Check if there are any remaining notices in the queue
      const remaining = this.notices().filter((n) => {
        if (!n.active || !n.showAsPopup) return false;
        const dismissedTimestamp = localStorage.getItem(`mab-notice-popup-dismissed-${n.id}`);
        return dismissedTimestamp !== n.updatedAt;
      });

      if (remaining.length === 0) {
        this.content.showNoticePopup.set(false);
      }
    }
  }

  // Exposed for children to select a specific notice to popup
  public openNotice(notice: NoticeInfo): void {
    this.content.openNoticePopup(notice);
  }
}
