import { render, prettyDOM } from '@testing-library/vue';
import { beforeEach, describe, expect, test } from "vitest";

import Rating from './rating.vue';

import { i18n } from '@/plugins/i18n';

describe('Rating', () => {
  it('Renders the rating and label', async () => {
    const screen = await render(Rating, {
      props: {
        value: 5
      },
      global: {
        plugins: [
          i18n,
        ],
      },
    });

    const rating = screen.getByTestId('rating');
    expect(rating).toBeTruthy();
    
    const ratingLabel = screen.getByTestId('rating-label');
    expect(ratingLabel).toContainHTML('Average');
  });

  it('Renders the rating without a label', async () => {
    const screen = await render(Rating, {
      props: {
        value: 5,
        valueOnly: true,
      },
      global: {
        plugins: [
          i18n,
        ],
      },
    });

    const rating = screen.getByTestId('rating');
    expect(rating).toBeTruthy();
    
    expect(screen.queryByTestId('rating-label'))
      .not.toBeInTheDocument()
  });
});