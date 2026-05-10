import { render } from '@testing-library/vue';
import { beforeEach, describe, expect, test } from "vitest";

import ShowCard from './show-card.vue';

import { i18n } from '@/plugins/i18n';
import { router } from '@/router';

const showObj = await import('@/mock-data/show.json');

describe('Show-Card', () => {
  it('Renders a show with cover image and rating', async () => {
    const screen = await render(ShowCard, {
      props: showObj,
      global: {
        plugins: [
          i18n,
          router,
        ],
      },
    });

    const rating = screen.getByTestId('rating');
    expect(rating).toBeTruthy();

    const link = screen.getByTestId('link');
    expect(link).toBeTruthy();
    expect(link.href).toContain(`/show/${showObj.id}`);

    const cover = screen.getByTestId('cover');
    expect(cover).toBeTruthy();
  });
});