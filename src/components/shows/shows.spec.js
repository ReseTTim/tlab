import { render } from '@testing-library/vue';
import { beforeEach, describe, expect, test } from "vitest";

import Shows from './shows.vue';

import { i18n } from '@/plugins/i18n';
import { router } from '@/router';

const showObj = await import('@/mock-data/show.json');

describe('Shows', () => {
  it('Renders a list with multiple shows (covers)', async () => {
    const screen = await render(Shows, {
      props: {
        title: 'Mock list',
        shows: [showObj, showObj, showObj, showObj, showObj]
      },
      global: {
        plugins: [
          i18n,
          router,
        ],
      },
    });

    const showItems = screen.getAllByTestId('show-item');
    expect(showItems).toHaveLength(5);
  });
});