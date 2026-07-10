import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** School crest — a shield (royal above, green below), gold border, open book
 *  and rising wheat, echoing the real Manar Al Batin emblem. Pure SVG so it is
 *  crisp everywhere and needs no image asset. */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 64 72" fill="none"
      role="img" aria-label="Manar Al Batin crest">
      <path d="M32 2 60 11v25c0 18-12 29-28 34C16 65 4 54 4 36V11L32 2Z"
        fill="#f4b53f"/>
      <path d="M32 7 55 14.5V36c0 15-10 24.5-23 29C19 60.5 9 51 9 36V14.5L32 7Z"
        fill="#0b4f8a"/>
      <path d="M9 37c2.6 12.6 11.5 20.6 23 25 11.5-4.4 20.4-12.4 23-25H9Z" fill="#2f9e6b"/>
      <path d="M32 26c-3-2.2-6.6-3-10-2.6v13c3.4-.4 7 .4 10 2.6 3-2.2 6.6-3 10-2.6v-13c-3.4-.4-7 .4-10 2.6Z"
        fill="#fff"/>
      <path d="M32 26v13" stroke="#0b4f8a" stroke-width="1.4"/>
      <path d="M32 24v-6M29 20l3-2 3 2" stroke="#f4b53f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `,
  host: { style: 'display:inline-flex;line-height:0' },
})
export class LogoComponent {
  readonly size = input(44);
}
